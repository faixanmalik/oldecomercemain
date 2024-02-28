"use client"

import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import LinkMini from "@/components/LinkMini"
import FilledButton from "@/components/buttons/FilledButton"

export function DefinationModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <FilledButton>Add defination</FilledButton>
            </DialogTrigger>
            <DialogContent className="w-96">
                <DialogHeader className="h-14">
                    <DialogTitle>Create New View</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-start gap-2 p-4">
                    <Label >Name</Label>
                    <Input placeholder="Enter View Name" />
                </div>
                <DialogFooter className="justify-end items-center p-4 ">
                    <DialogClose asChild>
                        <Button className="h-7" type="button" variant="secondary">
                            Cancel
                        </Button>

                    </DialogClose>
                    <Button className="h-7" type="button" variant="ghost">
                        Create View
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
