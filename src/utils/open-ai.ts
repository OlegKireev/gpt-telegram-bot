import { Configuration, OpenAIApi } from 'openai';
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
  async chat(text: string): Promise<string> {
    return new Promise((res) => {
      res('');
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async transcript(filepath: string): Promise<string> {
    return new Promise((res) => {
      res('');
    });
  }
}
