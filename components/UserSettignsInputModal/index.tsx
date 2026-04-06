"use client"

import { useForm } from "react-hook-form"
import { IUserSettingsInputModal } from "@/utils/types"
import { formDataUserSettings } from "@/utils/types"

export default function UserSettingsInputModal({user,attribute,setState,onSubmitForm}:IUserSettingsInputModal) {
  const {register,setValue,watch,handleSubmit,formState:{errors,isValid}} = useForm<formDataUserSettings>({mode:"onChange"})
  const selectedAvatar = watch("avatar");
  const avatars = ['/avatar_1.png','/avatar_2.png','/avatar_3.png','/avatar_4.png']

  const onSubmit = handleSubmit((data) => {onSubmitForm(data); setState(false)})

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40">
        <div className="relative w-full max-w-md p-4">
            <div className="relative bg-slate-950 border border-gray-200 rounded-lg shadow-sm p-4 md:p-6">
              <button type="button" className="absolute top-3 right-2.5 inline-flex items-center justify-center w-9 h-9 text-gray-500 bg-transparent hover:bg-gray-100 hover:text-gray-900 rounded-lg text-sm cursor-pointer" onClick={() => setState(false)}>
                 <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>
                 <span className="sr-only">Close modal</span>
              </button>
              <div className="flex flex-col items-center justify-center p-4 md:p-5 text-center text-white">
                <form onSubmit={onSubmit}>
                {attribute === "name" ? 
                <>
                <h3 className="text-2xl">Current Username: {user.name}</h3>
                <label htmlFor="name" className="block mb-2.5 text-2xl font-medium text-heading text-white">New Username:</label>
                <input type="text" id="name" className="bg-inherit border border-gray-600 text-heading text-xl rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs"
                  required {...register("name",{required:"Username is required.",minLength:{value:4,message:"The username must have at least 4 characters."},maxLength:{value:20,message:"The username can have a maximum of 20 characters."}})}/>
                <p className="my-2.5 text-sm text-red-600">{errors.name?.message}</p>
                <button type="submit" className="w-40 h-10 my-5 text-white bg-green-500 box-border border border-transparent disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-green-700 shadow-xs font-medium leading-5 rounded-md text-base px-4 mr-2 focus:outline-none cursor-pointer" disabled={!isValid}>Confirm Change</button>
                </> : attribute === "password" ? 
                <>
                <label htmlFor="currentPassword" className="block mb-2.5 text-2xl font-medium text-heading text-white">Current Password:</label>
                <input type="password" id="currentPassword" className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                  required {...register("oldPassword",{required:"Password is required.",minLength:{value:3,message:"The password must have at least 3 characters."},maxLength:{value:15,message:"The password can have a maximum of 15 characters."}})} />
                <p className="my-2.5 text-sm text-red-600">{errors.oldPassword?.message}</p>

                <label htmlFor="newPassword" className="block mb-2.5 mt-2 text-2xl font-medium text-heading text-white">New Password:</label>
                <input type="password" id="newPassword" className="bg-inherit border border-gray-600 text-heading text-sm rounded-md focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs" 
                  required {...register("password",{required:"Password is required.",minLength:{value:3,message:"The password must have at least 3 characters."},maxLength:{value:15,message:"The password can have a maximum of 15 characters."}})} />
                <p className="my-2.5 text-sm text-red-600">{errors.password?.message}</p>

                <button type="submit" className="w-40 h-10 my-5 text-white bg-green-500 box-border border border-transparent disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-base px-4 mr-2 focus:outline-none cursor-pointer" disabled={!isValid}>Confirm Change</button>
                </>: 
                <>
                <h3>Choose new avatar:</h3>
                <div className='flex flex-row my-2'>
                  {avatars.map((avatar) => (<img key={avatar} src={avatar} onClick={() => setValue("avatar",avatar,{ shouldValidate: true })} className={`w-16 h-16 rounded-full mr-2 cursor-pointer border-2 transition ${selectedAvatar === avatar ? "border-blue-600 scale-110" : "border-transparent"}`}/>))}
                </div>
                <button type="submit" className="w-40 h-10 my-5 text-white bg-green-500 box-border border border-transparent disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-base px-4 mr-2 focus:outline-none cursor-pointer" disabled={!selectedAvatar}>Confirm Change</button>
                </>}
                </form>
              </div>
            </div>
        </div>
    </div>
  )
}
