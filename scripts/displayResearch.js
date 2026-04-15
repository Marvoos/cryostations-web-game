import { cryoShipManager } from "./cryoShipManager.js";
import { normalizeCostFunds } from "./profitsCosts.js"

const upgradeListDiv = document.getElementById("upgrade-list");
const upgradesPurchased = document.getElementById("upgrades-purchased");
// Used to display every upgrade listed in the cryoShipManager.
// Used in initializeDisplay()
export function displayUpgrades() {
    const upgrades = cryoShipManager.upgrades;
    upgrades.forEach((upgrade, index) => {
        const upgradeDiv = document.createElement('div');
        
        upgradeDiv.classList.add("upgrade-card");

        const upgradeTitle = document.createElement('p');
        upgradeTitle.innerHTML = `<strong>${upgrade.name}</strong> <p>${upgrade.description}</p> <p class="upgrade-cost">Cost: ${normalizeCostFunds(upgrade.cost)}</p>`;
        
        const upgradeBtn = document.createElement('button');
        upgradeBtn.textContent = upgrade.purchased ? `Purchased` : `Purchase`;
        upgradeBtn.className = "button-outline";
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
