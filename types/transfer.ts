import { z } from "zod";
import { Location } from "./location";
import { ApiPurchaseOrderItemSchema } from "./purchaseOrder";

const ApiTransferSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
  items: z.array(ApiPurchaseOrderItemSchema),
  shipping: z.object({
    arrivalDate: z.string().optional(),
    carrier: z.string(),
    trackingNumber: z.string(),
  }),
  referenceNumber: z.string().min(1, "Reference number is required"),
  tags: z.array(z.string()),
  status: z.enum(["pending", "draft", "received"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type ApiTransfer = z.infer<typeof ApiTransferSchema>;

type Transfer = Omit<Omit<Omit<Omit<ApiTransfer, "createdAt">, "updatedAt">, "origin">, "destination"> & {
  _id: string; createdAt: string; updatedAt: string; origin: Location; destination: Location;
};

export { type Transfer, ApiTransferSchema, type ApiTransfer };
