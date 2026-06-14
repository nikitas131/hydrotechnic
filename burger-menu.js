(() => {
  "use strict";

  const closeAll = () => {
    document.querySelectorAll(".clean-header.menu-open").forEach((header) => {
      header.classList.remove("menu-open");
      const burger = header.querySelector(".clean-burger");
      if (burger) burger.setAttribute("aria-expanded", "false");
    });
  };

  const init = () => {
    document.querySelectorAll(".clean-header").forEach((header) => {
      const burger = header.querySelector(".clean-burger");
      const nav = header.querySelector(".clean-nav");

      if (!burger || !nav) return;

      burger.addEventListener("click", (event) => {
        event.stopPropagation();
        const open = header.classList.toggle("menu-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          header.classList.remove("menu-open");
          burger.setAttribute("aria-expanded", "false");
        });
      });
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".clean-header")) closeAll();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeAll();
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
