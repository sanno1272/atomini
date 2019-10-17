const http = require('http');
const fs = require("fs");
const vm = require('vm');

// includes
//const extfile = require('./ext.js');
const conf = require('./config.js');

const extfile = require('./home/home.molecule');


// fonction chargement
async function openFile (fileName) {
	const file = await vm.runInThisContext(fs.readFileSync(__dirname + "/" + fileName));
	return file;
}

const server = http.createServer(async(req, res) => {
	// chargement fichiers

	res.writeHead(200, {"Content-Type": "text/html"});
	res.write('<html><meta charset="utf-8" /><head></head><body>')
	res.write('<script>');


	var arrr = [extfile.home];

	for (var k in arrr) {
		var tx = arrr[k];
		tx = tx.replace(/body/gi,'document.body')
		res.write(''+tx+'');
	}

	res.write('</script>');
	res.write('</body></html>');
	res.end();
	
});

server.listen(8080);

