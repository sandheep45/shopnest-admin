import { paginate } from "blitz"
import db, { Prisma } from "db"

import { resolver } from "@blitzjs/rpc"

interface GetProductsInput
  extends Pick<Prisma.ProductFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetProductsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: products,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.product.count({ where }),
      query: (paginateArgs) =>
        db.product.findMany({
          ...paginateArgs,
          where,
          orderBy,
          include: { Media: true, Category: { select: { name: true } } },
        }),
    })

    return {
      products,
      nextPage,
      hasMore,
      count,
    }
  }
)
