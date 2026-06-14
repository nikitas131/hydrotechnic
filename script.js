(() => {
  "use strict";

  const select = (selector, scope = document) => scope.querySelector(selector);
  const selectAll = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));

  const media = {
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    finePointer: window.matchMedia("(pointer: fine)").matches
  };

  const elements = {
    navMenu: select("#navMenu"),
    menuButton: select("#menuBtn"),
    brandButton: select("#brandSwitch"),
    brandDropdown: select("#brandDropdown"),
    cursorGlow: select("#cursorGlow"),
    cursorRing: select("#mouseRing"),
    shaderCanvas: select("#shaderCanvas")
  };

  const navigation = (() => {
    const closeMenu = () => {
      if (!elements.navMenu || !elements.menuButton) return;
      elements.navMenu.classList.remove("open");
      elements.menuButton.setAttribute("aria-expanded", "false");
    };

    const closeBrandMenu = () => {
      if (!elements.brandDropdown || !elements.brandButton) return;
      elements.brandDropdown.classList.remove("open");
      elements.brandButton.setAttribute("aria-expanded", "false");
    };

  
  const projectFilters = (() => {
    const getGrid = (group) => {
      let next = group.nextElementSibling;

      while (next && !next.classList.contains("filter-grid")) {
        next = next.nextElementSibling;
      }

      return next;
    };

    const ensureEmptyState = (grid) => {
      let emptyState = grid.nextElementSibling;

      if (emptyState && emptyState.classList.contains("projects-empty-state")) {
        return emptyState;
      }

      emptyState = document.createElement("p");
      emptyState.className = "projects-empty-state";
      emptyState.textContent = "Δεν υπάρχουν ακόμα έργα σε αυτή την κατηγορία.";
      grid.insertAdjacentElement("afterend", emptyState);

      return emptyState;
    };

    const init = () => {
      const filterGroups = selectAll(".project-filters");

      filterGroups.forEach((group) => {
        const buttons = selectAll(".filter-btn", group);
        const grid = getGrid(group);

        if (!grid) return;

        const items = selectAll(".filter-item", grid);
        const emptyState = ensureEmptyState(grid);

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const selected = button.dataset.filter || "all";
            let visibleCount = 0;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            items.forEach((card) => {
              const categories = (card.dataset.category || "").split(" ");
              const isVisible = selected === "all" || categories.includes(selected);

              card.classList.toggle("is-hidden", !isVisible);
              if (isVisible) visibleCount += 1;
            });

            emptyState.classList.toggle("visible", visibleCount === 0);
          });
        });
      });
    };

    return { init };
  })();

  const init = () => {
      if (elements.menuButton && elements.navMenu) {
        elements.menuButton.setAttribute("aria-expanded", "false");

        elements.menuButton.addEventListener("click", (event) => {
          event.stopPropagation();
          const open = elements.navMenu.classList.toggle("open");
          elements.menuButton.setAttribute("aria-expanded", String(open));
          closeBrandMenu();
        });
      }

      if (elements.brandButton && elements.brandDropdown) {
        elements.brandButton.addEventListener("click", (event) => {
          event.stopPropagation();
          const open = elements.brandDropdown.classList.toggle("open");
          elements.brandButton.setAttribute("aria-expanded", String(open));
          closeMenu();
        });

        elements.brandDropdown.addEventListener("click", (event) => event.stopPropagation());
      }

      document.addEventListener("click", () => {
        closeMenu();
        closeBrandMenu();
      });

      document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        closeMenu();
        closeBrandMenu();
      });

      selectAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          closeMenu();
          closeBrandMenu();
        });
      });
    };

    return { init };
  })();

  const reveal = (() => {
  
  const projectFilters = (() => {
    const getGrid = (group) => {
      let next = group.nextElementSibling;

      while (next && !next.classList.contains("filter-grid")) {
        next = next.nextElementSibling;
      }

      return next;
    };

    const ensureEmptyState = (grid) => {
      let emptyState = grid.nextElementSibling;

      if (emptyState && emptyState.classList.contains("projects-empty-state")) {
        return emptyState;
      }

      emptyState = document.createElement("p");
      emptyState.className = "projects-empty-state";
      emptyState.textContent = "Δεν υπάρχουν ακόμα έργα σε αυτή την κατηγορία.";
      grid.insertAdjacentElement("afterend", emptyState);

      return emptyState;
    };

    const init = () => {
      const filterGroups = selectAll(".project-filters");

      filterGroups.forEach((group) => {
        const buttons = selectAll(".filter-btn", group);
        const grid = getGrid(group);

        if (!grid) return;

        const items = selectAll(".filter-item", grid);
        const emptyState = ensureEmptyState(grid);

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const selected = button.dataset.filter || "all";
            let visibleCount = 0;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            items.forEach((card) => {
              const categories = (card.dataset.category || "").split(" ");
              const isVisible = selected === "all" || categories.includes(selected);

              card.classList.toggle("is-hidden", !isVisible);
              if (isVisible) visibleCount += 1;
            });

            emptyState.classList.toggle("visible", visibleCount === 0);
          });
        });
      });
    };

    return { init };
  })();

  const init = () => {
      const items = selectAll(".reveal");

      if (media.reducedMotion || !("IntersectionObserver" in window)) {
        items.forEach((item) => item.classList.add("visible"));
        return;
      }

      const observer = new IntersectionObserver((entries, instance) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          instance.unobserve(entry.target);
        });
      }, {
        threshold: 0.1,
        rootMargin: "0px 0px -24px 0px"
      });

      items.forEach((item) => observer.observe(item));
    };

    return { init };
  })();

  const desktopCursor = (() => {
  
  const projectFilters = (() => {
    const getGrid = (group) => {
      let next = group.nextElementSibling;

      while (next && !next.classList.contains("filter-grid")) {
        next = next.nextElementSibling;
      }

      return next;
    };

    const ensureEmptyState = (grid) => {
      let emptyState = grid.nextElementSibling;

      if (emptyState && emptyState.classList.contains("projects-empty-state")) {
        return emptyState;
      }

      emptyState = document.createElement("p");
      emptyState.className = "projects-empty-state";
      emptyState.textContent = "Δεν υπάρχουν ακόμα έργα σε αυτή την κατηγορία.";
      grid.insertAdjacentElement("afterend", emptyState);

      return emptyState;
    };

    const init = () => {
      const filterGroups = selectAll(".project-filters");

      filterGroups.forEach((group) => {
        const buttons = selectAll(".filter-btn", group);
        const grid = getGrid(group);

        if (!grid) return;

        const items = selectAll(".filter-item", grid);
        const emptyState = ensureEmptyState(grid);

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const selected = button.dataset.filter || "all";
            let visibleCount = 0;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            items.forEach((card) => {
              const categories = (card.dataset.category || "").split(" ");
              const isVisible = selected === "all" || categories.includes(selected);

              card.classList.toggle("is-hidden", !isVisible);
              if (isVisible) visibleCount += 1;
            });

            emptyState.classList.toggle("visible", visibleCount === 0);
          });
        });
      });
    };

    return { init };
  })();

  const init = () => {
      if (media.reducedMotion || !media.finePointer || !elements.cursorGlow || !elements.cursorRing) return;

      let targetX = window.innerWidth / 2;
      let targetY = window.innerHeight / 2;
      let glowX = targetX;
      let glowY = targetY;
      let ringX = targetX;
      let ringY = targetY;
      let running = true;

      document.documentElement.classList.add("custom-cursor-ready");

      window.addEventListener("mousemove", (event) => {
        targetX = event.clientX;
        targetY = event.clientY;
      }, { passive: true });

      document.addEventListener("visibilitychange", () => {
        running = !document.hidden;
        if (running) requestAnimationFrame(render);
      });

      const render = () => {
        if (!running) return;

        glowX += (targetX - glowX) * 0.07;
        glowY += (targetY - glowY) * 0.07;
        ringX += (targetX - ringX) * 0.18;
        ringY += (targetY - ringY) * 0.18;

        elements.cursorGlow.style.transform = `translate3d(${glowX - 110}px, ${glowY - 110}px, 0)`;
        elements.cursorRing.style.transform = `translate3d(${ringX - 8}px, ${ringY - 8}px, 0)`;

        requestAnimationFrame(render);
      };

      requestAnimationFrame(render);

      selectAll("a, button, .project-card, .service-card, .brk-service-box").forEach((item) => {
        item.addEventListener("mouseenter", () => document.documentElement.classList.add("cursor-hover"));
        item.addEventListener("mouseleave", () => document.documentElement.classList.remove("cursor-hover"));
      });
    };

    return { init };
  })();

  const mobileTouchFeedback = (() => {
  
  const projectFilters = (() => {
    const getGrid = (group) => {
      let next = group.nextElementSibling;

      while (next && !next.classList.contains("filter-grid")) {
        next = next.nextElementSibling;
      }

      return next;
    };

    const ensureEmptyState = (grid) => {
      let emptyState = grid.nextElementSibling;

      if (emptyState && emptyState.classList.contains("projects-empty-state")) {
        return emptyState;
      }

      emptyState = document.createElement("p");
      emptyState.className = "projects-empty-state";
      emptyState.textContent = "Δεν υπάρχουν ακόμα έργα σε αυτή την κατηγορία.";
      grid.insertAdjacentElement("afterend", emptyState);

      return emptyState;
    };

    const init = () => {
      const filterGroups = selectAll(".project-filters");

      filterGroups.forEach((group) => {
        const buttons = selectAll(".filter-btn", group);
        const grid = getGrid(group);

        if (!grid) return;

        const items = selectAll(".filter-item", grid);
        const emptyState = ensureEmptyState(grid);

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const selected = button.dataset.filter || "all";
            let visibleCount = 0;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            items.forEach((card) => {
              const categories = (card.dataset.category || "").split(" ");
              const isVisible = selected === "all" || categories.includes(selected);

              card.classList.toggle("is-hidden", !isVisible);
              if (isVisible) visibleCount += 1;
            });

            emptyState.classList.toggle("visible", visibleCount === 0);
          });
        });
      });
    };

    return { init };
  })();

  const init = () => {
      if (media.reducedMotion || media.finePointer) return;

      const feedback = document.createElement("div");
      feedback.className = "mobile-touch-glow";
      feedback.setAttribute("aria-hidden", "true");
      document.body.appendChild(feedback);

      let timer = null;

      const show = (clientX, clientY) => {
        feedback.style.transform = `translate3d(${clientX - 65}px, ${clientY - 65}px, 0) scale(1)`;
        feedback.classList.add("active");

        window.clearTimeout(timer);
        timer = window.setTimeout(() => feedback.classList.remove("active"), 210);
      };

      window.addEventListener("touchstart", (event) => {
        const touch = event.touches[0];
        if (touch) show(touch.clientX, touch.clientY);
      }, { passive: true });
    };

    return { init };
  })();

  const backgroundShader = (() => {
  
  const projectFilters = (() => {
    const getGrid = (group) => {
      let next = group.nextElementSibling;

      while (next && !next.classList.contains("filter-grid")) {
        next = next.nextElementSibling;
      }

      return next;
    };

    const ensureEmptyState = (grid) => {
      let emptyState = grid.nextElementSibling;

      if (emptyState && emptyState.classList.contains("projects-empty-state")) {
        return emptyState;
      }

      emptyState = document.createElement("p");
      emptyState.className = "projects-empty-state";
      emptyState.textContent = "Δεν υπάρχουν ακόμα έργα σε αυτή την κατηγορία.";
      grid.insertAdjacentElement("afterend", emptyState);

      return emptyState;
    };

    const init = () => {
      const filterGroups = selectAll(".project-filters");

      filterGroups.forEach((group) => {
        const buttons = selectAll(".filter-btn", group);
        const grid = getGrid(group);

        if (!grid) return;

        const items = selectAll(".filter-item", grid);
        const emptyState = ensureEmptyState(grid);

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const selected = button.dataset.filter || "all";
            let visibleCount = 0;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            items.forEach((card) => {
              const categories = (card.dataset.category || "").split(" ");
              const isVisible = selected === "all" || categories.includes(selected);

              card.classList.toggle("is-hidden", !isVisible);
              if (isVisible) visibleCount += 1;
            });

            emptyState.classList.toggle("visible", visibleCount === 0);
          });
        });
      });
    };

    return { init };
  })();

  const init = () => {
      if (media.reducedMotion || !media.finePointer || !elements.shaderCanvas) return;

      const canvas = elements.shaderCanvas;
      const context = canvas.getContext("2d", { alpha: true });

      if (!context) return;

      let width = 0;
      let height = 0;
      let frame = 0;
      let particles = [];
      let running = true;
      let resizeTimer = null;
      let lastFrameTime = 0;
      const frameInterval = 1000 / 30;

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.25);

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.setTransform(ratio, 0, 0, ratio, 0, 0);

        const count = Math.min(42, Math.max(22, Math.floor(width / 34)));

        particles = Array.from({ length: count }, (_, index) => ({
          x: (index / count) * width + Math.random() * 32,
          y: Math.random() * height,
          radius: Math.random() * 1.35 + 0.55,
          speed: Math.random() * 0.22 + 0.08,
          alpha: Math.random() * 0.32 + 0.08
        }));
      };

      const draw = (timestamp) => {
        if (!running) return;

        requestAnimationFrame(draw);

        if (timestamp - lastFrameTime < frameInterval) return;
        lastFrameTime = timestamp;

        frame += 0.006;
        context.clearRect(0, 0, width, height);

        const gradient = context.createRadialGradient(
          width * 0.72,
          height * 0.18,
          0,
          width * 0.72,
          height * 0.18,
          Math.max(width, height) * 0.58
        );

        gradient.addColorStop(0, "rgba(0, 183, 255, 0.075)");
        gradient.addColorStop(0.42, "rgba(0, 105, 255, 0.035)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        context.fillStyle = gradient;
        context.fillRect(0, 0, width, height);

        context.beginPath();

        for (let x = -60; x <= width + 60; x += 44) {
          const y =
            height * 0.18 +
            Math.sin(x * 0.01 + frame * 7) * 16 +
            Math.cos(x * 0.004 + frame * 4) * 24;

          if (x === -60) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = "rgba(0, 183, 255, 0.075)";
        context.lineWidth = 1;
        context.stroke();

        particles.forEach((particle) => {
          particle.y -= particle.speed;
          particle.x += Math.sin(frame * 10 + particle.y * 0.018) * 0.08;

          if (particle.y < -20) {
            particle.y = height + 20;
            particle.x = Math.random() * width;
          }

          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fillStyle = `rgba(0, 183, 255, ${particle.alpha})`;
          context.fill();
        });
      };

      resize();

      window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(resize, 140);
      }, { passive: true });

      document.addEventListener("visibilitychange", () => {
        running = !document.hidden;
        if (running) requestAnimationFrame(draw);
      });

      requestAnimationFrame(draw);
    };

    return { init };
  })();


  const projectFilters = (() => {
    const getGrid = (group) => {
      let next = group.nextElementSibling;

      while (next && !next.classList.contains("filter-grid")) {
        next = next.nextElementSibling;
      }

      return next;
    };

    const ensureEmptyState = (grid) => {
      let emptyState = grid.nextElementSibling;

      if (emptyState && emptyState.classList.contains("projects-empty-state")) {
        return emptyState;
      }

      emptyState = document.createElement("p");
      emptyState.className = "projects-empty-state";
      emptyState.textContent = "Δεν υπάρχουν ακόμα έργα σε αυτή την κατηγορία.";
      grid.insertAdjacentElement("afterend", emptyState);

      return emptyState;
    };

    const init = () => {
      const filterGroups = selectAll(".project-filters");

      filterGroups.forEach((group) => {
        const buttons = selectAll(".filter-btn", group);
        const grid = getGrid(group);

        if (!grid) return;

        const items = selectAll(".filter-item", grid);
        const emptyState = ensureEmptyState(grid);

        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const selected = button.dataset.filter || "all";
            let visibleCount = 0;

            buttons.forEach((item) => item.classList.remove("active"));
            button.classList.add("active");

            items.forEach((card) => {
              const categories = (card.dataset.category || "").split(" ");
              const isVisible = selected === "all" || categories.includes(selected);

              card.classList.toggle("is-hidden", !isVisible);
              if (isVisible) visibleCount += 1;
            });

            emptyState.classList.toggle("visible", visibleCount === 0);
          });
        });
      });
    };

    return { init };
  })();

  const init = () => {
    navigation.init();
    reveal.init();
    desktopCursor.init();
    mobileTouchFeedback.init();
    backgroundShader.init();
    projectFilters.init();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();


/* ===== FINAL REAL PROJECTS FIX JS ===== */
(()=>{"use strict";
const pageSize=()=>window.matchMedia("(max-width: 760px), (pointer: coarse)").matches?1:window.matchMedia("(max-width: 1180px)").matches?2:4;
const initSlider=blog=>{
 const grid=blog.querySelector(".fp-preview-grid"); if(!grid)return;
 const filters=[...blog.querySelectorAll(".fp-filter[data-filter]")], cards=[...grid.querySelectorAll(".fp-card")], prev=blog.querySelector(".fp-prev"), next=blog.querySelector(".fp-next"), status=blog.querySelector(".fp-slide-status"), controls=blog.querySelector(".fp-slider-controls");
 let current="all", page=0;
 const filtered=()=>cards.filter(card=>current==="all"||(card.dataset.category||"").split(/\s+/).includes(current));
 const render=()=>{
  const ps=pageSize(), pool=filtered(), pages=Math.max(1,Math.ceil(pool.length/ps)); page=Math.max(0,Math.min(page,pages-1));
  const visible=new Set(pool.slice(page*ps,page*ps+ps));
  cards.forEach(card=>card.classList.toggle("fp-visible",visible.has(card)));
  if(controls)controls.classList.toggle("is-single",pages<=1);
  if(prev)prev.disabled=page===0; if(next)next.disabled=page>=pages-1; if(status)status.textContent=`${page+1} / ${pages}`;
 };
 filters.forEach(btn=>btn.addEventListener("click",()=>{current=btn.dataset.filter||"all";page=0;filters.forEach(b=>b.classList.toggle("active",(b.dataset.filter||"all")===current));render();}));
 if(prev)prev.addEventListener("click",()=>{page--;render();});
 if(next)next.addEventListener("click",()=>{page++;render();});
 let t; window.addEventListener("resize",()=>{clearTimeout(t);t=setTimeout(()=>{page=0;render();},120);});
 render();
};
const initArchive=blog=>{
 const grid=blog.querySelector(".fp-archive-grid"); if(!grid)return;
 const filters=[...blog.querySelectorAll(".fp-filter[data-filter]")], cards=[...grid.querySelectorAll(".fp-card")];
 const apply=f=>{filters.forEach(b=>b.classList.toggle("active",(b.dataset.filter||"all")===f));cards.forEach(card=>{const show=f==="all"||(card.dataset.category||"").split(/\s+/).includes(f);card.style.display=show?"flex":"none";});};
 filters.forEach(btn=>btn.addEventListener("click",()=>apply(btn.dataset.filter||"all")));
 apply("all");
};
const init=()=>document.querySelectorAll(".fp-blog").forEach(blog=>{blog.dataset.projectMode==="slider"&&initSlider(blog);blog.dataset.projectMode==="archive"&&initArchive(blog);});
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",init,{once:true}):init();
})();

