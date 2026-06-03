import { Iuser,env } from "@/utils/types";

export const registerUser = async (user:Iuser) => {
    try{
        const request = await fetch(`${env.API_URL}/auth/register`,{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:user.name,
                email:user.email,
                password:user.password,
                avatarUrl:user.avatarUrl
            })
        })

        const response = await request.json()

        if(request.status !== 201){
            return {error:response.message}
        }
        return {success:true}
    }catch{
        return {error:'server error'}
    }
}