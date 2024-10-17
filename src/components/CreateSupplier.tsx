"use client";

import { type Supplier } from "@prisma/client";
import { api } from "@/trpc/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { toast } from "@/hooks/use-toast";
import { type SubmitHandler, useForm } from "react-hook-form";

type FormData = ConvertToFormData<Supplier>;

export function CreateSupplier() {
  const utils = api.useUtils();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const createSupplier = api.supplier.create.useMutation({
    onSuccess: async () => {
      await utils.supplier.invalidate();
      toast({
        title: "Success",
        description: "You have created a new supplier!",
      });
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { name, address, contactPerson, email, phone, website } = data;
    createSupplier.mutate({
      name,
      address,
      contactPerson,
      email,
      phone,
      website,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suppliers</CardTitle>
        <CardDescription>
          Create a new supplier by filling the form below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <Input
            type="text"
            placeholder="E-mail"
            {...register("email", { required: true })}
          />
          <Input
            type="text"
            placeholder="Phone"
            {...register("phone", { required: true })}
          />
          <Textarea
            placeholder="Address"
            {...register("address", { required: true })}
          />
          <Input
            type="text"
            placeholder="Contact Person"
            {...register("contactPerson")}
          />

          <Input type="text" placeholder="Website" {...register("website")} />
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
