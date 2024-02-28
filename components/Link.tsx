import React from 'react'

const OuterLink = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='text-sm font-medium px-1 text-blue-700 underline '>
      {children}
    </div>
  )
}

export default OuterLink
