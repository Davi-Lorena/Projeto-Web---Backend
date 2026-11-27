import { prisma } from "@/prisma/prisma"
import { AppError } from "@/utils/AppError"
import { hash } from "bcrypt"

interface UserData {
    name: string 
    email: string 
    password: string
}

class CreateUserService {

    async createUser(dados: UserData) {

        const {name, email, password} = dados

        const userWithSameEmail = await prisma.user.findFirst({
            where: {email}
        })

        if(userWithSameEmail) {
            throw new AppError("Esse e-mail já está em uso")
        }

        const hashedPassword = await hash(password, 10)

            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
             })
    }

}

export { CreateUserService }