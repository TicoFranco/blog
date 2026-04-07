"use client";
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { useParams, useRouter } from 'next/navigation';
import { getPost } from '@/app/actions/Posts/getPost';
import CommentCard from '@/components/CommentCard';
import { useForm } from "react-hook-form"
import Link from 'next/link';
import { postComment } from '@/app/actions/Comments/postComment';
import { getCommentsPost } from '@/app/actions/Comments/getCommentsPost';
import { IComment, Iuser, IPost } from '@/utils/types';

export default function Post() {
  const params = useParams<{id:string}>()
  const router = useRouter();
  const [post,setPost] = useState<IPost | null>(null)
  const [comments,setComments] = useState<IComment[]>([])
  const {register,setValue,handleSubmit,formState:{errors}} = useForm<IComment>()
  const [user, setUser] = useState<Iuser | null>();

  const onSubmit = handleSubmit(async (data) =>{
    const res = await postComment(data)
    if(res){
      const dateTime = new Date().toLocaleString("en-US",{month: "short",day: "2-digit",year: "numeric",hour: "2-digit",minute: "2-digit",hour12: true})
      setValue("created_at",dateTime)
      setComments((prev) => [...prev,data])
    }
  })

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  },[])

  useEffect(() => {
    getPost(params.id).then(setPost)
    getCommentsPost(params.id).then(setComments)
  },[params.id])

  useEffect(() => {
    if(user && post){
      setValue("username",user.name)
      setValue("user_avatar",user.avatar)
      setValue("user_id",user.id)
      setValue("post_id",post.id)
    }
  },[user,post])

  return (
    <div className='min-h-screen'>
        <Header></Header>
        <div className='flex flex-col ml-8 mt-5 text-white'>
          <button type="button" className="inline-flex items-center text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700  shadow-xs font-medium leading-5 rounded-md text-2xl px-4 mr-2 w-35 h-10 focus:outline-none cursor-pointer" onClick={() => router.push('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 mt-1 size-6">
              <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
            </svg>Home
          </button>
          <div className='flex flex-col mt-10'>
            <div className='flex flex-row'>
               <img className="w-10 h-10 rounded-full mt-1 mr-3" src={post?.user_avatar} alt="Rounded avatar"></img>
               <div className='flex flex-col'>
                 <p>{post?.username}</p>
                 <p>{post?.created_at}</p>
               </div>
            </div>
            <div className='w-full max-w-7xl'>
              <h1 className='text-4xl my-4 break-words whitespace-pre-line'>{post?.title}</h1>
              <p className='break-words whitespace-pre-line'>{post?.body}</p>
            </div>
          </div>
          <div>
            <h1 className='mt-20 mb-5 text-4xl'>Comments</h1>
            {comments.map((comment) => (<CommentCard username={comment.username} user_avatar={comment.user_avatar} created_at={comment.created_at} body={comment.body} />))}

            {user ? 
            <form onSubmit={onSubmit}>
              <div className='w-full max-w-[500px] mb-4 border border-default rounded-lg bg-slate-500/60 shadow-sm'>
                <div className='px-1 py-1.5 rounded-t-lg'>
                  <label htmlFor="comment" className='sr-only'>Your comment</label>
                  <textarea id="comment" rows={4} 
                  className='block w-full max-w-[500px] px-0 text-sm text-white border-0 outline-none focus:outline-none focus:ring-0 placeholder:text-gray-500' placeholder="Write a comment..." 
                  {...register("body",{minLength:{value:1,message:"the Comment must have at least 1 character."}})} required></textarea>
                </div>
                <div className='flex items-center px-3 py-2 border-t border-gray-300'>
                  <button type="submit" className="text-white bg-green-600 box-border border border-transparent hover:bg-green-700 focus:ring-4 focus:ring-white-300 shadow-sm font-medium leading-5 rounded-lg text-sm px-3 py-2 focus:outline-none cursor-pointer">Post comment</button>
                </div>
              </div>
            </form> : 
            <>
            <div className='flex flex-row mb-5'>
              <h1 className='text-lg mr-1'>You need to be logged in to leave a comment.</h1>
              <Link className='text-lg text-green-500 hover:underline' href="/login">Log in</Link>
            </div>
            </>}

          </div>
        </div>
    </div>
  )
}