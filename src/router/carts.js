const express = require('express');
const router = express.Router();
const { createCart, addProductToCart, getCartById, deleteCartById, deleteProductCart } = require('../controller/cartsController');

router.post('/', createCart);
router.post('/:id/products', addProductToCart);
router.get('/:id/products', getCartById);
router.delete('/:id/products', deleteCartById);
router.delete('/:id/products/:idProd', deleteProductCart);

module.exports = router;
