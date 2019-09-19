'use strict';

var setupWindow = document.querySelector('.setup');
setupWindow.classList.remove('hidden');

var setupSimilar = setupWindow.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');
var similatWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardName = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurname = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColor = ['black', 'red', 'blue', 'yellow', 'green'];

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
  wizards.push(generateWizard(wizardName, wizardSurname, wizardCoatColor, wizardEyesColor));
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
