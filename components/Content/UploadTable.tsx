"use client"

import React from 'react'
import Checkbox from '../Checkbox'
import Image from 'next/image'
import CopyHoverCard from './CopyHoverCard'



const UploadTable = () => {
    return (
        <div className="relative overflow-x-auto overflow-y-scroll">
            <table className="w-full text-left rtl:text-right">
                <thead className="text-xs font-light text-table-header bg-gray-50 border-b-2">
                    <tr >
                        <th scope='col' className="pl-6 flex flex-row">
                            <Checkbox id={''} label={''} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.')
                            }} />
                            <th scope='col' className="py-3">
                                File Name
                            </th>
                        </th>
                        <th scope='col' className="px-3 py-3"></th>
                        <th scope='col' className="px-3 py-3"></th>
                        <th scope='col' className="px-6 py-3">
                            Date Added
                        </th>
                        <th scope='col' className="px-6 py-3">
                            Size
                        </th>
                        <th scope='col' className="px-6 py-3">
                            References
                        </th>
                        <th scope='col' className="px-6 py-3">
                            Link
                        </th>

                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 py-3">
                        <td scope='row' className="pl-6 flex flex-row">
                            <Checkbox id={''} label={''} onChange={function (event: React.ChangeEvent<HTMLInputElement>): void {
                                throw new Error('Function not implemented.')
                            }} />
                            <td className="py-3 whitespace-nowrap flex items-center gap-2">
                                <div className="border h-9 w-9 rounded-md"></div>
                                <div className="flex flex-col">
                                    <div className="text-sm font-semibold text-gray-900">pp</div>
                                    <div className="text-sm font-semibold text-gray-600">Png</div>
                                </div>
                            </td>
                        </td>
                        <td className="px-3 py-3 whitespace-nowrap"></td>
                        <td className="px-3 py-3 whitespace-nowrap"></td>

                        <td className="px-6 py-3 whitespace-nowrap">
                            <span className="inline-flex text-xs leading-5 font-semibold rounded-full">Dec 11</span>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-900">23.25 KB</div>
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500 ">---</td>
                        <td className="px-6 py-3 whitespace-nowrap ">
                            <CopyHoverCard />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UploadTable
