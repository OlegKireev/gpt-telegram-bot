import { type ChatCompletionRequestMessage } from 'openai';
import { type Context } from 'telegraf';

export interface ISession {
  messages: ChatCompletionRequestMessage[];
}

export interface ISessionContext extends Context {
  session: ISession;
}
