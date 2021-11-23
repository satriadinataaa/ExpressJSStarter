const { Product } = require('../models')

exports.getById = async (id) => {
  const product = await Product.findByPk(id)
  return product
}
