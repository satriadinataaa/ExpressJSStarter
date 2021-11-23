const Validator = require('fastest-validator')
const { Product } = require('../models')
const productData = require('../query/Product.model')
const v = new Validator()

exports.halo = (req, res, next) => {
  res.json({
    msg: 'halo'
  })
}

exports.createProduct = async (req, res, next) => {
  const schema = {
    name: 'string',
    brand: 'string',
    description: 'string|optional'
  }
  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json(validate)
  }

  const product = await Product.create(req.body)
  res.send(product)
}

exports.getProductById = async (req, res, next) => {
  const product = await productData.getById(req.params.id)
  if (product === null) {
    res.json({ msg: 'Product not found', status: 404, data: null })
  } else {
    res.json({ msg: 'Product found', status: 200, data: product })
  }
}
