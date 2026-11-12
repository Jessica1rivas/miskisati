export function init() {
  console.log("Módulo Auditoría de Imagen de MISKI SATI S.A.C. activado.");

  // 1. SCROLL REVEAL OBSERVER
  const animatedElements = document.querySelectorAll(
    ".auditoria-container .animate-on-scroll",
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

  // 2. LIGHTBOX PARA AMPLIAR LAS IMÁGENES DE EVIDENCIA
  const modal = document.getElementById("aud-lightbox-modal");
  const modalImg = document.getElementById("aud-lightbox-src");
  const modalCaption = document.getElementById("aud-lightbox-caption");
  const closeBtn = document.querySelector(
    ".auditoria-container .aud-close-btn",
  );
  const zoomableImgs = document.querySelectorAll(
    ".auditoria-container .aud-zoom-img",
  );

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && modalCaption) {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalCaption.textContent =
          img.alt || "Evidencia de la auditoría de imagen MISKI SATI";
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

  // 3. DESPLAZAMIENTO SUAVE ENTRE SECCIONES
  document
    .querySelectorAll('.auditoria-container a[href^="#"]')
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
