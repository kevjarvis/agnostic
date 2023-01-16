import { FileHandler } from "../services/fileHandler.service";
import { IProducto } from "../types/api.interface";

const carritos = new FileHandler('./databases/carritos.txt')

export class CartsModel {
  private carritos: any

  constructor () {
    this.carritos = carritos;
  }

  async create(): Promise<any> {
    const CART_TEMPLATE = { productos: [] }
    return await this.carritos.update(CART_TEMPLATE)
  }

  async delete(id:number): Promise<any> {
    return await this.carritos.delete(id);
  }

  async getProductsByCart(id:number) {
    return await this.carritos.get(id);
  }

  async addProductToCart(id:number, newProduct:object): Promise<any> {
    const cart = await this.carritos.get(id);
    if (cart.code === -2 || cart.code === -3) return cart

    const newArrayOfProducts = [...cart.body[0].productos, newProduct]

    const updatedCart = { productos: newArrayOfProducts }

    return await this.carritos.update(updatedCart, id)
  }

  async deleteProducts(id:number, id_prod:number) {
    /** Método que elimina los productos del carrito */
    const cart = carritos.get(id).body[0];
    const products: IProducto[] = cart.productos;

    const filteredProducts = {
      productos: products.filter(product => product.id != id_prod)
    }

    return await this.carritos.update(filteredProducts, id)
  }
}
