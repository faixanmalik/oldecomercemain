import { z } from "zod"

const ApiLocationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  country: z.string().min(1, "Country is required"),
  address: z.string().min(1, "Address is required"),
  apartment: z.string(),
  city: z.string(),
  postalCode: z.string(),
  phone: z.object({
    countryCode: z.string(),
    number: z.string(),
  }),
  fulfilOrders: z.boolean(),
  status: z.enum(["active", "inactive"]),
  isDefault: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

type ApiLocation = z.infer<typeof ApiLocationSchema>;
type Location = Omit<Omit<ApiLocation, "createdAt">, "updatedAt"> & {
  _id: string; createdAt: string; updatedAt: string;
};

export { type Location, ApiLocationSchema, type ApiLocation }
