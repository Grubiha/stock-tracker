import { CreateProductDto } from "../dto/product/create-product-dto"
import { FindProductsByNameDto } from "../dto/product/find-product-by-name-dto"
import { FindProductByPluDto } from "../dto/product/find-product-by-plu-dto"
import { Product } from "../entities/product"

export interface IProductsService {
  create(dto: CreateProductDto): Promise<Product>
  findByName(dto: FindProductsByNameDto): Promise<Product[]>
  findByPlu(dto: FindProductByPluDto): Promise<Product>
}