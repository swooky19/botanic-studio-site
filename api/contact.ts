/**
 * POST /api/contact — Send contact form data via Resend
 *
 * Validates required fields (name, email, project, message),
 * optional phone field, then sends a formatted email.
 *
 * Security: rate limiting, honeypot, timing check, XSS escaping.
 * Requires RESEND_API_KEY in environment variables.
 */

import { Resend } from 'resend';
import { NextResponse } from 'next/server';

/* ── Rate Limiting ─────────────────────────────── */
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  project: string;
  message: string;
  website?: string; // honeypot
  _t?: number; // form load timestamp
  rgpd?: boolean;
}

export async function POST(request: Request) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = (await request.json()) as ContactPayload;

    // Anti-spam: honeypot check
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Anti-spam: timing check (form submitted too fast = bot)
    if (body._t && Date.now() - body._t < 2000) {
      return NextResponse.json({ success: true });
    }

    // Sanitize & enforce maxLength
    const name = body.name?.trim().slice(0, 100);
    const email = body.email?.trim().slice(0, 254);
    const phone = body.phone?.trim().slice(0, 20) || '';
    const project = body.project?.trim().slice(0, 200);
    const message = body.message?.trim().slice(0, 5000);

    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      );
    }

    // Lazy-init Resend to avoid build-time crash when env not set
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const phoneRow = phone
      ? `<tr>
           <td style="padding: 8px 0; color: #555555; font-size: 14px; vertical-align: top;">Tél</td>
           <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${escapeHtml(phone)}</td>
         </tr>`
      : '';

    const { error } = await resend.emails.send({
      from: 'Botanic Studio <send@botanicstudio.ch>',
      to: ['info@botanicstudio.ch'],
      replyTo: email,
      subject: `[Botanic Studio] Nouveau message de ${name}`,
      html: `
        <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #1a1a1a; padding: 32px;">
          <h2 style="color: #10b981; font-size: 18px; margin: 0 0 24px 0;">
            Nouveau message depuis botanicstudio.ch
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #555555; font-size: 14px; vertical-align: top; width: 100px;">Nom</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555555; font-size: 14px; vertical-align: top;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;">
                <a href="mailto:${escapeHtml(email)}" style="color: #10b981;">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${phoneRow}
            <tr>
              <td style="padding: 8px 0; color: #555555; font-size: 14px; vertical-align: top;">Projet</td>
              <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px;">${escapeHtml(project)}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f8f8f8; border-radius: 8px; border: 1px solid #e5e5e5;">
            <p style="color: #555555; font-size: 12px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="color: #1a1a1a; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-line;">${escapeHtml(message)}</p>
          </div>
          <p style="margin-top: 32px; color: #999999; font-size: 12px;">
            — Botanic Studio · Lausanne
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}

/** Escape HTML special characters to prevent XSS in email body */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
