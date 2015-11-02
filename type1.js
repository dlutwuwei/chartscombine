var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('base');


// ’班型‘
// ‘班次‘
// ‘学员‘
// ‘收款方式‘
// ‘听课证号‘
// ‘培训费总额‘
// ‘学费‘
// ‘杂费‘
// ‘优惠‘
// ‘实收‘
// ‘收款日期‘
// ‘操作员‘
// ‘报名分部‘
// ‘报名分部帐套‘
// ‘班级归属分部‘
// ‘班级帐套‘
// ‘是否跨帐套收款‘
// ‘备注‘

var import_file = require('./import.js');
var create =require('./create.js');

//创建和清空数据库
create(db);

var map1 = ['C', 'D', 'E', 'P', 'G', 'H', 'J', 'I', 'M', 'Q', 'R', 'S', 'T', 'AA', 'AB', 'AC', 'AD', 'AE'];

import_file(db, '学费日报表(1类现场和网上普通班收款01A和协议班收款01B凭证)2015-10-7_10-14-31.xls',map1, true);

// 班型
// 班次
// 学员
// 代理商全称
// 听课证号
// 培训费总额
// 学费
// 杂费
// 优惠
// 应收金额
// 日期
// 操作员
// 报名分部
// 报名分部帐套
// 班级归属分部
// 班级帐套
// 是否跨帐套应收
// 备注
var map2 = ['C', 'D', 'E', 'P', 'G', 'H', 'J', 'I', 'M', 'Q', 'R', 'S', 'T', 'AA', 'AB', 'AC', 'AD', 'AE'];
import_file(db,'学费日报表(1类现场和网上普通班收款01A和协议班收款01B凭证)2015-10-7_10-14-31.xls',map2, false);


// 班型
// 班次
// 学员
// 收款方式
// 听课证号
// 培训费总额
// 学费
// 杂费
// 优惠
// 实收
// 收款日期
// 操作员
// 报名分部
// 报名分部帐套
// 班级归属分部
// 班级帐套
// 是否跨帐套收款
// 备注
// 
// 班型
// 班次
// 学员
// 代理商全称
// 退款方式
// 听课证号
// 培训费总额
// 优惠
// 实收金额
// 手续费/课时费
// 退款日期
// 收款日期
// 退款人
// 退款分部
// 退款分部帐套
// 班级归属分部
// 班级帐套
// 是否跨帐套退款
// 备注
var map9 = ['C', 'D', 'E', 'P', 'G', 'H', 'J', 'I', 'M', 'Q', 'R', 'S', 'T', 'AA', 'AB', 'AC', 'AD', 'AE'];

import_file(db, '学费日报表(9类现场和网上协议班学费收入结转09凭证)2015-10-7_10-21-43.xls',map9, false);

db.close();