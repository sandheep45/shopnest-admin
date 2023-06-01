import Image from "next/image"
import React from "react"

import { Category, Media } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
import StatusBadge from "@src/core/components/global/StatusBadge"
import { ColumnDef } from "@tanstack/react-table"

interface ICategory extends Category {
  Media: Media | null
}

interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
  categories: ICategory[]
}

export const columns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "id",
    header: () => <Checkbox />,
    cell: ({ row }) => <Checkbox />,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Category Name</div>,
    cell: (info) => (
      <div className="flex w-32 md:w-auto items-center gap-4 font-medium">
        <Image
          width={50}
          height={50}
          alt="user-image"
          src={info.row.original.Media?.url as string}
          className="rounded-md"
        />
        <span className="trunate">{info.row.getValue("name")}</span>
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Description</div>,
    cell: (info) => (
      <div className="text-center font-medium w-64 md:w-auto">{info.row.original.description}</div>
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
        <Button className="mx-auto" onClick={() => alert(row.original.id)} variant="destructive">
          Delete
        </Button>
      </div>
    ),
  },
]

const CategoryTable: React.FC<ITableProps> = ({ categories }) => {
  return <DataTable columns={columns} data={categories} />
}

export default CategoryTable
