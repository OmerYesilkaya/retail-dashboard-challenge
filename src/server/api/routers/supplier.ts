import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const supplierRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        address: z.string().min(1),
        contactPerson: z.string().min(1),
        email: z.string().min(1).email(),
        phone: z
          .string()
          .min(1)
          .regex(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
            "Invalid number!",
          ),
        website: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.supplier.create({
        data: {
          name: input.name,
          address: input.address,
          contactPerson: input.contactPerson,
          email: input.email,
          phone: input.phone,
          website: input.website,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.supplier.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }),
});
