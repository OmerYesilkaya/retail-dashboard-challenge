import { BigCard } from "@/components/bigCard";
import { api, HydrateClient } from "@/trpc/server";
import { DashboardProductChart } from "@/views/dashboardProductChart";
import { ProductTable } from "@/views/ProductTable";

export default function Dashboard() {
  void api.product.getMostRecent.prefetch({ limit: 10 });

  return (
    <HydrateClient>
      <DashboardProductChart />
      <ProductTable />
    </HydrateClient>
  );
}

/**
 * TODO(omer):
 * - Add tables
 * - Add ways to add products, categories, suppliers
 * - Prettify UI
 * - Make it responsive (?)
 * - Make it performant
 *
 */
