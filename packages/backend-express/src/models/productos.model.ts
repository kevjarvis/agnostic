import { FileHandler } from "../services/fileHandler.service";

const products_model = new FileHandler( './databases/productos.txt' );

export class ProductsModel {
  private product_model: any;

  constructor () {
    this.product_model = products_model;
  }

  async getItem(id:number): Promise<any> {
    return await this.product_model.get(id);
  }

  async getAll(): Promise<any> {
    return await this.product_model.get()
  }

  async add(item:object): Promise<any> {
    return await this.product_model.update(item)
  }

  async updateByID(updatedProduct, id) {
    return await this.product_model.update(updatedProduct, id)
  }

  async deleteByID(id:number): Promise<any> {
    return await this.product_model.delete(id)
  }

}
