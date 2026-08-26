import React from 'react';
import CoverMarquee from '../CoverMarquee';
// Credits.jsx (EN) — v4: one member (Yoann), no tabs, name shown as header
function Credits() {
  const credits = [
    { track: "Slowly Burning",    artists: "NNAVY",        role: "Composer", youtube: "https://open.spotify.com/track/4jaB32QgvmVG2VOh9dUBtc" },
    { track: "Refresh & Restart", artists: "Lakna",        role: "Composer", youtube: "https://open.spotify.com/track/4bcfxUELzpbRVkjSvGS8K7" },
    { track: "Ma new bb m'attend", artists: "Lakna",       role: "Composer", youtube: "https://open.spotify.com/track/0mlNdXS3V7MHctPCW7ZnM0" },
    { track: "Muddy Boots",       artists: "Anita Bakiu",  role: "Composer", youtube: "https://open.spotify.com/track/4kBCAqJIeSr2z0oqS3aCbk" },
    { track: "joli désastre",     artists: "Marie Jay",    role: "Composer", youtube: "https://open.spotify.com/track/4SPxL3UxiuvuCQfbTCxdec" },
    { track: "boum boum barbie",  artists: "Marie Jay",    role: "Composer", youtube: "https://open.spotify.com/track/51qU69BObybLoJS2grfKBG" },
    { track: "18-30",             artists: "Lakna",        role: "Composer", youtube: "https://open.spotify.com/track/5SZ3T1lUuURGx1eoAUsrms" },
    { track: "Fire Never Dies",   artists: "ELÆNA",        role: "Composer", youtube: "https://open.spotify.com/track/5ZAJrNJZtf9xxKwHhDh72F" },
    { track: "Mêmes raisons",     artists: "Arma Jackson", role: "Composer", youtube: "https://open.spotify.com/track/0EDJwvZi2M65mJaXNr8DoO" },
  ];

  return (
    <section id="credits">
      <div className="container">
        <div className="section-head reveal-on-scroll">
          <div>
            <div className="eyebrow">Credits</div>
            <h2>What we've<br/><em>grown</em>.</h2>
          </div>
        </div>

        <div style={{
          borderBottom:"1px solid rgba(154,142,127,0.22)",
          paddingBottom:20, marginBottom:0,
        }}>
          <span style={{
            fontFamily:"var(--font-display)", fontWeight:700,
            fontSize:22, letterSpacing:"-0.025em", color:"var(--bs-light)",
          }}>
            Yoann Maeder
          </span>
          <span style={{
            display:"block", fontFamily:"var(--font-mono)", fontWeight:400,
            fontSize:9, letterSpacing:"0.2em", textTransform:"uppercase",
            color:"var(--bs-vine)", marginTop:3,
          }}>·· The grower</span>
        </div>

        <div style={{borderBottom:"1px solid var(--bs-hairline)"}}>
          {credits.map((c, i) => {
            const Wrapper = c.youtube ? "a" : "div";
            const linkProps = c.youtube ? { href: c.youtube, target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Wrapper key={c.track} {...linkProps}
                className="reveal-on-scroll"
                style={{
                  transitionDelay:`${i * 60}ms`,
                  display:"grid", gridTemplateColumns:"1.2fr 1fr 1fr 40px",
                  gap:28, alignItems:"center",
                  padding:"22px 0", borderTop:"1px solid var(--bs-hairline)",
                  transition:"background .2s, padding-left .2s var(--bs-ease-organic)",
                  cursor: c.youtube ? "pointer" : "default",
                  textDecoration:"none", color:"inherit",
                }}
                onMouseEnter={e=>{ e.currentTarget.style.background="rgba(127,176,105,0.05)"; e.currentTarget.style.paddingLeft="10px"; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.paddingLeft="0"; }}>
                <span style={{fontFamily:"var(--font-display)", fontWeight:700, fontSize:22, letterSpacing:"-0.025em", lineHeight:1.1}}>
                  {c.track}
                </span>
                <span style={{fontFamily:"var(--font-sans)", fontSize:13.5, color:"var(--bs-muted)", lineHeight:1.3}}>
                  {c.artists}
                </span>
                <span style={{fontFamily:"var(--font-mono)", fontSize:10, letterSpacing:"0.1em", color:"var(--bs-vine)", textTransform:"uppercase"}}>
                  {c.role}
                </span>
                <span style={{fontFamily:"var(--font-mono)", fontSize:14, color: c.youtube ? "var(--bs-leaf)" : "rgba(154,142,127,0.35)", justifySelf:"end"}}>→</span>
              </Wrapper>
            );
          })}
        </div>

        <CoverMarquee />

      </div>
    </section>
  );
}

export default Credits;