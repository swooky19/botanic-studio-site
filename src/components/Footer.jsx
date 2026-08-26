import React from 'react';
// Footer.jsx — v2: wordmark botanic 800 + studio 500 italic leaf
function Footer() {
  return (
    <footer style={{borderTop:'1px solid var(--bs-hairline)', padding:'80px 0 44px', background:'var(--bs-surface)'}}>
      <div className="container">

        {/* Columns */}
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap:48, marginBottom:56}}>
          <div>
            {/* Wordmark */}
            <div style={{display:'flex', alignItems:'center', gap:11, marginBottom:20}}>
              <img src="/assets/logos/botanic-mark.svg" alt="" style={{width:32, height:32, filter:'invert(1) brightness(1.04)', flexShrink:0}}/>
              <span style={{fontFamily:'var(--font-display)', fontSize:22, letterSpacing:'-0.048em', lineHeight:1, display:'flex', alignItems:'baseline', gap:3}}>
                <span style={{fontWeight:800, color:'var(--bs-light)', textTransform:'lowercase'}}>botanic</span>
                <span style={{fontWeight:500, fontStyle:'italic', color:'var(--bs-leaf)', textTransform:'lowercase'}}>studio</span>
              </span>
            </div>
            <p style={{fontFamily:'var(--font-sans)', fontSize:13.5, lineHeight:1.65, color:'var(--bs-muted)', maxWidth:'32ch', margin:'0 0 20px', textWrap:'pretty'}}>
              Un studio d'enregistrement, composition, production et mixage à Lausanne. Petites séries, grand soin.
            </p>
            <div style={{fontFamily:'var(--font-mono)', fontSize:10.5, color:'var(--bs-vine)', letterSpacing:'0.18em', textTransform:'uppercase'}}>
              Place de l'Europe 7 · 1003 Lausanne
            </div>
          </div>
          <FCol head="Studio" items={[
            {label:"L'Atelier", href:"atelier.html"},
            {label:"Services",  href:"#services"},
            {label:"Arsenal",   href:"#arsenal"},
            {label:"Crédits",   href:"#credits"},
            {label:"Équipe",    href:"#equipe"},
          ]}/>
          <FCol head="Pratique" items={[
            {label:'Réserver', href:'#contact'},
            {label:'Tarifs',   href:'#services'},
            {label:'FAQ',      href:'faq.html'},
          ]}/>
          <FCol head="Suivre" items={[
            {label:'Instagram', href:'https://www.instagram.com/botanicstudiolausanne/'},
          ]}/>
        </div>

        {/* Google Map */}
        <MapBlock />

        {/* Legal row */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          paddingTop:28, borderTop:'1px solid var(--bs-hairline)',
          flexWrap:'wrap', gap:14,
        }}>
          <div style={{fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(154,142,127,0.5)', letterSpacing:'0.14em', textTransform:'uppercase'}}>
            © botanic studio · Lausanne · MMXXV · Tous droits réservés
          </div>
          <a href="mentions-legales.html" style={{fontFamily:'var(--font-mono)', fontSize:10, color:'rgba(154,142,127,0.5)', letterSpacing:'0.14em', textTransform:'uppercase', textDecoration:'none'}}>
            Mentions légales
          </a>
        </div>
      </div>
    </footer>
  );
}

function MapBlock() {
  const mapWrapperStyle = {
    display: 'block', position: 'relative', borderRadius: 14,
    overflow: 'hidden', border: '1px solid var(--bs-hairline)',
    marginBottom: 56, height: 240,
  };
  const iframeStyle = {
    width: '100%', height: '100%', border: 'none',
    filter: 'grayscale(0.9) invert(0.92) contrast(0.92)',
    pointerEvents: 'none',
  };
  const badgeStyle = {
    position: 'absolute', bottom: 16, left: 16,
    background: 'var(--bs-elevated)', border: '1px solid var(--bs-hairline)',
    borderRadius: 8, padding: '8px 14px',
    fontFamily: 'var(--font-mono)', fontSize: 10.5,
    letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--bs-light)',
  };
  return React.createElement(
    'a',
    {
      href: "https://www.google.com/maps/search/?api=1&query=Place+de+l%27Europe+7%2C+1003+Lausanne",
      target: "_blank",
      rel: "noopener noreferrer",
      style: mapWrapperStyle,
    },
    React.createElement('iframe', {
      title: "Localisation Botanic Studio",
      src: "https://www.google.com/maps?q=Place+de+l'Europe+7,+1003+Lausanne&output=embed",
      style: iframeStyle,
      loading: "lazy",
    }),
    React.createElement('div', { style: badgeStyle }, "Ouvrir dans Maps →")
  );
}

function FCol({head, items}) {
  return (
    <div>
      <div className="eyebrow" style={{marginBottom:18}}>{head}</div>
      <ul style={{listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:11}}>
        {items.map(it => (
          <li key={it.label}>
            <a href={it.href} style={{fontFamily:'var(--font-sans)', fontSize:13.5, color:'var(--bs-light)', transition:'color .2s'}}
               onMouseEnter={e => e.target.style.color='var(--bs-leaf)'}
               onMouseLeave={e => e.target.style.color='var(--bs-light)'}>{it.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;