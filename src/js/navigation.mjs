function getClickedButton(target) {
  if (target.tagName === "BUTTON") {
    return target;
  }

  return target.closest("button");
}

function toggleMainMenu(ev) {
  const button = getClickedButton(ev.target);
  const globalNav = document.querySelector(".global-nav");

  globalNav.classList.toggle("show");

  const isOpen = globalNav.classList.contains("show");

  button.setAttribute("aria-expanded", isOpen);
  button.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
}

function toggleSubmenu(ev) {
  const button = getClickedButton(ev.target);
  const listItem = button.closest("li");
  const submenu = listItem.querySelector(".global-nav__submenu");

  submenu.classList.toggle("show");

  const isOpen = submenu.classList.contains("show");

  button.setAttribute("aria-expanded", isOpen);
}

export function enableNavigation() {
  const menuButton = document.querySelector("#global-nav-toggle");
  const submenuButtons = document.querySelectorAll(
    ".global-nav__split-button__toggle"
  );

  if (menuButton) {
    menuButton.addEventListener("click", toggleMainMenu);
  }

  submenuButtons.forEach((button) => {
    button.addEventListener("click", toggleSubmenu);
  });
}