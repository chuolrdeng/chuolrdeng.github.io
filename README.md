# Chuol Ruei Deng — Portfolio

A personal portfolio site built with React and Vite. Single-page layout with smooth scroll, animations, and responsive design.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Customize

- **Content (bio, CV, research, projects):** Edit `src/data.js`. Paste your real CV highlights, research abstract from your paper, and project descriptions. Update `footerSocials` with your GitHub, LinkedIn, Instagram, and email URLs.
- **CV & research PDFs:** Place `Deng_Chuol_CV.pdf` and your capstone paper (e.g. `Chuol's Capstone Research Paper.pdf`) in `public/`. The CV and “Read full paper” links point to these files.
- **Photo:** The landing page uses `public/photo.png`; replace it with your own image.
- **Contact form:** The form posts to Formspree; replace the form ID in `ContactForm` in `src/App.jsx` with your [Formspree](https://formspree.io) form ID if you use a different account.

## Build for production

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to any static host (Vercel, Netlify, GitHub Pages, etc.).
