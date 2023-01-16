import { NextFunction } from 'express';
import { CartsModel } from '../models/carts.model';
import { CartNotFound, DatabaseIsEmpyOrNotExist, GenericError, ProductNotFound } from '../models/errors.model';
import { ProductsModel } from '../models/productos.model';

// inicializa una instalcia del modelo de carritos
const carritos = new CartsModel();
const productos = new ProductsModel();

export default class CartController {
  constructor () {}

  static async create(req, res, next: NextFunction) {
    // Crea un carrito y devuelve su id
    try {
      const operationResponse = await carritos.create()

      // caso de errores
      if(operationResponse.code === -3) throw new GenericError()
      
      res.send(operationResponse)

    } catch (error) {
      next(error)
    }
  }

  static async deleteByID(req, res, next: NextFunction) {
    try {
      const operationResponse = await carritos.delete(req.params.id);

      // caso de errores
      if (operationResponse.code === -1) throw new DatabaseIsEmpyOrNotExist();
      if (operationResponse.code === -2) throw new CartNotFound();
      if (operationResponse.code === -3) throw new GenericError();

      res.send(operationResponse)
      
    } catch (error) {
      next(error)
    }
  }

  static async getProductsByCart(req, res, next:NextFunction) {
    /** Dado el id de un carrito devuelve los productos que contiente */
    try {
      const operationResponse = await carritos.getProductsByCart(req.params.id);

      // caso de errores
      if (operationResponse.code === -1) throw new DatabaseIsEmpyOrNotExist();
      if (operationResponse.code === -2) throw new CartNotFound();
      if (operationResponse.code === -3) throw new GenericError();

      // selecciona el primer y único carrito que se ha encontrado
      const cart = operationResponse.body[0];
      const arrayOfProducts = cart.productos;

      res.send({
        code: 4,
        'body': arrayOfProducts
      })

    } catch (error) {
      next(error)
    }
  }
  
  static async addProduct(req, res, next:NextFunction) {
    try {
      // busca el producto en la base de datos de productos
      const product = await productos.getItem(req.body.product_id); 
      console.log(product)

      // caso de errores
      if(product.code === -3) throw new GenericError()
      if(product.code === -2) throw new ProductNotFound()

      // Agrega el producto al carrito
      const operationResponse = await carritos.addProductToCart(req.params.id, product.body[0]);

      // caso de errores
      if(operationResponse.code === -3) throw new GenericError()
      if(operationResponse.code === -2) throw new CartNotFound()

      res.send({code: 4, body: operationResponse.body.productos})
      
    } catch (error) {
      next(error);
    }
  }

  static async deleteProducts(req, res, next: NextFunction) {
    try {
      const operationResponse = await carritos.deleteProducts(
        req.params.id,
        req.params.id_prod
      )

      res.send(operationResponse)
    } catch (error) {
      next(error)
    }
  }
}
