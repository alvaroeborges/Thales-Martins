/* =========================================================
   THALES MARTINS — Harmonização Facial
   Interações do hero: contador de seções e leve parallax
   cinematográfico (respeitando reduced-motion).
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Menu mobile (hamburguer) ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");

  if (navToggle && siteNav) {
    var closeNav = function () {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menu");
      document.body.style.overflow = "";
    };
    var openNav = function () {
      siteNav.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Fechar menu");
      document.body.style.overflow = "hidden";
    };

    navToggle.addEventListener("click", function () {
      if (siteNav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.matchMedia("(min-width: 981px)").addEventListener("change", function (e) {
      if (e.matches) closeNav();
    });
  }

  /* ---------- Contador de seção (ex.: 01 / 04) ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("[data-section]"));
  var indexNumberEl = document.querySelector(".index b");
  if (sections.length && indexNumberEl && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var n = entry.target.getAttribute("data-section");
            indexNumberEl.textContent = String(n).padStart(2, "0");
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Parallax sutil (somente a faixa de luz).
     O monograma de marca d'água fica sempre parado. ---------- */
  if (!reduceMotion && window.matchMedia("(min-width: 981px)").matches && window.matchMedia("(hover: hover)").matches) {
    var beam = document.querySelector(".light-beam");
    var hero = document.querySelector(".hero");
    var ticking = false;
    var mx = 0, my = 0;

    hero && hero.addEventListener("mousemove", function (e) {
      var rect = hero.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width - 0.5;
      my = (e.clientY - rect.top) / rect.height - 0.5;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (beam) {
            beam.style.transform = "translate(" + (mx * -10).toFixed(1) + "px, " + (my * 10).toFixed(1) + "px)";
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }
})();
