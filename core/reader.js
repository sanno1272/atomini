const fs = require("fs");
const vm = require('vm');
const url = require('url');
const path = require('path');
var tmpEng = require('./tempEngine.js');
	var tmeg = tmpEng.TemplateEngine;

var cssEng = require('./tmpReg.js');
	var Rcss = cssEng.regCSS;
	var Ecss = cssEng.expCSS;

exports.readPath = function(pathname) {

	// Appel fichier lib.css (variables, bundle)
	var l = '';
	var lb = '';		
	fs.readFile('./src/lib.css', 'utf8',  function(err, data) {
		if (err) console.log('ERROR !! ' + err);
		else {
			l = data;
			lb = l.toString();
		}
	});


	fs.readFile(pathname+'.template', 'utf8', function(err, data){
				
		var d = data;
		var dt = d.toString();

		let co = dt;
		var mySc = '';
				
		var scri = /<script>([\s\S]*?)<\/script>/;
		co.replace(scri,'<script>$1</script>');
		mySc = RegExp.$1;
		mySc = 'exports.'+mySc;
		
	
	fs.writeFile(pathname+'.script', mySc, function (err,data) {
		if (err) return console.log(err);
	});
			
			
			
	fs.open(pathname, 'w+',  function(err, data) {
	if (err) console.log('ERROR !! ' + err);
	else {

		let co = dt;
		var mySc = '';
		var mySt = 'var arrX = []; \n var styler = "";\n';

		var scri = /<script>([\s\S]*?)<\/script>/;
		co.replace(scri,'<script>$1</script>');
		mySc = RegExp.$1;
				
				
				
		// css translate
		var sty = /<style>([\s\S]*?)<\/style>/;
		co.replace(sty,'<style>$1</style>');
		mySt += lb+RegExp.$1;
				
		for (var i=0; i<Rcss.length; i++) {
			mySt = mySt.replace(Rcss[i],Ecss[i]);
		}
				
		mySt += `
		var ax = {
				show: function () {
				var selector = arrX;
				var txx = '';
				for (var i=0; i<selector.length; i++) {
					txx += selector[i];
				}
				return txx;
			}
		}
		return ax.show();
		`;

		co = co.replace(/<style>([\s\S]*?)<\/style>/,'');


		// set Time out pour avoir le temps d'ecrire la css 
		setTimeout(function () {
		var expSc = require('../'+pathname+'.script');
			var op = expSc.myApp;
					
					
		// fabrication de Function de CSS
		var funn = new Function('funk',mySt);

				
		var hd =  require('../src/include.js');
			var head = hd.head;
			var foot = hd.foot;
					
	
					
		var trans = head;
		 var transBod = tmeg(co, op);
				 
			trans += '<style>'+funn()+'</style>';
			trans += transBod+'<br>\n';
			trans += '\n<script id="lastScript"></script>\n<script src="core/fun/fun.js"></script>';
			trans += foot;
				 
				 
		fs.write(data, ''+trans+' ', -1, ''+trans+' length', function(err) {
		if (err) console.log('ERROR !! ' + err);
			fs.close(data,  function() {
			console.log('written success');
			})
		});
		},10);
				
	}
	});
			
	});
	
}
