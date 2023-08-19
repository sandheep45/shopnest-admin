import React from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';

const myArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const UserLoadingTableSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      <ScrollArea className="h-[calc(100vh-220px)] w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-5 w-5 rounded-md" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-32 rounded-md mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-32 rounded-md mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-20 rounded-md mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-24 rounded-md mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-24 rounded-md mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-5 w-24 rounded-md mx-auto" />
              </TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myArray.map((item) => (
              <TableRow key={item}>
                <TableCell>
                  <Skeleton className="h-5 w-5 rounded-md" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-64 lg:w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px] mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px] mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px] mx-auto" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px] mx-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex w-full justify-between">
        <Button>Previous</Button>
        <Button>Next</Button>
      </div>
    </div>
  );
};
export default UserLoadingTableSkeleton;
