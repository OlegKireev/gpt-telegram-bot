import fs from 'fs';
import path from 'path';

export const createDirectoryIfNotExists = (dirName: string) => {
  const absolutePath = path.join(__dirname, dirName);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath);
  }
};

export const deleteFile = async (filepath: string) => {
  await fs.unlink(filepath, (err) => {
    if (err) {
      throw err;
    }
  });
};
