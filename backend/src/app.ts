import fastify from 'fastify'
import fastifyCors from "@fastify/cors"
import cookie from "@fastify/cookie"
import multipart from '@fastify/multipart'
import { UserRoutes } from './routes/UserRoutes.js'
import { PostRoutes } from './routes/PostRoutes.js'
import { CommentRoutes } from './routes/CommentRoutes.js'
import jwt from '@fastify/jwt'

export const app = fastify({logger:true})

app.register(fastifyCors,{origin:'http://localhost:3000',credentials:true, methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']})
app.register(cookie,{secret:process.env.COOKIE_KEY!})
app.register(multipart)
app.register(jwt,{secret:process.env.JWT_KEY!,cookie:{cookieName:'token',signed:false}})
app.register(UserRoutes)
app.register(PostRoutes)
app.register(CommentRoutes)