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

export function CreateSupplier() {
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
    <Card>
      <CardHeader>
        <CardTitle>Suppliers</CardTitle>
        <CardDescription>
          Create a new supplier by filling the form below.
        </CardDescription>
      </CardHeader>
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
          <Button type="submit" disabled={createSupplier.isPending}>
            {createSupplier.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
