import type { FastifyRequest,FastifyReply } from "fastify";
import { CommentServices } from "../services/CommentServices.js";
import { createCommentSchema } from "../schemas/comment-schemas/create-comment-schema.js";
import { updateCommentSchema } from "../schemas/comment-schemas/update-comment-schema.js";
import {z} from 'zod'
import { prismaExceptionHandler } from "../utils/prismaExceptionHandler.js";

const commentServices = new CommentServices()

export class CommentControllers{
    async findCommentsByPost(request:FastifyRequest,reply:FastifyReply){
        try{
            const {postId} = request.params as {postId:string}
            const comments = await commentServices.findCommentsByPost(postId)

            if(!comments){
                return reply.status(404).send({message:"post not found."})
            }

            return reply.status(200).send(comments)

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'comments')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async findCommentsByUser(request:FastifyRequest,reply:FastifyReply){
        try{
            const userId = request.user.id
            const comments = await commentServices.findCommentsByUser(userId)
            
            if(!comments){
                return reply.status(404).send({message:"user not found."})
            }

            return reply.status(200).send(comments)

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'comments')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async createComment(request:FastifyRequest,reply:FastifyReply){
        try{
            const userId = request.user.id
            const {postId,body} = request.body as {postId:string,body:string}
            const parsedData = createCommentSchema.safeParse({postId,body})

            if(!parsedData.success){
                return reply.status(422).send({bodyErrors:z.treeifyError(parsedData.error).properties?.body,
                    postIdErrors:z.treeifyError(parsedData.error).properties?.postId
                })
            }

            await commentServices.createComment({body:body,postId:postId,userId:userId})
            return reply.status(201).send({message:"comment created"})

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'comment')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }

    async updateComment(request:FastifyRequest,reply:FastifyReply){
        try{
            const userId = request.user.id
            const {id,body} = request.body as {id:string,body:string}
            const parsedData = updateCommentSchema.safeParse({id,body})

            if(!parsedData.success){
                return reply.status(422).send({idErrors:z.treeifyError(parsedData.error).properties?.id,
                    bodyErrors:z.treeifyError(parsedData.error).properties?.body
                })
            }

            await commentServices.updateComment({id:id,userId:userId,body:body})
            return reply.status(200).send({message:"comment updated"})

        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'comment')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }
    
    async deleteComment(request:FastifyRequest,reply:FastifyReply){
        try{
            const userId = request.user.id
            const {id} = request.body as {id:string}
            await commentServices.deleteComment({id:id,userId:userId})
            return reply.status(200).send({message:"comment deleted"})
        }catch(err){
            const prismaErr = prismaExceptionHandler(err,'comment')
            return reply.status(prismaErr.status).send({message: prismaErr.message})
        }
    }
}