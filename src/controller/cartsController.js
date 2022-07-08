// // FiREBase
// const Daos = require('../daos/firebase/firebaseDaos');
// const Cart = new Daos.cartsDaos();

//MONGO 
const Daos = require('../daos/mongo/mongoDaos');
const Cart = new Daos.cartsDaos();

module.exports = {
  
  createCart: async (req, res) => {
    try {
      const cart = await Cart.createCart();
      res.status(200).send({
          data: {
              cart,
            },
            status: 200
      });
    } catch (error) {
      res.status(500).send({
          messages: error.message,
          status: 500,
      });
    }
  },

  addProductToCart: async (req, res) => {
    try {
      if (!req.body.id) {
        throw Error('Tienes que agregar un carrito');
      }
      if (!req.params.id) {
        throw Error('Tienes que elegir un carrito');
      }
      const idCart = req.params.id;
      const idProduct = req.body.id;
      const cart = await Cart.addProductToCart(idCart, idProduct);
      res.status(200).send({
          data: cart,
          message: 'Producto agregado',
          status: 200
      });
    } catch (error) {
      res.status(500).send({
          messages: error.message,
          status: 500,
      });
    }
  },

  getCartById: async (req, res) => {
    const idCard = req.params.id;
    try {
      const data = await Cart.getCardById(idCard);
      if (data) {
        res.status(200).send({
            data,
          status: 200
        
        });
      } else {
        res.status(404).send({
            message: 'Carrito no encontrado',
          status: 404
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  deleteCartById: async (req, res) => {
    const idCart = req.params.id;
    try {
      await Cart.deleteCartById(idCart);
      res.status(200).send({
          message: 'Carrito eliminado',
          status: 200
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },

  deleteProductCart: async (req, res) => {
    try {
      if (!req.params.id) {
        throw Error('Tienes que agregar un producto');
      }
      if (!req.params.idProd) {
        throw Error('Tienes que elegir un carrito');
      }
      const idCart = req.params.id;
      const idProduct = req.params.idProd;
      await Cart.deleteProductCart(idCart, idProduct);
      res.status(200).send({
          message: 'Producto eliminado del carrito',
          status: 200
      });
    } catch (error) {
      res.status(500).send({
          messages: error.message,
          status: 500,
      });
    }
  }
};
