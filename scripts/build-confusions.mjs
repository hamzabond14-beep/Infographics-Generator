/**
 * Generates /confusions/*.html from scripts/confusion-content.mjs.
 * Run with: node scripts/build-confusions.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CONFUSIONS } from "./confusion-content.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "..", "confusions");
mkdirSync(OUT_DIR, { recursive: true });

const bySlug = Object.fromEntries(CONFUSIONS.map((c) => [c.slug, c]));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderExamples(examples) {
  if (!examples || !examples.length) return "";
  return `
    <div class="example-pair">
      ${examples
        .map(
          (ex) => `
        <div class="example-row example-good">
          <span class="example-mark" aria-hidden="true">&#10003;</span>
          <span>${ex.good}</span>
        </div>
        <div class="example-row example-bad">
          <span class="example-mark" aria-hidden="true">&#10005;</span>
          <span>${ex.bad}</span>
        </div>`
        )
        .join("")}
    </div>`;
}

function renderSections(sections) {
  return sections
    .map(
      (s) => `
      <div class="detail-section">
        <h2>${s.heading}</h2>
        <p>${s.body}</p>
        ${renderExamples(s.examples)}
      </div>`
    )
    .join("\n");
}

function renderRelated(relatedSlugs) {
  const items = relatedSlugs
    .map((slug) => bySlug[slug])
    .filter(Boolean)
    .map(
      (r) => `
      <a class="word-card" href="${r.slug}.html">
        <div class="word-card__terms"><span>${r.title.replace(/ vs /g, "</span><span class=\"vs\">vs</span><span>")}</span></div>
        <p class="word-card__hint">${r.quickAnswer}</p>
        <span class="word-card__link">Learn the difference <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
      </a>`
    )
    .join("\n");
  return items;
}

function faqSchema(entry) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the difference between ${entry.title}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: entry.quickAnswer.replace(/<[^>]+>/g, ""),
        },
      },
    ],
  };
}

function page(entry) {
  const url = `https://wordconfusion.com/confusions/${entry.slug}.html`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${entry.title} — What's the Difference? | WordConfusion</title>
<meta name="description" content="${escapeHtml(entry.metaDescription)}" />
<link rel="canonical" href="${url}" />

<meta property="og:type" content="article" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${entry.title} — What's the Difference?" />
<meta property="og:description" content="${escapeHtml(entry.metaDescription)}" />
<meta property="og:image" content="https://wordconfusion.com/assets/og-image.png" />
<meta property="og:site_name" content="WordConfusion" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${entry.title} — What's the Difference?" />
<meta name="twitter:description" content="${escapeHtml(entry.metaDescription)}" />
<meta name="twitter:image" content="https://wordconfusion.com/assets/og-image.png" />

<meta name="theme-color" content="#4f4fe8" />
<link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
<link rel="manifest" href="../assets/site.webmanifest" />

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet" />

<link rel="stylesheet" href="../css/base.css" />
<link rel="stylesheet" href="../css/components.css" />
<link rel="stylesheet" href="../css/detail.css" />

<script type="application/ld+json">${JSON.stringify(faqSchema(entry))}</script>
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>

<header class="site-header">
  <div class="container nav-bar">
    <a href="../index.html" class="brand" aria-label="WordConfusion home">
      <svg class="brand-mark" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="url(#brandGrad)" />
        <path d="M13 25.5c0-5.2 3.6-9 7.2-9 3.2 0 5.3 2.1 5.3 5 0 3.3-2.6 4.8-4.5 6-1.4.9-2.2 1.6-2.2 2.7" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none"/>
        <defs>
          <linearGradient id="brandGrad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stop-color="#4f4fe8"/>
            <stop offset="1" stop-color="#f2a53a"/>
          </linearGradient>
        </defs>
      </svg>
      WordConfusion
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Primary">
      <a href="../index.html#confusions">Word Confusions</a>
      <a href="../index.html#how-it-works">How It Works</a>
      <a href="../index.html#search">Search</a>
      <a href="../index.html#learn">Learn</a>
    </nav>
    <div class="nav-actions">
      <a href="../index.html#search" class="btn btn-secondary btn-sm">Search a Word</a>
      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navLinks" aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </div>
</header>

<main id="main">
  <article class="section detail-page">
    <div class="container" style="max-width: 800px;">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="../index.html">Home</a>
        <span>/</span>
        <a href="../index.html#confusions">Word Confusions</a>
        <span>/</span>
        <span>${entry.title}</span>
      </nav>

      <span class="eyebrow">Word confusion</span>
      <h1>${entry.title}</h1>

      <div class="quick-answer">
        <span class="quick-answer__label">Quick answer</span>
        <p>${entry.quickAnswer}</p>
      </div>

      ${renderSections(entry.sections)}

      <div class="memory-trick">
        <span class="eyebrow">Memory trick</span>
        <p>${entry.trick}</p>
      </div>
    </div>
  </article>

  <section class="section section-alt">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Keep learning</span>
        <h2>Related word confusions</h2>
      </div>
      <div class="word-grid word-grid-2col">
        ${renderRelated(entry.relatedSlugs)}
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="final-cta reveal">
        <h2>Have another word tripping you up?</h2>
        <p class="lede">Search it on WordConfusion and get a clear answer in seconds.</p>
        <div class="cta-row">
          <a href="../index.html#search" class="btn btn-primary">Find an Answer</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-bottom" style="margin-top:0;border-top:none;padding-top:0;">
      <span>&copy; <span id="year"></span> WordConfusion.com. All rights reserved.</span>
      <a href="../index.html">Back to home</a>
    </div>
  </div>
</footer>

<script type="module" src="../js/main.js"></script>
</body>
</html>
`;
}

for (const entry of CONFUSIONS) {
  const html = page(entry);
  writeFileSync(join(OUT_DIR, `${entry.slug}.html`), html, "utf8");
  console.log(`wrote confusions/${entry.slug}.html`);
}
