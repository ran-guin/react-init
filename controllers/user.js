var express = require('express');
var router = express.Router();
var Dbc = require('../models/dbc');
var jwt = require('jsonwebtoken');

router.get('/:userid',function(req,res) {
 	
 	var userid = req.params.userid;

 	if (userid && userid.match(/^\d+$/)) {
		var dbc = new Dbc();

 		dbc.connect()
 		.then ( function (connection) {
 			console.log("Connected in user module");
 			var query = "Select * from user where id = " + userid;
 			connection.query(query)
	 		.then ( function(result) {
	 			console.log("User test ...: " + JSON.stringify(result));
	 			connection.end();
		 		res.json(result);
	 		})
	 		.catch( function (err) {
	 			console.log("Error querying: " + err);
	 			connection.end();
	 			res.json(err);
	 		})
	 	})
	 	.catch ( function (err) {
	 		console.log("Error connecting...");

	 		res.json(err);
	 	});
	 }
	 else {
	 	res.json({ error: 'No userid supplied'} );
	 }
});

router.post('/',function(req,res) {
  var model = new Dbc();
  res.json({error: false, message: 'add user..'});
});

router.post('/login',function(req,res) {
  var model = new db();

  res.json({
        error: false,
        message: 'Validation successful!',
        token: token
  });
});

module.exports = router;
