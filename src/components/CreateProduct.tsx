"use client";

import { api } from "@/trpc/react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { type Product } from "@prisma/client";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";

type FormData = ConvertToFormData<Product>;

export function CreateProduct() {
  const utils = api.useUtils();
  const { register, handleSubmit, reset, control } = useForm<FormData>();

  const [categories] = api.category.getAll.useSuspenseQuery();
  const [suppliers] = api.supplier.getAll.useSuspenseQuery();
  const createProduct = api.product.create.useMutation({
    onSuccess: async () => {
      await utils.product.invalidate();
      toast({
        title: "Success",
        description: "You have created a new product!",
      });
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const {
      name,
      description,
      price,
      categoryId,
      supplierId,
      quantity_in_stock,
    } = data;
    createProduct.mutate({
      name,
      description,
      quantity_in_stock: parseInt(quantity_in_stock),
      price: parseInt(price),
      categoryId: parseInt(categoryId),
      supplierId: parseInt(supplierId),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Product</CardTitle>
        <CardDescription>
          Create a new product by filling the form below.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-1">
          <Input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
          />
          <Textarea
            placeholder="Description"
            {...register("description", { required: false })}
          />
          <div className="flex gap-1">
            <Input
              className="w-[50%]"
              type="number"
              placeholder="Price"
              {...register("price", { min: 1, required: true })}
            />
            <Input
              className="w-[50%]"
              type="number"
              placeholder="Stock"
              {...register("quantity_in_stock", { min: 1, required: true })}
            />
          </div>
          <div className="flex gap-1">
            <Controller
              control={control}
              name="categoryId"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-[50%]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => {
                      return (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              control={control}
              name="supplierId"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Select onValueChange={onChange} value={value}>
                  <SelectTrigger className="w-[50%]">
                    <SelectValue placeholder="Supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {suppliers.map((supplier) => {
                      return (
                        <SelectItem
                          key={supplier.id}
                          value={supplier.id.toString()}
                        >
                          {supplier.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={createProduct.isPending}>
            {createProduct.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>

      <Separator />
      <CardHeader>
        <CardTitle>Restock Products</CardTitle>
        <CardDescription>
          Select an existing product and restock.
        </CardDescription>

        <div>NOT IMPLEMENTED YET</div>
      </CardHeader>
    </Card>
  );
}
