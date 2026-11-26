import { Router } from "express"
import { createUserRoutes } from "./user-routes"

const routes = Router()

routes.use("/users", createUserRoutes)

export { routes }