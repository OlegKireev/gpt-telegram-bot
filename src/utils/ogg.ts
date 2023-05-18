import { createWriteStream } from 'fs';
import { resolve } from 'path';
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { TEMP_FILES_PATH } from '../constants';
import { createDirectoryIfNotExists } from './dir';

class OggConverter {
  constructor() {
    ffmpeg.setFfmpegPath(installer.path);
  }

  // eslint-disable-next-line class-methods-use-this
  toMp3(inputPath: string, filename: string): Promise<string> {
    try {
      const outputPath = resolve(TEMP_FILES_PATH, `${filename}.mp3`);
      return new Promise<string>((res, rej) => {
        ffmpeg(inputPath)
          .inputOptions('-t 30')
          .output(outputPath)
          .on('end', () => res(outputPath))
          .on('error', (err) => rej(err))
          .run();
      });
    } catch (err) {
      throw new Error(`Error while converting MP3, ${err}`);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async create(url: string, filename: string): Promise<string> {
    try {
      await createDirectoryIfNotExists('../temp');
      const oggPath = resolve(TEMP_FILES_PATH, `${filename}.ogg`);
      const response = await axios.get<NodeJS.ReadableStream>(url, {
        responseType: 'stream',
      });
      return new Promise<string>((res) => {
        const stream = createWriteStream(oggPath);
        response.data.pipe(stream);
        stream.on('finish', () => res(oggPath));
      });
    } catch (err) {
      throw new Error(`Error while creating OGG, ${err}`);
    }
  }
}

export const ogg = new OggConverter();
