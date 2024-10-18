import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
        <ErrorBoundary fallback={<div>Something went wrong...</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <InfoCards />
          </Suspense>
        </ErrorBoundary>
        <div className="grid grid-cols-3 gap-4">
          <ErrorBoundary fallback={<div>Something went wrong...</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              <CategoryStockChart />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary fallback={<div>Something went wrong...</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductTable />
            </Suspense>
          </ErrorBoundary>
        </div>
        <ErrorBoundary fallback={<div>Something went wrong...</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <RecentTransactionsTable />
          </Suspense>
        </ErrorBoundary>
      </div>
    </HydrateClient>
  );
}

export const dynamic = "force-dynamic";
