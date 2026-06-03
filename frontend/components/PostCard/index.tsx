"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { IPost } from '@/utils/types';

export default function PostCard({updatedAt,title,description,id}:Partial<IPost>) {
  const router = useRouter();

  return (
    <a className="bg-slate-500/60 block p-6 w-full max-w-3xl mb-3 border border-default rounded-sm shadow-xs group hover:bg-slate-800/50 text-white cursor-pointer" onClick={() => router.push(`/post/${id}`)} >
      <h3 className='text-2xl'>{updatedAt}</h3>
      <h1 className='text-6xl'>{title}</h1>
      <p className='break-words mt-2'>{description}</p>
      <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
      </svg>
    </a>
  )
}