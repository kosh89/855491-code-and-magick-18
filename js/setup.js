'use strict';

(function () {
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = window.utils.setupWindow.querySelector('.setup-close');
  var SETUP_X = '50%';
  var SETUP_Y = '80px';

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


  //  выставляем элемент по указанным координатам
  var setElementPosition = function (elem, x, y) {
    elem.style.top = y;
    elem.style.left = x;
  };

  //  открываем окно настроек
  var showSetup = function () {
    window.utils.setupWindow.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);

    //  сброс положения окна настроек
    setElementPosition(window.utils.setupWindow, SETUP_X, SETUP_Y);
  };

  //  закрываем окно настройки
  var closeSetup = function () {
    window.utils.setupWindow.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  };

  //  нажатие ESC в ркне настройки
  var onSetupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_CODE) {
      if (evt.target.classList.contains('setup-user-name')) {
        return;
      }
      closeSetup();
    }
  };

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_CODE) {
      showSetup();
    }
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_CODE) {
      closeSetup();
    }
  });

  setupOpen.addEventListener('click', showSetup);
  setupClose.addEventListener('click', closeSetup);

  //  изменение персонажа
  var wizardCoat = window.utils.setupWindow.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = window.utils.setupWindow.querySelector('.setup-wizard .wizard-eyes');
  var fireball = window.utils.setupWindow.querySelector('.setup-fireball-wrap');

  var changeCoatColor = function () {
    var coatColor = window.utils.getRandomElementFromArray(window.generateWizards.WIZARD_COAT_COLORS);
    wizardCoat.style.fill = coatColor;
    window.utils.setupWindow.querySelector('input[name="coat-color"]').value = coatColor;
  };

  var changeEyesColor = function () {
    var eyesColor = window.utils.getRandomElementFromArray(window.generateWizards.WIZARD_EYES_COLORS);
    wizardEyes.style.fill = eyesColor;
    window.utils.setupWindow.querySelector('input[name="eyes-color"]').value = eyesColor;
  };

  var changeFireballColor = function () {
    var fireballColor = window.utils.getRandomElementFromArray(FIREBALL_COLORS);
    fireball.style.backgroundColor = fireballColor;
    window.utils.setupWindow.querySelector('input[name="fireball-color"]').value = fireballColor;
  };

  wizardCoat.addEventListener('click', changeCoatColor);
  wizardEyes.addEventListener('click', changeEyesColor);
  fireball.addEventListener('click', changeFireballColor);

  //  перетаскивание окна
  var upload = window.utils.setupWindow.querySelector('.upload');

  upload.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var moveFlag = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      moveFlag = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.utils.setupWindow.style.top = (window.utils.setupWindow.offsetTop - shift.y) + 'px';
      window.utils.setupWindow.style.left = (window.utils.setupWindow.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (moveFlag) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          upload.removeEventListener('click', onClickPreventDefault);
        };

        upload.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
