import { NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

import { resolver } from "@blitzjs/rpc"

const GetUser = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.string().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetUser), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const user = await db.user.findFirst({ where: { id } })

  if (!user) throw new NotFoundError()

  return user
})
