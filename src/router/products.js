const express = require('express');
const router = express.Router();
const {admin, user} = require('../middleware/authUser');
const { getAllProducts, createProduct, getProductById, editProducts, deleteProduct} = require('../controller/productsController');



router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/', user, admin , createProduct);

router.put('/:id', user, admin, editProducts);

router.delete('/:id', user, admin, deleteProduct);

module.exports = router;