
module.exports = function(db){
	db.serialize(function() {
	db.run("CREATE TABLE if not exists base_data (\
	id integer PRIMARY KEY autoincrement,\
'年份' varchar(30),\
'月份'  varchar(30),\
'班型'  varchar(30),\
'班次'  varchar(30),\
'学员'  nvarchar(30),\
'代理商全称'  varchar(30),\
'听课证号'  varchar(30),\
'培训费总额'  int,\
'优惠'  int,\
'学费'  int,\
'杂费'  int,\
'应收金额'  int,\
'实收金额'  int,\
'手续费'  int,\
'收入金额'  int,\
'收款方式'  varchar(30),\
'收款日期'  varchar(30),\
'操作员'  varchar(30),\
'报名分部'  varchar(30),\
'报名分部帐套'  varchar(30),\
'是否跨帐套收款'  varchar(30),\
'是否跨帐套应收'  varchar(30),\
'退款方式'  varchar(30),\
'退款日期'  varchar(30),\
'退款人'  varchar(30),\
'退款分部'  varchar(30),\
'退款分部帐套'  varchar(30),\
'班级归属分部'  varchar(30),\
'班级帐套'  varchar(30),\
'是否跨帐套退款'  varchar(30),\
'备注'  varchar(30),\
'数据来源'  varchar(30),\
'分部匹配'  varchar(30),\
'金额'  varchar(30),\
'分校名称'  varchar(30),\
'考试项目'  varchar(30),\
'班号'  varchar(30),\
'笔面试'  varchar(30),\
'是否协议班' int);");

	db.run('DELETE FROM base_data;')
	db.run('DELETE FROM sqlite_sequence;')

	// db.run("INSERT INTO base_data VALUES (NULL,\
	//  	'2015年9月',\
	//  	'事业单位事业部-事业单位',\
	//  	'金牌定制班GTYSY01555',\
	//  	'范帅',\
	//  	'',\
	//  	'GTYSY01555008',\
	//  	'4880',\
	//  	'0',\
	//  	'4880',\
	//  	'0',\
	//  	'0',\
	//  	'4880',\
	//  	'0',\
	//  	'4880',\
	//  	'现金',\
	//  	'42248.3421875',\
	//  	'张雅茹',\
	//  	'太原总部',\
	//  	'',\
	//  	'',\
	//  	'',\
	//  	'',\
	//  	'',\
	//  	'',\
	//  	'',\
	//  	'太原总部',\
	//  	'太原总部 ',\
	//  	'太原总部',\
	//  	'否',\
	//  	' ',\
	//  	'1类-ab报表',\
	//  	'太原总部',\
	//  	'0.488',\
	//  	'山西分校',\
	//  	'事业单位',\
	//  	'GTYSY01555',\
	//  	'面');");
});

}
