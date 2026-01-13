export let cryoShipManager = {
    date: "",
    company: "Cryo Systems United Incorporated",
    location: {
        solarSystem: "Sol",
        planet: "Earth",
        relativeLocation: "CryoCentre, Dallas Texas"
    },
    stability: 1.0,
    
    resources: 
    {
        totalFunds: 1e4,
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
            description: "Allows workers to provide services while in cryosleep. Their wages are automatically redirected to corporate accounts.",
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
                cryoShipManager.profitRate *= 1.5;
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