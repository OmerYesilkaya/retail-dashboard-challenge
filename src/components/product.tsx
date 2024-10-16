"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestProducts() {
  const [products] = api.product.getMostRecent.useSuspenseQuery({});

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createProduct = api.product.create.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      setName("");
    },
    onSettled: () => {
      console.log("settled");
    },
  });

  return (
    <div className="w-full max-w-xs">
      Your most recent products:
      {products.length > 0 ? (
        products.map((product) => {
          return (
            <p key={product.id} className="truncate">
              {product.name}
            </p>
          );
        })
      ) : (
        <p>You have no products yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO(omer): properly handle creation
          createProduct.mutate({ name, description: "New", price: 1000 });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createProduct.isPending}
        >
          {createProduct.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
