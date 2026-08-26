import React from 'react';
// Testimonials.jsx (EN) — UI labels English, quotes kept in their authored French.
function Testimonials() {
  // Quotes stay in original French — they are testimonials from real French-speaking
  // clients; translating them would feel inauthentic. Source label and UI translated.
  const reviews = [
    {q:"Les deux belles plantes qui gèrent ce studio sont particulièrement professionnelles. Ce lieu est un jardin de créativité et un potager pour vos idées.", a:"Bartos",             src:"Google review"},
    {q:"Magnifique accueil et studio très pro !",                                                                                                                a:"Alexandra D'Auriol", src:"Google review"},
    {q:"Incroyable studio et super professionnel — merci.",                                                                                                      a:"Chiara Maria",       src:"Google review"},
    {q:"Très professionnel ! À recommander.",                                                                                                                    a:"Sarah Donateli",     src:"Google review"},
  ];

  const [idx, setIdx] = React.useState(0);
  const [outgoing, setOutgoing] = React.useState(false);
  const [paused, setPaused] = React.useState(false);

  const readDuration = Math.min(14000, Math.max(7000, reviews[idx].q.length * 70));

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

  React.useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      goTo((idx + 1) % reviews.length);
    }, readDuration);
    return () => clearTimeout(id);
  }, [idx, paused, readDuration, goTo, reviews.length]);

  React.useEffect(() => {
    if (!paused) return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft")  goTo((idx - 1 + reviews.length) % reviews.length);
      if (e.key === "ArrowRight") goTo((idx + 1) % reviews.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx, paused, goTo, reviews.length]);

  return (
    <section id="testimonials"
      style={{background:"var(--bs-surface)"}}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <div className="eyebrow reveal-on-scroll" style={{textAlign:"center", marginBottom:32}}>
          What they say
        </div>

        <div style={{
          maxWidth:980, margin:"0 auto",
          display:"grid", gridTemplateColumns:"auto 1fr auto",
          gap:24, alignItems:"center", minHeight:260,
        }}>
          <NavArrow direction="prev" onClick={() => goTo((idx - 1 + reviews.length) % reviews.length)} />

          <div style={{textAlign:"center"}}>
            <div key={idx} className={outgoing ? "bs-review-out" : "bs-review-in"}>
              <p style={{
                fontFamily:"var(--font-display)", fontStyle:"italic", fontWeight:600,
                fontSize:"clamp(24px, 3vw, 40px)", lineHeight:1.22, letterSpacing:"-0.02em",
                margin:"0 0 32px", textWrap:"balance", color:"var(--bs-light)",
              }}>
                <span style={{color:"var(--bs-leaf)", fontStyle:"normal", fontSize:"1.3em", verticalAlign:"-0.12em", marginRight:"0.06em"}}>"</span>
                {reviews[idx].q}
                <span style={{color:"var(--bs-leaf)", fontStyle:"normal", fontSize:"1.3em", verticalAlign:"-0.35em", marginLeft:"0.04em"}}>"</span>
              </p>

              <div style={{
                fontFamily:"var(--font-mono)", fontSize:11, letterSpacing:"0.2em",
                color:"var(--bs-muted)", textTransform:"uppercase",
              }}>
                <span style={{color:"var(--bs-harvest)", marginRight:14}}>★★★★★</span>
                {reviews[idx].a} · {reviews[idx].src}
              </div>
            </div>
          </div>

          <NavArrow direction="next" onClick={() => goTo((idx + 1) % reviews.length)} />
        </div>

        <div style={{display:"flex", gap:10, justifyContent:"center", marginTop:48, alignItems:"center"}}>
          {reviews.map((_, j) => {
            const active = idx === j;
            return (
              <button key={j} onClick={() => goTo(j)}
                aria-label={`Review ${j+1}`}
                style={{
                  position:"relative", overflow:"hidden",
                  width: active ? 36 : 7, height:7,
                  borderRadius:999, border:0, padding:0,
                  background: active ? "rgba(127,176,105,0.22)" : "rgba(154,142,127,0.22)",
                  transition:"width .5s var(--bs-ease-organic), background .35s var(--bs-ease-organic)",
                  cursor:"pointer",
                }}>
                {active && (
                  <span
                    key={`${idx}-${paused ? "p" : "r"}`}
                    style={{
                      position:"absolute", inset:0,
                      background:"var(--bs-leaf)",
                      transformOrigin:"left center",
                      animation: `bs-review-progress ${readDuration}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}/>
                )}
              </button>
            );
          })}
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

        .bs-testi-nav {
          position: relative;
          width: 44px; height: 44px; border-radius: 999px;
          border: 1px solid rgba(154,142,127,0.22);
          background: transparent;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: border-color .28s var(--bs-ease-organic), transform .28s var(--bs-ease-organic);
          flex-shrink: 0;
        }
        .bs-testi-nav-breathe {
          position: absolute; inset: -3px; border-radius: inherit;
          border: 2px solid var(--bs-leaf);
          opacity: 0;
          animation: bs-testi-breathe 3.8s ease-in-out infinite;
          pointer-events: none;
        }
        .bs-testi-nav:hover { border-color: var(--bs-leaf); }
        .bs-testi-nav.is-prev:hover { transform: translateX(-3px); }
        .bs-testi-nav.is-next:hover { transform: translateX( 3px); }
        .bs-testi-nav:hover .bs-testi-nav-breathe { animation-play-state: paused; opacity: 0; }
        .bs-testi-nav-arrow {
          font-family: var(--font-mono); font-size: 16px; line-height: 1;
          color: rgba(154,142,127,0.65);
          transition: color .28s var(--bs-ease-organic);
        }
        .bs-testi-nav:hover .bs-testi-nav-arrow { color: var(--bs-leaf); }
        .bs-testi-nav-ripple {
          position: absolute; inset: -2px; border-radius: inherit;
          border: 2px solid var(--bs-leaf);
          animation: bs-testi-ripple 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }
        @keyframes bs-testi-breathe {
          0%, 100% { opacity: 0.22; transform: scale(0.92); border-width: 4px; }
          50%      { opacity: 0.58; transform: scale(1.06); border-width: 2px; }
        }
        @keyframes bs-testi-ripple {
          from { transform: scale(1);   opacity: 0.85; }
          to   { transform: scale(2.4); opacity: 0;    }
        }

        @media (prefers-reduced-motion: reduce) {
          .bs-review-in, .bs-review-out { animation: none; }
          .bs-testi-nav-breathe, .bs-testi-nav-ripple { animation: none; opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function NavArrow({direction, onClick}) {
  const isPrev = direction === "prev";
  const [ripples, setRipples] = React.useState([]);

  const handleClick = () => {
    const id = Date.now() + Math.random();
    setRipples(rs => [...rs, id]);
    setTimeout(() => setRipples(rs => rs.filter(r => r !== id)), 700);
    onClick();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isPrev ? "Previous review" : "Next review"}
      className={`bs-testi-nav ${isPrev ? "is-prev" : "is-next"}`}>
      <span className="bs-testi-nav-breathe" aria-hidden="true"/>
      {ripples.map(id => (
        <span key={id} className="bs-testi-nav-ripple" aria-hidden="true"/>
      ))}
      <span className="bs-testi-nav-arrow" aria-hidden="true">{isPrev ? "←" : "→"}</span>
    </button>
  );
}

export default Testimonials;
