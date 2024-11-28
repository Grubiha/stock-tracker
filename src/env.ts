import { Transform } from "class-transformer"
import { IsInt, IsNotEmpty, IsString, Max, Min, validateSync, ValidationError } from "class-validator"

export class Env {
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @Max(65536)
  readonly PORT!: number

  @IsString()
  @IsNotEmpty()
  readonly DB_HOST!: string

  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @IsInt()
  @Min(1)
  @Max(65536)
  readonly DB_PORT!: number

  @IsString()
  @IsNotEmpty()
  readonly DB_USERNAME!: string

  @IsString()
  @IsNotEmpty()
  readonly DB_PASSWORD!: string

  @IsString()
  @IsNotEmpty()
  readonly DB_NAME!: string

  validate(): void {
    const errors: ValidationError[] = validateSync(this)
    if (errors.length > 0) {
      const errorMessage = errors
        .map((error) => {
          return `Property ${error.property} has errors: ${Object.values(error.constraints!).join(", ")}`
        })
        .join("\n")
      throw new Error(errorMessage)
    }
  }
}
