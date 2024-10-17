"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function Supplier() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createSupplier = api.supplier.create.useMutation({
    onSuccess: async () => {
      await utils.supplier.invalidate();
      setName("");
    },
    onSettled: () => {
      console.log("settled");
    },
  });

  return (
    <div className="w-full max-w-xs">
      Supplier
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO(omer): properly handle creation
          createSupplier.mutate({
            name,
            address: "New address",
            contactPerson: "Omer",
            email: "omerfarukyesilkaya@gmail.com",
            phone: "123123123",
            website: "www.omeryesilkaya.com",
          });
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
          disabled={createSupplier.isPending}
        >
          {createSupplier.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
