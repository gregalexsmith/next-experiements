import Link from 'next/link';

export const ListLink = ({
  href,
  children,
}: {
  href: string;
  children: any;
}) => (
  <li>
    <Link href={href} className="text-blue-500 underline">
      {children}
    </Link>
  </li>
);
