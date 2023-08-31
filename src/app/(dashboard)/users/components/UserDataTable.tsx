"use client";

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { ColumnDef } from '@tanstack/react-table';

import type { Media, User } from '@prisma/client';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import TableAction from '@/components/utils/TableAction';

import formatDate from '@/lib/date-formator';

interface IUser extends User {
  Media: Media | null;
}

interface IUserDataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  users: IUser[];
}

export const columns: ColumnDef<IUser>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        aria-label="select-all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="mx-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`select-user-${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="mx-3"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Person Name</div>,
    cell: (info) => (
      <div className="flex w-36 items-center gap-4 font-medium lg:w-auto">
        <Image
          width={50}
          height={50}
          alt="user-image"
          src={info.row.original.Media!.url}
          className="rounded-md"
        />
        <Link href={`/users/${info.row.original.id}`} className="truncate">
          {info.row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="truncate text-center font-medium">
        {row.getValue("email")}
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: (info) => (
      <div className="text-center font-medium">{info.row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ row }) => (
      <div className="w-36 text-center font-medium xl:w-auto">
        {formatDate(row.original.createdAt)}
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center"></div>,
    cell: ({ row }) => <TableAction type="users" row={row} />,
  },
];

const UserDataTable: React.FC<IUserDataTableProps> = ({ users }) => {
  return <DataTable columns={columns} data={users} />;
};

export default UserDataTable;
