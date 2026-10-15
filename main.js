/* ==========================================================
   ENRUTADOR Y CONTROLADOR SPA - MISKI SATI S.A.C.
   ========================================================== */

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
  aplicaciones: {
    html: "modules/aplicaciones/aplicaciones.html",
    css: "modules/aplicaciones/aplicaciones.css",
    js: "modules/aplicaciones/aplicaciones.js",
  },
  comunicacion: {
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

// Cargar Layout Base (Header y Footer)
async function loadLayout() {
  try {
    const [headerRes, footerRes] = await Promise.all([
      fetch("layout/header.html"),
      fetch("layout/footer.html"),
    ]);

    if (headerRes.ok) {
      document.getElementById("header-container").innerHTML =
        await headerRes.text();
    }
    if (footerRes.ok) {
      document.getElementById("footer-container").innerHTML =
        await footerRes.text();
    }

    setupOffcanvasEvents();
    initVisitsCounter();
  } catch (err) {
    console.error("Error al cargar el layout base:", err);
  }
}

// Menú Off-Canvas Lateral (10 Módulos)
function setupOffcanvasEvents() {
  document.addEventListener("click", (e) => {
    const burgerBtn = e.target.closest("#burgerToggleBtn");
    const closeBtn = e.target.closest("#closeDrawerBtn");
    const overlay = document.getElementById("offcanvasOverlay");
    const drawer = document.getElementById("offcanvasDrawer");

    if (burgerBtn && drawer && overlay) {
      drawer.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("no-scroll");
    }

    if ((closeBtn || e.target === overlay) && drawer && overlay) {
      drawer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }

    const moduleLink = e.target.closest("[data-module]");
    if (moduleLink) {
      const moduleKey = moduleLink.dataset.module;
      window.location.hash = moduleKey;

      if (drawer && overlay) {
        drawer.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
      }
    }
  });
}

// Contador de Visitas Persistente
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

// Enrutador Dinámico entre Módulos
async function navigateTo(routeKey) {
  const validKey = routes[routeKey] ? routeKey : "inicio";
  const route = routes[validKey];
  const contentEl = document.getElementById("app-content");
  let cssLink = document.getElementById("module-css");

  if (!cssLink) {
    cssLink = document.createElement("link");
    cssLink.id = "module-css";
    cssLink.rel = "stylesheet";
    document.head.appendChild(cssLink);
  }

  try {
    const res = await fetch(`${route.html}?v=${Date.now()}`);
    if (!res.ok) throw new Error(`HTML no encontrado: ${route.html}`);
    contentEl.innerHTML = await res.text();

    if (route.css) {
      cssLink.href = `${route.css}?v=${Date.now()}`;
    }

    if (route.js) {
      const moduleScript = await import(`./${route.js}?v=${Date.now()}`);
      if (moduleScript && typeof moduleScript.init === "function") {
        moduleScript.init();
      }
    }

    updateActiveNavLinks(validKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
    console.error("Error al navegar:", err);
  }
}

function updateActiveNavLinks(activeKey) {
  document.querySelectorAll("[data-module]").forEach((link) => {
    if (link.dataset.module === activeKey) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function handleHashChange() {
  const routeKey = window.location.hash.replace("#", "") || "inicio";
  navigateTo(routeKey);
}

window.addEventListener("DOMContentLoaded", async () => {
  await loadLayout();
  handleHashChange();
});

window.addEventListener("hashchange", handleHashChange);
