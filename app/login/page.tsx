"use client";
import React from 'react'
import Header from '@/components/Header'
import { useForm } from "react-hook-form"
import Link from 'next/link'
//import { FormDataLogin } from '@/utils/types';
import { getUser } from '../actions/Users/getUser';
import { useState } from 'react';
import ResultModal from '@/components/ResultModal';
import { Iuser } from '@/utils/types';

export default function Login() {
  const [state,setState] = useState(false);
  const [result,setResult] = useState("");
  const {register,setValue,handleSubmit,formState: { errors }} = useForm<Iuser>()
  const onSubmit = handleSubmit(async (data) => {
    setResult("")
    const res = await getUser(data)
    if(res){
      sessionStorage.setItem("user",JSON.stringify(res))
      setResult("sucess")
    }else{
      setResult("failure")
    }
    setState(true)
  })

  return (
    <div className='bg-blue-950 min-h-screen'>
        <Header></Header>
        <div className="flex flex-col justify-center items-center text-white mt-8">
            <h1 className='text-5xl my-4'>Login</h1>
            <form onSubmit={onSubmit} className='w-90 flex flex-col'>
               <div>
                  <label htmlFor="email" className="block mb-2.5 text-sm font-medium text-heading text-white">E-mail</label>
                  <input type="email" id="email" 
                   className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                   required {...register("email",{required:"Email is required.",pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Invalid email format."}})}/>
                   <p className="my-2.5 text-sm text-red-600">{errors.email?.message}</p>
               </div>
               <div>
                  <label htmlFor="password" className="block mb-2.5 text-sm font-medium text-heading text-white">Password</label>
                  <input type="password" id="password" 
                   className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                   required  {...register("password",{required:"Password is required.",minLength:{value:3,message:"invalid password format."},maxLength:{value:15,message:"invalid password format."}})}/>
                   <p className="my-2.5 text-sm text-red-600">{errors.password?.message}</p>
               </div>
               <button type="submit" className="w-40 h-10 mx-25 my-5 text-white bg-green-500 box-border border border-transparent hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-xl px-4 mr-2 focus:outline-none cursor-pointer">Sign In</button>
            </form>
            <p className=''>Don't have an account yet? <Link className='text-green-500 hover:underline' href={'/sign'}>Sign up</Link></p>
        </div>

        {state ? <ResultModal result={result} setResult={setResult} state={state} setState={setState} sucessText='Login successfully' failureText='Your email or password is incorrect.'/>: null}
    </div>
  )
}
