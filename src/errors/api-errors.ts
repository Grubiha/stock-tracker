export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static NotFoundError(message: string) {
    return new ApiError(404, message);
  }

  static BadRequestError(message: string) {
    return new ApiError(400, message);
  }

  static InternalServerError() {
    return new ApiError(500, "Internal server error");
  }
}