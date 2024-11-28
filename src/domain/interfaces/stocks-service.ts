import { CreateStockDto } from "../dto/stock/create-stock-dto"
import { FindStockDto } from "../dto/stock/find-stock-dto"
import { UpdateStockDto } from "../dto/stock/update-stock-dto"
import { Stock } from "../entities/stock"

export interface IStocksService {
  create(dto: CreateStockDto): Promise<Stock>
  increment(dto: UpdateStockDto): Promise<Stock>
  decrement(dto: UpdateStockDto): Promise<Stock>
  find(dto: FindStockDto): Promise<Stock[]>
}