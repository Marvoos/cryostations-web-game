//Game window. The window in which the entirety of the game exists
const gameWindow = document.getElementById("game-window");
//The location display span
const locationDisplay = document.getElementById("location-display");
//Funds display span
const fundsDisplay = document.getElementById("funds-display");
//Company name paragraph
const companyDisplay = document.getElementById("company-name-display");
// Year span display
const yearDisplay = document.getElementById("year-display");
//Profit per second display span
const profitPerSecDisplay = document.getElementById("profit-per-sec-display");
//Console display div
const consoleNewsDisplay = document.getElementById("console");

/****/
const freezeWorkerCostDisplay = document.getElementById("freeze-worker-cost-display");
const freezeWorkerBtn = document.getElementById("freeze-worker-btn");
const freezeWorkerDisplay = document.getElementById("freeze-worker-display");
const freezePowerDisplay = document.getElementById("freeze-power-display");

const cryopodsCostDisplay = document.getElementById("cryopod-cost-display");
const cryoPodsBtn = document.getElementById("cryopods-btn");
const cryoPodsDisplay = document.getElementById("cryopods-display");
const cryoPodsPerShip = document.getElementById("cryopods-per-ship-display");

const cryoshipsCostDisplay = document.getElementById("build-ship-cost-display");
const cryoShipsBtn = document.getElementById("cryoships-btn");
const cryoShipsOnGroundDisplay = document.getElementById("cryoships-ground-display");

const launchCryoShipCostDisplay = document.getElementById("launch-cryoship-cost-display");
const launchCryoShipBtn = document.getElementById("cryoship-launch-btn");
const cryoShipsInOrbit = document.getElementById("cryoship-orbital-display");
const cryoPodsFilledCostDisplay = document.getElementById("cryopods-filled-cost-display");

const upgradeListDiv = document.getElementById("upgrade-list");
const upgradesPurchased = document.getElementById("upgrades-purchased");
let cryoShipManager = {
    year: 2780,
    company: "Cryo Systems United Incorporated",
    location: {
        solarSystem: "Sol",
        planet: "Earth",
        relativeLocation: "CryoCentre, Dallas Texas"
    },
    
    resources: 
    {
        totalFunds: 5e4,
        workersFrozen: 0,
        cryoPodsPerShip: 5,
        fleetOnGround: 1,
        fleetInOrbit: 0,
    },
    profitRate: 150, 
    totalWorkersFrozen: 0,
    freezeAmount: 1,
    costModifiers: {
        freezeWorkers: 1,
        cryoPods: 1,
        cryoShips: 1,
        launchShips: 1
    },

    upgrades: [
        {
            name: "Socialize losses, privitize gains",
            description: "As a capital owner, you're entitled to taxpayer dollars to improve your company! Just hire some lobbyists and you're good.",
            cost: 1.5e9,
            effect: () => {
                cryoShipManager.profitRate += cryoShipManager.profitRate * 1.5;
            }
        },
        {
            name: "Evade Ethics Regulations",
            description: "Once again, the government has interfered in our ability to make as much profit as possible. Time to hire a professional to avoid these tyrannical, marxists, ethics regulations. Reduces cost to freeze workers by 25%",
            cost: 5e9,
            effect: () => {
                cryoShipManager.costModifiers.freezeWorkers *= 0.75;
            }
        },
        {
            name: "Cryo-Sleep transfer protocol",
            description: "Allows workers to provide services while in cryosleep, wages from these assets are sent straight to us",
            cost: 1e10,
            effect: () => {
                cryoShipManager.profitRate *= 2;
            }
        },
        {
            name: "Out-of-World interns (unpaid)",
            description: "Using the docile Mollagjar citizens, we can now freeze double the workers at a time.",
            cost: 2.5e10,
            effect: () => {
                cryoShipManager.freezeAmount = 2;
                updateAll();
            }
        },  
        { 
            name: "Fusion powered cryopods",
            description: "Cryopods are now powered through fusion thus more efficient and less costly",
            cost: 5e10,
            effect: () => {
                cryoShipManager.costModifiers.cryoPods *= 0.75; 
            }
        },
        {
            name: "Sliding into Indetured Servitude",
            description: "Now you can dictate policy around slave labour and it's legality as used within the company. Doubles the amount of workers frozen each time and prevents 50% more workers from being paid.",
            cost: 6e10,
            effect: () => {
                cryoShipManager.freezeAmount = 4;
                cryoShipManager.profitRate * 1.5;
                updateAll();
            }
        },
        {
            name: "Propaganda Machine Promotions",
            description: `"Build a new life today by registering for our corporate colony program! Free our country of tyranny and help fight for our freedom!", Decreases cost to find workers by 25%`,
            cost: 7e10,
            effect: () => {
                cryoShipManager.costModifiers.freezeWorkers *= 0.75;
            }
        },
        {
            name: "Antimatter powered cryopods",
            description: "Experimental antimatter from R&D now implemented as a power source",
            cost: 1.2e12,
            effect: () => {
                cryoShipManager.costModifiers.cryoPods *= 0.75;
                cryoShipManager.costModifiers.freezeWorkers *= 0.75;
            }
        },
        {
            name: "Asteroid Capture Program",
            description: "This asteroid capture program works by grabbing resource rich rocks from space and hoarding them by slowly extracting Helium-3 and metals used for our ships. Not only does it reduce the cost of building and launching these ships, but it also increases our profit rate by very high margins.",
            cost: 4e12,
            effect: () => {
                cryoShipManager.costModifiers.cryoShips *= 0.75;
                cryoShipManager.costModifiers.launchShips *= 0.75;
                cryoShipManager.profitRate *= 2;
            }

        },
    ]
} 

function randomConsoleNews() {
    let stringArray = [
        "In a moment of success, Amazing Stores Limited busts unionizing workers.", 
        "Private vehicle deaths rise to 30 million deaths annually. Vehicle manufacturing companies call this 'the price of freedom.'",
        "China announces cure for genetic diseases using miracle treatment but what is the cost?",
        "President of the NUSA ends final public service, calling it 'a step toward increased profit.' economists applaud the move.",
        "Settlers in Antarctica grow the first crops on the continent. A world first!",
        "NUSA, the world's largest polluter, sanctions Canada and Mexico for not meeting climate goals",
        "The United Nations report that birth rates are well below expectations as the global population surpasses twenty billion.",
        "CEO of major weapons supplier to the Greater Israel conflict shot dead in New York. Politicians denounce the attack.",
        "China takes the top spot for 'Happiest Country in the World' for the 10th year in a row. Why experts should remain skeptical.",
        "Canadian Army deployed domestically to assist in debris cleanup following a successful defense against the U.S.—the fifth in history.",
        "President of France, known for enshrining workers' rights in the constitution found dead at 46.",
        "Immigration from space? Why you should be worried.",
        "Mollajgar, Annoractius, and Chimerine: What we know about these alien species.",
        "Economists claim aliens are 'perfect for low-skill labour.'",
        "Greater Israel asserts sovereignty over Mollukh, dismissing Mollajgar claims of ancestral rights.",
        "NUSA announces immigration program for newly arrived alien refugees.",
        "Cryo Systems United Inc. scraps robots for real Mollajgar hands - efficiency up, complaints irrelevant.",
        "NUSA Congress passes bill allowing corporations to run for office directly. Critics say this 'finally removes the middleman.'",
        "Cryo Systems United unveils 'ethical cryosleep' option - costs 600% more, works the same.",
        "NUSA President declares dissent a form of cyber-terrorism. Public approval up 34% overnight",
        "Interstellar census reveals aliens now outnumber humans in orbit. Politicians promise to 'look into that later'",
        "Oceans officially privatized. Beach access now available via monthly subscription.",
        "Antarctica now home to luxury resorts for the ultra-wealthy. Locals remain penguins.",
        "Cryo Systems United launches 'Friendship Colonies' - alien laborers call them 'mines.'",
    ];

    let randomString = stringArray[Math.floor(Math.random() * stringArray.length)];
    return startString + randomString;
}



function displayUpgrades() {
    const upgrades = cryoShipManager.upgrades;
    upgrades.forEach((upgrade, index) => {
        const upgradeDiv = document.createElement('div');
        
        upgradeDiv.classList.add("upgrade-card");

        const upgradeTitle = document.createElement('p');
        upgradeTitle.innerHTML = `<strong>${upgrade.name}</strong> <p>${upgrade.description}</p> <p class="upgrade-cost">Cost: ${upgrade.cost >= 1e9 ? (upgrade.cost / 1e9).toLocaleString('en') + " B" : upgrade.cost.toLocaleString('en')} USDE</p>`;
        
        const upgradeBtn = document.createElement('button');
        upgradeBtn.textContent = upgrade.purchased ? `Purchased` : `Purchase`;
        upgradeBtn.disabled = upgrade.purchased;

        upgradeBtn.addEventListener("click", () => {
            if (cryoShipManager.resources.totalFunds >= upgrade.cost && !upgrade.purchased) {
                cryoShipManager.resources.totalFunds -= upgrade.cost;
                upgrade.effect();
                upgrade.purchased = true;
                upgradeBtn.textContent = "Purchased";
                upgradeBtn.disabled = true;
                updateAll();
            }

            if (upgrade.purchased) {
                upgradeDiv.classList.add('upgraded');
                upgradeListDiv.removeChild(upgradeDiv);
                upgradeDiv.appendChild(upgradeTitle);
                upgradeDiv.appendChild(upgradeBtn);
                upgradesPurchased.appendChild(upgradeDiv);
            }
        });

        upgradeDiv.appendChild(upgradeTitle);
        upgradeDiv.appendChild(upgradeBtn);
        upgradeListDiv.appendChild(upgradeDiv);

    });
}


function updateCryoShips() {
    cryoShipsOnGroundDisplay.textContent = cryoShipManager.resources.fleetOnGround;
    cryoShipsInOrbit.textContent = cryoShipManager.resources.fleetInOrbit;
}

function updateFreezePower() {
    freezePowerDisplay.textContent = cryoShipManager.freezeAmount;
}

function updateFrozenWorkers() {
    freezeWorkerDisplay.textContent = cryoShipManager.resources.workersFrozen;
}

function updateFunds() {
    if (cryoShipManager.resources.totalFunds >= 1e9) {
        fundsDisplay.textContent = `${(cryoShipManager.resources.totalFunds/1e9).toLocaleString('en')} B, USDE`;
    }
    else {
        fundsDisplay.textContent = `${cryoShipManager.resources.totalFunds.toLocaleString('en')} USDE`;
    }
}

function getTotalCryoShipPods() {
    return cryoShipManager.resources.cryoPodsPerShip * cryoShipManager.resources.fleetOnGround;
}

function getRemainingCryoPods() {
    return getTotalCryoShipPods() - cryoShipManager.resources.workersFrozen;
}

function updateCryoPods() {
    cryoPodsDisplay.textContent = getTotalCryoShipPods();
    cryoPodsPerShip.textContent = cryoShipManager.resources.cryoPodsPerShip;
}

function getProfit() {
    const groundProfit = cryoShipManager.profitRate * cryoShipManager.totalWorkersFrozen * cryoShipManager.resources.fleetOnGround * cryoShipManager.resources.cryoPodsPerShip;
    const orbitalProfit = cryoShipManager.profitRate * cryoShipManager.resources.fleetInOrbit * 0.25; // each orbiting ship gives 25% base
    return groundProfit + orbitalProfit;
}

function profitUpdate() {
    const totalProfit = getProfit();
    cryoShipManager.resources.totalFunds += totalProfit;
    updateAll();
}


function getCost() { 
    const costObject = {
        freezeWorker: (cryoShipManager.freezeAmount <= getRemainingCryoPods() ? cryoShipManager.freezeAmount : getRemainingCryoPods()) * cryoShipManager.costModifiers.freezeWorkers * Math.floor(1e4 * Math.pow(1.05, cryoShipManager.resources.workersFrozen)),
        cryoPods: cryoShipManager.costModifiers.cryoPods * Math.floor(1e4 * Math.pow(1.10, cryoShipManager.resources.cryoPodsPerShip)),
        cryoShips: cryoShipManager.costModifiers.cryoShips * Math.floor(1e6 * Math.pow(1.5, cryoShipManager.resources.fleetOnGround + cryoShipManager.resources.fleetInOrbit)),
        launchCryoShip: [cryoShipManager.costModifiers.launchShips * Math.floor(1e6 * Math.pow(3, (cryoShipManager.resources.fleetInOrbit + 1) )), cryoShipManager.resources.cryoPodsPerShip]
    }
    return costObject;
}

function updateCost() {
    freezeWorkerCostDisplay.textContent = getCost().freezeWorker === 0 ? 'No Cryopods' : getCost().freezeWorker >= 1e9 ? `${(getCost().freezeWorker / 1e9).toLocaleString('en')} B` : getCost().freezeWorker.toLocaleString('en'); 
    cryopodsCostDisplay.textContent = getCost().cryoPods >= 1e9 ? `${(getCost().cryoPods / 1e9).toLocaleString('en')} B` : getCost().cryoPods.toLocaleString('en');
    cryoshipsCostDisplay.textContent = getCost().cryoShips >= 1e9 ? `${(getCost().cryoShips / 1e9).toLocaleString('en')} B` : getCost().cryoShips.toLocaleString('en');
    launchCryoShipCostDisplay.textContent = getCost().launchCryoShip[0] >= 1e9 ? `${(getCost().launchCryoShip[0] / 1e9).toLocaleString('en')} B` : getCost().launchCryoShip[0].toLocaleString('en');
    cryoPodsFilledCostDisplay.textContent = `${cryoShipManager.resources.workersFrozen} / ${getCost().launchCryoShip[1]}`;
}

function updateProfitPerSecDisplay() {
    const profit = getProfit();
    profitPerSecDisplay.textContent = profit > 1e9 ? (profit / 1e9).toLocaleString('en') : profit.toLocaleString('en');
}

function initializeDisplay() {
    locationDisplay.textContent = `${cryoShipManager.location.planet}, ${cryoShipManager.location.solarSystem} - ${cryoShipManager.location.relativeLocation}`;
    companyDisplay.textContent = cryoShipManager.company;
    displayUpgrades();
    updateAll();
}

function addToConsole(message) {
    const newLine = document.createElement("p");
    let startString = ">.... ";
    newLine.textContent = startString + message;
    newLine.classList.add("console-line");
    while (consoleNewsDisplay.firstChild) {
        consoleNewsDisplay.removeChild(consoleNewsDisplay.firstChild);
    }
    consoleNewsDisplay.appendChild(newLine);

    // Scroll to bottom
    consoleNewsDisplay.scrollTo({
        top: consoleNewsDisplay.scrollHeight,
        behavior: "smooth"
    });
}

function updateYear() {
    yearDisplay.textContent = cryoShipManager.year + " CE";
}




function updateAll() {
    updateYear()
    updateCryoShips();
    updateFunds();
    updateFrozenWorkers();
    updateFreezePower()
    updateCryoPods();
    updateProfitPerSecDisplay();
    updateCost();
}


/** Main Button Event Listeners **/
//Freeze worker button click
freezeWorkerBtn.addEventListener('click', () => {
    const actualFreezeAmount = cryoShipManager.freezeAmount <= getRemainingCryoPods() ? cryoShipManager.freezeAmount : getRemainingCryoPods();
    const cost = getCost().freezeWorker;
    if (cryoShipManager.totalWorkersFrozen == 1000 || cryoShipManager.totalWorkersFrozen == 10000 || cryoShipManager.totalWorkersFrozen == 100000) {
        addToConsole(`The number of workers frozen has now reached ${(cryoShipManager.totalWorkersFrozen).toLocaleString('en')}`);
    }

    if (cryoShipManager.resources.totalFunds >= cost && cryoShipManager.resources.workersFrozen < getTotalCryoShipPods()){
        cryoShipManager.resources.workersFrozen += actualFreezeAmount;
        cryoShipManager.totalWorkersFrozen += actualFreezeAmount;
        cryoShipManager.resources.totalFunds -= cost;
        updateAll();
    }


        
});

//CryoShips button click 
cryoShipsBtn.addEventListener('click', () => {
    const cost = getCost().cryoShips;
    if (cryoShipManager.resources.totalFunds >= cost) {
        cryoShipManager.resources.totalFunds -= cost;
        cryoShipManager.resources.fleetOnGround += 1;
        updateAll();
    }
});

//Cryopods button click
cryoPodsBtn.addEventListener('click', () => {
    const cost = getCost().cryoPods;
    if (cryoShipManager.resources.totalFunds >= cost) {
        cryoShipManager.resources.totalFunds -= cost;
        cryoShipManager.resources.cryoPodsPerShip += 1;
        updateAll();
    }
});

//launch button click                                         
launchCryoShipBtn.addEventListener('click', () => {
    const cost = getCost().launchCryoShip[0];

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
        updateAll();
    }
});

/** Function calls **/

//Initializes all display items
initializeDisplay();
//Updates profit and all updatable objects every second
setInterval(profitUpdate, 1000);




