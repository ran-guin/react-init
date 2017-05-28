var express = require('express');
var router = express.Router();
var Dbc = require('../models/dbc');
var jwt = require('jsonwebtoken');


var lookups = ['user', 'Lab_Protocol', 'grp'];

router.get('/search', function(req,res) {
	res.json({message : "searches must use POST method"});
});

router.get('/:model',function(req,res) {	
 	var model = req.params.model;

 	var index = lookups.indexOf(model);
 	console.log("Index: " + index);

 	if (model && lookups.indexOf(model) >= 0) {
	 	var dbc = new Dbc();
		dbc.connect()
		.then ( function (connection) {
			console.log("Connected in user module");
			var query = "Select * from " + model;
			
			connection.query(query)
			.then ( function(result) {
				console.log(model + " Lookup: " + JSON.stringify(result));
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
		var err = model + ' is not a valid lookup table'
		console.log(err);
		res.json({ Error: err});
	}
});

router.post('/search',function(req,res) {

	var body = req.body || {};
	console.log("BODY: " + JSON.stringify(body));

 	var model = body.model;
 	var condition = body.condition;

 	var index = lookups.indexOf(model);
 	console.log("Index: " + index);

 	if (model && lookups.indexOf(model) >= 0) {
	 	var dbc = new Dbc();
		dbc.connect()
		.then ( function (connection) {
			console.log("Connected in user module");
			var query = "Select * from " + model;
			if (condition) { query = query + " WHERE " + condition }

			console.log(query);
			connection.query(query)
			.then ( function(result) {
				console.log(model + " Lookup: " + JSON.stringify(result));
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
		var err = model + ' is not a Valid lookup table'
		console.log(err);
		res.json({ Error: err});
	}
});

module.exports = router;
