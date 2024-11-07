window.addEventListener('DOMContentLoaded', main);

function main() {
  console.log('Allt redo');
  console.log(newButtonCreator(6));
  startButton.onclick = startGame;
}

const inventory = [];
const health = 100;

function helloWorld() {
  console.log('Hello World');
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

function buyBeer() {
  console.log('Beer');
  textDiv.remove();
  const textDiv = document.createElement('div');
  const textArea = document.querySelector('.textArea');
  textArea.appendChild(textDiv);
  textDiv.innerText = 'You feel extremely ready to fight a dragon.';
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

  const [button1, button2, button3] = buttonCreator();
  const [button4, button5] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Tavern';
  button4.innerText = 'Buy sword';
  button5.innerText = 'Buy axe';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'Your are at the blacksmith. Would you like to purchase a weapon?';

  const textArea = document.querySelector('.textArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  textArea.appendChild(button4);
  textArea.appendChild(button5);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

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

  const [button1, button2, button3] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to throne room';
  button3.innerText = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText = 'Welcome to the castle. Go to the throne room!';

  const textArea = document.querySelector('.textArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToTown;
  button2.onclick = goToThroneRoom;
  button3.onclick = goToTavern;
}

function goToThroneRoom() {
  console.log('Throne Room');
  cleanSlate();
  const location = document.querySelector('.location');
  location.innerText = 'Throne room';

  const [button1, button2, button3] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerText = 'Go to town';
  button2.innerText = 'Back to Castle';
  button3.innerText = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'A guard comes up to you and tells you that the king has been abducted by a giant dragon. He asks you to please help them save the King';

  const textArea = document.querySelector('.textArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
}

function goToTavern() {
  console.log('Tavern');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerText = 'Tavern';

  const [button1, button2, button3] = buttonCreator();
  const [button4, button5] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerText = 'Go to town';
  button2.innerText = 'Go to Castle';
  button3.innerText = 'Go to Forest';
  button4.innerText = 'Buy a potion';
  button5.innerText = 'Buy a beer';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerText =
    'A lady at the bar tells you that she saw the dragon fly off towards the forest.\nIn the back of the Tavern is a door that leads to the forest path.\n Be careful though!';

  const textArea = document.querySelector('.textArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  textArea.appendChild(button4);
  textArea.appendChild(button5);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToForest;
  button4.onclick = buyPotion;
  button5.onclick = buyBeer;
}
