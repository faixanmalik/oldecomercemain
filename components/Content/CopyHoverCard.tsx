import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { CalendarIcon } from 'lucide-react'
import Image from "next/image"
import { Button } from 'react-day-picker'

const CopyHoverCard = () => {
    return (
        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
          <div className="cursor-pointer rounded-lg border w-7 h-7 flex justify-center items-center shadow-sm shadow-neutral-200">
                    <Image src="/Linksvg.svg" width={22} height={22} alt="Link Image" />
                </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-medium flex justify-center items-center text-xs text-gray-800" >Copy link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
}

export default CopyHoverCard
