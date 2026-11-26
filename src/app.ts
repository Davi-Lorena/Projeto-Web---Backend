// Express-async-errors é uma lib que detecta erros e garante que eles sejam passados para o middleware de tratamento de erros, sem necessidade de blocos try-catch
import "express-async-errors"
import express from 'express'
import { routes } from './routes/routes'
import { errorHandling } from "./middlewares/error-handling"

const app = express()

app.use(express.json())

app.use(routes)

// A linha abaixo faz com que o express utilize esse middleware toda vez que detectar um erro por meio do express-async-errors
app.use(errorHandling)

export {app}