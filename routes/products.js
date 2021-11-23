const express = require('express')
const router = express.Router()
const ProductsController = require('../controller/ProductsController')
/* GET users listing. */
router.get('/', ProductsController.halo)
router.post('/', ProductsController.createProduct)
router.get('/:id', ProductsController.getProductById)
module.exports = router
