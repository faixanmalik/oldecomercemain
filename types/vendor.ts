import { z } from "zod";

const VendorSchema = z.object({
  _id: z.string(),
  name: z.string().min(1, "Vendor name is required"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

type Vendor = z.infer<typeof VendorSchema>;

export { VendorSchema, type Vendor };
