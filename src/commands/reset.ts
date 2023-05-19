import { code } from 'telegraf/format';
import { bot } from '../instance';

export const reset = bot.command('reset', async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session = { messages: [] };
  ctx.reply(code('Я забыл о чем мы говорили прежде'));
});
