import React from 'react';
// Services.jsx (EN) — v2: grille 3x2 adaptée à 5 services
function Services() {
  const services = [
    {n:"01", title:"Recording", body:"Book one to four hours, with a sound engineer there from start to finish. Billed by the hour started.", price:"CHF 70.- /hr", detail:"Voice · Instruments"},
    {n:"02", title:"Mixing", body:"Two revisions included and stems delivered. We send a v1, you listen, we adjust through to v3.", price:"From CHF 350.- / track", detail:"Mix · Stems"},
    {n:"03", title:"Mastering", body:"We don't master in-house. We hand the master to partner engineers and follow the result with you.", price:"On quote", detail:"Partners · Release"},
    {n:"04", title:"Track production", body:"From the idea to the finished track. We scope the project together, then quote.", price:"On quote", detail:"Beatmaking · Sound design"},
  ];

  const lastService = {n:"05", title:"Arrangement, executive production, direction", body:"We're with you for the whole project, from the first choices through to delivery.", price:"CHF 70.- /hr", detail:"Arrangement · Artistic direction"};

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
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent";
        }}>

        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"flex-start"}}>
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
              Hourly rates are billed by the hour started. No payment goes through the site. For a larger project, we put a quote together after the discovery call.
            </p>
          </div>

          {ServiceCard(lastService, 4)}
        </div>

      </div>
    </section>
  );
}

export default Services;