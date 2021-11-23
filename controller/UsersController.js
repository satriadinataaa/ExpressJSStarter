const Validator = require('fastest-validator')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const v = new Validator()

exports.createUser = async (req, res, next) => {
  const schema = {
    name: 'string',
    email: 'email',
    password: 'string|min:6|max:12'
  }
  const validate = v.validate(req.body, schema)
  if (validate.length) {
    return res.status(400).json(validate)
  }
  // Hash Password
  req.body.password = bcrypt.hashSync(req.body.password, parseInt(process.env.SALTROUNDS))

  let user = await User.create(req.body)
  user = user.get({ plain: true })
  delete user.password

  res.send({ msg: 'Data Inserted', data: user })
}
