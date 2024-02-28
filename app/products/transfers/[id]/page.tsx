import EditTransferForm from "@/components/products/transfers/EditTransferForm"
import { apiUrl } from "@/lib/utils"
import { Transfer } from "@/types/transfer"

export const dynamic = "force-dynamic"

export default async function TransferPage({ params }: { params: { id: string } }) {

  const requests = [
    fetch(apiUrl(`/api/products/transfers/${params.id}`)),
  ]

  const [transferRes] = await Promise.all(requests)
  if (!transferRes.ok) throw new Error("Failed to fetch transfers")

  const [transfer] = await Promise.all([transferRes.json()]) as [Transfer]

  return (
    <div className=" w-full min-h-screen bg-gray-100 items-center flex flex-col">
      <EditTransferForm initialTransfer={transfer} />
    </div>
  )
}

