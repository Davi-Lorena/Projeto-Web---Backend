import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandling: ErrorRequestHandler = (error, req, res, next) => {
    if(error instanceof AppError) {
        res.status(error.statusCode).json({message: error.message})
        return
    }

    if(error instanceof ZodError) {
        res.status(400).json({message: "Validation error"})
        return
    }

    // Erro não é nem da aplicação, nem do zod, mas sim do próprio express
    // Status de 500 é erro interno do servidor
    res.status(500).json({message: error.message})
}