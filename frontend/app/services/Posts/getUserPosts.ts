import { env, IPost } from "@/utils/types"

export const getUserPosts = async () =>{
    try{
        const request = await fetch(`${env.API_URL}/user/posts`,{method:"GET",credentials:"include"})
        
        const response = await request.json()

        if(!request.ok){
          return []
        }

        const posts:IPost[] = response

        posts.forEach(post => {
           post.updatedAt = new Date(post.updatedAt).toLocaleString("en-US",{dateStyle:"medium",timeStyle:"short"})
        });

        return posts
    }catch(err){
        return []
    }
}