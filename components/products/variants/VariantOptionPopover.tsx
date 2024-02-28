import Checkbox from "@/components/Checkbox"
import React from "react"
import { ApiVariant, VariantOption } from "@/types/product"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { IoIosArrowDown } from "react-icons/io"
import Text from "@/components/Text"

export default function VariantOptionPopover({ option, variants, selectedVariants, setSelectedVariants }: { option: VariantOption, variants: ApiVariant[], selectedVariants: ApiVariant[], setSelectedVariants: React.Dispatch<React.SetStateAction<ApiVariant[]>> }) {

  function handleChange(checked: boolean, val: string) {
    if (checked) {
      const newVariants: ApiVariant[] = [...selectedVariants, ...variants.filter(v => v.values[option.name] === val)]
      const uniqueVariants: ApiVariant[] = newVariants.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)
      setSelectedVariants(uniqueVariants)
    } else {
      setSelectedVariants(selectedVariants.filter(v => v.values[option.name] !== val))
    }
  }

  function isChecked(val: string) {
    return selectedVariants.filter(v => v.values[option.name] === val).length === variants.filter(v => v.values[option.name] === val).length
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-blue-700 hover:underline" onClick={() => { }}>
          <Text className="capitalize">{option.name}</Text>
          <IoIosArrowDown size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-min p-3 rounded-xl">
        <div className="flex flex-col gap-2">
          {option.values.map((val) => (
            <Checkbox key={val} id={option.name + val} checked={isChecked(val)} onChange={e => handleChange(e.target.checked, val)} label={val} />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
