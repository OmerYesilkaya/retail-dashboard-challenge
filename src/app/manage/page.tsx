import { api, HydrateClient } from "@/trpc/server";

import { CreateCategory } from "@/components/CreateCategory";
import { CreateProduct } from "@/components/CreateProduct";
import { CreateSupplier } from "@/components/CreateSupplier";
import { PageHeader } from "@/components/ui/PageHeader";
import { FallbackWrapper } from "@/components/FallbackWrapper";

export default function Manage() {
  void api.category.getAll.prefetch();
  void api.supplier.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <PageHeader title="Manage" />
        <FallbackWrapper>
          <CreateProduct />
        </FallbackWrapper>
        <FallbackWrapper>
          <CreateCategory />
        </FallbackWrapper>
        <FallbackWrapper>
          <CreateSupplier />
        </FallbackWrapper>
      </div>
    </HydrateClient>
  );
}

export const dynamic = "force-dynamic";
