const express = require('express')
const router = express.Router()
const UsersController = require('../controller/UsersController')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/login', UsersController.login)
module.exports = router
