import { session } from 'telegraf';
import { bot } from './instance';

bot.use(session());
process.once('SIGINT', () => bot.stop('Node SIGINT event'));
process.once('SIGTERM', () => bot.stop('Node SIGTERM event'));
