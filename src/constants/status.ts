import type { Status } from "@prisma/client";

interface StatusOption {
  label: string;
  value: Status;
}

export const status: readonly StatusOption[] = [
  {
    label: "Active",
    value: "PUBLISHED",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },

  {
    label: "Draft",
    value: "DRAFT",
  },
  {
    label: "Scheduled",
    value: "SCHEDULED",
  },
] as const;

export const setStatusColor = (status: Status) => {
  switch (status) {
    case "PUBLISHED":
      return "bg-green-500";
    case "INACTIVE":
      return "bg-red-500";
    case "DRAFT":
      return "bg-blue-500";
    case "SCHEDULED":
      return "bg-orange-500";
    default:
      return "bg-gray-500x";
  }
};
