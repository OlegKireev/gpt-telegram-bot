import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import { TELEGRAM_BOT_TOKEN } from './constants';
import { OggConverter } from './utils/ogg';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

const bootstrap = () => {
  bot.launch();
  console.log('Bot started!');
};

bot.on(message('voice'), async (ctx) => {
  try {
    const userId = String(ctx.message.from.id);
    const fileId = ctx.message.voice.file_id;
    const link = (await ctx.telegram.getFileLink(fileId)).href;
    const ogg = new OggConverter(userId);
    const oggPath = await ogg.create(link);
    const mp3Path = await ogg.toMp3(oggPath);
    ctx.reply(mp3Path);
  } catch (err) {
    console.error('Error while voice message', err);
  }
});

bot.command('start', async (ctx) => {
  'Добро пожаловать в Chat GPT voice бот.';
});
bootstrap();

process.once('SIGINT', () => bot.stop('Node SIGINT event'));
process.once('SIGTERM', () => bot.stop('Node SIGTERM event'));
