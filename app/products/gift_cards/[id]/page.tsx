import EditGiftCardForm from "@/components/products/gift_cards/EditGiftCardForm";
import { apiUrl } from "@/lib/utils";
import { GiftCard } from "@/types/giftCard";

export const dynamic = "force-dynamic"

export default async function GiftCardPage({ params }: { params: { id: string } }) {

  const res = await fetch(apiUrl(`/api/products/gift_cards/${params.id}`), { cache: "no-cache" })
  if (!res.ok) {
    throw new Error("Failed to fetch gift card")
  }
  const card: GiftCard = await res.json()

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <EditGiftCardForm initialGiftCard={card} />
    </div>
  )
}
