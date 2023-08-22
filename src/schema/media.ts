import { z } from "zod";

import { Mediatype } from "@prisma/client";

export const CreateMediaSchema = z.object({
  type: z.nativeEnum(Mediatype).default(Mediatype.IMAGE),
  url: z.string({
    description:
      "The URL of the media file. Must be a valid base64-encoded string.",
  }),
  // .regex(/^data:[\w\/\+\-\.]+;base64,[\w\d+/=\n]+$/, {
  //   message: "Invalid base64 string",
  // }),
});
