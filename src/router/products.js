const express = require('express');
const router = express.Router();
const {isAdmin, isUser} = require('../middleware/authUser');
const { getAllProducts, createProduct, getProductById, editProducts, deleteProduct} = require('../controller/productsController');



router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/',  isUser, isAdmin , createProduct);

router.put('/:id',  isUser, isAdmin, editProducts);

router.delete('/:id',  isUser, isAdmin, deleteProduct);

module.exports = router;