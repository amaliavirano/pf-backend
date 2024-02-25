const mongoose = require("mongoose");

const collectionName = "Carts";

const cartSchema = new mongoose.Schema({
 
});

const cartsModel = mongoose.model(collectionName, cartSchema);
module.exports = cartsModel;