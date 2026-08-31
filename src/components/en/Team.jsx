import React from 'react';
// Team.jsx (EN) — v6: single member (Yoann)
function Team() {
  const members = [
    {
      photo: "team-yoann.webp",
      name: "Yoann Maeder",
      bio: "Guitarist, producer and sound engineer. Fifteen years in the job, by way of Montreux Jazz and Paléo.",
      skills: ["REC","PROD","COMP","MIX"],
    },
  ];

  return (
    <section id="equipe">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <div>
            <h2>One pair of<br/><em>attentive</em> hands.</h2>
          </div>
        </div>

        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap:28}}>
          {members.map((m, idx) => (
            <article key={m.name}
              className="reveal-on-scroll"
              style={{transitionDelay:`${idx * 100}ms`}}>
              <div style={{
                display:"grid", gridTemplateColumns:"160px 1fr", gap:22,
                padding:24, background:"var(--bs-elevated)",
                border:"1px solid var(--bs-hairline)", borderRadius:14,
                transition:"border-color .35s var(--bs-ease-organic), transform .35s var(--bs-ease-organic)",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(127,176,105,0.40)"; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="var(--bs-hairline)"; e.currentTarget.style.transform="none"; }}>

                <div
                  role={m.photo ? "img" : undefined}
                  aria-label={m.photo ? `Portrait of ${m.name}` : undefined}
                  style={{
                    width:160, height:220, borderRadius:8, overflow:"hidden",
                    position:"relative", flexShrink:0,
                    background: m.photo ? "none" : "var(--bs-glass)",
                    backgroundImage: m.photo ? `url(/assets/photos/${m.photo})` : "none",
                    backgroundSize:"cover", backgroundPosition:"center top",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    border: m.photo ? "none" : "1px solid rgba(154,142,127,0.12)",
                  }}>
                  {!m.photo && (
                    <svg viewBox="0 0 113 113" style={{width:64, height:64, opacity:0.18}}>
                      <path fill="var(--bs-light)" fillRule="evenodd" d="m107.36 56.48c0 27.95-22.65 50.6-50.59 50.6-27.95 0-50.6-22.65-50.6-50.6 0-27.94 22.65-50.59 50.6-50.59 27.94 0 50.59 22.65 50.59 50.59zm-10.53-18.36l-0.83-1.93c-6.82-15.02-21.43-24.14-38.95-24.14-4.41 0-8.64 0.58-12.6 1.69l-0.09 0.07c-10.01 2.33-10.76 9.43-6.46 14.78l3.37 4.3c4.41 5.58 3.95 11.74-3.14 16.5l-18.72 12.79c-4.36 2.97-3.95 6.66-2.75 10.54q0.03 0.08 0.06 0.18c4.21 11.65 21.25-7.65 28.72 6.65 0 0 4.73 15.04 19.53 10.19 6.6-2.15 8.48-12.33 4.21-17.8l-3.68-4.7c-4.38-7.81 0.69-17.86 11.76-14.51l7.21 2.23c12.63 3.9 15.56-9.16 12.36-16.84z"/>
                    </svg>
                  )}
                  {m.photo && <div style={{position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 55%, rgba(10,9,8,0.6) 100%)"}}/>}
                </div>

                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"4px 0"}}>
                  <div>
                    <h3 style={{fontFamily:"var(--font-display)", fontWeight:800, fontSize:38, letterSpacing:"-0.03em", margin:"0 0 12px", lineHeight:0.96}}>{m.name}</h3>
                    <p style={{fontFamily:"var(--font-sans)", fontSize:13, lineHeight:1.65, color:"var(--bs-muted)", margin:0, textWrap:"pretty"}}>{m.bio}</p>
                  </div>
                  <div style={{display:"flex", gap:6, flexWrap:"wrap", marginTop:18}}>
                    {m.skills.map(s => (
                      <span key={s} style={{fontFamily:"var(--font-mono)", fontSize:9, letterSpacing:"0.2em", padding:"4px 10px", border:"1px solid rgba(154,142,127,0.2)", borderRadius:999, color:"var(--bs-light)", textTransform:"uppercase"}}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Team;