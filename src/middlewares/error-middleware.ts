// import { NextFunction, Request, Response } from "express"
import { NextFunction, Request, Response } from "express"
import { ApiError } from "../errors/api-errors"

export const ErrorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  // console.log(err)
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message })
  } else res.status(500).json({ message: "Internal server error" })
}