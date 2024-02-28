'use client'

import { ApiLocation, ApiLocationSchema } from "@/types/location"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import Card from "@/components/Card"
import SectionTitle from "@/components/SectionTitle"
import Text from "@/components/Text"
import Input from "@/components/Input"
import Select from "@/components/Select"
import countries from "@/data/countries"
import { AiOutlineSearch } from "react-icons/ai"
import Checkbox from "@/components/Checkbox"
import FilledButton from "@/components/buttons/FilledButton"
import { ZodError } from "zod"

export default function CreateLocationForm() {

    const defaultLocation: ApiLocation = {
        name: "",
        country: "",
        address: "",
        city: "",
        postalCode: "",
        apartment: "",
        phone: {
            number: "",
            countryCode: ""
        },
        fulfilOrders: true,
        status: "active",
        isDefault: false,
    }
    const [location, setLocation] = useState<ApiLocation>(defaultLocation)

    async function handleSave() {
        try {

            const result = ApiLocationSchema.parse(location)
            console.log("result:", result)

            const { data, status } = await axios.post("/api/settings/locations", location)
            console.log(data)

            if (status === 201) {
                toast.success("Location added successfully!")
                setLocation(defaultLocation)
            } else {
                toast.error("Failed to add location")
            }
        }
        catch (error) {
            if (error instanceof ZodError) {
                toast.error(error.issues[0].message)
            }
            else {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="flex-col max-w-5xl w-full flex gap-6 my-8">

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

                        <Input id="supplier-address" value={location.address} icon={<AiOutlineSearch />} label="Address" onChange={e => setLocation({ ...location, address: e.target.value })} placeholder="" />
                        <Input id="supplier-apartment" value={location.apartment} label="Apartment, Suite etc" onChange={e => setLocation({ ...location, apartment: e.target.value })} placeholder="" />

                        <div className="flex w-full gap-4">
                            <Input id="supplier-city" value={location.city} label="City" onChange={e => setLocation({ ...location, city: e.target.value })} placeholder="" />
                            <Input id="supplier-postal-code" value={location.postalCode} label="Postal code" onChange={e => setLocation({ ...location, postalCode: e.target.value })} placeholder="" />
                        </div>

                        <div className="flex items-end gap-2 w-full">
                            <div className="w-full">
                                <Input id="supplier-phone-number" value={location.phone.number} label="Phone number" onChange={e => setLocation({ ...location, phone: { ...location.phone, number: e.target.value } })} />
                            </div>
                            <Select options={countries} value={location.phone.countryCode} onChange={e => setLocation({ ...location, phone: { ...location.phone, countryCode: e.target.value } })} />
                        </div>
                    </div>

                </Card>

                <Card className="p-4">
                    <SectionTitle title="Fulfillment details" />
                    <div className="h-4" />
                    <Checkbox label="Fulfill online orders from this location" checked={location.fulfilOrders} onChange={e => setLocation({ ...location, fulfilOrders: e.target.checked })} id="fulfill-orders" />
                    <Text>Inventory at this location is available for sale online.</Text>
                </Card>

            </div>

            <div className="w-full max-w-5xl flex justify-end mb-8">
                <FilledButton onClick={handleSave}>Save</FilledButton>
            </div>
        </>
    )
}
