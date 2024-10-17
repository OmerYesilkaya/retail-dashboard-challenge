import { api, HydrateClient } from "@/trpc/server";

import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryStockChart } from "@/components/DashboardProductChart";
import { ProductTable } from "@/components/ProductTable";
import { InfoCards } from "@/components/InfoCards";
import { RecentTransactionsTable } from "@/components/RecentTransactionsTable";

export default function Dashboard() {
  void api.product.getAll.prefetch();
  void api.category.getPieChartData.prefetch();

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
        <RecentTransactionsTable />
      </div>
    </HydrateClient>
  );
}

/**
 * TODO(omer):
 *
 * - Form validation + Error handling
 * - Restock functionality
 * - performance?
 * - Delete db and re-init everything for testing with a single script
 *
 */
