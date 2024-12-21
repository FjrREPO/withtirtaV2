"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { LayoutDashboard, FileText, FolderKanban } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
];

const NavDashboard = () => {
  const pathname = usePathname();

  return (
    <div className="container mx-auto space-y-8 mt-10">
      <div className="bg-background shadow rounded-2xl px-5">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          </div>

          <div className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700 transition',
                  pathname == (item.href) && 'border-2 border-blue-500'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href="/" className="btn btn-outline">
              Back to Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;
