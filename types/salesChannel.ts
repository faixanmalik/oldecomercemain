import { z } from 'zod'

const ApiSalesChannelSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

type ApiSalesChannel = z.infer<typeof ApiSalesChannelSchema>
type SalesChannel = ApiSalesChannel & {
  _id: string, createdAt: string, updatedAt: string
}

export { type SalesChannel, type ApiSalesChannel, ApiSalesChannelSchema }
