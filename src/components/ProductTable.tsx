"use client";

import { api } from "@/trpc/react";
import { type Product } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/DataTable";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { toast } from "@/hooks/use-toast";

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
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader title="Price" column={column} />
    ),
  },
  {
    accessorKey: "quantity_in_stock",
    header: ({ column }) => (
      <DataTableColumnHeader title="Stock" column={column} />
    ),
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
  const [products] = api.product.getMostRecent.useSuspenseQuery({});
  const { mutate } = api.product.deleteProduct.useMutation();

  return (
    <DataTable
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
