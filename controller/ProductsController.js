const Validator = require('fastest-validator');
const {Product} = require('../models')
const v = new Validator();

exports.halo = (req,res,next) =>{
  res.json({
    "msg" : "halo"
  });
} 

exports.createProduct = async (req,res,next) => {
  const schema = {
    name : "string",
    brand : "string",
    description : "string|optional"
  };
  const validate = v.validate(req.body,schema);
  if(validate.length){
    return res.status(400).json(validate);
  }

 const product = await Product.create(req.body);
 res.send(product);
}