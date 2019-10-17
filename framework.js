var fw = `
	var O = function() {
		this.ini && this.ini.apply(this, arguments)
		this.graph && this.graph.apply(this, arguments)
	}
	O.extend = function(childPrototype) { 
		var parent = this;var child = function() {
			return parent.apply(this, arguments)
		}
		child.extend = parent.extend;  
		var Surrogate = function() {};
		Surrogate.prototype = parent.prototype
		child.prototype = new Surrogate

		for(var key in childPrototype){
			child.prototype[key] = childPrototype[key]
		}
		return child
}

document.createElement('bind');
var router = document.getElementsByTagName('router')[0];
var organism = document.getElementsByTagName('organism')[0];
var styler = document.getElementsByTagName('style')[0];

function child (el) {
	return el*100;
}

// launch home
//window.location.pathname = window.location.pathname+'#/home';
function actionRoute (or) {
	//window.location.pathname = window.location.pathname+'#/'+or;
	organism.innerHTML = '';
	var newOrg = new window[or]();
	
		function bindingg () {
			for (var i=0; i<1000; i++) {
				for (var j=0; j<elem.length; j++) {
					var el = document.getElementsByTagName(elem[j]);
					if (typeof el[i] !== 'undefined') {
						if (el[i].getAttribute('@bind')) {
							//el[i].setAttribute('onclick',el[i].getAttribute('@bind'));
							el[i].innerHTML = window[el[i].getAttribute('@bind')];
							//el[i].removeAttribute('@bind');
						}
					}
				}
			}
		}
		
	//click functions
	var elem = ['div','span','p','a','ul','li','input'];
	for (var i=0; i<1000; i++) {
				for (var j=0; j<elem.length; j++) {
					var el = document.getElementsByTagName(elem[j]);
					if (typeof el[i] !== 'undefined') {
						if (el[i].getAttribute('@click')) {
							el[i].setAttribute('onclick',el[i].getAttribute('@click'));
						}
					}
				}
			}
			
	// over functions
	for (var i=0; i<1000; i++) {
			for (var j=0; j<elem.length; j++) {
				var el = document.getElementsByTagName(elem[j]);
				if (typeof el[i] !== 'undefined') {
					if (el[i].getAttribute('@over')) {
						el[i].setAttribute('onmouseover',el[i].getAttribute('@over'));
					}
				}
			}
		}
		
	// out functions
	for (var i=0; i<1000; i++) {
			for (var j=0; j<elem.length; j++) {
				var el = document.getElementsByTagName(elem[j]);
				if (typeof el[i] !== 'undefined') {
					if (el[i].getAttribute('@out')) {
						el[i].setAttribute('onmouseout',el[i].getAttribute('@out'));
					}
				}
			}
		}
	
	bindingg();
}


`;
	