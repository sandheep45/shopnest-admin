import Image from "next/image"
import React from "react"

import { Media, Product } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
import { ColumnDef } from "@tanstack/react-table"

interface IProduct extends Product {
  Media: Media | null
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
    header: () => <div className="text-center">Category Name</div>,
    cell: (info) => (
      <div className="flex items-center gap-4 font-medium">
        <Image
          width={50}
          height={50}
          alt="user-image"
          src={info.row.original.Media?.url as string}
          className="rounded-md"
        />
        {info.row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: () => <div className="text-center">Role</div>,
    cell: (info) => <div className="text-center font-medium">{info.row.getValue("role")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => <div className="text-center font-medium">{row.getValue("status")}</div>,
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
