/**
 * Drives the hero "confusion -> clarity" story by toggling
 * data-stage on the illustration and typing the URL into the
 * laptop screen. Pauses when off-screen or the tab is hidden;
 * respects prefers-reduced-motion by freezing on the resolved frame.
 */

const STAGES = [
  { name: "enter", duration: 1500 },
  { name: "seated", duration: 1300 },
  { name: "confused", duration: 1900 },
  { name: "searching", duration: 2300 },
  { name: "confident", duration: 2600 },
];

const CAPTIONS = {
  enter: "Someone sits down with a question on their mind…",
  seated: "Getting settled in…",
  confused: "Wait — which word was it again?",
  searching: "Searching WordConfusion.com…",
  confident: "Confusion cleared. Answer found.",
};

const TYPED_TEXT = "WordConfusion.com";

const scene = document.getElementById("confusionScene");
const typedUrlEl = document.getElementById("typedUrl");
const captionEl = document.getElementById("sceneCaptionText");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (scene) {
  let stageIndex = 0;
  let timeoutId = null;
  let typingIntervalId = null;
  let playing = false;

  function setStage(name) {
    scene.dataset.stage = name;
    if (captionEl && CAPTIONS[name]) captionEl.textContent = CAPTIONS[name];

    clearInterval(typingIntervalId);
    if (name === "searching") {
      typeUrl();
    } else if (name === "confused" || name === "enter" || name === "seated") {
      if (typedUrlEl) typedUrlEl.textContent = "";
    }
  }

  function typeUrl() {
    if (!typedUrlEl) return;
    let i = 0;
    typedUrlEl.textContent = "";
    typingIntervalId = setInterval(() => {
      i += 1;
      typedUrlEl.textContent = TYPED_TEXT.slice(0, i);
      if (i >= TYPED_TEXT.length) clearInterval(typingIntervalId);
    }, 70);
  }

  function scheduleNext() {
    if (!playing) return;
    const stage = STAGES[stageIndex];
    setStage(stage.name);
    timeoutId = setTimeout(() => {
      stageIndex = (stageIndex + 1) % STAGES.length;
      scheduleNext();
    }, stage.duration);
  }

  function play() {
    if (playing || reduceMotionQuery.matches) return;
    playing = true;
    scheduleNext();
  }

  function pause() {
    playing = false;
    clearTimeout(timeoutId);
    clearInterval(typingIntervalId);
  }

  function freezeResolved() {
    pause();
    scene.dataset.stage = "confident";
    if (captionEl) captionEl.textContent = CAPTIONS.confident;
    if (typedUrlEl) typedUrlEl.textContent = TYPED_TEXT;
  }

  if (reduceMotionQuery.matches) {
    freezeResolved();
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && document.visibilityState === "visible") {
            play();
          } else {
            pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(scene);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        pause();
      } else if (scene.getBoundingClientRect().top < window.innerHeight) {
        play();
      }
    });

    reduceMotionQuery.addEventListener("change", (e) => {
      if (e.matches) freezeResolved();
    });
  }
}
