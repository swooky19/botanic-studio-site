import React from 'react';
// Services.jsx — v2: Inter Tight weights corrected, grille 3x2 avec mentions tarifaires en case 5
function Services() {
  const services = [
    {n:'01', title:'Enregistrement', body:'Tu réserves d’une à quatre heures, un ingénieur du son est là du début à la fin. Facturé à l’heure entamée.', price:'CHF 70.- /h', detail:'Voix · Instruments'},
    {n:'02', title:'Mixage', body:'Deux retouches comprises et les stems livrés. On envoie une v1, tu écoutes, on ajuste jusqu’à la v3.', price:'À partir de CHF 350.- / titre', detail:'Mix · Stems'},
    {n:'03', title:'Mastering', body:'La dernière étape avant la sortie. On prépare le titre pour la diffusion.', price:'CHF 60.-', detail:'Finalisation · Diffusion'},
    {n:'04', title:'Production d’un titre', body:'De l’idée au morceau fini. On cadre le projet ensemble, puis on chiffre.', price:'Sur devis', detail:'Beatmaking · Sound design'},
  ];

  const lastService = {n:'05', title:'Arrangement, production exécutive, réalisation', body:'On t’accompagne sur toute la durée du projet, des premiers choix jusqu’à la livraison.', price:'CHF 70.- /h', detail:'Arrangement · Direction artistique'};

  function ServiceCard(s, i) {
    return (
      <a key={s.n}
        href="#contact"
        onClick={() => { window.dispatchEvent(new CustomEvent('bs:preselect', { detail: s.title })); }}
        className="reveal-on-scroll"
        style={{
          ['--delay']: `${i * 80}ms`,
          transitionDelay:`${i * 80}ms`,
          padding:'44px 36px 40px',
          borderTop:'1px solid var(--bs-hairline)',
          minHeight:380, display:'flex', flexDirection:'column', gap:18,
          transition:'background .35s var(--bs-ease-organic)',
          cursor:'pointer', textDecoration:'none', color:'inherit',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(127,176,105,0.06)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
        }}>

        <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-start'}}>
          <div style={{
            fontFamily:'var(--font-display)', fontWeight:800,
            fontSize:54, lineHeight:0.88, letterSpacing:'-0.04em',
            color:'rgba(127,176,105,0.22)',
          }}>{s.n}</div>
        </div>

        <h3 style={{
          fontFamily:'var(--font-display)', fontWeight:700,
          fontSize:36, lineHeight:1.0, letterSpacing:'-0.025em', margin:0,
        }}>{s.title}</h3>

        <p style={{
          fontFamily:'var(--font-sans)', fontSize:14, lineHeight:1.65,
          color:'var(--bs-muted)', margin:0, maxWidth:'30ch',
        }}>{s.body}</p>

        <div style={{marginTop:'auto', display:'flex', flexDirection:'column', gap:12}}>
          <div style={{fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(154,142,127,0.6)', letterSpacing:'0.08em'}}>{s.detail}</div>
          <div style={{height:'1px', background:'var(--bs-hairline)'}}/>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <span style={{fontFamily:'var(--font-mono)', fontSize:13, color:'var(--bs-harvest)', letterSpacing:'0.02em'}}>{s.price}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <section id="services" style={{background:'var(--bs-surface)'}}>
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <div>
            <div className="eyebrow">Le cycle de croissance</div>
            <h2>De la graine<br/>au <em>mix final</em>.</h2>
          </div>
        </div>

        <style>{`
          .bs-services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0;
          }
          .bs-services-grid > a,
          .bs-services-grid > div.bs-services-note {
            border-right: 1px solid var(--bs-hairline);
          }
          .bs-services-grid > :nth-child(3n) {
            border-right: none;
          }
          @media (max-width: 900px) {
            .bs-services-grid { grid-template-columns: repeat(2, 1fr); }
            .bs-services-grid > :nth-child(3n) { border-right: 1px solid var(--bs-hairline); }
            .bs-services-grid > :nth-child(2n) { border-right: none; }
          }
          @media (max-width: 600px) {
            .bs-services-grid { grid-template-columns: 1fr; }
            .bs-services-grid > * { border-right: none !important; }
            .bs-services-note { order: 10; }
          }

        `}</style>

        <div className="bs-services-grid">
          {services.map((s, i) => ServiceCard(s, i))}

          {/* Case 5 : mentions tarifaires, remplit le trou et pousse le service 5 sous le service 3 */}
          <div className="bs-services-note reveal-on-scroll" style={{
            borderTop:'1px solid var(--bs-hairline)',
            padding:'44px 32px', minHeight:380,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <p style={{
              fontFamily:'var(--font-sans)', fontSize:12.5, lineHeight:1.75,
              color:'rgba(154,142,127,0.75)', margin:0, textAlign:'center', maxWidth:'26ch',
            }}>
              Les tarifs horaires sont facturés à l'heure entamée. Aucun paiement ne passe par le site. Pour un projet plus large, on établit un devis après l'appel découverte.
            </p>
          </div>

          {ServiceCard(lastService, 4)}
        </div>

      </div>
    </section>
  );
}

export default Services;