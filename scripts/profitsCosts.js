import { cryoShipManager } from "./cryoShipManager.js";

//Console display div

const freezeWorkerCostDisplay = document.getElementById("freeze-worker-cost-display");

const freezeWorkerDisplay = document.getElementById("freeze-worker-display");
const freezePowerDisplay = document.getElementById("freeze-power-display");

const cryopodsCostDisplay = document.getElementById("cryopod-cost-display");

const cryoPodsDisplay = document.getElementById("cryopods-display");
const cryoPodsPerShip = document.getElementById("cryopods-per-ship-display");

const cryoshipsCostDisplay = document.getElementById("build-ship-cost-display");

const cryoShipsOnGroundDisplay = document.getElementById("cryoships-ground-display");

const launchCryoShipCostDisplay = document.getElementById("launch-cryoship-cost-display");

const cryoShipsInOrbit = document.getElementById("cryoship-orbital-display");
const cryoPodsFilledCostDisplay = document.getElementById("cryopods-filled-cost-display");

//Funds display span
const fundsDisplay = document.getElementById("funds-display");

// Helper function to provide uniform logic across all costs, user funds, and user profits.
/*
    Used in the following functions:
    - displayUpgrades()
    - updateFunds()
    - updateCost()
    - updateProfitPerSecondDisplay()

    @param {number} inputFunds The total funds/cost/profit needing to be converted to a normalized format.
    @returns {string} fundsString The normalized number in a string format and added currency type and shortened number form.

*/
export function normalizeCostFunds(inputFunds) {
    let fundsString;
    if (inputFunds >= 1e18) {
        fundsString = `${(inputFunds / 1e18).toLocaleString('en')} Q USDE`;
    }
    else if (inputFunds >= 1e15) {
        fundsString = `${(inputFunds / 1e12).toLocaleString('en')} q USDE`;
    }
    else if (inputFunds >= 1e12) {
        fundsString = `${(inputFunds / 1e12).toLocaleString('en')} T USDE`;
    }
    else if (inputFunds >= 1e9) {
        fundsString = `${(inputFunds / 1e9).toLocaleString('en')} B USDE`;
    }
    else if (inputFunds >= 1e6) {
        fundsString = `${(inputFunds / 1e6).toLocaleString('en')} M USDE`;
    }
    else {
        fundsString = `${inputFunds.toLocaleString('en')} USDE`;
    }
    
    return fundsString;
}


export function updateCryoShips() {
    cryoShipsOnGroundDisplay.textContent = cryoShipManager.resources.fleetOnGround;
    cryoShipsInOrbit.textContent = cryoShipManager.resources.fleetInOrbit;
}

export function updateFreezePower() {
    freezePowerDisplay.textContent = cryoShipManager.freezeAmount;
}

export function updateFrozenWorkers() {
    freezeWorkerDisplay.textContent = cryoShipManager.resources.workersFrozen;
}

export function updateFunds() {
    fundsDisplay.textContent = normalizeCostFunds(cryoShipManager.resources.totalFunds); 
}

export function getTotalCryoShipPods() {
    return cryoShipManager.resources.cryoPodsPerShip * cryoShipManager.resources.fleetOnGround;
}

export function getRemainingCryoPods() {
    return getTotalCryoShipPods() - cryoShipManager.resources.workersFrozen;
}

export function updateCryoPods() {
    cryoPodsDisplay.textContent = getTotalCryoShipPods();
    cryoPodsPerShip.textContent = cryoShipManager.resources.cryoPodsPerShip;
}

export function getProfit() {
    const groundProfit = cryoShipManager.profitRate * Math.pow(cryoShipManager.totalWorkersFrozen, 0.85) * (1 + cryoShipManager.resources.fleetOnGround * 0.15);
    const orbitalProfit = cryoShipManager.profitRate * cryoShipManager.resources.fleetInOrbit * 0.25; // each orbiting ship gives 25% base
    return groundProfit + orbitalProfit;
}

export function profitUpdate() {
    const totalProfit = getProfit();
    cryoShipManager.resources.totalFunds += totalProfit;
    updateAll();
}

export function getCost() { 
    const costObject = {
        freezeWorker: (cryoShipManager.freezeAmount <= getRemainingCryoPods() ? cryoShipManager.freezeAmount : getRemainingCryoPods()) * cryoShipManager.costModifiers.freezeWorkers * Math.floor(1e4 * Math.pow(1.07, cryoShipManager.resources.workersFrozen)),
        cryoPods: cryoShipManager.costModifiers.cryoPods * Math.floor(1e4 * Math.pow(1.18, cryoShipManager.resources.cryoPodsPerShip)),
        cryoShips: cryoShipManager.costModifiers.cryoShips * Math.floor(1e6 * Math.pow(1.5, cryoShipManager.resources.fleetOnGround + cryoShipManager.resources.fleetInOrbit)),
        launchCryoShip: [cryoShipManager.costModifiers.launchShips * Math.floor(1e6 * Math.pow(3, (cryoShipManager.resources.fleetInOrbit + 1) )), cryoShipManager.resources.cryoPodsPerShip]
    }
    return costObject;
}

export function updateCost() {
    freezeWorkerCostDisplay.textContent = getRemainingCryoPods() > 0 ? normalizeCostFunds(getCost().freezeWorker) : "No Cryopods"; 
    cryopodsCostDisplay.textContent = normalizeCostFunds(getCost().cryoPods);
    cryoshipsCostDisplay.textContent = normalizeCostFunds(getCost().cryoShips);
    launchCryoShipCostDisplay.textContent = normalizeCostFunds(getCost().launchCryoShip[0]);
    cryoPodsFilledCostDisplay.textContent = `${cryoShipManager.resources.workersFrozen} / ${getCost().launchCryoShip[1]}`;
}

//Profit per second display span
const profitPerSecDisplay = document.getElementById("profit-per-sec-display");

export function updateProfitPerSecDisplay() {
    const profit = getProfit();
    profitPerSecDisplay.textContent = normalizeCostFunds(profit);
}


/* Update All function used to update UI */

export function updateAll() {

    // Uopdate the 
    updateFrozenWorkers();


    updateFreezePower()
    
    
    updateCryoPods();
    
    // Updates the UI for the number cryoships on ground under the 'Build Ships' button. 
    // Updates the UI for the number of cryoships in orbit under the 'Launch Cryoship' button.
    updateCryoShips();

    // Updates the UI to display the manager's funds as it appears under the cryoShipManager.resources.totalFunds 
    // If over a billion, display funds divided by a billion followed by 'B USDE'.
    // If over a quintillion, 1e18, display funds divided by a quintillion followed by 'Q USDE'
    updateFunds();

    updateProfitPerSecDisplay();


    updateCost();
    
}

/* End of Update All function */