import { z } from "zod"

import { Mediatype } from "@prisma/client"

export const CreateMediaSchema = z.object({
  type: z.nativeEnum(Mediatype).default(Mediatype.IMAGE),
  url: z
    .string({ description: "The URL of the media file. Must be a valid base64-encoded string." })
    .regex(/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/, {
      message: "Invalid base64 string",
    }),
})
