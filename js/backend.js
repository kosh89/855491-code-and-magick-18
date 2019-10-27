'use strict';

(function () {
  var API_URL = 'https://js.dump.academy/code-and-magick/';

  var request = function (url, method, data, onLoad, onError) {
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

    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      request(API_URL + 'data', 'GET', null, onLoad, onError);
    },

    save: function (data, onLoad, onError) {
      request(API_URL, 'POST', data, onLoad, onError);
    }
  };
})();
