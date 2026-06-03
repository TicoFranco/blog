import { Iuser,env } from "@/utils/types";

export const loginUser = async (data:Iuser) => {
    try{
        const request = await fetch(`${env.API_URL}/auth/login`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:data.email,
                password:data.password
            })
        })

        const response = await request.json()

        if(!request.ok){
            return {error:response.message}
        }

        return response
    }catch{
        return {error:'server error'}
    }
}

