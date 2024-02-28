import React from 'react'

const OuterText = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='mt-3 text-sm font-medium text-[#303030] flex justify-center items-center'>
      {children}
    </div>
  )
}

export default OuterText
