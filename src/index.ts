import { Telegraf } from 'telegraf';
import { TELEGRAM_BOT_TOKEN } from './constants';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const bootstrap = () => {
  bot.launch();
  console.log('Bot started!');
};

bootstrap();

process.once('SIGINT', () => bot.stop('Node SIGINT event'));
process.once('SIGTERM', () => bot.stop('Node SIGTERM event'));
