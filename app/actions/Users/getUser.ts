"use server"

import { Iuser,env } from "@/utils/types";
import bcrypt from "bcrypt";

export const getUser = async (data:Iuser) => {
    try{
        const email = encodeURIComponent(data.email)
        const response = await fetch(`${env.SUPABASE_URL}/Users?email=eq.${email}&select=id,name,avatar,email,password&limit=1`,{
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

        const validate = await bcrypt.compare(data.password,user.password)

        if(!validate){
            console.log("erro na validacao")
            return null
        }

        return {
            id:user.id,
            name:user.name,
            email:user.email,
            avatar:user.avatar
        }
    }catch{
        return null
    }
}

