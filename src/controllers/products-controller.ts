import { NextFunction, Request, Response } from "express"
import { plainToInstance } from "class-transformer"
import { IProductsService, CreateProductDto, FindProductByPluDto, FindProductsByNameDto } from "../domain"
import { ApiError } from "../errors/api-errors"


export class ProductsController {
  constructor(private readonly productsService: IProductsService) {
    this.post = this.post.bind(this)
    this.get = this.get.bind(this)
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { plu, name } = req.body
      const dto = plainToInstance(CreateProductDto, { plu, name })
      dto.validate()
      const product = await this.productsService.create(dto)
      res.status(201).json(product)
    } catch (error) {
      next(error)
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { plu, name, limit } = req.query

      if (plu) {
        const dto = plainToInstance(FindProductByPluDto, { plu })
        dto.validate()
        const product = await this.productsService.findByPlu(dto)
        res.status(200).json(product)
      } else if (name) {
        const dto = plainToInstance(FindProductsByNameDto, { name, limit })
        dto.validate()
        const products = await this.productsService.findByName(dto)
        res.status(200).json(products)
      } else throw ApiError.BadRequestError(`"plu" or "name" query parameters are not provided`)
    } catch (error) {
      next(error)
    }
  }
}
