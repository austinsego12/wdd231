import spritePath from "../images/sprite.symbol.svg";

export function parkInfoTemplate(data) {
  return `<a href="/" class="hero-banner__title">${data.name}</a>
  <p class="hero-banner__subtitle">
    <span>${data.designation}</span>
    <span>${data.states}</span>
  </p>`;
}

export function mediaCardTemplate(info) {
  return `<div class="media-card">
    <a href="${info.link}">
      <img src="${info.image}" alt="${info.name}" class="media-card__img">
      <h3 class="media-card__title">${info.name}</h3>
    </a>
    <p>${info.description}</p>
  </div>`;
}

function getMailingAddress(addresses) {
  return addresses.find((address) => address.type === "Mailing");
}

function getVoicePhone(numbers) {
  const voice = numbers.find((number) => number.type === "Voice");
  return voice.phoneNumber;
}

export function footerTemplate(info) {
  const mailing = getMailingAddress(info.addresses);
  const voice = getVoicePhone(info.contacts.phoneNumbers);

  return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div>
      <p>${mailing.line1}</p>
      <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p>
    </div>
    <h4>Phone:</h4>
    <p>${voice}</p>
  </section>`;
}

export function alertTemplate(alert) {
  let alertType = "";

  switch (alert.category) {
    case "Park Closure":
      alertType = "closure";
      break;
    default:
      alertType = alert.category.toLowerCase();
  }

  return `<li class="alert">
    <svg class="icon" focusable="false" aria-hidden="true">
      <use xlink:href="${spritePath}#alert-${alertType}"></use>
    </svg>
    <div>
      <h3 class="alert-${alertType}">${alert.title}</h3>
      <p>${alert.description}</p>
    </div>
  </li>`;
}

export function visitorCenterTemplate(center) {
  return `<article class="visitor-center">
    <h3>${center.name}</h3>
    <p>${center.description || "No description available."}</p>
    ${
      center.directionsInfo
        ? `<p><strong>Directions:</strong> ${center.directionsInfo}</p>`
        : ""
    }
  </article>`;
}

export function activityTemplate(activity) {
  return `<li class="activity">
    ${activity.name}
  </li>`;
}

export function listTemplate(data, contentTemplate) {
  const html = data.map(contentTemplate);
  return `<ul>${html.join("")}</ul>`;
}

export function vcImageTemplate(image) {
  return `
    <li>
      <img src="${image.url}" alt="${image.altText || "Visitor center image"}" />
    </li>
  `;
}

export function vcAmenityTemplate(amenity) {
  return `<li>${amenity}</li>`;
}

export function vcDetailsTemplate(id, iconId, summaryText, content) {
  return `
    <details name="vc-details" id="${id}">
      <summary>
        <svg class="icon" role="presentation" focusable="false">
          <use xlink:href="${spritePath}#${iconId}"></use>
        </svg>
        ${summaryText}
      </summary>
      <div class="vc-details-content">
        ${content}
      </div>
    </details>
  `;
}

export function vcAddressTemplate(addresses) {
  if (!addresses || addresses.length === 0) {
    return "<p>No address information is currently available.</p>";
  }

  const html = addresses.map((address) => {
    return `
      <section class="vc-address">
        <h3>${address.type || "Address"}</h3>
        <p>
          ${address.line1 || ""}<br />
          ${address.line2 || ""}
          ${address.line2 ? "<br />" : ""}
          ${address.line3 || ""}
          ${address.line3 ? "<br />" : ""}
          ${address.city || ""}, ${address.stateCode || ""}
          ${address.postalCode || ""}
        </p>
      </section>
    `;
  });

  return html.join("");
}

export function vcContactTemplate(contacts) {
  if (!contacts) {
    return "<p>No contact information is currently available.</p>";
  }

  const phone =
    contacts.phoneNumbers && contacts.phoneNumbers.length > 0
      ? contacts.phoneNumbers[0].phoneNumber
      : null;

  const email =
    contacts.emailAddresses && contacts.emailAddresses.length > 0
      ? contacts.emailAddresses[0].emailAddress
      : null;

  return `
    ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
    ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>` : ""}
    ${!phone && !email ? "<p>No contact information is currently available.</p>" : ""}
  `;
}