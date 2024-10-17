import { z } from "zod";

export const CreateProductSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  description: z.string().optional(),
  price: z.string().min(1, {
    message: "Price must be at least 1 USD.",
  }),
  categoryId: z.string(),
  supplierId: z.string(),
  quantity_in_stock: z.string().min(1, {
    message: "Quantity must be at least 1.",
  }),
});

export type CreateProductType = z.infer<typeof CreateProductSchema>;

export const CreateCategorySchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  description: z.string().optional(),
});

export type CreateCategoryType = z.infer<typeof CreateCategorySchema>;

export const CreateSupplierSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters long.",
  }),
  address: z.string().optional(),
  contactPerson: z.string().optional(),
  email: z
    .string()
    .min(4, {
      message: "E-mail address must be at least 4 characters long.",
    })
    .email({
      message: "This is not a valid e-mail address.",
    }),
  phone: z
    .string()
    .min(9, {
      message: "Phone number must be at least 9 characters long.",
    })
    .regex(
      /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
      "Invalid number!",
    ),
  website: z.string().optional(),
});

export type CreateSupplierType = z.infer<typeof CreateSupplierSchema>;
