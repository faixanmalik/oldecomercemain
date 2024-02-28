import { z } from "zod";
import { Product } from "./product";
import { Customer } from "./customer";
import { CustomItem, CustomItemSchema } from "./customItem";
import { TrackingSchema } from "./tracking";

const DiscountSchema = z.object({
  discount: z.number(),
  type: z.string().optional(),
  value: z.number().optional(),
  reason: z.string().optional(),
});

const ShippingSchema = z.object({
  name: z.string().optional(),
  price: z.number().optional(),
});

const TaxSchema = z.object({
  charges_tax: z.boolean(),
  tax: z.number(),
});

const ApiOrderSchema = z.object({
  date: z.string().optional(),
  customer: z.any().optional(),
  channel: z.string().optional(),

  subtotal: z.number().optional(),
  total: z.number().optional(),
  discount: DiscountSchema.optional(),
  tax: TaxSchema.optional(),
  shipping: ShippingSchema.optional(),
  
  fulfillment_date: z.string().optional(),
  fulfillment_status: z.string().optional(),

  payment_status: z.string().optional(),
  payment_due: z.string().optional(),
  products: z.array(z.any()),
  customItems: z.array(CustomItemSchema),
  delivery_status: z.string().optional(),
  delivery_method: z.string().optional(),
  tags: z.array(z.string()).optional(),
  // TODO: referenceNumber isnt optional
  referenceNumber: z.string(),
  note: z.string(),
  status: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),

  tracking: z.array(TrackingSchema).optional(),

  _id: z.any().optional(),
});

type ApiOrder = z.infer<typeof ApiOrderSchema>;
type Discount = z.infer<typeof DiscountSchema>;
type Shipping = z.infer<typeof ShippingSchema>;
type Tax = z.infer<typeof TaxSchema>;

type ProductItem = Product & Omit<CustomItem, "_id">;

type Order = Omit<
  Omit<Omit<Omit<ApiOrder, "createdAt">, "updatedAt">, "customer">,
  "products"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  products: ProductItem[];
};

export { type Order, ApiOrderSchema, type ApiOrder, DiscountSchema };
export type { Discount, Shipping, Tax };
