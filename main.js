window.addEventListener('DOMContentLoaded', main);

function main() {
  console.log('Allt redo');
  console.log(newButtonCreator(6));
  startButton.onclick = startGame;
}

inventory = [];
let health;
let goblinHealth = 150;
let dragonHealth = 300;
let gold = 0;

function helloWorld() {
  console.log('Hello World');
}

/**Generates a random number between 1 and 9 */
function randomNumberGenerator() {
  const randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
}

/**This function removes the buttons and text by looping through every button
 * in the array of buttons it recieves from querySelectorAll.
 */
function cleanSlate() {
  let buttons = document.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].remove();
  }
  textDiv.remove();
}

/**Resets the stats. */
function resetStats() {
  let healthCounter = document.querySelector('#health');
  let coin = document.querySelector('#money');
  let weaponWindow = document.querySelector('.wpn');
  let inventoryArea = document.querySelector('.inventory');

  health = 100;
  gold = 0;
  inventory = [];

  healthCounter.innerText = health;
  weaponWindow.innerText = '[]';
  coin.innerText = gold;
  inventoryArea.innerText = inventory;
}

/**This function creates a specific number of buttons with different number id's
 * and then puts them in an array.
 */
function newButtonCreator(numberOfButtons) {
  const newButtons = [];

  for (let i = 0; i < numberOfButtons; i++) {
    const button = document.createElement('button');
    button.setAttribute('class', 'button');
    button.setAttribute('id', 'button' + i);
    newButtons.push(button);
  }
  return newButtons;
}
/** This function adds a sword to the weapon slot. The sword is
 * quicker but weaker than the axe.
 */
function buySword() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[SWORD]';
}
/** This function adds an axe to the weapon slot. The axe is
 * slower but more powerful than the sword.
 */
function buyAxe() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[AXE]';
}

function buyBeer() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[BEER]';
}
/**This function lets you buy a potion if you have at least 30 gold
 * and when used it adds 30 health.
 */
function buyPotion() {
  let coin = document.querySelector('#money');
  let inventoryArea = document.querySelector('.inventory');

  if (gold >= 30) {
    inventory.push('[P]');
    gold -= 30;
    coin.innerText = gold;
    inventoryArea.innerText = inventory;
  }
}
/** This is the function for fighting goblins. It uses the random number generator
 * to calculate hits and misses.
 */
function useWeapon() {
  console.log('Fight!');
  let textArea = document.querySelector('.textArea');
  let randomNumber = randomNumberGenerator();
  let wpn = document.querySelector('.wpn');
  let healthCounter = document.querySelector('#health');
  let oldTextDiv = document.getElementById('textDiv');
  let coin = document.querySelector('#money');

  if (oldTextDiv) {
    oldTextDiv.remove();
  }

  const textDiv = document.createElement('div');
  textDiv.setAttribute('id', 'textDiv');

  if (wpn.innerText == '[SWORD]') {
    if (randomNumber == 1) {
      console.log(' Crit Hit');
      goblinHealth -= 40;
      textDiv.innerText =
        'Critical hit with your sword! Goblin takes a lot of damage. Goblin health: ' +
        goblinHealth;
    } else if (randomNumber < 8) {
      console.log('Hit');
      goblinHealth -= 20;
      textDiv.innerText =
        'Quick hit with your sword! Goblin health: ' + goblinHealth;
    } else {
      console.log('Miss');
      health -= 20;
      textDiv.innerText = 'Miss! The Goblin counterattacks.';
      healthCounter.innerText = health;
    }
  } else if (wpn.innerText == '[AXE]') {
    if (randomNumber < 6) {
      goblinHealth -= 45;
      textDiv.innerText = 'Heavy blow! Goblin health: ' + goblinHealth;
    } else {
      console.log('Miss');
      health -= 20;
      textDiv.innerText = 'Miss! The Goblin counterattacks.';
      healthCounter.innerText = health;
    }
  }

  textArea.appendChild(textDiv);
  if (health <= 0) {
    killScreen();
  }

  if (goblinHealth <= 0) {
    goblinKillScreen();
    gold += 30;
    coin.innerText = gold;
  }
}
/** This is the dragon fighting function. It works just like the goblin one
 * but the dragon has more health and stronger attacks.
 */
function useWeaponTwo() {
  console.log('Fight!');
  let textArea = document.querySelector('.textArea');
  let randomNumber = randomNumberGenerator();
  let wpn = document.querySelector('.wpn');
  let healthCounter = document.querySelector('#health');
  let oldTextDiv = document.getElementById('textDiv');

  if (oldTextDiv) {
    oldTextDiv.remove();
  }

  const textDiv = document.createElement('div');
  textDiv.setAttribute('id', 'textDiv');

  if (wpn.innerText == '[SWORD]') {
    if (randomNumber == 1) {
      console.log(' Crit Hit');
      dragonHealth -= 40;
      textDiv.innerText =
        'Critical hit with your sword! Dragon takes a lot of damage. Dragon health: ' +
        dragonHealth;
    } else if (randomNumber < 8) {
      console.log('Hit');
      dragonHealth -= 20;
      textDiv.innerText =
        'Quick hit with your sword! Dragon health: ' + dragonHealth;
    } else {
      console.log('Miss');
      health -= 30;
      textDiv.innerText = 'Miss! The Dragon counterattacks.';
      healthCounter.innerText = health;
    }
  } else if (wpn.innerText == '[AXE]') {
    if (randomNumber < 6) {
      dragonHealth -= 45;
      textDiv.innerText = 'Heavy blow! Dragon health: ' + dragonHealth;
    } else {
      console.log('Miss');
      health -= 30;
      textDiv.innerText = 'Miss! The Dragon counterattacks.';
      healthCounter.innerText = health;
    }
  }

  textArea.appendChild(textDiv);
  if (health <= 0) {
    killScreen();
  }

  if (dragonHealth <= 0) {
    dragonKillScreen();
    gold += 300;
    let coin = document.querySelector('#money');
    coin.innerText = gold;
  }
}
/** This function pops a potion form the inventory and adds 30 health. */
function usePotion() {
  let inventoryArea = document.querySelector('.inventory');
  let healthCounter = document.querySelector('#health');

  if (inventory.length >= 1) {
    health += 30;
    inventory.pop();
  }
  healthCounter.innerText = health;
  inventoryArea.innerText = inventory;
}

/**Random encounter feature that decides of you'll fight a goblin */
function randomEncounter() {
  const encounter = randomNumberGenerator();
  if (encounter > 5) {
    fightGoblin();
  } else goToDeepForest();
}
/** By using a random number and a switch statement you get
 * one of six texts to make it less boring walking through the
 * deep forest waiting for a random encounter.
 */
function getDeepForestText() {
  let counter = randomNumberGenerator();
  let deepForestText;

  switch (counter) {
    case 1:
      deepForestText = '"Wow, it sure is dark in this forest."';
      break;
    case 2:
      deepForestText =
        '"I wonder if I will run in to any goblins in this forest?"';
      break;
    case 3:
      deepForestText =
        '"If I find some gold I can buy potions and go fight the dragon."';
      break;
    case 4:
      deepForestText =
        'The forest is dark and mysterious and you feel like someone or something is watching you';
      break;
    case 5:
      deepForestText =
        'If you get low on health from fighting monsters you can buy potions to replenish 30 health at the Tavern.';
      break;
    default:
      deepForestText = 'You keep walking through the deep, dense forest.';
  }

  return deepForestText;
}

function startGame() {
  startButton.remove();
  continueButton.remove();
  const location = document.querySelector('.location');
  location.innerText = '- Castle Town -';
  const textDiv = document.createElement('div');

  health = 100;
  let healthCounter = document.querySelector('#health');

  const [button1, button2, button3] = buttonCreator();

  button1.innerText = 'Go to blacksmith';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'Welcome to the game. You are currently in the Castle Town. Please feel free to look around.';

  const textArea = document.querySelector('.textArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToBlacksmith;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function continueStartScene() {
  console.log('Castle Town');
  startButton.remove();
  continueButton.remove();
  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to blacksmith';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  const location = document.querySelector('.location');
  location.innerText = '- Castle Town -';

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'You are currently in the Castle Town. Please feel free to look around.';

  textArea.appendChild(textDiv);

  button1.onclick = goToBlacksmith;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function goToTown() {
  console.log('Castle Town');
  cleanSlate();
  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to blacksmith';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  const location = document.querySelector('.location');
  location.innerText = '- Castle Town -';

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'You are currently in the Castle Town. Please feel free to look around.';

  textArea.appendChild(textDiv);

  button1.onclick = goToBlacksmith;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function goToBlacksmith() {
  console.log('Blacksmith');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = '- Blacksmith -';

  const buttonArray = newButtonCreator(5);
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];
  const button4 = buttonArray[3];
  const button5 = buttonArray[4];

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';
  button4.innerText = 'Buy sword';
  button5.innerText = 'Buy axe';

  const textDiv = document.createElement('div');
  const buttonArea = document.querySelector('.buttonArea');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  textArea.appendChild(button4);
  textArea.appendChild(button5);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerText =
    'Your are at the blacksmith. Would you like to purchase a weapon?';

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
  button4.onclick = buySword;
  button5.onclick = buyAxe;
}

function goToCastle() {
  console.log('Castle');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = '- Castle -';

  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to throne room';
  button3.innerText = 'Go to Tavern';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToTown;
  button2.onclick = goToThroneRoom;
  button3.onclick = goToTavern;

  const textDiv = document.createElement('div');
  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText = 'Welcome to the castle. Go to the throne room!';

  const textArea = document.querySelector('.textArea');
  textArea.appendChild(textDiv);
}

function goToThroneRoom() {
  console.log('Throne Room');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Throne room -';

  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to town';
  button2.innerText = 'Back to Castle';
  button3.innerText = 'Go to Tavern';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'A guard comes up to you and tells you that the king has been abducted by a giant dragon. He asks you to please help them save the King';

  textArea.appendChild(textDiv);

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function goToTavern() {
  console.log('Tavern');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = 'Tavern';

  const buttonArray = newButtonCreator(5);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];
  const button4 = buttonArray[3];
  const button5 = buttonArray[4];

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Forest';
  button4.innerText = 'Buy a potion';
  button5.innerText = 'Buy a beer';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  textArea.appendChild(button4);
  textArea.appendChild(button5);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerText =
    'A lady at the bar tells you that she saw the dragon fly off towards the forest.\nIn the back of the Tavern is a door that leads to the forest path.\n Be careful though!';

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToForest;
  button4.onclick = buyPotion;
  button5.onclick = buyBeer;
}

function goToForest() {
  console.log('Forest');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Forest -';

  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go back to town';
  button2.innerText = 'Deeper into the forest';
  button3.innerText = 'To the mountain';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'In the forest there are two diverging paths. One leads deeper into the forest and one leads to the mountain. In the deep forest there are goblins so you should get your weapon ready if you want to go that way. ';

  textArea.appendChild(textDiv);

  button1.onclick = goToTown;
  button2.onclick = randomEncounter;
  button3.onclick = goToMountain;
}

function goToDeepForest() {
  console.log('Deep Forest');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Deep Forest -';
  let deepForestText = getDeepForestText();
  const buttonArray = newButtonCreator(2);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = 'Go even deeper';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText = deepForestText;

  textArea.appendChild(textDiv);

  button1.onclick = goToForest;
  button2.onclick = randomEncounter;
}

function goToMountain() {
  console.log('Mountain');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Mountain -';

  const buttonArray = newButtonCreator(2);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = "Go to dragon's lair";

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'The view is great from here! \n There is a sign by the road that reads:\n Caution. Dragon ahead. Bring potions';

  textArea.appendChild(textDiv);

  button1.onclick = goToForest;
  button2.onclick = dragonChecker;
}
/** This is the scene for when you are fighting the goblin,
 * not actually the fighting mechanics.
 */
function fightGoblin() {
  console.log('Battle with goblin');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = 'Battle with goblin';

  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Fight';
  button2.innerText = 'Use potion';
  button3.innerText = 'Run';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerHTML = 'You encounter a goblin in the deep forest';

  button1.onclick = useWeapon;
  button2.onclick = usePotion;
  button3.onclick = goToForest;
}
/** This is the scene for when you are fighting the dragon,
 * not actually the fighting mechanics.
 */
function fightDragon() {
  console.log('Battle with Dragon');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = 'Battle with dragon';

  const buttonArray = newButtonCreator(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Fight';
  button2.innerText = 'Use potion';
  button3.innerText = 'Run';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerHTML =
    'You found the giant dragon that abducted the king. Kill it and save the king!';

  button1.onclick = useWeaponTwo;
  button2.onclick = usePotion;
  button3.onclick = goToMountain;
}
/** This is the scene for when the goblin has been killed.
 * It resets the goblin health counter for the next fight.
 */
function goblinKillScreen() {
  console.log('Killed goblin');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = 'You slayed the goblin!';

  const buttonArray = newButtonCreator(2);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = 'Keep going deeper';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  textDiv.innerText =
    'The goblin dropped 30 pieces of gold. You put the gold in your pouch';

  button1.onclick = goToForest;
  button2.onclick = goToDeepForest;

  goblinHealth = 150;
}
/** This is the function for when the player dies.
 * It resets the gold counter to zero and then plops you
 * down in the castle town again.
 */
function killScreen() {
  console.log('Wasted');
  cleanSlate();
  gold = 0;
  const location = document.querySelector('.location');
  location.innerText = 'Wasted';

  const buttonArray = newButtonCreator(2);

  const button1 = buttonArray[0];

  button1.innerText = 'Start over';

  let coin = document.querySelector('#money');
  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);

  textDiv.innerText =
    'You have unfortunately been killed and your gold was stolen.';
  coin.innerText = gold;

  button1.onclick = goToTown;
  resetStats();
}
/**This is the scene that sets up the fight with the dragon
 * and explains the required amount of potions needed to
 * actually engage in the fight.
 */
function dragonInfo() {
  console.log('Dragon checker');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Mountain -';

  const buttonArray = newButtonCreator(2);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = "Go to dragon's lair";

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'You need at least THREE potions to defeat the dragon. The tavern sells them';
  textArea.appendChild(textDiv);

  button1.onclick = goToForest;
  button2.onclick = dragonChecker;
}
/** This function checks if the player has
 * enough potions to fight the dragon.
 */
function dragonChecker() {
  if (inventory.length > 2) {
    fightDragon();
  } else {
    dragonInfo();
  }
}
/** End of the game scene. The dragon has been slayed
 * and all the stats are reset.
 */
function dragonKillScreen() {
  console.log('Win!');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = 'Castle';

  const buttonArray = newButtonCreator(1);

  const button1 = buttonArray[0];

  button1.innerText = 'Start over';

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'A winner is you!! \n You killed the dragon and saved the king.\n Good job and thank you for playing';

  textArea.appendChild(textDiv);

  button1.onclick = goToTown();
  resetStats();
}
