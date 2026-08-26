import React from 'react';
// Services.jsx (EN) — v2: grille 3x2 adaptée à 5 services
function Services() {
  const services = [
    {n:"01", stage:"the seed",    title:"Recording", body:"Studio rental with sound engineer. Neve analog chain, treated acoustics, two booths.", price:"CHF 70.- /hr", detail:"Voice · Instruments · Ensembles"},
    {n:"02", stage:"the sprout",  title:"Mixing",     body:"2 revisions included, stems export included. Clarity, depth, balance for every element.", price:"CHF 350.- (+50.- / extra revision)", detail:"Mix · Stems · Balance"},
    {n:"03", stage:"the bloom",   title:"Mastering",  body:"Finalization and preparation for release. The final step before the track is ready.", price:"CHF 60.-", detail:"Finalization · Release"},
    {n:"04", stage:"the harvest", title:"Track production", body:"Rate tailored to the project. From raw idea to finished track, custom to your needs.", price:"On quote", detail:"Beatmaking · Sound design"},
  ];

  const lastService = {n:"05", stage:"the tending", title:"Arrangement, executive production, direction", body:"Artistic and technical support across the whole project.", price:"CHF 70.- /hr", detail:"Arrangement · Artistic direction"};

  function ServiceCard(s, i) {
    return (
      <a key={s.n}
        href="#contact"
        onClick={() => { window.dispatchEvent(new CustomEvent("bs:preselect", { detail: s.title })); }}
        className="reveal-on-scroll"
        style={{
          ["--delay"]: `${i * 80}ms`,
          transitionDelay:`${i * 80}ms`,
          padding:"44px 36px 40px",
          borderTop:"1px solid var(--bs-hairline)",
          minHeight:380, display:"flex", flexDirection:"column", gap:18,
          transition:"background .35s var(--bs-ease-organic)",
          cursor:"pointer", textDecoration:"none", color:"inherit",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = "rgba(127,176,105,0.06)";
          const arrow = e.currentTarget.querySelector("[data-card-arrow]");
          if (arrow) arrow.style.transform = "translateX(6px)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
          const arrow = e.currentTarget.querySelector("[data-card-arrow]");
          if (arrow) arrow.style.transform = "translateX(0)";
        }}>

        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
          <div className="eyebrow" style={{marginTop:4}}>{s.stage}</div>
          <div style={{
            fontFamily:"var(--font-display)", fontWeight:800,
            fontSize:54, lineHeight:0.88, letterSpacing:"-0.04em",
            color:"rgba(127,176,105,0.22)",
          }}>{s.n}</div>
        </div>

        <h3 style={{
          fontFamily:"var(--font-display)", fontWeight:700,
          fontSize:36, lineHeight:1.0, letterSpacing:"-0.025em", margin:0,
        }}>{s.title}</h3>

        <p style={{
          fontFamily:"var(--font-sans)", fontSize:14, lineHeight:1.65,
          color:"var(--bs-muted)", margin:0, maxWidth:"30ch",
        }}>{s.body}</p>

        <div style={{marginTop:"auto", display:"flex", flexDirection:"column", gap:12}}>
          <div style={{fontFamily:"var(--font-mono)", fontSize:10, color:"rgba(154,142,127,0.6)", letterSpacing:"0.08em"}}>{s.detail}</div>
          <div style={{height:"1px", background:"var(--bs-hairline)"}}/>
          <div style={{display:"flex", alignItems:"center", justifyContent:"space-between"}}>
            <span style={{fontFamily:"var(--font-mono)", fontSize:13, color:"var(--bs-harvest)", letterSpacing:"0.02em"}}>{s.price}</span>
            <span data-card-arrow style={{
              fontFamily:"var(--font-mono)", fontSize:13, color:"var(--bs-leaf)",
              transition:"transform .35s var(--bs-ease-organic)", display:"inline-block",
            }}>→</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <section id="services" style={{background:"var(--bs-surface)"}}>
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <div>
            <div className="eyebrow">The growth cycle</div>
            <h2>From seed<br/>to <em>final mix</em>.</h2>
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

          <div className="bs-services-note reveal-on-scroll" style={{
            borderTop:"1px solid var(--bs-hairline)",
            padding:"44px 32px", minHeight:380,
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <p style={{
              fontFamily:"var(--font-sans)", fontSize:12.5, lineHeight:1.75,
              color:"rgba(154,142,127,0.75)", margin:0, textAlign:"center", maxWidth:"26ch",
            }}>
              Hourly rates are billed per hour started. A deposit may be requested at booking for sessions longer than 3 hours. Custom quote provided on request for any full production.
            </p>
          </div>

          {ServiceCard(lastService, 4)}
        </div>

      </div>
    </section>
  );
}

export default Services;