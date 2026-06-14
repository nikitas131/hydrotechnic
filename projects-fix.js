
(() => {
  "use strict";

  const initSliderBlog = (blog) => {
    const grid = blog.querySelector(".fp-preview-grid");
    if (!grid) return;

    const filters = [...blog.querySelectorAll(".fp-filter[data-filter]")];
    const cards = [...grid.querySelectorAll(".fp-card")];
    const prev = blog.querySelector(".fp-prev");
    const next = blog.querySelector(".fp-next");
    const status = blog.querySelector(".fp-slide-status");

    const updateStatus = () => {
      if (!status) return;
      const visibleCards = cards.filter((card) => !card.classList.contains("fp-filtered-out"));
      status.textContent = visibleCards.length ? `${visibleCards.length} έργα` : "0 έργα";
    };

    const applyFilter = (filter) => {
      filters.forEach((btn) => btn.classList.toggle("active", (btn.dataset.filter || "all") === filter));

      cards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/).filter(Boolean);
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("fp-filtered-out", !show);
      });

      grid.scrollTo({ left: 0, behavior: "smooth" });
      updateStatus();
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
    });

    if (prev) {
      prev.addEventListener("click", () => {
        grid.scrollBy({ left: -grid.clientWidth, behavior: "smooth" });
      });
    }

    if (next) {
      next.addEventListener("click", () => {
        grid.scrollBy({ left: grid.clientWidth, behavior: "smooth" });
      });
    }

    applyFilter("all");
  };

  const initArchiveBlog = (blog) => {
    const grid = blog.querySelector(".fp-archive-grid");
    if (!grid) return;

    const filters = [...blog.querySelectorAll(".fp-filter[data-filter]")];
    const cards = [...grid.querySelectorAll(".fp-card")];

    const applyFilter = (filter) => {
      filters.forEach((btn) => btn.classList.toggle("active", (btn.dataset.filter || "all") === filter));

      cards.forEach((card) => {
        const categories = (card.dataset.category || "").split(/\s+/).filter(Boolean);
        const show = filter === "all" || categories.includes(filter);
        card.classList.toggle("fp-filtered-out", !show);
      });
    };

    filters.forEach((button) => {
      button.addEventListener("click", () => applyFilter(button.dataset.filter || "all"));
    });

    applyFilter("all");
  };

  const init = () => {
    document.querySelectorAll(".fp-blog").forEach((blog) => {
      if (blog.dataset.projectMode === "slider") initSliderBlog(blog);
      if (blog.dataset.projectMode === "archive") initArchiveBlog(blog);
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
