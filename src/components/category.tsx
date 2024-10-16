"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function Category() {
  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createCategory = api.category.create.useMutation({
    onSuccess: async () => {
      await utils.category.invalidate();
      setName("");
    },
    onSettled: () => {
      console.log("settled");
    },
  });

  return (
    <div className="w-full max-w-xs">
      Category
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO(omer): properly handle creation
          createCategory.mutate({ name, description: "New Category" });
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
          disabled={createCategory.isPending}
        >
          {createCategory.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
