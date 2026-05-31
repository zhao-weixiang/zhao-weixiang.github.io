const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const beyondLink = document.querySelector("[data-beyond-link]");
const navLinks = document.querySelectorAll(".nav a, .brand");
const aboutLink = document.querySelector('.nav a[href="#about"]');
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("theme", nextTheme);
});

function setBeyondActive(isActive, updateHash = true) {
  document.body.classList.toggle("show-beyond", isActive);

  navLinks.forEach((link) => {
    link.classList.remove("is-active");
  });

  (isActive ? beyondLink : aboutLink)?.classList.add("is-active");

  if (updateHash) {
    history.pushState({ beyond: isActive }, "", isActive ? "#beyond" : "#about");
  }

  if (isActive || updateHash) {
    window.scrollTo({ top: 0, behavior: updateHash ? "smooth" : "auto" });
  }
}

beyondLink?.addEventListener("click", (event) => {
  event.preventDefault();
  setBeyondActive(true);
});

navLinks.forEach((link) => {
  if (link === beyondLink) {
    return;
  }

  link.addEventListener("click", (event) => {
    if (!document.body.classList.contains("show-beyond")) {
      return;
    }

    event.preventDefault();
    const targetId = link.getAttribute("href") || "#about";
    setBeyondActive(false, false);
    history.pushState({ beyond: false }, "", targetId);

    requestAnimationFrame(() => {
      document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
    });
  });
});

window.addEventListener("popstate", () => {
  const isBeyond = location.hash === "#beyond";
  setBeyondActive(isBeyond, false);

  if (!isBeyond && location.hash) {
    requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: "auto" });
    });
  }
});

setBeyondActive(location.hash === "#beyond", false);
