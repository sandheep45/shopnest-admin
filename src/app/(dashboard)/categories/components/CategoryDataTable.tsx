"use client";

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import type { ColumnDef } from '@tanstack/react-table';

import type { Category, Media } from '@prisma/client';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import StatusBadge from '@/components/utils/StatusBadge';
import TableAction from '@/components/utils/TableAction';

interface ICategory extends Category {
  Media: Media | null;
}

interface ICategoryDataTableProps
  extends React.HTMLAttributes<HTMLTableElement> {
  categories: ICategory[];
}

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="mx-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="mx-3"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Category Name</div>,
    cell: (info) => (
      <div className="flex w-32 lg:w-auto items-center gap-4 font-medium">
        <Image
          width={50}
          height={50}
          alt="user-image"
            src={info.row.original.Media!.url}
          className="rounded-md"
        />
        <Link href={`/categories/${info.row.original.id}`} className="truncate">
          {info.row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: (info) => (
      <div className="text-center font-medium w-64 lg:w-auto">
        {info.row.original.description}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center"></div>,
    cell: ({ row }) => <TableAction type="categories" row={row} />,
  },
];

const CategoryDataTable: React.FC<ICategoryDataTableProps> = ({
  categories,
}) => {
  return <DataTable columns={columns} data={categories} />;
};

export default CategoryDataTable;
