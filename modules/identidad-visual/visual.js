export function init() {
  console.log(
    "Módulo Identidad Visual MISKI SATI S.A.C. inicializado correctamente.",
  );

  // 1. SCROLL REVEAL OBSERVER (ANIMACIONES ENTRADA Y SALIDA)
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
        // Salida al hacer scroll fuera de vista
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // 2. LIGHTBOX MODAL DE IMÁGENES
  const modal = document.getElementById("idvisual-lightbox");
  const modalImg = document.getElementById("idvisual-modal-img");
  const captionText = document.getElementById("idvisual-modal-caption");
  const zoomableImgs = document.querySelectorAll(".idvisual-zoom-img");
  const closeBtn = document.querySelector(".idvisual-modal-close");

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && captionText) {
        modal.style.display = "block";
        modalImg.src = img.src;
        captionText.innerText = img.alt || "Identidad Visual MISKI SATI S.A.C.";
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

  // 3. SMOOTH SCROLL PARA BOTONES DEL HERO
  document
    .querySelectorAll('.identidad-visual-container a[href^="#"]')
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
