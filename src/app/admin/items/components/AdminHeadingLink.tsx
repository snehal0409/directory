'use client';

import Link from 'next/link';

interface Props {
  title: string;
  href: string;
  linkText: string;
}

export default function AdminHeadingLink({ title, href, linkText }: Props) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link href={href} className="text-blue-600 hover:underline">{linkText}</Link>
    </div>
  );
}
