import React from 'react';
// Nav.jsx — polished v2: Inter Tight wordmark, dynamic active, fixed anchors
// + support des pages hors accueil (ex: atelier.html) + boutons "Réserver" / "Appelez-nous"
function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive]   = React.useState('');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const onHome = typeof window !== 'undefined' &&
    (window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html');

  React.useEffect(() => {
    if (!onHome) return;
    const bar = document.querySelector('.scroll-progress');
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      if (bar) {
        const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        bar.style.transform = `scaleX(${Math.min(pct, 1)})`;
      }
      const ids = ['services','equipe','arsenal','credits','testimonials','contact'];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(ids[i]); return; }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [onHome]);

  const links = [
    {label:"L'Atelier", id:"atelier", href:"atelier.html"},
    {label:"Services",  id:"services"},
    {label:"Arsenal",   id:"arsenal"},
    {label:"Crédits",   id:"credits"},
    {label:"Équipe",    id:"equipe"},
    {label:"Contact",   id:"contact"},
  ];

  const PHONE_NUMBER = '+41215394679';
  const PHONE_DISPLAY = '+41 21 539 46 79';

  function linkHref(l) {
    if (l.href) return l.href;
    return onHome ? ('#' + l.id) : ('index.html#' + l.id);
  }

  return (
    <>
      {onHome && <div className="scroll-progress"/>}
      <header style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        padding: scrolled ? '10px 32px' : '18px 32px',
        transition:'padding 350ms var(--bs-ease-organic)',
      }}>
        <div style={{
          maxWidth:1280, margin:'0 auto',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          background: scrolled ? 'rgba(10,9,8,0.76)' : 'rgba(10,9,8,0.28)',
          backdropFilter:'blur(24px) saturate(150%)',
          WebkitBackdropFilter:'blur(24px) saturate(150%)',
          border:'1px solid rgba(154,142,127,' + (scrolled?'0.14':'0.08') + ')',
          borderRadius:999,
          padding:'8px 10px 8px 22px',
          transition:'all 350ms var(--bs-ease-organic)',
          boxShadow: scrolled ? '0 4px 32px -8px rgba(0,0,0,0.4)' : 'none',
        }}>
          <a href={onHome ? "#" : "index.html"} style={{display:'flex', alignItems:'center', gap:10, textDecoration:'none'}}>
            <img src="/assets/logos/botanic-mark.svg" alt="" style={{width:26, height:26, filter:'invert(1) brightness(1.04)', flexShrink:0}}/>
            <span style={{fontFamily:'var(--font-display)', fontSize:19, letterSpacing:'-0.048em', lineHeight:1, display:'flex', alignItems:'baseline', gap:3}}>
              <span style={{fontWeight:800, color:'var(--bs-light)', textTransform:'lowercase'}}>botanic</span>
              <span style={{fontWeight:500, fontStyle:'italic', color:'var(--bs-leaf)', textTransform:'lowercase'}}>studio</span>
            </span>
          </a>

          <nav className="bs-nav-links" style={{display:'flex', gap:28}}>
            {links.map(l => {
              const isActive = l.href ? false : (onHome && active === l.id);
              return (
                <a key={l.id} href={linkHref(l)} aria-current={isActive ? 'location' : undefined} style={{
                    fontFamily:'var(--font-sans)', fontSize:13, fontWeight:500,
                    color: isActive ? 'var(--bs-leaf)' : 'var(--bs-light)',
                    textTransform:'lowercase', letterSpacing:'-0.005em',
                    textDecoration:'none', padding:'4px 0', position:'relative',
                    transition:'color .2s',
                  }}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--bs-leaf)'}
                  onMouseLeave={e=>e.currentTarget.style.color = isActive?'var(--bs-leaf)':'var(--bs-light)'}>
                  {l.label}
                  {isActive && <span style={{
                    position:'absolute', bottom:-8, left:0, right:0,
                    height:1.5, background:'var(--bs-leaf)', borderRadius:1,
                  }}/>}
                </a>
              );
            })}
          </nav>

          <div className="bs-nav-desktop-right" style={{display:'flex', alignItems:'center', gap:20}}>
            <div style={{fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'0.16em', display:'flex', gap:8, alignItems:'center'}}>
              <span style={{color:"var(--bs-leaf)"}}>FR</span>
              <span style={{color:"rgba(154,142,127,0.4)"}}>·</span>
              <a href={onHome ? "en/index.html" : "en/atelier.html"} style={{color:"var(--bs-muted)", textDecoration:"none", transition:"color .2s"}}
                 onMouseEnter={e => e.currentTarget.style.color = "var(--bs-leaf)"}
                 onMouseLeave={e => e.currentTarget.style.color = "var(--bs-muted)"}>EN</a>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:10}}>
              <a className="btn btn-primary" style={{padding:'9px 20px', fontSize:12.5}} href={onHome ? "#contact" : "index.html#contact"}>Réserver</a>
              <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(154,142,127,0.5)'}}>ou</span>
              <a className="btn btn-primary" style={{padding:'9px 20px', fontSize:12.5}} href={`tel:${PHONE_NUMBER}`} title={PHONE_DISPLAY}>Appelez-nous</a>
            </div>
          </div>

          <button
            type="button"
            className="bs-nav-burger"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="bs-mobile-menu"
            onClick={() => setMenuOpen(true)}>
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {menuOpen && <MobileMenu links={links} onClose={() => setMenuOpen(false)} active={active} linkHref={linkHref} phone={PHONE_NUMBER} phoneDisplay={PHONE_DISPLAY}/>}
    </>
  );
}

function MobileMenu({links, onClose, active, linkHref, phone, phoneDisplay}) {
  const firstLinkRef = React.useRef(null);

  React.useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLinkRef.current?.focus();
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div id="bs-mobile-menu" className="bs-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu principal">
      <button type="button" className="bs-mobile-menu-close" onClick={onClose} aria-label="Fermer le menu">
        <span/><span/>
      </button>
      <nav className="bs-mobile-menu-nav">
        <ul>
          {links.map((l, i) => (
            <li key={l.id}>
              <a ref={i === 0 ? firstLinkRef : null} href={linkHref(l)} aria-current={active === l.id ? 'location' : undefined} onClick={onClose}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div style={{display:"flex", justifyContent:"center", gap:14, fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.16em", marginBottom:8}}>
        <span style={{color:"var(--bs-leaf)"}}>FR</span>
        <span style={{color:"rgba(154,142,127,0.4)"}}>·</span>
        <a href="en/index.html" style={{color:"var(--bs-muted)", textDecoration:"none"}}>EN</a>
      </div>
      <div style={{display:'flex', flexDirection:'column', gap:12, alignItems:'center'}}>
        <a className="btn btn-primary bs-mobile-menu-cta" href={linkHref({id:'contact'})} onClick={onClose}>
          Réserver une session
        </a>
        <span style={{fontFamily:'var(--font-mono)', fontSize:11, color:'rgba(154,142,127,0.5)'}}>ou</span>
        <a className="btn btn-primary bs-mobile-menu-cta" href={`tel:${phone}`}>
          Appelez-nous
        </a>
      </div>
    </div>
  );
}

export default Nav;