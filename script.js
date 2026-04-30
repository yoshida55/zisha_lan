window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ヘッダー：スクロールでロゴ非表示＋背景つき小型に
(function () {
  const header = document.querySelector(".header");
  if (!header) return;
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 80) {
        header.classList.add("header_scrolled");
      } else {
        header.classList.remove("header_scrolled");
      }
    },
    { passive: true },
  );
})();

// ヒーロー動画クロスフェード（5秒ごとに交互切り替え）
(function () {
  const v1 = document.querySelector(".home_hero_bg_video_1");
  const v2 = document.querySelector(".home_hero_bg_video_2");
  if (!v1 || !v2) return;

  const DURATION = 5000;
  let current = 1;

  setInterval(() => {
    if (current === 1) {
      v1.style.opacity = "0";
      v2.currentTime = 0;
      v2.style.opacity = "1";
      v2.play();
      current = 2;
    } else {
      v2.style.opacity = "0";
      v1.currentTime = 0;
      v1.style.opacity = "1";
      v1.play();
      current = 1;
    }
  }, DURATION);
})();

// スクロール出現アニメーション
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is_visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

const softRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is_visible");
        softRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 },
);

document.querySelectorAll(".js_soft_reveal").forEach((el) => softRevealObserver.observe(el));

// 自動無限スライダー
const track = document.getElementById("sliderTrack");

if (track) {
  const cards = Array.from(track.querySelectorAll(".slide_card"));
  cards.forEach((card) => track.appendChild(card.cloneNode(true)));

  let pos = 0;
  let paused = false;
  const speed = 0.6;
  const totalWidth = cards.length * (420 + 4);

  function autoSlide() {
    if (!paused) {
      pos -= speed;
      if (Math.abs(pos) >= totalWidth) pos = 0;
      track.style.transform = `translateX(${pos}px)`;
    }
    requestAnimationFrame(autoSlide);
  }

  autoSlide();

  track.addEventListener("mouseenter", () => {
    paused = true;
  });
  track.addEventListener("mouseleave", () => {
    paused = false;
  });
}

function scrollToCard(id) {
  const card = document.getElementById(id);
  card.scrollIntoView({ behavior: "smooth", block: "center" });
  card.style.boxShadow = "0 0 0 3px #2563eb, 0 8px 32px rgba(37,99,235,0.2)";
  setTimeout(() => (card.style.boxShadow = ""), 1500);
}

function closeSection() {
  const section = document.querySelector(".section");
  section.style.opacity = "0";
  section.style.transform = "translateY(-10px)";
  section.style.transition = "opacity 0.3s, transform 0.3s";
  setTimeout(() => {
    section.style.opacity = "1";
    section.style.transform = "";
  }, 400);
}
