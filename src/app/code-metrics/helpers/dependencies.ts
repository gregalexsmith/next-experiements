import fs from 'fs';
import path from 'path';
import { FileBase } from '../types';

/**
 * A hacky way of determining depenedent files.
 * - looks for import statements in the file
 * - if the import statement contains a relative path, it is considered a dependent file
 */
export const getNumberOfDependentFiles = (
  targetFile: string,
  allFiles: FileBase[],
): number => {
  let dependentFiles = 0;

  allFiles.forEach(({ filePath }) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const regex = /import .* from ['"](.+)['"];/g;
    let match;

    while ((match = regex.exec(fileContent)) !== null) {
      const importString = match[1];
      if (!importString.includes('.')) {
        continue;
      }

      const importedFile = path.join(path.dirname(filePath), match[1]);
      const targetWithoutExtension = targetFile.replace(/\.[^/.]+$/, '');

      if (importedFile === targetWithoutExtension) {
        dependentFiles++;
      }
    }
  });

  return dependentFiles;
};
