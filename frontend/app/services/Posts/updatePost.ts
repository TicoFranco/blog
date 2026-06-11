import { env, IPost } from "@/utils/types"

export const updatePost = async (post:IPost) => {
    try{
        const request = await fetch(`${env.API_URL}/post`,{
            method:"PUT",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:post.id,
                title:post.title,
                description:post.description,
                body:post.body
            })
        })

        const response = await request.json()

        if(!request.ok){
            return {error:response.message}
        }

        return {success:true}
    }catch{
        return {error:'server error'}
    }
}