import { z } from "zod";
import { Location } from "./location";
import { SalesChannel } from "./salesChannel";
import { Market } from "./market";

const VariantOptionSchema = z.object({
  name: z.string(),
  values: z.array(z.string()),
});

const ApiInventoryLevelSchema = z.object({
  location: z.string(),
  available: z.number(),
  incoming: z.number().optional(),
  onHand: z.number().optional(),
  unavailable: z.number().optional(),
  committed: z.number().optional(),
  updatedAt: z.string().optional(),
  createdAt: z.string().optional(),
});

const ApiVariantSchema = z.object({
  _id: z.string(),
  name: z.string(),
  tax: z.number().optional(),
  inventoryLevels: z.array(ApiInventoryLevelSchema),
  values: z.record(z.string().min(1, "Variant option must have a value")),
  weight: z.number().optional(),
  weightUnit: z.enum(["kg", "lb", "oz", "g"]).optional(),
  isPhysicalProduct: z.boolean().optional(),
  price: z.number().gte(0, "Variant Price must be greater than 0").optional(),
  compareAtPrice: z
    .number()
    .gte(0, "Variant Compare at price must be greater than 0")
    .optional(),
  chargeTaxes: z.boolean().optional(),
  countryOfOrigin: z.string().optional(),
  costPerItem: z
    .number()
    .gte(0, "Variant Cost per item must be greater than 0")
    .optional(),
  profit: z.number().optional(),
  margin: z.number().optional(),
  sku: z.string().optional(),
  hasSku: z.boolean().optional(),
  barcode: z.string().optional(),
  hsCode: z.string().optional(),
  image: z.string().nullable().optional(),
  trackQuantity: z.boolean(),
  continueSellingWhenOutOfStock: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

const ApiProductSchema = z.object({
  _id: z.any().optional(),
  title: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  price: z.number().gte(0, "Price must be greater than 0").optional(),
  compareAtPrice: z
    .number()
    .gte(0, "Compare at price must be greater than 0")
    .optional(),
  chargeTaxes: z.boolean(),
  taxRate: z.number(),
  costPerItem: z
    .number()
    .gte(0, "Cost per item must be greater than 0")
    .optional(),
  profit: z.number().optional(),
  margin: z.number().optional(),
  quantity: z.number().gte(0),
  trackQuantity: z.boolean(),
  continueSellingWhenOutOfStock: z.boolean(),
  scheduledDates: z.record(z.string()),
  hasSku: z.boolean(),
  sku: z.optional(z.string()),
  barcode: z.optional(z.string()),
  isPhysicalProduct: z.boolean(),
  weight: z.number().gte(0),
  weightUnit: z.enum(["kg", "lb", "oz", "g"]),
  countryOfOrigin: z.string(),
  status: z.enum(["active", "draft", "archived"]),
  category: z.string().optional(),
  type: z.string().optional(),
  vendor: z.string().optional(),
  collection: z.string(),
  tags: z.array(z.string().min(1)),
  variants: z.array(ApiVariantSchema),
  selectedVariants: z.array(z.string()).optional(),
  variantOptions: z.array(VariantOptionSchema),
  variantImages: z.array(z.string()),
  salesChannels: z.array(z.string()),
  markets: z.array(z.string().optional().nullable()),
  inventoryLevels: z.array(ApiInventoryLevelSchema),
  media: z.array(
    z.object({
      url: z.string(),
      type: z.enum(["image", "video"]),
    })
  ),
  seo: z.object({
    title: z.string().max(70, "SEO title must be less than 70 characters"),
    description: z.string(),
  }),
  createdAt: z.optional(z.union([z.string(), z.date()])),
  updatedAt: z.optional(z.union([z.string(), z.date()])),
});

type ApiInventoryLevel = z.infer<typeof ApiInventoryLevelSchema>;
type InventoryLevel = Omit<ApiInventoryLevel, "location"> & {
  location: Location;
  incoming: number;
  onHand: number;
  unavailable: number;
  committed: number;
};

type VariantValue = z.infer<typeof ApiVariantSchema>["values"];
type VariantOption = z.infer<typeof VariantOptionSchema>;
type ApiVariant = z.infer<typeof ApiVariantSchema>;
type Variant = Omit<ApiVariant, "inventoryLevels"> & {
  inventoryLevels: InventoryLevel[];
};

type ApiProduct = z.infer<typeof ApiProductSchema>;
type Product = Omit<
  Omit<
    Omit<Omit<Omit<ApiProduct, "createdAt">, "updatedAt">, "salesChannel">,
    "markets"
  >,
  "variants"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  salesChannels: SalesChannel[];
  markets: Market[];
  variants: Variant[];
};

export {
  type Product,
  ApiInventoryLevelSchema,
  type VariantOption,
  ApiProductSchema,
  ApiVariantSchema,
  type ApiVariant,
  type InventoryLevel,
  type ApiInventoryLevel,
  type VariantValue,
  type ApiProduct,
  type Variant,
};

export type VariantWithContext = Variant & {
  title: string;
  productId: string | null;
};
