let $start = document.querySelector('#start');
let $gameField = document.querySelector('#game-field');
let none = 'none';
let flex = 'flex';
let score = 0;
let arrValues = [
   '',
   '',
   '',
   '',
   '',
   '',
   '',
   '',
   '',
];
// Управление
// let upPressed = false;
// let downPressed = false;
// let leftPressed = false;
// let rightPressed = false;
document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
   // up
   if(e.keyCode == 38) {
      rightPressed = true;
      console.log('up');
      shiftUp();
   }

   // down
   else if(e.keyCode == 40) {
      leftPressed = true;
      console.log('down');
      shiftDown();
   }
   
   // left
   else if(e.keyCode == 37) {
      leftPressed = true;
      console.log('left');
      shiftLeft();
   }
   
   // right
   else if(e.keyCode == 39) {
      leftPressed = true;
      console.log('right');
      shiftRight();
   }
}

$start.addEventListener('click', startGame);

function startGame() {
   display($start, none);
   display($gameField, flex);
   // renderItems();   
   renderFirstItems();
}

function display($el, displayType) {
   $el.style.display = displayType;
}

function renderFirstItems() {
   for (let i = 0; i <= 1;) {
      // let gameItemNumber = getRandom(1, 9);
      // let gameItem = document.querySelector(`.game__item:nth-child(${gameItemNumber})`);
      // if (gameItem.innerHTML === '') {
      //    gameItem.innerHTML = 2;
      //    gameItem.classList.add('game__item--active');
      //    i++;
      // }

      document.querySelector(`.game__item:nth-child(${1})`).innerHTML = 2;
      document.querySelector(`.game__item:nth-child(${1})`).classList.add('game__item--active');

      // document.querySelector(`.game__item:nth-child(${2})`).innerHTML = 2;
      // document.querySelector(`.game__item:nth-child(${2})`).classList.add('game__item--active');

      // document.querySelector(`.game__item:nth-child(${3})`).innerHTML = 2;
      // document.querySelector(`.game__item:nth-child(${3})`).classList.add('game__item--active');

      document.querySelector(`.game__item:nth-child(${4})`).innerHTML = 2;
      document.querySelector(`.game__item:nth-child(${4})`).classList.add('game__item--active');

      // document.querySelector(`.game__item:nth-child(${5})`).innerHTML = 2;
      // document.querySelector(`.game__item:nth-child(${5})`).classList.add('game__item--active');

      // document.querySelector(`.game__item:nth-child(${6})`).innerHTML = 2;
      // document.querySelector(`.game__item:nth-child(${6})`).classList.add('game__item--active');

      document.querySelector(`.game__item:nth-child(${7})`).innerHTML = 2;
      document.querySelector(`.game__item:nth-child(${7})`).classList.add('game__item--active');

      // document.querySelector(`.game__item:nth-child(${8})`).innerHTML = 2;
      // document.querySelector(`.game__item:nth-child(${8})`).classList.add('game__item--active');

      // document.querySelector(`.game__item:nth-child(${9})`).innerHTML = 2;
      // document.querySelector(`.game__item:nth-child(${9})`).classList.add('game__item--active');
      i++;
   }
}

function renderItems() {


   // for (let i = 0; i <= 1;) {
      let gameItemNumber = getRandom(1, 9);
      let gameItem = document.querySelector(`.game__item:nth-child(${gameItemNumber})`);
      if (gameItem.innerHTML === '') {
         gameItem.innerHTML = 2;
         gameItem.classList.add('game__item--active');
         i++;
      }
   // }
}

function shiftUp() {
   for (let i = 9; i >= 7; i--) {
      gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      if (gameItem.innerHTML !== '') {
         let gameItemValue = Number(gameItem.innerHTML);
         arrValues[i - 1] = gameItemValue;
         console.log(`Значение ${i}-й ячейки: `, arrValues[i - 1]);
      }
   }
   for (let i = 6; i>= 4; i--) {
      gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      if (gameItem.innerHTML !== '') {
         let gameItemValue = Number(gameItem.innerHTML);
         arrValues[i - 1] = gameItemValue;
         if (arrValues[i - 1] === arrValues[i - 1 + 3]) {
            arrValues[i - 1 + 3] = '';
            document.querySelector(`.game__item:nth-child(${i + 3})`).innerHTML = '';
            document.querySelector(`.game__item:nth-child(${i + 3})`).classList.remove('game__item--active');
            gameItem.innerHTML = Math.pow(gameItemValue, 2);
            score = gameItem.innerHTML;
            console.log('Score = ', score);
         }
         console.log(`Значение ${i}-й ячейки: `, arrValues[i - 1]);
      }
   }
   for (let i = 3; i>= 1; i--) {
      gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      if (gameItem.innerHTML !== '') {
         let gameItemValue = Number(gameItem.innerHTML);
         arrValues[i - 1] = gameItemValue;
         if ((arrValues[i - 1] === arrValues[i - 1 + 3])) {
            arrValues[i - 1 + 3] = '';
            document.querySelector(`.game__item:nth-child(${i + 3})`).innerHTML = '';
            document.querySelector(`.game__item:nth-child(${i + 3})`).classList.remove('game__item--active');
            gameItem.innerHTML = Math.pow(gameItemValue, 2);
            score = gameItem.innerHTML;
            console.log('Score = ', score);
         }
         if ((arrValues[i - 1] === arrValues[i - 1 + 6])) {
            arrValues[i - 1 + 6] = '';
            document.querySelector(`.game__item:nth-child(${i + 6})`).innerHTML = '';
            document.querySelector(`.game__item:nth-child(${i + 6})`).classList.remove('game__item--active');
            gameItem.innerHTML = Math.pow(gameItemValue, 2);
            score = gameItem.innerHTML;
            console.log('Score = ', score);
         }
         console.log(`Значение ${i}-й ячейки: `, arrValues[i - 1]);
      }
   }
}

function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}