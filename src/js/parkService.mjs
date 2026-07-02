const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;

async function getJson(url) {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };

  const response = await fetch(baseUrl + url, options);

  if (response.ok) {
    return await response.json();
  }

  throw new Error("response not ok");
}

export async function getParkData(parkCode = "yell") {
  const parkData = await getJson(`parks?parkCode=${parkCode}`);
  return parkData.data[0];
}

export async function getAlertsData(parkCode) {
  const alertData = await getJson(`alerts?parkCode=${parkCode}`);
  return alertData.data;
}

export async function getVisitorCenterData(parkCode) {
  const visitorCenterData = await getJson(`visitorcenters?parkCode=${parkCode}`);
  return visitorCenterData.data;
}

export async function getParkVisitorCenterDetails(id) {
  const visitorCenterData = await getJson(
    `visitorcenters?id=${encodeURIComponent(id)}`
  );

  return visitorCenterData.data[0];
}

export function getInfoLinks(images) {
  const parkInfoLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: images[2].url,
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: images[3].url,
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: images[9].url,
      description: "Learn about the visitor centers in the park."
    }
  ];

  return parkInfoLinks;
}
