"use client";

import { api } from "@/trpc/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { type CreateSupplierType, CreateSupplierSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";

export function CreateSupplier() {
  const utils = api.useUtils();
  const form = useForm<CreateSupplierType>({
    resolver: zodResolver(CreateSupplierSchema),
    defaultValues: {
      address: "",
      contactPerson: "",
      email: "",
      name: "",
      phone: "",
      website: "",
    },
  });

  const createSupplier = api.supplier.create.useMutation({
    onSuccess: async () => {
      await utils.supplier.invalidate();
      toast({
        title: "Success",
        description: "You have created a new supplier!",
      });
      form.reset();
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
      <CardContent className="flex flex-col gap-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => createSupplier.mutate(e))}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactPerson"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Web Site</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createSupplier.isPending}>
              {createSupplier.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
