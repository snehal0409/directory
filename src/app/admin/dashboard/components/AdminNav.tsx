'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import React from 'react';

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-4 space-x-4">
      <Link
        className={clsx(pathname === "/admin/admins" && 'font-bold')}
        href="/admin/admins"
      >
        Admins
      </Link>
      <Link
        className={clsx(pathname === '/admin/categories' && 'font-bold')}
        href="/admin/categories"
      >
        Categories
      </Link>
      <Link
        className={clsx(pathname === '/admin/subcategories' && 'font-bold')}
        href="/admin/subcategories"
      >
        Subcategories
      </Link>
      <Link
        className={clsx(pathname === '/admin/users' && 'font-bold')}
        href="/admin/users"
      >
        Users
      </Link>
      <Link
        className={clsx(pathname === '/admin/items' && 'font-bold')}
        href="/admin/items"
      >
        Items
      </Link>
    
    </nav>
  );
}
