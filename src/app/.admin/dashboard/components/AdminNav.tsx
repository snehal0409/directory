// src/app/.admin/dashboard/components/AdminNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';

const navLinks = [
  { href: '/.admin/dashboard', label: 'Dashboard' },
  { href: '/.admin/admins', label: 'Manage Admins' },
  { href: '/.admin/categories', label: 'Manage Categories' },
  { href: '/.admin/subcategories', label: 'Manage Subcategories' },
  { href: '/.admin/profile', label: 'My Profile' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-4 mb-6 border-b pb-2 text-sm font-medium text-gray-600">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            'hover:text-black',
            pathname === link.href && 'text-black underline font-semibold'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
