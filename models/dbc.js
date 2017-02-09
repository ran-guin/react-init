var mysql = require('mysql-promise')();
var q    = require('q');

function dbc(params) {
	console.log('defining dbc');
	this.status = 'pending';
}

dbc.prototype.connect = function() {
	var deferred = q.defer();

	console.log("CREATING connection to " + mysql.constructor);

	// var connection = mysql.createConnection({
	mysql.configure({
	  host : 'localhost',
	  user : 'tester',
	  password : 'testpass',
	  database : 'litmusdev'
	});

	deferred.resolve(mysql);
	
    // mysql.connect()
    // .then (function (connection) {
	   //  deferred.resolve(connection);
    // })
    // .catch ( function (err) {
    // 	deferred.reject(err);
    // });

    return deferred.promise;	
}

module.exports = dbc;