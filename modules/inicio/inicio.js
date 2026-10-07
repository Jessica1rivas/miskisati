export function init() {
  console.log("Módulo Inicio de MISKI SATI S.A.C. inicializado con éxito.");

  // 1. Manejo de clics en botones con data-module
  const heroActions = document.querySelector(".hero-actions");
  if (heroActions) {
    heroActions.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-module]");
      if (btn && btn.dataset.module) {
        window.location.hash = btn.dataset.module;
      }
    });
  }

  // 2. Scroll Reveal Observer para animaciones de entrada y salida
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
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
}
