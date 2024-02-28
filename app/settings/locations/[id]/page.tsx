'use client'

import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import Link from "next/link"
import Text from "@/components/Text"
import Input from "@/components/Input"
import Select from "@/components/Select"
import countries from "@/data/countries"
import { AiOutlineSearch } from "react-icons/ai"
import Checkbox from "@/components/Checkbox"
import FilledButton from "@/components/buttons/FilledButtonSmall"
import { ApiLocation } from "@/types/location"
import { useState } from "react"
import Heading from "@/components/Heading"
import { IoIosArrowRoundBack } from "react-icons/io"

export default function CreateLocationPage() {

  const [location, setLocation] = useState<ApiLocation>({
    name: "Sample Location",
    country: "Sample Country",
    address: "123 Sample Street",
    apartment: "Sample Apartment",
    city: "Sample City",
    postalCode: "12345",
    phone: {
      number: "123-456-7890",
      countryCode: "US"
    },
    fulfilOrders: true,
    status: "active",
    isDefault: true,
  })

  function handleSave() {
    console.log("Save")
  }

  return (
    <div className=" w-full bg-gray-100 min-h-screen items-center flex flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6 my-8">

        <div className="flex gap-3 items-center ">
          <Link
            href="/settings/locations"
            className="p-2 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack className="text-sm text-[#1a1a1a]" />
          </Link>

          <div className="flex gap-4 items-center">
            <Heading>{location.name}</Heading>
            {
              location.isDefault && <Text className="text-gray-600 bg-gray-200 py-1 px-2 rounded-full">Defualt</Text>
            }
          </div>
        </div>

        <Card className="p-4">
          <SectionTitle title="Location name" />
          <Text className="text-neutral-500 mb-4">Give this location a short name to make it easy to identify. You’ll see this name in areas like orders and products. If this location offers local pickup, it will be visible to your customers at checkout and in notifications.</Text>

          <Input value={location.name} id="location-name" placeholder="Location name" onChange={e => setLocation({ ...location, name: e.target.value })} />
        </Card>

        <Card className="p-4">
          <SectionTitle title="Location name" />
          <Text>Give this location a short name to make it easy to identify. You’ll see this name in areas like orders and products. If this location offers local pickup, it will be visible to your customers at checkout and in notifications.</Text>

          <div className="flex flex-col gap-4 mt-4">
            <Select value={location.country} label="Country/Region" onChange={e => setLocation({ ...location, country: e.target.value })} options={countries} />

            <Input value={location.address} id="supplier-address" icon={<AiOutlineSearch />} label="Address" onChange={e => setLocation({ ...location, address: e.target.value })} placeholder="" />
            <Input value={location.apartment} id="supplier-apartment" label="Apartment, Suite etc" onChange={e => setLocation({ ...location, apartment: e.target.value })} placeholder="" />

            <div className="flex w-full gap-4">
              <Input value={location.city} id="supplier-city" label="City" onChange={e => setLocation({ ...location, city: e.target.value })} placeholder="" />
              <Input value={location.postalCode} id="supplier-postal-code" label="Postal code" onChange={e => setLocation({ ...location, postalCode: e.target.value })} placeholder="" />
            </div>

            <div className="flex items-end gap-2 w-full">
              <div className="w-full">
                <Input value={location.phone.number} id="supplier-phone-number" label="Phone number" onChange={e => setLocation({ ...location, phone: { ...location.phone, number: e.target.value } })} />
              </div>
              <Select value={location.phone.countryCode} options={countries} onChange={e => setLocation({ ...location, phone: { ...location.phone, countryCode: e.target.value } })} />
            </div>
          </div>

        </Card>

        <Card className="p-4">
          <SectionTitle title="Fulfillment details" />
          <div className="h-4" />
          <Checkbox checked={location.fulfilOrders} label="Fulfill online orders from this location" onChange={() => { }} id="fulfill-orders" />
          <Text>Inventory at this location is available for sale online.</Text>
        </Card>

      </div>

      <div className="w-full max-w-5xl flex justify-end mb-8">
        <FilledButton onClick={handleSave}>Save</FilledButton>
      </div>
    </div>

  )
}
