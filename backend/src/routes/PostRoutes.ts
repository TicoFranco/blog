import type { FastifyInstance } from "fastify";
import { PostControllers } from "../controllers/PostControllers.js";
import { verifyJwt } from "../middlewares/verify-jwt.js";

const postControllers = new PostControllers()

export async function PostRoutes(app:FastifyInstance){
    app.get("/posts",postControllers.findAllPosts)

    app.get("/posts/:postId",postControllers.findPostById)

    app.get("/user/posts",{preHandler:[verifyJwt]},postControllers.findAllPostsByUser)

    app.post("/post",{preHandler:[verifyJwt]},postControllers.createPost)

    app.put("/post",{preHandler:[verifyJwt]},postControllers.updatePost)

    app.delete("/post",{preHandler:[verifyJwt]},postControllers.deletePost)
}