export function init() {
  console.log(
    "Módulo Aplicaciones Corporativas de MISKI SATI S.A.C. activado.",
  );

  // 1. SCROLL REVEAL OBSERVER
  const animatedElements = document.querySelectorAll(
    ".aplicaciones-container .animate-on-scroll",
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

  // 2. LIGHTBOX MODAL PARA AMPLIFICAR CUALQUIER MOCKUP
  const modal = document.getElementById("app-lightbox-modal");
  const modalImg = document.getElementById("app-lightbox-src");
  const modalCaption = document.getElementById("app-lightbox-caption");
  const closeBtn = document.querySelector(
    ".aplicaciones-container .app-close-btn",
  );
  const zoomableImgs = document.querySelectorAll(
    ".aplicaciones-container .app-zoom-img",
  );

  zoomableImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (modal && modalImg && modalCaption) {
        modal.style.display = "flex";
        modalImg.src = img.src;
        modalCaption.textContent =
          img.alt || "Aplicación Corporativa MISKI SATI";
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
    .querySelectorAll('.aplicaciones-container a[href^="#"]')
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
