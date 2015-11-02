var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('base');
var fs = require('fs');

var import_file = require('./import.js');
var create = require('./create.js');
create(db);

var ejs = require('ejs');

var actions = [{
	id: 1,
	name: '学费日报表(1类现场和网上普通班收款01A和协议班收款01B凭证)'
}, {
	id: 2,
	name: '学费日报表(2类代理普通班应收款02凭证)'
}, {
	id: '3c',
	name: '学费日报表(3类结课前代理普通班分校退款03C凭证)'
}, {
	id: 3,
	name: '学费日报表(3类结课前普通班退款03A和协议班非协议退费退款03B凭证)'
}, {
	id: 4,
	name: '学费日报表(4类结课前代理普通班代理退款04凭证)'
}, {
	id: '7c',
	name: '学费日报表(7类结课后代理普通班分校退款07C凭证)'
}, {
	id: 7,
	name: '学费日报表(7类结课后普通班退款07A和协议班非协议退费退款07B凭证)'
}, {
	id: 8,
	name: '学费日报表(8类结课后代理普通班代理退款08凭证)'
}, {
	id: 9,
	name: '学费日报表(9类现场和网上协议班学费收入结转09凭证)'
}, {
	id: 10,
	name: '学费日报表(10类协议班正常协议退费10A和结转后协议退费10B凭证)'
},{
	
	id: 11,
	name: ' 实际杂费'

}]
$('#content').html(ejs.render(fs.readFileSync('index.tpl') + '', {
	actions: actions
}))


$('.import').on('click', function(evt) {
	var map = this.getAttribute('map');
	var fpath = $(this).parent().parent().find('input[type=text]').val();
	console.log(fpath);
	if (fpath == "") alert('没有选择文件导入');

	function done() {

	}


	//                A    B    C    D    E    F    G    H    I    J    K    L    M    N    O    P      Q     R       
	var map1 = ['C', 'D', 'E', 'P', 'G', 'H', 'J', 'K', 'I', 'M', 'Q', 'R', 'S', 'T', 'AB', 'AC', 'AD', 'AE'];
	var isFilter = false;
	var anotherFilter = false;
	var start = 6;
	var from = [];
	switch (map) {
		case '1':
			//        A    B    C    D    E    F    G    H    I    J    K    L    M    N    O     P      Q    R     S    T     
			map1 = ['C', 'D', 'E', 'P', 'G', 'H', 'J', 'K', 'I', 'M,O', 'Q', 'R', 'S', 'T', 'AB', 'AC', 'AD', 'AE'];
			from = ['1类-ab报表','1类报表B']
			isFilter = true;
			break;
		case '2':
			map1 = ['C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'I', 'L,O', 'Q', 'R',  'S', 'T', 'AB', 'AC', 'AD', 'AE'];
			from = ['2类报表']
			isFilter = false;
			break;
		case '3c':
			map1 = ['C', 'D', 'E', 'F', 'W', 'G',  'H', 'I', 'M,O', 'N', 'X', 'Q', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE'];
			from = ['3类-C报表']
			isFilter = false;
			break;
		case '3':
			map1 = ['C', 'D', 'E', 'W', 'G', 'H', 'I', 'N', 'M,O', 'X', 'Q', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE'];
			from = ['3类-ab报表','3类报表B']
			isFilter = true;
			break;
		case '4':
			//        A    B    C    D    E    F   G    H      I    J    K    L    M     N      O     P     Q    R     S    T     
			map1 = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'L,O', 'Q', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE'];
			isFilter = false;
			from = ['4类报表']
			break;
		case '7c':
			map1 = ['C', 'D', 'E', 'F', 'W', 'G', 'H', 'I',  'M,O', 'N', 'X', 'Q', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE'];
			from = ['7类-C报表']
			isFilter = false;
			break;
		case '7':
			map1 = ['C', 'D', 'E', 'W', 'G', 'H', 'I', 'N', 'M,O', 'X', 'Q', 'Y', 'Z', 'AA', 'AB', 'AC', ' AD', 'AE'];
			isFilter = true;
			from = ['7类-ab报表','7类报表B']
			break;
		case '8':
			//       A    B    C    D    E    F    G    H       I    J    K    L    M     N    O     P     Q    R     S    T     
			map1 = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'L,O', 'Q', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE'];
			isFilter = false;
			from = ['8类报表']
			break;
		case '9':
			map1 = ['C', 'D', 'E', 'P', 'G', 'H', 'J', 'K',   'I','M,O', 'Q', 'R', 'S', 'T',  'AB', 'AC', 'AD', 'AE'];
			isFilter = false;
			from = ['9类报表']
			break;
		case '10':
			map1 = ['C', 'D', 'E', 'G', 'H', 'I', 'K',  '', '',    'W',  'Y', 'Q', 'X',  'Y', 'S', 'T', 'AB', 'AC', 'AD', 'AE'];
			from = ['10类报表']
			isFilter = false;
			anotherFilter = true;
			break;
		case '11':
			map1 = ['',  'S', 'C', 'D', '' , 'H', '',  '',    'I',  'K,O',  'E','',  'Q', 'P', '', '',  '', 'G'];
			from = ['实际杂费'];
			start = 2;
			break;
		default:
			return;
	}
	import_file(db, fpath, map1, isFilter, anotherFilter, start, from ,done);
});

$('#output').on('click', function(evt) {
	document.getElementById('file_input').click();
});

$('#file_input').on('change', function(evt) {
	console.log(this.value);
	var self = this;
	require('./export.js')(function() {
			saveFile(process.cwd() + '/out.csv', new String(self.value).slice(''));
			self.value = "";
		})
		// } else {
		// 	fs.mkdir(this.value, function(err) {
		// 		if (err) throw err;
		// 		saveFile('./out.csv', this.value)

	// 	})
	// }

});

var iconv = require('iconv-lite');
var UTF8 = require('utf-8');
var x = String.fromCharCode(UTF8.getCharCode([0xC2, 0xA0]));
console.log(UTF8.getCharCode([0xC2, 0xA0]))

function saveFile(source, target) {
	console.log(source, target)
	fs.readFile(source, 'utf-8', function(err, data) {
		if (err) throw err;
		

		var str = (data+'').replace(/[^\S\r\n]/g,'');
		var res = iconv.encode(str, 'GBK');
		fs.writeFile(target, res, 'utf-8', function(err) {
			if (err) throw err;
			console.log('文件保存完成')
		})
	})
};

function apendText(text) {
	var element = document.createElement('div');
	element.appendChild(document.createTextNode(text));
	document.body.appendChild(element);
}