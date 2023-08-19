import { z } from "zod";

export const MetaDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
});

export const CreateMetaDataSchema = z.object({
  title: z.string(),
  description: z.string(),
  keywords: z.string(),
});
