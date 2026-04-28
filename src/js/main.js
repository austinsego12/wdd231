import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

const disclaimerLink = document.querySelector(".disclaimer > a");
disclaimerLink.href = parkData.url;
disclaimerLink.innerHTML = parkData.fullName;

document.title = parkData.fullName;

const heroImage = document.querySelector(".hero-banner__image");
heroImage.src = parkData.images[0].url;
heroImage.alt = parkData.images[0].altText;

function parkInfoTemplate(info) {
  return `
    <a href="${info.url}" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

const heroInfo = document.querySelector(".hero-banner__info");
heroInfo.innerHTML = parkInfoTemplate(parkData);