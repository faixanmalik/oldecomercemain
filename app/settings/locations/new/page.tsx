import Link from "next/link"
import CreateLocationForm from "@/components/settings/locations/CreateLocationForm"
import { IoIosArrowRoundBack } from "react-icons/io"

export default function CreateLocationPage() {


  return (
    <div className=" w-full bg-gray-100 min-h-screen items-center flex px-4 flex-col">
      <div className="flex-col max-w-5xl w-full flex gap-6 my-8">

        <div className="flex gap-3 items-center ">
          <Link
            href="/settings/locations"
            className="p-2 rounded-md hover:bg-black/10 transition-all"
          >
            <IoIosArrowRoundBack className="text-sm text-[#1a1a1a]" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a1a1a]">
            Add location
          </h1>
        </div>

        <CreateLocationForm />

      </div>

    </div>

  )
}
