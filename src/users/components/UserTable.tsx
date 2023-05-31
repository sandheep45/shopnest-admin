import Image from "next/image"
import React from "react"

import { Media, User } from "@prisma/client"
import { Button } from "@src/core/components/common/Button"
import { Checkbox } from "@src/core/components/common/Checkbox"
import { DataTable } from "@src/core/components/common/DataTable"
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
    header: () => <Checkbox />,
    cell: ({ row }) => <Checkbox />,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Person Name</div>,
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
    accessorKey: "createdAt",
    header: () => <div className="text-center">Created At</div>,
    cell: ({ row }) => (
      <div className="text-center font-medium">{formatDate(row.original.createdAt)}</div>
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

const UserTable: React.FC<ITableProps> = ({ users }) => {
  return <DataTable columns={columns} data={users} />
}

export default UserTable
