
import { IProductsService, CreateProductDto, Product, FindProductsByNameDto, FindProductByPluDto } from "../domain"
import { ApiError } from "../errors/api-errors"
import { DBProduct } from "../typeorm/entities/product"

export class ProductsService implements IProductsService {
  async create(dto: CreateProductDto): Promise<Product> {
    const foundProduct = await DBProduct.findOne({ where: { plu: dto.plu } })
    if (foundProduct) throw ApiError.BadRequestError("Product with this PLU already exists")
    const newProduct = DBProduct.create(dto)
    return newProduct.save()
  }

  async findByName(dto: FindProductsByNameDto): Promise<Product[]> {
    const foundProducts = await DBProduct.findByName(dto.name, dto.limit)
    if (foundProducts.length === 0) throw ApiError.NotFoundError("Products with this name not found")
    return foundProducts
  }

  async findByPlu(dto: FindProductByPluDto): Promise<Product> {
    const foundProduct = await DBProduct.findOne({ where: { plu: dto.plu } })
    if (!foundProduct) throw ApiError.NotFoundError("Product with this PLU not found")
    return foundProduct
  }
}
