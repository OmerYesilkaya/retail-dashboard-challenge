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

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),

  getPieChartData: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      select: {
        id: true,
        name: true,
        products: {
          select: {
            id: true,
            name: true,
            quantity_in_stock: true,
          },
        },
      },
    });
    // Sort categories by the total stock amount of their products
    const sortedCategories = categories
      .map((category) => ({
        ...category,
        totalStock: category.products.reduce(
          (sum, product) => sum + product.quantity_in_stock,
          0,
        ),
      }))
      .sort((a, b) => b.totalStock - a.totalStock);

    // Get the top 4 categories
    const topCategories = sortedCategories.slice(0, 4);

    // Sum the remaining categories into "Others"
    const othersTotalStock = sortedCategories
      .slice(4)
      .reduce((totalStock, category) => totalStock + category.totalStock, 0);

    // Create the result for the pie chart
    const pieChartData = topCategories.map((category) => {
      const name = category.name;
      return {
        id: category.id,
        name,
        totalStock: category.totalStock,
        fill: `var(--color-${name.toLocaleLowerCase()})`,
      };
    });

    // Add "Others" category if there are remaining categories
    if (othersTotalStock > 0) {
      pieChartData.push({
        id: -1,
        name: "Other",
        totalStock: othersTotalStock,
        fill: `var(--color-other)`,
      });
    }

    return pieChartData;
  }),
});
