import React from 'react';
// Testimonials.jsx — v3: adaptive duration, paired out/in transition, progress bar
function Testimonials() {
  const reviews = [
    {q:'Les deux belles plantes qui gèrent ce studio sont particulièrement professionnelles. Ce lieu est un jardin de créativité et un potager pour vos idées.', a:'Bartos',             src:'Google review'},
    {q:'Magnifique accueil et studio très pro !',                                                                                                                a:'Alexandra D’Auriol', src:'Google review'},
    {q:'Incroyable studio et super professionnel — merci.',                                                                                                      a:'Chiara Maria',       src:'Google review'},
    {q:'Très professionnel ! À recommander.',                                                                                                                    a:'Sarah Donateli',     src:'Google review'},
  ];

  const [idx, setIdx] = React.useState(0);
  const [outgoing, setOutgoing] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  // Reading time scales with quote length so a 200-char review gets longer
  // on screen than a 30-char one. Floor at 7s (enough to scan the shortest
  // quote without rushing), ceiling at 14s.
  const readDuration = Math.min(14000, Math.max(7000, reviews[idx].q.length * 70));

  // Two-phase transition: outgoing slide-fade-left (380ms), then idx swap,
  // then incoming slide-fade-right (700ms via bs-review-in keyframe).
  const goTo = React.useCallback((next) => {
    setIdx(curr => {
      if (next === curr) return curr;
      setOutgoing(true);
      setTimeout(() => {
        setIdx(next);
        setOutgoing(false);
      }, 380);
      return curr;
    });
  }, []);

  // Auto-advance after readDuration; pauses while the cursor is over the section.
  React.useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      goTo((idx + 1) % reviews.length);
    }, readDuration);
    return () => clearTimeout(id);
  }, [idx, paused, readDuration, goTo, reviews.length]);

  // Keyboard navigation: left/right arrows step between reviews when the
  // section is in focus or the cursor is over it.
  React.useEffect(() => {
    if (!paused) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  goTo((idx - 1 + reviews.length) % reviews.length);
      if (e.key === 'ArrowRight') goTo((idx + 1) % reviews.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, paused, goTo, reviews.length]);

  return (
    <section id="testimonials"
      style={{background:'var(--bs-surface)'}}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <div className="eyebrow reveal-on-scroll" style={{textAlign:'center', marginBottom:32}}>
          Ce qu’ils en disent
        </div>

        <div style={{
          maxWidth:980, margin:'0 auto',
          display:'grid', gridTemplateColumns:'1fr',
          gap:24, alignItems:'center', minHeight:260,
        }}>

          <div style={{textAlign:'center'}}>
            {/* Re-keying on idx forces React to remount, so the bs-review-in
                animation fires every time. The outgoing class is what plays
                when we're transitioning away from the current review. */}
            <div key={idx} className={outgoing ? 'bs-review-out' : 'bs-review-in'}>
              <p style={{
                fontFamily:'var(--font-display)', fontStyle:'italic', fontWeight:600,
                fontSize:'clamp(24px, 3vw, 40px)', lineHeight:1.22, letterSpacing:'-0.02em',
                margin:'0 0 32px', textWrap:'balance', color:'var(--bs-light)',
              }}>
                <span style={{color:'var(--bs-leaf)', fontStyle:'normal', fontSize:'1.3em', verticalAlign:'-0.12em', marginRight:'0.06em'}}>"</span>
                {reviews[idx].q}
                <span style={{color:'var(--bs-leaf)', fontStyle:'normal', fontSize:'1.3em', verticalAlign:'-0.35em', marginLeft:'0.04em'}}>"</span>
              </p>

              <div style={{
                fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.2em',
                color:'var(--bs-muted)', textTransform:'uppercase',
              }}>
                <span style={{color:'var(--bs-harvest)', marginRight:14}}>★★★★★</span>
                {reviews[idx].a} · {reviews[idx].src}
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes bs-review-in {
          from { opacity: 0; transform: translateX(28px) scale(0.985); filter: blur(2px); }
          to   { opacity: 1; transform: translateX(0)    scale(1);     filter: blur(0); }
        }
        @keyframes bs-review-out {
          from { opacity: 1; transform: translateX(0)     scale(1);     filter: blur(0); }
          to   { opacity: 0; transform: translateX(-22px) scale(0.985); filter: blur(2px); }
        }
        @keyframes bs-review-progress {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .bs-review-in  { animation: bs-review-in  700ms var(--bs-ease-organic) both; }
        .bs-review-out { animation: bs-review-out 380ms var(--bs-ease-organic) both; }

      `}</style>
    </section>
  );
}


export default Testimonials;
