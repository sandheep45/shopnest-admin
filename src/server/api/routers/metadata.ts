import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const metadataRouter = createTRPCRouter({
  getMetadataIdAndName: protectedProcedure
    .input(
      z
        .object({
          productId: z.string(),
          categoryId: z.string(),
          variantId: z.string(),
        })
        .partial()
        .refine(
          (data) => !!data.productId || !!data.categoryId || !!data.variantId,
          "At least one of productId, categoryId or variantId must be provided"
        )
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.metaData.findMany({
        where: {
          productId: input.productId,
          categoryId: input.categoryId,
          variantId: input.variantId,
        },
        select: {
          id: true,
          title: true,
        },
      });
    }),

  getMetadatabyId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (!input) return null;
      return await ctx.prisma.metaData.findUnique({
        where: {
          id: input,
        },
        select: {
          keywords: true,
          title: true,
          description: true,
        },
      });
    }),
});
