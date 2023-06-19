import { z } from "zod"

import { Mediatype, Status } from "@prisma/client"
import { CreateMediaSchema } from "@src/core/schemas"

export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  status: z.nativeEnum(Status).default(Status.DRAFT),
  tags: z.string({ description: "Comma separated tags" }).min(1),
  Media: z.object({
    create: CreateMediaSchema,
  }),
})

export const UpdateCategorySchema = z.object({
  id: z.string(),
  Media: z
    .object({
      upsert: z.object({
        create: CreateMediaSchema,
        update: CreateMediaSchema,
      }),
    })
    .optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
  tags: z.string({ description: "Comma separated tags" }).optional(),
  // template: __fieldName__: z.__zodType__(),
})

export const DeleteCategorySchema = z.object({
  id: z.string(),
})
