
import React from "react"
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import TextButton from "@/components/buttons/TextButton"
import TitleMini from "@/components/TitleMini"
import Input from "@/components/Input"
import Select from "@/components/Select";
import { AdjustmentName, ApiPurchaseOrder } from "@/types/purchaseOrder";


export default function AdjustmentsDialog({ text, purchaseOrder, setPurchaseOrder }: { text: string, purchaseOrder: ApiPurchaseOrder, setPurchaseOrder: React.Dispatch<React.SetStateAction<ApiPurchaseOrder>> }) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TextButton onClick={() => { }}>{text}</TextButton>
      </DialogTrigger>
      <DialogContent className="h-min">
        <DialogHeader>
          <DialogTitle>Manage cost summary</DialogTitle>
        </DialogHeader>
        <div className="w-full flex mt-4 flex-col px-4">

          <div className=" flex w-full mb-4">
            <div className="w-full">
              <TitleMini text="Adjustment" />
            </div>
            <TitleMini text="Amount" />
          </div>

          <div className=" flex flex-col gap-4 mb-4">
            {
              purchaseOrder.costAdjustments.map(a => (
                <div key={a.name} className=" flex items-center gap-2 w-full">
                  <Select onChange={e => setPurchaseOrder({ ...purchaseOrder, costAdjustments: purchaseOrder.costAdjustments.map(_a => _a.name === a.name ? { ..._a, name: e.target.value as AdjustmentName } : _a) })} options={[
                    { "label": "Select", "value": "", "disabled": true },
                    { "label": "Shipping", "value": "Shipping" },
                    { "label": "Customs duties", "value": "Customs duties" },
                    { "label": "Discount", "value": "Discount" },
                    { "label": "Foreign transaction fee", "value": "Foreign transaction fee" },
                    { "label": "Freight fee", "value": "Freight fee" },
                    { "label": "Insurance", "value": "Insurance" },
                    { "label": "Rush fee", "value": "Rush fee" },
                    { "label": "Surcharge", "value": "Surcharge" },
                    { "label": "Other", "value": "otherAdjustment" }
                  ]} />

                  <div className="w-full">
                    <Input id={a.name} value={a.value} onChange={e => {
                      setPurchaseOrder({ ...purchaseOrder, costAdjustments: purchaseOrder.costAdjustments.map(_a => _a.name === a.name ? { ..._a, value: +e.target.value } : _a) })
                    }} />
                  </div>

                  <button onClick={() => setPurchaseOrder({ ...purchaseOrder, costAdjustments: purchaseOrder.costAdjustments.filter(_a => _a !== a) })}>
                    <IoIosClose size={24} />
                  </button>
                </div>
              ))
            }

          </div>

          <TextButton className="self-start mb-4" onClick={() => setPurchaseOrder({ ...purchaseOrder, costAdjustments: [...purchaseOrder.costAdjustments, { name: "Shipping", value: 0 }] })}>Add adjustment</TextButton>
        </div>
        <DialogFooter>
          <Button size={"sm"} type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

