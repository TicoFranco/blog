import { Prisma } from "../../generated/prisma/client.js";

type ExceptionReply = {
    status:number,
    message:string
}

export function prismaExceptionHandler(error:unknown,model:string):ExceptionReply{
    if(error instanceof Prisma.PrismaClientKnownRequestError){
       switch(error.code){
        case 'P2002':
            return {
                status: 409,
                message:`${model} already exists`
            }

        case 'P2025':
            return{
                status:404,
                message:`${model} not found`
            }

        case 'P2003':
            return{
                status:400,
                message:'invalid relationship'
            }
        
        default:
            return{
                status:400,
                message:'database error'
            }
       }
    }

    return {
        status:500,
        message:'server error'
    }
}