"use client";
import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import { useParams, useRouter } from 'next/navigation';
import { IPost, postUserCreator } from '@/utils/types';
import { getPost } from '@/app/actions/getPost';
import { getUserById } from '@/app/actions/getUserById';


export default function Post() {
  const params = useParams<{id:string}>()
  const router = useRouter();
  const [post,setPost] = useState<IPost | null>(null)
  const [user,setUser] = useState<postUserCreator | null>()

  useEffect(() => {
    getPost(params.id).then(setPost)
  },[params.id])

  useEffect(() => {
    if(post){
      getUserById(post.user_id).then(setUser)
    }
  },[post])

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
               <img className="w-10 h-10 rounded-full mt-1 mr-3" src={user?.avatar} alt="Rounded avatar"></img>
               <div className='flex flex-col'>
                 <p>{user?.name}</p>
                 <p>{post?.created_at}</p>
               </div>
            </div>
            <div className='w-full max-w-7xl'>
              <h1 className='text-4xl my-4 break-words whitespace-pre-line'>{post?.title}</h1>
              <p className='break-words whitespace-pre-line'>{post?.body}</p>
            </div>
          </div>
        </div>
    </div>
  )
}
