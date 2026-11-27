import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken';
import { AppError } from '@/utils/AppError';
import { authConfig } from '@/configs/auth';

interface TokenPayload {
    sub: string 
    email: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    // Aqui o Try Catch é necessário pois o express-async-erros só lida com erros assíncronos, enquanto os erros de validação de tokens são sincronos
    try {

        const authorization = req.headers.authorization

        if(!authorization) {
            throw new AppError("Não há Token JWT")
        }

        const [ , token] = authorization.split(" ")

        const { email, sub: user_id} = verify(token, authConfig.jwt.secret) as TokenPayload

        req.user = {
            user_id,
            email
        }
        
        return next()

    } catch (error) {
        throw new AppError("Token JWT Inválido!")
    }
}