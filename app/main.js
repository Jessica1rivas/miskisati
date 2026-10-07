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

// Observador para animaciones al hacer scroll (Entrada y Salida)
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

// Re-escanea el DOM buscando elementos con la clase .scroll-reveal
function observeScrollElements() {
  if (!scrollObserver) return;
  const elements = document.querySelectorAll(".scroll-reveal");
  elements.forEach((el) => scrollObserver.observe(el));
}

// Cargar Header y Footer en el layout
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
  } catch (error) {
    console.error("Error al cargar el layout:", error);
  }
}

// Escuchador global para delegación de eventos (Navegación y Menú Móvil)
function setupGlobalEvents() {
  document.addEventListener("click", (e) => {
    // Manejo de clics en enlaces o botones con data-module
    const targetBtn = e.target.closest("[data-module]");
    if (targetBtn) {
      const moduleName = targetBtn.dataset.module;
      window.location.hash = moduleName;

      // Cerrar menú móvil si se selecciona una opción
      const mobileNav = document.getElementById("mobileNavDrawer");
      if (mobileNav) mobileNav.classList.remove("open");
    }

    // Toggle de menú hamburguesa móvil
    const toggleBtn = e.target.closest("#mobileToggleBtn");
    if (toggleBtn) {
      const mobileNav = document.getElementById("mobileNavDrawer");
      if (mobileNav) mobileNav.classList.toggle("open");
    }
  });
}

// Marcar botón activo en la navegación
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

// Carga e inyección del módulo activo
async function navigateTo(routeKey) {
  const validRouteKey = routes[routeKey] ? routeKey : "inicio";
  const route = routes[validRouteKey];
  const contentElement =
    document.getElementById("app") || document.getElementById("app-content");
  let cssElement = document.getElementById("module-css");

  if (!cssElement) {
    cssElement = document.createElement("link");
    cssElement.id = "module-css";
    cssElement.rel = "stylesheet";
    document.head.appendChild(cssElement);
  }

  try {
    // Carga de HTML con cache-busting
    const response = await fetch(`${route.html}?v=${Date.now()}`);
    if (!response.ok) throw new Error(`No se pudo cargar: ${route.html}`);
    const html = await response.text();
    contentElement.innerHTML = html;

    // Carga de CSS dinámico
    if (route.css) {
      cssElement.href = `${route.css}?v=${Date.now()}`;
    } else {
      cssElement.href = "";
    }

    // Carga de JS modular dinámico
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
