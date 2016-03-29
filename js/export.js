var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('base');
var cp = require('child_process');
var fs = require('fs');
var iconv = require('iconv-lite');

module.exports = function(done, db){
	// cp.exec('sqlite3 -csv -header base "select name from base_data" > out.csv'/*command*/ , {encoding:'gbk'} /*options, [optiona]l*/ , function(err, stdout, stderr) {
	// 	if(err) throw err;
	// 	console.log('stdout: ' + stdout);
	// 	console.log('stderr: ' + stderr);
	// 	if(done) done();
	// });
	fs.writeFileSync('./out.csv',''); 

	var writeStream = fs.createWriteStream('./out.csv');

	writeStream.write("#id,年份,月份,班型,班次,学员,代理商全称,听课证号,培训费总额,优惠,学费,杂费,应收金额,实收金额,手续费,收入金额,收款方式,收款日期,操作员,报名分部,报名分部帐套,是否跨帐套收款,是否跨帐套应收,退款方式,退款日期,退款人,退款分部,退款分部帐套,班级归属分部,班级帐套,是否跨帐套退款,备注,数据来源,分部匹配,金额,分校名称,考试项目,班号,笔面试,是否协议班\n");

	db.serialize(function() {
		var flag=true;
		db.all("select * from base_data",function(err, rows){
			
			write(rows);
		});
		db.all("select * from base_data where 手续费>0 and 手续费!=''",function(err, rows){
			write(rows)
			
		});

		db.run('', function(){
			writeStream.end('');
		})
	  
	});
	writeStream.on('finish',function(){
	  console.log('copy over');
	  if(done) done();  
	});
	
	function write(rows){
		rows.forEach(function(row){
			var x = [];
			for(var name in row){
				x.push(row[name]);
			}
			//if(row['手续费']>0)console.log(row)
			
			writeStream.write(x.join(',')+'\n');
		});
	}

	// ps.stdout.on('data', function (data) {
	//   writeStream.write(data);
	// });

	// ps.on('close', function (code) {
	// 	if(done)done();
	//   if (code !== 0) {
	//     console.log('ps process exited with code ' + code);
	//   }
	// });

}

