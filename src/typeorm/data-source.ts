import { DataSource } from "typeorm"
import { Env } from "../env"
import { DBStock } from "./entities/stock"
import { DBProduct } from "./entities/product"

export const CreateDataSource = (env: Env, synchronize = false, logging = true) => {
  return new DataSource({
    type: "postgres",
    host: env.DB_HOST,
    port: env.DB_PORT,
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    synchronize,
    logging,
    entities: [DBProduct, DBStock],
    subscribers: [],
    migrations: [],
  })
}

