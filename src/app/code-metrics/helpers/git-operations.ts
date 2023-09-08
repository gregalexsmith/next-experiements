import { execSync } from 'child_process';

/**
 * Gets the number of commits in history for a given file path.
 */
export const getNumberOfCommits = (filePath: string): number => {
  try {
    const stdout = execSync(`git log --pretty=oneline ${filePath}`, {
      encoding: 'utf-8',
    });
    const commits = stdout.split('\n').filter((line) => line.trim() !== '');
    return commits.length;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Failed to get commit history: ${error.message}`);
  }
};
