import React, { Children } from 'react'

const CardBarButton = ({ children, className }: { children: React.ReactNode , className : string }) => {
    return (
        <button className={`w-auto h-7 py-1 px-3  rounded-md text-sm md:text-xs font-semibold text-gray-700 hover:bg-gray-200 transition ${className}`}>
            {children}
        </button>
    )
}

export default CardBarButton
