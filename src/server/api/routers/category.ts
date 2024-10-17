import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.category.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),

  getAllWithProductCount: publicProcedure.query(async ({ ctx }) => {
    const category = await ctx.db.category.findMany({
      select: {
        id: true,
        name: true,
        products: true,
      },
    });

    return category.map((c) => {
      return {
        ...c,
        product_count: c.products.length,
      };
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
});
