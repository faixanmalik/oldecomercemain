import React from 'react'

const TransparentButton = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>
      {children}
    </div>
  )
}

export default TransparentButton
