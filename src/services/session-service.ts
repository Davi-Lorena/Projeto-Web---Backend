import { prisma } from "@/prisma/prisma"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"

interface SessionData {
    email: string
    password: string
}

class SessionService {

    async createSession(dados: SessionData) {

        const { email, password } = dados

        const userEmail = await prisma.user.findUnique({where: {email}})

        if(!userEmail) {
            throw new AppError("E-mail ou senha inválidos!")
        }

        const passwordMatch = await compare(password, userEmail.password)

        if(!passwordMatch) {
            throw new AppError("E-mail ou senha inválidos!")
        }

    }
}

export { SessionService }