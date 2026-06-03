import type { FastifyInstance,FastifyPluginOptions} from "fastify";
import { UserControllers } from "../controllers/UserControllers.js";
import { verifyJwt } from "../middlewares/verify-jwt.js";

const userControllers = new UserControllers()

export async function UserRoutes(app:FastifyInstance,options:FastifyPluginOptions) {
    app.post("/auth/register",userControllers.createUser)

    app.post("/auth/login",userControllers.login)

    app.get("/users",{preHandler:[verifyJwt]},userControllers.findUsers)

    app.get("/user",{preHandler:[verifyJwt]},userControllers.findCookieUser)

    app.put("/user",{preHandler:[verifyJwt]},userControllers.updateUser)

    app.delete("/user",{preHandler:[verifyJwt]},userControllers.deleteUser)

    app.post("/user/logout",{preHandler:[verifyJwt]},userControllers.logout)

    app.get("/verifyCookie",userControllers.checkCookie)

}