'use client'

import React from "react"
import OutlinedButton from "@/components/buttons/OutlinedButton"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Text from "@/components/Text"
import Select from "@/components/Select"
import FilledButton from "@/components/buttons/FilledButton"

export default function ChangeLocationDialog() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <OutlinedButton onClick={() => { }}>Change default location</OutlinedButton>
            </DialogTrigger>
            <DialogContent >

                <DialogHeader>
                    <DialogTitle>Change default location</DialogTitle>
                </DialogHeader>

                <div className="w-full flex mt-4 flex-col mb-4 gap-4 px-4">

                    <Text>
                        Select the location that Shopify and apps will use when no other location is specified. Only locations that fulfill online orders can be used as your default location.
                    </Text>

                    <div className="flex w-full gap-4 items-center">
                        <Text className="whitespace-nowrap text-neutral-500">
                            Change default location to:
                        </Text>
                        <Select label="" onChange={() => { }} options={[]} />
                    </div>
                </div>

                <DialogFooter>
                    <OutlinedButton >Cancel</OutlinedButton>
                    <FilledButton >Save</FilledButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

