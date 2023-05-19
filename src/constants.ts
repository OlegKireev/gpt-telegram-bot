import path, { resolve } from 'path';
import dotenv from 'dotenv';
import { type ISession } from './definitions/telegraf';

dotenv.config();

export const ROOT = path.resolve(__dirname);

export const { PORT } = process.env;
export const { GPT_API_KEY } = process.env;
export const { TELEGRAM_BOT_TOKEN } = process.env;
export const TEMP_FILES_PATH = resolve(ROOT, 'temp');

export const INITIAL_SESSION: ISession = {
  messages: [],
};
