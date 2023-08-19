import React from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const myArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const CategoryLoadingTable = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <h3 className="text-2xl">Categories Listing</h3>
      <div className="relative flex w-full flex-col gap-8 rounded-md bg-[#f5f8fa] p-5 dark:bg-[#1e1e2d]">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-56 rounded-md" />

          <div className="flex items-center justify-center gap-3">
            <Skeleton className="h-8 w-24 rounded-md" />

            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-220px)] w-full overflow-x-auto">
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-5 w-5 rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="mx-auto h-5 w-32 rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="mx-auto h-5 w-32 rounded-md" />
                </TableHead>
                <TableHead>
                  <Skeleton className="mx-auto h-5 w-24 rounded-md" />
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
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="flex flex-col items-center justify-center gap-3">
                    <Skeleton className="h-4 w-64 lg:w-[550px]" />
                    <Skeleton className="h-4 w-64 lg:w-[550px]" />
                    <Skeleton className="h-4 w-64 lg:w-[350px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mx-auto h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="mx-auto h-4 w-[100px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};
export default CategoryLoadingTable;
