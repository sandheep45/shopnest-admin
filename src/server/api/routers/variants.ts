import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const variantsRouter = createTRPCRouter({
  getVariantById: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const variant = await ctx.prisma.variant.findUnique({
        where: { id: input },
      });
      if (variant) return variant;
    }),

  getVariantsByProductId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const variants = await ctx.prisma.variant.findMany({
        where: { productId: input },
        select: {
          id: true,
          sku: true,
        },
      });
      return variants;
    }),

  getVariantByOptions: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        options: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
          })
        ),
      })
    )
    .query(async ({ ctx, input }) => {
      const options = input.options
        .filter((option) => option.value)
        .map((option) => {
          return {
            options: {
              some: {
                name: option.name,
                value: option.value,
              },
            },
          };
        });

      const variant = await ctx.prisma.variant.findFirst({
        where: {
          AND: [
            {
              productId: input.productId,
            },
            ...options,
          ],
        },
      });

      return variant;
    }),
});
