var mysql = require('mysql');
var q    = require('q');

function dbc(params) {
	console.log('defining dbc');
	this.status = 'pending';
}

dbc.prototype.connect = function() {
	var deferred = q.defer();

	console.log("CREATING connection to " + mysql.constructor);

	var connection = mysql.createsConnection({
	  host : 'localhost',
	  user : 'tester',
	  password : 'testpass',
	  db : 'users'
	});

	console.log(connection.constructor);

    connection.connect();

    deferred.resolve(connection);
    return deferred.promise;	
}

module.exports = dbc;