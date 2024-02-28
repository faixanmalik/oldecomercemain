import { z } from "zod";

const DiscountSchema = z.object({
  discount: z.number(),
  type: z.string().optional(),
  value: z.number().optional(),
  reason: z.string().optional(),
});

const CustomItemSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number(),
  taxable: z.boolean().optional(),
  physical: z.boolean().optional(),
  weight: z.number().optional(),
  weightUnit: z.enum(["kg", "lb", "oz", "g"]).optional(),
  discount: DiscountSchema.optional(),
});

type CustomItem = z.infer<typeof CustomItemSchema>;
export { type CustomItem, CustomItemSchema };
