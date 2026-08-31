import React from 'react';
// Contact.jsx (EN) — calendrier GHL à la place du formulaire

function Contact() {
  React.useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://links.satin-agency.com/js/form_embed.js"]'
    );
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = 'https://links.satin-agency.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section id="contact" style={{paddingBottom:112}}>
      <div className="container">
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap:64, alignItems:'start'}}>

          <div className="reveal-on-scroll">
            <div className="eyebrow" style={{marginBottom:20}}>Two ways to start</div>
            <h2 style={{
              fontFamily:'var(--font-display)', fontWeight:800,
              fontSize:'clamp(38px, 5vw, 74px)', lineHeight:0.98,
              letterSpacing:'-0.035em', margin:'0 0 28px', textWrap:'balance',
            }}>
              Let's talk<br/>about your <em style={{fontStyle:'italic', fontWeight:600, color:'var(--bs-leaf)'}}>project</em>.
            </h2>
            <p style={{
              fontFamily:'var(--font-sans)', fontWeight:300, fontSize:17,
              lineHeight:1.65, color:'var(--bs-muted)', maxWidth:'38ch',
              textWrap:'pretty', margin:'0 0 44px',
            }}>
              An idea, a track, an EP, an album. A craft question. Choose a recording session or, if you'd rather talk it through first, a 30-minute discovery call.
            </p>
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {[
                {k:'LOCATION', v:'Place de l\'Europe 7, 1003 Lausanne'},
                {k:'IG',       v:'@botanicstudiolausanne', href:'https://www.instagram.com/botanicstudiolausanne/'},
              ].map(({k, v, href}) => (
                <div key={k} style={{display:'flex', gap:18, alignItems:'center'}}>
                <span className="eyebrow" style={{width:120, flexShrink:0}}>{k}</span>
                  {href
                    ? <a href={href} style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--bs-light)', borderBottom:'1px solid rgba(154,142,127,0.28)', paddingBottom:1}}>{v}</a>
                    : <span style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--bs-light)'}}>{v}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll d1">
            <div style={{
              background:'var(--bs-elevated)', border:'1px solid var(--bs-hairline)',
              borderRadius:14, padding:'20px', overflow:'hidden',
            }}>
              <iframe
              src="https://links.satin-agency.com/booking/soleil-design-ihg0k5szpbr?heightMode=full&showHeader=true&locale=en"
                style={{width:'100%', border:'none', overflow:'hidden'}}
                scrolling="no"
                id="h4mFvL96q138Bb7qj7PC_1787051073893"
                allow="payment"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;