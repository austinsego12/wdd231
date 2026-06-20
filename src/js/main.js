import { getParkData, getInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

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
  const parkData = await getParkData();
  const parkInfoLinks = getInfoLinks(parkData.images);

  setHeaderFooter(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(parkInfoLinks);
}

init();

init();