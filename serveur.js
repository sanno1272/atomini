const http = require('http');
const fs = require("fs");
const vm = require('vm');

// fonction chargement
async function openFile (fileName) {
	const file = await vm.runInThisContext(fs.readFileSync(__dirname + "/" + fileName));
	return file;
}


var server = http.createServer(async(req, res) => {

	let txRoute = ''; let txAtom = ''; let txMol = ''; let txElec = ''; let txCss = '';

	// chargement fichiers
	const configFile = require('./config/files.js');
	const file = configFile.files;
	for (var key in file) {
		await openFile(file[key]+"/"+file[key]+".atom");
		await openFile(file[key]+"/"+file[key]+".molecule");
		await openFile(file[key]+"/"+file[key]+".electron");
		await openFile(file[key]+"/"+file[key]+".css");
	}
	

	async function openConfig (fileName) {
		// fabrication fichier config
		fs.open(fileName, 'w+', function(err, data) {
			if (err) console.log("ERROR !! " + err);
			else {
				let co = 'exports.mapper = {\n\tmolecules: [\n';
				for (var key in file)  co += '\t\t'+file[key]+',\n'; 
				co += '\t],\n\tatoms: [\n';
				for (var key in file)  co += '\t\t_'+file[key]+',\n'; 
				co += '\t],\n\telectrons: [\n';
				for (var key in file)  co += '\t\t_'+file[key]+'_,\n'; 
				co += '\t],\n\tcss: [\n';
				for (var key in file)  co += '\t\tcss_'+file[key]+',\n'; 
				co += '\t]\n}';
				co = co.replace(/\[([\s\S]*?),\]/gi,'[$1]');

				fs.write(data, ''+co+' ', -1, ''+co+' length', 1, function(err) {
				if (err) console.log("ERROR !! " + err);
					fs.close(data, function() {
						console.log('written success');
					})
				});
				
			}
		});
	}

	
	// chargement routes
	await openFile("config/routes.js");
	
	await openConfig("config/config.js");
	// appel du core framework
	await openFile("framework.js");
	const configReg = require('./config/regex.js');
	const regRoutesFrame = configReg.regRoutesFrame;
	const replRoutesFrame = configReg.replRoutesFrame;
	const regexFrame = configReg.regexFrame;
	const replFrame = configReg.replFrame;
	const regCss = configReg.regcss;
	const replCss = configReg.replcss;
	const regElec = configReg.regelec;
	const replElec = configReg.replelec;
	
setTimeout(function () {

const configMap = require('./config/config.js');
const mapp = configMap.mapper;
	
	// injection du contenu des fichiers
	for (var i=0; i<mapp.atoms.length; i++ ) { txAtom +=  mapp.atoms[i]; }
	for (var i=0; i<mapp.molecules.length; i++ ) { txMol +=  mapp.molecules[i]; }
	for (var i=0; i<mapp.electrons.length; i++ ) { txElec +=  mapp.electrons[i]; }
	for (var i=0; i<mapp.css.length; i++ ) { txCss +=  mapp.css[i]; }
	txRoute += routes;

	
	
	// traducteur
	// ------------------------------------------
	txRoute = txRoute.replace(regRoutesFrame[0],replRoutesFrame[0]);
	txRoute = txRoute.replace(regRoutesFrame[1],replRoutesFrame[1]);
	
	txMol = txMol.replace(regexFrame[2],replFrame[4]);
	txMol = txMol.replace(regexFrame[3],replFrame[5]);

	txAtom = txAtom.replace(regexFrame[0],replFrame[2]);
	txAtom = txAtom.replace(regexFrame[1],replFrame[3]);
	txAtom = txAtom.replace(regexFrame[4],replFrame[6]);
	
/* emplacement regex css + electron -------------- */
	for (var key in regCss) {
		txCss = txCss.replace(regCss[key], replCss[key]);
	}
	
	for (var key in regElec) {
		txElec = txElec.replace(regElec[key], replElec[key]);
	}
	// ------------------------------------------

	
	// creation routes pour la loop du router
	var arrRout = 'var routes = [';
	for (var key in file) arrRout += '{r:"'+file[key]+'"},';
	arrRout += '];';

	// looper pour router
	var loopTemp = `
		function loopingRouter (cont) {
			var tx = document.getElementById(cont).innerHTML;
			tx = tx.replace(/\\$key.([\\s\\S]*?)\\$/gi,'\`+dat[key].$1+\`');
			tx = tx.replace(/([\\s\\S]*?)\\<(loop) ele="(div|ul)" for="([\\s\\S]*?)"\\>([\\s\\S]*?)\\<\\/(loop)\\>([\\s\\S]*?)(\\<\\/section\\>)/gi,'`+arrRout+` (function looping$3 (data)  {var el$3 = document.createElement("section");  var dat=data; var loo$3 = document.createElement("$3"); loo$3.id = "loop-\'+cont+\'"; var debut$3 = \`$1\`;  var fin$3 = \`$7\`;  var co$3 = \`\`; for (key in dat) { co$3 += \`$5\`; } loo$3.innerHTML += co$3; el$3.innerHTML+= debut$3;  el$3.appendChild(loo$3);  el$3.innerHTML+= fin$3; document.getElementById("'+cont+'").appendChild(el$3); if (debut$3.match("@refresh")) {document.getElementById("refresh-$4").onmousedown = function () {  var rg = new RegExp(/[a-zA-Z]/); if (rg.test(document.getElementById("input-$4").value) === true) {  $4.push({n: document.getElementById("input-$4").value}); } else { } document.getElementById(loo$3.id).innerHTML = "";  for (key in $4) { document.getElementById(loo$3.id).innerHTML += \`$5\` } }  }  })($4)');
			tx = tx.replace(/(\\<section\\>)/gi,'');
			tx = tx.replace(/(\\<\\/section\\>)/gi,'');
			var sc = document.createElement("script"); sc.innerHTML = tx; document.getElementById(cont).innerHTML = ''; document.getElementById(cont).appendChild(sc);
		}
	`;

	// appel des fonctions @toms
	const reqFunk = require('./testXp.js');

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<!DOCTYPE html>\n<html>\n<meta charset="utf-8" />\n<head></head>\n<body>\n')
	res.write('<router></router>\n<organism></organism><style></style>');
	res.write('<script>\n'+arrRout+fw+loopTemp+reqFunk.funk+'\n\n');
	res.write(''+txRoute+txAtom+txMol+txElec+'\n/*STYLE*/'+txCss+'');
	res.write('var index= new window[routes[0].r]();');
	res.write('</script><style>body{margin:0;padding:0;width:100%;height:100%;}</style>');
	res.write('</body></html>');
	res.end();

}, 10);// end timeout
});

server.listen(8080);



