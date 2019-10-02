'use strict';

var ESC_CODE = 27;
var ENTER_CODE = 13;

var setupWindow = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupWindow.querySelector('.setup-close');

var setupSimilar = setupWindow.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similatWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//  функция генерации объекта с параметрами мага
var generateWizard = function (names, surnames, coat, eyes) {
  var wizardObj = {};

  wizardObj.name = names[Math.floor(Math.random() * names.length)] + ' ' + surnames[Math.floor(Math.random() * surnames.length)];
  wizardObj.coatColor = coat[Math.floor(Math.random() * coat.length)];
  wizardObj.eyesColor = eyes[Math.floor(Math.random() * eyes.length)];

  return wizardObj;
};

var wizards = [];

for (var k = 0; k < 4; k++) {
  wizards.push(generateWizard(wizardNames, wizardSurnames, wizardCoatColors, wizardEyesColors));
}

//  функция создания узла и отрисовки мага по свойствам из объекта
var renderWizard = function (wizardObject) {
  var wizardElement = similatWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizardObject.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardObject.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizardObject.eyesColor;

  return wizardElement;
};

//  функция заполнения блока dom-элементами на основе массива
var createWizardsNode = function (block, array) {
  for (var i = 0; i < array.length; i++) {
    block.appendChild(renderWizard(array[i]));
  }
};

var fragment = document.createDocumentFragment();

createWizardsNode(fragment, wizards);

similarListElement.appendChild(fragment);

//  открываем окно настройки по клику на картинку
var showSetup = function () {
  setupWindow.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeSetup = function () {
  setupWindow.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_CODE) {
    if (evt.target.classList.contains('setup-user-name')) {
      return;
    }
    closeSetup();
  }
};

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    showSetup();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_CODE) {
    closeSetup();
  }
});

setupOpen.addEventListener('click', showSetup);

setupClose.addEventListener('click', closeSetup);

//  изменение персонажа
var wizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
var fireball = setupWindow.querySelector('.setup-fireball-wrap');

//  выбираем случайный цвет из массива цветов
var getColor = function (colorArray) {
  return colorArray[getRandomInt(0, colorArray.length - 1)];
};

var changeCoatColor = function () {
  var coatColor = getColor(wizardCoatColors);
  wizardCoat.style.fill = coatColor;
  setupWindow.querySelector('input[name="coat-color"]').value = coatColor;
};

var changeEyesColor = function () {
  var eyesColor = getColor(wizardEyesColors);
  wizardEyes.style.fill = eyesColor;
  setupWindow.querySelector('input[name="eyes-color"]').value = eyesColor;
};

var changeFireballColor = function () {
  var fireballColor = getColor(fireballColors);
  fireball.style.backgroundColor = fireballColor;
  setupWindow.querySelector('input[name="fireball-color"]').value = fireballColor;
};

wizardCoat.addEventListener('click', changeCoatColor);
wizardEyes.addEventListener('click', changeEyesColor);
fireball.addEventListener('click', changeFireballColor);
