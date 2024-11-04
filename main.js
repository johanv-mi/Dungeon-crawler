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


function goToBlacksmith() {
  console.log('Blacksmith');
  
}

function goToCastle() {
  console.log('Castle');
  
}

function goToTavern() {
  console.log('Tavern');
  
}