import { api, HydrateClient } from "@/trpc/server";
import { DashboardProductChart } from "@/components";

export default function Dashboard() {
  void api.product.getMostRecent.prefetch({ limit: 10 });

  return (
    <HydrateClient>
      <DashboardProductChart />
    </HydrateClient>
  );
}
