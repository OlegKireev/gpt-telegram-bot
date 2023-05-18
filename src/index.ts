import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { code } from 'telegraf/format';
import { TELEGRAM_BOT_TOKEN } from './constants';
import { OggConverter } from './utils/ogg';
import { OpenAI } from './utils/open-ai';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);
const openAi = new OpenAI();

const bootstrap = () => {
  bot.launch();
};

bot.on(message('voice'), async (ctx) => {
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
    const answer = await openAi.chat(text);
    await ctx.reply(code(`Надо подумать...`));
    ctx.reply(answer);
  } catch (err) {
    console.error('Error while voice message', err);
  }
});

bot.command('start', async () => {
  'Добро пожаловать в Chat GPT voice бот.';
});
bootstrap();

process.once('SIGINT', () => bot.stop('Node SIGINT event'));
process.once('SIGTERM', () => bot.stop('Node SIGTERM event'));
