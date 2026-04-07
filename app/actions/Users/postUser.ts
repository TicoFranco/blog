"use server"

import { Iuser,env } from "@/utils/types";
import bcrypt from "bcrypt";

export const postUser = async (user:Iuser) => {
    try{
        const encrypt = await bcrypt.hash(user.password,10)
        const response = await fetch(`${env.SUPABASE_URL}/Users`,{
            method:"POST",
            headers:{
               "apikey": env.SUPABASE_KEY,
               "Authorization":`Bearer ${env.SUPABASE_KEY}`,
               "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:user.name,
                email:user.email,
                password:encrypt,
                avatar:user.avatar
            })
        })

        if(response.status === 201){
            return true
        }
        return false
    }catch{
        return false
    }
}