import { findConfusion } from "./data/confusions.js";

/* ---- Footer year ---- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 6, 6) * 60}ms`;
    el.classList.add("reveal-armed");
    revealObserver.observe(el);
  });
}

/* ---- Search: what words are confusing you? ---- */
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchResult = document.getElementById("searchResult");

function showResult(query) {
  if (!searchResult) return;
  const match = findConfusion(query);

  if (match) {
    searchResult.innerHTML = `
      <strong>${match.terms.slice(0, 3).map((t) => escapeHtml(t)).join(" / ")}</strong>
      <p style="margin:6px 0 10px;color:var(--ink-500);">${escapeHtml(match.hint)}</p>
      <a href="${match.url}">Read the full explanation →</a>
    `;
  } else {
    searchResult.innerHTML = `
      <p style="margin:0 0 10px;">We don't have that exact pair yet — but here are the confusions people search most.</p>
      <a href="#confusions">Browse popular word confusions →</a>
    `;
  }
  searchResult.classList.add("is-active");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchInput.value.trim()) showResult(searchInput.value);
  });

  document.querySelectorAll(".search-suggestions button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.query || btn.textContent;
      searchInput.value = q;
      showResult(q);
      searchInput.focus();
    });
  });
}
