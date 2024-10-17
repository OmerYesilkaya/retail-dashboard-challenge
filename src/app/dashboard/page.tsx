import { BigCard } from "@/components/BigCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { api, HydrateClient } from "@/trpc/server";
import { CategoryStockChart } from "@/components/DashboardProductChart";
import { ProductTable } from "@/components/ProductTable";
import {
  ArchiveIcon,
  CubeIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";

export default function Dashboard() {
  // TODO(omer): Figure out if we should prefetch everything
  void api.product.getMostRecent.prefetch({ limit: 10 });
  void api.category.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <PageHeader title="Inventory Dashboard" />
        <div className="flex gap-4">
          <BigCard
            label="Total Products"
            icon={<CubeIcon className="size-5 text-zinc-500" />}
            format={{ style: "currency", currency: "USD" }}
            value={10}
          />
          <BigCard
            label="Total Stock"
            icon={<ArchiveIcon className="size-5 text-zinc-500" />}
            format={{ style: "currency", currency: "USD" }}
            value={10}
          />
          <BigCard
            label="Total Value"
            icon={<LightningBoltIcon className="size-5 text-zinc-500" />}
            format={{ style: "currency", currency: "USD" }}
            value={10}
          />
        </div>
        <div className="flex gap-4">
          <CategoryStockChart />
          <ProductTable />
        </div>
        <ProductTable />
      </div>
    </HydrateClient>
  );
}

/**
 * TODO(omer):
 * - Prettify UI + Add bigCards
 * - Add ways to add products, categories, suppliers
 * - Make it responsive (?)
 * - Make it performant
 *
 */
