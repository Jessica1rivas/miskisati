export function init() {
  console.log("Módulo Público Objetivo de MISKI SATI S.A.C. inicializado.");

  // 1. SCROLL REVEAL OBSERVER
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const delay = entry.target.dataset.delay || 0;

      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);
      } else {
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // 2. FILTRO INTERACTIVO DE PERFILES
  const filterBtns = document.querySelectorAll(".filter-btn");
  const profileItems = document.querySelectorAll(".profile-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.dataset.filter;

      profileItems.forEach((item) => {
        if (filterValue === "all" || item.dataset.category === filterValue) {
          item.classList.remove("hide");
          item.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          item.classList.add("hide");
        }
      });
    });
  });

  // 3. ACCORDION / DESPLEGABLE EN MATRIZ DE NECESIDADES
  const needCards = document.querySelectorAll(".need-accordion-card");

  needCards.forEach((card) => {
    card.addEventListener("click", () => {
      const isActive = card.classList.contains("active");

      needCards.forEach((c) => c.classList.remove("active"));

      if (!isActive) {
        card.classList.add("active");
      }
    });
  });

  // 4. DESPLAZAMIENTO SUAVE PARA ENLACES INTERNOS
  document
    .querySelectorAll('.publico-container a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
}
