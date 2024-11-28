import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { DBProduct } from "./product"

@Entity({ name: "stocks" })
export class DBStock extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ nullable: false })
  plu!: string

  @Column({ nullable: false, name: "shop_id" })
  shopId!: string

  @Column({ nullable: false, name: "on_shelf", default: 0 })
  onShelf!: number

  @Column({ nullable: false, name: "in_order", default: 0 })
  inOrder!: number

  @ManyToOne(() => DBProduct, (product) => product.stocks)
  @JoinColumn({ name: "plu", referencedColumnName: "plu" })
  product!: DBProduct

  static async findWithFilter(filter: Filter) {
    const query = this.createQueryBuilder("stock")
    if (filter.plu) query.andWhere("stock.plu = :plu", { plu: filter.plu })
    if (filter.shopId) query.andWhere("stock.shop_id = :shopId", { shopId: filter.shopId })
    if (filter.onShelf) {
      query.andWhere("stock.on_shelf >= :onShelfMin", { onShelfMin: filter.onShelf.min })
      query.andWhere("stock.on_shelf <= :onShelfMax", { onShelfMax: filter.onShelf.max })
    }
    if (filter.inOrder) {
      query.andWhere("stock.in_order >= :inOrderMin", { inOrderMin: filter.inOrder.min })
      query.andWhere("stock.in_order <= :inOrderMax", { inOrderMax: filter.inOrder.max })
    }
    return query.getMany()
  }
}

interface Filter {
  plu?: string
  shopId?: string
  onShelf?: {
    min: number
    max: number
  }
  inOrder?: {
    min: number
    max: number
  }
}
