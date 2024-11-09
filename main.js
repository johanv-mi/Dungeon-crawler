window.addEventListener('DOMContentLoaded', main);

function main() {
  console.log('Allt redo');
  console.log(newButtonCreator(6));
  startButton.onclick = startGame;
}

const inventory = [];
let health = 100;
let goblinHealth = 250;
const dragonHealth = 500;
const gold = 0;

function helloWorld() {
  console.log('Hello World');
}

/**Generates a random number between 1 and 9 */
function randomNumberGenerator() {
  const randomNumber = Math.floor(Math.random() * 10);
  return randomNumber;
}

function inventoryTracker() {}
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

/**This function creates three buttons and sets class and id for each */
function buttonCreator() {
  const button1 = document.createElement('button');
  const button2 = document.createElement('button');
  const button3 = document.createElement('button');

  button1.setAttribute('class', 'button');
  button2.setAttribute('class', 'button');
  button3.setAttribute('class', 'button');
  button1.setAttribute('id', 'btn1');
  button2.setAttribute('id', 'btn2');
  button3.setAttribute('id', 'btn3');

  return [button1, button2, button3];
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

function buySword() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[SWORD]';
}

function buyAxe() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[AXE]';
}

function useWeapon() {
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
  }
}

function usePotion() {
  health += 30;
}

function buyBeer() {
  const weaponWindow = document.querySelector('.wpn');
  weaponWindow.innerText = '[BEER]';
}

function randomEncounter() {
  const encounter = randomNumberGenerator();
  if (encounter > 5) {
    fightGoblin();
  } else goToDeepForest();
}

function startGame() {
  const location = document.querySelector('.location');
  location.innerText = 'Castle Town';

  const textDiv = document.createElement('div');

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

  startButton.remove();
}

function goToTown() {
  console.log('Castle Town');
  cleanSlate();
  let healthCounter = document.querySelector('#health');
  health = 100;
  healthCounter.innerText = health;
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
  location.innerText = 'Castle Town';

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
  location.innerText = 'Blacksmith';

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
  location.innerText = 'Castle';

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
  location.innerText = 'Throne room';

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
  location.innerText = 'Forest';

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
  location.innerText = 'Deep Forest';

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

  textDiv.innerText = 'It is really dark in here';

  textArea.appendChild(textDiv);

  button1.onclick = goToForest;
  button2.onclick = randomEncounter;
}

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

  textDiv.innerText = 'You encounter a goblin in the deep forest';

  button1.onclick = goToForest;
  button2.onclick = goToDeepForest;

  goblinHealth = 250;
}

function killScreen() {
  console.log('Wasted');
  cleanSlate();
  let healthCounter = document.querySelector('#health');
  const location = document.querySelector('.location');
  location.innerText = 'Wasted';

  const buttonArray = newButtonCreator(2);

  const button1 = buttonArray[0];

  button1.innerText = 'Start over';

  const buttonArea = document.querySelector('.buttonArea');
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textDiv.setAttribute('id', 'textDiv');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);

  textDiv.innerText = 'You have unfortunately been killed';

  button1.onclick = goToTown;
}
