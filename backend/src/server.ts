import { app } from "./app.js"

const start = async () =>{
    try{
        await app.listen({port:3333,host:'localhost'})
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}

start()