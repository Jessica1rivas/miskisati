export function init() {
  console.log("Módulo Imagen Institucional MISKI SATI S.A.C. inicializado.");

  // 1. SCROLL REVEAL OBSERVER (ENTRADA Y SALIDA DE ELEMENTOS EN SCROLL)
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
        // Remueve la clase para permitir reanimación al volver a subir o bajar
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // 2. LIGHTBOX MODAL PARA IMÁGENES DE EVIDENCIA
  const modal = document.getElementById("imginst-lightbox");
  const modalImg = document.getElementById("imginst-modal-img");
  const captionText = document.getElementById("imginst-modal-caption");
  const zoomableImgs = document.querySelectorAll(".imginst-zoom-img");
  const closeBtn = document.querySelector(".imginst-modal-close");

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerText =
          img.alt || "Imagen Institucional MISKI SATI S.A.C.";
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

  // 3. DESPLAZAMIENTO SUAVE EN NAVEGACIÓN INTERNA
  document
    .querySelectorAll('.imginst-container a[href^="#"]')
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
