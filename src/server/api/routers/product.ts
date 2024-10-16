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
  // TODO(omer): add missing fields for create product
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        price: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.product.create({
        data: {
          name: input.name,
          description: input.description,
          price: input.price,
          quantity_in_stock: 1,
          sku: generate_sku(),
          // TODO(omer): get category id and supplier id from client
          categoryId: 1,
          supplierId: 1,
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
});
