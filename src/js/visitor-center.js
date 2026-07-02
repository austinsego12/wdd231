import "../css/style.css";
import "../css/visitor-center.css";

import {
  getParkData,
  getParkVisitorCenterDetails
} from "./parkService.mjs";

import setHeaderFooter from "./setHeaderFooter.mjs";
import { enableNavigation } from "./navigation.mjs";

import {
  listTemplate,
  vcImageTemplate,
  vcAmenityTemplate,
  vcDetailsTemplate,
  vcAddressTemplate,
  vcContactTemplate
} from "./templates.mjs";

function getParam(param) {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  return params.get(param);
}

function setVisitorCenterIntro(center) {
  const name = document.querySelector("#vc-name");
  const description = document.querySelector("#vc-description");
  const mainImage = document.querySelector("#vc-main-image");

  name.textContent = center.name;
  document.title = center.name;

  description.innerHTML =
    center.description || "No description is currently available.";

  if (center.images && center.images.length > 0) {
    mainImage.src = center.images[0].url;
    mainImage.alt = center.images[0].altText || center.name;
  }
}

function directionsTemplate(center) {
  const directionsInfo =
    center.directionsInfo || "No directions are currently available.";

  const directionsLink = center.directionsUrl
    ? `<p><a href="${center.directionsUrl}" target="_blank">View directions</a></p>`
    : "";

  return `
    <p>${directionsInfo}</p>
    ${directionsLink}
  `;
}

function setVisitorCenterDetails(center) {
  const detailsList = document.querySelector("#vc-details-list");

  const addressesContent = vcAddressTemplate(center.addresses);
  const directionsContent = directionsTemplate(center);

  const amenitiesContent =
    center.amenities && center.amenities.length > 0
      ? listTemplate(center.amenities, vcAmenityTemplate)
      : "<p>No amenities are currently listed.</p>";

  const contactContent = vcContactTemplate(center.contacts);

  detailsList.innerHTML = `
    ${vcDetailsTemplate(
      "vc-addresses",
      "heading-icon_map-pin",
      "Addresses",
      addressesContent
    )}
    ${vcDetailsTemplate(
      "vc-directions",
      "directions",
      "Directions",
      directionsContent
    )}
    ${vcDetailsTemplate(
      "vc-amenities",
      "heading-icon_info",
      "Amenities",
      amenitiesContent
    )}
    ${vcDetailsTemplate(
      "vc-contact",
      "phone",
      "Contact Information",
      contactContent
    )}
  `;
}

function setVisitorCenterGallery(center) {
  const gallery = document.querySelector("#vc-gallery-list");

  if (!center.images || center.images.length === 0) {
    gallery.innerHTML = "<p>No images are currently available.</p>";
    return;
  }

  gallery.innerHTML = listTemplate(center.images, vcImageTemplate);
}

function setVisitorCenterPage(center) {
  setVisitorCenterIntro(center);
  setVisitorCenterDetails(center);
  setVisitorCenterGallery(center);
}

async function init() {
  enableNavigation();

  const id = getParam("id");

  if (!id) {
    document.querySelector("#vc-name").textContent = "Visitor Center Not Found";
    document.querySelector("#vc-description").textContent =
      "No visitor center id was provided in the URL.";
    return;
  }

  try {
    const parkData = await getParkData();
    setHeaderFooter(parkData);

    const visitorCenter = await getParkVisitorCenterDetails(id);
    setVisitorCenterPage(visitorCenter);
  } catch (error) {
    console.error("Visitor center data could not be loaded:", error);

    document.querySelector("#vc-name").textContent =
      "Visitor Center Could Not Be Loaded";
    document.querySelector("#vc-description").textContent =
      "There was a problem loading this visitor center. Check the API key and visitor center id.";
  }
}

init();