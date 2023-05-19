import { code } from 'telegraf/format';
import { message } from 'telegraf/filters';
import { OggConverter } from '../classes/ogg';
import { INITIAL_SESSION } from '../constants';
import { bot, openAi } from '../instance';

export const voice = bot.on(message('voice'), async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session ??= INITIAL_SESSION;
  try {
    await ctx.reply(code('Загрузка...'));
    const userId = String(ctx.message.from.id);
    const fileId = ctx.message.voice.file_id;
    const link = (await ctx.telegram.getFileLink(fileId)).href;
    const ogg = new OggConverter(userId);

    const oggPath = await ogg.create(link);
    const mp3Path = await ogg.toMp3(oggPath);

    const text = await openAi.transcript(mp3Path);
    await ctx.reply(code(`Твой запрос: ${text}`));
    await ogg.deleteFile('mp3');

    const { messages } = ctx.session;
    messages.push({
      content: text,
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
