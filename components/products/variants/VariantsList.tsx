import Text from '@/components/Text'
import Image from 'next/image'
import Link from 'next/link'
import StatusText from '@/components/StatusText'
import Card from '@/components/Card'
import { Product } from '@/types/product'
import { PiImageThin } from 'react-icons/pi'
import SectionTitle from '@/components/SectionTitle'

export function VariantsList({ product }: { product: Product }) {
  return (

    <div className="md:max-w-[280px] w-full flex flex-col gap-4">

      <Card className="p-4">
        <div className="flex w-full gap-4">
          {
            product.media.length > 0 ? (
              <div className="w-16 h-16 rounded-md overflow-hidden">
                <Image src={product.media[0].url} alt={product.title} width={0} height={0} sizes="100vw" style={{ width: '100%', height: '100%' }} />
              </div>
            ) : (
              <Link href={`/products/${product._id}`} className="w-16 h-16 rounded-md overflow-hidden border border-gray-300 grid place-items-center">
                <PiImageThin size={14} className="text-gray-500" />
              </Link>
            )
          }
          <div className="flex flex-col">
            <div className="flex gap-2">
              <p className="text-sm text-gray-800">{product.title}</p>
              <StatusText status={product.status} />
            </div>

            <Text className="text-neutral-500 mt-2">
              {product.variants.length} variants
            </Text>
          </div>
        </div>
      </Card>

      <Card className="pt-4 overflow-hidden">
        <div className="px-4 mb-4">
          <SectionTitle title="Variants" />
        </div>
        {
          product.variants.map((v, i) => (
            <Link key={i} href={`/products/${product._id}/variants/${i}`} className="hover:bg-gray-100/60 bg-white flex items-center gap-2 px-4 transition-all border-t border-gray-200 py-2">
              {
                v.image ? (
                  <p>hello</p>
                )
                  : (
                    <div className="w-10 h-10 border rounded-md border-gray-200 grid place-items-center">
                      <PiImageThin size={14} className="text-gray-500" />
                    </div>
                  )
              }
              <Text className="text-gray-800">{v.name}</Text>
            </Link>
          ))
        }
      </Card>

    </div>
  )
}
