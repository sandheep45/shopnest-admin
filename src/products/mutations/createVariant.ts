import db from "db"

import { resolver } from "@blitzjs/rpc"

import { CreateVariantSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreateVariantSchema),
  resolver.authorize(),
  async (input) => {
    const variant = await db.variant.create({ data: input })

    return variant
  }
)
