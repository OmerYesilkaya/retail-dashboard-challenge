"use client";

import { api } from "@/trpc/react";
import { type InventoryTransaction } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { InfoIcon } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

import { DataTable } from "@/components/ui/DataTable";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";

type TransitionType = "adjustment" | "sale" | "restock";

const transitionTypeVariants = cva(
  "w-min rounded-md border px-1.5 py-1 text-xs font-black uppercase shadow-sm",
  {
    variants: {
      variant: {
        adjustment:
          "border-none bg-orange-500 text-orange-100 shadow hover:bg-orange-500/90",
        sale: "border-none bg-green-500 text-green-100 shadow-sm hover:bg-green-500/90",
        restock:
          "border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "adjustment",
    },
  },
);

export const columns: ColumnDef<InventoryTransaction>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader title="Transaction ID" column={column} />
    ),
  },
  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader title="Product ID" column={column} />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader title="Transaction Date" column={column} />
    ),
    cell: ({ cell }) => (
      <div>
        {Intl.DateTimeFormat("en-US", {
          hourCycle: "h24",
          dateStyle: "long",
          timeStyle: "short",
        }).format(cell.getValue() as Date)}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader title="Quantity" column={column} />
    ),
    cell: ({ cell }) => {
      const value = parseInt(cell.getValue() as string);
      return (
        <div
          className={cn("font-bold", {
            "text-green-500": value > 0,
            "text-red-500": value < 0,
            "text-black": value === 0,
          })}
        >
          {value}
        </div>
      );
    },
  },

  {
    accessorKey: "transactionType",
    header: ({ column }) => (
      <DataTableColumnHeader title="Type" column={column} />
    ),
    cell: ({ cell }) => {
      const transitionType = cell.getValue() as TransitionType;
      return (
        <div
          className={cn(transitionTypeVariants({ variant: transitionType }))}
        >
          {transitionType}
        </div>
      );
    },
  },
  {
    accessorKey: "remarks",
    header: () => null,
    cell: ({ cell }) => {
      const remark = cell.getValue() as TransitionType;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex translate-y-1 items-center justify-center">
                <InfoIcon className="size-4 text-zinc-500" />
              </div>
            </TooltipTrigger>
            <TooltipContent>{remark}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];

export function RecentTransactionsTable() {
  const [transactions] = api.transactions.getMostRecent.useSuspenseQuery(5);

  return (
    <DataTable
      title="Recent Transactions"
      columns={columns}
      data={transactions}
      isSearchActive={false}
    />
  );
}
