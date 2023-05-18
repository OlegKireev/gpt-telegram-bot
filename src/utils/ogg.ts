import { createWriteStream } from 'fs';
import { resolve } from 'path';
import axios from 'axios';
import { createDirectoryIfNotExists } from './dir';

class OggConverter {
  // constructor() {

  // }

  // toMp3() {

  // }

  // eslint-disable-next-line class-methods-use-this
  async create(url: string, filename: string) {
    try {
      await createDirectoryIfNotExists('../temp');
      const oggPath = resolve(__dirname, '../temp', `${filename}.ogg`);
      const response = await axios.get<NodeJS.ReadableStream>(url, {
        responseType: 'stream',
      });
      return new Promise((res) => {
        const stream = createWriteStream(oggPath);
        response.data.pipe(stream);
        stream.on('finish', () => res(oggPath));
      });
    } catch (err) {
      console.error('Error while creating OGG', err);
    }
  }
}

export const ogg = new OggConverter();
