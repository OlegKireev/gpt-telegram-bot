import { createReadStream } from 'fs';
import {
  Configuration,
  OpenAIApi,
  type ChatCompletionRequestMessage,
} from 'openai';
import { isAxiosError } from 'axios';
import { GPT_API_KEY } from '../constants';

export class OpenAI {
  _api: OpenAIApi;

  constructor() {
    const config = new Configuration({
      apiKey: GPT_API_KEY,
    });
    this._api = new OpenAIApi(config);
  }

  // eslint-disable-next-line class-methods-use-this
  async chat(messages: ChatCompletionRequestMessage[]): Promise<string> {
    try {
      const response = await this._api.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
      });

      return response.data.choices[0].message?.content || 'Я не знаю';
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response);
      }
      throw new Error(`Error while chatting, ${err}`);
    }
  }

  async transcript(filepath: string): Promise<string> {
    try {
      const file = await createReadStream(filepath);
      // @ts-expect-error
      const response = await this._api.createTranscription(file, 'whisper-1');
      return response.data.text;
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.response);
      }
      throw new Error(`Error while transcript mp3 file to text, ${err}`);
    }
  }
}
