window.addEventListener('DOMContentLoaded', main);


function main() {
  console.log('Allt redo')
  startButton.onclick = startGame;
  
}


  const button1 = document.querySelector('#btn1');
  const button2 = document.querySelector('#btn2');
  const button3 = document.querySelector('#btn3');
 

function helloWorld() {
  console.log('Hello World');
}

/**This function removes the buttons and text */
function cleanSlate(){
  btn1.remove();
  btn2.remove();
  btn3.remove();
  textDiv.remove();
}

function startGame() {
  
  const textDiv = document.createElement("div");

  const button1 = document.createElement('button')
  const button2 = document.createElement('button')
  const button3 = document.createElement('button')


  button1.innerHTML = 'Go to blacksmith';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Tavern';

  button1.setAttribute('class', 'button');
  button2.setAttribute('class', 'button');
  button3.setAttribute('class', 'button');
  button1.setAttribute('id', 'btn1');
  button2.setAttribute('id', 'btn2');
  button3.setAttribute('id', 'btn3');
  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML = "Welcome to the game. You are currently in the Castle Town. Please feel free to look around.";
  
  const textArea = document.querySelector(".textArea");
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
  console.log('Castle Town')
  cleanSlate();
  const textDiv = document.createElement("div");

  const button1 = document.createElement('button')
  const button2 = document.createElement('button')
  const button3 = document.createElement('button')


  button1.innerHTML = 'Go to blacksmith';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Tavern';

  button1.setAttribute('class', 'button');
  button2.setAttribute('class', 'button');
  button3.setAttribute('class', 'button');
  button1.setAttribute('id', 'btn1');
  button2.setAttribute('id', 'btn2');
  button3.setAttribute('id', 'btn3');
  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML = "You are currently in the Castle Town. Please feel free to look around.";
  
  const textArea = document.querySelector(".textArea");
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

  const textDiv = document.createElement("div");

  const button1 = document.createElement('button')
  const button2 = document.createElement('button')
  const button3 = document.createElement('button')
  

  button1.innerHTML = 'Go to town';
  button2.innerHTML = 'Go to Castle';
  button3.innerHTML = 'Go to Tavern';

  button1.setAttribute('class', 'button');
  button2.setAttribute('class', 'button');
  button3.setAttribute('class', 'button');
  button1.setAttribute('id', 'btn1');
  button2.setAttribute('id', 'btn2');
  button3.setAttribute('id', 'btn3');
  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML = "Your are at the blacksmith. Would you like to purchase a weapon?";
  
  const textArea = document.querySelector(".textArea");
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

  const textDiv = document.createElement("div");

  const button1 = document.createElement('button')
  const button2 = document.createElement('button')
  const button3 = document.createElement('button')
  

  button1.innerHTML = 'Go to town';
  button2.innerHTML = 'See the king';
  button3.innerHTML = 'Go to Tavern';

  button1.setAttribute('class', 'button');
  button2.setAttribute('class', 'button');
  button3.setAttribute('class', 'button');
  button1.setAttribute('id', 'btn1');
  button2.setAttribute('id', 'btn2');
  button3.setAttribute('id', 'btn3');
  textDiv.setAttribute('id', 'textDiv');

  textDiv.innerHTML = "Welcome to the castle. Go see the King!";
  
  const textArea = document.querySelector(".textArea");
  const buttonArea = document.querySelector('.buttonArea');

  textArea.appendChild(textDiv);
  buttonArea.appendChild(button1);
  buttonArea.appendChild(button2);
  buttonArea.appendChild(button3);

  button1.onclick = startGame;
  button2.onclick = goToCastle;
  button3.onclick = goToTavern;
  
}

function goToTavern() {
  console.log('Tavern');
  
}