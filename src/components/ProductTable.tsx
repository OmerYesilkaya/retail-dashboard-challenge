"use client";

import { api } from "@/trpc/react";
import { type Product } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/DataTable";
import { DataTableColumnHeader } from "@/components/ui/DataTableColumnHeader";

export const columns: ColumnDef<Product>[] = [
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
];

export function ProductTable() {
  const [products] = api.product.getMostRecent.useSuspenseQuery({});

  return <DataTable columns={columns} data={products} />;
}
