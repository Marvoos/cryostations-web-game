import { cryoShipManager } from "./cryoShipManager.js";
import * as fundsAndCost from "./profitsCosts.js";
import { addToConsole } from "./consoleLine.js";

const freezeWorkerBtn = document.getElementById("freeze-worker-btn");
const cryoPodsBtn = document.getElementById("cryopods-btn");
const cryoShipsBtn = document.getElementById("cryoships-btn");
const launchCryoShipBtn = document.getElementById("cryoship-launch-btn");
/** Main Button Event Listeners **/
//Freeze worker button click
freezeWorkerBtn.addEventListener('click', () => {
    const actualFreezeAmount = cryoShipManager.freezeAmount <= fundsAndCost.getRemainingCryoPods() ? cryoShipManager.freezeAmount : fundsAndCost.getRemainingCryoPods();
    const cost = fundsAndCost.getCost().freezeWorker;
    if (cryoShipManager.totalWorkersFrozen == 1000 || cryoShipManager.totalWorkersFrozen == 10000 || cryoShipManager.totalWorkersFrozen == 100000) {
        addToConsole(`${cryoShipManager.company} has frozen a total of ${(cryoShipManager.totalWorkersFrozen).toLocaleString('en')} workers - A world first!`);
    }

    if (cryoShipManager.resources.totalFunds >= cost && cryoShipManager.resources.workersFrozen < fundsAndCost.getTotalCryoShipPods()){
        cryoShipManager.resources.workersFrozen += actualFreezeAmount;
        cryoShipManager.totalWorkersFrozen += actualFreezeAmount;
        cryoShipManager.resources.totalFunds -= cost;
        fundsAndCost.updateAll();
    }


        
});

//CryoShips button click 
cryoShipsBtn.addEventListener('click', () => {
    const cost = fundsAndCost.getCost().cryoShips;
    if (cryoShipManager.resources.totalFunds >= cost) {
        cryoShipManager.resources.totalFunds -= cost;
        cryoShipManager.resources.fleetOnGround += 1;
        fundsAndCost.updateAll();
    }
});

//Cryopods button click
cryoPodsBtn.addEventListener('click', () => {
    const cost = fundsAndCost.getCost().cryoPods;
    if (cryoShipManager.resources.totalFunds >= cost) {
        cryoShipManager.resources.totalFunds -= cost;
        cryoShipManager.resources.cryoPodsPerShip += 1;
        fundsAndCost.updateAll();
    }
});

//launch button click                                         
launchCryoShipBtn.addEventListener('click', () => {
    const cost = fundsAndCost.getCost().launchCryoShip[0];

    if (
        cryoShipManager.resources.totalFunds >= cost &&
        cryoShipManager.resources.workersFrozen >= cryoShipManager.resources.cryoPodsPerShip &&
        cryoShipManager.resources.fleetOnGround > 0
    ) {
        cryoShipManager.resources.totalFunds -= cost;
        cryoShipManager.resources.workersFrozen -= cryoShipManager.resources.cryoPodsPerShip;
        cryoShipManager.resources.fleetOnGround -= 1;
        cryoShipManager.resources.fleetInOrbit += 1;

        cryoShipManager.profitRate = 50 * Math.pow(1.5, cryoShipManager.resources.fleetInOrbit);
        fundsAndCost.updateAll();
    }
});