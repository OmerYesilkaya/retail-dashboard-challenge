"use client";

import { useState } from "react";
import { api } from "@/trpc/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

export function CreateCategory() {
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
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Create a new category by filling the form below.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO(omer): properly handle creation
          createCategory.mutate({ name, description: "New Category" });
        }}
        className="flex flex-col gap-2"
      >
        <CardContent>
          <Input
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={createCategory.isPending}>
            {createCategory.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
