export function init() {
  console.log("Módulo Auditoría de Imagen (editorial) de MISKI SATI S.A.C. activado.");

  // 1. SCROLL REVEAL
  const revealElements = document.querySelectorAll(
    ".aud-editorial .ae-reveal",
  );

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, delay);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  // 2. CRONOGRAMA POR SEMANAS
  const weekButtons = document.querySelectorAll(
    ".aud-editorial .ae-week-btn",
  );
  const weekPanels = document.querySelectorAll(
    ".aud-editorial .ae-week-panel",
  );

  weekButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const week = button.dataset.week;

      weekButtons.forEach((btn) => {
        const isActive = btn === button;
        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      weekPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.weekPanel === week);
      });
    });
  });

  // 3. LIGHTBOX
  const modal = document.getElementById("ae-lightbox-modal");
  const modalImg = document.getElementById("ae-lightbox-src");
  const modalCaption = document.getElementById("ae-lightbox-caption");
  const closeBtn = document.querySelector(".aud-editorial .ae-close-btn");
  const zoomImgs = document.querySelectorAll(
    ".aud-editorial .ae-zoom-img",
  );

  function closeLightbox() {
    if (modal) modal.style.display = "none";
  }

  zoomImgs.forEach((img) => {
    img.addEventListener("click", () => {
      if (!modal || !modalImg || !modalCaption) return;

      modal.style.display = "flex";
      modalImg.src = img.src;
      modalCaption.textContent =
        img.alt || "Imagen de la auditoría de imagen de MISKI SATI";
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeLightbox();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  // 4. DESPLAZAMIENTO SUAVE
  document
    .querySelectorAll('.aud-editorial a[href^="#"]')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (event) {
        const targetId = this.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

  // 5. VOLVER ARRIBA
  const backTop = document.querySelector(".aud-editorial .ae-back-top");
  if (backTop) {
    backTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}
