/* eslint-disable no-param-reassign */
import { session } from 'telegraf';
import { code } from 'telegraf/format';
import { INITIAL_SESSION } from './constants';
import { bot } from './instance';
import './events/voice';

bot.use(session());

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

process.once('SIGINT', () => bot.stop('Node SIGINT event'));
process.once('SIGTERM', () => bot.stop('Node SIGTERM event'));
