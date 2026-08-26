import React from 'react';
// CoverMarquee.jsx — bande défilante des covers produites par le studio,
// en noir et blanc, couleur au survol.

const COVERS = [
  '1_Lakna_La_La_Land.jpg',
  '1_NNAVY_Come_And_Get_It.jpg',
  '1_beka_DIS-MOINS.jpeg',
  '2_Aslo_Il_existe_une_faille.jpg',
  '2_Lakna_Refresh_and_Restart.jpg',
  '2_NNAVY_Slowly_Burning.jpg',
  '2_NNAVY_Trash.jpg',
  '2_Nayana_BACKSEAT.jpg',
  '2_beka_POESIE_DANS_LA_TRAP.jpg',
  '3_Aslo_Sans_foi_ni_loi.jpg',
  '3_Lakna_ocean.jpg',
  '3_NNAVY_So_Much.jpg',
  '3_Nayana_BACKSEAT.jpg',
  '3_Nayana_SWEET_LITTLE_BOY.jpg',
  '3_beka_TOUTENCUIR.jpg',
  '4_Aslo_Le_ventre_de_ma_m_re.jpg',
  '4_CEM_TEM_QLVEB.jpg',
  '4_Lakna_Ttc.jpg',
  '4_NNAVY_Limits_Of_Physics.jpg',
  '4_Nayana_IM_A_BEE.jpg',
  '4_beka_lake_verity.jpg',
  '5_Aslo_Mon_autre_moiti.jpg',
  '5_Lakna_Rien_nest_fait.jpg',
  '5_NNAVY_Come_And_Get_It.jpg',
  '5_NNAVY_Dance.jpg',
  '5_Nayana_I_COULD_BE.jpg',
  '5_beka_JUNYA.jpg',
  '6_Aslo_Les_images.jpg',
  '6_Lakna_Feeling_Bae.jpg',
  '6_beka_DIS-MOINS.jpeg',
  '6_beka_WES.jpg',
  '7_Ehro_la_maison.jpg',
  '8_Lakna_Refresh_and_Restart.jpg',
  'ASLO_ENTIER_EP.jpg',
  'CEM_TEM_NADA_EP.jpeg',
  'CEM_TEM_QLVEB.jpg',
  'La_Maison_web.jpg',
  'Lakna_Donnant_donnant.jpg',
  'Lakna_Univers_observable.jpg',
  'Lakna_elle.jpg',
  'Lakna_moonwalk.jpg',
  'NAYANA_OVERVIEW_EP.jpg',
  'NNAVY_SLOWLY BURNING_SINGLE.jpeg',
  'Yakary_monday_kiss.jpg',
  'beka_PO_SIE_DANS_LA_TRAP.jpg',
  'beka_dis-moins.jpeg',
  'beka_froid_dehors.jpeg',
];

function CoverMarquee() {
  // On duplique la liste pour que la boucle CSS soit continue et invisible
  const track = [...COVERS, ...COVERS];

  return (
    <div style={{
      overflow: 'hidden',
      padding: '32px 0 8px',
      borderTop: '1px solid var(--bs-hairline)',
      marginTop: 56,
    }}>
      <style>{`
        @keyframes bs-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .bs-marquee-track {
          display: flex;
          gap: 18px;
          width: max-content;
          animation: bs-marquee-scroll 55s linear infinite;
        }
        .bs-marquee-track:hover {
          animation-play-state: paused;
        }
        .bs-marquee-cover {
          width: 96px;
          height: 96px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
          filter: grayscale(1) contrast(1.05);
          opacity: 0.75;
          transition: filter 0.4s ease, opacity 0.4s ease, transform 0.4s ease;
        }
        .bs-marquee-cover:hover {
          filter: grayscale(0) contrast(1);
          opacity: 1;
          transform: scale(1.06);
        }
        @media (prefers-reduced-motion: reduce) {
          .bs-marquee-track { animation: none; }
        }
      `}</style>
      <div className="bs-marquee-track">
        {track.map((filename, i) => (
          <img
            key={filename + i}
            src={`/assets/covers/${encodeURIComponent(filename)}`}
            alt=""
            loading="lazy"
            className="bs-marquee-cover"
          />
        ))}
      </div>
    </div>
  );
}

export default CoverMarquee;