import { init as initBase } from "../auditoria-imagen/auditoria.js";

export function init() {
  console.log("Módulo Análisis de Imagen Pública de MISKI SATI S.A.C. activado.");

  // Reutiliza el scroll reveal, el lightbox y el desplazamiento suave del módulo base.
  initBase();

  // Animación de las barras de resultados al entrar en pantalla.
  const bars = document.querySelectorAll(
    ".analisis-publico-container .ap-bar-fill",
  );

  if (!bars.length) return;

  bars.forEach((bar) => {
    const inlineWidth = bar.style.getPropertyValue("--w").trim();
    const computedWidth = getComputedStyle(bar)
      .getPropertyValue("--w")
      .trim();
    bar.dataset.finalWidth = inlineWidth || computedWidth || "0%";
    bar.style.width = "0%";
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      bars.forEach((bar) => {
        bar.style.width = bar.dataset.finalWidth;
      });
    });
  });
}
