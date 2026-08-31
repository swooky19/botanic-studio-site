import React from 'react';
// Hero.jsx — v2: Inter Tight 800, proper weight hierarchy + effet machine à écrire

const SEGMENTS = [
  { text: 'La musique', type: 'plain' },
  { type: 'br' },
  { text: 'prend racine', type: 'em' },
  { type: 'br' },
  { text: 'ici.', type: 'plain' },
];

function TypewriterHeadline() {
  const [count, setCount] = React.useState(0);

  const totalChars = React.useMemo(
    () => SEGMENTS.reduce((sum, s) => sum + (s.type === 'br' ? 0 : s.text.length), 0),
    []
  );

  React.useEffect(() => {
    if (count >= totalChars) return;
    const speed = 42;
    const timer = setTimeout(() => setCount(c => c + 1), speed);
    return () => clearTimeout(timer);
  }, [count, totalChars]);

  const isDone = count >= totalChars;

  const caret = (
    <span style={{
      display:'inline-block',
      width:'0.05em',
      height:'0.72em',
      background:'var(--bs-leaf)',
      marginLeft:'0.03em',
      verticalAlign:'-0.06em',
      animation:'bs-caret-blink 0.9s step-end infinite',
    }} />
  );

  let consumed = 0;
  const rendered = [];

  SEGMENTS.forEach((seg, i) => {
    if (seg.type === 'br') {
      rendered.push(<br key={'br-' + i} />);
      return;
    }
    const segLen = seg.text.length;
    const segStart = consumed;
    const segEnd = consumed + segLen;
    consumed = segEnd;

    const shownInSeg = Math.min(segLen, Math.max(0, count - segStart));
    const shown = seg.text.slice(0, shownInSeg);
    const isActiveSegment = !isDone && count >= segStart && count < segEnd;

    const content = seg.type === 'em'
      ? <em key={'seg-' + i} style={{ fontStyle:'italic', fontWeight:600, color:'var(--bs-leaf)' }}>{shown}</em>
      : <React.Fragment key={'seg-' + i}>{shown}</React.Fragment>;

    rendered.push(content);
    if (isActiveSegment) {
      rendered.push(React.cloneElement(caret, { key: 'caret-' + i }));
    }
  });

  return (
    <h1 className="reveal reveal-d1" style={{
      fontFamily:'var(--font-display)', fontWeight:800,
      fontSize:'clamp(60px, 10vw, 138px)', lineHeight:0.96,
      letterSpacing:'-0.038em', margin:'0 0 38px', textWrap:'balance',
    }}>
      {rendered}
      <style>{`
        @keyframes bs-caret-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </h1>
  );
}

function Hero() {
  React.useEffect(() => {
    // kick off IntersectionObserver for scroll-reveals on the rest of the page
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal-on-scroll').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="top" style={{minHeight:'100vh', padding:'148px 0 100px', display:'flex', alignItems:'center', position:'relative', overflow:'hidden'}}>
      {/* Background */}
      <div style={{position:'absolute', inset:0, zIndex:0}}>
        <img src="/assets/photos/studio-control-room.webp" alt="" role="presentation" style={{width:'100%', height:'100%', objectFit:'cover', filter:'brightness(0.38) contrast(1.06) saturate(0.82)'}}/>
        <div style={{position:'absolute', inset:0, background:'radial-gradient(ellipse at 72% 38%, rgba(74,124,89,0.22), transparent 52%)'}}/>
        <div style={{position:'absolute', inset:0, background:'linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0) 28%, rgba(10,9,8,0.9) 100%)'}}/>
      </div>

      <div className="container" style={{position:'relative', zIndex:1}}>
        <div style={{maxWidth:1020}}>
          <div className="eyebrow reveal" style={{marginBottom:32}}>
            Lausanne · Studio d'enregistrement, composition &amp; mixage
          </div>

          <TypewriterHeadline />

          <p className="reveal reveal-d2" style={{
            fontFamily:'var(--font-sans)', fontSize:'clamp(16px, 1.5vw, 20px)',
            fontWeight:300, lineHeight:1.65, color:'var(--bs-muted)',
            maxWidth:520, margin:'0 0 48px', textWrap:'pretty',
          }}>
            Un atelier intime où chaque projet est cultivé comme une plante rare.
            De la graine au mix final, on prend le temps qu'il faut.
          </p>

          <div className="reveal reveal-d3" style={{display:'flex', gap:14, flexWrap:'wrap'}}>
            <a className="btn btn-primary" href="#contact">Prends rendez-vous</a>
            <a className="btn btn-ghost" href="#services">Voir les services</a>
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div style={{
        position:'absolute', right:40, bottom:48, zIndex:2,
        display:'flex', alignItems:'center', gap:10,
        fontFamily:'var(--font-mono)', fontSize:10.5, letterSpacing:'0.14em', color:'var(--bs-muted)',
      }}>
        <span style={{
          width:7, height:7, borderRadius:'50%',
          background:'var(--bs-leaf)', boxShadow:'0 0 10px var(--bs-leaf)',
          animation:'bs-pulse 2.4s ease-in-out infinite', display:'block',
        }}/>
        STUDIO OUVERT · SESSION EN COURS
      </div>

      <style>{`
        @keyframes bs-pulse {
          0%,100%{opacity:1;transform:scale(1);}
          50%{opacity:0.35;transform:scale(0.8);}
        }
      `}</style>
    </section>
  );
}

export default Hero;