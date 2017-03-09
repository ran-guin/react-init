/**
  * @description
  * First route will handle the static html file delievery.
  * Second route will handle the API calls.
*/

var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {
  res.json({message : "Hello World"});
});

router.use('/user',require('./client/src/Standard/User/UserRoutes'));

module.exports = router;
