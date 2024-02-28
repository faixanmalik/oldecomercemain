'use client'

import React from "react"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import Input from "@/components/Input"
import Text from "@/components/Text"
import Radio from "@/components/Radio"
import DatePicker from "@/components/DatePicker"
import { ApiGiftCard, ApiGiftCardSchema } from "@/types/giftCard"
import Spinner from "@/components/Spinner"
import FilledButton from "@/components/buttons/FilledButton"
import toast from "react-hot-toast"
import { ZodError } from "zod"
import axios, { AxiosError } from "axios"

export default function CreateGiftCardForm() {

  const defaultGiftCard: ApiGiftCard = {
    code: "",
    initialValue: 0,
    customer: "",
    internalNotes: "",
    status: "active",
    hasExpiry: false,
    createdBy: {
      // TODO:
      name: "Admin",
    },
    recipient: "",
  }

  const [giftCard, setGiftCard] = React.useState<ApiGiftCard>(defaultGiftCard)
  const [loading, setLoading] = React.useState(false)

  async function handleSave() {

    setLoading(true)
    console.log(giftCard)

    try {

      ApiGiftCardSchema.parse(giftCard)
      const { status } = await axios.post("/api/products/gift_cards", giftCard)
      if (status === 201) {
        toast.success("Gift card created successfully")
        setGiftCard(defaultGiftCard)
      }

    } catch (error) {

      if (error instanceof ZodError) {
        toast.error((error as ZodError).errors[0].message);
      } else if (error instanceof AxiosError) {
        toast.error(error.message);
        console.log(error)
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col 2xl:flex-row gap-6">
        <div className="flex flex-col w-full gap-6">

          <Card className="flex flex-col gap-4 p-4">
            <SectionTitle title="Gift card details" />
            <Input id="gift-card-code" value={giftCard.code} onChange={e => setGiftCard({ ...giftCard, code: e.target.value })} label="Gift Card Code" />
            <Input id="initial-value" value={giftCard.initialValue} label="Initial Value" type="number" onChange={e => setGiftCard({ ...giftCard, initialValue: Number(e.target.value) })} icon={
              <Text>$</Text>
            } />
          </Card>

          <Card className="flex flex-col gap-4 p-4">
            <SectionTitle title="Expiration date" />
            <Text>
              Countries have different laws for gift card expiry dates. Check the laws for your country before changing this date.
            </Text>
            <Radio name="expiration-date" onChange={e => setGiftCard({ ...giftCard, hasExpiry: e.target.value === "has-expiration-date" })
            } items={[
              { label: "No Expiration Date", value: "no-expiration-date", checked: !giftCard.hasExpiry },
              { label: "Set Expiration Date", value: "has-expiration-date", checked: giftCard.hasExpiry },
            ]} />

            {
              giftCard.hasExpiry && (
                <DatePicker date={giftCard.expiresAt ? new Date(giftCard.expiresAt) : undefined} setDate={d => setGiftCard({ ...giftCard, expiresAt: d?.toString() })} label="Expires on" />
              )
            }
          </Card>

        </div>


        <div className="flex w-full 2xl:max-w-[280px] flex-col gap-6">

          {/*TODO: change to a select popover and use real customers*/}
          <Card className="flex flex-col p-4">
            <SectionTitle title="Customer" />
            <Input id="customer" value={giftCard.customer} onChange={e => setGiftCard({ ...giftCard, customer: e.target.value })} />
          </Card>

          <Card className="flex flex-col p-4">
            <SectionTitle title="Internal notes" />
            <Input id="internal-notes" value={giftCard.internalNotes} onChange={e => setGiftCard({ ...giftCard, internalNotes: e.target.value })} />
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

    </div>
  )
}
