import { createTRPCRouter } from "@/server/api/trpc";

import { customerReviewsRouter } from "./routers/customerReviews";
import { exampleRouter } from "./routers/example";
import { metadataRouter } from "./routers/metadata";
import { productRouter } from "./routers/product";
import { variantsRouter } from "./routers/variants";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  customerReviews: customerReviewsRouter,
  metadata: metadataRouter,
  product: productRouter,
  variants: variantsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
