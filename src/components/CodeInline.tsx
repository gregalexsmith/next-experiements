import { ReactNode } from 'react';

export const CodeInline = ({ children }: { children: ReactNode }) => (
  <code className="bg-gray-200 rounded-md px-1">{children}</code>
);
