'use strict';

(function () {
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = window.utils.setupWindowElement.querySelector('.setup-close');
  var SETUP_X = '50%';
  var SETUP_Y = '80px';

  //  выставляем элемент по указанным координатам
  var setElementPosition = function (elem, x, y) {
    elem.style.top = y;
    elem.style.left = x;
  };

  //  открываем окно настроек
  var showSetup = function () {
    window.utils.setupWindowElement.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);

    //  сброс положения окна настроек
    setElementPosition(window.utils.setupWindowElement, SETUP_X, SETUP_Y);
  };

  //  закрываем окно настройки
  var closeSetup = function () {
    window.utils.setupWindowElement.classList.add('hidden');
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

  setupOpenElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_CODE) {
      showSetup();
    }
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.utils.ENTER_CODE) {
      closeSetup();
    }
  });

  setupOpenElement.addEventListener('click', showSetup);
  setupCloseElement.addEventListener('click', closeSetup);

  //  перетаскивание окна
  var uploadElement = window.utils.setupWindowElement.querySelector('.upload');

  uploadElement.addEventListener('mousedown', function (evt) {
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

      window.utils.setupWindowElement.style.top = (window.utils.setupWindowElement.offsetTop - shift.y) + 'px';
      window.utils.setupWindowElement.style.left = (window.utils.setupWindowElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (moveFlag) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          uploadElement.removeEventListener('click', onClickPreventDefault);
        };

        uploadElement.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
