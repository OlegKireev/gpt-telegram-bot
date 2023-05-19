import path, { resolve } from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const ROOT = path.resolve(__dirname);
export const TEMP_FILES_PATH = resolve(ROOT, 'temp');

export const { PORT } = process.env;
export const { GPT_API_KEY } = process.env;
export const { TELEGRAM_BOT_TOKEN } = process.env;
