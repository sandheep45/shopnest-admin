"use client";

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import LogoImageFull from '../utils/LogoImage';

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: "/svg/dashboard-icon.svg",
  },
  {
    name: "Users",
    path: "/users?page=1",
    icon: "/svg/person-icon.svg",
  },
  {
    name: "Categories",
    path: "/categories?page=1",
    icon: "/svg/group-icon.svg",
  },
  {
    name: "Add Category",
    path: "/categories/new",
    icon: "/svg/add-category-icon.svg",
  },
  {
    name: "Products",
    path: "/products?page=1",
    icon: "/svg/projector-icon.svg",
  },
  {
    name: "Add Product",
    path: "/products/new",
    icon: "/svg/add-product-icon.svg",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="relative">
      <aside className="hidden md:block w-56 lg:w-64 dark:bg-[#1e1e2d] dark:text-gray-500 h-screen border-r dark:border-gray-500 border-dashed">
        <LogoImageFull />
        <nav className="p-5 flex flex-col w-full gap-5">
          {routes.map((route) => {
            return (
              <Link
                href={route.path}
                key={route.name}
                className={cn(
                  "transition-all duration-100 flex items-center gap-3 px-5 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300",
                  pathname === route.path.split("?")[0] &&
                    "bg-gray-200 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-800 dark:text-gray-300 shadow-lg"
                )}
              >
                <Image
                  className="invert[0.5] dark:invert-[0.8] sepia-[0.6] saturate-50 hue-rotate-60"
                  alt="icon"
                  src={route.icon}
                  height={20}
                  width={20}
                />
                <span>{route.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
      <Sheet>
        <SheetTrigger className="absolute top-4 left-4 z-20 md:hidden dark:text-gray-500">
          <HamburgerMenuIcon className="h-7 w-7" />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-fit">
          <aside className="p-2 w-56 dark:text-gray-500 h-screen transition-all duration-300">
            <LogoImageFull />
            <nav className="flex flex-col w-full gap-5">
              {routes.map((route) => {
                return (
                  <Link
                    href={route.path}
                    key={route.name}
                    className={cn(
                      "transition-all duration-100 flex items-center gap-3 px-5 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-900 dark:hover:text-gray-300",
                      pathname === route.path &&
                        "bg-gray-200 hover:bg-gray-200 dark:bg-gray-800 hover:dark:bg-gray-800 dark:text-gray-300 shadow-lg"
                    )}
                  >
                    <Image
                      className="invert[0.5] dark:invert-[0.8] sepia-[0.6] saturate-50 hue-rotate-60"
                      alt="icon"
                      src={route.icon}
                      height={20}
                      width={20}
                    />
                    <span>{route.name}</span>
                  </Link>
                );
              })}
            </nav>
          </aside>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;
