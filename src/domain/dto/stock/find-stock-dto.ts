import { Transform, Type } from "class-transformer"
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
  validateSync,
  ValidationError,
} from "class-validator"
import { ApiError } from "../../../errors/api-errors"

class Range {
  @IsInt()
  @Min(0)
  min!: number

  @IsInt()
  @Min(0)
  max!: number
}

export class FindStockDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  plu?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  shopId?: string

  @IsOptional()
  @ValidateNested()
  @Type(() => Range)
  @Transform(({ value }) => {
    if (value === undefined) {
      return undefined
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      throw ApiError.BadRequestError("Invalid range format for onShelf")
    }
  })
  onShelf?: Range

  @IsOptional()
  @ValidateNested()
  @Type(() => Range)
  @Transform(({ value }) => {
    if (value === undefined) {
      return undefined
    }
    try {
      return JSON.parse(value)
    } catch (error) {
      throw ApiError.BadRequestError("Invalid range format for inOrder")
    }
  })
  inOrder?: Range

  validate(): void {
    const errors: ValidationError[] = validateSync(this)
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => {
          return `Property ${error.property} has errors: ${Object.values(error.constraints!).join(", ")}`
        })
        .join("\n")
      throw ApiError.BadRequestError(errorMessage)
    }
  }
}
