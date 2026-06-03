"use client"

import { IComment } from "@/utils/types"

export default function CommentCard({id,body,updatedAt,user}:IComment) {
  return (
    <div className="flex items-start gap-2.5 my-10">
        <img src={user.avatarUrl} alt="user avatar" className="w-8 h-8 rounded-full"/>
        <div className="flex flex-col w-full max-w-[320px] leading-[1.5] bg-slate-500/60 p-4 rounded-r-lg rounded-bl-lg">
            <span className="text-sm font-semibold text-white">{user.name}</span>
            <span className="text-sm text-body">{updatedAt}</span>
            <p className="text-sm pt-1.5 text-body">{body}</p>
        </div>
    </div>
  )
}
