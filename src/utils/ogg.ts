import { createWriteStream } from 'fs';
import { resolve } from 'path';
import axios from 'axios';
import ffmpeg from 'fluent-ffmpeg';
import installer from '@ffmpeg-installer/ffmpeg';
import { TEMP_FILES_PATH } from '../constants';
import { createDirectoryIfNotExists, deleteFile } from './dir';

export class OggConverter {
  private _filename: string;

  private _oggFilePath: string;

  private _mp3FilePath: string;

  constructor(filename: string) {
    this._filename = filename;
    this._oggFilePath = resolve(TEMP_FILES_PATH, `${filename}.ogg`);
    this._mp3FilePath = resolve(TEMP_FILES_PATH, `${filename}.mp3`);
    ffmpeg.setFfmpegPath(installer.path);
  }

  toMp3(inputPath: string): Promise<string> {
    try {
      this._oggFilePath = inputPath;
      return new Promise<string>((res, rej) => {
        ffmpeg(inputPath)
          .inputOptions('-t 30')
          .output(this._mp3FilePath)
          .on('end', () => {
            this.deleteFile('ogg');
            res(this._mp3FilePath);
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
      const response = await axios.get<NodeJS.ReadableStream>(url, {
        responseType: 'stream',
      });
      return new Promise<string>((res) => {
        const stream = createWriteStream(this._oggFilePath);
        response.data.pipe(stream);
        stream.on('finish', () => res(this._oggFilePath));
      });
    } catch (err) {
      throw new Error(`Error while creating OGG, ${err}`);
    }
  }

  async deleteFile(file: 'ogg' | 'mp3') {
    const filename = `_${file}FilePath` as const;
    deleteFile(this[filename]);
  }
}
