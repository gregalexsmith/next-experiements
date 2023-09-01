import { headers } from 'next/headers';

export const usePathname = () => {
  const headersList = headers();
  const pathname = headersList.get('x-invoke-path') || '';
  return pathname;
};
