'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  //  переменные для сохранения текущего цвета мантии и глаз
  var coatColorTemp;
  var eyesColorTemp;

  //  сюда сохраним данные, полученные с сервера
  var wizards = [];

  window.generateWizards = {
    onCoatChange: window.debounce(function (color) {
      coatColorTemp = color;
      updateWizards();
    }),

    onEyesChange: window.debounce(function (color) {
      eyesColorTemp = color;
      updateWizards();
    })
  };

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColorTemp) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColorTemp) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var fireballElement = window.utils.setupWindowElement.querySelector('.setup-fireball-wrap');

  var onFireballElementClick = function () {
    var fireballColorElement = window.utils.getRandomElementFromArray(FIREBALL_COLORS);
    fireballElement.style.backgroundColor = fireballColorElement;
    window.utils.setupWindowElement.querySelector('input[name="fireball-color"]').value = fireballColorElement;
  };

  fireballElement.addEventListener('click', onFireballElementClick);

  //  обработчик успешной загрузки данных с сервера
  var loadSuccessHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  //  обработчик успешной отправки данных на сервер
  var saveSuccessHandler = function () {
    window.utils.setupWindowElement.classList.add('hidden');
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

  var formElement = document.querySelector('.setup-wizard-form');

  var onFormElementSubmit = function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(formElement), saveSuccessHandler, errorHandler);
  };

  //  отправка формы
  formElement.addEventListener('submit', onFormElementSubmit);
})();
