exports.regRoutesFrame = [
	// ROUTER
	/@{ '([\s\S]*?)'([\s\S]*?)\n}/gi,
	/template{([\s\S]*?)}/gi
];
	
exports.regexFrame = [
	// ATOMS
	/@([\s\S]*?){([\s\S]*?)\n}/gi,
	/template{([\s\S]*?)}/gi,
	//MOLECULES
	/{ '([\s\S]*?)'([\s\S]*?)molecules{([\s\S]*?)}([\s\S]*?)\n}/gi,
	/(@@)([\s\S]*?){([\s\S]*?)}/gi,
	/@{([\s\S]*?)}/gi
];
	
	
exports.replRoutesFrame = [
	// ROUTER
	'var $1 = O.extend({\n id: "$1",\n $2\n});\n var router = new routes();\n',
	'ini: function () {\n var ele = document.createElement("div"); ele.id = this.id; var tx = `$1`; ele.innerHTML += tx; document.getElementsByTagName("router")[0].appendChild(ele);\n if (tx.match("loop")) { loopingRouter(this.id) }\n }\n'
	];
	
exports.replFrame = [
	// OLD ROUTER
	'var $1 = O.extend({\n id: "$1",\n $2\n});\n var router = new routes();\n',
	'ini: function () {\n var ele = document.createElement("div"); ele.id = this.id; var tx = `$1`; ele.innerHTML += tx; document.getElementsByTagName("router")[0].appendChild(ele);\n if (tx.match("loop")) { loopingRouter(this.id) }\n }\n',
	// ATOMS
	'var $1 = O.extend({\n id: "$1",\n ini: function () {\n var ele = document.createElement("div"); ele.id = this.id; var tx = `$2`; ele.innerHTML += tx; document.body.appendChild(ele);\n if (tx.match("loop")) { looping(this.id) }\n if (tx.match("tabs")) { tabsing(this.id) } \n if (tx.match("theme")) { blocing(this.id) } \n if (tx.match("todolist")) { todoing(this.id) } \n if (tx.match("slider")) { sliding(this.id) } \n  if (tx.match("@bind")) { binding(this.id) } \n   }\n});\n\n',
	'ini: function () {\n var ele = document.createElement("div"); ele.id = this.id; var tx = `$1`; ele.innerHTML += tx; document.body.appendChild(ele);\n if (tx.match("loop")) { looping(this.id) }\n  }\n',
	// MOLECULES
	'var $1 = O.extend({\n id: "$1",\n ini: function () {\n var ele = document.createElement("div"); ele.id = this.id; document.getElementsByTagName("organism")[0].appendChild(ele);\n var arr = [$3];\n for (var key in arr) { \n  var nn = new window[arr[key]](); \n document.getElementById(ele.id).appendChild(document.getElementById(arr[key]));} \n }\n});\n $4 \n',
	'var $2 = O.extend({\n id: "$2",\n ini: function () {\n var ele = document.createElement("div"); ele.id = this.id; document.body.appendChild(ele);\n var arr = [$3];\n for (var key in arr) { \n var nn = new window[arr[key]](); \ndocument.getElementById(ele.id).appendChild(document.getElementById(arr[key]));} \n }\n\n}); \n',
	'`+$1+`'
	];
	

exports.regcss = [
	/@([\s\S]*?) '([\s\S]*?)';/gi,
	/(bgcol) ([\s\S]*?);/gi,
	/(color) ([\s\S]*?);/gi,
	/(padd) ([\s\S]*?);/gi,
	/(paddL) ([\s\S]*?);/gi,
	/(paddR) ([\s\S]*?);/gi,
	/(paddT) ([\s\S]*?);/gi,
	/(paddB) ([\s\S]*?);/gi,
	/(pos) ([\s\S]*?);/gi,
	/(trans) ([\s\S]*?);/gi,
	/\$([\s\S]*?)\$/gi,
	/gradient linear vertical ([\s\S]*?) ([\s\S]*?);/gi,
	/gradient linear horizontal ([\s\S]*?) ([\s\S]*?);/gi,
	/gradient radial ([\s\S]*?) ([\s\S]*?);/gi,
	/gradient diagonal left ([\s\S]*?) ([\s\S]*?);/gi,
	/gradient diagonal right ([\s\S]*?) ([\s\S]*?);/gi,
	/(@@)([\s\S]*?)( |){([\s\S]*?)}/gi,
	/(@@)([\s\S]*?):hover( |){([\s\S]*?)}/gi,
	/(@)([\s\S]*?)( |){([\s\S]*?)}/gi,
	/(@)([\s\S]*?):hover( |){([\s\S]*?)}/gi,
	/bundle{ '([\s\S]*?)'([\s\S]*?)}/gi
];
exports.replcss = [
	'var $1 = "$2";',
	'background-color: $2;',
	'color: $2;',
	'padding: $2;',
	'padding-left: $2;',
	'padding-right: $2;',
	'padding-top: $2;',
	'padding-bottom: $2;',
	'position: $2;',
	'transition: $2;',
	'\`+$1+\`',
	'background: $1; /* Old browsers */background: -moz-linear-gradient(top, $1 0%, $2 100%); /* FF3.6+ */background: -webkit-linear-gradient(top, $1 0%,$2 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top, $1 0%,$2 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top, $1 0%,$2 100%); /* IE10+ */background: linear-gradient(to bottom, $1 0%,$2 100%); /* W3C */',
	'background: rgb(205,235,142); /* Old browsers */background: -moz-linear-gradient(left, $1 0%, $2 100%); /* FF3.6+ */background: -webkit-linear-gradient(left, $1 0%,$2 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(left, $1 0%,$2 100%); /* Opera 11.10+ */background: -ms-linear-gradient(left, $1 0%,$2 100%); /* IE10+ */background: linear-gradient(to right, $1 0%,$2 100%); /* W3C */',
	'background: rgb(205,235,142); /* Old browsers */background: -moz-radial-gradient(center, ellipse cover, $1 0%, $2 100%); /* FF3.6+ */background: -webkit-radial-gradient(center, ellipse cover, $1 0%,$2 100%); /* Chrome10+,Safari5.1+ */background: -o-radial-gradient(center, ellipse cover, $1 0%,$2 100%); /* Opera 12+ */background: -ms-radial-gradient(center, ellipse cover, $1 0%,$2 100%); /* IE10+ */background: radial-gradient(ellipse at center, $1 0%,$2 100%); /* W3C */',
	'background: rgb(205,235,142); /* Old browsers */background: -moz-linear-gradient(-45deg, $1 0%, $2 100%); /* FF3.6+ */background: -webkit-linear-gradient(-45deg, $1 0%,$2 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(-45deg, $1 0%,$2 100%); /* Opera 11.10+ */background: -ms-linear-gradient(-45deg, $1 0%,$2 100%); /* IE10+ */background: linear-gradient(135deg, $1 0%,$2 100%); /* W3C */',
	'background: rgb(205,235,142); /* Old browsers */background: -moz-linear-gradient(45deg, $1 0%, $2 100%); /* FF3.6+ */background: -webkit-linear-gradient(45deg, $1 0%,$2 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(45deg, $1 0%,$2 100%); /* Opera 11.10+ */background: -ms-linear-gradient(45deg, $1 0%,$2 100%); /* IE10+ */background: linear-gradient(45deg, $1 0%,$2 100%); /* W3C */',
	'styler.innerHTML += `.$2{ $4 }`;',
	'styler.innerHTML += `.$2:hover{ $4 }`;',
	'styler.innerHTML += `#$2{ $4 }`;',
	'styler.innerHTML += `#$2:hover{ $4 }`;',
	'function $1 () {\n return \`$2\` \n}'
];


exports.regelec = [
	/open{([\s\S]*?)}/gi
];

exports.replelec = [
	'document.body.onlad = function () {\n $1 \n}'
];