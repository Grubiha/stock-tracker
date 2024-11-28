import { IStocksService, CreateStockDto, Stock, UpdateStockDto, FindStockDto } from "../domain"
import { ApiError } from "../errors/api-errors"
import { DBProduct } from "../typeorm/entities/product"
import { DBStock } from "../typeorm/entities/stock"


export class StocksService implements IStocksService {
  async create(dto: CreateStockDto): Promise<Stock> {
    const [foundStock, foundProduct] = await Promise.all([
      DBStock.findOne({ where: { plu: dto.plu, shopId: dto.shopId } }),
      DBProduct.findOne({ where: { plu: dto.plu } })
    ])
    
    if (foundStock) throw ApiError.BadRequestError("Stock with this PLU and shop already exists")
    if (!foundProduct) throw ApiError.NotFoundError("Product with this PLU not found")
      
    const newStock = DBStock.create(dto)
    return newStock.save()
  }

  async increment(dto: UpdateStockDto): Promise<Stock> {
    const foundStock = await DBStock.findOne({ where: { id: dto.id } })
    if (!foundStock) throw ApiError.NotFoundError("Stock with this ID not found")
    if (dto.onShelf) foundStock.onShelf += dto.onShelf
    if (dto.inOrder) foundStock.inOrder += dto.inOrder

    return foundStock.save()
  }

  async decrement(dto: UpdateStockDto): Promise<Stock> {
    const foundStock = await DBStock.findOne({ where: { id: dto.id } })
    if (!foundStock) throw ApiError.NotFoundError("Stock with this ID not found")
    if (dto.onShelf) foundStock.onShelf -= dto.onShelf
    if (dto.inOrder) foundStock.inOrder -= dto.inOrder

    if (foundStock.onShelf < 0) throw ApiError.BadRequestError("Not enough on shelf")
    if (foundStock.inOrder < 0) throw ApiError.BadRequestError("Not enough in order")

    return foundStock.save()
  }

  async find(dto: FindStockDto): Promise<Stock[]> {
    const foundStocks = await DBStock.findWithFilter(dto)
    if (!foundStocks) throw ApiError.NotFoundError("Stocks not found")
    return foundStocks
  }
}
