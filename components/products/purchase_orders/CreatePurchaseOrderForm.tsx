'use client'

import React from "react"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import { ApiPurchaseOrder, ApiPurchaseOrderSchema } from "@/types/purchaseOrder"
import { Supplier } from "@/types/supplier"
import Select from "@/components/Select"
import SupplierDialog from "./SupplierDialog"
import DatePicker from "@/components/DatePicker"
import Input from "@/components/Input"
import { IoIosClose, IoIosSearch } from "react-icons/io"
import TitleMini from "@/components/TitleMini"
import AdjustmentsDialog from "./AdjustmentsDialog"
import { Location } from "@/types/location"
import FilledButton from "@/components/buttons/FilledButton"
import axios from "axios"
import toast from "react-hot-toast"
import { ZodError } from "zod"
import Spinner from "@/components/Spinner"
import BrowseProductsDialog from "@/components/BrowseProductsDialog"
import { Product } from "@/types/product"
import AddProductsDatable from "./AddProductsDatatable"
import { productsToVariantsWithContext, variantToPurchaseOrderItem } from "@/lib/products/utils"

export default function CreatePurchaseOrderForm({ suppliers, locations, currencies }: { suppliers: Supplier[], locations: Location[], currencies: { label: string, value: string, disabled?: boolean }[] }) {

  const defaultPurchaseOrder: ApiPurchaseOrder = {
    destination: locations[0]._id,
    status: "draft",
    shipping: {
      carrier: "",
      trackingNumber: "",
    },
    currency: "",
    items: [],
    total: 46.47,
    referenceNumber: "",
    noteToSupplier: "",
    tags: [],
    supplier: "",
    costAdjustments: [],
  }

  const [products, setProducts] = React.useState<Product[]>([])
  const [purchaseOrder, setPurchaseOrder] = React.useState<ApiPurchaseOrder>(defaultPurchaseOrder);
  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleSave() {

    setLoading(true)

    try {

      ApiPurchaseOrderSchema.parse(purchaseOrder)
      const { status } = await axios.post("/api/products/purchase_orders", purchaseOrder)
      if (status === 201) {
        toast.success("Purchase order created successfully!")
        setPurchaseOrder(defaultPurchaseOrder)
      }
      else {
        toast.error("Failed to create purchase order")
      }

    }
    catch (error) {

      if (error instanceof ZodError) {
        toast.error(error.issues[0].message)
      }
      else {
        toast.error("Failed to create purchase order")
        console.log(error)
      }

    }
    finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    setPurchaseOrder(po => ({ ...po, items: productsToVariantsWithContext(products).map(v => variantToPurchaseOrderItem(v)) }))
  }, [products])

  return (
    <>
      <div className="flex-col max-w-5xl w-full flex gap-6 ">

        <Card className="flex flex-col items-center justify-center p-4">
          <div className="flex flex-col md:flex-row w-full h-full gap-4">

            <div className="w-full h-full flex flex-col items-start gap-4">
              <SectionTitle title="Supplier" />
              {suppliers.length > 0 ? (
                <Select
                  label="Select Supplier"
                  onChange={e => setPurchaseOrder({ ...purchaseOrder, supplier: e.target.value })}
                  value={purchaseOrder.supplier}
                  options={
                    suppliers.map(s => ({ label: s.company, value: s._id }))
                  }
                />
              ) : (

                suppliers.length > 0 ? (
                  <p>Choose one</p>
                ) : (
                  // TODO: redesign like shopify
                  <SupplierDialog
                    text="Create supplier"
                    heading="Create Supplier"
                    onSave={(s) => {
                      console.log(s)
                    }}
                  />
                )

              )}
            </div>

            <div className="w-full h-full flex flex-col gap-4">
              <SectionTitle title="Destination" />
              <Select
                label="Select Destination"
                value={purchaseOrder.destination}
                onChange={e => setPurchaseOrder({ ...purchaseOrder, destination: e.target.value })}
                options={
                  locations.map(l => ({ label: l.name, value: l._id }))
                }
              />
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row justify-between gap-4 mt-8">
            <Select
              label="Payment Terms (optional)"
              onChange={e => setPurchaseOrder({ ...purchaseOrder, paymentTerms: e.target.value })}
              value={purchaseOrder.paymentTerms}
              options={[
                { label: "None", value: "" },
                { label: "Cash on delivery", value: "COD" },
                { label: "Payment on receipt", value: "ON_RECEIPT" },
                { label: "Payment in advance", value: "IN_ADVANCE" },
                { label: "Net 7", value: "NET7" },
                { label: "Net 15", value: "NET15" },
                { label: "Net 30", value: "NET30" },
                { label: "Net 45", value: "NET45" },
                { label: "Net 60", value: "NET60" },
              ]}
            />

            <Select
              label="Supplier Currency"
              value={purchaseOrder.currency}
              onChange={e => setPurchaseOrder({ ...purchaseOrder, currency: e.target.value })}
              options={currencies}
            />
          </div>
        </Card>

        <Card className="p-4 flex flex-col items-start">
          <SectionTitle title="Shipping Details" />
          <div className="mt-4 items-start flex flex-col w-full xl:flex-row gap-4">
            <DatePicker date={purchaseOrder.shipping.arrivalDate ? new Date(purchaseOrder.shipping.arrivalDate) : undefined} setDate={(d => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, arrivalDate: d?.toString() ?? "" } }))} />
            <Input id="shipping-carrier" value={purchaseOrder.shipping.carrier} label="Shipping carrier" onChange={(e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, carrier: e.target.value } }))} />
            <Input id="tracking-number" value={purchaseOrder.shipping.trackingNumber} label="Tracking number" onChange={(e => setPurchaseOrder({ ...purchaseOrder, shipping: { ...purchaseOrder.shipping, trackingNumber: e.target.value } }))} />
          </div>
        </Card>

        <Card className="p-4">
          <SectionTitle title="Add Products" />
          <div className=" w-full flex mb-8 gap-4">
            {/*TODO: replace with a select popover for suppliers*/}
            <Input
              icon={<IoIosSearch />}
              id="add-products"
              placeholder="Search products"
              onChange={e => setPurchaseOrder({ ...purchaseOrder, supplier: e.target.value })}
            />
            <BrowseProductsDialog setProducts={(ps: any) => setProducts(ps)} />
          </div>
          <AddProductsDatable initialItems={purchaseOrder.items} />
        </Card>

        <div className=" flex flex-col 2xl:flex-row w-full gap-6">
          <Card className="p-4 w-full flex gap-4 flex-col">
            <SectionTitle title="Additional details" />
            <AdditionalDetails purchaseOrder={purchaseOrder} setPurchaseOrder={setPurchaseOrder} />
          </Card>

          <Card className="p-4 w-full h-max">
            <div className="flex items-center justify-between w-full">
              <TitleMini text="Cost summary" />
              <AdjustmentsDialog
                text="Manage"
                purchaseOrder={purchaseOrder}
                setPurchaseOrder={setPurchaseOrder}
              />
            </div>

            <div className="flex items-center justify-between w-full">
              <p className="text-xs mb-2 text-neutral-800">Taxes (included)</p>
              <p className="text-xs text-neutral-800">$ 0.00</p>
            </div>

            <div className="flex items-center justify-between w-full">
              <TitleMini text="Subtotal" />
              <p className="text-xs whitespace-nowrap text-neutral-800">
                $ 0.00
              </p>
            </div>
            <p className="text-xs text-neutral-800">0 items</p>

            <TitleMini text="Cost adjustments" />
            <CostAdjustments purchaseOrder={purchaseOrder} />

            <div className="flex justify-between items-center w-full mt-4">
              <h3 className="text-xs font-bold mb-2 text-neutral-800">Total</h3>
              <p className="text-xs text-neutral-800">$ 0.00</p>
            </div>

          </Card>

        </div>
      </div>

      <div className="w-full max-w-5xl flex justify-end mb-8 px-4 md:px-0">
        {
          loading ? (
            <Spinner />
          ) : (
            <FilledButton onClick={handleSave}>Save</FilledButton>
          )
        }
      </div>

    </>
  )
}

function CostAdjustments({ purchaseOrder }: { purchaseOrder: ApiPurchaseOrder }) {
  return (
    <>
      {purchaseOrder.costAdjustments.map((a: any) => (
        <div key={a.name} className="flex justify-between items-center w-full">
          <h3 className="text-xs mb-2 text-neutral-800">{a.name}</h3>
          <p className="text-xs text-neutral-800">$ {a.value}</p>
        </div>
      ))}
    </>
  );
}

function AdditionalDetails({ purchaseOrder, setPurchaseOrder }: { purchaseOrder: ApiPurchaseOrder, setPurchaseOrder: React.Dispatch<React.SetStateAction<ApiPurchaseOrder>> }) {
  const [tags, setTags] = React.useState<string[]>([]);

  return (
    <>
      <Input id="reference-number" label="Reference number" value={purchaseOrder.referenceNumber} onChange={e => setPurchaseOrder({ ...purchaseOrder, referenceNumber: e.target.value })} />
      <Input id="note-to-supplier" label="Note to supplier" />
      <Input
        id="tags"
        label={`Tags ${tags.length > 0 ? `(${tags.length})` : ""}`}
        onKeyDown={(e) => {
          const value = e.currentTarget.value;
          if (e.key === "Enter" && value !== "") {
            setTags([...tags, value]);
            e.currentTarget.value = "";
          }
        }}
      />
      <div className="flex gap-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-slate-200 w-min whitespace-nowrap text-gray-900 px-2 py-1 rounded-md text-sm flex items-center gap-1"
          >
            {tag}{" "}
            <button onClick={() => setTags(tags.filter((t) => t !== tag))}>
              <IoIosClose size={20} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
