'use strict';

(function () {
  window.generateWizards = {
    WIZARD_COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    WIZARD_EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
  };

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
    var WIZARDS_COUNT = 4;
    for (var i = 0; i < WIZARDS_COUNT; i++) {
      block.appendChild(renderWizard(window.utils.getRandomElementFromArray(array)));
    }
  };

  //  обработчик успешной загрузки данных с сервера
  var loadSuccessHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    createWizardsNode(fragment, wizards);
    similarListElement.appendChild(fragment);

    setupSimilar.classList.remove('hidden');
  };

  //  обработчик успешной отправки данных на сервер
  var saveSuccessHandler = function () {
    window.utils.setupWindow.classList.add('hidden');
  };

  //  обработчик ошибок при загрузке/отправке данных
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(loadSuccessHandler, errorHandler);

  var form = document.querySelector('.setup-wizard-form');

  //  отправка формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(form), saveSuccessHandler, errorHandler);
  });
})();
