"use client";

import React from 'react'
import { AddModal } from './modals/ContainerBarModals/AddModal'
import { SortPopover } from './popovers/ContainerbarPopover'
import { Input } from "@/components/ui/input"
import { Button } from './ui/button';
import Image from 'next/image'
import { set } from 'date-fns';

const CardTopBar = ({ children, className }: { children?: React.ReactNode, className?: string }) => {

    const [searchclicked, setSearchClicked] = React.useState(true)

    const [search, setSearch] = React.useState('')

    return (
        <>
            <div className='sm:block hidden'>
                <div className={`py-2 w-full border-b border-gray-300 ${className} `}>
                    {searchclicked ? (<div className="flex justify-between items-center px-5">
                        <div className="flex items-center gap-2">
                            <button className="w-auto h-7 py-1 px-3 bg-gray-200 rounded-md text-sm md:text-xs font-semibold text-gray-900 hover:bg-gray-100 transition">All</button>
                            {children}
                            <AddModal />
                        </div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setSearchClicked(false)} className="py-1 px-1 border rounded-md flex items-center shadow-sm shadow-neutral-200">
                                <Image
                                    src="/SearchIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Plus button Image"
                                />

                                <Image
                                    src="/ThreeLines.svg"
                                    width={20}
                                    height={20}
                                    alt="Plus button Image"
                                />
                            </button>

                            <SortPopover />
                        </div>
                    </div>) :
                        (<>
                            <div className="flex justify-between items-center px-5 pb-2">
                                <Input className='h-8 w-[85%]' type="Text" placeholder="Searching in All" />
                                <div className='flex items-center gap-3'>
                                    <button className='text-xs text-gray-700 font-semibold' onClick={() => setSearchClicked(true)}>
                                        Cancel
                                    </button>
                                    <button className="h-7 py-1 px-2 rounded-md text-xs font-semibold text-gray-400  bg-gray-100 transition">
                                        Save as
                                    </button>
                                    <SortPopover />
                                </div>
                            </div>
                            <div className="border-t border-gray-100 w-full">
                                <div className='flex justify-start items-center px-5 pt-2  '>
                                    <button className='flex flex-row justify-between items-center gap-1 border-dashed border px-2 py-1 text-xs rounded-md hover:border-solid'>
                                        Add Filter
                                        <Image src='/PlusImage.svg' width={18} height={18} alt='Plus button Image' />
                                    </button>
                                </div>
                            </div>
                        </>
                        )}
                </div>
            </div>

            <div className='sm:hidden block'>
                <div className={`py-2 w-full border-b border-gray-300 ${className} `}>
                    {searchclicked ? (<div className="flex justify-between items-center px-5">
                        <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap ">
                            <button className="w-auto h-7 py-1 px-3 bg-gray-200 rounded-md text-sm md:text-xs font-semibold text-gray-900 hover:bg-gray-100 transition">All</button>
                            {children}
                            <AddModal />
                        </div>
                        <div className="flex items-center gap-3 pl-3 border-l">
                            <button onClick={() => setSearchClicked(false)} className="w-12 py-1 px-1 border rounded-md flex items-center shadow-sm shadow-neutral-200">
                                <Image
                                    src="/SearchIcon.svg"
                                    width={20}
                                    height={20}
                                    alt="Plus button Image"
                                />
                                <Image
                                    src="/ThreeLines.svg"
                                    width={20}
                                    height={20}
                                    alt="Plus button Image"
                                />
                            </button>

                            <SortPopover />
                        </div>
                    </div>) :
                        (<>
                            <div className="flex justify-between items-center px-5 pb-2">
                                <Input className='h-8 w-[85%]' type="Text" placeholder="Searching in All" />
                                <div className='flex items-center gap-3'>
                                    <button className='text-xs text-gray-700 font-semibold' onClick={() => setSearchClicked(true)}>
                                        Cancel
                                    </button>
                                    <button className="h-7 py-1 px-2 rounded-md text-xs font-semibold text-gray-400  bg-gray-100 transition">
                                        Save as
                                    </button>
                                    <SortPopover />
                                </div>
                            </div>
                            <div className="border-t border-gray-100 w-full">
                                <div className='flex justify-start items-center px-5 pt-2  '>
                                    <button className='flex flex-row justify-between items-center gap-1 border-dashed border px-2 py-1 text-xs rounded-md hover:border-solid'>
                                        Add Filter
                                        <Image src='/PlusImage.svg' width={18} height={18} alt='Plus button Image' />
                                    </button>
                                </div>
                            </div>
                        </>
                        )}
                </div>
            </div>
        </>
    )
}

export default CardTopBar
