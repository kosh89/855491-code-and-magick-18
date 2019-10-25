'use strict';

(function () {
  var SAVE_URL = 'https://js.dump.academy/code-and-magick';
  var SEND_URL = 'https://js.dump.academy/code-and-magick/data';

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        if (xhr.statusText !== 200) {
          onError('Произошла ошибка соединения');
        }
      });

      xhr.addEventListener('timeout', function () {
        if (xhr.statusText !== 200) {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        }
      });

      xhr.timeout = 10000;

      xhr.open('GET', SEND_URL);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        if (xhr.statusText !== 200) {
          onError('Произошла ошибка соединения');
        }
      });

      xhr.addEventListener('timeout', function () {
        if (xhr.statusText !== 200) {
          onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
        }
      });

      xhr.timeout = 10000;

      xhr.open('POST', SAVE_URL);
      xhr.send(data);
    }
  };
})();
