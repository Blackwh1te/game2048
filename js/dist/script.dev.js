"use strict";

var $start = document.querySelector('#start');
var $gameField = document.querySelector('#game-field');
var none = 'none';
var flex = 'flex';
var score = 0;
var arrValues = ['', '', '', '', '', '', '', '', '']; // Генерируемые значения

var generatedValues = [2, 2, 2, 2, 4]; // Управление

document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
  // up
  if (e.keyCode == 38) {
    rightPressed = true;
    console.log('up');
    shiftUp();
    renderItems();
  } // down
  else if (e.keyCode == 40) {
      leftPressed = true;
      console.log('down');
      shiftDown();
      renderItems();
    } // left
    else if (e.keyCode == 37) {
        leftPressed = true;
        console.log('left');
        shiftLeft();
        renderItems();
      } // right
      else if (e.keyCode == 39) {
          leftPressed = true;
          console.log('right');
          shiftRight();
          renderItems();
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
  for (var i = 0; i <= 1;) {
    var gameItemNumber = getRandom(1, 9);
    var gameItem = document.querySelector(".game__item:nth-child(".concat(gameItemNumber, ")"));

    if (gameItem.innerHTML === '') {
      gameItem.innerHTML = 2;
      gameItem.classList.add('game__item--active'); // gameItem.classList.add('game__item--2');

      i++;
    } // document.querySelector(`.game__item:nth-child(${1})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${1})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${2})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${2})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${3})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${3})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${4})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${4})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${5})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${5})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${6})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${6})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${7})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${7})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${8})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${8})`).classList.add('game__item--active');
    // document.querySelector(`.game__item:nth-child(${9})`).innerHTML = 2;
    // document.querySelector(`.game__item:nth-child(${9})`).classList.add('game__item--active');
    // i++;     

  }

  fillTheArray(); // for (let i = 0; i < arrValues.length; i++) {
  //    console.log('Значения: ', arrValues[i]);
  // }
}

function renderItems() {
  for (var i = 0; i <= 9; i++) {
    var gameItemNumber = getRandom(1, 9);
    var gameItem = document.querySelector(".game__item:nth-child(".concat(gameItemNumber, ")"));

    if (gameItem.innerHTML === '') {
      // gameItem.innerHTML = 2;
      gameItem.innerHTML = generatedValues[Math.floor(Math.random() * generatedValues.length)];
      gameItem.classList.add('game__item--active');
      break;
    }
  }

  fillTheArray();
} // Заполняем значения ячеек в массив значений


function fillTheArray() {
  for (var i = 0; i < 9; i++) {
    arrValues[i] = Number(document.querySelector(".game__item:nth-child(".concat(i + 1, ")")).innerHTML);
  }

  paintingCell();
}

function shiftUp() {
  for (var i = 0; i < 2; i++) {
    shiftValuesUp();
    shiftRowsUp();
    fillTheArray();
  }
}

function shiftDown() {
  for (var i = 0; i < 2; i++) {
    shiftValuesDown();
    shiftRowsDown();
    fillTheArray();
  }
}

function shiftLeft() {
  for (var i = 0; i < 2; i++) {
    shiftValuesLeft();
    shiftColumnsLeft();
    fillTheArray();
  }
}

function shiftRight() {
  for (var i = 0; i < 2; i++) {
    shiftValuesRight();
    shiftColumnsRight();
    fillTheArray();
  }
}

function shiftValuesUp() {
  // Проверяем ячейки от 1-й до 3-й включительно (первая линия)   
  for (var i = 1; i <= 3; i++) {
    // Получаем значение ячейки
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
    var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

    if (gameItem.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[i - 1] = gameItemValue; // Если значение ячейки с первой линии совпадает со
      // значением соответствующей ячейки со второй линии, то...

      if (arrValues[i - 1] === arrValues[i - 1 + 3]) {
        // Обнуляем значение ячейки со второй линии и записываем результат в массив значений
        arrValues[i - 1 + 3] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i + 3, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(i + 3, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        gameItem.innerHTML *= 2; // paintingCell(gameItem);
        // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = gameItem.innerHTML > score ? gameItem.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }

      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(i, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[i - 1]);
    }
  } // Проверяем ячейки от 4-й до 6-й включительно (вторая линия)   


  for (var _i = 4; _i <= 6; _i++) {
    // Получаем значение ячейки
    var _gameItem = document.querySelector(".game__item:nth-child(".concat(_i, ")"));

    var _gameItemValue = Number(_gameItem.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i - 1] = _gameItemValue; // Если значение ячейки с второй линии совпадает со
      // значением соответствующей ячейки со третьей линии, то...

      if (arrValues[_i - 1] === arrValues[_i - 1 + 3]) {
        // Обнуляем значение ячейки со третьей линии и записываем результат в массив значений
        arrValues[_i - 1 + 3] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(_i + 3, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i + 3, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        _gameItem.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = _gameItem.innerHTML > score ? _gameItem.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }

      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i - 1]);
    }
  } // Проверяем ячейки от 7-й до 9-й включительно (третья линия)   


  for (var _i2 = 7; _i2 <= 9; _i2++) {
    // Получаем значение ячейки
    var _gameItem2 = document.querySelector(".game__item:nth-child(".concat(_i2, ")"));

    var _gameItemValue2 = Number(_gameItem2.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem2.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i2 - 1] = _gameItemValue2;
      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i2, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i2 - 1]);
    }
  }
}

function shiftRowsUp() {
  // Сдвигаем ячейки на одну строку вверх
  // Обрабатываем только вторую и третью линию, т.к. только их возможно сместить наверх
  for (var i = 9; i >= 4; i--) {
    // Получаем значение ячейки
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
    var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

    if (gameItem.innerHTML !== '') {
      // Если ячейка на строке выше пуста (свободна), то переносим текущую ячейку наверх
      if (document.querySelector(".game__item:nth-child(".concat(i - 3, ")")).innerHTML === '') {
        // Записываем значение текущей ячейки в массив значений (на строку выше)
        arrValues[i - 1 - 3] = gameItemValue; // Записываем значение текущей ячейки в ячейку на строке выше и добавляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i - 3, ")")).innerHTML = gameItemValue;
        document.querySelector(".game__item:nth-child(".concat(i - 3, ")")).classList.add('game__item--active'); // Обнуляем значение текущей ячейки в массиве значений 

        arrValues[i - 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(i, ")")).classList.remove('game__item--active');
      }
    }
  }

  shiftValuesUp();
}

function shiftValuesDown() {
  // Проверяем ячейки от 9-й до 7-й включительно (третья линия)   
  for (var i = 9; i >= 7; i--) {
    // Получаем значение ячейки
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
    var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

    if (gameItem.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[i - 1] = gameItemValue; // Если значение ячейки с третьей линии совпадает со
      // значением соответствующей ячейки со второй линии, то...

      if (arrValues[i - 1] === arrValues[i - 1 - 3]) {
        // Обнуляем значение ячейки со второй линии и записываем результат в массив значений
        arrValues[i - 1 - 3] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i - 3, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(i - 3, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        gameItem.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = gameItem.innerHTML > score ? gameItem.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }

      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(i, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[i - 1]);
    }
  } // Проверяем ячейки от 6-й до 4-й включительно (вторая линия)   


  for (var _i3 = 6; _i3 >= 4; _i3--) {
    // Получаем значение ячейки
    var _gameItem3 = document.querySelector(".game__item:nth-child(".concat(_i3, ")"));

    var _gameItemValue3 = Number(_gameItem3.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem3.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i3 - 1] = _gameItemValue3; // Если значение ячейки с второй линии совпадает со
      // значением соответствующей ячейки со первой линии, то...

      if (arrValues[_i3 - 1] === arrValues[_i3 - 1 - 3]) {
        // Обнуляем значение ячейки со первой линии и записываем результат в массив значений
        arrValues[_i3 - 1 - 3] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(_i3 - 3, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i3 - 3, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        _gameItem3.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = _gameItem3.innerHTML > score ? _gameItem3.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }

      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i3, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i3 - 1]);
    }
  } // Проверяем ячейки от 3-й до 1-й включительно (первая линия)   


  for (var _i4 = 3; _i4 >= 1; _i4--) {
    // Получаем значение ячейки
    var _gameItem4 = document.querySelector(".game__item:nth-child(".concat(_i4, ")"));

    var _gameItemValue4 = Number(_gameItem4.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem4.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i4 - 1] = _gameItemValue4;
      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i4, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i4 - 1]);
    }
  }
}

function shiftRowsDown() {
  // Сдвигаем ячейки на одну строку вниз
  // Обрабатываем только первую и вторую линию, т.к. только их возможно сместить вниз
  for (var i = 1; i <= 6; i++) {
    // Получаем значение ячейки
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
    var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

    if (gameItem.innerHTML !== '') {
      // Если ячейка на строке ниже пуста (свободна), то переносим текущую ячейку наверх
      if (document.querySelector(".game__item:nth-child(".concat(i + 3, ")")).innerHTML === '') {
        // Записываем значение текущей ячейки в массив значений (на строку ниже)
        arrValues[i - 1 + 3] = gameItemValue; // Записываем значение текущей ячейки в ячейку на строке ниже и добавляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i + 3, ")")).innerHTML = gameItemValue;
        document.querySelector(".game__item:nth-child(".concat(i + 3, ")")).classList.add('game__item--active'); // Обнуляем значение текущей ячейки в массиве значений 

        arrValues[i - 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(i, ")")).classList.remove('game__item--active');
      }
    }
  }

  shiftValuesDown();
}

function shiftValuesLeft() {
  // Проверяем значение ячеек первого столбца
  for (var i = 1; i <= 7; i += 3) {
    // Получаем значение ячейки
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
    var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

    if (gameItem.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[i - 1] = gameItemValue; // Если значение ячейки с первого столбца совпадает со
      // значением соответствующей ячейки со второго столбца, то...

      if (arrValues[i - 1] === arrValues[i - 1 + 1]) {
        // Обнуляем значение ячейки со второго столбца и записываем результат в массив значений
        arrValues[i - 1 + 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i + 1, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(i + 1, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        gameItem.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = gameItem.innerHTML > score ? gameItem.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }
    }
  } // Проверяем значение ячеек второго столбца


  for (var _i5 = 2; _i5 <= 8; _i5 += 3) {
    // Получаем значение ячейки
    var _gameItem5 = document.querySelector(".game__item:nth-child(".concat(_i5, ")"));

    var _gameItemValue5 = Number(_gameItem5.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem5.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i5 - 1] = _gameItemValue5; // Если значение ячейки со второго столбца совпадает со
      // значением соответствующей ячейки с третьего столбца, то...

      if (arrValues[_i5 - 1] === arrValues[_i5 - 1 + 1]) {
        // Обнуляем значение ячейки с с трейтьего столбца и записываем результат в массив значений
        arrValues[_i5 - 1 + 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(_i5 + 1, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i5 + 1, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        _gameItem5.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = _gameItem5.innerHTML > score ? _gameItem5.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }
    }
  } // Проверяем значение ячеек третьего столбца


  for (var _i6 = 3; _i6 <= 9; _i6 += 3) {
    // Получаем значение ячейки
    var _gameItem6 = document.querySelector(".game__item:nth-child(".concat(_i6, ")"));

    var _gameItemValue6 = Number(_gameItem6.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem6.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i6 - 1] = _gameItemValue6;
      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i6, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i6 - 1]);
    }
  }
}

function shiftColumnsLeft() {
  // Сдвигаем столбец влево
  // Обрабатываем только второй и третий столбец, т.к. только их возможно сместить влево
  for (var i = 9; i >= 2; i--) {
    var secondColumn = [2, 5, 8];
    var thirdColumn = [3, 6, 9];

    if (secondColumn.includes(i) || thirdColumn.includes(i)) {
      // Получаем значение ячейки
      var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
      var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

      if (gameItem.innerHTML !== '') {
        // Если ячейка в столбце слева пуста (свободна), то переносим текущую ячейку налево
        if (document.querySelector(".game__item:nth-child(".concat(i - 1, ")")).innerHTML === '') {
          // Записываем значение текущей ячейки в массив значений (на столбец левее)
          arrValues[i - 1 - 1] = gameItemValue; // Записываем значение текущей ячейки в ячейку на строке выше и добавляем класс --active

          document.querySelector(".game__item:nth-child(".concat(i - 1, ")")).innerHTML = gameItemValue;
          document.querySelector(".game__item:nth-child(".concat(i - 1, ")")).classList.add('game__item--active'); // Обнуляем значение текущей ячейки в массиве значений 

          arrValues[i - 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

          document.querySelector(".game__item:nth-child(".concat(i, ")")).innerHTML = '';
          document.querySelector(".game__item:nth-child(".concat(i, ")")).classList.remove('game__item--active');
        }
      }
    }
  }

  shiftValuesLeft();
}

function shiftValuesRight() {
  // Проверяем значение ячеек третьего столбца
  for (var i = 9; i >= 3; i -= 3) {
    // Получаем значение ячейки
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
    var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

    if (gameItem.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[i - 1] = gameItemValue; // Если значение ячейки с третьего столбца совпадает со
      // значением соответствующей ячейки со второго столбца, то...

      if (arrValues[i - 1] === arrValues[i - 1 - 1]) {
        // Обнуляем значение ячейки со второго столбца и записываем результат в массив значений
        arrValues[i - 1 - 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(i - 1, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(i - 1, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        gameItem.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = gameItem.innerHTML > score ? gameItem.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }
    }
  } // Проверяем значение ячеек второго столбца


  for (var _i7 = 8; _i7 >= 2; _i7 -= 3) {
    // Получаем значение ячейки
    var _gameItem7 = document.querySelector(".game__item:nth-child(".concat(_i7, ")"));

    var _gameItemValue7 = Number(_gameItem7.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem7.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i7 - 1] = _gameItemValue7; // Если значение ячейки со второго столбца совпадает со
      // значением соответствующей ячейки с первого столбца, то...

      if (arrValues[_i7 - 1] === arrValues[_i7 - 1 - 1]) {
        // Обнуляем значение ячейки с первого столбца и записываем результат в массив значений
        arrValues[_i7 - 1 - 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

        document.querySelector(".game__item:nth-child(".concat(_i7 - 1, ")")).innerHTML = '';
        document.querySelector(".game__item:nth-child(".concat(_i7 - 1, ")")).classList.remove('game__item--active'); // Умножаем значение ячейки в два раза

        _gameItem7.innerHTML *= 2; // Присваиваем получившееся значение в SCORE
        // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE

        score = _gameItem7.innerHTML > score ? _gameItem7.innerHTML : score; // Выводим значение SCORE в консолль для проверки

        console.log('SCORE: ', score);
      }
    }
  } // Проверяем значение ячеек первого столбца


  for (var _i8 = 7; _i8 >= 1; _i8 -= 3) {
    // Получаем значение ячейки
    var _gameItem8 = document.querySelector(".game__item:nth-child(".concat(_i8, ")"));

    var _gameItemValue8 = Number(_gameItem8.innerHTML); // Если ячейка не пуста, то...


    if (_gameItem8.innerHTML !== '') {
      // Записываем значение ячейки в массив значений
      // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
      arrValues[_i8 - 1] = _gameItemValue8;
      console.log("\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435 ".concat(_i8, "-\u0439 \u044F\u0447\u0435\u0439\u043A\u0438: "), arrValues[_i8 - 1]);
    }
  }
}

function shiftColumnsRight() {
  // Сдвигаем столбец вправо
  // Обрабатываем только первый и второй столбец, т.к. только их возможно сместить влево
  for (var i = 8; i >= 1; i--) {
    var firstColumn = [1, 4, 7];
    var secondColumn = [2, 5, 8];

    if (firstColumn.includes(i) || secondColumn.includes(i)) {
      // Получаем значение ячейки
      var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));
      var gameItemValue = Number(gameItem.innerHTML); // Если ячейка не пуста, то...

      if (gameItem.innerHTML !== '') {
        // Если ячейка в столбце справа пуста (свободна), то переносим текущую ячейку направо
        if (document.querySelector(".game__item:nth-child(".concat(i + 1, ")")).innerHTML === '') {
          // Записываем значение текущей ячейки в массив значений (на столбец правее)
          arrValues[i - 1 + 1] = gameItemValue; // Записываем значение текущей ячейки в ячейку на строке выше и добавляем класс --active

          document.querySelector(".game__item:nth-child(".concat(i + 1, ")")).innerHTML = gameItemValue;
          document.querySelector(".game__item:nth-child(".concat(i + 1, ")")).classList.add('game__item--active'); // Обнуляем значение текущей ячейки в массиве значений 

          arrValues[i - 1] = ''; // Удаляем число из ячейки на странице и удаляем класс --active

          document.querySelector(".game__item:nth-child(".concat(i, ")")).innerHTML = '';
          document.querySelector(".game__item:nth-child(".concat(i, ")")).classList.remove('game__item--active');
        }
      }
    }
  }

  shiftValuesRight();
}

function paintingCell() {
  for (var i = 1; i <= 9; i++) {
    var gameItem = document.querySelector(".game__item:nth-child(".concat(i, ")"));

    switch (gameItem.innerHTML) {
      case '':
        gameItem.style.backgroundColor = '#c8ecca';
        break;

      case '2':
        gameItem.style.backgroundColor = '#5fd1a2';
        break;

      case '4':
        gameItem.style.backgroundColor = '#ebcccc';
        break;

      case '8':
        gameItem.style.backgroundColor = '#cfacac';
        break;

      case '16':
        gameItem.style.backgroundColor = '#b38989';
        break;

      case '32':
        gameItem.style.backgroundColor = '#6e4c4c';
        break;

      case '64':
        gameItem.style.backgroundColor = '#442c2c';
        break;

      case '128':
        gameItem.style.backgroundColor = '#a1a3be';
        break;

      case '256':
        gameItem.style.backgroundColor = '#70728f';
        break;

      case '512':
        gameItem.style.backgroundColor = '#4f5170';
        break;

      case '1024':
        gameItem.style.backgroundColor = '#2a2b44';
        break;

      case '2018':
        gameItem.style.backgroundColor = '#090a0f';
        break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}