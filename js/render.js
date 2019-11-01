'use strict';

(function () {
  var setupSimilar = window.utils.setupWindow.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var similarListElement = document.querySelector('.setup-similar-list');
  var similatWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  //  функция создания узла и отрисовки мага по свойствам из объекта
  var renderWizard = function (wizardObject) {
    var wizardElement = similatWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizardObject.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizardObject.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizardObject.colorEyes;

    return wizardElement;
  };

  //  функция заполнения блока dom-элементами на основе массива
  var createWizardsNode = function (block, array) {
    var takeNumber = array.length > 4 ? 4 : array.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      block.appendChild(renderWizard(array[i]));
    }
  };

  window.render = function (wizards) {
    var fragment = document.createDocumentFragment();

    createWizardsNode(fragment, wizards);
    similarListElement.appendChild(fragment);

    setupSimilar.classList.remove('hidden');
  };

  //  обработчик успешной загрузки данных с сервера

}());
