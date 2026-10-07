const routes = {
  inicio: {
    html: "modules/inicio/inicio.html",
    css: "modules/inicio/inicio.css",
    js: "modules/inicio/inicio.js",
  },
  empresa: {
    html: "modules/empresa/empresa.html",
    css: "modules/empresa/empresa.css",
    js: "modules/empresa/empresa.js",
  },
  "publico-objetivo": {
    html: "modules/publico-objetivo/objetivo.html",
    css: "modules/publico-objetivo/objetivo.css",
    js: "modules/publico-objetivo/objetivo.js",
  },
  "identidad-corporativa": {
    html: "modules/identidad-corporativa/corporativa.html",
    css: "modules/identidad-corporativa/corporativa.css",
    js: "modules/identidad-corporativa/corporativa.js",
  },
  "identidad-visual": {
    html: "modules/identidad-visual/visual.html",
    css: "modules/identidad-visual/visual.css",
    js: "modules/identidad-visual/visual.js",
  },
  "imagen-institucional": {
    html: "modules/imagen-institucional/institucional.html",
    css: "modules/imagen-institucional/institucional.css",
    js: "modules/imagen-institucional/institucional.js",
  },
  "aplicaciones": {
    html: "modules/aplicaciones/aplicaciones.html",
    css: "modules/aplicaciones/aplicaciones.css",
    js: "modules/aplicaciones/aplicaciones.js",
  },
  "comunicacion": {
    html: "modules/comunicacion/comunicacion.html",
    css: "modules/comunicacion/comunicacion.css",
    js: "modules/comunicacion/comunicacion.js",
  },
  "manual-identidad": {
    html: "modules/manual-identidad/manual.html",
    css: "modules/manual-identidad/manual.css",
    js: "modules/manual-identidad/manual.js",
  },
  "propuestas-mejora": {
    html: "modules/propuestas-mejora/mejora.html",
    css: "modules/propuestas-mejora/mejora.css",
    js: "modules/propuestas-mejora/mejora.js",
  },
};

let scrollObserver = null;

// Visits counter logic
function initVisitsCounter() {
  const BASE_DAILY = 100;
  const BASE_WEEKLY = 700;
  const BASE_TOTAL = 1250;

  const today = new Date().toISOString().split("T")[0];
  let stats = JSON.parse(localStorage.getItem("miski_visit_stats"));

  if (!stats) {
    stats = {
      lastDate: today,
      daily: BASE_DAILY,
      weekly: BASE_WEEKLY,
      total: BASE_TOTAL,
    };
  } else if (stats.lastDate !== today) {
    stats.lastDate = today;
    stats.daily = BASE_DAILY;
    stats.weekly += 1;
    stats.total += 1;
  } else {
    stats.daily += 1;
    stats.weekly += 1;
    stats.total += 1;
  }

  localStorage.setItem("miski_visit_stats", JSON.stringify(stats));

  const dailyEl = document.getElementById("dailyVisits");
  const weeklyEl = document.getElementById("weeklyVisits");
  const totalEl = document.getElementById("totalVisits");

  if (dailyEl) dailyEl.textContent = stats.daily;
  if (weeklyEl) weeklyEl.textContent = stats.weekly;
  if (totalEl) totalEl.textContent = stats.total;
}

// Scroll observer for reveal animation
function initScrollObserver() {
  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px",
  };

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  }, observerOptions);

  observeScrollElements();
}

function observeScrollElements() {
  if (!scrollObserver) return;
  const elements = document.querySelectorAll(".scroll-reveal");
  elements.forEach((el) => scrollObserver.observe(el));
}

// Load Header and Footer Layout
async function loadLayout() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch("layout/header.html"),
      fetch("layout/footer.html"),
    ]);

    if (headerRes.ok) {
      const headerContainer = document.getElementById("header-container");
      if (headerContainer) headerContainer.innerHTML = await headerRes.text();
    }

    if (footerRes.ok) {
      const footerContainer = document.getElementById("footer-container");
      if (footerContainer) footerContainer.innerHTML = await footerRes.text();
    }

    setupGlobalEvents();
    observeScrollElements();
    initVisitsCounter();
  } catch (error) {
    console.error("Error al cargar el layout:", error);
  }
}

// Global Events and Arrow Navigation Logic
function setupGlobalEvents() {
  document.addEventListener("click", (e) => {
    // Modular navigation with data-module
    const targetBtn = e.target.closest("[data-module]");
    if (targetBtn) {
      const moduleName = targetBtn.dataset.module;
      window.location.hash = moduleName;
      closeMobileMenu();
    }

    // Open mobile menu
    if (e.target.closest("#mobileToggleBtn")) {
      openMobileMenu();
    }

    // Close mobile menu
    if (e.target.closest("#mobileCloseBtn")) {
      closeMobileMenu();
    }

    // Arrow buttons logic (< and >)
    const prevBtn = e.target.closest("#navPrevBtn");
    const nextBtn = e.target.closest("#navNextBtn");
    const mainNav = document.getElementById("mainNav");

    if (mainNav) {
      if (prevBtn) {
        mainNav.scrollBy({ left: -160, behavior: "smooth" });
      }
      if (nextBtn) {
        mainNav.scrollBy({ left: 160, behavior: "smooth" });
      }
    }
  });
}

function openMobileMenu() {
  const mobileNav = document.getElementById("mobileNavDrawer");
  if (mobileNav) {
    mobileNav.classList.add("open");
    document.body.classList.add("no-scroll");
  }
}

function closeMobileMenu() {
  const mobileNav = document.getElementById("mobileNavDrawer");
  if (mobileNav) {
    mobileNav.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
}

// Active Nav Link Update
function updateActiveNavLink(currentRoute) {
  const buttons = document.querySelectorAll("[data-module]");
  buttons.forEach((btn) => {
    if (btn.dataset.module === currentRoute) {
      btn.classList.add("active");
      // Auto-scroll inside navigation to show active item
      if (btn.classList.contains("nav-link")) {
        btn.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    } else {
      btn.classList.remove("active");
    }
  });
}

// Dynamic Module Navigation
async function navigateTo(routeKey) {
  const validRouteKey = routes[routeKey] ? routeKey : "inicio";
  const route = routes[validRouteKey];
  const contentElement = document.getElementById("app-content");
  let cssElement = document.getElementById("module-css");

  if (!cssElement) {
    cssElement = document.createElement("link");
    cssElement.id = "module-css";
    cssElement.rel = "stylesheet";
    document.head.appendChild(cssElement);
  }

  try {
    const response = await fetch(`${route.html}?v=${Date.now()}`);
    if (!response.ok) throw new Error(`No se pudo cargar: ${route.html}`);
    const html = await response.text();
    contentElement.innerHTML = html;

    if (route.css) {
      cssElement.href = `${route.css}?v=${Date.now()}`;
    } else {
      cssElement.href = "";
    }

    if (route.js) {
      const cleanJsPath = route.js.startsWith("./")
        ? route.js
        : `./${route.js}`;
      const moduleScript = await import(`${cleanJsPath}?v=${Date.now()}`);
      if (moduleScript && typeof moduleScript.init === "function") {
        moduleScript.init();
      }
    }

    updateActiveNavLink(validRouteKey);
    observeScrollElements();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (error) {
    console.error("Error al navegar:", error);
    if (contentElement) {
      contentElement.innerHTML =
        "<h2 style='text-align:center; padding: 4rem;'>404 - Módulo no encontrado</h2>";
    }
  }
}

function handleHashChange() {
  const routeKey = window.location.hash.replace("#", "") || "inicio";
  navigateTo(routeKey);
}

// App Initialization
window.addEventListener("DOMContentLoaded", async () => {
  initScrollObserver();
  await loadLayout();
  handleHashChange();
});

window.addEventListener("hashchange", handleHashChange);
