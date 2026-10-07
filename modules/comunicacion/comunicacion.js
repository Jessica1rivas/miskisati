export function init() {
  console.log(
    "Módulo Comunicación Corporativa MISKI SATI S.A.C. inicializado.",
  );

  // 1. SCROLL REVEAL OBSERVER (ANIMACIONES DE ENTRADA Y SALIDA)
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

  // 2. ENVÍO DE FORMULARIO A WHATSAPP (NÚMERO DIRECTO: 974 355 078)
  const wsspForm = document.getElementById("wssp-form");

  if (wsspForm) {
    wsspForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("wssp-nombre").value.trim();
      const apellido = document.getElementById("wssp-apellido").value.trim();
      const mensaje = document.getElementById("wssp-mensaje").value.trim();

      const numeroWhatsapp = "51974355078"; // Número configurado para Satipo, Perú

      // Construcción del texto codificado para URL
      const textoMensaje =
        `*NUEVO CONTACTO DESDE LA WEB - MISKI SATI*%0A%0A` +
        `*Nombre:* ${nombre} ${apellido}%0A` +
        `*Mensaje:* ${mensaje}`;

      const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${textoMensaje}`;

      // Abrir WhatsApp en una nueva pestaña
      window.open(urlWhatsapp, "_blank");
    });
  }

  // 3. LIGHTBOX MODAL DE IMÁGENES
  const modal = document.getElementById("com-lightbox");
  const modalImg = document.getElementById("com-modal-img");
  const captionText = document.getElementById("com-modal-caption");
  const zoomableImgs = document.querySelectorAll(".com-zoom-img");
  const closeBtn = document.querySelector(".com-modal-close");

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerText =
          img.alt || "Comunicación Corporativa MISKI SATI S.A.C.";
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // 4. DESPLAZAMIENTO SUAVE EN NAVEGACIÓN INTERNA
  document
    .querySelectorAll('.comunicacion-container a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
}
