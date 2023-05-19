import { code } from 'telegraf/format';
import { INITIAL_SESSION } from '../constants';
import { bot } from '../instance';

export const reset = bot.command('reset', async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session = INITIAL_SESSION;
  ctx.reply(code('Я забыл о чем мы говорили прежде'));
});
