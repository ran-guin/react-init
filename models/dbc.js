var mysql = require('mysql-promise')();
var q    = require('q');

var config = require('../config/local.js');

function dbc(params) {
	console.log('defining dbc');
	this.status = 'pending';
}

dbc.prototype.connect = function() {
	var deferred = q.defer();

	console.log("CREATING connection to " + mysql.constructor);

	var testDB = config.connections.testDB;
	
	if (testDB) {
		console.log("Test Connection: " + testDB.user + '@' + testDB.host + '.' + testDB.database);
		// var connection = mysql.createConnection({

		mysql.configure(testDB);
		console.log("configured..." + mysql);
		deferred.resolve(mysql);
	
	}
	else {
		deferred.reject("Could not find test DB");
	}

    return deferred.promise;	
}

module.exports = dbc;
