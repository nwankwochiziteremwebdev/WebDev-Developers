// =========================================
// WEBDEV DEVELOPERS
// Website interactive features
// =========================================

document.addEventListener("DOMContentLoaded", () => {

  // 1. MOBILE NAVIGATION MENU

  const menuToggle = document.querySelector("#menu-toggle");
  const siteNav = document.querySelector("#site-nav");

  const navLinks = document.querySelectorAll(
    ".nav-link, .nav-cta"
  );

  function closeMenu() {
    if (!menuToggle || !siteNav) return;

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute(
        "aria-expanded",
        String(!isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Open navigation menu"
          : "Close navigation menu"
      );

      siteNav.classList.toggle("is-open", !isOpen);

      document.body.classList.toggle(
        "menu-open",
        !isOpen
      );
    });
  }

  // Close the mobile menu after a navigation link is clicked.

  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu when the Escape key is pressed.

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  // Close the mobile menu when the screen becomes wider.

  window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
      closeMenu();
    }
  });


  // 2. SCROLL REVEAL ANIMATIONS

  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            currentObserver.unobserve(entry.target);
          }

        });

      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach((item) => {
      observer.observe(item);
    });

  } else {

    // Show all elements in browsers without IntersectionObserver.

    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });

  }


  // 3. PORTFOLIO CATEGORY FILTERS

  const filterButtons = document.querySelectorAll(
    ".filter-button"
  );

  const projectCards = document.querySelectorAll(
    ".project-card"
  );

  filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

      const selectedFilter = button.dataset.filter;

      // Update the selected filter button.

      filterButtons.forEach((item) => {

        const isSelected = item === button;

        item.classList.toggle(
          "active",
          isSelected
        );

        item.setAttribute(
          "aria-pressed",
          String(isSelected)
        );

      });

      // Show only projects belonging to the selected category.

      projectCards.forEach((card) => {

        const category = card.dataset.category;

        const shouldHide =
          selectedFilter !== "all" &&
          category !== selectedFilter;

        card.hidden = shouldHide;

      });

    });

  });


  // 4. AUTOMATIC COPYRIGHT YEAR

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 5. CONTACT FORM CONFIGURATION CHECK

  const contactForm = document.querySelector("#contact-form");
  const formStatus = document.querySelector("#form-status");

  if (contactForm) {

    contactForm.addEventListener("submit", (event) => {

      const accessKeyInput = contactForm.querySelector(
        'input[name="access_key"]'
      );

      const accessKey = accessKeyInput
        ? accessKeyInput.value.trim()
        : "";

      // Prevent submission if the example placeholder is still present.

      if (
        !accessKey ||
        accessKey.includes("YOUR_WEB3FORMS_ACCESS_KEY")
      ) {

        event.preventDefault();

        if (formStatus) {
          formStatus.textContent =
            "Your contact form is not configured yet. " +
            "Get your Web3Forms access key from web3forms.com " +
            "and replace YOUR_WEB3FORMS_ACCESS_KEY in index.html.";
        }

        if (accessKeyInput) {
          accessKeyInput.focus();
        }

      }

    });

  }

});