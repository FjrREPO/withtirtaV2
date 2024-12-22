"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Menu,
  LayoutDashboard,
  FileText,
  FolderKanban,
  User,
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
];

const NavDashboard = () => {
  const pathname = usePathname();

  interface MenuItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  const NavLink = ({ item, isMobile = false }: { item: MenuItem; isMobile?: boolean }) => (
    <Link
      href={item.href}
      className={`
        flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200
        ${pathname === item.href
          ? 'bg-primary/10 text-primary hover:bg-primary/15'
          : 'text-gray-600 hover:bg-gray-100'
        }
        ${isMobile ? 'w-full text-lg' : 'text-sm font-medium'}
      `}
    >
      <item.icon className={`${isMobile ? 'h-5 w-5' : 'h-4 w-4'}`} />
      <span>{item.label}</span>
      {item.label === 'Articles' && (
        <Badge className="ml-auto bg-primary/10 text-primary hover:bg-primary/15">New</Badge>
      )}
    </Link>
  );

  return (
    <div className="container mx-auto space-y-8 mt-10">
      <div className="bg-background shadow rounded-2xl px-5">
        <div className="border-b">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="hidden md:flex gap-2"
                  >
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">Admin</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    <nav className="flex flex-col gap-2">
                      {menuItems.map((item) => (
                        <NavLink key={item.href} item={item} isMobile={true} />
                      ))}
                    </nav>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start gap-3">
                        <User className="h-5 w-5" />Profile
                      </Button>
                      <Button variant="outline" className="w-full justify-start gap-3">
                        <Settings className="h-5 w-5" />Settings
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3 text-red-600 hover:text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />Log out
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavDashboard;