import { Request, Response, NextFunction } from "express"
import ApiError from "../types/error.interface"

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.errorCode).send({
      code: err.errorCode,
      message: err.errorMessage
    })
}

export default errorHandler