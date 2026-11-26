import { CreateUserController } from "@/controllers/create-user-controller";
import { Router } from "express";

const createUserRoutes = Router()

const userController = new CreateUserController()

createUserRoutes.post("/", userController.create)

export { createUserRoutes }