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
  carta: {
    html: "modules/carta/carta.html",
    css: "modules/carta/carta.css",
    js: "modules/carta/carta.js",
  },
  satipo: {
    html: "modules/satipo/satipo.html",
    css: "modules/satipo/satipo.css",
    js: "modules/satipo/satipo.js",
  },
  contacto: {
    html: "modules/contacto/contacto.html",
    css: "modules/contacto/contacto.css",
    js: "modules/contacto/contacto.js",
  },
};

let scrollObserver = null;

// Lógica para contador de visitas iniciando en 100
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

// Observador para animaciones al hacer scroll
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

// Cargar Layout (Header y Footer)
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

// Control del Menú Móvil Fullscreen y Eventos Globales
function setupGlobalEvents() {
  document.addEventListener("click", (e) => {
    // Navegación modular por data-module
    const targetBtn = e.target.closest("[data-module]");
    if (targetBtn) {
      const moduleName = targetBtn.dataset.module;
      window.location.hash = moduleName;
      closeMobileMenu();
    }

    // Botón abrir menú hamburguesa
    if (e.target.closest("#mobileToggleBtn")) {
      openMobileMenu();
    }

    // Botón X cerrar menú hamburguesa
    if (e.target.closest("#mobileCloseBtn")) {
      closeMobileMenu();
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

// Activar link de navegación actual
function updateActiveNavLink(currentRoute) {
  const buttons = document.querySelectorAll("[data-module]");
  buttons.forEach((btn) => {
    if (btn.dataset.module === currentRoute) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// Inyección dinámica de módulos HTML, CSS y JS
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

// Inicialización de la aplicación
window.addEventListener("DOMContentLoaded", async () => {
  initScrollObserver();
  await loadLayout();
  handleHashChange();
});

window.addEventListener("hashchange", handleHashChange);
