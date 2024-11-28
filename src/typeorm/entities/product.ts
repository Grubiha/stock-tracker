import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { DBStock } from "./stock"

@Entity({ name: "products" })
export class DBProduct extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ nullable: false, unique: true })
  plu!: string

  @Column({ nullable: false })
  name!: string

  @OneToMany(() => DBStock, (stock) => stock.product)
  stocks!: DBStock[]

  static async findByName(name: string, limit?: number) {
    return this.createQueryBuilder("product")
      .where("product.name ILIKE :name", { name: `%${name}%` })
      .limit(limit)
      .getMany()
  }
}
