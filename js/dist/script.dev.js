"use strict";

var $start = document.querySelector('#start');
var $gameField = document.querySelector('#game-field');
var none = 'none';
var flex = 'flex';
var score = 0;
var arrValues = ['', '', '', '', '', '', '', '', '']; // Управление
// let upPressed = false;
// let downPressed = false;
// let leftPressed = false;
// let rightPressed = false;

document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
  // up
  if (e.keyCode == 38) {
    rightPressed = true;
    console.log('up');
    shiftUp();
  } // down
  else if (e.keyCode == 40) {
      leftPressed = true;
      console.log('down');
      shiftDown();
    } // left
    else if (e.keyCode == 37) {
        leftPressed = true;
        console.log('left');
        shiftLeft();
      } // right
      else if (e.keyCode == 39) {
          leftPressed = true;
          console.log('right');
          shiftRight();
        }
}

$start.addEventListener('click', startGame);

function startGame() {
  display($start, none);
  display($gameField, flex); // renderItems();   

  renderFirstItems();
}

function display($el, displayType) {
  $el.style.display = displayType;
}

function renderFirstItems() {
  for (var _i = 0; _i <= 1;) {
    // let gameItemNumber = getRandom(1, 9);
    // let gameItem = document.querySelector(`.game__item:nth-child(${gameItemNumber})`);
    // if (gameItem.innerHTML === '') {
    //    gameItem.innerHTML = 2;
    //    gameItem.classList.add('game__item--active');
    //    i++;
    // }
    document.querySelector(".game__item:nth-child(".concat(1, ")")).innerHTML = 2;
    document.querySelector(".game__item:nth-child(".concat(1, ")")).classList.add('game__item--active'); // document.querySelector(`.game__item:nth-child(${2})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${2})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${3})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${3})`).classList.add('game__item--active');

    document.querySelector(".game__item:nth-child(".concat(4, ")")).innerHTML = 2;
    document.querySelector(".game__item:nth-child(".concat(4, ")")).classList.add('game__item--active'); // document.querySelector(`.game__item:nth-child(${5})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${5})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${6})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${6})`).classList.add('game__item--active');

    document.querySelector(".game__item:nth-child(".concat(7, ")")).innerHTML = 2;
    document.querySelector(".game__item:nth-child(".concat(7, ")")).classList.add('game__item--active'); // document.querySelector(`.game__item:nth-child(${8})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${8})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${9})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${9})`).classList.add('game__item--active');

    _i++;
  }
}

function renderItems() {
  // for (let i = 0; i <= 1;) {
  var gameItemNumber = getRandom(1, 9);
  var gameItem = document.querySelector(".game__item:nth-child(".concat(gameItemNumber, ")"));

  if (gameItem.innerHTML === '') {
    gameItem.innerHTML = 2;
    gameItem.classList.add('game__item--active');
    i++;
  } // }

}

function shiftUp() {
  for (var _i2 = 9; _i2 >= 7; _i2--) {
    gameItem = document.querySelector(".game__item:nth-child(".concat(_i2, ")"));

    if (gameItem.innerHTML !== '') {
      var gameItemValue = Number(gameItem.innerHTML);
      arrValues[_i2 - 1] = gameItemValue;
      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i2, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i2 - 1]);
    }
  }

  for (var _i3 = 6; _i3 >= 4; _i3--) {
    gameItem = document.querySelector(".game__item:nth-child(".concat(_i3, ")"));

    if (gameItem.innerHTML !== '') {
      var _gameItemValue = Number(gameItem.innerHTML);

      arrValues[_i3 - 1] = _gameItemValue;

      if (arrValues[_i3 - 1] === arrValues[_i3 - 1 + 3]) {
        arrValues[_i3 - 1 + 3] = '';
        document.querySelector(".game__item:nth-child(".concat(_i3 + 3, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i3 + 3, ")")).classList.remove('game__item--active');
        gameItem.innerHTML = Math.pow(_gameItemValue, 2);
        score = gameItem.innerHTML;
        console.log('Score = ', score);
      }

      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i3, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i3 - 1]);
    }
  }

  for (var _i4 = 3; _i4 >= 1; _i4--) {
    gameItem = document.querySelector(".game__item:nth-child(".concat(_i4, ")"));

    if (gameItem.innerHTML !== '') {
      var _gameItemValue2 = Number(gameItem.innerHTML);

      arrValues[_i4 - 1] = _gameItemValue2;

      if (arrValues[_i4 - 1] === arrValues[_i4 - 1 + 3]) {
        arrValues[_i4 - 1 + 3] = '';
        document.querySelector(".game__item:nth-child(".concat(_i4 + 3, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i4 + 3, ")")).classList.remove('game__item--active');
        gameItem.innerHTML = Math.pow(_gameItemValue2, 2);
        score = gameItem.innerHTML;
        console.log('Score = ', score);
      }

      if (arrValues[_i4 - 1] === arrValues[_i4 - 1 + 6]) {
        arrValues[_i4 - 1 + 6] = '';
        document.querySelector(".game__item:nth-child(".concat(_i4 + 6, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i4 + 6, ")")).classList.remove('game__item--active');
        gameItem.innerHTML = Math.pow(_gameItemValue2, 2);
        score = gameItem.innerHTML;
        console.log('Score = ', score);
      }

      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i4, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i4 - 1]);
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}