import { code } from 'telegraf/format';
import { message } from 'telegraf/filters';
import { INITIAL_SESSION } from '../constants';
import { bot, openAi } from '../instance';

export const text = bot.on(message('text'), async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session ??= INITIAL_SESSION;
  try {
    const userMessage = await ctx.message.text;
    const { messages } = ctx.session;
    messages.push({
      content: userMessage,
      role: 'user',
    });

    await ctx.reply(code(`Надо подумать...`));
    const answer = await openAi.chat(ctx.session.messages);

    messages.push({
      role: 'assistant',
      content: answer,
    });
    ctx.reply(answer);
  } catch (err) {
    console.error('Error while voice message', err);
  }
});
