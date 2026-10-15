export function init() {
  console.log("Módulo Inicio de MISKI SATI S.A.C. activado.");

  // Control de scroll horizontal mediante flechas circulares (< y >)
  const track = document.getElementById("cardsScrollTrack");
  const prevBtn = document.getElementById("btnSlidePrev");
  const nextBtn = document.getElementById("btnSlideNext");

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 280;

    nextBtn.addEventListener("click", () => {
      track.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  // Navegación por botones data-module
  document.querySelectorAll("[data-module]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const targetModule = e.currentTarget.dataset.module;
      if (targetModule) {
        window.location.hash = targetModule;
      }
    });
  });
}
