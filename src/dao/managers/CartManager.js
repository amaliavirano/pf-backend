const fs = require("fs");

class CartManager {
    constructor(filePath) {
      this.path = filePath;
      this.carts = [];
      this.cartIdCounter = 1;
      this.loadCarts();
    }
  
    loadCarts() {
      try {
        const data = fs.readFileSync(this.path, 'utf8');
        this.carts = JSON.parse(data).carts || [];
        this.cartIdCounter = this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
      } catch (error) {
        this.saveCarts();
      }
    }
  
    saveCarts() {
      fs.writeFileSync(this.path, JSON.stringify({ carts: this.carts }, null, 2), 'utf8');
    }
  
    generateUniqueId() {
      const timestamp = Date.now();
      const counter = this.carts.length + 1;
      return `${timestamp}-${counter}`;
    }
  
    createCart() {
      const newCart = {
        id: this.generateUniqueId(), 
        products: [],
      };
      this.carts.push(newCart);
      this.saveCarts();
      console.log("Carrito creado con éxito");
      return newCart;
    }
  
    getCartById(cartId) {
      const foundCart = this.carts.find(cart => cart.id === cartId);
  
      if (foundCart) {
        return foundCart;
      } else {
        console.log("Carrito no encontrado");
        return null;
      }
    }
  
    addProductToCart(cartId, productId) {
      const cart = this.getCartById(cartId);
  
      if (cart) {
        const existingProduct = cart.products.find(product => product.product === productId);
  
        if (existingProduct) {
          existingProduct.quantity++;
        } else {
          cart.products.push({
            product: productId,
            quantity: 1,
          });
        }
  
        this.saveCarts();
        console.log("Producto agregado al carrito con éxito");
      }
    }
  }

  module.exports = CartManager;