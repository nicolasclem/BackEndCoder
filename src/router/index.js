var express = require('express');
var router = express.Router();

var products = require('./products');
var cards = require('./carts');

router.use('/products', products);
router.use('/carts', cards);

module.exports = router;
