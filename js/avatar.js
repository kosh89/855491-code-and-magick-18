'use strict';

(function () {
  var FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png'];

  var uploadFileElement = document.querySelector('.upload input[type=file]');
  var avatarImgElement = document.querySelector('.setup-user-pic');

  uploadFileElement.addEventListener('change', function () {
    var file = uploadFileElement.files[0];


    if (file) {
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          avatarImgElement.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    }
  });
})();
