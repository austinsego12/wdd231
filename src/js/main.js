import { getParkData, getInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";
import { enableNavigation } from "./navigation.mjs";

function setParkIntro(data) {
  const intro = document.querySelector(".intro");

  intro.innerHTML = `
    <h1>${data.fullName}</h1>
    <p>${data.description}</p>
  `;
}

function setParkInfoLinks(data) {
  const info = document.querySelector(".info");
  const html = data.map(mediaCardTemplate);

  info.innerHTML = html.join("");
}

async function init() {
  enableNavigation();

  try {
    const parkData = await getParkData();
    const parkInfoLinks = getInfoLinks(parkData.images);

    setHeaderFooter(parkData);
    setParkIntro(parkData);
    setParkInfoLinks(parkInfoLinks);
  } catch (error) {
    console.error("Park data could not be loaded:", error);
  }
}

init();