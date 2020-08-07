const http = require('http');
const fs = require("fs");
const vm = require('vm');
const url = require('url');
const path = require('path');
const qs = require('querystring');

var reaD = require('./core/reader.js');
	var reading = reaD.readPath;

var mimeT = require('./core/mime.js');
	var mimeType = mimeT.mimeType;



// SERVER
http.createServer(function (req, res) {





  const page = url.parse(req.url).pathname;
  const parsedUrl = url.parse(req.url);
  let pathname = `.${parsedUrl.pathname}`;

  fs.exists(pathname, function (exist) {
		if(!exist) {
		  res.statusCode = 404;
		  res.end(`File ${pathname} not found!`);
		  return;
		}
		// s'il s'agit d'un répertoire, on tente d'y trouver un fichier index.html
	   if (fs.statSync(pathname).isDirectory()) {

		   var rout = require('./src/routes.js');
				var r = rout.routes;
		   for (var i=0; i<r.length; i++) {
				if (page === r[i]['page']) {
					pathname = r[i]['path'];
					reading(pathname);
				}   
		   }
		   
		   
			//routing(pathname,page)
		   
		   /*
		   if (page == '/' && req.method === 'POST') {
			   pathname = pathname.replace(/index\.html/,'/');
				pathname += '/result.html';
			var rawData = '';
			req.on('data', data=> rawData += data).on('end', ()=> {
				var qqq = qs.parse(rawData);
				console.log(`${qqq.nom}`);
				
			});
			}
			*/
		}
		
		// lecture du fichier
		setTimeout(function () {
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
		
		},50);
		
  });
  
  
}).listen(8080);



