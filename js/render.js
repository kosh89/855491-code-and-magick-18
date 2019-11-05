'use strict';

(function () {
  var SIMILAR_WIZARDS_COUNT = 4;

  var setupSimilarElement = window.utils.setupWindowElement.querySelector('.setup-similar');
  setupSimilarElement.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplateElement = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  //  функция создания узла и отрисовки мага по свойствам из объекта
  var renderWizard = function (wizardObject) {
    var wizardElement = similarWizardTemplateElement.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardObject.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardObject.colorEyes;

    return wizardElement;
  };

  //  функция заполнения блока dom-элементами на основе массива
  var createWizardsNode = function (block, array) {
    similarListElement.innerHTML = '';
    for (var i = 0; i < SIMILAR_WIZARDS_COUNT; i++) {
      block.appendChild(renderWizard(array[i]));
    }
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();

    createWizardsNode(fragment, wizards);
    similarListElement.appendChild(fragment);

    setupSimilarElement.classList.remove('hidden');
  };
}());
