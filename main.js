window.addEventListener('DOMContentLoaded', main);

function main() {
  console.log('Allt redo');
  startButton.onclick = startGame;
}

const inventory = [];

const button1 = document.querySelector('#btn1');
const button2 = document.querySelector('#btn2');
const button3 = document.querySelector('#btn3');

function helloWorld() {
  console.log('Hello World');
}

/**This function removes the buttons and text */
function cleanSlate() {
  btn1.remove();
  btn2.remove();
  btn3.remove();
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

function startGame() {
  const location = document.querySelector('.location');
  location.innerHTML = 'Castle Town';

  const textDiv = document.createElement('div');

  const [button1, button2, button3] = buttonCreator();

  button1.innerHTML = 'Go to blacksmith';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML =
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

  const location = document.querySelector('.location');
  location.innerHTML = 'Castle Town';

  const textDiv = document.createElement('div');

  const [button1, button2, button3] = buttonCreator();

  button1.innerHTML = 'Go to blacksmith';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML =
    'You are currently in the Castle Town. Please feel free to look around.';

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

function goToBlacksmith() {
  console.log('Blacksmith');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerHTML = 'Blacksmith';

  const [button1, button2, button3] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerHTML = 'Go to town';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML =
    'Your are at the blacksmith. Would you like to purchase a weapon?';

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

function goToCastle() {
  console.log('Castle');
  cleanSlate();

  const location = document.querySelector('.location');
  location.innerHTML = 'Castle';

  const [button1, button2, button3] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerHTML = 'Go to town';
  button2.innerHTML = 'Go to throne room';
  button3.innerHTML = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML = 'Welcome to the castle. Go to the throne room!';

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
  location.innerHTML = 'Throne room';

  const [button1, button2, button3] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerHTML = 'Go to town';
  button2.innerHTML = 'Back to Castle';
  button3.innerHTML = 'Go to Tavern';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML =
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
  location.innerHTML = 'Tavern';

  const [button1, button2, button3] = buttonCreator();

  const textDiv = document.createElement('div');

  button1.innerHTML = 'Go to town';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Forest';

  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML =
    'A lady at the bar tells you that she saw the dragon fly off towards the forest';

  const textArea = document.querySelector('.textArea');
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = goToTown;
  button2.onclick = goToCastle;
  button3.onclick = goToForest;
}
