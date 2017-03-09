var express = require('express');
var router = express.Router();

var cors = require('cors');

var axios = require('axios');

var dbBooster = require('./../models/dbBooster');
var Dbc = require('./../models/dbc');

/**
  * @description
  * First route will handle the static html file delievery.
  * Second route will handle the API calls.
*/

router.get('/', function(req,res) {
  res.json({message : "Hello Controller World"});
});

router.get('/test_db', function (req, res) {

	var dbc = new Dbc();
 	
 	console.log("test_db path");
 	dbc.connect()
 	.then ( function (connection) {
 		console.log("Connected");
 		connection.query("Select * from user")
 		.then ( function(result) {
 			console.log("User test: " + JSON.stringify(result));
	 		res.json(result);
 		})
 		.catch( function (err) {
 			console.log("Error querying: " + err);
 			res.json(err);
 		})
 	})
 	.catch ( function (err) {
 		console.log("Error connecting...");
 		res.json(err);
 	});
});

router.get('/test_cors', cors(), function (req, res) {

	var issue2options = {
	  origin: true,
	  methods: ['POST'],
	  credentials: true,
	  maxAge: 3600
	};

	// axios.get('http://localhost:3002', cors(issue2options))
	axios.get('/test_db', cors(issue2options))
	.then ( function (result) {
		console.log('got results');
		console.log(JSON.stringify(result));
		res.json(result);
    })
    .catch ( function (err) {
    	console.log('failed to call test recursively');
    	res.json(err);
    });	
});

router.get('/build/:table', function (req,res) {
	
	var table = req.params.table || '';
	var db    = req.params.db || 'devDB';
	console.log("boost db..." + table);

	dbBooster.build(db, table)
	.then ( function (result) {
		console.log('boosted...' + JSON.stringify(result));
		res.json(result);
	})
	.catch ( function (Berr) {
		console.log("Error building " + table);
		res.json(Berr);
	});

})

router.use('/user',require('./user'));

module.exports = router;
