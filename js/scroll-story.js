/**
 * Plays the reference video back as a scroll-scrubbed image sequence:
 * 30 frames (extracted from the source video, ~3fps) are drawn to a
 * <canvas> based on how far the visitor has scrolled through a tall
 * pinned section — so scrolling down "plays" the confusion -> clarity
 * story, and scrolling up rewinds it. No autoplaying <video>.
 */

const FRAME_COUNT = 30;
const FRAME_BASE = "assets/story-frames/frame_";
const FRAME_PAD = 3;

const CAPTIONS = [
  { at: 0.0, mood: "neutral", text: "He walks in with a question on his mind…" },
  { at: 0.16, mood: "neutral", text: "Settling in at the desk…" },
  { at: 0.3, mood: "confused", text: "Wait — which word was it again?" },
  { at: 0.52, mood: "confused", text: "Opening the laptop to look it up…" },
  { at: 0.68, mood: "neutral", text: "Searching WordConfusion.com…" },
  { at: 0.85, mood: "confident", text: "Confusion cleared. Answer found." },
];

function frameUrl(index) {
  const n = String(index + 1).padStart(FRAME_PAD, "0");
  return `${FRAME_BASE}${n}.jpg`;
}

function captionFor(progress) {
  let current = CAPTIONS[0];
  for (const c of CAPTIONS) {
    if (progress >= c.at) current = c;
  }
  return current;
}

function initScrollStory() {
  const section = document.getElementById("scrollStory");
  if (!section) return;

  const canvas = document.getElementById("storyCanvas");
  const captionEl = document.getElementById("storyCaption");
  const captionText = document.getElementById("storyCaptionText");
  const progressBar = document.getElementById("storyProgressBar");
  const hint = document.getElementById("storyHint");
  const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function drawStatic() {
    section.classList.add("is-static");
    const img = new Image();
    img.decoding = "async";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
    };
    img.src = frameUrl(FRAME_COUNT - 1);
    if (captionText) captionText.textContent = CAPTIONS[CAPTIONS.length - 1].text;
    if (captionEl) captionEl.dataset.mood = "confident";
    if (progressBar) progressBar.style.width = "100%";
  }

  if (reduceMotionQuery.matches) {
    drawStatic();
    return;
  }

  const images = new Array(FRAME_COUNT);
  let loadedCount = 0;
  let ready = false;

  function preload() {
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          ready = true;
          render();
        }
      };
      img.src = frameUrl(i);
      images[i] = img;
    }
  }

  let lastIndex = -1;

  function render() {
    if (!ready) return;
    const rect = section.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, -rect.top / scrollable)) : 0;

    const index = Math.min(FRAME_COUNT - 1, Math.floor(progress * (FRAME_COUNT - 1)));
    const img = images[index];
    if (img && img.complete && img.naturalWidth && index !== lastIndex) {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastIndex = index;
    }

    if (progressBar) progressBar.style.width = `${progress * 100}%`;
    if (captionEl && captionText) {
      const c = captionFor(progress);
      if (captionText.textContent !== c.text) captionText.textContent = c.text;
      captionEl.dataset.mood = c.mood;
    }
    if (hint) hint.classList.toggle("is-hidden", progress > 0.03);
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      render();
      ticking = false;
    });
  }

  const loadObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          preload();
          loadObserver.disconnect();
        }
      });
    },
    { rootMargin: "800px 0px 800px 0px" }
  );
  loadObserver.observe(section);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  reduceMotionQuery.addEventListener("change", (e) => {
    if (e.matches) {
      window.removeEventListener("scroll", onScroll);
      drawStatic();
    }
  });
}

initScrollStory();
