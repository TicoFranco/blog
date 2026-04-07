"use server"

import { Iuser,env } from "@/utils/types";

export const getUserById = async (id:string) => {
    try{
        const response = await fetch(`${env.SUPABASE_URL}/Users?id=eq.${id}&select=*&limit=1`,{
            method:"GET",
            headers:{
               "apikey": env.SUPABASE_KEY,
               "Authorization":`Bearer ${env.SUPABASE_KEY}`
            }})


        if(!response.ok){
            console.log("erro no fetch")
            return null
        }

        const userData:Iuser[] = await response.json()

        const user = userData[0]

        if(!user){
            console.log("usuario nao encontrado")
            return null
        }

        return {
            name:user.name,
            avatar:user.avatar
        }
    }catch{
        return null
    }
}