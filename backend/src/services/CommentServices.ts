import { prisma } from "../lib/prisma.js";

interface createCommentProps{
    body:string,
    postId:string,
    userId:string
}

interface updateCommentProps{
    id:string,
    userId:string,
    body:string
}

interface deleteCommentProps{
    id:string,
    userId:string
}

export class CommentServices{
    async findCommentsByPost(postId:string){
        return await prisma.comment.findMany({where:{postId:postId},
            select:{id:true,body:true,updatedAt:true,user:{select:{id:true,name:true,avatarUrl:true}}}})
    }

    async findCommentsByUser(userId:string){
        return await prisma.comment.findMany({where:{userId:userId},
            select:{id:true,body:true,updatedAt:true,user:{select:{id:true,name:true,avatarUrl:true}}}})
    }

    async createComment(data:createCommentProps){
        return await prisma.comment.create({data:{
            body:data.body,
            postId:data.postId,
            userId:data.userId
        }})
    }

    async updateComment(data:updateCommentProps){
        return await prisma.comment.update({where:{
            id:data.id,
            userId:data.userId
            },
            data:{
                body:data.body
            }
        })
    }

    async deleteComment(data:deleteCommentProps){
        return await prisma.comment.delete({where:{
            id:data.id,
            userId:data.userId
        }})
    }
}