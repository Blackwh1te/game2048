let $start = document.querySelector('#start');
let $gameField = document.querySelector('#game-field');
let none = 'none';
let flex = 'flex';
let score = 0;
let isShiftPossible = true;
let arrValues = [
   '',
   '',
   '',
   '',
   '',
   '',
   '',
   '',
   ''
];

// Значение генерируемых ячеек 
// (в оригинальной игре на поле 4х4
// помимо ячейки "2" может появиться
// ячейка "4"),
// но на поле 3х3 появление числа "4" сильно упрощает игру
// поэтому массив генерируемых значений состоит только из значения "2"
let generatedValues = [2];

// Добавление орбаботчика событий при нажатии на стрелки клавиатуры
document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
   // up
   if(e.keyCode == 38) {
      shiftUp();
      renderItems();
   }

   // down
   else if(e.keyCode == 40) {
      shiftDown();
      renderItems();
   }
   
   // left
   else if(e.keyCode == 37) {
      shiftLeft();
      renderItems();
   }
   
   // right
   else if(e.keyCode == 39) {
      shiftRight();
      renderItems();
   }
}

$start.addEventListener('click', startGame);

function startGame() {
   display($start, none);
   display($gameField, flex);
   renderFirstItems();
}

function display($el, displayType) {
   $el.style.display = displayType;
}

// Генерация двух первоначальных ячеек со значениями "2"
function renderFirstItems() {
   for (let i = 0; i <= 1;) {
      let gameItemNumber = getRandom(1, 9);
      let gameItem = document.querySelector(`.game__item:nth-child(${gameItemNumber})`);
      if (gameItem.innerHTML === '') {
         gameItem.innerHTML = 2;
         gameItem.classList.add('game__item--2');
         i++;
      }      
   }
   fillTheArray();
}

function renderItems() {
   for (let i = 0; i <= 9; i++) {
      let gameItemNumber = getRandom(1, 9);
      let gameItem = document.querySelector(`.game__item:nth-child(${gameItemNumber})`);
      if (gameItem.innerHTML === '') {
         gameItem.innerHTML = generatedValues[Math.floor(Math.random() * generatedValues.length)];
         gameItem.classList.add('game__item--2');

         break;
      } 
   }
   fillTheArray();
}

// Заполняем значения ячеек в массив значений
function fillTheArray() {
   for (let i = 0; i < 9; i++) {
      arrValues[i] = Number(document.querySelector(`.game__item:nth-child(${i + 1})`).innerHTML);
   }
   // Окрашивание ячеек со значениями соответствующими цветами
   paintingCell();
}

function shiftUp() {
   for (let i = 0; i < 2; i++) {
      shiftValuesUp();
      shiftRowsUp();
      fillTheArray();
   }
}

function shiftDown() {
   for (let i = 0; i < 2; i++) {
      shiftValuesDown();
      shiftRowsDown();
      fillTheArray();
   }
}

function shiftLeft() {
   for (let i = 0; i < 2; i++) {
      shiftValuesLeft();
      shiftColumnsLeft();
      fillTheArray();
   }
}

function shiftRight() {
   for (let i = 0; i < 2; i++) {
      shiftValuesRight();
      shiftColumnsRight();
      fillTheArray();
   }
}

function shiftValuesUp() {
   // Проверяем ячейки от 1-й до 3-й включительно (первая линия)   
   for (let i = 1; i <= 3; i++) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки с первой линии совпадает со
         // значением соответствующей ячейки со второй линии, то...
         if ((arrValues[i - 1] === arrValues[i - 1 + 3])) {

            // Обнуляем значение ячейки со второй линии и записываем результат в массив значений
            arrValues[i - 1 + 3] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i + 3})`).innerHTML = '';
            
            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;
            // paintingCell(gameItem);

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }

   // Проверяем ячейки от 4-й до 6-й включительно (вторая линия)   
   for (let i = 4; i <= 6; i++) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки с второй линии совпадает со
         // значением соответствующей ячейки со третьей линии, то...
         if ((arrValues[i - 1] === arrValues[i - 1 + 3])) {

            // Обнуляем значение ячейки со третьей линии и записываем результат в массив значений
            arrValues[i - 1 + 3] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i + 3})`).innerHTML = '';
            
            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }

   // Проверяем ячейки от 7-й до 9-й включительно (третья линия)   
   for (let i = 7; i <= 9; i++) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;
      }
   }
}

function shiftRowsUp() {
   
   // Сдвигаем ячейки на одну строку вверх
   // Обрабатываем только вторую и третью линию, т.к. только их возможно сместить наверх
   for (let i = 9; i >= 4; i--) {

      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {    

         // Если ячейка на строке выше пуста (свободна), то переносим текущую ячейку наверх
         if (document.querySelector(`.game__item:nth-child(${i - 3})`).innerHTML === '') {

            // Записываем значение текущей ячейки в массив значений (на строку выше)
            arrValues[i - 1 - 3] = gameItemValue;            
            // Записываем значение текущей ячейки в ячейку на строке выше
            document.querySelector(`.game__item:nth-child(${i - 3})`).innerHTML = gameItemValue;

            // Обнуляем значение текущей ячейки в массиве значений 
            arrValues[i - 1] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i})`).innerHTML = '';
         }
      }
   }
   // Сдвиг значений вверх
   shiftValuesUp();
}

function shiftValuesDown() {

   // Проверяем ячейки от 9-й до 7-й включительно (третья линия)   
   for (let i = 9; i >= 7; i--) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки с третьей линии совпадает со
         // значением соответствующей ячейки со второй линии, то...
         if ((arrValues[i - 1] === arrValues[i - 1 - 3])) {

            // Обнуляем значение ячейки со второй линии и записываем результат в массив значений
            arrValues[i - 1 - 3] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i - 3})`).innerHTML = '';
            
            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }

   // Проверяем ячейки от 6-й до 4-й включительно (вторая линия)   
   for (let i = 6; i >= 4; i--) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки с второй линии совпадает со
         // значением соответствующей ячейки со первой линии, то...
         if ((arrValues[i - 1] === arrValues[i - 1 - 3])) {

            // Обнуляем значение ячейки со первой линии и записываем результат в массив значений
            arrValues[i - 1 - 3] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i - 3})`).innerHTML = '';
            
            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }

   // Проверяем ячейки от 3-й до 1-й включительно (первая линия)   
   for (let i = 3; i >= 1; i--) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;
      }
   }
}

function shiftRowsDown() {
   // Сдвигаем ячейки на одну строку вниз
   // Обрабатываем только первую и вторую линию, т.к. только их возможно сместить вниз
   for (let i = 1; i <= 6; i++) {

      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {    

         // Если ячейка на строке ниже пуста (свободна), то переносим текущую ячейку наверх
         if (document.querySelector(`.game__item:nth-child(${i + 3})`).innerHTML === '') {

            // Записываем значение текущей ячейки в массив значений (на строку ниже)
            arrValues[i - 1 + 3] = gameItemValue;    

            // Записываем значение текущей ячейки в ячейку на строке ниже
            document.querySelector(`.game__item:nth-child(${i + 3})`).innerHTML = gameItemValue;

            // Обнуляем значение текущей ячейки в массиве значений 
            arrValues[i - 1] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i})`).innerHTML = '';
         }
      }
   }
   // Сдвиг значений вниз
   shiftValuesDown();
}

function shiftValuesLeft() {
   // Проверяем значение ячеек первого столбца
   for (let i = 1; i <= 7; i += 3) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки с первого столбца совпадает со
         // значением соответствующей ячейки со второго столбца, то...
         if ((arrValues[i - 1] === arrValues[i - 1 + 1])) {
            // Обнуляем значение ячейки со второго столбца и записываем результат в массив значений
            arrValues[i - 1 + 1] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i + 1})`).innerHTML = '';

            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }

   // Проверяем значение ячеек второго столбца
   for (let i = 2; i <= 8; i += 3) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки со второго столбца совпадает со
         // значением соответствующей ячейки с третьего столбца, то...
         if ((arrValues[i - 1] === arrValues[i - 1 + 1])) {
            // Обнуляем значение ячейки с с трейтьего столбца и записываем результат в массив значений
            arrValues[i - 1 + 1] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i + 1})`).innerHTML = '';

            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }  

   // Проверяем значение ячеек третьего столбца
   for (let i = 3; i <= 9; i += 3) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;
      }
   }
}

function shiftColumnsLeft() {
   // Сдвигаем столбец влево
   // Обрабатываем только второй и третий столбец, т.к. только их возможно сместить влево
   for (let i = 9; i >= 2; i--) {
      let secondColumn = [2, 5, 8];
      let thirdColumn = [3, 6, 9];
      if (secondColumn.includes(i) || thirdColumn.includes(i)) {
         // Получаем значение ячейки
         let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
         let gameItemValue = Number(gameItem.innerHTML);

         // Если ячейка не пуста, то...
         if (gameItem.innerHTML !== '') {    

            // Если ячейка в столбце слева пуста (свободна), то переносим текущую ячейку налево
            if (document.querySelector(`.game__item:nth-child(${i - 1})`).innerHTML === '') {

               // Записываем значение текущей ячейки в массив значений (на столбец левее)
               arrValues[i - 1 - 1] = gameItemValue;            

               // Записываем значение текущей ячейки в ячейку на строке выше
               document.querySelector(`.game__item:nth-child(${i - 1})`).innerHTML = gameItemValue;

               // Обнуляем значение текущей ячейки в массиве значений 
               arrValues[i - 1] = '';

               // Скрываем ячейку со страницы
               document.querySelector(`.game__item:nth-child(${i})`).innerHTML = '';
            }
         }
         
      }
   }
   // Сдвиг значений влево
   shiftValuesLeft();
}

function shiftValuesRight() {
   // Проверяем значение ячеек третьего столбца
   for (let i = 9; i >= 3; i -= 3) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки с третьего столбца совпадает со
         // значением соответствующей ячейки со второго столбца, то...
         if ((arrValues[i - 1] === arrValues[i - 1 - 1])) {
            // Обнуляем значение ячейки со второго столбца и записываем результат в массив значений
            arrValues[i - 1 - 1] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i - 1})`).innerHTML = '';

            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }

   // Проверяем значение ячеек второго столбца
   for (let i = 8; i >= 2; i -= 3) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;

         // Если значение ячейки со второго столбца совпадает со
         // значением соответствующей ячейки с первого столбца, то...
         if ((arrValues[i - 1] === arrValues[i - 1 - 1])) {
            // Обнуляем значение ячейки с первого столбца и записываем результат в массив значений
            arrValues[i - 1 - 1] = '';

            // Скрываем ячейку со страницы
            document.querySelector(`.game__item:nth-child(${i - 1})`).innerHTML = '';

            // Умножаем значение ячейки в два раза
            gameItem.innerHTML *= 2;

            // Присваиваем получившееся значение в SCORE
            // При условии, что значение в получившейся ячейке больше значения предыдущего SCORE
            score = gameItem.innerHTML > score ? gameItem.innerHTML : score;
         }
      }
   }  

   // Проверяем значение ячеек первого столбца
   for (let i = 7; i >= 1; i -= 3) {
      // Получаем значение ячейки
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      let gameItemValue = Number(gameItem.innerHTML);

      // Если ячейка не пуста, то...
      if (gameItem.innerHTML !== '') {
         // Записываем значение ячейки в массив значений
         // Индекс уменьшаем на 1 для удобства, чтобы 1-ая ячейка была под №1, 2-ая под №2 и т.д.
         arrValues[i - 1] = gameItemValue;
      }
   }
}

function shiftColumnsRight() {
   // Сдвигаем столбец вправо
   // Обрабатываем только первый и второй столбец, т.к. только их возможно сместить влево
   for (let i = 8; i >= 1; i--) {
      let firstColumn = [1, 4, 7];
      let secondColumn = [2, 5, 8];
      if (firstColumn.includes(i) || secondColumn.includes(i)) {
         // Получаем значение ячейки
         let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
         let gameItemValue = Number(gameItem.innerHTML);

         // Если ячейка не пуста, то...
         if (gameItem.innerHTML !== '') {    

            // Если ячейка в столбце справа пуста (свободна), то переносим текущую ячейку направо
            if (document.querySelector(`.game__item:nth-child(${i + 1})`).innerHTML === '') {

               // Записываем значение текущей ячейки в массив значений (на столбец правее)
               arrValues[i - 1 + 1] = gameItemValue;            
               
               // Записываем значение текущей ячейки в ячейку на строке выше
               document.querySelector(`.game__item:nth-child(${i + 1})`).innerHTML = gameItemValue;

               // Обнуляем значение текущей ячейки в массиве значений 
               arrValues[i - 1] = '';

               // Скрываем ячейку со страницы
               document.querySelector(`.game__item:nth-child(${i})`).innerHTML = '';
            }
         }         
      }
   }
   // Сдвиг значений направо
   shiftValuesRight();
}

function paintingCell() {   
   for (let i = 1; i <= 9; i++) {
      let gameItem = document.querySelector(`.game__item:nth-child(${i})`);
      switch(gameItem.innerHTML) {

         // Пустая (неактивная) ячейка:
         case '':
            gameItem.style.backgroundColor = '#c8ecca';
            break;

         // Ячейка со значением "2":
         case '2':
            gameItem.style.backgroundColor = '#5fd1a2';
            break;         

         // Ячейка со значением "4":
         case '4':
            gameItem.style.backgroundColor = '#ebcccc';
            break;

         // Ячейка со значением "8":
         case '8':
            gameItem.style.backgroundColor = '#cfacac';
            break;

         // Ячейка со значением "16":
         case '16':
            gameItem.style.backgroundColor = '#b38989';
            break;

         // Ячейка со значением "32":
         case '32':
            gameItem.style.backgroundColor = '#6e4c4c';
            break;

         // Ячейка со значением "64":
         case '64':
            gameItem.style.backgroundColor = '#442c2c';
            break;

         // Ячейка со значением "128":
         case '128':
            gameItem.style.backgroundColor = '#a1a3be';
            break;

         // Ячейка со значением "256":
         case '256':
            gameItem.style.backgroundColor = '#70728f';
            break;

         // Ячейка со значением "512":
         case '512':
            gameItem.style.backgroundColor = '#4f5170';
            break;

         // Ячейка со значением "1024":
         case '1024':
            gameItem.style.backgroundColor = '#2a2b44';
            break;

         // Ячейка со значением "2048":
         case '2048':
            gameItem.style.backgroundColor = '#090a0f';
            break;
      }
   }  
}

// Генерация случайного числа в заданном диапазоне
function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}