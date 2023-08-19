import { z } from "zod";

import { Status } from "@prisma/client";

import { CreateMediaSchema } from "./media";
import { CreateMetaDataSchema, MetaDataSchema } from "./metaData";

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.nativeEnum(Status),
  tags: z.string({ description: "Comma separated tags" }),
  Media: z.object({
    type: z.string(),
    url: z.string(),
  }),
  Metadata: z.array(MetaDataSchema),
});

export const CreateCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  status: z.nativeEnum(Status).default(Status.DRAFT),
  tags: z.string({ description: "Comma separated tags" }).min(1),
  Media: z.object({
    create: CreateMediaSchema,
  }),
  Metadata: z.object({
    create: CreateMetaDataSchema,
  }),
});

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
  Metadata: z
    .object({
      upsert: z.object({
        create: CreateMetaDataSchema,
        update: CreateMetaDataSchema,
      }),
    })
    .optional(),
  // template: __fieldName__: z.__zodType__(),
});

export const DeleteCategorySchema = z.object({
  id: z.string(),
});
