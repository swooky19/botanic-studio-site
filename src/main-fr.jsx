import React from 'react';
import { createRoot } from 'react-dom/client';

import '/src/styles/colors_and_type.css';
import '/src/styles/site.css';
import Nervures from '/src/lib/nervures.js';

import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Services from './components/Services.jsx';
import Team from './components/Team.jsx';
import Equipment from './components/Equipment.jsx';
import Credits from './components/Credits.jsx';
import Testimonials from './components/Testimonials.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

/* ─── Repris tel quel du prototype : montage du fond animé et
   pilotage de son intensité section par section. ─── */
// Mount the leaf-vein shader as a discreet site-wide background.
  // Pointer-events pass through to content; window listens for clicks
  // anywhere so musical waves emit from the actual interaction point.
  let nervures = null;
  if (Nervures) {
    nervures = Nervures.mount(document.getElementById('site-bg'), {
      intensity: 0.85,
      interactRoot: window
    });
    window.__bgShader = nervures;
  }

  // ─── Scroll-aware intensity ───────────────────────────────
  // Each section declares a target shader intensity. As sections
  // enter/leave the viewport we lerp toward a weighted blend so
  // the wallpaper smoothly breathes between dark + cream pages.
  const SECTION_INTENSITY = {
    top:          1.00,   // hero — full presence
    services:     0.15,   // cream surface — almost gone
    equipe:       0.95,   // dark — present
    arsenal:      0.15,   // cream
    credits:      0.80,   // dark
    testimonials: 0.20,   // cream
    contact:      1.00,   // dark — full
  };
  const FOOTER_INTENSITY = 0.70;

  // Keep a single reference so we can disconnect on re-wire (e.g. HMR,
  // browser back/forward into a fresh paint) and on unload.
  let intensityObs = null;

  function observeSections() {
    if (!nervures) return;
    if (intensityObs) intensityObs.disconnect();
    const sections = Array.from(document.querySelectorAll('main > section[id], footer'));
    const ratios = new Map();
    intensityObs = new IntersectionObserver((entries) => {
      for (const e of entries) ratios.set(e.target, e.intersectionRatio);
      // weighted average by visibility ratio
      let num = 0, den = 0;
      for (const [el, r] of ratios) {
        if (r <= 0) continue;
        const k = el.id || (el.tagName === 'FOOTER' ? '__footer' : '');
        const v = k === '__footer' ? FOOTER_INTENSITY : (SECTION_INTENSITY[k] ?? 0.6);
        num += v * r; den += r;
      }
      if (den > 0) {
        const target = num / den;
        nervures.setIntensity(target);
        // also fade the canvas opacity slightly so cream sections
        // get a calmer plate (the shader inside is dim already, but
        // double-fading reads as a real ambient shift)
        document.getElementById('site-bg').style.opacity = (0.40 + target * 0.35).toFixed(3);
      }
    }, { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] });
    sections.forEach(s => intensityObs.observe(s));
  }

  window.addEventListener('beforeunload', () => {
    if (intensityObs) intensityObs.disconnect();
  });

  // Tag cream sections so CSS can feather their edges. We do this
  // after React mounts.
  function tagSections() {
    const cream = ['services', 'arsenal', 'testimonials'];
    cream.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('data-bg', 'light');
    });
  }

  // Scroll jusqu'à l'ancre (#contact, etc.) une fois que React a fini
  // de tout afficher — nécessaire car le navigateur essaie de scroller
  // AVANT que ces sections existent réellement dans le DOM.
  function scrollToHashIfPresent() {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // App.jsx calls window.__bsAppMounted() from a useEffect after the first
  // paint — no polling, no setTimeout cascade.
  window.__bsAppMounted = () => {
    tagSections();
    observeSections();
    scrollToHashIfPresent();
  };

function App() {
  React.useEffect(() => {
    if (typeof window.__bsAppMounted === 'function') window.__bsAppMounted();
  }, []);

  return (
    <>
      <Nav/>
      <main>
        <Hero/>
        <Services/>
        <Team/>
        <Equipment/>
        <Credits/>
        <Testimonials/>
        <Contact/>
      </main>
      <Footer/>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App/>);