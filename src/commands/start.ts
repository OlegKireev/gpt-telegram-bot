import { INITIAL_SESSION } from '../constants';
import { bot } from '../instance';

export const start = bot.command('start', async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session = INITIAL_SESSION;
  ctx.reply('Добро пожаловать в Chat GPT voice бот.');
});
