"use client";

import { api } from "@/trpc/react";
import { DollarSign, Package, ShoppingCart } from "lucide-react";

import { BigCard } from "./BigCard";

export function InfoCards() {
  const [totalProductCount] =
    api.product.getTotalProductCount.useSuspenseQuery();
  const [totalStock] = api.product.getTotalStock.useSuspenseQuery();
  const [totalValue] = api.product.getTotalValue.useSuspenseQuery();

  return (
    <div className="flex gap-4">
      <BigCard
        label="Total Products"
        icon={<Package className="size-5 text-zinc-500" />}
        format={{ style: "decimal" }}
        value={totalProductCount}
      />
      <BigCard
        label="Total Stock"
        icon={<ShoppingCart className="size-5 text-zinc-500" />}
        format={{ style: "decimal" }}
        value={totalStock}
      />
      <BigCard
        label="Total Value"
        icon={<DollarSign className="size-5 text-zinc-500" />}
        format={{ style: "currency", currency: "USD" }}
        value={totalValue}
      />
    </div>
  );
}
