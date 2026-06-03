import { Iuser,env } from "@/utils/types"

export const updateUser = async (data:Iuser,newPassword:string = "") => {
    try{
      const request = await fetch(`${env.API_URL}/user`,{
        method:"PUT",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:data.name,
          password:data.password,
          newPassword:newPassword,
          avatarUrl:data.avatarUrl
        })
      })

      const response = await request.json()

      if(!request.ok){
        return {error: response.message}
      }

      return {success:true}
    }catch{
      return {error: 'server error'}
    }
}