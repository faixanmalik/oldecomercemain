import { RadioItem } from "@/types"
import React from "react"

export default function Radio({ items, name, onChange, className = "" }: { items: RadioItem[], name: string, className?: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) {
  return (
    <div className={className}>
      {
        items.map(item => (
          <div key={item.value} className="inline-flex items-center">
            <label className="relative flex items-center p-3 rounded-full cursor-pointer" htmlFor={name + item.value}>
              <input name={name} type="radio"
                onChange={onChange}
                checked={item.checked}
                value={item.value}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-blue-gray-200 text-gray-900 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id={name + item.value} />
              <span
                className="absolute text-gray-900 transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
                </svg>
              </span>
            </label>
            <div className="flex flex-col items-start">
              <label className="mt-px text-sm text-gray-900 cursor-pointer select-none" htmlFor={name + item.value}>
                {item.label}
              </label>
              {
                item.description && (
                  <p className="text-xs mt-2 text-gray-500 text-start">
                    {item.description}
                  </p>
                )
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
