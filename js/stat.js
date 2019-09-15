'use strict';

var STAT_WIDTH = 420;
var STAT_HEIGHT = 270;
var STAT_X = 100;
var STAT_Y = 10;
var OFFSET = 10;
var BAR_WIDTH = 50;
var CONGRATULATIONS_HEIGHT = 70;
var NAME_HEIGHT = 40;
var barHeight = STAT_HEIGHT - CONGRATULATIONS_HEIGHT - NAME_HEIGHT;

var drawStat = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, STAT_WIDTH, STAT_HEIGHT);
}

window.renderStatistics = function(ctx) {
  drawStat(ctx, STAT_X + OFFSET, STAT_Y + OFFSET, 'rgba(0, 0, 0, 0.7)');
  drawStat(ctx, STAT_X, STAT_Y, '#ffffff');

  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', STAT_X + OFFSET * 2, STAT_Y + OFFSET * 3);
  ctx.fillText('Список результатов:', STAT_X + OFFSET * 2, STAT_Y + OFFSET * 5);

  ctx.fillText('Вы', STAT_X + OFFSET * 4, STAT_HEIGHT - OFFSET);
  ctx.fillRect(STAT_X + OFFSET * 4, STAT_HEIGHT - NAME_HEIGHT, BAR_WIDTH, -barHeight);

  ctx.fillText('Иван', STAT_X + OFFSET * 4 + BAR_WIDTH + OFFSET * 4, STAT_HEIGHT - OFFSET);
  ctx.fillRect(STAT_X + OFFSET * 4 + BAR_WIDTH + OFFSET * 4, STAT_HEIGHT - NAME_HEIGHT, BAR_WIDTH, -barHeight);

  ctx.fillText('Маша', STAT_X + OFFSET * 4 + BAR_WIDTH + OFFSET * 4 + BAR_WIDTH + OFFSET * 4, STAT_HEIGHT - OFFSET);
  ctx.fillRect(STAT_X + OFFSET * 4 + BAR_WIDTH + OFFSET * 4 + BAR_WIDTH + OFFSET * 4, STAT_HEIGHT - NAME_HEIGHT, BAR_WIDTH, -barHeight);

  ctx.fillText('Катя', STAT_X + OFFSET * 4 + BAR_WIDTH + OFFSET * 4 + BAR_WIDTH + OFFSET * 4 + BAR_WIDTH + OFFSET * 4, STAT_HEIGHT - OFFSET);
  ctx.fillRect(STAT_X + OFFSET * 4 + BAR_WIDTH + OFFSET * 4 + BAR_WIDTH + OFFSET * 4 + BAR_WIDTH + OFFSET * 4, STAT_HEIGHT - NAME_HEIGHT, BAR_WIDTH, -barHeight);
}
