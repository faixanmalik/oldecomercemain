import React from 'react'

const Contentlayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='p-7'>
      {children}
    </div>
  )
}

export default Contentlayout
