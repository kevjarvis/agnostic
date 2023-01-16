import ApiError from "../types/error.interface";

export class ProductNotFound implements ApiError {
  errorCode = 404;
  errorMessage = 'Producto no encontrado';
}

export class UnauthorizedAccess implements ApiError {
  errorCode = 401;
  errorMessage = 'Acceso no autorizado'
}

export class DatabaseIsEmpyOrNotExist implements ApiError {
  errorCode = 500;
  errorMessage = 'La base de datos no existe o está vacía'
}

export class GenericError implements ApiError {
  errorCode = 500;
  errorMessage = 'Ha ocurrido algún error inesperado, espere o pongase en contacto con el administrador'
}

export class CartNotFound implements ApiError {
  errorCode = 404;
  errorMessage = 'Carrito no encontrado'
}