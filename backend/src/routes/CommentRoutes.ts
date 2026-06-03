import type { FastifyInstance } from "fastify";
import { CommentControllers } from "../controllers/CommentControllers.js";
import { verifyJwt } from "../middlewares/verify-jwt.js";

const commentsControllers = new CommentControllers()

export async function CommentRoutes(app:FastifyInstance){
    app.get("/posts/:postId/comments",commentsControllers.findCommentsByPost)

    app.get("/user/comments",{preHandler:[verifyJwt]},commentsControllers.findCommentsByUser)

    app.post("/post/comments",{preHandler:[verifyJwt]},commentsControllers.createComment)

    app.put("/user/comments",{preHandler:[verifyJwt]},commentsControllers.updateComment)

    app.delete("/user/comments",{preHandler:[verifyJwt]},commentsControllers.deleteComment)
}