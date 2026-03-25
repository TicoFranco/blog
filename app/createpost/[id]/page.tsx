"use client"
import Header from "@/components/Header"
import { useForm } from "react-hook-form"
import { headerUser, ICreatePost } from "@/utils/types"
import { useRouter} from "next/navigation"
import { useEffect, useState } from "react"
import { createPost } from "@/app/actions/createPost"
import Modal from "@/components/Modal"

export default function createPostPage() {
  const router = useRouter()
  const {register,setValue,handleSubmit,watch,formState: { errors }} = useForm<ICreatePost>()
  const titlePreview = watch("title")
  const bodyPreview = watch("body")
  const [state,setState] = useState(false)
  const [result,setResult] = useState("")
  const [user, setUser] = useState<headerUser | null>();
  const onSubmit = handleSubmit(async (data) => {
    setResult("")
    if(user){
      data.user_id = user.id
      const res = await createPost(data)
      if(res){
       setResult("sucess")
      }else{
       setResult("failure")
      }
    }else{
      setResult("failure")
    }
    setState(true)
  })

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  },[])

  return (
    <div className='bg-blue-950 min-h-screen'>
        <Header></Header>
        <div className="flex flex-col mt-3 ml-5">
            <div className="flex flex-row items-center justify-between w-full max-w-5xl my-3">
                <button type="button" className="inline-flex items-center text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700  shadow-xs font-medium leading-5 rounded-md text-2xl px-4 mr-2 w-35 h-10 focus:outline-none cursor-pointer" onClick={() => router.push('/')}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 mt-1 size-6">
                   <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                 </svg>Home
                </button>
                <h1 className="text-white text-5xl my-3">New post</h1>
            </div>
            <form className='flex flex-col text-white justify-center items-center' onSubmit={onSubmit}>
                <div className="my-1 w-full max-w-2xl">
                  <label htmlFor="title" className="block mb-2.5 text-2xl font-medium text-heading text-white">Title</label>
                  <input type="title" id="title" 
                   className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs" 
                   required {...register("title",{required:"Title is required.",minLength:{value:1,message:"The title must have at least 1 character."},maxLength:{value:150,message:"The title can have a maximum of 150 characters."}})}/>
                   <p className="my-2.5 text-sm text-red-600">{errors.title?.message}</p>
               </div>
               <div className="my-1 w-full max-w-2xl">
                  <label htmlFor="description" className="block mb-2.5 text-2xl font-medium text-heading text-white">Description</label>
                  <textarea id="description" rows={4}
                   className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs" 
                   required {...register("description",{minLength:{value:1,message:"The description must have at least 1 character."},maxLength:{value:250,message:"The description can have a maximum of 150 characters."}})}/>
                   <div className="flex flex-row mt-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 mr-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>
                    <p>optional</p>
                   </div>
                   <p className="my-2.5 text-sm text-red-600">{errors.description?.message}</p>
               </div>
               <div className="my-1 w-full max-w-2xl">
                  <label htmlFor="body" className="block mb-2.5 text-2xl font-medium text-heading text-white">Body</label>
                   <textarea id="body" rows={4} 
                    className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs"
                    required {...register("body",{required:"Body is required.",minLength:{value:1,message:"The body must have at least 1 character."}})}/>
                   <p className="my-2.5 text-sm text-red-600">{errors.body?.message}</p>
               </div>
               <button type="submit" className="w-40 h-10 mx-5 my-5 text-white bg-green-500 box-border border border-transparent hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-xl px-4 mr-2 focus:outline-none cursor-pointer">Create post</button>
            </form>
            <div className="flex flex-col text-white mt-3 justify-center items-center">
                <h1 className="mb-4 text-4xl">Preview</h1>
                <div className="w-full max-w-2xl mb-5">
                  <h1 className='text-4xl my-4 break-words whitespace-pre-line'>{titlePreview}</h1>
                  <p className="break-words whitespace-pre-line">{bodyPreview}</p>
                </div>
            </div>

            {state ? <Modal result={result} setResult={setResult} state={state} setState={setState} sucessText='Post created' failureText='user not found or data provided is incorrect.'/> : null}
        </div>
    </div>
  )
}