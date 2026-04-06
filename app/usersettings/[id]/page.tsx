"use client"

import Header from "@/components/Header"
import { useRouter} from "next/navigation"
import { useEffect, useState } from "react"
import UserSettingsInputModal from "@/components/UserSettignsInputModal"
import { updateUser } from "@/app/actions/Users/updateUser"
import { Iuser } from "@/utils/types"
import { useForm } from "react-hook-form"
import { formDataUserSettings } from "@/utils/types"

export default function page() {
  const router = useRouter()
  const [user, setUser] = useState<Iuser | null>();
  //const [data,setData] = useState<Iuser>();
  const [newPassword,setNewPassword] = useState<string>()
  const {register,setValue,handleSubmit,formState: { errors }} = useForm<Iuser>()
  const [state,setState] = useState<boolean>(false);
  const [change,setChange] = useState<boolean>(true);
  const [attribute,setAttribute] = useState<string>("")

  function getData(formData:formDataUserSettings){
    if(attribute === "avatar"){
      setValue("avatar",formData.avatar)
      //setData({...data,avatar:formData.avatar})
    }else if(attribute === "name"){
      setValue("name",formData.name)
      //setData({...data,name:formData.name})
    }else{
      setValue("password",formData.oldPassword)
      setNewPassword(formData.password)
      //setData({...data,oldPassword:formData.oldPassword,password:formData.password})
    }
    setChange(false)
  }

  async function update(data:Iuser) {
    if(user){
      await updateUser(data,newPassword)
    }
  }

  useEffect(() => {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    },[])

  useEffect(() => {
      if(user){
        setValue("name",user.name)
        setValue("avatar",user.avatar)
        setValue("email",user.email)
        //setData({name:user.name,oldPassword:"",password:"",avatar:user.avatar})
      }
    },[])

 // useEffect(() => {
 //   console.log(data)
  //},[data])

  return (
    <div className='bg-blue-950 min-h-screen'>
        <Header></Header>
        <div>
            <div className="flex flex-row items-center justify-between w-full max-w-5xl my-3 ml-2">
                <button type="button" className="inline-flex items-center text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700  shadow-xs font-medium leading-5 rounded-md text-2xl px-4 mr-2 w-35 h-10 focus:outline-none cursor-pointer" onClick={() => router.push('/')}>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-2 mt-1 size-6">
                   <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                 </svg>Home
                </button>
                <h1 className="text-white text-5xl my-3">Settings</h1>
            </div>
            <div className="bg-white rounded-md w-full max-w-4xl mx-auto mt-3">
                <div className="flex flex-row ml-3">
                    <div className="relative mr-5 mt-3 mb-3 group">
                      <img src={user?.avatar} alt="user avatar" className="w-50 h-50 object-cover"/>
                      <div className="absolute inset-0 bg-black/50 opacity-0 rounded-full cursor-pointer group-hover:opacity-100 transition-opacity flex items-center justify-center" onClick={() => {setAttribute("avatar"); setState(true)}}>
                         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-white">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                      </div>
                    </div>
                    <div className="flex flex-col text-2xl mt-14"> 
                        <h1>Email: {user?.email}</h1>
                        <div className="flex flex-row items-center">
                          <h1>Name: {user?.name}</h1>
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-6 ml-0.5 cursor-pointer hover:text-gray-500" onClick={() => {setAttribute("name"); setState(true)}}>
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </div>
                        <button type="button" className="text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700  shadow-xs font-medium leading-5 rounded-md text-sm px-4 py-1.5 mt-5 w-40 focus:outline-none cursor-pointer" onClick={() => {setAttribute("password"); setState(true)}}>Change Password</button>
                    </div>
                </div>
                <button className="w-40 h-10 mx-85 my-5 text-white bg-green-500 box-border border border-transparent disabled:bg-gray-500 disabled:text-white/50 disabled:cursor-not-allowed hover:bg-green-700  shadow-xs font-medium leading-5 rounded-md text-sm px-4 mr-2 focus:outline-none cursor-pointer" disabled={change} onClick={handleSubmit(update)}>Confirm Changes</button>
            </div>
        </div>

        {state && user ? <UserSettingsInputModal user={user} attribute={attribute} state={state} setState={setState} onSubmitForm={getData}/> : null}
    </div>
  )
}

//function getData(formData:Iuser){
 //   if(attribute === "avatar"){
 //     setData({...data,avatar:formData.avatar})
 //   }else if(attribute === "name"){
  //    setData({...data,name:formData.name})
  //  }else{
  //    setData({...data,oldPassword:formData.oldPassword,password:formData.password})
  //  }
  //  setChange(false)
 // }

