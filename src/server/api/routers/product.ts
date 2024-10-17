import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CreateProductSchema } from "@/lib/types";

// TODO(omer): move to some shared location
function generate_sku() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateProductSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description ?? "",
          price: parseFloat(input.price),
          categoryId: parseInt(input.categoryId),
          supplierId: parseInt(input.supplierId),
          quantity_in_stock: parseInt(input.quantity_in_stock),
          sku: generate_sku(), // NOTE(omer): Not sure if this is how you use sku but what ever...
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),

  getTotalProductCount: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.count();
  }),

  getTotalStock: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany();
    return products.reduce((acc, cur) => {
      return (acc += cur.quantity_in_stock);
    }, 0);
  }),

  getTotalValue: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.db.product.findMany();
    return products.reduce((acc, cur) => {
      return (acc += cur.quantity_in_stock * cur.price);
    }, 0);
  }),

  getTopQuantityProducts: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.product.findMany({
      orderBy: { quantity_in_stock: "desc" },
      take: 5,
    });
  }),

  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.product.delete({
        where: { id: input.id },
      });
    }),
});
