import Image from "next/image"
import React from "react"

import { Media, User } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@src/core/components/common/DropdownMenu"
import formatDate from "@src/lib/dateFormator"
import { ColumnDef } from "@tanstack/react-table"

interface IUser extends User {
  Media: Media | null
}

interface ITableProps extends React.HTMLAttributes<HTMLTableElement> {
  users: IUser[]
}

export const columns: ColumnDef<IUser>[] = [
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
    header: () => <div className="text-center">Person Name</div>,
    cell: (info) => (
      <div className="flex items-center gap-4 font-medium w-36 lg:w-auto">
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
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium truncate">{row.getValue("email")}</div>
    ),
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
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium w-36 xl:w-auto">
        {formatDate(row.original.createdAt)}
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
        <DropdownMenuContent className="">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const UserTable: React.FC<ITableProps> = ({ users }) => {
  return <DataTable columns={columns} data={users} />
}

export default UserTable
