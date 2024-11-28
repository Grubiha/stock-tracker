import express from "express"
import { ProductsController } from "../controllers/products-controller"
import { StocksController } from "../controllers/stocks-controller"
import { ProductsService } from "../services/products-service"
import { StocksService } from "../services/stocks-service"



const productsService = new ProductsService()
const stocksService = new StocksService()
const productsController = new ProductsController(productsService)
const stocksController = new StocksController(stocksService)

const router = express.Router()

router.get("/products", productsController.get)
router.post("/products", productsController.post)
router.get("/stocks", stocksController.get)
router.post("/stocks", stocksController.post)
router.patch("/stocks/increment/:id", stocksController.increment)
router.patch("/stocks/decrement/:id", stocksController.decrement)

export default router
