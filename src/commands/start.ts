import { bot } from '../instance';

export const start = bot.command('start', async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session = { messages: [] };
});
