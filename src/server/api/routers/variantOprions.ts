import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const variantOptionsRouter = createTRPCRouter({
  getOptionsByProductId: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .output(
      z.array(
        z.object({
          name: z.string(),
          value: z.string(),
        })
      )
    )
    .query(async ({ ctx, input }) => {
      const { productId } = input;
      const options = await ctx.prisma.variantOptions.findMany({
        where: { productId },
      });

      return options;
    }),
});
