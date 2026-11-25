import { CreateUserService } from "@/services/create-user-service"
import { Request, Response } from "express"
import { z } from "zod"

const createUserService = new CreateUserService()

class CreateUserController {

    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            name: z.string().min(3, {message: "O nome deve ter no mínimo 6 caracteres"}).max(40, {message: "O nome deve ter no máximo 40 caracteres"}).trim(),
            email: z.string().email({message: "E-mail obrigadório"}).trim().toLowerCase(),
            password: z.string().trim().min(8, {message: "A senha deve ter pelo menos 8 caracteres"})
        })

        const dados = bodySchema.parse(req.body)

        await createUserService.createUser(dados)

        res.status(201)

    }

}

export { CreateUserController }