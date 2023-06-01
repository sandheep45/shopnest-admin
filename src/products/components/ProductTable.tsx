import Image from "next/image"
import React from "react"

import { Media, Product } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
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
    header: () => <Checkbox />,
    cell: ({ row }) => <Checkbox />,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Product Name</div>,
    cell: (info) => (
      <div className="flex items-center gap-4 font-medium w-48">
        <Image
          width={50}
          height={50}
          alt="user-image"
          src={info.row.original.Media?.url as string}
          className="rounded-md"
        />
        <span className="truncate">{info.row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium w-64 md:w-auto">{row.original.description}</div>
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
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium flex gap-3">
        <Button onClick={() => alert(row.original.id)} variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
]

const ProductTable: React.FC<ITableProps> = ({ products }) => {
  return <DataTable columns={columns} data={products} />
}

export default ProductTable
