"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostCardProps } from '@/utils/types';
import { deletePost } from '@/app/services/Posts/deletePost';
import DeleteUserInteractionModal from '../DeleteUserInteractionModal';
import ResultModal from '../ResultModal';

export default function PostCard({updatedAt,title,description,id,editable}:PostCardProps) {
  const router = useRouter();
  const [open,setOpen] = useState(false)
  const [deleteModalState,setDeleteModalState] = useState(false)
  const [resultModalState,setResultModalState] = useState(false)
  const [resultModalValue,setResultModalValue] = useState('')
  const [failureText,setFailureText] = useState('')

  async function deletePostHandler(confirm:boolean){
    if(!confirm){
      return
    }

    const res = await deletePost(id)

    if("error" in res){
      setFailureText(res.error)
      setResultModalValue("failure")
    }else{
      setResultModalValue("success")
    }

    setResultModalState(true)
  }

  return (
    <div className="flex flex-row gap-2.5">
        <a className="bg-slate-500/60 block p-6 w-full max-w-2xs mb-3 border border-default rounded-sm shadow-xs group hover:bg-slate-800/50 text-white cursor-pointer sm:max-w-xl md:max-w-2xl lg:max-w-3xl" onClick={() => router.push(`/post/${id}`)} >
          <h3 className='text-2xl'>{updatedAt}</h3>
          <h1 className='text-4xl sm:text-6xl'>{title}</h1>
          <p className='break-words mt-2'>{description}</p>
          <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
          </svg>
        </a>
        {editable ? 
          <div className="flex flex-col">
            <button id={`dropdownMenuIconButton-${id}`} className="inline-flex self-start items-center text-body rounded-lg mt-7 hover:text-heading hover:bg-slate-500/60 cursor-pointer rounded-base p-1.5 focus:outline-none" 
              type="button" onClick={() => setOpen(prev => !prev)}>
              <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M12 6h.01M12 12h.01M12 18h.01"/></svg>
            </button>
            {open ? 
              <div id={`dropdownDots-${id}`} className="z-10 bg-slate-500/60 border-none rounded-lg shadow-lg w-20 block mt-2">
                <ul className="p-2 text-sm text-body font-medium"> 
                  <li>
                    <a className="inline-flex text-white items-center w-full p-2 hover:bg-slate-800/50 hover:rounded cursor-pointer" onClick={() => router.push(`/editPost/${id}`)}>Edit</a>
                  </li>
                  <li>
                    <a className="inline-flex items-center w-full p-2 text-red-600 hover:bg-slate-800/50 hover:rounded cursor-pointer" onClick={() => setDeleteModalState(true)}>Delete</a>
                  </li>
                </ul>
              </div> : null}
          </div> : null}
          
        {deleteModalState ? <DeleteUserInteractionModal item='post' state={deleteModalState} setState={setDeleteModalState} confirmDelete={deletePostHandler} /> : null}
        {resultModalState ? <ResultModal state={resultModalState} setState={setResultModalState} result={resultModalValue} setResult={setResultModalValue} sucessText='post deleted' failureText={failureText} /> : null}
    </div>
  )
}