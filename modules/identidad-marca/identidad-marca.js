import { init as initBase } from "../auditoria-imagen/auditoria.js";

export function init() {
  console.log("Módulo Identidad de Marca de MISKI SATI S.A.C. activado.");

  // Reutiliza el scroll reveal, el lightbox y el desplazamiento suave del módulo base.
  initBase();
}
