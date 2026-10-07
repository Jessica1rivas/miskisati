export function init() {
  console.log("Módulo Identidad Corporativa MISKI SATI S.A.C. cargado.");

  // 1. SISTEMA DE ANIMACIÓN BIDIRECCIONAL DE ENTRADA Y SALIDA (SCROLL OBSERVER)
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.15,
  };

  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const delay = entry.target.dataset.delay || 0;

      if (entry.isIntersecting) {
        // Animación de ENTRADA (al hacer scroll hacia el elemento)
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);
      } else {
        // Animación de SALIDA (al salir de la vista superior o inferior)
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // 2. MODAL LIGHTBOX PARA VISUALIZACIÓN AMPLIA DE IMÁGENES
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("modal-caption");
  const zoomableImgs = document.querySelectorAll(".zoomable-img");
  const closeBtn = document.querySelector(".modal-close");

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerText = img.alt || "Imagen corporativa MISKI SATI";
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

  // 3. NAVEGACIÓN INTERNA SUAVE CON DESPLAZAMIENTO FLUIDO
  document
    .querySelectorAll('.identidad-container a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
}
