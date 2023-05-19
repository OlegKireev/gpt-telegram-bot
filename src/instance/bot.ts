import { Telegraf } from 'telegraf';
import { TELEGRAM_BOT_TOKEN } from '../constants';
import { type ISessionContext } from '../definitions/telegraf';

export const bot = new Telegraf<ISessionContext>(TELEGRAM_BOT_TOKEN);
