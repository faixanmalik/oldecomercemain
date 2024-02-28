import { z } from "zod";

const ApiSupplierSchema = z.object({
    name: z.string(),
    company: z.string(),
    address: z.string(),
    country: z.string(),
    apartment: z.string(),
    city: z.string(),
    postalCode: z.string(),
    contactName: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
});

type ApiSupplier = z.infer<typeof ApiSupplierSchema>;

type Supplier = Omit<Omit<ApiSupplier, "createdAt">, "updatedAt"> & {
    _id: string; createdAt: Date; updatedAt: Date;
};

export { type Supplier, ApiSupplierSchema, type ApiSupplier }
