import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Routes } from "@blitzjs/next"
import { Media, Product } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/core/components/common/DropdownMenu"
import StarRating from "@src/core/components/common/StarRating"
import StatusBadge from "@src/core/components/global/StatusBadge"
import { ColumnDef } from "@tanstack/react-table"

interface IProduct extends Product {
  Media: Media | null
  Category: {
    name: string
  } | null
}

interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
  products: IProduct[]
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
          src={info.row.original.Media?.url as string}
          className="rounded-md"
        />
        <Link
          href={Routes.EditProductPage({ productId: info.row.original.id })}
          className="truncate"
        >
          {info.row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium w-64 xl:w-auto">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Category</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.original.Category?.name}</div>,
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
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mx-5">
          <Button>Action</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link
              href={Routes.EditProductPage({ productId: row.original.id })}
              className="truncate"
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const ProductTable: React.FC<ITableProps> = ({ products }) => {
  return <DataTable columns={columns} data={products} />
}

export default ProductTable
