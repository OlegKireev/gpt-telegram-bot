export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      GPT_API_KEY: string;
      TELEGRAM_BOT_TOKEN: string;
    }
  }
}
