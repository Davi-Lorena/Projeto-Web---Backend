import { Router } from "express"
import { createUserRoutes } from "./user-routes"
import { sessionRoutes } from "./session-routes"

const routes = Router()

routes.use("/users", createUserRoutes)
routes.use("/sessions", sessionRoutes)

export { routes }