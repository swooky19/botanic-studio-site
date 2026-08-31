import React from 'react';
// Contact.jsx — calendrier GHL à la place du formulaire

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

          {/* Left — copy */}
          <div className="reveal-on-scroll">
            <div className="eyebrow" style={{marginBottom:20}}>Deux façons de commencer</div>
            <h2 style={{
              fontFamily:'var(--font-display)', fontWeight:800,
              fontSize:'clamp(38px, 5vw, 74px)', lineHeight:0.98,
              letterSpacing:'-0.035em', margin:'0 0 28px', textWrap:'balance',
            }}>
              Parlons de<br/>ton <em style={{fontStyle:'italic', fontWeight:600, color:'var(--bs-leaf)'}}>projet</em>.
            </h2>
            <p style={{
              fontFamily:'var(--font-sans)', fontWeight:300, fontSize:17,
              lineHeight:1.65, color:'var(--bs-muted)', maxWidth:'38ch',
              textWrap:'pretty', margin:'0 0 44px',
            }}>
              Une idée, un morceau, un EP, un album. Une question métier. Choisis une session d’enregistrement ou, si tu préfères en parler d’abord, un appel découverte de 30 minutes.
            </p>
            {/* Contact details */}
            <div style={{display:'flex', flexDirection:'column', gap:14}}>
              {[
                {k:'LIEU',   v:'Place de l’Europe 7, 1003 Lausanne'},
                {k:'IG',     v:'@botanicstudiolausanne', href:'https://www.instagram.com/botanicstudiolausanne/'},
              ].map(({k, v, href}) => (
                <div key={k} style={{display:'flex', gap:18, alignItems:'center'}}>
                  <span className="eyebrow" style={{width:80, flexShrink:0}}>{k}</span>
                  {href
                    ? <a href={href} style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--bs-light)', borderBottom:'1px solid rgba(154,142,127,0.28)', paddingBottom:1}}>{v}</a>
                    : <span style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--bs-light)'}}>{v}</span>
                  }
                </div>
              ))}
            </div>
          </div>

          {/* Right — calendrier GHL */}
          <div className="reveal-on-scroll d1">
            <div style={{
              background:'var(--bs-elevated)', border:'1px solid var(--bs-hairline)',
              borderRadius:14, padding:'20px', overflow:'hidden',
            }}>
              <iframe
                src="https://links.satin-agency.com/booking/soleil-design-ihg0k5szpbr?heightMode=full&showHeader=true"
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