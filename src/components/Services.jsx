import React from 'react';
// Services.jsx — v2: Inter Tight weights corrected, grille 3x2 avec mentions tarifaires en case 5
function Services() {
  const services = [
    {n:'01', stage:'la graine',    title:'Enregistrement', body:'Location du studio avec ingénieur du son. Chaîne analogique Neve, acoustique traitée, deux cabines.', price:'CHF 70.- /h',     detail:'Voix · Instruments · Ensembles'},
    {n:'02', stage:'la pousse',    title:'Mixage',         body:'2 retouches comprises, export des stems inclus. Clarté, profondeur, équilibre pour chaque élément.',    price:'CHF 350.- (+50.- / retouche supp.)', detail:'Mix · Stems · Équilibre'},
    {n:'03', stage:'la floraison', title:'Mastering',      body:'Finalisation et préparation à la diffusion. La dernière étape avant que le titre soit prêt.',            price:'CHF 60.-',         detail:'Finalisation · Diffusion'},
    {n:'04', stage:'la récolte',   title:'Production d’un titre', body:'Tarif adapté au projet. De l’idée brute au morceau fini, sur-mesure selon les besoins.',       price:'Sur devis',        detail:'Beatmaking · Sound design'},
  ];

  const lastService = {n:'05', stage:'la culture', title:'Arrangement, production exécutive, réalisation', body:'Accompagnement artistique et technique sur l’ensemble du projet.', price:'CHF 70.- /h', detail:'Arrangement · Direction artistique'};

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
          const arrow = e.currentTarget.querySelector('[data-card-arrow]');
          if (arrow) arrow.style.transform = 'translateX(6px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'transparent';
          const arrow = e.currentTarget.querySelector('[data-card-arrow]');
          if (arrow) arrow.style.transform = 'translateX(0)';
        }}>

        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
          <div className="eyebrow" style={{marginTop:4}}>{s.stage}</div>
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
            <span data-card-arrow style={{
              fontFamily:'var(--font-mono)', fontSize:13, color:'var(--bs-leaf)',
              transition:'transform .35s var(--bs-ease-organic)', display:'inline-block',
            }}>→</span>
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
              Les tarifs horaires sont facturés à l'heure entamée. Un acompte peut être demandé à la réservation pour les sessions de plus de 3 heures. Devis personnalisé fourni sur simple demande pour toute production complète.
            </p>
          </div>

          {ServiceCard(lastService, 4)}
        </div>

      </div>
    </section>
  );
}

export default Services;