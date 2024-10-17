import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

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
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.number().min(1),
        categoryId: z.number(),
        supplierId: z.number(),
        quantity_in_stock: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description ?? "",
          price: input.price,
          categoryId: input.categoryId,
          supplierId: input.supplierId,
          quantity_in_stock: input.quantity_in_stock,
          sku: generate_sku(), // NOTE(omer): Not sure if this is how you use sku..
        },
      });
    }),

  getMostRecent: publicProcedure
    .input(z.object({ limit: z.number().min(1).default(10) }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.product.findMany({
        orderBy: { createdAt: "desc" },
        take: input.limit,
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
