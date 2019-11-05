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
  var onShowSetupElementClick = function () {
    window.utils.setupWindowElement.classList.remove('hidden');
    document.addEventListener('keydown', onSetupEscPress);

    //  сброс положения окна настроек
    setElementPosition(window.utils.setupWindowElement, SETUP_X, SETUP_Y);
  };

  //  закрываем окно настройки
  var onCloseSetupElementClick = function () {
    window.utils.setupWindowElement.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
  };

  //  нажатие ESC в окне настройки
  var onSetupEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_CODE) {
      if (evt.target.classList.contains('setup-user-name')) {
        return;
      }
      onCloseSetupElementClick();
    }
  };

  //  нажатие Enter по элементу открытия окна настроек
  var onSetupOpenEnterPress = function (evt) {
    if (evt.keyCode === window.utils.ENTER_CODE) {
      onShowSetupElementClick();
    }
  };

  //  нажатие Enter по элементу закрытия окна настроек
  var onSetupCloseEnterPress = function (evt) {
    if (evt.keyCode === window.utils.ENTER_CODE) {
      onCloseSetupElementClick();
    }
  };

  setupOpenElement.addEventListener('click', onShowSetupElementClick);
  setupOpenElement.addEventListener('keydown', onSetupOpenEnterPress);
  setupCloseElement.addEventListener('click', onCloseSetupElementClick);
  setupCloseElement.addEventListener('keydown', onSetupCloseEnterPress);

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
