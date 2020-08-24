let $start = document.querySelector('#start');
let $gameField = document.querySelector('#game-field');
let none = 'none';
let flex = 'flex';
let block = 'block';
let score = 0;

// Массив значений ячеек игрового поля:
let cellValues = ['','','','','','','','',''];

let firstColumn = [1, 4, 7];
let secondColumn = [2, 5, 8]; 
let thirdColumn = [3, 6, 9];   

let isUpPossible = true;
let isDownPossible = true;
let isLeftPossible = true;
let isRightPossible = true;

// Добавление события клика по кнопке "Начать":
$start.addEventListener('click', startGame);

// Добавление орбаботчика событий при нажатии на стрелки клавиатуры
document.addEventListener('keydown', keyDownHandler, false);

function keyDownHandler(e) {
   // up
   if(e.keyCode == 38) {
      shiftUp();
      renderItem();
      endGameCheck();
   }

   // down
   else if(e.keyCode == 40) {
      shiftDown();
      renderItem();
      endGameCheck();
   }
   
   // left
   else if(e.keyCode == 37) {
      shiftLeft();
      renderItem();
      endGameCheck();
   }
   
   // right
   else if(e.keyCode == 39) {
      shiftRight();
      renderItem();
      endGameCheck();
   }
}

// Начало игры
function startGame() {
   // Скрытие кнопки "Начать" и отображение игрового поля:
   display($start, none);
   display($gameField, flex);
   // Заполнение двух случайных ячеек игрового поля начальными значениями:
   for (let i = 0; i < 2;) {
      // Генерация случайного номера ячейки игрового поля:
      let cellNumber = getRandom(1, 9);
      // Выбор ячейки игрового поля:      
      let cell = getCell(cellNumber);
      // Если ячейка пустая, то...
      if (cell.innerHTML === '') {
         // Заполнение ячейки числом "2" с соответствующим фоновым цветом
         // и запись значения ячейки в массив значений:
         fillTheCell(cell, cellNumber, 2);
         i++;      
      }
   }

   // // Тестовое заполнение всех ячеек игрового поля значением "2":
   // for (let i = 1; i <= cellValues.length; i++) {
   //    let cell = getCell(i);
   //    fillTheCell(cell, i, 2);
   // }

   // // Тестовый вывод значений ячеек игрового поля:
   // for (let i = 0; i < cellValues.length; i++) {
   //    console.log(`Значение ячейки ${i + 1} на игровом поле: `, cellValues[i]);
   // }
}

function endGameCheck() {
   if (cellValues.indexOf('') == -1) {
      if (false === isUpPossible === isDownPossible === isLeftPossible === isRightPossible) {
         // Скрытие кнопки "Начать" и отображение игрового поля:
         // display($start, block);
         // display($gameField, none);     
      }
   }
}

function shiftUp() {
   let isMergeUpPossible = false;
   let isShiftUpPossible = false;
   // Проходим по циклу 3 раза, т.к. у нас игровое поле содержит 3 строки
   for (let j = 1; j <= 3; j++) {
      // Перебор ячеек первой и второй строки, сложение значений:
      for (let i = 1; i <= 6; i++) {      
         // Выбор ячейки игрового поля:   
         let cell = getCell(i);
         // Выбор ячейки игрового поля на строке ниже:
         let cellCompare = getCell(i + 3);     
         // Если значение ячейки совпадает с ячейкой ниже, то...
         if (cell.innerHTML != '' && cell.innerHTML === cellCompare.innerHTML) {
            // Умножение значения ячейки в 2 раза
            // и заполнение ячейки новым значением с соответствующим фоновым цветом:
            fillTheCell(cell, i, cell.innerHTML * 2);
            // Небольшое увеличение ячейки для наглядного отображения сложения ячеек
            mergeAnimation(cell);
            // Обнуление значения ячейки в соответствующем элементе массива значений:
            fillTheCell(cellCompare, i + 3, '');  
            isMergeUpPossible = true;          
         }
      }
      // Перебор всех ячеек с конца, сдвиг строк: 
      for (let i = 9; i >= 4; i--) {
         // Выбор ячейки игрового поля:   
         let cell = getCell(i);
         // Выбор ячейки игрового поля на строке выше:
         let cellCompare = getCell(i - 3);
         // Если значение ячейки на строке выше пустое то...
         if (cellCompare.innerHTML === '' && cell.innerHTML != '') {
            fillTheCell(cellCompare, i - 3, Number(cell.innerHTML));
            fillTheCell(cell, i, '');
            isShiftUpPossible = true;
         }
      }
   } 
   isUpPossible = (isMergeUpPossible == isShiftUpPossible == false) ? false : true;
}

function shiftDown() {
   let isMergeDownPossible = false;
   let isShiftDownPossible = false;
   // Проходим по циклу 3 раза, т.к. у нас игровое поле содержит 3 строки
   for (let j = 1; j <= 3; j++) {
      // Перебор ячеек третьей и второй строки, сложение значений:
      for (let i = 9; i >= 4; i--) {      
         // Выбор ячейки игрового поля:   
         let cell = getCell(i);
         // Выбор ячейки игрового поля на строке ниже:
         let cellCompare = getCell(i - 3);     
         // Если значение ячейки совпадает с ячейкой ниже, то...
         if (cell.innerHTML != '' && cell.innerHTML === cellCompare.innerHTML) {
            // Умножение значения ячейки в 2 раза
            // и заполнение ячейки новым значением с соответствующим фоновым цветом:
            fillTheCell(cell, i, cell.innerHTML * 2);
            // Небольшое увеличение ячейки для наглядного отображения сложения ячеек
            mergeAnimation(cell);
            // Обнуление значения ячейки в соответствующем элементе массива значений:
            fillTheCell(cellCompare, i - 3, '');
            isMergeDownPossible = true;
         }
      }
      // Перебор всех ячеек с начала, сдвиг строк: 
      for (let i = 1; i <= 6; i++) {
         // Выбор ячейки игрового поля:   
         let cell = getCell(i);
         // Выбор ячейки игрового поля на строке выше:
         let cellCompare = getCell(i + 3);
         // Если значение ячейки на строке выше пустое то...
         if (cellCompare.innerHTML === '' && cell.innerHTML != '') {
            fillTheCell(cellCompare, i + 3, Number(cell.innerHTML));
            fillTheCell(cell, i, '');
            isShiftDownPossible = true;
         }
      }
   } 
   isDownPossible = (isMergeDownPossible == isShiftDownPossible == false) ? false : true;
}

function shiftLeft() {
   let isMergeLeftPossible = false;
   let isShiftLeftPossible = false;
   // Проходим по циклу 3 раза, т.к. у нас игровое поле содержит 3 столбца
   for (let j = 1; j <= 3; j++) {
      // Перебор ячеек первого и второго столбца, сложение значений:
      for (let i = 1; i <= 8; i += 1) {      
         if (firstColumn.includes(i) || secondColumn.includes(i)) {
            // Выбор ячейки игрового поля:   
            let cell = getCell(i);
            // Выбор ячейки игрового поля в столбце справа:
            let cellCompare = getCell(i + 1);     
            // Если значение ячейки совпадает с ячейкой справа, то...
            if (cell.innerHTML != '' && cell.innerHTML === cellCompare.innerHTML) {
               // Умножение значения ячейки в 2 раза
               // и заполнение ячейки новым значением с соответствующим фоновым цветом:
               fillTheCell(cell, i, cell.innerHTML * 2);
               // Небольшое увеличение ячейки для наглядного отображения сложения ячеек
               mergeAnimation(cell);
               // Обнуление значения ячейки в соответствующем элементе массива значений:
               fillTheCell(cellCompare, i + 1, '');
               isMergeLeftPossible = true;
            }
         }
      }
      // Перебор всех ячеек с конца, сдвиг столбцов: 
      for (let i = 9; i >= 2; i--) {
         if (secondColumn.includes(i) || thirdColumn.includes(i)) {
            // Выбор ячейки игрового поля:   
            let cell = getCell(i);
            // Выбор ячейки игрового поля столбцом левее:
            let cellCompare = getCell(i - 1);
            // Если значение ячейки в столбце слева пустое то...
            if (cellCompare.innerHTML === '' && cell.innerHTML != '') {
               fillTheCell(cellCompare, i - 1, Number(cell.innerHTML));
               fillTheCell(cell, i, '');
               isShiftLeftPossible = true;
            }
         }
      }      
   } 
   isLeftPossible = (isMergeLeftPossible == isShiftLeftPossible == false) ? false : true;
}

function shiftRight() {
   let isMergeRightPossible = false;
   let isShiftRightPossible = false;
   // Проходим по циклу 3 раза, т.к. у нас игровое поле содержит 3 столбца
   for (let j = 1; j <= 3; j++) {            
      // Перебор ячеек третьего и второго столбца, сложение значений:      
         for (let i = 9; i >= 2; i--) {      
            if (thirdColumn.includes(i) || secondColumn.includes(i)) {
               // Выбор ячейки игрового поля:   
               let cell = getCell(i);
               // Выбор ячейки игрового поля в столбце слева:
               let cellCompare = getCell(i - 1);     
               // Если значение ячейки совпадает с ячейкой слева, то...
               if (cell.innerHTML != '' && cell.innerHTML === cellCompare.innerHTML) {
                  // Умножение значения ячейки в 2 раза
                  // и заполнение ячейки новым значением с соответствующим фоновым цветом:
                  fillTheCell(cell, i, cell.innerHTML * 2);
                  // Небольшое увеличение ячейки для наглядного отображения сложения ячеек
                  mergeAnimation(cell);
                  // Обнуление значения ячейки в соответствующем элементе массива значений:
                  fillTheCell(cellCompare, i - 1, '');
                  isMergeRightPossible = true;
               }
            }
         }      
      // Перебор всех ячеек с конца, сдвиг столбцов: 
      for (let i = 1; i <= 8; i++) {
         if (firstColumn.includes(i) || secondColumn.includes(i)) {
            // Выбор ячейки игрового поля:   
            let cell = getCell(i);
            // Выбор ячейки игрового поля столбцом правее:
            let cellCompare = getCell(i + 1);
            // Если значение ячейки в столбце справа пустое то...
            if (cellCompare.innerHTML === '' && cell.innerHTML != '') {
               fillTheCell(cellCompare, i + 1, Number(cell.innerHTML));
               fillTheCell(cell, i, '');
               isShiftRightPossible = true;
            }
         }
      }      
   } 
   isRightPossible = (isMergeRightPossible == isShiftRightPossible == false) ? false : true;
}

function renderItem() {
   if (cellValues.indexOf('') != -1) {
      while (true) {
         // Генерация случайного номера ячейки игрового поля:
         let cellNumber = getRandom(1, 9);
         // Выбор ячейки игрового поля:      
         let cell = getCell(cellNumber);
         if (cell.innerHTML == '') {
            fillTheCell(cell, cellNumber, 2);
            appearanceAnimation(cell);
            break;
         }
      }
   } else {
      console.log('GAME OVER!');
   }
}















// Изменение значение display у элемента:
function display($el, displayType) {
   $el.style.display = displayType;
}

// Генерация случайного числа в заданном диапазоне:
function getRandom(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}

// Получение n-ой ячейки игрового поля:
function getCell(cellNumber) {
   return document.querySelector(`.game__item:nth-child(${cellNumber})`);
}

// Небольшое увеличение ячейки для наглядного отображения сложения ячеек
function mergeAnimation(cell) {
   if (cell.innerHTML != '') {
      cell.style.transform = 'scale(1.1)';  
      cell.style.boxShadow = 'inset 0 0 10px 10px rgba(0, 0, 0, 0.2)';           
      setTimeout(function() {
         cell.style.transform = 'scale(1)'; 
         cell.style.boxShadow = 'none'; 
      }, 500)
   }
}

// Небольшое уменьшение ячейки для наглядного отображения появления ячейки
function appearanceAnimation(cell) {
   if (cell.innerHTML != '') {
      cell.style.transform = 'scale(0.9)';  
      cell.style.boxShadow = 'inset 0 0 10px 10px rgba(255, 255, 255, 0.2)';       
           
      setTimeout(function() {
         cell.style.transform = 'scale(1)'; 
         cell.style.boxShadow = 'none'; 
      }, 500)
   }
}

// Заполнение n-й ячейки значением number и соответствующим цветом:
function fillTheCell(cell, cellNumber, value) { 
   cell.innerHTML = value;
   cellValues[cellNumber - 1] = value;
   switch(value) {  
      // Пустая ячейка:
      case '':
         cell.style.backgroundColor = '#c8ecca';
         break;    

      // Ячейка со значением "2":
      case 2:
         cell.style.backgroundColor = '#5fd1a2';
         break;         

      // Ячейка со значением "4":
      case 4:
         cell.style.backgroundColor = '#ebcccc';
         break;

      // Ячейка со значением "8":
      case 8:
         cell.style.backgroundColor = '#cfacac';
         break;

      // Ячейка со значением "16":
      case 16:
         cell.style.backgroundColor = '#b38989';
         break;

      // Ячейка со значением "32":
      case 32:
         cell.style.backgroundColor = '#6e4c4c';
         break;

      // Ячейка со значением "64":
      case 64:
         cell.style.backgroundColor = '#442c2c';
         break;

      // Ячейка со значением "128":
      case 128:
         cell.style.backgroundColor = '#a1a3be';
         break;

      // Ячейка со значением "256":
      case 256:
         cell.style.backgroundColor = '#70728f';
         break;

      // Ячейка со значением "512":
      case 512:
         cell.style.backgroundColor = '#4f5170';
         break;

      // Ячейка со значением "1024":
      case 1024:
         cell.style.backgroundColor = '#2a2b44';
         break;

      // Ячейка со значением "2048":
      case 2048:
         cell.style.backgroundColor = '#090a0f';
         break;
         
      // Пустая ячейка:
      default:
         // cell.style.backgroundColor = '#5fd1a2';
         break;    
   }
}