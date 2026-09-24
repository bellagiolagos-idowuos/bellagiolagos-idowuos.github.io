/* =========================================================
   DR. OLUWAFUNMIBI SEUN IDOWU
   Portfolio interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     Elements
  -------------------------- */

  const header = document.querySelector(".site-header");
  const menuToggle = document.getElementById("menuToggle");
  const siteNav = document.getElementById("siteNav");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");
  const currentYear = document.getElementById("currentYear");


  /* -------------------------
     Current Year
  -------------------------- */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* -------------------------
     Sticky Header
  -------------------------- */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });


  /* -------------------------
     Mobile Navigation
  -------------------------- */

  const closeMenu = () => {
    if (!menuToggle || !siteNav) return;

    menuToggle.classList.remove("active");
    siteNav.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");
  };


  const openMenu = () => {
    if (!menuToggle || !siteNav) return;

    menuToggle.classList.add("active");
    siteNav.classList.add("open");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("menu-open");
  };


  if (menuToggle) {
    menuToggle.addEventListener("click", () => {

      const isOpen = siteNav.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });
  }


  /* Close menu after clicking a navigation link */

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });


  /* Close menu with Escape */

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });


  /* -------------------------
     Active Navigation Link
  -------------------------- */

  const setActiveNav = () => {

    let currentSection = "";

    sections.forEach(section => {

      const sectionTop =
        section.getBoundingClientRect().top;

      if (sectionTop <= 140) {
        currentSection = section.id;
      }

    });


    navLinks.forEach(link => {

      const href = link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${currentSection}`
      );

    });
  };


  window.addEventListener("scroll", setActiveNav, {
    passive: true
  });

  setActiveNav();


  /* -------------------------
     Scroll Reveal
  -------------------------- */

  const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-intro, " +
    ".philosophy-card, " +
    ".research-card, " +
    ".research-highlight, " +
    ".publication, " +
    ".timeline-item, " +
    ".professional-grid > div, " +
    ".academic-link, " +
    ".contact-card"
  );


  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* -------------------------
     Staggered Reveal
  -------------------------- */

  const staggerGroups = [
    ".research-card",
    ".publication",
    ".timeline-item",
    ".academic-link"
  ];


  staggerGroups.forEach(selector => {

    const items = document.querySelectorAll(selector);

    items.forEach((item, index) => {

      item.style.transitionDelay = `${index * 80}ms`;

    });

  });


  /* -------------------------
     Smooth Anchor Navigation
  -------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* -------------------------
     External Links
  -------------------------- */

  document.querySelectorAll('a[target="_blank"]').forEach(link => {

    link.setAttribute("rel", "noopener noreferrer");

  });


  /* -------------------------
     Portrait Placeholder
  -------------------------- */

  const portrait = document.querySelector(".portrait-placeholder");

  if (portrait) {

    portrait.addEventListener("mouseenter", () => {
      portrait.style.transition = "transform 500ms ease";
      portrait.style.transform = "scale(1.015)";
    });

    portrait.addEventListener("mouseleave", () => {
      portrait.style.transform = "scale(1)";
    });

  }


  /* -------------------------
     Page Loaded State
  -------------------------- */

  document.body.classList.add("page-loaded");

});
