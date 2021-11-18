var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/me',function(req,res,next){
  res.send("Halo "+process.env.APP_NAME)
})
module.exports = router;
