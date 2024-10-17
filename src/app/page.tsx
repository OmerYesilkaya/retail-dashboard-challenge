import { api, HydrateClient } from "@/trpc/server";
import {
  CreateProduct,
  CreateCategory,
  CreateSupplier,
} from "@/components/index";

export default async function Home() {
  void api.product.getAll.prefetch({ limit: 10 });

  return (
    <HydrateClient>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        test
        <CreateProduct />
        <CreateCategory />
        <CreateSupplier />
      </div>
    </HydrateClient>
  );
}
