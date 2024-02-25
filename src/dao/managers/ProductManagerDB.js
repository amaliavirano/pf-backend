const productModel = require("../models/productModel");


class ProductManagerDB {
  getAllProducts = async () => {
    try {
      const products = await productModel.find({});
      return products;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:9 ~ ProductManagerDB ~ getAllProducts= ~ error:",
        error
      );
    }
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.find({ _id: id });

      return product;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:22 ~ ProductManagerDB ~ getProductById= ~ error:",
        error
      );
    }
  };

  createProduct = async (bodyProduct) => {
    try {
      // TODO REVISANDO SI EL PRODUCTO YA FUE CREADO ANTERIOMENTE
      const productDetail = await productModel.findOne({
        dni: bodyProduct.code,
      });
      console.log(
        "🚀 ~ file: product.manager.js:35 ~ ProductManagerDB ~ createProduct= ~ productDetail:",
        productDetail
      );

      if (productDetail && Object.keys(productDetail).length !== 0) {
        return null;
      }

      const newProduct = await productModel.create(bodyProduct);
      // TODO: Manejar el error o si pasa algo mientras creo el documento de estudiante

      return newProduct;
    } catch (error) {
      console.log(
        "🚀 ~ file: product.manager.js:42 ~ ProductManagerDB ~ createProduct= ~ error:",
        error
      );
    }
  };
}

module.exports = ProductManagerDB;