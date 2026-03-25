"use client";
import React from 'react'
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { headerUser } from '@/utils/types';

export default function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<headerUser | null>();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

  return (
    <header>
        <nav className='bg-slate-950 w-full z-20 top-0 start-0 border-b border-default'>
            <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto'>
                <a className="flex items-center cursor-pointer" onClick={() => router.push('/')}>
                   <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M3.559 4.544c.355-.35.834-.544 1.33-.544H19.11c.496 0 .975.194 1.33.544.356.35.559.829.559 1.331v9.25c0 .502-.203.981-.559 1.331-.355.35-.834.544-1.33.544H15.5l-2.7 3.6a1 1 0 0 1-1.6 0L8.5 17H4.889c-.496 0-.975-.194-1.33-.544A1.868 1.868 0 0 1 3 15.125v-9.25c0-.502.203-.981.559-1.331ZM7.556 7.5a1 1 0 1 0 0 2h8a1 1 0 0 0 0-2h-8Zm0 3.5a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2H7.556Z" clipRule="evenodd"/>
                   </svg>
                   <span className="self-center text-heading font-semibold whitespace-nowrap text-white text-3xl pb-2">Blog</span>
                </a>
                {user ? 
                <div className='relative flex items-center md:order-2 space-x-3 md:space-x-0' ref={menuRef}>
                 <button className="flex text-sm bg-inherit rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" onClick={() => setOpen(!open)}>
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full cursor-pointer" src={user.avatar} alt="user photo" />
                 </button>
                 {open && (
                 <div className='absolute right-0 top-full mt-2 z-50 bg-white border border-gray-300 rounded-md shadow-lg w-44'>
                    <div className='px-4 py-3 text-sm border-b border-gray-200'>
                        <span className="block text-gray-900 font-medium">{user.name}</span>
                        <span className="block text-gray-600 truncate">{user.email}</span>
                    </div>
                    <ul className='p-2 text-sm text-gray-600 font-medium'>
                        <li>
                           <a href="#" className="inline-flex items-center w-full p-2 hover:bg-gray-100 hover:text-gray-900 rounded cursor-pointer">Settings</a>
                        </li>
                        <li>
                           <a className="inline-flex items-center w-full p-2 hover:bg-gray-100 hover:text-gray-900 rounded cursor-pointer" onClick={() => router.push(`/createpost/${user.id}`)}>Create a post</a>
                        </li>
                        <li>
                           <a className="inline-flex items-center w-full p-2 text-red-600 hover:bg-gray-100 hover:text-red-900 rounded cursor-pointer" onClick={() => {sessionStorage.clear();setUser(null);router.push('/')}} >Sign out</a>
                        </li>
                    </ul>
                 </div>
                  )} 
                </div>
                :
                <div className='flex flex-row mr-1'>
                    <button type="button" className="text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700  shadow-xs font-medium leading-5 rounded-md text-sm px-4 mr-2 focus:outline-none cursor-pointer" onClick={() => router.push('/login')}>Login</button>
                    <button type="button" className="text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700  shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-1.5 focus:outline-none cursor-pointer" onClick={() => router.push('/sign')}>Sign up</button>
                </div>
                }
            </div>
        </nav>
    </header>
  )
}
