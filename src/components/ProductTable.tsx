"use client";

import { api } from "@/trpc/react";
import { type Product } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, TriangleAlert } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { DataTable } from "@/components/ui/DataTable";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

export const columns: (actions: {
  deleteProduct: (id: number) => Promise<void>;
}) => ColumnDef<Product>[] = (actions) => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader title="ID" column={column} />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader title="Name" column={column} />
    ),
    cell: ({ cell }) => (
      <div className="font-bold">{cell.getValue() as string}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader title="Price" column={column} />
    ),
    cell: ({ cell }) => (
      <div>
        {Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(parseFloat(cell.getValue() as string))}
      </div>
    ),
  },
  {
    accessorKey: "quantity_in_stock",
    header: ({ column }) => (
      <DataTableColumnHeader title="Stock" column={column} />
    ),
    cell: ({ cell }) => {
      const value = parseInt(cell.getValue() as string);
      const showWarning = value < 5;
      return (
        <div className="flex items-center gap-1">
          {value}{" "}
          {showWarning && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TriangleAlert className="size-4 text-red-500" />
                </TooltipTrigger>
                <TooltipContent>
                  You are running out of this product!
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>View product</DropdownMenuItem>
            <DropdownMenuItem>Restock</DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500"
              onClick={async () => {
                await actions.deleteProduct(product.id);
                toast({
                  title: "Success",
                  description: "Deleted product successfully!",
                });
              }}
            >
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function ProductTable() {
  const utils = api.useUtils();
  const [products] = api.product.getAll.useSuspenseQuery();
  const { mutate } = api.product.deleteProduct.useMutation();

  return (
    <DataTable
      title="Products"
      columns={columns({
        deleteProduct: async (id) => {
          mutate({ id });
          await utils.product.invalidate();
          await utils.category.invalidate();
        },
      })}
      data={products}
    />
  );
}
