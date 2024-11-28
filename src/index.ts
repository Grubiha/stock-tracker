import express from "express"
import "reflect-metadata"

import router from "./routes/router"

import { plainToInstance } from "class-transformer"
import { Env } from "./env"
import { CreateDataSource } from "./typeorm/data-source"
import { ErrorMiddleware } from "./middlewares/error-middleware"
import { StockMiddleware } from "./middlewares/stock-middleware"

const app = express()
app.use(express.json())
app.use(StockMiddleware)
app.use(router)

app.use(ErrorMiddleware)

const start = async () => {
  try {
    // хочу валидировать .env
    const env = plainToInstance(Env, process.env)
    env.validate()

    const dataSource = CreateDataSource(env, true, false)
    await dataSource.initialize()

    app.listen(env.PORT, () => {
      console.log(`Server listening on port ${env.PORT}`)
    })
  } catch (error) {
    console.error(error)
  }
}

start()
