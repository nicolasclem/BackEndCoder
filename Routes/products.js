const express = require('express');
const router = require.Router();
const {getProducts, createProduct} = require('../controller/productController');

router.post('/productos', createProduct);

router.get('/productos', getProducts);

module.exports = router;