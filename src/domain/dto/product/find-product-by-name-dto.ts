import { IsString, IsNotEmpty, Min, ValidationError, IsInt, validateSync, IsOptional } from "class-validator"
import { Transform } from "class-transformer"
import { ApiError } from "../../../errors/api-errors"


export class FindProductsByNameDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : value, { toClassOnly: true })
  @IsInt()
  @Min(1)
  limit?: number

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
