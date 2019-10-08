'use strict';
(function () {
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.utils = {
    ESC_CODE: 27,
    ENTER_CODE: 13,
    setupWindow: document.querySelector('.setup'),

    getRandomElementFromArray: function (array) {
      return array[getRandomInt(0, array.length - 1)];
    }
  };
})();
