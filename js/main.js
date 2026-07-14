/* ==========================================================================
   Resume - Interactive Logic
   Features: Mobile menu, scroll reveal, nav highlight, back to top, skill bars
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Mobile Navigation Toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isActive = navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      navToggle.setAttribute("aria-expanded", String(isActive));
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu on outside click
    document.addEventListener("click", function (e) {
      if (
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Nav Header Shadow on Scroll ---------- */
  const navHeader = document.getElementById("navHeader");
  const backToTop = document.getElementById("backToTop");

  function onScroll() {
    const scrolled = window.scrollY > 10;

    if (navHeader) {
      navHeader.classList.toggle("scrolled", scrolled);
    }

    if (backToTop) {
      backToTop.classList.toggle("visible", window.scrollY > 500);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Back to Top ---------- */
  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Scroll Reveal (Intersection Observer) ---------- */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const delay = parseInt(
              entry.target.getAttribute("data-delay") || "0",
              10
            );
            setTimeout(function () {
              entry.target.classList.add("visible");
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  /* ---------- Active Nav Link on Scroll ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              const isActive = link.getAttribute("href") === "#" + id;
              link.classList.toggle("active", isActive);
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -50% 0px",
      }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------- Skill Bar Animation ---------- */
  const skillBars = document.querySelectorAll(".skill-bar-fill");

  if ("IntersectionObserver" in window && skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const target = entry.target;
            const width = target.getAttribute("data-width");
            if (width) {
              target.style.width = width + "%";
            }
            skillObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillBars.forEach(function (bar) {
      skillObserver.observe(bar);
    });
  } else {
    skillBars.forEach(function (bar) {
      const width = bar.getAttribute("data-width");
      if (width) bar.style.width = width + "%";
    });
  }

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Terminal Typewriter Effect ---------- */
  (function typewriter() {
    const terminalBody = document.querySelector(".terminal-body");
    if (!terminalBody || !("IntersectionObserver" in window)) return;

    // Store original HTML, then clear
    const originalHTML = terminalBody.innerHTML;
    const lines = originalHTML.split(/(?=<p)/).filter(function (l) {
      return l.trim().length > 0;
    });

    let started = false;

    function startTyping() {
      if (started) return;
      started = true;

      terminalBody.innerHTML = "";
      let lineIdx = 0;

      function typeNextLine() {
        if (lineIdx >= lines.length) return;

        const lineHTML = lines[lineIdx];
        const p = document.createElement("p");
        p.innerHTML = lineHTML.replace(/<\/?p[^>]*>/g, "");
        p.style.opacity = "0";
        terminalBody.appendChild(p);

        // Fade in the line
        requestAnimationFrame(function () {
          p.style.transition = "opacity 0.2s ease";
          p.style.opacity = "1";
        });

        lineIdx++;
        const delay = lineIdx <= 2 ? 300 : 120;
        setTimeout(typeNextLine, delay);
      }

      typeNextLine();
    }

    const twObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setTimeout(startTyping, 400);
            twObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    twObserver.observe(terminalBody);
  })();
})();
