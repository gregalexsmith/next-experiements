import fs from 'fs';
import path from 'path';
import { minimatch } from 'minimatch';
import { FileBase } from '../types';

export const traverseDir = (
  dirPath: string,
  ignorePatterns: string[] = [],
): FileBase[] => {
  const stack: string[] = [dirPath];
  const output: FileBase[] = [];

  while (stack.length > 0) {
    const currentPath = stack.pop()!;
    const parentPath = path.dirname(currentPath);

    if (ignorePatterns.some((pattern) => minimatch(currentPath, pattern))) {
      continue;
    }

    let type: 'file' | 'directory' = 'file';
    let children: string[] = [];

    try {
      const stat = fs.statSync(currentPath);
      if (stat.isDirectory()) {
        type = 'directory';
        children = fs
          .readdirSync(currentPath)
          .map((child) => path.join(currentPath, child));
        stack.push(...children);
      }
    } catch (error) {
      const err = error as Error;
      console.error(`Failed to read ${currentPath}: ${err.message}`);
      continue;
    }

    output.push({
      filePath: currentPath,
      displayPath: path.relative(dirPath, currentPath),
      type,
      children,
      parent: parentPath === currentPath ? null : parentPath,
    });
  }

  return output;
};
