# botanicstudio.ch — le site

Site du **botanic studio**, studio d'enregistrement, composition, production et
mixage à Lausanne. Design **SATIN**.

Bilingue français / anglais, quatre pages par langue.

## Démarrage

```bash
npm install
npm run dev
```

→ <http://localhost:5173>

## Commandes

```bash
npm run dev       # serveur de développement
npm run build     # build de production dans dist/
npm run preview   # sert le build de production, pour vérification
```

## Stack

- **Vite 5** + **React 18**, en mode multi-pages
- CSS simple : `src/styles/colors_and_type.css` (les tokens du design system)
  et `src/styles/site.css`
- Aucun framework CSS, aucune dépendance d'animation : le fond animé est un
  shader maison, `src/lib/nervures.js`

Huit pages, une entrée HTML chacune, déclarées dans `vite.config.js` :

| Français | Anglais |
|---|---|
| `/` | `/en/` |
| `/atelier.html` | `/en/atelier.html` |
| `/faq.html` | `/en/faq.html` |
| `/mentions-legales.html` | `/en/mentions-legales.html` |

Le multi-pages conserve les URLs d'origine et évite toute règle de réécriture
côté hébergeur : le contenu de `dist/` se dépose tel quel sur n'importe quel
hébergement statique.

## Organisation

```
index.html, atelier.html, …    les pages françaises
en/                            les pages anglaises
src/
├── components/                les 9 composants de la page d'accueil FR
│   └── en/                    leurs équivalents anglais
├── styles/                    colors_and_type.css + site.css
├── lib/nervures.js            le fond animé
├── main-fr.jsx                point d'entrée FR
└── main-en.jsx                point d'entrée EN
public/                        images, favicon, robots.txt, sitemap.xml
api/contact.ts                 réception du formulaire, envoi via Resend
```

Les pages Atelier, FAQ et Mentions légales sont du HTML statique : elles ne
chargent pas React, uniquement les feuilles de style. C'est voulu — elles n'ont
besoin d'aucune interactivité.

## Formulaire de contact

`api/contact.ts` reçoit le formulaire et envoie l'e-mail via
[Resend](https://resend.com) : `send@botanicstudio.ch` → `info@botanicstudio.ch`.
Protections déjà en place : limitation de débit par IP, honeypot, contrôle du
temps de saisie, échappement des entrées.

Deux variables d'environnement, documentées dans `.env.example` :

- `RESEND_API_KEY` — côté serveur, jamais exposée au navigateur
- `VITE_CONTACT_API_URL` — à laisser vide si le site et la fonction sont
  déployés ensemble sur Vercel

## Mise en ligne

Voir `../MISE-EN-LIGNE.md` à la racine du dépôt.

## Modifier un contenu

Les textes sont dans les composants (`src/components/`) et dans les pages HTML
statiques. Pour la version anglaise, les fichiers correspondants sous
`src/components/en/` et `en/`.

## Référence visuelle

Le prototype d'origine est conservé dans `../ui_kits/website/`. Il se consulte
en le servant en local :

```bash
cd .. && python3 -m http.server 8080
```

→ <http://localhost:8080/ui_kits/website/index.html>

Ce site-ci doit lui être visuellement identique. Toute différence est un défaut.
