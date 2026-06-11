"use client"

import { DeleteUserInteractionModalProps } from "@/utils/types"

export default function DeleteUserInteractionModal({item,state,setState,confirmDelete}:DeleteUserInteractionModalProps){

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40">
            <div className="relative w-full max-w-md p-4">

                <div className="relative bg-slate-950 border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
                   <button type="button" className="absolute top-3 right-2.5 inline-flex items-center justify-center w-9 h-9 text-gray-500 bg-transparent hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer rounded-lg text-sm" onClick={() => setState(false)}>
                      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                      <span className="sr-only">Close modal</span>
                   </button>
                   <div className="flex flex-col items-center justify-center p-4 md:p-5 text-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-15">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                      </svg>
                      <h3 className=" my-3">Are you sure you want to delete this {item}?</h3>
                      <button type="button" className="w-40 h-10 my-5 text-white bg-green-500 box-border border border-transparent hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-xl px-4 mr-2 focus:outline-none cursor-pointer" onClick={() => {confirmDelete(true),setState(false)}}>Continue</button>
                   </div>
                </div>

            </div>
        </div>
    )
}