import { z } from 'zod';

import { Status } from '@prisma/client';

import { CreateMediaSchema } from './media';

export const CreateVariantSchema = z.object({
  description: z
    .string()
    .min(16, { message: "Description must be at least 16 characters long" }),
  sku: z.number().int().positive({ message: "SKU must be a positive integer" }),
  price: z.number().min(0.01, { message: "Price must be at least 0.01" }),
  barcode: z
    .number()
    .int()
    .positive({ message: "Barcode must be a positive integer" }),
  taxPercent: z.number().min(0, { message: "Tax percent cannot be negative" }),
  onSelfQuantity: z
    .number()
    .int()
    .min(0, { message: "On self quantity cannot be negative" }),
  inWareHouseQuantity: z
    .number()
    .int()
    .min(0, { message: "In warehouse quantity cannot be negative" }),
  Media: z.object({
    create: CreateMediaSchema,
  }),
});

export const CreateVariantOptionSchema = z.object({
  name: z.string().min(2),
  value: z
    .string()
    .regex(/^[\w\s]+(,[\w\s]+)*$/, {
      message: "Invalid value format. Must be comma-separated words or spaces.",
    })
    .min(2),
});

export const CreateProductSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(16),
  tags: z
    .string()
    .min(3)
    .regex(/^[\w\s]+(,[\w\s]+)*$/, {
      message: "Invalid value format. Must be comma-separated words or spaces.",
    }),
  status: z.nativeEnum(Status),
  rating: z
    .number()
    .min(1, { message: "Rating cannot be less than 1" })
    .max(5, { message: "Rating cannot be greater than 5" }),
  Category: z.object({
    connect: z.object({
      id: z
        .string()
        .refine((val) => /^[a-f\d]{24}$/i.test(val), { message: "Invalid id" }),
    }),
  }),
  Variant: z.object({
    create: CreateVariantSchema,
  }),
  Media: z.object({
    create: CreateMediaSchema,
  }),
  VariantOptions: z.object({
    create: CreateVariantOptionSchema,
  }),
  // template: __fieldName__: z.__zodType__(),
});

export const UpdateProductSchema = z.object({
  id: z.string(),
  name: z.string().min(4).optional(),
  description: z.string().min(16).optional(),
  tags: z.string().min(3).optional(),
  status: z.nativeEnum(Status).optional(),
  rating: z
    .number()
    .min(1, { message: "Rating cannot be less than 1" })
    .max(5, { message: "Rating cannot be greater than 5" })
    .optional(),
  Category: z
    .object({
      connect: z.object({
        id: z
          .string()
          .refine((val) => /^[a-f\d]{24}$/i.test(val), {
            message: "Invalid category id",
          })
          .optional(),
      }),
    })
    .optional(),
  Variant: z
    .object({
      create: CreateVariantSchema.optional(),
    })
    .optional(),
  Media: z
    .object({
      create: CreateMediaSchema.optional(),
    })
    .optional(),
  VariantOptions: z
    .object({
      create: CreateVariantOptionSchema.optional(),
    })
    .optional(),
  // template: __fieldName__: z.__zodType__(),
});

export const UpdateVariantSchema = z.object({
  id: z.string(),
  description: z.string().optional(),
  sku: z.number().optional(),
  price: z.number().optional(),
  barcode: z.number().optional(),
  taxPercent: z.number().optional(),
  onSelfQuantity: z.number().optional(),
  inWareHouseQuantity: z.number().optional(),
  Media: z
    .object({
      create: CreateMediaSchema.optional(),
    })
    .optional(),
});

export const DeleteProductSchema = z.object({
  id: z.string(),
});
