const express = require('express')
const UsersController = require('../controller/UsersController')
const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.post('/', UsersController.createUser)
router.get('/dummy/', UsersController.createDummy)
router.get('/paginated/', UsersController.getPaginatedData)
router.get('/:id/products/', UsersController.getProductsByUserId)
router.get('/:id/', UsersController.getById)
module.exports = router
