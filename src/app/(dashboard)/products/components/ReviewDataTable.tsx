import React, { useState } from "react";

import Image from "next/image";

import { useFormContext } from "react-hook-form";

import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import Loading from "@/components/ui/loading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import StarRating from "@/components/utils/StarRating";

import { api } from "@/utils/api";

import ReviewDataTableSkeleton from "./ReviewDataTableSkeleton";

export interface ICustomerReview {
  User: {
    id: string | undefined;
    Media: {
      url: string | undefined;
    };
    name: string | null | undefined;
    image: string | null | undefined;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

export const columns: ColumnDef<ICustomerReview>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        aria-label="select-all"
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="mx-3"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`select-user-${row.original.User.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="mx-3"
      />
    ),
  },
  {
    accessorKey: "rating",
    header: () => <div className="text-center">Rating</div>,
    cell: (info) => (
      <div className="w-24">
        <StarRating count={info.row.original.rating} />
      </div>
    ),
  },
  {
    accessorKey: "User",
    header: () => <div className="text-center">Customer</div>,
    cell: (info) => (
      <div className="flex w-36 items-center gap-3">
        <Image
          src={
            info.row.original.User.image ??
            info.row.original.User.Media.url ??
            "/svg/Profile.svg"
          }
          alt="avatar"
          width={30}
          height={30}
          className="h-10 w-10 rounded-full"
        />
        <span className="truncate">{info.row.original.User.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "comment",
    header: () => <div className="text-center">Comment</div>,
    cell: (info) => <span className="">{info.row.original.comment}</span>,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Date</div>,
    cell: (info) => (
      <span className="flex-1 px-3">
        {new Date(info.row.original.createdAt).toLocaleDateString()}
      </span>
    ),
  },
];

const ReviewDataTable = () => {
  const { watch } = useFormContext();
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching } =
    api.customerReviews.getAllReviewsByProductId.useQuery(
      {
        productId: watch("id") as string,
        page,
      },
      {
        enabled: !!watch("id"),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
      }
    );

  if (!data && (isLoading || isFetching)) return <ReviewDataTableSkeleton />;

  if (!data) return null;

  const { count, reviews, avgRating } = data;

  const handleNextButton = () => {
    if (page * 10 < count) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousButton = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-6">
      <Loading isOpen={isFetching || isLoading} />

      <div className="relative flex w-full flex-col gap-8 rounded-md bg-[#f5f8fa] p-5 dark:bg-[#1e1e2d]">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl">Customer Review</h3>

          <div className="flex items-center gap-4">
            <span className="font-semibold">Overall Rating:</span>
            <StarRating count={avgRating} />
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-220px)] w-full overflow-x-auto">
          <DataTable columns={columns} data={reviews} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex items-center justify-between">
          <Button type="button" onClick={handlePreviousButton}>
            Previous
          </Button>
          <Button type="button" onClick={handleNextButton}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDataTable;
