import React, { useState } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle
} from '@/components/ui/dialog';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ITableActionProps {
  row: {
    original: {
      id: string;
    };
  };
  type: "users" | "products" | "categories";
}

const TableAction: React.FC<ITableActionProps> = ({ row, type }) => {
  const [open, setOpen] = useState(false);

  const deleteItem = async () => {
    try {
      const res = await fetch(`/api/${type}/${row.original.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="mx-5">
          <Button>Action</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="w-full">
            <Link href={`/${type}/${row.original.id}`} className="w-full">
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={() => void deleteItem()}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableAction;
