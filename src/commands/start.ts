import { bot } from '../instance';

export const start = bot.command('start', async (ctx) => {
  // eslint-disable-next-line no-param-reassign
  ctx.session = { messages: [] };
  ctx.reply(
    'Привет! Я рад приветствовать тебя в моем чате. Я ChatGPT бот, и я здесь, чтобы помочь тебе найти ответы на вопросы и поддержать тебя в любых ситуациях. Давай начнем наше общение! Для того чтобы я забыл предыдущие сообщения выбери команду /reset в меню',
  );
});
