import { z } from "zod"
import { Customer } from "./customer";

const ApiGiftCardSchema = z.object({
  code: z.string().min(1, "Code is required"),
  status: z.enum(["active", "inactive", "redeemed"]),
  initialValue: z.number(),
  hasExpiry: z.boolean(),
  customer: z.string(),
  recipient: z.string(),
  internalNotes: z.optional(z.string()),
  expiresAt: z.optional(z.string()),
  createdBy: z.object({
    name: z.string(),
  }),
  createdAt: z.optional(z.string()),
  updatedAt: z.optional(z.string()),
});

type ApiGiftCard = z.infer<typeof ApiGiftCardSchema>;

type GiftCard = Omit<Omit<Omit<Omit<ApiGiftCard, "createdAt">, "updatedAt">, "customer">, "recipient"> & {
  _id: string; createdAt: string; updatedAt: string; customer: Customer; recipient: Customer;
};

export { type GiftCard, ApiGiftCardSchema, type ApiGiftCard };
