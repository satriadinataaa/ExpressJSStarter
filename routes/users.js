const express = require('express')

const router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})

router.get('/me', (req, res, next) => {
  res.send(`Halo ${process.env.APP_NAME}`)
})
module.exports = router
