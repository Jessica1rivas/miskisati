export function init() {
  console.log("Módulo Identidad Corporativa MISKI SATI S.A.C. activo.");

  // SCROLL OBSERVER
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const delay = entry.target.dataset.delay || 0;
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), delay);
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.1 },
  );

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // DESPLAZAMIENTO SUAVE
  document
    .querySelectorAll('.corp-container a[href^="#"]')
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
