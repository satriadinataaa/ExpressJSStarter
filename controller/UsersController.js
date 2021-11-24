const Validator = require('fastest-validator')
const { User } = require('../models')
const bcrypt = require('bcrypt')
const glory = require('../glory')
const v = new Validator()
const { Op } = require('sequelize')
const faker = require('faker')
const db = require('../models')

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

exports.getById = async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.send({ msg: 'Success Retrieve Data', data: user })
  }
  res.status(400).json({ msg: 'Error Retrieve Data' })
}

exports.getPaginatedData = async (req, res, next) => {
  const params = req.query
  // params.search = (params.search) ? params.search : ''

  const searchQuery = (params.search)
    ? {
        [Op.or]: [
          {
            [Op.and]: [
              {
                [Op.or]: [
                  {
                    name: {
                      [Op.like]: '%' + params.search + '%'
                    }
                  },
                  {
                    email: {
                      [Op.like]: '%' + params.search + '%'
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    : {}

  const user = await glory.getPaginatedData(User, params, searchQuery)
  if (user === false) {
    res.status(200).json({ msg: 'Error Occured' })
  } else {
    res.status(200).json(user)
  }
}

exports.getProductsByUserId = async (req, res) => {
  try {
    User.findByPk(req.params.id, {
      include: [{
        model: db.Product
      }]
    })
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message ||
            'Some error occurred while retrieving user.'
        })
      })
  } catch (error) {
    res.status(400).json(error.message)
  }
}
exports.createDummy = async (req, res, next) => {
  // Hash Password
  for (let i = 0; i < 200; i++) {
    const randomName = faker.name.findName() // Rowan Nikolaus
    const randomEmail = faker.internet.email() // Kassandra.Haley@erich.biz
    const password = bcrypt.hashSync(randomName, parseInt(process.env.SALTROUNDS))
    const userInsert = {
      name: randomName,
      email: randomEmail,
      password: password
    }
    await User.create(userInsert)
  }
  res.send({ msg: 'Data Inserted' })
}
