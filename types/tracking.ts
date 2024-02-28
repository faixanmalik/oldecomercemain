import { z } from "zod";

const TrackingSchema = z.object({
  trackingNumber: z.string(),
  carrier: z.string().optional(),
});

type Tracking = z.infer<typeof TrackingSchema>;

export { TrackingSchema, type Tracking };
