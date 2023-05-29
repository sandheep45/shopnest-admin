import { z } from "zod"

import { Status } from "@prisma/client"

export const CreateProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  tags: z.string(),
  status: z.nativeEnum(Status),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdateProductSchema = z.object({
  id: z.string(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteProductSchema = z.object({
  id: z.string(),
})
