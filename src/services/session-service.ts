import { authConfig } from "@/configs/auth"
import { prisma } from "@/prisma/prisma"
import { AppError } from "@/utils/AppError"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"


interface SessionData {
    email: string
    password: string
}

class SessionService {

    async createSession(dados: SessionData) {

        const { email, password } = dados

        const user = await prisma.user.findUnique({where: {email}})

        if(!user) {
            throw new AppError("E-mail ou senha inválidos!")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch) {
            throw new AppError("E-mail ou senha inválidos!")
        }

        const {secret, expiresIn} = authConfig.jwt

        const token = sign({user}, secret, {
            subject: user.id,
            expiresIn
        })

        const { password: _, ...userWithoutPassword} = user

        return { token, user: userWithoutPassword }

    }
}

export { SessionService }