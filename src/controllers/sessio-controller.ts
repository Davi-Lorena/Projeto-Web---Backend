import { SessionService } from "@/services/session-service"
import { Request, Response } from "express"
import { z } from "zod"

const sessionService = new SessionService()


class SessionController {

    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            email: z.string().trim().email({message: "Digite corretamente o e-mail"}),
            password: z.string()
        })

        const dados = bodySchema.parse(req.body)

        await sessionService.createSession(dados)

        res.status(200)

    }
}

export { SessionController }