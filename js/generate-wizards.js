'use strict';

(function () {
  var setupSimilar = window.utils.setupWindow.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similatWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  window.generateWizards = {
    WIZARD_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
    WIZARD_SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
    WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

  //  функция генерации объекта с параметрами мага
  var generateWizard = function (names, surnames, coat, eyes) {
    var wizardObj = {};

    wizardObj.name = window.utils.getRandomElementFromArray(names) + ' ' + window.utils.getRandomElementFromArray(surnames);
    wizardObj.coatColor = window.utils.getRandomElementFromArray(coat);
    wizardObj.eyesColor = window.utils.getRandomElementFromArray(eyes);

    return wizardObj;
  };

  var wizards = [];

  for (var k = 0; k < 4; k++) {
    wizards.push(generateWizard(window.generateWizards.WIZARD_NAMES, window.generateWizards.WIZARD_SURNAMES, window.generateWizards.WIZARD_COAT_COLORS, window.generateWizards.WIZARD_EYES_COLORS));
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
})();
