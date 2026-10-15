export function init() {
  console.log("Módulo Imagen Institucional de MISKI SATI S.A.C. activado.");

  // 1. SCROLL REVEAL OBSERVER
  const animatedElements = document.querySelectorAll(
    ".institucional-container .animate-on-scroll",
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

  // 2. LIGHTBOX MODAL PARA AMPLIFICAR IMÁGENES DE EVIDENCIA
  const modal = document.getElementById("inst-lightbox-modal");
  const modalImg = document.getElementById("inst-lightbox-src");
  const modalCaption = document.getElementById("inst-lightbox-caption");
  const closeBtn = document.querySelector(
    ".institucional-container .inst-close-btn",
  );
  const zoomableImgs = document.querySelectorAll(
    ".institucional-container .inst-zoom-img",
  );

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && modalCaption) {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalCaption.textContent = img.alt || "Imagen Institucional MISKI SATI";
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

  // 3. DESPLAZAMIENTO SUAVE
  document
    .querySelectorAll('.institucional-container a[href^="#"]')
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
