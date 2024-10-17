import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const transactionRouter = createTRPCRouter({
  getMostRecent: publicProcedure
    .input(z.number().min(1))
    .query(async ({ ctx, input }) => {
      return ctx.db.inventoryTransaction.findMany({
        orderBy: { date: "desc" },
        take: input,
      });
    }),
});
