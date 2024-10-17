"use client";

import {
  ArchiveIcon,
  CubeIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { BigCard } from "./BigCard";
import { api } from "@/trpc/react";

export function InfoCards() {
  const [totalProductCount] =
    api.product.getTotalProductCount.useSuspenseQuery();
  const [totalStock] = api.product.getTotalStock.useSuspenseQuery();
  const [totalValue] = api.product.getTotalValue.useSuspenseQuery();

  return (
    <div className="flex gap-4">
      <BigCard
        label="Total Products"
        icon={<CubeIcon className="size-5 text-zinc-500" />}
        format={{ style: "decimal" }}
        value={totalProductCount}
      />
      <BigCard
        label="Total Stock"
        icon={<ArchiveIcon className="size-5 text-zinc-500" />}
        format={{ style: "decimal" }}
        value={totalStock}
      />
      <BigCard
        label="Total Value"
        icon={<LightningBoltIcon className="size-5 text-zinc-500" />}
        format={{ style: "currency", currency: "USD" }}
        value={totalValue}
      />
    </div>
  );
}
