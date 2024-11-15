window.addEventListener('DOMContentLoaded', main);

/**Main function that runs as soon as the DOM is loaded */
function main() {
  console.log('Allt redo');
  startButton.onclick = startGame;
  continueButton.onclick = continueStartScene;
}

/**Global variables */
let inventory = [];
let health = 150;
let goblinHealth = 100;
let dragonHealth = 200;
let gold = 0;

/**This function saves the player stats to localstorage. */
function saveStats(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**This function checks if the stat exists, loads it from localstorage, and updates the UI on the screen. */
function loadStats() {
  const savedHealth = localStorage.getItem('health');
  if (savedHealth) {
    health = JSON.parse(savedHealth);
    document.querySelector('#health').innerText = health;
  }

  const savedGold = localStorage.getItem('gold');
  if (savedGold) {
    gold = JSON.parse(savedGold);
    document.querySelector('#money').innerText = gold;
  }

  const savedInventory = localStorage.getItem('inventory');
  if (savedInventory) {
    inventory = JSON.parse(savedInventory);
    document.querySelector('.inventory').innerText = inventory;
  }

  const savedWeapon = localStorage.getItem('weapon');
  if (savedWeapon) {
    inventory = JSON.parse(savedWeapon);
    document.querySelector('.wpn').innerText = inventory;
  }
}

/**This function resets all stats, clears localstorage, and updates the UI */
function resetStats() {
  let healthCounter = document.querySelector('#health');
  let coin = document.querySelector('#money');
  let weaponWindow = document.querySelector('.wpn');
  let inventoryArea = document.querySelector('.inventory');

  health = 100;
  gold = 0;
  inventory = [];

  healthCounter.innerText = health;
  coin.innerText = gold;
  weaponWindow.innerText = '[]';
  inventoryArea.innerText = inventory;

  localStorage.removeItem('health');
  localStorage.removeItem('gold');
  localStorage.removeItem('weapon');
  localStorage.removeItem('inventory');
}
/** Update function to localstorage for health */
function updateHealth(newHealth) {
  health = newHealth;
  document.querySelector('#health').innerText = health;
  saveStats('health', health);
}
/**Update function to localstorage for gold  */
function updateGold(newGold) {
  gold = newGold;
  document.querySelector('#money').innerText = gold;
  saveStats('gold', gold);
}
/**Update function to localstorage for the inventory  */
function updateInventory(newInventory) {
  inventory = newInventory;
  document.querySelector('.inventory').innerText = inventory;
  saveStats('inventory', inventory);
}

/**Generates a random number between 1 and 9 */
function getRandomNumber() {
  const randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
}

/**This function removes the buttons and text by looping through every button
 * in the array of buttons it recieves from querySelectorAll.
 */
function cleanSlate() {
  let buttons = document.querySelectorAll('button');
  let imageDiv = document.querySelector('#imageDiv');
  let optionButtons = document.querySelector('#optionButtons');

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].remove();
  }
  textDiv.remove();

  if (imageDiv) {
    imageDiv.remove();
  }

  if (optionButtons) {
    optionButtons.remove();
  }
}

/**This function creates a specific number of buttons with different number id's
 * and then puts them in an array.
 */
function getNewButton(numberOfButtons) {
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
  saveStats('weapon', '[SWORD]');
}
/** This function adds an axe to the weapon slot. The axe is
 * slower but more powerful than the sword.
 */
function buyAxe() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[AXE]';
  saveStats('weapon', '[AXE]');
}

/**This function lets you buy a potion if you have at least 30 gold
 * and when used it adds 30 health.
 */
function buyPotion() {
  if (gold >= 30 && inventory.length <= 4) {
    let newInventory = [...inventory, '[P]'];
    let newGold = gold - 30;
    updateInventory(newInventory);
    updateGold(newGold);
  }
}
/** This is the function for fighting goblins. It uses the random number generator
 * to calculate hits and misses.
 */
function fightGoblin() {
  console.log('Fight!');
  let textArea = document.querySelector('.textArea');
  let randomNumber = getRandomNumber();
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
      goblinHealth -= 60;
      textDiv.innerText =
        'Critical hit with your sword! Goblin takes a lot of damage. Goblin health: ' +
        goblinHealth;
    } else if (randomNumber < 8) {
      console.log('Hit');
      goblinHealth -= 25;
      textDiv.innerText =
        'Quick hit with your sword! Goblin health: ' + goblinHealth;
    } else {
      console.log('Miss');
      health -= 10;
      textDiv.innerText = 'Miss! The Goblin counterattacks.';
      healthCounter.innerText = health;
      saveStats('health', health);
    }
  } else if (wpn.innerText == '[AXE]') {
    if (randomNumber < 6) {
      goblinHealth -= 50;
      textDiv.innerText = 'Heavy blow! Goblin health: ' + goblinHealth;
    } else {
      console.log('Miss');
      health -= 10;
      textDiv.innerText = 'Miss! The Goblin counterattacks.';
      healthCounter.innerText = health;
      saveStats('health', health);
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
    saveStats('gold', gold);
  }
}
/** This is the dragon fighting function. It works just like the goblin one
 * but the dragon has more health and stronger attacks.
 */
function fightDragon() {
  console.log('Fight!');
  let textArea = document.querySelector('.textArea');
  let randomNumber = getRandomNumber();
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
      dragonHealth -= 50;
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
      saveStats('health', health);
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
      saveStats('health', health);
    }
  }

  textArea.appendChild(textDiv);
  if (health <= 0) {
    killScreen();
  }

  if (dragonHealth <= 0) {
    winScreen();
    gold += 300;
    let coin = document.querySelector('#money');
    coin.innerText = gold;
    saveStats('gold', gold);
  }
}

/** This is the scene for when you are fighting the goblin,
 * not actually the fighting mechanics.
 */
function goToGoblin() {
  console.log('Battle with goblin');
  cleanSlate();

  const imageDiv = document.createElement('div');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/goblin.jpg'>";

  const location = document.querySelector('.location');
  location.innerText = 'Battle with goblin';

  const buttonArray = getNewButton(3);

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
  const imageArea = document.querySelector('.imageArea');

  imageArea.appendChild(imageDiv);
  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerHTML = 'You encounter a goblin in the deep forest';

  button1.onclick = fightGoblin;
  button2.onclick = usePotion;
  button3.onclick = goToForest;
}
/** This is the scene for when you are fighting the dragon,
 * not actually the fighting mechanics.
 */
function goToDragon() {
  console.log('Battle with Dragon');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = 'Battle with dragon';

  const buttonArray = getNewButton(3);

  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Fight';
  button2.innerText = 'Use potion';
  button3.innerText = 'Run';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  textDiv.setAttribute('id', 'textDiv');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/dragon.jpg'>";

  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerHTML =
    'You found the giant dragon that abducted the king. Kill it and save the king!';

  button1.onclick = fightDragon;
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

  const buttonArray = getNewButton(2);
  const imageDiv = document.createElement('div');

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = 'Keep going deeper';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/goblinkillscreen.jpg'>";
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
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

  const buttonArray = getNewButton(2);
  const imageDiv = document.createElement('div');

  const button1 = buttonArray[0];

  button1.innerText = 'Start over';

  let coin = document.querySelector('#money');
  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  textDiv.setAttribute('id', 'textDiv');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/killscreen.jpg'>";

  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
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

  const buttonArray = getNewButton(2);
  const imageDiv = document.createElement('div');

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = "Go to dragon's lair";

  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/dragonchecker.jpg'>";
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'You need at least THREE potions to defeat the dragon. The tavern sells them for 30 gold each.\n If you are low on gold, try getting some off a goblin in the deep forest!';
  textArea.appendChild(textDiv);

  const buttonArea = document.querySelector('.buttonArea');

  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  button1.onclick = goToForest;
  button2.onclick = dragonChecker;
}
/** This function checks if the player has
 * enough potions to fight the dragon.
 */
function dragonChecker() {
  if (inventory.length > 2) {
    goToDragon();
  } else {
    dragonInfo();
  }
}
/** End of the game scene. The dragon has been slayed
 * and all the stats are reset.
 */
function winScreen() {
  console.log('Win!');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = 'Back at the Castle';

  const buttonArray = getNewButton(1);
  const imageDiv = document.createElement('div');
  imageDiv.setAttribute('id', 'imageDiv');

  const button1 = buttonArray[0];

  button1.innerText = 'Start over';
  imageDiv.innerHTML = "<img src= 'assets/dragonkillscreen.jpg'>";

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'A winner is you!! \n You killed the dragon and saved the king.\n Good job and thank you for playing!';

  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  textArea.appendChild(textDiv);

  button1.onclick = goToTown;
}

/** This function pops a potion form the inventory and adds 30 health. */
function usePotion() {
  if (inventory.length >= 1) {
    const newHealth = health + 30;
    const newInventory = [...inventory];
    newInventory.pop();
    updateHealth(newHealth);
    updateInventory(newInventory);
  }
}

/**Random encounter feature that decides of you'll fight a goblin */
function getRandomEncounter() {
  const encounter = getRandomNumber();
  if (encounter > 5) {
    goToGoblin();
  } else goToDeepForest();
}
/** By using a random number and a switch statement you get
 * one of six texts to make it less boring walking through the
 * deep forest waiting for a random encounter.
 */
function getDeepForestText() {
  let counter = getRandomNumber();
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
/** This scene starts the game fresh with reset stats. */
function startGame() {
  startButton.remove();
  continueButton.remove();
  coverImage.remove();
  resetStats();
  const location = document.querySelector('.location');
  location.innerText = '- Castle Town -';
  const textDiv = document.createElement('div');
  const imageDiv = document.createElement('div');
  const buttonArray = getNewButton(3);

  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to blacksmith';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/castletown.jpg'>";
  textDiv.innerText =
    'Welcome to the game. You are currently in the Castle Town. Please feel free to look around.';

  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToBlacksmith;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}
/**This is the first scene if you start over with the saved stats. */
function continueStartScene() {
  console.log('Castle Town');
  loadStats();
  startButton.remove();
  continueButton.remove();
  coverImage.remove();
  const buttonArray = getNewButton(3);
  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to blacksmith';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';

  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/castletown.jpg'>";

  const buttonArea = document.querySelector('.buttonArea');
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  const location = document.querySelector('.location');
  location.innerText = '- Castle Town -';

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'You are currently in the Castle Town. Please feel free to look around.';

  imageArea.appendChild(imageDiv);
  textArea.appendChild(textDiv);

  button1.onclick = goToBlacksmith;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function goToTown() {
  console.log('Castle Town');
  cleanSlate();
  const buttonArray = getNewButton(3);
  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to blacksmith';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';

  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/castletown.jpg'>";

  const buttonArea = document.querySelector('.buttonArea');

  const location = document.querySelector('.location');
  location.innerText = '- Castle Town -';

  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'You are currently in the Castle Town. Please feel free to look around.';

  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToBlacksmith;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function goToBlacksmith() {
  console.log('Blacksmith');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = '- Blacksmith -';

  const buttonArray = getNewButton(5);
  const imageDiv = document.createElement('div');
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
  const optionButtons = document.createElement('div');
  const buttonArea = document.querySelector('.buttonArea');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  textDiv.setAttribute('id', 'textDiv');
  optionButtons.setAttribute('id', 'optionButtons');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/blacksmith.jpg'>";

  textArea.appendChild(textDiv);
  textArea.appendChild(optionButtons);
  optionButtons.appendChild(button4);
  optionButtons.appendChild(button5);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerText =
    'Welcome to the blacksmith. Since there has been goblin sightings you can have a weapon for free. The sword is more accurate but not as strong as the axe. ';

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

  const buttonArray = getNewButton(3);

  const textDiv = document.createElement('div');
  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to throne room';
  button3.innerText = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');
  const buttonArea = document.querySelector('.buttonArea');
  const imageArea = document.querySelector('.imageArea');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/castlehall.jpg'>";

  const textArea = document.querySelector('.textArea');
  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToTown;
  button2.onclick = goToThroneRoom;
  button3.onclick = goToTavern;

  textDiv.innerText =
    'Welcome to the castle. The mighty halls are empty but you hear a sound coming from the throne room!';
}

function goToThroneRoom() {
  console.log('Throne Room');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Throne room -';

  const buttonArray = getNewButton(3);

  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go to town';
  button2.innerText = 'Back to Castle';
  button3.innerText = 'Go to Tavern';

  const buttonArea = document.querySelector('.buttonArea');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/throneroom.jpg'>";
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  textDiv.setAttribute('id', 'textDiv');

  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerText =
    'A guard comes up to you and tells you that the king has been abducted by a giant dragon. He asks you to please help them save the King. Maybe somebody at the tavern knows more.';

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

  const buttonArray = getNewButton(4);

  const imageDiv = document.createElement('div');
  const optionButtons = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];
  const button4 = buttonArray[3];

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Forest';
  button4.innerText = 'Buy a potion';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');
  textDiv.setAttribute('id', 'textDiv');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/tavern.jpg'>";

  textArea.appendChild(textDiv);
  textArea.appendChild(optionButtons);
  optionButtons.appendChild(button4);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerText =
    'A patron tells you that she saw the dragon fly off towards the mountain.\nIn the back of the Tavern is a door that leads to the forest.\n Be careful though, maybe bring one of these potions for 30 gold!';

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToForest;
  button4.onclick = buyPotion;
}

function goToForest() {
  console.log('Forest');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Forest -';

  const buttonArray = getNewButton(3);

  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];
  const button3 = buttonArray[2];

  button1.innerText = 'Go back to town';
  button2.innerText = 'Deeper into the forest';
  button3.innerText = 'To the mountain';

  const buttonArea = document.querySelector('.buttonArea');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/forest.jpg'>";
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  textDiv.setAttribute('id', 'textDiv');

  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  textDiv.innerText =
    'In the forest there are two paths. One leads deeper into the forest and one leads to the mountain. In the deep forest there are random encounters with gold carrying goblins so you need a weapon if you want to go that way. If you do not immediately come upon a goblin, just keep going deeper. They are out there.';

  textArea.appendChild(textDiv);

  button1.onclick = goToTown;
  button2.onclick = getRandomEncounter;
  button3.onclick = goToMountain;
}

function goToDeepForest() {
  console.log('Deep Forest');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Deep Forest -';
  let deepForestText = getDeepForestText();
  const buttonArray = getNewButton(2);

  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = 'Go even deeper';

  const buttonArea = document.querySelector('.buttonArea');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/deepforest.jpg'>";
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText = deepForestText;

  textArea.appendChild(textDiv);

  button1.onclick = goToForest;
  button2.onclick = getRandomEncounter;
}

function goToMountain() {
  console.log('Mountain');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = '- Mountain -';

  const buttonArray = getNewButton(2);

  const imageDiv = document.createElement('div');
  const button1 = buttonArray[0];
  const button2 = buttonArray[1];

  button1.innerText = 'Go back to forest';
  button2.innerText = "Go to dragon's lair";

  const buttonArea = document.querySelector('.buttonArea');
  imageDiv.setAttribute('id', 'imageDiv');
  imageDiv.innerHTML = "<img src= 'assets/mountain.jpg'>";
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  const imageArea = document.querySelector('.imageArea');

  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  imageArea.appendChild(imageDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);

  textDiv.innerText =
    'The view is great from here! \n There is a sign by the road that reads:\n Caution. Dragon ahead. Bring potions';

  button1.onclick = goToForest;
  button2.onclick = dragonChecker;
}
