(() => {
  "use strict";

  const perView = () => {
    if (window.matchMedia("(max-width: 760px), (pointer: coarse)").matches) return 1;
    if (window.matchMedia("(max-width: 1120px)").matches) return 2;
    return 4;
  };

  const initHomeSlider = (box) => {
    const buttons = [...box.querySelectorAll(".clean-filter[data-filter]")];
    const cards = [...box.querySelectorAll(".clean-card[data-category]")];
    const prev = box.querySelector(".home-prev");
    const next = box.querySelector(".home-next");
    const status = box.querySelector(".home-slide-status");

    if (!buttons.length || !cards.length) return;

    let activeFilter = "all";
    let page = 0;

    const filtered = () => cards.filter((card) => {
      const cats = (card.dataset.category || "").split(/\s+/).filter(Boolean);
      return activeFilter === "all" || cats.includes(activeFilter);
    });

    const render = () => {
      const visibleCount = perView();
      const pool = filtered();
      const pages = Math.max(1, Math.ceil(pool.length / visibleCount));

      page = Math.max(0, Math.min(page, pages - 1));

      const start = page * visibleCount;
      const activeCards = new Set(pool.slice(start, start + visibleCount));

      cards.forEach((card) => {
        card.classList.toggle("is-hidden", !activeCards.has(card));
      });

      buttons.forEach((button) => {
        button.classList.toggle("active", (button.dataset.filter || "all") === activeFilter);
      });

      if (status) status.textContent = `${page + 1} / ${pages}`;
      if (prev) prev.disabled = pages <= 1 || page === 0;
      if (next) next.disabled = pages <= 1 || page === pages - 1;
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.filter || "all";
        page = 0;
        render();
      });
    });

    if (prev) {
      prev.addEventListener("click", () => {
        page -= 1;
        render();
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        page += 1;
        render();
      });
    }

    // Swipe support for iPhone / Android
    let startX = 0;
    let startY = 0;

    box.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }, { passive: true });

    box.addEventListener("touchend", (event) => {
      const touch = event.changedTouches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
        page += dx < 0 ? 1 : -1;
        render();
      }
    }, { passive: true });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        page = 0;
        render();
      }, 140);
    });

    render();
  };

  const initArchive = (box) => {
    const buttons = [...box.querySelectorAll(".clean-filter[data-filter]")];
    const cards = [...box.querySelectorAll(".clean-card[data-category]")];
    if (!buttons.length || !cards.length) return;

    const apply = (filter) => {
      buttons.forEach((button) => {
        button.classList.toggle("active", (button.dataset.filter || "all") === filter);
      });

      cards.forEach((card) => {
        const cats = (card.dataset.category || "").split(/\s+/).filter(Boolean);
        const show = filter === "all" || cats.includes(filter);
        card.classList.toggle("is-hidden", !show);
      });
    };

    buttons.forEach((button) => {
      button.addEventListener("click", () => apply(button.dataset.filter || "all"));
    });

    apply("all");
  };

  const run = () => {
    document.querySelectorAll(".clean-projects").forEach((box) => {
      if (box.dataset.mode === "home") initHomeSlider(box);
      if (box.dataset.mode === "archive") initArchive(box);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }
})();
