import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-pages : une entrée HTML par page, en français et en anglais.
// Les URLs restent identiques à celles du prototype (/atelier.html, /en/…),
// donc aucune règle de réécriture n'est nécessaire côté hébergeur.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index:             resolve(__dirname, 'index.html'),
        atelier:           resolve(__dirname, 'atelier.html'),
        faq:               resolve(__dirname, 'faq.html'),
        mentions:          resolve(__dirname, 'mentions-legales.html'),
        enIndex:           resolve(__dirname, 'en/index.html'),
        enAtelier:         resolve(__dirname, 'en/atelier.html'),
        enFaq:             resolve(__dirname, 'en/faq.html'),
        enMentions:        resolve(__dirname, 'en/mentions-legales.html'),
      },
    },
  },
});
