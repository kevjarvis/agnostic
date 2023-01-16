export interface IItemDatabase {
  id: number,
  [key: string]: any
}

// creando interfaces de prueba para productos y carrito

export interface IPicture {
  url: string,
  alt_text: string
}

export interface IProducto extends IItemDatabase{
  timestamp: Date,
  nombre: string,
  descripcion: string,
  codigo: string,
  picture: IPicture,
  precio: number,
  stock: number
}

export interface ICarrito extends IItemDatabase {
  timestamp: Date,
  productos: IProducto[]
}

