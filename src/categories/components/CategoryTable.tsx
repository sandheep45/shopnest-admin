import Image from "next/image"
import Link from "next/link"
import React from "react"

import { Routes } from "@blitzjs/next"
import { Category, Media } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/core/components/common/DropdownMenu"
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
          src={info.row.original.Media?.url as string}
          className="rounded-md"
        />
        <Link
          href={Routes.EditCategoryPage({ categoryId: info.row.original.id })}
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
    cell: (info) => (
      <div className="text-center font-medium w-64 lg:w-auto">{info.row.original.description}</div>
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
              href={Routes.EditCategoryPage({ categoryId: row.original.id })}
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

const CategoryTable: React.FC<ITableProps> = ({ categories }) => {
  return <DataTable columns={columns} data={categories} />
}

export default CategoryTable
