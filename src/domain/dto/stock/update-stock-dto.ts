import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, validateSync, ValidationError } from "class-validator";
import { ApiError } from "../../../errors/api-errors";

export class UpdateStockDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : value, { toClassOnly: true })
  @IsNumber()
  @Min(0)
  onShelf?: number

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? parseInt(value, 10) : value, { toClassOnly: true })
  @IsNumber()
  @Min(0)
  inOrder?: number

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