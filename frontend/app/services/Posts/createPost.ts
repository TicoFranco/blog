import { IPost,env } from "@/utils/types"

export const createPost = async (post:IPost) => {
    try{
        const request = await fetch(`${env.API_URL}/post`,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                title:post.title,
                description:post.description,
                body:post.body
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