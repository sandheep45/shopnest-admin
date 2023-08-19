"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/ui/data-table';
import StarRating from '@/components/utils/StarRating';
import StatusBadge from '@/components/utils/StatusBadge';
import TableAction from '@/components/utils/TableAction';
import type { Media, Product } from '@prisma/client';
import type { ColumnDef } from '@tanstack/react-table';

export interface IProduct extends Product {
  Media: Media | null;
  Category: {
    name: string;
  } | null;
}

interface IProductDataTableProps
  extends React.HTMLAttributes<HTMLTableElement> {
  products: IProduct[];
}

export const columns: ColumnDef<IProduct>[] = [
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
    header: () => <div className="text-center">Product Name</div>,
    cell: (info) => (
      <div className="flex items-center gap-4 font-medium w-48 lg:w-auto">
        <Image
          width={50}
          height={50}
          alt="user-image"
          src={info.row.original.Media!.url}
          className="rounded-md"
        />
        <Link href={`/products/${info.row.original.id}`} className="truncate">
          {info.row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium w-64 xl:w-auto">
        {row.original.description}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.original.Category?.name}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-center">Rating</div>,
    cell: (info) => (
      <div className="text-center font-medium">
        <StarRating count={info.row.original.rating} />
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
    cell: ({ row }) => <TableAction type="products" row={row} />,
  },
];

const ProductDataTable: React.FC<IProductDataTableProps> = ({ products }) => {
  return <DataTable columns={columns} data={products} />;
};

export default ProductDataTable;
