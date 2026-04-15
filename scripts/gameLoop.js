import { cryoShipManager } from "./cryoShipManager.js";
import { randomConsoleNews, addToConsole, addRandomHeadlineToConsole } from "./consoleLine.js";
import { displayUpgrades } from "./displayResearch.js";
import * as fundsAndCost from "./profitsCosts.js";

//The location display span
const locationDisplay = document.getElementById("location-display");
//Company name paragraph
const companyDisplay = document.getElementById("company-name-display");
// Year span display
const dateDisplay = document.getElementById("date-display");

function initializeDisplay() {
    locationDisplay.textContent = `${cryoShipManager.location.planet}, ${cryoShipManager.location.solarSystem} - ${cryoShipManager.location.relativeLocation}`;
    companyDisplay.textContent = cryoShipManager.company;
    setInitialDate();
    updateDate();
    displayUpgrades();
    fundsAndCost.updateAll();
}

function setInitialDate() { 
    let currentDate = new Date(Date.now());
    currentDate.setFullYear(2780);
    cryoShipManager.date = currentDate;
}

function updateDate() {
    let currentDate = cryoShipManager.date;
    currentDate.setDate(currentDate.getDate() + 1);
    dateDisplay.textContent = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
}

/* End of event listeners */


/** Function calls **/
//Initializes all display items
initializeDisplay();
setInterval(addRandomHeadlineToConsole, 100000);
//Updates the date every second
setInterval(updateDate, 1000);
//Updates profit and all updatable objects every second
setInterval(fundsAndCost.profitUpdate, 1000);

