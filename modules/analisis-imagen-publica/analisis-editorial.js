import { init as initAuditoria } from "../auditoria-imagen/auditoria-editorial.js";

export function init() {
  console.log("Módulo Análisis de Imagen Pública (editorial) de MISKI SATI S.A.C. activado.");

  // Reutiliza scroll reveal, lightbox, cronograma y desplazamiento suave.
  initAuditoria();

  // Pestañas de conceptos, preguntas de encuesta y estrategias.
  document
    .querySelectorAll(".analisis-editorial .ae-tabs")
    .forEach((tabs) => {
      const buttons = tabs.querySelectorAll(".ae-tab-btn");
      const panels = tabs.querySelectorAll(".ae-tab-panel");

      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          const tab = button.dataset.tab;

          buttons.forEach((btn) => {
            btn.classList.toggle("active", btn === button);
          });

          panels.forEach((panel) => {
            panel.classList.toggle(
              "active",
              panel.dataset.tabPanel === tab,
            );
          });
        });
      });
    });
}
