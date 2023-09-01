import fs from 'fs';
import { constants } from 'fs/promises';
import path from 'path';

export interface FileFolderInfo {
  name: string;
  path: string;
  size: number;
  type: 'file' | 'directory';
}

const getFileSize = (filePath: string): number => {
  const stat = fs.statSync(filePath);
  return stat.size;
};

const getDirectorySize = (dirPath: string): number => {
  let size = 0;
  try {
    fs.accessSync(dirPath, constants.R_OK);
  } catch (error) {
    return 0;
  }
  const list = fs.readdirSync(dirPath);

  for (const file of list) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      size += getDirectorySize(filePath);
    } else {
      size += stat.size;
    }
  }

  return size;
};

export const scanDirectory = (rootPath: string): FileFolderInfo[] => {
  const results: FileFolderInfo[] = [];

  try {
    fs.accessSync(rootPath);
  } catch (error) {
    return results;
  }

  const list = fs.readdirSync(rootPath);
  for (const item of list) {
    const itemPath = path.join(rootPath, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      results.push({
        name: item,
        path: itemPath,
        size: getDirectorySize(itemPath),
        type: 'directory',
      });
    } else {
      results.push({
        name: item,
        path: itemPath,
        size: getFileSize(itemPath),
        type: 'file',
      });
    }
  }

  return results.sort((a, b) => b.size - a.size);
};
