import "../css/style.css";
import "../css/conditions.css";

import { getParkData, getAlertsData, getVisitorCenterData } from "./parkService.mjs";
import {
  setHeaderFooter,
  alertTemplate,
  visitorCenterTemplate,
  activityTemplate
} from "./templates.mjs";

const parkCode = "yell";

async function init() {
  const parkData = await getParkData(parkCode);

  setHeaderFooter(parkData);
  setAlerts(parkData.parkCode);
  setVisitorCenters(parkData.parkCode);
  setActivities(parkData.activities);
}

async function setAlerts(parkCode) {
  const alertsList = document.querySelector("#alerts-list");
  const alerts = await getAlertsData(parkCode);

  if (!alerts || alerts.length === 0) {
    alertsList.innerHTML = "<li>No alerts at this time.</li>";
    return;
  }

  alertsList.innerHTML = alerts.map(alertTemplate).join("");
}

async function setVisitorCenters(parkCode) {
  const visitorCentersList = document.querySelector("#visitor-centers-list");
  const centers = await getVisitorCenterData(parkCode);

  if (!centers || centers.length === 0) {
    visitorCentersList.innerHTML = "<p>No visitor center information is available.</p>";
    return;
  }

  visitorCentersList.innerHTML = centers.map(visitorCenterTemplate).join("");
}

function setActivities(activities) {
  const activitiesList = document.querySelector("#activities-list");

  if (!activities || activities.length === 0) {
    activitiesList.innerHTML = "<p>No activities are currently listed for this park.</p>";
    return;
  }

  activitiesList.innerHTML = `
    <ul class="activities-grid">
      ${activities.map(activityTemplate).join("")}
    </ul>
  `;
}

init();