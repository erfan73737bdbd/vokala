document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".lawyer-slider-wrapper");
  const track = document.getElementById("lawyerSliderTrack");
  const rightBtn = document.querySelector(".lawyer-slider-btn--right");
  const leftBtn = document.querySelector(".lawyer-slider-btn--left");

  if (!track) return;

  const originalPages = track.querySelectorAll(".lawyer-slider-page");
  if (originalPages.length <= 1) {
    if (rightBtn) rightBtn.style.display = "none";
    if (leftBtn) leftBtn.style.display = "none";
    return;
  }

  // ایجاد کلون‌ها برای ساخت حلقه ۳۶۰ درجه
  const firstClone = originalPages[0].cloneNode(true);
  const lastClone = originalPages[originalPages.length - 1].cloneNode(true);

  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  const allPages = track.querySelectorAll(".lawyer-slider-page");
  let currentIndex = 1;
  let isTransitioning = false;
  let autoplayTimer = null;
  const AUTOPLAY_INTERVAL = 4000;

  const updatePosition = (animated = true) => {
    track.style.transition = animated ? "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)" : "none";
    // در چیدمان RTL، جابجایی اسلاید با مقدار مثبت translateX انجام می‌گردد
    track.style.transform = `translateX(${currentIndex * 100}%)`;
  };

  updatePosition(false);

  // حرکت به جلو (به سمت چپ در RTL)
  const goForward = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updatePosition(true);
  };

  // حرکت به عقب (به سمت راست در RTL)
  const goBackward = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updatePosition(true);
  };

  // ریست مخفیانه در انتهای انیمیشن برای پایداری حلقه بی‌نهایت
  track.addEventListener("transitionend", () => {
    isTransitioning = false;
    if (currentIndex >= allPages.length - 1) {
      currentIndex = 1;
      updatePosition(false);
    } else if (currentIndex <= 0) {
      currentIndex = allPages.length - 2;
      updatePosition(false);
    }
  });

  // کنترل اتوپلی
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(goForward, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  // کلیک روی دکمه چپ (جلو برنده)
  if (leftBtn) {
    leftBtn.addEventListener("click", () => {
      stopAutoplay();
      goForward();
      startAutoplay();
    });
  }

  // کلیک روی دکمه راست (عقب برنده)
  if (rightBtn) {
    rightBtn.addEventListener("click", () => {
      stopAutoplay();
      goBackward();
      startAutoplay();
    });
  }

  // مکث خودکار در صورت قرار گرفتن موس
  if (wrapper) {
    wrapper.addEventListener("mouseenter", stopAutoplay);
    wrapper.addEventListener("mouseleave", startAutoplay);
    wrapper.addEventListener("touchstart", stopAutoplay, { passive: true });
    wrapper.addEventListener("touchend", startAutoplay, { passive: true });
  }

  startAutoplay();
});
