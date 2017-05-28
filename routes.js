/**
  * @description
  * First route will handle the static html file delievery.
  * Second route will handle the API calls.
*/

var express = require('express');
var router = express.Router();

router.get('/',function(req,res) {

  var routes = {
  	'api' : {
  		'public' : ['lookup', 'validate', 'login', 'signup'],
  		'private' : ['profile']
  	},
  }

  res.json({ routes : routes});
});

router.get('/api/search', function (req, res) {
	res.json({action : 'search for it'});
});
// router.use('/user',require('./client/src/Standard/User/UserRoutes'));

module.exports = router;
