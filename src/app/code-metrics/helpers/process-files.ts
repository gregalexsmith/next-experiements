import fs from 'fs';
import { FileBase, FileWithMetrics } from '../types';
import { getNumberOfDependentFiles } from './dependencies';
import { getNumberOfCommits } from './git-operations';

const processFileMetrics = async (filePath: string, allFiles: FileBase[]) => {
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  return {
    lineCount: fileContents.split('\n').length,
    characterCount: fileContents.length,
    numberOfCommits: getNumberOfCommits(filePath),
    numberOfDependentFiles: getNumberOfDependentFiles(filePath, allFiles),
  };
};

export const processFiles = (files: FileBase[]): Promise<FileWithMetrics[]> => {
  return Promise.all(
    files.map(async (file) => {
      const metrics = await processFileMetrics(file.filePath, files);
      return {
        ...file,
        ...metrics,
      };
    }),
  );
};
