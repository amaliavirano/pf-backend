const mongoose = require("mongoose");

const collectionName = "Product";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
        unique: true,
      },
      price: {
        type: Number,
        required: true,
      },
      stock: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
    
      
  
});

const productModel = mongoose.model(collectionName, productSchema);
module.exports = productModel;