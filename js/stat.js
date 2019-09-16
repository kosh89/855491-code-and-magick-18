'use strict';

var STAT_WIDTH = 420;
var STAT_HEIGHT = 270;
var STAT_X = 100;
var STAT_Y = 10;
var OFFSET = 10;
var BIG_OFFSET = 50;
var RESULT_OFFSET = 10;
var BAR_WIDTH = 40;
var CONGRATULATIONS_HEIGHT = 70;
var NAME_HEIGHT = 50;
var barHeight = STAT_HEIGHT - CONGRATULATIONS_HEIGHT - NAME_HEIGHT;

var drawStat = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, STAT_WIDTH, STAT_HEIGHT);
}

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

window.renderStatistics = function (ctx, players, times) {
  drawStat(ctx, STAT_X + OFFSET, STAT_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
  drawStat(ctx, STAT_X, STAT_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', STAT_X + BIG_OFFSET, STAT_Y + OFFSET * 3);
  ctx.fillText('Список результатов:', STAT_X + BIG_OFFSET, STAT_Y + OFFSET * 5);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(players[i], STAT_X + BIG_OFFSET + (BAR_WIDTH + BIG_OFFSET) * i, STAT_Y + STAT_HEIGHT - OFFSET * 2);
    ctx.fillText(Math.floor(times[i]), STAT_X + BIG_OFFSET + (BAR_WIDTH + BIG_OFFSET) * i, STAT_Y + STAT_HEIGHT - NAME_HEIGHT - (barHeight * times[i] / maxTime));

    //определение цвета гистограммы
    players[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1' : ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 101) + '%, 50%)';

    ctx.fillRect(STAT_X + BIG_OFFSET + (BAR_WIDTH + BIG_OFFSET) * i, STAT_HEIGHT + STAT_Y - NAME_HEIGHT, BAR_WIDTH, (-barHeight * times[i]) / maxTime + RESULT_OFFSET);
  }
}
