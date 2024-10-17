import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { CreateSupplierSchema } from "@/lib/types";

export const supplierRouter = createTRPCRouter({
  create: publicProcedure
    .input(CreateSupplierSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.supplier.create({
        data: {
          name: input.name,
          address: input.address ?? "",
          contactPerson: input.contactPerson ?? "",
          email: input.email,
          phone: input.phone,
          website: input.website ?? "",
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
