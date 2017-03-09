var mysql = require('mysql-promise');

var q = require('q');

var connection = mysql();

var config = require('./../config/local.js');

var connect = function(db) {
	var deferred = q.defer();

	var DB = config.connection[db];

	console.log("Connect as " + JSON.stringify(DB));

	connection.configure({
	  host : 'localhost',
	  user : 'tester',
	  password : 'testpass',
	  database : 'litmusdev'
	  // host : DB.host,
	  // user : DB.user,
	  // password : DB.password,
	  // database : DB.database
	});

	deferred.resolve(connection);

	return deferred.promise;
}

var build = function (dbc, table) {
	var deferred = q.defer();

	var deferred = q.defer();

 	var like = "'%'";
 	if (table) { like = "'" + table + "'" }

 	connection.query("show tables like " + like)
	.then ( function (tresult) {
		var tables_hash = tresult[0];

		console.log(JSON.stringify(tables_hash));
 	
		var Tpromises = [];
		var tables = [];
		for (var i=0; i<tables_hash.length; i++) {
			var table = Object.values(tables_hash[i])[0];
			tables.push(table);
			var Tdata = {
				'DBTable_Name' : table
			};

			Tpromises.push( connection.query("INSERT INTO DBTable SET ?", Tdata));
		}

		console.log(Tpromises.length + " Tables to be generated...");

		q.all( Tpromises )
		.then ( function (Tbuild) {
			console.log(JSON.stringify(Tbuild));
			var Fpromises = [];
			
			console.log(JSON.stringify(tables));

			for (var i=0; i<Tbuild.length; i++) {
				console.log("I = " + i);
				var Tid = Tbuild[i][0].insertId;
				var table = tables[i];

				console.log(i + ' from ' + table);
				
				console.log('call build field records for table: ' + table + ' : ' + Tid);
				Fpromises.push( build_field_records(dbc, table, Tid) );
			}

			console.log("Generating field records for " + Fpromises.length + " tables");
			q.all(Fpromises)
			.then ( function (Fbuild) {
				deferred.resolve(Fbuild);
			})
			.catch ( function (Ferr) {
				console.log("Error generating field records");
				deferred.reject(Ferr);
			});
		})
		.catch ( function (Terr) {
			console.log("Err " + JSON.stringify(Terr));
			console.log("Error generating some of the tables");
			deferred.reject(Terr);
		});
	})
	.catch ( function (err) {
		console.log("could not find tables to build like " + like);
		deferred.reject(err);
	});


 	return deferred.promise;
 }

var build_field_records = function(dbc, table, Tid) {

	var deferred = q.defer();

	var query = 'Show fields from ' + table;

 	connection.query(query)
 	.then ( function(fresult) {
 		var fields = fresult[0];

		var F2promises = [];
		for (var j=0; j<fields.length; j++) {

			var name = fields[j].Field;
			var type = fields[j].Type;
			var defaultVal = fields[j].Default;
			var key     = fields[j].Key;

			var Fdata = {
				'FK_DBTable__ID' : Tid,
				'Field_Name'     : name,
				'Field_Type'     : type,
				'Field_Default'  : defaultVal,
				'Field_Table'    : table,
				'Prompt'         : name
			}

			F2promises.push( connection.query("INSERT INTO DBField SET ?", Fdata));
		}

		console.log("Generate all field data for " + table + '...');
		q.all(F2promises)
		.then ( function (Iresult) {
			console.log("inserted dbfield records");
			var returnval = { 
				table: table,
				id: Tid,
				field_ids: []
			};

			for (var i=0; i<Iresult.length; i++) {
				returnval.field_ids.push(Iresult[i][0].insertId);
			}
			deferred.resolve( returnval );
		})	
		.catch ( function (Ierr) {
			console.log(Ierr);
			console.log("Error adding field records for " + table);
			deferred.reject(Ierr);
		});
	})
	.catch (function (err) {
		console.log("Could not get fields from " + table);
		console.log(JSON.stringif(err));
		deferred.reject(err);
	});

 	return deferred.promise;
}


module.exports = {
	connect: 				connect,
	build: 					build,
	build_field_records: 	build_field_records
};
