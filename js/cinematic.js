/**
 * Cinematic homepage behaviors:
 *  - dark glass header that solidifies on scroll
 *  - hero headline word ticker
 *  - pinned scroll-story: scrubs the illustrated confusion->clarity
 *    scene (same SVG/CSS as before) by scroll position instead of a timer
 *  - horizontal "lineup" rail for the word-confusion cards
 *  - magnetic hover on primary buttons
 */

const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---- Header: solid once scrolled past the hero ---- */
const header = document.getElementById("siteHeader");
if (header) {
  const onHeaderScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  onHeaderScroll();
  window.addEventListener("scroll", onHeaderScroll, { passive: true });
}

/* ---- Hero ticker ---- */
const ticker = document.getElementById("heroTicker");
if (ticker && !reduceMotionQuery.matches) {
  const words = ["Affect or Effect", "Your or You're", "Then or Than", "Its or It's", "Accept or Except"];
  const wordEl = ticker.querySelector(".hero-cinematic__ticker-word");
  let index = 0;
  setInterval(() => {
    wordEl.classList.remove("is-active");
    wordEl.classList.add("is-leaving");
    setTimeout(() => {
      index = (index + 1) % words.length;
      wordEl.textContent = words[index];
      wordEl.classList.remove("is-leaving");
      wordEl.classList.add("is-active");
    }, 420);
  }, 2800);
}

/* ---- Pinned scroll story (scrub the illustration by scroll position) ---- */
const storySection = document.getElementById("pinnedStory");
const scene = document.getElementById("confusionScene");
const typedUrlEl = document.getElementById("typedUrl");
const storyCaptionText = document.getElementById("storyCaptionText");
const storyProgressBar = document.getElementById("storyProgressBar");
const TYPED_TEXT = "WordConfusion.com";

const STAGE_BOUNDS = [
  { name: "enter", at: 0, text: "He walks in with a question on his mind…" },
  { name: "seated", at: 0.14, text: "Settling in at the desk…" },
  { name: "confused", at: 0.32, text: "Wait — which word was it again?" },
  { name: "searching", at: 0.56, text: "Searching WordConfusion.com…" },
  { name: "confident", at: 0.84, text: "Confusion cleared. Answer found." },
];

function updateStory(progress) {
  if (!scene) return;
  let current = STAGE_BOUNDS[0];
  for (const s of STAGE_BOUNDS) {
    if (progress >= s.at) current = s;
  }
  if (scene.dataset.stage !== current.name) scene.dataset.stage = current.name;
  if (storyCaptionText && storyCaptionText.textContent !== current.text) {
    storyCaptionText.textContent = current.text;
  }
  if (storyProgressBar) storyProgressBar.style.width = `${progress * 100}%`;

  if (typedUrlEl) {
    const searchStart = STAGE_BOUNDS[3].at;
    const searchEnd = STAGE_BOUNDS[4].at;
    const searchProgress = Math.min(1, Math.max(0, (progress - searchStart) / (searchEnd - searchStart)));
    const charCount = Math.round(searchProgress * TYPED_TEXT.length);
    const next = TYPED_TEXT.slice(0, charCount);
    if (typedUrlEl.textContent !== next) typedUrlEl.textContent = next;
  }
}

function freezeStoryResolved() {
  if (scene) scene.dataset.stage = "confident";
  if (storyCaptionText) storyCaptionText.textContent = STAGE_BOUNDS[STAGE_BOUNDS.length - 1].text;
  if (storyProgressBar) storyProgressBar.style.width = "100%";
  if (typedUrlEl) typedUrlEl.textContent = TYPED_TEXT;
}

/* ---- Lineup horizontal rail ---- */
const lineupSection = document.querySelector(".lineup");
const lineupTrack = document.getElementById("lineupTrack");
const lineupProgressBar = document.getElementById("lineupProgressBar");
const desktopRail = window.matchMedia("(min-width: 761px)");

function updateLineup() {
  if (!lineupSection || !lineupTrack || !desktopRail.matches) return;
  const rect = lineupSection.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
  const maxTranslate = Math.max(0, lineupTrack.scrollWidth - lineupTrack.clientWidth);
  lineupTrack.style.transform = `translateX(${-progress * maxTranslate}px)`;
  if (lineupProgressBar) lineupProgressBar.style.width = `${progress * 100}%`;
}

function resetLineup() {
  if (lineupTrack) lineupTrack.style.transform = "";
}

/* ---- Combined scroll/resize loop ---- */
if (reduceMotionQuery.matches) {
  freezeStoryResolved();
} else {
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      if (storySection && scene) {
        const rect = storySection.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;
        updateStory(progress);
      }
      updateLineup();
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (desktopRail.matches) onScroll();
    else resetLineup();
  });
  onScroll();

  reduceMotionQuery.addEventListener("change", (e) => {
    if (e.matches) {
      window.removeEventListener("scroll", onScroll);
      freezeStoryResolved();
      resetLineup();
    }
  });
}

/* ---- Magnetic buttons (desktop, fine pointer only) ---- */
if (window.matchMedia("(pointer: fine)").matches && !reduceMotionQuery.matches) {
  document.querySelectorAll(".btn-magnetic").forEach((btn) => {
    btn.addEventListener("pointermove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
    });
    btn.addEventListener("pointerleave", () => {
      btn.style.transform = "";
    });
  });
}
