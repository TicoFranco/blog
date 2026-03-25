"use server"

import { FormDataSignUp } from "@/utils/types";
import bcrypt from "bcrypt";

export const postUser = async (user:FormDataSignUp) => {
    try{
        const encrypt = await bcrypt.hash(user.password,10)
        const response = await fetch('https://mybezvicayzlelthemaf.supabase.co/rest/v1/Users',{
            method:"POST",
            headers:{
                "apikey":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
                "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15YmV6dmljYXl6bGVsdGhlbWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2MzU1NTUsImV4cCI6MjA4ODIxMTU1NX0.IPuZG6GXiLRK-Yw4Q-7dpRrgVdXyoOKYSEOgnewPhsM",
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