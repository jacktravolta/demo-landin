/* ==========================================================================
   main.js — Shared, progressive-enhancement behaviour for the proposal pages.
   Every feature is defensive: if its elements are absent, it silently no-ops.
   No dependencies, no build step.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  /* ----------------------------------------------------------------------
     1. Mobile navigation toggle
     ---------------------------------------------------------------------- */
  function initNavToggle() {
    var toggles = document.querySelectorAll("[data-nav-toggle]");

    toggles.forEach(function (toggle) {
      var nav = toggle.closest("[data-nav]") ||
        document.querySelector(toggle.getAttribute("data-nav-target") || "");
      if (!nav) return;

      var setExpanded = function (open) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        nav.classList.toggle("is-open", open);
      };

      setExpanded(false);

      toggle.addEventListener("click", function () {
        var isOpen = toggle.getAttribute("aria-expanded") === "true";
        setExpanded(!isOpen);
      });

      // Close the menu when a link inside it is used.
      nav.addEventListener("click", function (event) {
        var link = event.target.closest("[data-nav] a");
        if (link && window.innerWidth < 768) setExpanded(false);
      });

      // Return to a clean state when resizing up to desktop.
      window.addEventListener("resize", function () {
        if (window.innerWidth >= 768) setExpanded(false);
      });

      // Escape closes the menu and returns focus to the toggle.
      document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && nav.classList.contains("is-open")) {
          setExpanded(false);
          toggle.focus();
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     2. Smooth scroll for in-page anchors
     ---------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (event) {
      var link = event.target.closest('a[href^="#"]');
      if (!link) return;

      var hash = link.getAttribute("href");
      if (!hash || hash === "#") return;

      var target = document.getElementById(hash.slice(1));
      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: prefersReducedMotion.matches ? "auto" : "smooth",
        block: "start"
      });

      // Keep the URL shareable without triggering a second jump.
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", hash);
      }

      // Move focus for keyboard and screen-reader users.
      var hadTabindex = target.hasAttribute("tabindex");
      if (!hadTabindex) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      if (!hadTabindex) {
        target.addEventListener(
          "blur",
          function () {
            target.removeAttribute("tabindex");
          },
          { once: true }
        );
      }
    });
  }

  /* ----------------------------------------------------------------------
     3. Active nav link highlighting
     ---------------------------------------------------------------------- */
  function initActiveNav() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav__link[href^="#"]')
    );
    if (!links.length) return;

    var linkBySection = {};
    var sections = [];

    links.forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      if (section) {
        linkBySection[id] = link;
        sections.push(section);
      }
    });

    if (!sections.length) return;

    var setActive = function (id) {
      links.forEach(function (link) {
        var isActive = link === linkBySection[id];
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      setActive(sections[0].id);
      return;
    }

    var visible = {};
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visible[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        });

        var bestId = null;
        var bestRatio = 0;
        Object.keys(visible).forEach(function (id) {
          if (visible[id] > bestRatio) {
            bestRatio = visible[id];
            bestId = id;
          }
        });

        if (bestId) setActive(bestId);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ----------------------------------------------------------------------
     4. Reveal on scroll
     ---------------------------------------------------------------------- */
  function initReveal() {
    var elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ----------------------------------------------------------------------
     5. Contact form — demo only (no network request)
     ---------------------------------------------------------------------- */
  function initContactForms() {
    var forms = document.querySelectorAll("[data-contact-form]");

    forms.forEach(function (form) {
      var status = form.querySelector("[data-form-status]");

      var setFieldState = function (field, message) {
        var wrapper = field.closest(".field") || field.parentElement;
        var errorEl = wrapper ? wrapper.querySelector(".field__error") : null;
        var errorId = errorEl && errorEl.id;

        if (message) {
          field.setAttribute("aria-invalid", "true");
          if (errorId) field.setAttribute("aria-describedby", errorId);
          if (errorEl) errorEl.textContent = message;
          if (wrapper) wrapper.classList.add("field--invalid");
        } else {
          field.removeAttribute("aria-invalid");
          if (errorId) field.removeAttribute("aria-describedby");
          if (errorEl) errorEl.textContent = "";
          if (wrapper) wrapper.classList.remove("field--invalid");
        }
      };

      var validateField = function (field) {
        var value = (field.value || "").trim();

        if (field.hasAttribute("required") && !value) {
          setFieldState(field, "Este campo es obligatorio.");
          return false;
        }

        if (field.type === "email" && value) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            setFieldState(field, "Ingresa un correo electrónico válido.");
            return false;
          }
        }

        setFieldState(field, "");
        return true;
      };

      // Re-validate a field once the user has interacted with it.
      form.querySelectorAll("input, textarea, select").forEach(function (field) {
        field.addEventListener("blur", function () {
          if (field.value !== "") validateField(field);
        });
        field.addEventListener("input", function () {
          if (field.getAttribute("aria-invalid") === "true") {
            validateField(field);
          }
        });
      });

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        var fields = Array.prototype.slice.call(
          form.querySelectorAll("input, textarea, select")
        );
        var firstInvalid = null;

        fields.forEach(function (field) {
          if (!validateField(field) && !firstInvalid) firstInvalid = field;
        });

        if (firstInvalid) {
          if (status) {
            status.dataset.state = "error";
            status.textContent =
              "Revisa los campos marcados antes de enviar el formulario.";
          }
          firstInvalid.focus();
          return;
        }

        // Demo submission: no request is sent anywhere.
        form.reset();
        fields.forEach(function (field) {
          setFieldState(field, "");
        });

        if (status) {
          status.dataset.state = "success";
          status.textContent =
            "¡Gracias! Tu mensaje fue recibido (demostración, no se envió ningún dato).";
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     6. Footer current year
     ---------------------------------------------------------------------- */
  function initYear() {
    var year = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = year;
    });
  }

  /* ----------------------------------------------------------------------
     Bootstrap
     ---------------------------------------------------------------------- */
  function init() {
    initNavToggle();
    initSmoothScroll();
    initActiveNav();
    initReveal();
    initContactForms();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
