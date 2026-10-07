export function init() {
  console.log("Módulo Inicio de MISKI SATI S.A.C. inicializado.");

  // Manejo de clicks en botones con atributo data-module
  const heroActions = document.querySelector(".hero-actions");
  if (heroActions) {
    heroActions.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-module]");
      if (btn && btn.dataset.module) {
        window.location.hash = btn.dataset.module;
      }
    });
  }
}
