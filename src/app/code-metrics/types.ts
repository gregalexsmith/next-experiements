export type FileBase = {
  filePath: string;
  displayPath: string;
  type: 'file' | 'directory';
  children: string[];
  parent: string | null;
};

export type FileWithMetrics = FileBase & {
  lineCount: number;
  characterCount: number;
  numberOfCommits: number;
  numberOfDependentFiles: number;
};
