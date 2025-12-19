# Cryostations

Available to view, play, and experiment with at the project page [cryostations-web-game](https://marvoos.github.io/cryostations-web-game/)

## Description

Cryostations is a science-fiction browser-based game primarily built through the utilization of the JavaScript engine. Using dynamic UI, Incremental game loops, and a resource-based progression system. The development of this game has allowed for a better understanding of how to implement creative systems and practical solutions for simple browser games.

Through playing this game, you will be stunned by the creative way in which a very simple text-based game can get across a complex message about the current struggles of society.

## Learning Objectives

This project is designed for practical experience in the following development concepts:

- Linking HTML elements to JavaScript (Querying + updating UI)
- DOM rendering and dynamic content creation
- JavaScript-specific Objects
- Exponential cost scaling and incremental game balancing
- Modular Object-Based game architecture
- Passive income and resource generation systems
- Autosaving via browser storage
- Story progression design

## Newest Features

09/12/2025

- Added improved readme featuring new sections.

10/12/2025

- Added new purchased upgrade section. No more confusion between to-be-purchased and already purchased upgrades.
- Fixed a bug which allowed for the number of frozen workers (_on the ground_) to exceed the number of crypods available.
- Fixed a bug which doubled the cost to freeze workers.
- Improved UI, cost to freeze workers now displays when there are no cryopods left and dynamic costs based on how many cryopods are available

11/12/2025

- Added three new reseach items (Asteroid Capture Program, Propaganda Machine Promotions, Evade Ethics Regulations) and edited the title of "Legal Slavery" into "Sliding into Indentured Servitude".

19/12/2025

- Experimenting with a progression system. Added system stability which lacks functionality at this time.
- Removed 'year' and replaced it with 'date' in the Ship Manager object.
  - To provide a dynamically updating calendar
  - To allow for the possibility of a game statistics screen
- Fixed the randomly updating console which now updates every 100 seconds

## Development Progress

- [X] Add a progression system
  - Added System stability as the progression system. Now need to implement:
    - [ ] A tutorial/explanation of how the game could end
    - [ ] An update function
    - [ ] System stability management upgrades
    - [ ] End screen with provided statistics and analysis
- [ ] Balance cost-to-generation ratio
- [ ] Clean-up UI, animations, and hover effects
