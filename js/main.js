document.addEventListener("DOMContentLoaded", () => {
  // Initialize variables
  let visibleServices = 6;
  const servicesGrid = document.getElementById("servicesGrid");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const showLessBtn = document.getElementById("showLessBtn");
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeMenu = document.querySelector(".close-menu");
  const mobileMenuLinks = document.querySelectorAll(".mobile-menu nav a");
  const header = document.querySelector(".header");
  const scrollToTopBtn = document.getElementById("scrollToTop");
  const currentYearSpan = document.getElementById("currentYear");

  // Set current year in footer
  currentYearSpan.textContent = new Date().getFullYear();

  // Intersection Observer for fade-in animations
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document
    .querySelectorAll(".fade-in")
    .forEach((el) => fadeObserver.observe(el));

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Mobile menu functionality
  menuButton?.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  closeMenu?.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });

  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Services grid functionality
  function renderServices() {
    if (!servicesGrid) return;

    servicesGrid.innerHTML = window.services
      .slice(0, visibleServices)
      .map(
        (service, index) => `
          <div class="service-card fade-in" style="transition-delay: ${
            0.1 * (index % 6)
          }s">
            <div style="height: 16rem; overflow: hidden;">
              <img src="${service.imageUrl}" alt="${service.name}">
            </div>
            <div class="service-card-content">
              <h3>${service.name}</h3>
              <p>${service.description}</p>
            </div>
          </div>
        `
      )
      .join("");

    // Re-observe new fade-in elements
    document
      .querySelectorAll(".fade-in")
      .forEach((el) => fadeObserver.observe(el));
  }

  loadMoreBtn?.addEventListener("click", () => {
    visibleServices = window.services.length;
    renderServices();
    loadMoreBtn.style.display = "none";
    showLessBtn.style.display = "inline-block";
  });

  showLessBtn?.addEventListener("click", () => {
    visibleServices = 6;
    renderServices();
    loadMoreBtn.style.display = "inline-block";
    showLessBtn.style.display = "none";
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  });

  // Initialize services grid
  renderServices();

  // Pricing table
  const pricingTableBody = document.getElementById("pricingTableBody");
  if (pricingTableBody) {
    pricingTableBody.innerHTML = window.services
      .map(
        (service) => `
          <tr>
            <td class="font-medium">${service.name}</td>
            <td class="text-center">${service.duration}</td>
            <td class="text-right">${service.price}</td>
          </tr>
        `
      )
      .join("");
  }

  // Scroll to top functionality
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn?.classList.add("visible");
    } else {
      scrollToTopBtn?.classList.remove("visible");
    }
  });

  scrollToTopBtn?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});
