/* eslint-disable no-param-reassign */
import { type Context, Telegraf, session } from 'telegraf';
import { message } from 'telegraf/filters';
import { code } from 'telegraf/format';
import { type ChatCompletionRequestMessage } from 'openai';
import { TELEGRAM_BOT_TOKEN } from './constants';
import { OggConverter } from './utils/ogg';
import { OpenAI } from './utils/open-ai';

interface ISessionContext extends Context {
  session: {
    messages: ChatCompletionRequestMessage[];
  };
}

const INITIAL_SESSION = {
  messages: [],
};

const bot = new Telegraf<ISessionContext>(TELEGRAM_BOT_TOKEN);
const openAi = new OpenAI();

bot.use(session());

bot.on(message('voice'), async (ctx) => {
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
