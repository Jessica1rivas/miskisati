import { init as initAuditoria } from "../auditoria-imagen/auditoria-editorial.js";

export function init() {
  console.log("Módulo Identidad de Marca (editorial) de MISKI SATI S.A.C. activado.");

  // Reutiliza scroll reveal, lightbox y desplazamiento suave.
  initAuditoria();

  // Pestañas de símbolos y otros bloques de identidad.
  document
    .querySelectorAll(".identidad-editorial .ae-tabs")
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

  // Copiar valores HEX de la paleta.
  document
    .querySelectorAll(".identidad-editorial .ae-copy-hex")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        const hex = button.dataset.hex;
        if (!hex) return;

        const original = button.textContent;

        try {
          await navigator.clipboard.writeText(hex);
          button.textContent = "Copiado";
        } catch (error) {
          button.textContent = hex;
        }

        setTimeout(() => {
          button.textContent = original;
        }, 1200);
      });
    });
}
