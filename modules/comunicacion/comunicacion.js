export function init() {
  console.log("Módulo Comunicación Corporativa de MISKI SATI S.A.C. activado.");

  // 1. SCROLL REVEAL OBSERVER
  const animatedElements = document.querySelectorAll(
    ".comunicacion-container .animate-on-scroll",
  );

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.12,
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

  // 2. ENVÍO DE FORMULARIO A WHATSAPP
  const wsspForm = document.getElementById("wssp-form");

  if (wsspForm) {
    wsspForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const nombre = document.getElementById("wssp-nombre").value.trim();
      const apellido = document.getElementById("wssp-apellido").value.trim();
      const mensaje = document.getElementById("wssp-mensaje").value.trim();

      const numeroWhatsapp = "51974355078"; // Número Oficial Miski Sati en Satipo

      const textoMensaje =
        `*NUEVO MENSAJE DE CONSULTA / RESERVA - MISKI SATI S.A.C.*%0A%0A` +
        `*Cliente:* ${nombre} ${apellido}%0A` +
        `*Consulta:* ${mensaje}`;

      const urlWhatsapp = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${textoMensaje}`;

      window.open(urlWhatsapp, "_blank");
    });
  }

  // 3. LIGHTBOX MODAL PARA AMPLIFICAR CUALQUIER IMAGEN
  const modal = document.getElementById("com-lightbox-modal");
  const modalImg = document.getElementById("com-lightbox-src");
  const modalCaption = document.getElementById("com-lightbox-caption");
  const closeBtn = document.querySelector(
    ".comunicacion-container .com-close-btn",
  );
  const zoomableImgs = document.querySelectorAll(
    ".comunicacion-container .com-zoom-img",
  );

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && modalCaption) {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalCaption.textContent =
          img.alt || "Comunicación Corporativa MISKI SATI";
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

  // 4. DESPLAZAMIENTO SUAVE
  document
    .querySelectorAll('.comunicacion-container a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
}
