import { env,IPost } from "@/utils/types"

export const getPost = async (post_id:string) => {
    try{
        const request = await fetch(`${env.API_URL}/posts/${post_id}`,{method:"GET"})

        const response = await request.json()

        if(!request.ok){
            return {error:response.message}
        }

        const post:IPost = response

        if(!post){
            return {error:'post not found'}
        }

        post.updatedAt= new Date(post.updatedAt).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})
        post.comments.forEach(c => c.updatedAt = new Date(c.updatedAt).toLocaleString("en-US",{month: "short",day: "2-digit",year: "numeric",hour: "2-digit",minute: "2-digit",hour12: true}))

        return post
    }catch{
        return {error:'server error'}
    }
}