import React from 'react';

import { type NextPage } from 'next';
import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { prisma } from '@/server/db';

import UserDataTable from './components/UserDataTable';

interface IProps {
  searchParams: {
    page: string;
  };
}

const take = 10;

const Page: NextPage<IProps> = async ({ searchParams }) => {
  const page = Number(searchParams.page) || 1;
  const [users, allUsersCount] = await prisma.$transaction([
    prisma.user.findMany({
      include: {
        Media: true,
      },
      take,
      skip: page * take || 1,
    }),
    prisma.user.count(),
  ]);

  return (
    <div className="flex flex-col gap-6 w-full">
      <h3 className="text-2xl">Users Listing</h3>
      <div className="flex flex-col gap-8 w-full relative dark:bg-[#1e1e2d] p-5 rounded-md bg-[#f5f8fa]">
        <div className="flex justify-between items-center">
          <Input className="w-auto" />

          <div className="flex gap-3 items-center justify-center">
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
          <UserDataTable users={users} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex items-center justify-between">
          <Link
            className={buttonVariants()}
            href={`/users?page=${page <= 1 ? 1 : page - 1}`}
          >
            Previous
          </Link>
          <Link
            className={buttonVariants()}
            href={`/users?page=${
              allUsersCount > page * take + take ? page + 1 : page
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
