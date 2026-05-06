window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// ヘッダー：スクロール80px超えたら白背景に切り替え
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

// モバイルメニュー
(function () {
  const nav = document.querySelector(".header_actions");
  const button = document.querySelector(".hamburger");
  if (!nav || !button) return;

  button.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is_open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is_open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "メニューを開く");
    });
  });
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

// スクロール出現アニメーション（ほぼすべての要素を対象）
const softRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is_visible");
        softRevealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 },
);

document.querySelectorAll(".js_soft_reveal_left").forEach((el) => softRevealObserver.observe(el));
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
