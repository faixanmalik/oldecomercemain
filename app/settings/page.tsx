import LinkMini from "@/components/LinkMini"
import React from "react"

export default function SettingsPage() {

  const links: string[] = [
    "locations"
  ]

  return (
    <div>
      <h1>Settings</h1>

      <div className="flex flex-col items-start mt-4 ml-4 gap-2">
        {
          links.map(l => (
            <LinkMini href={`/settings/${l}`} key={l} >
              <span>{l}</span>
            </LinkMini>
          ))
        }
      </div>


    </div>
  )
}
