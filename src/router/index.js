const express = require('express');
const router = express.Router();

const products = require('./products');
const cards = require('./carts');

router.use('/products', products);
router.use('/carts', cards);

module.exports = router;
