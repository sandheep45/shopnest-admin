import { paginate } from "blitz"
import db, { Prisma } from "db"

import { resolver } from "@blitzjs/rpc"

interface GetCategoriesInput
  extends Pick<Prisma.CategoryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCategoriesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: categories,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.category.count({ where }),
      query: (paginateArgs) =>
        db.category.findMany({ ...paginateArgs, where, orderBy, include: { Media: true } }),
    })

    return {
      categories,
      nextPage,
      hasMore,
      count,
    }
  }
)
