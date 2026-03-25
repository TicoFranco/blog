"use client";
import React from 'react'
import Header from '@/components/Header'
import { useForm } from "react-hook-form"
import { useState } from 'react';
import { FormDataSignUp } from '@/utils/types';
import { postUser } from '../actions/postUser';
import Modal from '@/components/Modal';

const avatars = ['/avatar_1.png','/avatar_2.png','/avatar_3.png','/avatar_4.png']

export default function SignUp() {
  const [state,setState] = useState(false);
  const [result,setResult] = useState("");
  const {register,setValue,handleSubmit,watch,formState: { errors }} = useForm<FormDataSignUp>()
  const selectedAvatar = watch("avatar");
  const onSubmit = handleSubmit(async (data) => {
    setResult("")
    const res = await postUser(data)
    if(res){
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
            <h1 className='text-7xl mb-9'>Sign Up</h1>
            <form className='w-90 flex flex-col' onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username" className="block mb-2.5 text-xl font-medium text-heading">Username</label>
                    <input type="text" id="username" 
                    className="bg-inherit border border-gray-600 text-heading text-xl rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                    required {...register("name",{required:"Username is required.",minLength:{value:4,message:"The username must have at least 4 characters."},maxLength:{value:20,message:"The username can have a maximum of 20 characters."}})}/>
                    <p className="my-2.5 text-sm text-red-600">{errors.name?.message}</p>
                </div>
                 <div>
                    <label htmlFor="email" className="block mb-2.5 mt-3 text-xl font-medium text-heading">E-mail</label>
                    <input type="email" id="email" 
                    className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                    required {...register("email",{required:"Email is required",pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,message:"Invalid email format"}})} />
                    <p className="my-2.5 text-sm text-red-600">{errors.email?.message}</p>
                </div>
                 <div>
                    <label htmlFor="password" className="block mb-2.5 mt-3 text-xl font-medium text-heading">Password</label>
                    <input type="password" id="password" 
                    className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                    required {...register("password",{required:"Password is required.",minLength:{value:3,message:"The password must have at least 3 characters."},maxLength:{value:15,message:"The password can have a maximum of 15 characters."}})} />
                    <p className="my-2.5 text-sm text-red-600">{errors.password?.message}</p>
                </div>
                <div>
                   <input type="hidden" {...register("avatar", {required: "Choose an avatar"})}/>
                   <h3 className='text-xl my-2.5 font-medium'>Choose an avatar</h3>
                   <div className='flex flex-row my-2'>
                     {avatars.map((avatar) => (<img key={avatar} src={avatar} onClick={() => setValue("avatar",avatar,{ shouldValidate: true })} className={`w-16 h-16 rounded-full mr-2 cursor-pointer border-2 transition ${selectedAvatar === avatar ? "border-blue-600 scale-110" : "border-transparent"}`}/>))}
                   </div>
                   <p className="my-2.5 text-sm text-red-600">{errors.avatar?.message}</p>
                </div>
                <div className="flex items-center mb-4 mt-4">
                   <input id="terms-checkbox" type="checkbox" value="" className="w-4 h-4 border border-default-medium rounded-xs bg-neutral-secondary-medium focus:ring-2 focus:ring-brand-soft" required />
                   <label htmlFor="terms-checkbox" className="select-none ms-2 text-sm font-medium text-heading">I agree with the terms and conditions.</label>
                </div>
                <button type="submit" className="w-40 h-10 mx-25 my-5 text-white bg-green-500 box-border border border-transparent hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-xl px-4 mr-2 focus:outline-none cursor-pointer">Sign Up</button>
            </form>

            {state ? <Modal result={result} setResult={setResult} state={state} setState={setState} sucessText='Account created.' failureText='The data provided is incorrect or is already being used.'/> : null}
        </div>
    </div>
  )
}
