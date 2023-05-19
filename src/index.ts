/* eslint-disable no-param-reassign */
import { code } from 'telegraf/format';
import { INITIAL_SESSION } from './constants';
import { bot } from './instance';
import './config';
import './events/voice';

bot.command('start', async (ctx) => {
  ctx.session = INITIAL_SESSION;
  ctx.reply('Добро пожаловать в Chat GPT voice бот.');
});

bot.command('new', async (ctx) => {
  ctx.session = INITIAL_SESSION;
  ctx.reply(code('Я забыл о чем мы говорили прежде'));
});

const bootstrap = () => {
  bot.launch();
};

bootstrap();
