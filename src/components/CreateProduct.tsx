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

export function CreateProduct() {
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
    <Card>
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Create a new product by filling the form below.
        </CardDescription>
      </CardHeader>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // TODO(omer): properly handle creation
          createProduct.mutate({ name, description: "New", price: 1000 });
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
          <Button type="submit" disabled={createProduct.isPending}>
            {createProduct.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
