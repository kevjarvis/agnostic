import { ProductsModel } from '../models/productos.model';
import { NextFunction } from 'express';
import { ProductNotFound, UnauthorizedAccess, DatabaseIsEmpyOrNotExist, GenericError } from '../models/errors.model';

const products = new ProductsModel()

class ProductController {
  constructor () {}

  static async listByID(req, res, next: NextFunction) {
    try {
      const id = req.params.id;
      const operationResponse = await products.getItem(id) 

      // caso de errores
      if(operationResponse.code === -2) throw new ProductNotFound()
      if(operationResponse.code === -3) throw new GenericError()

      res.send(operationResponse)
    } catch(err) {
      next(err)
    }

  }

  static async listAll(req, res, next: NextFunction) {
    try {
      const operationResponse = await products.getAll();

      // caso de errores
      if(operationResponse.code === -2) throw new ProductNotFound()
      if(operationResponse.code === -3) throw new GenericError()
      
      res.send(operationResponse)
    } catch (error) {
      next(error)
    }
  }

  static async add(req, res, next:NextFunction) {
    try {
      if(!req.isAdmin) throw new UnauthorizedAccess()

      console.log(req.body)

      const product = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        codigo: req.body.codigo,
        picture: {
          url: req.body.picture,
          alt_text: 'Generic alt text'
        },
        precio: req.body.precio,
        stock: req.body.stock
      }
      const operationResponse = await products.add(product)

      // caso de errores
      if(operationResponse.code === -3) throw new GenericError()

      res.send(operationResponse)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next:NextFunction){
    try {
      if(!req.isAdmin) throw new UnauthorizedAccess()

      const operationResponse = await products.updateByID(req.body, req.params.id);

      // caso de errores
      if(operationResponse.code === -2) throw new ProductNotFound()
      if(operationResponse.code === -3) throw new GenericError()

      res.send(operationResponse)
      
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next:NextFunction) {
    try {
      if(!req.isAdmin) throw new UnauthorizedAccess() 
      
      const operationResponse = await products.deleteByID(req.params.id);
      // caso de errores
      if(operationResponse.code === -2) throw new ProductNotFound()
      if(operationResponse.code === -3) throw new GenericError()

      res.send(operationResponse)
    } catch (error) {
      next(error)
    }
  }
}

export default ProductController
