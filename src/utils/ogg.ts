import { createWriteStream } from 'fs';
import { resolve } from 'path';
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { TEMP_FILES_PATH } from '../constants';
import { createDirectoryIfNotExists, deleteFile } from './dir';

export class OggConverter {
  _filename: string;

  constructor(filename: string) {
    this._filename = filename;
    ffmpeg.setFfmpegPath(installer.path);
  }

  toMp3(inputPath: string): Promise<string> {
    try {
      const outputPath = resolve(TEMP_FILES_PATH, `${this._filename}.mp3`);
      return new Promise<string>((res, rej) => {
        ffmpeg(inputPath)
          .inputOptions('-t 30')
          .output(outputPath)
          .on('end', () => {
            deleteFile(inputPath);
            res(outputPath);
          })
          .on('error', (err) => rej(err))
          .run();
      });
    } catch (err) {
      throw new Error(`Error while converting MP3, ${err}`);
    }
  }

  async create(url: string): Promise<string> {
    try {
      await createDirectoryIfNotExists('../temp');
      const oggPath = resolve(TEMP_FILES_PATH, `${this._filename}.ogg`);
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
