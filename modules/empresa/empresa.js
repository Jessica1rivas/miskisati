export function init() {
  console.log(
    "Módulo Empresa de MISKI SATI S.A.C. inicializado con animaciones completas.",
  );

  // 1. SCROLL REVEAL OBSERVER (ANIMACIONES DE ENTRADA Y SALIDA EN SCROLL)
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
        // Animación de salida al hacer scroll hacia arriba
        entry.target.classList.remove("is-visible");
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => scrollObserver.observe(el));

  // 2. TAB SWITCHER CON ANIMACIÓN DE ENTRADA, SALIDA Y DIRECCIÓN
  const tabButtons = document.querySelectorAll("#identityTabs .tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  let currentTabIndex = 0;

  const tabList = Array.from(tabButtons);

  tabButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (index === currentTabIndex) return;

      const direction = index > currentTabIndex ? "right" : "left";
      const prevContent = document.querySelector(".tab-content.active");
      const targetTabId = `tab-${btn.dataset.tab}`;
      const nextContent = document.getElementById(targetTabId);

      // Desactivar botones
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Animación de salida de la pestaña actual
      if (prevContent) {
        prevContent.className = `tab-content exit-${direction === "right" ? "left" : "right"}`;
      }

      // Animación de entrada de la nueva pestaña
      setTimeout(() => {
        tabContents.forEach((tc) =>
          tc.classList.remove(
            "active",
            "enter-right",
            "enter-left",
            "exit-right",
            "exit-left",
          ),
        );
        if (nextContent) {
          nextContent.classList.add("active", `enter-${direction}`);
        }
        currentTabIndex = index;
      }, 250);
    });
  });

  // 3. SWIPE GESTURE SUPPORT PARA PESTAÑAS (MÓVIL / TOUCH)
  const swipeArea = document.getElementById("swipeArea");
  if (swipeArea) {
    let touchStartX = 0;
    let touchEndX = 0;

    swipeArea.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true },
    );

    swipeArea.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true },
    );

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0 && currentTabIndex < tabList.length - 1) {
          // Swipe a la izquierda -> Siguiente pestaña
          tabList[currentTabIndex + 1].click();
        } else if (swipeDistance > 0 && currentTabIndex > 0) {
          // Swipe a la derecha -> Pestaña anterior
          tabList[currentTabIndex - 1].click();
        }
      }
    }
  }

  // 4. SMOOTH SCROLL PARA BOTONES DEL HERO
  document
    .querySelectorAll('.empresa-container a[href^="#"]')
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
