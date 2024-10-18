import { api, HydrateClient } from "@/trpc/server";

import { PageHeader } from "@/components/ui/PageHeader";
import { CategoryStockChart } from "@/components/DashboardProductChart";
import { ProductTable } from "@/components/ProductTable";
import { InfoCards } from "@/components/InfoCards";
import { RecentTransactionsTable } from "@/components/RecentTransactionsTable";
import { FallbackWrapper } from "@/components/FallbackWrapper";

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
        <FallbackWrapper>
          <InfoCards />
        </FallbackWrapper>
        <div className="grid grid-cols-3 gap-4">
          <FallbackWrapper>
            <CategoryStockChart />
          </FallbackWrapper>
          <FallbackWrapper>
            <ProductTable />
          </FallbackWrapper>
        </div>
        <FallbackWrapper>
          <RecentTransactionsTable />
        </FallbackWrapper>
      </div>
    </HydrateClient>
  );
}

export const dynamic = "force-dynamic";
