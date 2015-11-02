// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database('base');
var cp = require('child_process');

var iconv = require('iconv-lite');

module.exports = function(done){
	cp.exec('sqlite3 -csv -header base "select * from base_data;" > out.csv' /*command*/ , {} /*options, [optiona]l*/ , function(err, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if(done) done();
	});

}
