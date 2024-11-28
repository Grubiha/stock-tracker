import { IsNotEmpty, IsString, validateSync, ValidationError } from "class-validator"
import { ApiError } from "../../../errors/api-errors"


export class FindProductByPluDto {
  @IsString()
  @IsNotEmpty()
  plu!: string

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
