const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const routeLinks = document.querySelectorAll("[data-route]");
const views = document.querySelectorAll("[data-view]");
const savedTheme = localStorage.getItem("theme");
const defaultView = "about";

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

function setActiveView(viewName, shouldUpdateHistory = true) {
  const targetView = document.querySelector(`[data-view="${viewName}"]`)
    ? viewName
    : defaultView;

  views.forEach((view) => {
    view.classList.toggle("is-active", view.dataset.view === targetView);
  });

  routeLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.route === targetView);
  });

  if (shouldUpdateHistory) {
    history.pushState({ view: targetView }, "", `#${targetView}`);
  }

  window.scrollTo({ top: 0, behavior: shouldUpdateHistory ? "smooth" : "auto" });

  if (!shouldUpdateHistory) {
    requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "auto" }), 60);
  }
}

routeLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveView(link.dataset.route);
  });
});

window.addEventListener("popstate", () => {
  setActiveView(location.hash.replace("#", "") || defaultView, false);
});

setActiveView(location.hash.replace("#", "") || defaultView, false);
