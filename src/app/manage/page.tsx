import { api, HydrateClient } from "@/trpc/server";

import { CreateCategory } from "@/components/CreateCategory";
import { CreateProduct } from "@/components/CreateProduct";
import { CreateSupplier } from "@/components/CreateSupplier";
import { PageHeader } from "@/components/ui/PageHeader";

export default function Dashboard() {
  // TODO(omer): Figure out if we should prefetch everything
  void api.product.getMostRecent.prefetch({ limit: 10 });
  void api.category.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <PageHeader title="Manage" />
        <CreateProduct />
        <CreateCategory />
        <CreateSupplier />
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
