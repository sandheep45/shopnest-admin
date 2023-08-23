import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerReviewsRouter = createTRPCRouter({
  getAllReviewsByProductId: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        page: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { productId, page } = input;
      const [reviews, count, rating] = await ctx.prisma.$transaction([
        ctx.prisma.customerReview.findMany({
          where: { productId },
          take: 10,
          skip: page * 10,
          orderBy: { createdAt: "desc" },
          include: {
            User: {
              include: {
                Media: {
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        }),
        ctx.prisma.customerReview.count({
          where: { productId },
        }),
        ctx.prisma.customerReview.findMany({
          where: { productId },
          select: {
            rating: true,
          },
        }),
      ]);

      return {
        reviews,
        count,
        avgRating:
          rating.reduce((acc, curr) => acc + curr.rating, 0) / rating.length,
      };
    }),
});
