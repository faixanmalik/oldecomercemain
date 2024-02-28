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

export function AddModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>
                    <button className="hidden sm:block py-1 px-2 hover:bg-gray-100 rounded-md">
                        <Image
                            src="/PlusButton.svg"
                            width={25}
                            height={25}
                            alt="Plus button Image"
                        />
                    </button>
                    <button className="flex justify-center items-center sm:hidden w-9 h-7 hover:bg-gray-100 rounded-md mr-3">
                        <Image
                            src="/PlusButton.svg"
                            width={30}
                            height={30}
                            alt="Plus button Image"
                        />
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[621px] h-52">
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
