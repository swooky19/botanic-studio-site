import React from 'react';
// Equipment.jsx — v2: category headers weight 700, section id=arsenal
function Equipment() {
  const cats = [
    {name:'Préamplis', note:'la chaîne', count:5, items:[
      {n:'AMEK System 9098',           t:'Rupert Neve'},
      {n:'Fredenstein Artistic Mic Pre', t:'×2 · série 500'},
      {n:'Premier Amp 573',            t:'série 500'},
      {n:'Elysia Skulpter 500',        t:''},
      {n:'UA Apollo X8',               t:''},
    ]},
    {name:'Monitoring', note:'l’oreille', count:4, items:[
      {n:'ATC SCM25A Pro Mk2',    t:'×2'},
      {n:'Yamaha NS-10M Studio',  t:'×2'},
      {n:'Auratone 5C',           t:'×2'},
      {n:'Trinnov NOVA',          t:''},
    ]},
    {name:'Microphones', note:'la capture', count:7, items:[
      {n:'Neumann U87 Ai',        t:''},
      {n:'Neumann TLM 103',       t:''},
      {n:'AKG C414 XLS',          t:''},
      {n:'Shure SM57',            t:''},
      {n:'Shure Beta 91A',        t:''},
      {n:'Audix D6',              t:''},
      {n:'Audio-Technica ATM450', t:'×2'},
    ]},
    {name:'Instruments', note:'le vivant', count:6, items:[
      {n:'Seiler Upright Piano',  t:''},
      {n:'Fender Telecaster',     t:''},
      {n:'Fender Stratocaster',   t:''},
      {n:'Fender Mustang Bass',   t:''},
      {n:'Roland Juno-106',       t:''},
      {n:'NI Komplete Kontrol S49', t:''},
    ]},
  ];

  return (
    <section id="arsenal" style={{background:'var(--bs-surface)'}}>
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <div>
            <div className="eyebrow">L’arsenal</div>
            <h2>L’outillage<br/>du <em>jardinier</em>.</h2>
          </div>
        </div>

        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(310px, 1fr))', gap:20}}>
          {cats.map((cat, idx) => (
            <article key={cat.name}
              className="reveal-on-scroll"
              style={{transitionDelay:`${idx * 80}ms`,
                padding:'26px 28px', background:'var(--bs-elevated)',
                border:'1px solid var(--bs-hairline)', borderRadius:12,
                display:'flex', flexDirection:'column', gap:16,
              }}>
              <header style={{
                display:'flex', alignItems:'flex-start', justifyContent:'space-between',
                paddingBottom:14, borderBottom:'1px solid var(--bs-hairline)',
              }}>
                <div>
                  {/* Category name — Inter Tight 700 */}
                  <h4 style={{fontFamily:'var(--font-display)', fontWeight:700, fontSize:22, margin:0, letterSpacing:'-0.025em', lineHeight:1}}>{cat.name}</h4>
                  <div className="eyebrow" style={{marginTop:4}}>{cat.note}</div>
                </div>
                <div style={{fontFamily:'var(--font-mono)', fontSize:11, color:'var(--bs-muted)', letterSpacing:'0.12em', marginTop:2}}>
                  {String(cat.count).padStart(2,'0')}
                </div>
              </header>
              <ul style={{listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:9}}>
                {cat.items.map(it => (
                  <li key={it.n} style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8}}>
                    <span style={{fontFamily:'var(--font-sans)', fontSize:13, color:'var(--bs-light)', lineHeight:1.4}}>{it.n}</span>
                    {it.t && (
                      <span style={{fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(154,142,127,0.6)', letterSpacing:'0.04em', whiteSpace:'nowrap', flexShrink:0}}>{it.t}</span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Equipment;
