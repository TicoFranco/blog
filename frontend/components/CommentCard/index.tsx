"use client"

import { IComment } from "@/utils/types"
import { useEffect, useState } from "react"
import DeleteUserInteractionModal from "../DeleteUserInteractionModal"
import ResultModal from "../ResultModal"
import { deleteComment } from "@/app/services/Comments/deleteComment"
import { useForm } from "react-hook-form"
import { updateComment } from "@/app/services/Comments/updateComment"

export default function CommentCard({id,body,updatedAt,user,editable}:IComment) {
  const [open,setOpen] = useState(false)
  const [deleteModalState,setDeleteModalState] = useState(false)
  const [resultModalState,setResultModalState] = useState(false)
  const [resultModalValue,setResultModalValue] = useState('')
  const [failureText,setFailureText] = useState('')
  const [editInput,setEditInput] = useState(false)
  const [successText,setSuccessText] = useState('')
  const {register,setValue,handleSubmit,formState:{errors}} = useForm<IComment>()

  const onSubmit = handleSubmit(async (data) => {
    const res = await updateComment(data)
    
    if("error" in res){
      setFailureText(res.error)
      setResultModalValue("failure")
    }else{
      setSuccessText('post updated')
      setResultModalValue("success")
    }

    setResultModalState(true)
  })

  async function deleteCommentHandler(confirm:boolean){
    if(!confirm){
      return
    }

    const res = await deleteComment(id)

    if("error" in res){
      setFailureText(res.error)
      setResultModalValue("failure")
    }else{
      setSuccessText('post deleted')
      setResultModalValue("success")
    }

    setResultModalState(true)
  }

  useEffect(() => {setValue("body",body),setValue("id",id)},[])

  return (
    <div className="flex flex-col">
      <div className="flex flex-row gap-2.5 mt-8">
          <img src={user.avatarUrl} alt="user avatar" className="w-8 h-8 rounded-full"/>
          <div className="flex flex-col w-full max-w-[250px] leading-[1.5] bg-slate-500/60 p-4 rounded-r-lg rounded-bl-lg self-start">
              <span className="text-sm font-semibold text-white">{user.name}</span>
              <span className="text-sm text-body text-white">{updatedAt}</span>
              <p className="text-sm pt-1.5 text-body text-white">{body}</p>
          </div>
          {editable ? 
          <>
          <div className="flex flex-col">
            <button id={`dropdownMenuIconButton-${id}`} className="inline-flex self-start items-center text-body rounded-lg mt-7 hover:text-heading hover:bg-slate-500/60 cursor-pointer rounded-base p-1.5 focus:outline-none" 
              type="button" onClick={() => setOpen(prev => !prev)}>
              <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="3" d="M12 6h.01M12 12h.01M12 18h.01"/></svg>
            </button>
            {open ? (
              <div id={`dropdownDots-${id}`} className="z-10 bg-slate-500/60 border-none rounded-lg shadow-lg w-20 block mt-2">
                <ul className="p-2 text-sm text-body font-medium">
                  <li>
                      <a className="inline-flex text-white items-center w-full p-2 hover:bg-slate-800/50 hover:rounded cursor-pointer" onClick={() => setEditInput(prev => !prev)}>Edit</a>
                  </li>
                  <li>
                     <a className="inline-flex items-center w-full p-2 text-red-600 hover:bg-slate-800/50 hover:rounded cursor-pointer" onClick={() => setDeleteModalState(true)}>Delete</a>
                  </li>
                </ul>
              </div>
            ):null}
          </div> </> : null}
      </div>

      {editInput ? 
        <form onSubmit={onSubmit}>
          <div className='w-full max-w-[290px] my-2 border border-default rounded-lg bg-slate-500/60 shadow-sm'>
            <div className='px-1 py-1.5 rounded-t-lg'>
              <label htmlFor="comment" className='sr-only'>Your comment</label>
              <textarea id="comment" rows={4} 
                className='block w-full max-w-[500px] px-0 text-sm text-white border-0 outline-none focus:outline-none focus:ring-0 placeholder:text-gray-500' placeholder="Write a comment..." 
                {...register("body",{minLength:{value:1,message:"the Comment must have at least 1 character."}})} required></textarea>
            </div>
            <div className='flex items-center px-3 py-2 border-t border-gray-300'>
                <button type="submit" className="text-white bg-green-600 box-border border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-white-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-3 py-2 focus:outline-none cursor-pointer">Edit Comment</button>
            </div>
          </div>
        </form> : null}

        {deleteModalState ? <DeleteUserInteractionModal item="comment" state={deleteModalState} setState={setDeleteModalState} confirmDelete={deleteCommentHandler} /> : null}
        {resultModalState ? <ResultModal state={resultModalState} setState={setResultModalState} result={resultModalValue} setResult={setResultModalValue} sucessText={successText} failureText={failureText} /> : null}
    </div>
  )
}