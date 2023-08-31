import React from 'react';

import type { NextPage } from "next";
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { prisma } from '@/server/db';

import ProductDataTable from './components/ProductDataTable';

interface IProps {
  searchParams: {
    page: string;
  };
}

const take = 10;

const Page: NextPage<IProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const [products, allProductsCount] = await prisma.$transaction([
    prisma.product.findMany({
      include: {
        Media: true,
        Category: {
          select: {
            name: true,
          },
        },
      },
      take,
      skip: page * take || 1,
    }),
    prisma.product.count(),
  ]);

  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl">Products Listing</h3>
      <div className="relative flex w-full flex-col gap-8 rounded-md bg-[#f5f8fa] p-5 dark:bg-[#1e1e2d]">
        <div className="flex items-center justify-between">
          <div>
            <Label className="sr-only" htmlFor="search">
              Search Bar
            </Label>
            <Input className="w-auto" id="search" />
          </div>

          <div className="flex items-center justify-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="">
                <Button>Action</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="">Export</Button>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-220px)] w-full overflow-x-auto">
          <ProductDataTable products={products} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex items-center justify-between">
          <Link
            className={buttonVariants()}
            href={`/products?page=${page <= 1 ? 1 : page - 1}`}
          >
            Previous
          </Link>
          <Link
            className={buttonVariants()}
            href={`/products?page=${
              allProductsCount > page * take + take ? page + 1 : page
            }`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
