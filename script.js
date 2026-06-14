(() => {
  "use strict";

  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Smooth reveal, lightweight and browser-friendly.
    const revealItems = document.querySelectorAll(".reveal");
    if (!reduceMotion && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("visible"));
    }

    // Subtle tilt only on desktop/fine pointer, no constant animation loop.
    const canTilt = !reduceMotion && window.matchMedia("(pointer: fine)").matches;
    if (canTilt) {
      document.querySelectorAll(".tilt").forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 6;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * -6;
          card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-2px)`;
        });

        card.addEventListener("pointerleave", () => {
          card.style.transform = "";
        });
      });
    }

    // Internal anchor scrolling.
    document.querySelectorAll('a[href^="#"], a[href*=".html#"]').forEach((link) => {
      link.addEventListener("click", () => {
        document.documentElement.classList.remove("nav-open");
      });
    });
  });
})();
