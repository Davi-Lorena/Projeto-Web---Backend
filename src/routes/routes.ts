import { Router } from "express"
import { createUserRoutes } from "./user-routes"
import { sessionRoutes } from "./session-routes"
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated"

const routes = Router()

routes.use("/users", createUserRoutes)
routes.use("/sessions", sessionRoutes)

// Daqui pra baixo, o usuário só acessa as rotas se estiver autenticado
routes.use(ensureAuthenticated)

export { routes }