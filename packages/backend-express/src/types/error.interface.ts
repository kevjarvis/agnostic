/** Interfaz de error genérico de la API */

export default interface ApiError {
  errorCode: number;
  errorMessage: string;
}