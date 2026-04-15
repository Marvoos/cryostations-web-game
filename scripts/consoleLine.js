const consoleNewsDisplay = document.getElementById("console");

// A helper function that includes an array of news headlines to choose a random headline from. Used in the function addRandomHeadlineToConsole()
// @returns {string} A random string from the stringArray
export function randomConsoleNews() {
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
        "Cryo Systems United launches 'Friendship Colonies' - alien labourers call them 'mines.'",
        "Student from MIT receives Nobel Peace prize for developing advanced new weapons system - 'This will help to further NUSA intervention across the planet'",
        "The average worker now hoarding thousands of dollars in assets for longer than intended - Economists warn how this could effect the economy.",
        "University students across the country are demanding a more equitable institution - Donors are furious",
        "Essentials needed for human survival more expensive than luxury products for 755th year in a row.",
        "NUSA universities now encouraged to cut budget for humanities programs by up to 98%. NUSA Secretary of education explains 'This is the next generation of corporate workers, we should treat them as such.'",
    ];

    let randomString = stringArray[Math.floor(Math.random() * stringArray.length)];
    return randomString;
}

// A helper function to allow a string to be printed to the onscreen 'console'.
// Used in addRandomHeadlineToConsole()
// Used in freezeWorkersBtn 'click' event listener for achievment purposes
// @param {string} message The string to add to the 'console'
export function addToConsole(message) {
    const newLine = document.createElement("p");
    let startString = "> ... ";
    newLine.textContent = startString + message;
    newLine.classList.add("console-line");
    consoleNewsDisplay.childNodes.forEach((line, index) => {
        if (consoleNewsDisplay.childNodes.length > 4) {
            consoleNewsDisplay.removeChild(consoleNewsDisplay.firstChild);
        }
    })
    consoleNewsDisplay.appendChild(newLine);

    // Scroll to bottom
    consoleNewsDisplay.scrollTo({
        top: consoleNewsDisplay.scrollHeight,
        behavior: "smooth"
    });
}

export function addRandomHeadlineToConsole() {
    const newRandomHeadline = randomConsoleNews();
    addToConsole(newRandomHeadline);
}
