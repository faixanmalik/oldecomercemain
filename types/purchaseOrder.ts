import { VariantWithContext } from "./product";
import { Supplier } from "./supplier"
import { z } from "zod"
import { Location } from "./location";

const AdjustmentNames = z.enum([
    "Shipping",
    "Customs duties",
    "Discount",
    "Foreign transaction fee",
    "Freight fee",
    "Insurance",
    "Rush fee",
    "Surcharge",
    "Other"
])

const ApiPurchaseOrderItemSchema = z.object({
    _id: z.string(),
    product: z.string().nullable(),
    variant: z.string(),
    productTitle: z.string(),
    variantName: z.string(),
    quantity: z.number(),
    cost: z.number(),
    tax: z.number(),
    supplierSKU: z.string(),
    image: z.string().optional(),
});

const ApiPurchaseOrderSchema = z.object({
    destination: z.string().min(1, "Destination is required"),
    paymentTerms: z.optional(z.string()),
    status: z.enum(["draft", "ordered", "received", "cancelled"]),
    shipping: z.object({
        arrivalDate: z.string().optional(),
        carrier: z.string(),
        trackingNumber: z.string(),
    }),
    // TODO: change 0 to 1 after implementing 'browse' dialog
    items: z.array(ApiPurchaseOrderItemSchema).min(0, "At least one product is required"),
    total: z.number().min(0, "Total must be greater than 0"),
    referenceNumber: z.string().min(1, "Reference number is required"),
    noteToSupplier: z.string(),
    tags: z.array(z.string()),
    supplier: z.string().min(1, "Supplier is required"),
    costAdjustments: z.array(z.object({
        name: AdjustmentNames,
        value: z.number(),
    })),
    currency: z.string(),
    createdAt: z.optional(z.string()),
    updatedAt: z.optional(z.string()),
});

type AdjustmentName = z.infer<typeof AdjustmentNames>
type ApiPurchaseOrder = z.infer<typeof ApiPurchaseOrderSchema>

type ApiPurchaseOrderItem = z.infer<typeof ApiPurchaseOrderItemSchema>
type PurchaseOrderItem = Omit<Omit<Omit<Omit<ApiPurchaseOrderItem, "product" | "variant">, "variantName">, "productTitle">, "image"> & {
    _id: string; variant: VariantWithContext
};


type PurchaseOrder = Omit<Omit<Omit<Omit<Omit<ApiPurchaseOrder, "createdAt">, "updatedAt">, "supplier">, "items">, "destination"> & {
    _id: string; createdAt: string; updatedAt: string; supplier: Supplier; items: PurchaseOrderItem[]; destination: Location
};

export { ApiPurchaseOrderSchema, type ApiPurchaseOrderItem, ApiPurchaseOrderItemSchema, type PurchaseOrderItem, type PurchaseOrder, type AdjustmentName, type ApiPurchaseOrder }
