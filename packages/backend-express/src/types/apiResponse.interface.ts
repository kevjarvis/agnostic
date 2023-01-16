export interface GenericResponse {
  statusCode: number,
  message: string
}

export interface SuccessResponse {
  statusCode: number, 
  body: object
}

export interface GenericError {
  statusCode: number,
  message: string
}