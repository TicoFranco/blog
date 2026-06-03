"use client"

import { createContext,useState,useContext, useEffect } from "react"
import { Iuser } from "@/utils/types"
import { getCookieUser } from "@/app/services/Users/getCookieUser"

type UserContextType = {
    user:Iuser|null,
    setUser:(user:Iuser|null) => void
}

const UserContext = createContext<UserContextType>({user:null,setUser:() => {}})

export const UserProvider = ({children}:{children:React.ReactNode}) => {
    const [user,setUser] = useState<Iuser|null>(null)

    async function getUser(){
       const searchUser = await getCookieUser()
        if(searchUser.error){
            return
        }
        setUser(searchUser)
    }

    useEffect(() => {getUser()},[])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContextApi = () =>{
    const context = useContext(UserContext)
    return context
}