function getColNumber(x) {
	var s = 'A'.charCodeAt();
	if (x.length == 1) {
		return x[0].charCodeAt() - s;
	} else if (x.length == 2) {
		return (26 + x[1].charCodeAt() - s);
	}
}

var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');


module.exports = function(db, file, map, isFliter, anotherFilter, start, from, done) {

	fs.readFile(file,function(err,data){
		if(err) console.log(err)
		console.time('读取html文件');
		$ = cheerio.load(data+'');
		var lines = $('.tablesorter tbody tr');
		console.log(lines.length)

		var tables = $('table');
		var contact_class = tables.eq(-3);
		console.log(contact_class.children('tr').length,'协议班-班次')
		for(var i=0; i<lines.length;i++){

		}
	})

	
}


function importExcel(db, file, map, isFliter, anotherFilter, start, from, done){
	var workbook = XLSX.readFile(file);


	var first_sheet_name = workbook.SheetNames[0];
	console.timeEnd('读取excel文件')

	var worksheet = workbook.Sheets[first_sheet_name];

	// console.log(worksheet['!range']);

	var range = worksheet['!range'];

	//找到过滤的班型 普通班
	var f_start = range.e.r,
		f_end = range.e.r;
	console.log(f_start, f_end)
	for (var i = range.e.r; i > 0; i--) {
		var cell = worksheet['A' + i];
		if (!cell) {
			f_end = i;
		}
		if (cell && cell.v.indexOf('协议班-班次') >= 0) {
			f_start = i;
			break;
		}
	}

	if (isFliter) {
		//判断是否是协议班
		var filter = {};
		console.log('过滤表',f_start, f_end)
		for (var j = f_start; j < f_end ; j++) {
			cell = worksheet['A' + j];
			filter[cell.v] = 1;
		}
	}

	//console.log(filter);
	//var stmt = db.prepare("INSERT INTO base_data VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)");


	console.time('write Database');
	// var sqlstr = 'begin;\n';
	db.parallelize(function() {

		db.run('begin;')

		for (var R = range.s.r + start; R <= range.e.r; ++R) {
			var insert_row = new Array(39)
			insert_row.forEach(function(item, index, array) {
				array[index] = '';
			});
			insert_row[0] = '2015'
			insert_row[1] = '9月';
			insert_row[31]= from[0];

			insert_row[38] = 0;

			var begin = worksheet['A' + R];
			// console.log(begin)
			//读取到空行
			if (!begin||begin.v=="") {
				break;
			};

			if (isFliter) {
				var type = worksheet['B' + R].v;
				//console.log(type)
				if (type && filter[type] == 1) {
					// 标示为协议班
					insert_row[38] = 1;
					insert_row[31]= from[1];
				}else{
					insert_row[38] = 0;
					insert_row[31]= from[0];

				}
			}


			if(anotherFilter){
				var type = worksheet['T' + R].v;

				if(type.indexOf('结转')>0){
					insert_row[31]= '9类已结转，10类退费';
					insert_row[14] = worksheet['H' + R].v;
				}else{
					insert_row[14] = worksheet['I' + R].v;

				}

			}
			// console.log(begin.v, R)
			for (var C = range.s.c; C < range.e.c; ++C) {
				var cell_address = {
					c: String.fromCharCode('A'.charCodeAt() + C),
					r: R
				};
				var cell = worksheet[cell_address.c + cell_address.r];
				if (cell) {
					//console.log(cell)
					var col = map[C];
					if(col==''){
						continue;
					}
					if(col==null){
						console.log(C)
					}
					var x = col.split(',');
					for(var k=0; k<x.length; k++){
						insert_row[getColNumber(x[k])] = cell.v;
					}
				} else {
					//console.log(cell);
					//break;
				}


			}

			//预编译执行
			// insert_row.unshift(null);
			// stmt.run(insert_row);

			//事务插入 不能执行，可能因为数据量太大一次
			db.run("INSERT INTO base_data VALUES (null,\'" + insert_row.join('\',\'') + "\');")
				//console.log("INSERT INTO base_data VALUES (null,\'" + insert_row.join('\',\'') + "\');")

			//单条插入，和预编译一样,sqlite3或许有自动优化的功能
			//db.run("INSERT INTO base_data VALUES (null,\'" + insert_row.join('\',\'') + "\');");
		}

		db.run('commit;', function() {
			console.timeEnd('write Database');
			done();
		});

		// db.run(sqlstr,function(err){
		// 	if(err) throw err;
		// 	console.timeEnd('write Database')
		// })
		// 
		
		// stmt.finalize(function(){
		// 	console.timeEnd('write Database')

		// })

	});
}