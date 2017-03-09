var q = require('q');

var Dbc = require('./dbc');

function user() {
	this.name = 'default';

}

user.prototype.loadUser = function() {
	var deferred = q.defer();

	var dbc = new Dbc();
 	
 	dbc.connect()
 	.then ( function (connection) {
 		console.log("Connected");
 		deferred.resolve(connection);
 	})
 	.catch ( function (err) {
 		deferred.reject(err);
 	});

 	return deferred.promise;
}

module.exports = user;
