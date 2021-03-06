var express = require('express');
var router = express.Router();
var Dbc = require('../models/dbc');
var jwt = require('jsonwebtoken');


var lookups = ['user', 'Lab_Protocol', 'grp', 'disease','vaccine'];

router.get('/search', function(req,res) {
	// res.json({message : "searches must use POST method"});
	console.log("test lookup only using user table");

	var model = 'user';
	var index = lookups.indexOf(model);
	var condition = req.condition || '1';

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
	 		    res.json({ Result: result});
			})
			.catch( function (err) {
				console.log("Error querying: " + err);
				connection.end();
				res.json({Error: err});
			})
	 	})
	 	.catch ( function (err) {
	 		console.log("Error connecting...");

	 		res.json({Err: err});
	 	});
	}
	else {
		var err = model + ' is not a Valid lookup table'
		console.log(err);
		res.json({ Error: err});
	}
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
				// connection.end();
	 			return res.json(result);
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
		var err = model + ' is not a valid lookup Table'
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
				console.log(model + " Lookup Result: " + JSON.stringify(result));
				// connection.end();
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
