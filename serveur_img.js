const http = require('http');
const fs = require("fs");
const vm = require('vm');
const url = require('url');
const path = require('path');

// fonction chargement
async function openFile (fileName) {
	const file = await vm.runInThisContext(fs.readFileSync(__dirname + "/" + fileName));
	return file;
}

	let txRoute = ''; let txAtom = ''; let txMol = ''; let txElec = ''; let txCss = '';

	// chargement fichiers
	const configFile = require('./config/files.js');
	const file = configFile.files;
	for (var key in file) {
		 openFile(file[key]+"/"+file[key]+".atom");
		 openFile(file[key]+"/"+file[key]+".molecule");
		 openFile(file[key]+"/"+file[key]+".electron");
		 openFile(file[key]+"/"+file[key]+".css");
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
	 openFile("config/routes.js");
	
	 openConfig("config/config.js");
	// appel du core framework
	 openFile("framework.js");
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
		
	// creation index.html	
	async function createIndex (fileName) {
		fs.open(fileName, 'w+', function(err, data) {
			if (err) console.log("ERROR !! " + err);
			else {
				let co = '<!DOCTYPE html>\n<html>\n<meta charset="utf-8" />\n<head></head>\n<body>\n';
					co += '<router></router>\n<organism></organism><style></style>';
					co += '<script>\n'+arrRout+fw+loopTemp+reqFunk.funk+'\n\n';
					co += ''+txRoute+txAtom+txMol+txElec+'\n/*STYLE*/'+txCss+'';
					co += 'var index= new window[routes[0].r]();';
					co += '</script><style>body{margin:0;padding:0;width:100%;height:100%;}</style>';
					co += '</body></html>';
					

				fs.write(data, ''+co+' ', -1, ''+co+' length', 1, function(err) {
				if (err) console.log("ERROR !! " + err);
					fs.close(data, function() {
						console.log('written success');
					})
				});
				
			}
		});
	}
	
createIndex('./index.html');



http.createServer(function (req, res) {
  const parsedUrl = url.parse(req.url);
  
  // Extrait le chemin de l'URL
  let pathname = `.${parsedUrl.pathname}`;

  // Associe le type MIME par rapport au suffixe du fichier demandé
  const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'application/font-sfnt'
  };
  
  fs.exists(pathname, function (exist) {
    if(!exist) {
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }
    // s'il s'agit d'un répertoire, on tente d'y trouver un fichier index.html
    if (fs.statSync(pathname).isDirectory()) {
      pathname += '/index.html';
    }
    // lecture du fichier
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.end(`Error getting the file: ${err}.`);
      } else {
        // extraction du suffixe de fichier : .js, .doc, ...
        const ext = path.parse(pathname).ext;
        // si le fichier est trouvé, définit le content-type et envoie les données
        res.setHeader('Content-type', mimeType[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


  
  
}).listen(8080);

}, 10);// end timeout


