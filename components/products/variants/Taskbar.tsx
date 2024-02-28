
import Link from 'next/link'
import { Product } from '@/types/product'
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowRoundBack } from 'react-icons/io'
import Heading from '@/components/Heading'
import OutlinedButton from '@/components/buttons/OutlinedButton'


export function Taskbar({ title, product, vi }: { title: string, product?: Product, vi?: number }) {
  return (

    <div className="flex w-full items-start justify-between">
      <div className="flex flex-col md:flex-row px-4 md:px-0 gap-3 items-start ">
        <Link
          href="/products"
          className="p-1 rounded-md hover:bg-black/10 transition-all"
        >
          <IoIosArrowRoundBack size={20} className="text-gray-800" />
        </Link>
        <Heading>{title}</Heading>
      </div>

      <div className="flex w-max items-center">

        <OutlinedButton>
          Duplicate
        </OutlinedButton>

        <div className="w-2" />

        {
          vi !== undefined && (
            <div className=" hidden  md:flex">
              <Link href={`/products/${product!._id}/variants/${vi - 1}`} aria-disabled={vi === 0} className={`${vi === 0 ? "pointer-events-none text-gray-400" : "hover:bg-gray-300 "} border border-gray-300 bg-gray-200 py-1 px-2 grid place-items-center rounded-tl-md rounded-bl-md transition-all`}>
                <IoIosArrowBack size={14} />
              </Link>
              <Link href={`/products/${product!._id}/variants/${vi + 1}`} aria-disabled={product!.variants.length === vi + 1} className={`${product!.variants.length === vi + 1 ? "pointer-events-none text-gray-400" : "hover:bg-gray-300 "} border-t border-b border-r border-gray-300 bg-gray-200 px-2 py-1 grid place-items-center rounded-tr-md rounded-br-md transition-all`}>
                <IoIosArrowForward size={14} />
              </Link>
            </div>
          )
        }
      </div>

    </div>
  )
}

