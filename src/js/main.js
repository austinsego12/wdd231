import { getParkData, getInfoLinks } from "./parkService.mjs";
import { mediaCardTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setHeaderInfo(data) {
  const disclaimerLink = document.querySelector(".disclaimer > a");
  disclaimerLink.href = data.url;
  disclaimerLink.innerHTML = data.fullName;

  document.title = data.fullName;

  const heroImage = document.querySelector(".hero-banner__image");
  heroImage.src = data.images[0].url;
  heroImage.alt = data.images[0].altText;

  const heroInfo = document.querySelector(".hero-banner__info");
  heroInfo.innerHTML = parkInfoTemplate(data);
}

function parkInfoTemplate(info) {
  return `
    <a href="${info.url}" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>
  `;
}

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

function getMailingAddress(addresses) {
  const mailing = addresses.find((address) => address.type === "Mailing");
  return mailing;
}

function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice.phoneNumber;
}

function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `
    <section class="contact">
      <h3>Contact Info</h3>

      <h4>Mailing Address:</h4>
      <div>
        <p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
      </div>

      <h4>Phone:</h4>
      <p>${voice}</p>
    </section>
  `;
}

function setFooter(data) {
  const footer = document.querySelector("#park-footer");
  footer.innerHTML = footerTemplate(data);
}

  if (!menuButton || !globalNav) {
    return;
  }

  menuButton.addEventListener("click", (ev) => {
    let target = ev.target;

    if (target.tagName !== "BUTTON") {
      target = target.closest("button");
    }

    globalNav.classList.toggle("show");

    const isOpen = globalNav.classList.contains("show");

    target.setAttribute("aria-expanded", isOpen);
    target.setAttribute("aria-label", isOpen ? "Close Menu" : "Open Menu");
  });

async function init() {
  const parkData = await getParkData();
  const parkInfoLinks = getInfoLinks(parkData.images);

  setHeaderInfo(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(parkInfoLinks);
  setFooter(parkData);
}

init();