import Controllers from "./class.controller.js";

import { HttpResponse } from "../utils/http.response.js";
const httpResponse = new HttpResponse();

import ProductService from "../services/product.services.js";
const productService = new ProductService();

import ProductRepository from "../persistence/repository/product.repository.js";
const productRepository = new ProductRepository();
export default class ProductController extends Controllers {
  constructor() {
    super(productService);
  }

  async getProdById (req, res, next){
    try {
        const { id } = req.params;
        const prod = await productRepository.getProdById(id);
        if (!prod)
            return httpResponse.NotFound(res, "Product not found!");
        else
            return httpResponse.Ok(res, prod);
    } catch (error) {
        next(error);
    }
  };

    createProd = async (req, res, next) => {
    try {
      const newItem = await this.service.createProd(req.body);
      if (!newItem)
        createResponse(res, 404, {
          method: "create",
          error: "Validation error!",
        });
      else createResponse(res, 200, newItem);
    } catch (error) {
      next(error.message);
    }
  };

  async createRandomProducts(req, res, next) {
    try {
      const { cant } = req.query;
      const response = await productService.createProductsMock(cant);
      res.status(200).json({ products: response })
      return response;
    } catch (error) {
      next(error);
    }
  }

  async getMockProducts(req, res, next) {
      try {
        const response = await productService.getAll();
        res.json(response);
      } catch (error) {
        next(error);
      }
  }
}