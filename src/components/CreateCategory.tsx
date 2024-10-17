"use client";

import { api } from "@/trpc/react";
import { type Category } from "@prisma/client";
import { type SubmitHandler, useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";

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

type FormData = ConvertToFormData<Category>;

export function CreateCategory() {
  const utils = api.useUtils();
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const createCategory = api.category.create.useMutation({
    onSuccess: async () => {
      await utils.category.invalidate();
      toast({
        title: "Success",
        description: "You have created a new category!",
      });
      reset();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { name, description } = data;
    createCategory.mutate({ name, description });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>
          Create a new category by filling the form below.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="flex flex-col gap-2">
          <Input type="text" placeholder="Name" {...register("name")} />
          <Textarea placeholder="Description" {...register("description")} />
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
