import { NextFunction, Request, Response } from "express"
import { plainToInstance } from "class-transformer"
import { IStocksService, CreateStockDto, UpdateStockDto, FindStockDto } from "../domain"

export class StocksController {
  constructor(private readonly stocksService: IStocksService) {
      this.post = this.post.bind(this)
      this.increment = this.increment.bind(this)
      this.decrement = this.decrement.bind(this)
      this.get = this.get.bind(this)
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { plu, shopId, onShelf, inOrder } = req.body
      const dto = plainToInstance(CreateStockDto, { plu, shopId, onShelf, inOrder })
      dto.validate()
      const stock = await this.stocksService.create(dto)
      res.status(201).json(stock)
    } catch (error) {
      next(error)
    }
  }

  async increment(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const { onShelf, inOrder } = req.body
      const dto = plainToInstance(UpdateStockDto, { id, onShelf, inOrder })
      dto.validate()
      const stock = await this.stocksService.increment(dto)
      res.status(200).json(stock)
    } catch (error) {
      next(error)
    }
  }

  async decrement(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const { onShelf, inOrder } = req.body
      const dto = plainToInstance(UpdateStockDto, { id, onShelf, inOrder })
      dto.validate()
      const stock = await this.stocksService.decrement(dto)
      res.status(200).json(stock)
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { plu, shopId, onShelf, inOrder } = req.query
      const dto = plainToInstance(FindStockDto, { plu, shopId, onShelf, inOrder })
      dto.validate()
      const stocks = await this.stocksService.find(dto)
      res.status(200).json(stocks)
    } catch (error) {
      next(error)
    }
  }
}
