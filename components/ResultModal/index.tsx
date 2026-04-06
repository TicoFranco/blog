"use client"
import { useRouter } from "next/navigation";
import { IResultModal } from "@/utils/types";

export default function ResultModal({state,result,setState,setResult,sucessText,failureText}:IResultModal) {
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40">
        <div className="relative w-full max-w-md p-4">
            <div className="relative bg-slate-950 border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
              <button type="button" className="absolute top-3 right-2.5 inline-flex items-center justify-center w-9 h-9 text-gray-500 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm" onClick={() => setState(false)}>
                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                 <span className="sr-only">Close modal</span>
              </button>
              <div className="flex flex-col items-center justify-center p-4 md:p-5 text-center text-white">
                {result === "sucess" ? 
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-15 h-15 text-green-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className='my-3'>{sucessText}</h3>
                   <button type="button" className="w-40 h-10 my-5 text-white bg-green-500 box-border border border-transparent hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-xl px-4 mr-2 focus:outline-none cursor-pointer" onClick={() => router.push('/')}>Continue</button>
                </> :
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-15 h-15 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <h3 className='my-3'>{failureText}</h3>
                  <button type="button" className="w-40 h-10 my-5 text-white bg-red-600 box-border border border-transparent hover:bg-red-800  shadow-xs font-medium leading-5 rounded-md text-xl px-4 mr-2 focus:outline-none cursor-pointer" onClick={() => setState(false)}>Try again</button>
                </>}
              </div>
            </div>
        </div>
    </div>
  )
}
