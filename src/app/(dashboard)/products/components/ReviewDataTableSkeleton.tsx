import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardWrapper from "@/components/utils/Card";
import StarRating from "@/components/utils/StarRating";

const myArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ReviewDataTableSkeleton = () => {
  return (
    <CardWrapper className="pt-7">
      <div className="mb-5 flex w-full justify-between">
        <h1 className="text-xl font-bold">Customer Review</h1>

        <div className="flex items-center gap-4">
          <span className="font-semibold">Overall Rating:</span>
          <StarRating count={5} />
        </div>
      </div>

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
              <Skeleton className="mx-auto h-5 w-32 rounded-md" />
            </TableHead>
            <TableHead>
              <Skeleton className="mx-auto h-5 w-32 rounded-md" />
            </TableHead>
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
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="flex flex-col items-center justify-center gap-3">
                <Skeleton className="h-8 w-64 lg:w-[280px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="mx-auto h-4 w-[80px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="mx-auto h-4 w-[80px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-5 flex justify-end">
        <Skeleton className="h-10 w-[80px]" />
        <Skeleton className="h-10 w-[80px]" />
      </div>
    </CardWrapper>
  );
};

export default ReviewDataTableSkeleton;
