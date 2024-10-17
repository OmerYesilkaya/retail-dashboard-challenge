"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { api } from "@/trpc/react";
import { useForm } from "react-hook-form";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { CreateCategorySchema, type CreateCategoryType } from "@/lib/types";

export function CreateCategory() {
  const utils = api.useUtils();
  const { toast } = useToast();
  const form = useForm<CreateCategoryType>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const createCategory = api.category.create.useMutation({
    onSuccess: async () => {
      await utils.category.invalidate();
      toast({
        title: "Success",
        description: "You have created a new category!",
      });
      form.reset();
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

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => createCategory.mutate(e))}
            className="space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createCategory.isPending}>
              {createCategory.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
