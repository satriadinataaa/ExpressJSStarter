var express = require('express');
var router = express.Router();
const ProductsController = require('../controller/ProductsController');
/* GET users listing. */
router.get('/',ProductsController.halo);
router.post('/',ProductsController.createProduct);
module.exports = router;
