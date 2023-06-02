import { z } from "zod"

import { Mediatype, Status } from "@prisma/client"

export const CreateCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  status: z.nativeEnum(Status).default(Status.DRAFT),
  tags: z.string({ description: "Comma separated tags" }),
  Media: z.object({
    create: z.object({
      type: z.nativeEnum(Mediatype),
      url: z.string(),
    }),
  }),
})
export const UpdateCategorySchema = z.object({
  id: z.string(),
  Media: z
    .object({
      upsert: z.object({
        create: z.object({
          type: z.nativeEnum(Mediatype),
          url: z.string(),
        }),
        update: z.object({
          type: z.nativeEnum(Mediatype),
          url: z.string(),
        }),
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
