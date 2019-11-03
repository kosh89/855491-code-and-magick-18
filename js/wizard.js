'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var wizard = {
    onCoatChange: function (color) {
      return color;
    },
    onEyesChange: function (color) {
      return color;
    }
  };

  var wizardCoatElement = window.utils.setupWindowElement.querySelector('.setup-wizard .wizard-coat');
  var wizardEyesElement = window.utils.setupWindowElement.querySelector('.setup-wizard .wizard-eyes');

  wizardCoatElement.addEventListener('click', function () {
    var coatColor = window.utils.getRandomElementFromArray(WIZARD_COAT_COLORS);
    wizardCoatElement.style.fill = coatColor;
    window.utils.setupWindowElement.querySelector('input[name="coat-color"]').value = coatColor;

    wizard.onCoatChange(coatColor);
  });

  wizardEyesElement.addEventListener('click', function () {
    var eyesColor = window.utils.getRandomElementFromArray(WIZARD_EYES_COLORS);
    wizardEyesElement.style.fill = eyesColor;
    window.utils.setupWindowElement.querySelector('input[name="eyes-color"]').value = eyesColor;

    wizard.onEyesChange(eyesColor);
  });

  window.wizard = wizard;
})();
