function getClickedButton(target) {
  if (target.tagName === "BUTTON") {
    return target;
  }

  return target.closest("button");
}

function toggleMainMenu(ev) {
  console.log("menu clicked");

  const button = getClickedButton(ev.target);
  const globalNav = document.querySelector(".global-nav");

  if (!button || !globalNav) {
    return;
  }

  globalNav.classList.toggle("show");

  const isOpen = globalNav.classList.contains("show");

  button.setAttribute("aria-expanded", isOpen);
  button.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
}

function toggleSubmenu(ev) {
  const button = getClickedButton(ev.target);
  const listItem = button.closest("li");
  const submenu = listItem.querySelector(".global-nav__submenu");

  if (!button || !submenu) {
    return;
  }

  submenu.classList.toggle("show");

  const isOpen = submenu.classList.contains("show");

  button.setAttribute("aria-expanded", isOpen);
}

export function enableNavigation() {
  console.log("enableNavigation is running");

  const menuButton = document.querySelector("#global-nav-toggle");
  const submenuButtons = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  console.log(menuButton);

  if (menuButton && !menuButton.dataset.navEnabled) {
    menuButton.addEventListener("click", toggleMainMenu);
    menuButton.dataset.navEnabled = "true";
  }

  submenuButtons.forEach((button) => {
    if (!button.dataset.navEnabled) {
      button.addEventListener("click", toggleSubmenu);
      button.dataset.navEnabled = "true";
    }
  });
}