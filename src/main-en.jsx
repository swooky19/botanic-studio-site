import React from 'react';
import { createRoot } from 'react-dom/client';

import '/src/styles/colors_and_type.css';
import '/src/styles/site.css';
import Nervures from '/src/lib/nervures.js';

import Nav from './components/en/Nav.jsx';
import Hero from './components/en/Hero.jsx';
import Services from './components/en/Services.jsx';
import Team from './components/en/Team.jsx';
import Equipment from './components/en/Equipment.jsx';
import Credits from './components/en/Credits.jsx';
import Testimonials from './components/en/Testimonials.jsx';
import Contact from './components/en/Contact.jsx';
import Footer from './components/en/Footer.jsx';

let nervures = null;
  if (window.Nervures) {
    nervures = Nervures.mount(document.getElementById('site-bg'), {
      intensity: 0.85,
      interactRoot: window
    });
    window.__bgShader = nervures;
  }

  const SECTION_INTENSITY = {
    top:          1.00,
    services:     0.15,
    equipe:       0.95,
    arsenal:      0.15,
    credits:      0.80,
    testimonials: 0.20,
    contact:      1.00,
  };
  const FOOTER_INTENSITY = 0.70;

  let intensityObs = null;

  function observeSections() {
    if (!nervures) return;
    if (intensityObs) intensityObs.disconnect();
    const sections = Array.from(document.querySelectorAll('main > section[id], footer'));
    const ratios = new Map();
    intensityObs = new IntersectionObserver((entries) => {
      for (const e of entries) ratios.set(e.target, e.intersectionRatio);
      let num = 0, den = 0;
      for (const [el, r] of ratios) {
        if (r <= 0) continue;
        const k = el.id || (el.tagName === 'FOOTER' ? '__footer' : '');
        const v = k === '__footer' ? FOOTER_INTENSITY : (SECTION_INTENSITY[k] ?? 0.6);
        num += v * r; den += r;
      }
      if (den > 0) {
        const target = num / den;
        nervures.setIntensity(target);
        document.getElementById('site-bg').style.opacity = (0.40 + target * 0.35).toFixed(3);
      }
    }, { threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.9, 1] });
    sections.forEach(s => intensityObs.observe(s));
  }

  window.addEventListener('beforeunload', () => {
    if (intensityObs) intensityObs.disconnect();
  });

  function tagSections() {
    const cream = ['services', 'arsenal', 'testimonials'];
    cream.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.setAttribute('data-bg', 'light');
    });
  }

  function scrollToHashIfPresent() {
    if (!window.location.hash) return;
    const id = window.location.hash.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  window.__bsAppMounted = () => { tagSections(); observeSections(); scrollToHashIfPresent(); };

function App() {
  React.useEffect(() => {
    if (typeof window.__bsAppMounted === 'function') window.__bsAppMounted();
  }, []);
  return (
    <>
      <Nav/>
      <main>
        <Hero/><Services/><Team/><Equipment/><Credits/><Testimonials/><Contact/>
      </main>
      <Footer/>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App/>);