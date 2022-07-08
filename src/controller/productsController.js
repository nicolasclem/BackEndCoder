//FIREBASE
// const daos = require('../daos/firebase/firebaseDaos');
// const Product = new daos.productsDaos();


//MONGO
const daos = require('../daos/mongo/mongoDaos');
const Product = new daos.productsDaos();

module.exports = {
  createProduct: async (req, res) => {
    try {
      const data = await Product.save(req.body);
      res.status(200).send({
        data,
        status: 200
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const data = await Product.getAll();
      res.status(200).send({
        data,
        status: 200
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        messages: error.message,
      });
    }
  },
  getProductById: async (req, res) => {
    const idProduct = req.params.id;
    try {
      const data = await Product.getById(idProduct);
      if (data) {
        res.status(200).send({
          data,
          status: 200
        });
      } else {
        res.status(404).send({
          message: 'Producto no encontrado',
          status: 404
        });
      }
    } catch (error) {
      res.status(500).send({
        messages: error.message,
        status: 500
      });
    }
  },
  editProducts: async (req, res) => {
    const idProduct = req.params.id;
    const product = req.body;
    try {
      const data = await Product.updateById(idProduct, product);
      res.status(200).send({
        data,
        status: 200
      });
    } catch (error) {
      res.status(500).send({
        messages: error.message,
        status: 500
      });
    }
  },
  deleteProduct: async (req, res) => {
    const idProduct = req.params.id;
    try {
      await Product.deleteById(idProduct);
      res.status(200).send({
        message: 'Producto Eliminado',
        status: 200
      });
    } catch (error) {
      res.status(500).send({
        messages: error.message,
        status: 500
      });
    }
  },
};
