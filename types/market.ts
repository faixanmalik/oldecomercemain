
import { z } from 'zod'

const ApiMarketSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  domain: z.string().optional(),
})

type ApiMarket = z.infer<typeof ApiMarketSchema>
type Market = ApiMarket & {
  _id: string, createdAt: string, updatedAt: string
}

export { type Market, type ApiMarket, ApiMarketSchema }
