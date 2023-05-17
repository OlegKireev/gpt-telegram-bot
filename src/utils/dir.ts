const fs = require('fs');
const path = require('path');

export const createDirectoryIfNotExists = (dirName: string) => {
  const absolutePath = path.join(__dirname, dirName);
  if (!fs.existsSync(absolutePath)) {
    fs.mkdirSync(absolutePath);
  }
};
