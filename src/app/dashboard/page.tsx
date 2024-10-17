import { api, HydrateClient } from "@/trpc/server";

import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryStockChart } from "@/components/DashboardProductChart";
import { ProductTable } from "@/components/ProductTable";
import { InfoCards } from "@/components/InfoCards";

export default function Dashboard() {
  void api.product.getMostRecent.prefetch({ limit: 10 });
  void api.category.getAllWithProductCount.prefetch();

  void api.product.getTotalProductCount.prefetch();
  void api.product.getTotalStock.prefetch();
  void api.product.getTotalValue.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <PageHeader title="Dashboard" />
        <InfoCards />
        <div className="grid grid-cols-3 gap-4">
          <CategoryStockChart />
          <ProductTable />
        </div>
        <div className="flex gap-4">
          <ProductTable />
          <ProductTable />
        </div>
      </div>
    </HydrateClient>
  );
}

/**
 * TODO(omer):
 *
 * - Form validation + Error handling
 * - Restock functionality
 *
 */
