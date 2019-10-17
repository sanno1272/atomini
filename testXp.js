exports.funk = `

	function looping (cont) {
		var tx = document.getElementById(cont).innerHTML;
		
		tx = tx.replace(/([\\s\\S]*?)\\<(loop) ele="(div|ul)" for="([\\s\\S]*?)"\\>([\\s\\S]*?)\\<\\/(loop)\\>([\\s\\S]*?)(\\<\\/temp\\>)/gi,'(function looping$3 (data)  {var el$3 = document.createElement("section");  var dat=data; var loo$3 = document.createElement("$3"); loo$3.id = "loop-\'+cont+\'"; loo$3.setAttribute("for","$4"); var debut$3 = \`$1\`;  var fin$3 = \`$7\`;  var co$3 = \`\`; for (key in dat) { co$3 += \`$5\`; } loo$3.innerHTML += co$3; el$3.innerHTML+= debut$3;  el$3.appendChild(loo$3);  el$3.innerHTML+= fin$3; document.getElementById("'+cont+'").appendChild(el$3); if (debut$3.match("@refresh")) { document.getElementById("refresh-$4").onmousedown = function (ev) { numer++; ev.preventDefault();  var rg = new RegExp(/[a-zA-Z]/); if (rg.test(document.getElementById("input-$4").value) === true) {  $4.push({n: document.getElementById("input-$4").value, num: numer}); } else { } document.getElementById(loo$3.id).innerHTML = "";  for (key in $4) { document.getElementById(loo$3.id).innerHTML += \`$5\` } }  }  })($4)');
		tx = tx.replace(/(\\<temp\\>)/gi,'');
		tx = tx.replace(/(\\<\\/temp\\>)/gi,'');
		tx = tx.replace(/\\$key.([\\s\\S]*?)\\$/gi,'\`+dat[key].$1+\`');
		
		var sc = document.createElement("script");
		sc.innerHTML = tx;
		document.getElementById(cont).innerHTML = '';
		document.getElementById(cont).appendChild(sc);
	}

	
	function sliding (cont) {
		var tx = document.getElementById(cont).innerHTML;
		
		tx = tx.replace(/([\\s\\S]*?)\\<(slider) for="([\\s\\S]*?)"\\>([\\s\\S]*?)\\<\\/(slider)\\>([\\s\\S]*?)(\\<\\/temp\\>)/gi,'(function looping$3 (data)  {var el$3 = document.createElement("section");  var dat=data; var loo$3 = document.createElement("div");loo$3.id = "slider-\'+cont+\'"; loo$3.setAttribute("for","$3");with (loo$3.style) {position = "relative";display = "block";overflow = "hidden";opacity = "1";width = wid+"%";}	var debut$3 = \`$1\`;  var fin$3 = \`$6\`;  var wid= 100;var wra = document.createElement("sliderWrap");wra.id = "wrap-\'+cont+\'";with (wra.style) {position = "relative";display = "block";width = Math.round((wid*dat.length)) +"%";left = "0px";} var slideNav = document.createElement("div"); slideNav.id = "slideNav$3"; with (slideNav.style) { height = "30px";padding = "0px";width = Math.round((dat.length*100)/1.9) + "px";position = "relative";display = "block";margin = "auto auto";padding = "10px 0px";}var cld = document.createElement("div"); cld.style.clear = "both"; for (key in dat) { wra.innerHTML += \`<div style="left:0px;position:relative;float:left;width:\`+(100/dat.length)+\`%;" id="tab$3\`+key+\`">$4</div>\`; } for (var i=0; i<dat.length; i++) { slideNav.innerHTML += \`<div style="position:relative;cursor:pointer;background-color:#eee;float:left;width:40px;padding:5px;text-align:center;margin-right:2px;" id="liTab$3\`+i+\`" onclick=moveSlide("wrap-\'+cont+\'","\`+Math.round(wid*i)+\`")>\`+(i+1)+\`</div>\` }loo$3.appendChild(wra); el$3.innerHTML+= debut$3;  el$3.appendChild(loo$3);el$3.appendChild(cld);el$3.appendChild(slideNav); el$3.innerHTML+= fin$3; document.getElementById("'+cont+'").appendChild(el$3);  })($3); /* document.getElementById("liTab$30").setAttribute("class","tabActive"); */');
		tx = tx.replace(/(\\<temp\\>)/gi,'');
		tx = tx.replace(/(\\<\\/temp\\>)/gi,'');
		tx = tx.replace(/\\$key.([\\s\\S]*?)\\$/gi,'\`+dat[key].$1+\`');
		
		var sc = document.createElement("script");
		sc.innerHTML = tx;
		document.getElementById(cont).innerHTML = '';
		document.getElementById(cont).appendChild(sc);
	}
	
	function moveSlide (el,pos) {
		var tt = document.getElementById(el);
			  tt.style.left = '-'+pos+'%';
	}
	
	
	function tabsing (cont) {
		var tx = document.getElementById(cont).innerHTML;
		
		tx = tx.replace(/([\\s\\S]*?)\\<(tabs) for="([\\s\\S]*?)"\\>([\\s\\S]*?)\\<\\/(tabs)\\>([\\s\\S]*?)(\\<\\/temp\\>)/gi,'(function looping$3 (data)  {var el$3 = document.createElement("section");  var dat=data; var loo$3 = document.createElement("div");loo$3.id = "loop-\'+cont+\'"; loo$3.setAttribute("for","$3"); var tabsNav = document.createElement("ul"); tabsNav.id = "tabsUl$3"; with (tabsNav.style) { marginLeft = "-40px"; listStyleType = "none"; marginTop = "1px"; }for (var key in dat) { tabsNav.innerHTML += \`<li id="liTab$3\`+key+\`" style="float:left;" onclick=showTab("tab$3\`+key+\`","$3")>\`+dat[key].label;+\`</li>\` }\\n loo$3.appendChild(tabsNav); \\n var debut$3 = \`$1\`;  var fin$3 = \`$6\`;  var co$3 = document.createElement("div"); co$3.id = "tabContent$3"; co$3.style.display = "block"; co$3.style.clear = "both"; for (key in dat) { co$3.innerHTML += \`<div id="tab$3\`+key+\`" style="float:left;display:none;">$4</div>\`; } loo$3.appendChild(co$3); var cld = document.createElement("div"); cld.style.clear = "both"; loo$3.appendChild(cld); el$3.innerHTML+= debut$3;  el$3.appendChild(loo$3);  el$3.innerHTML+= fin$3; document.getElementById("'+cont+'").appendChild(el$3);  })($3); document.getElementById("tab$30").style.display = "block"; document.getElementById("liTab$30").setAttribute("class","tabActive");');
		tx = tx.replace(/(\\<temp\\>)/gi,'');
		tx = tx.replace(/(\\<\\/temp\\>)/gi,'');
		tx = tx.replace(/\\$key.([\\s\\S]*?)\\$/gi,'\`+dat[key].$1+\`');
		
		var sc = document.createElement("script");
		sc.innerHTML = tx;
		document.getElementById(cont).innerHTML = '';
		document.getElementById(cont).appendChild(sc);
	}

	function showTab (el,dat) {
		for (var i=0; i<window[dat].length; i++) {
			document.getElementById("tab"+dat+i+"").style.display = "none";
		}
		document.getElementById(el).style.display = "block";
	}

	
	function blocing (cont) {
		var tx = document.getElementById(cont).innerHTML;
		
		tx = tx.replace(/([\\s\\S]*?)\\<(blocs) theme="([\\s\\S]*?)" line="([\\s\\S]*?)" for="([\\s\\S]*?)"\\>([\\s\\S]*?)\\<\\/(blocs)\\>([\\s\\S]*?)(\\<\\/temp\\>)/gi,'(function blocing$5 (data)  { var dat = data; var el$5 = document.createElement("section"); var div$5 = document.createElement("div"); for (var key in dat) { var di = document.createElement("div"); with (di.style) { position = "relative"; float = "left"; width = 100/$4+"%"; }\\n di.innerHTML += "<div>"+dat[key].img+"</div><div>"+dat[key].txt+"</div>"; div$5.appendChild(di); } var clea = document.createElement("div"); clea.style.clear = "both"; div$5.appendChild(clea);  el$5.appendChild(div$5); document.getElementById("'+cont+'").appendChild(el$5); })($5)');
		tx = tx.replace(/(\\<temp\\>)/gi,'');
		tx = tx.replace(/(\\<\\/temp\\>)/gi,'');
		tx = tx.replace(/\\$key.([\\s\\S]*?)\\$/gi,'\`+dat[key].$1+\`');
		
		var sc = document.createElement("script");
		sc.innerHTML = tx;
		document.getElementById(cont).innerHTML = '';
		document.getElementById(cont).appendChild(sc);
	}
	
	
	function todoing (cont) {
		var tx = document.getElementById(cont).innerHTML;
		
		tx = tx.replace(/([\\s\\S]*?)\\<(todolist) value="([\\s\\S]*?)"\\>([\\s\\S]*?)\\<\\/(todolist)\\>/gi,'(function todoing$2 ()  {var conty = document.getElementById("'+cont+'"); var todoin = document.createElement("input"); var deb = \`$1\`; conty.innerHTML+= deb; conty.appendChild(todoin); todoin.id = "todoin";var bout = document.createElement("button");bout.id = "boutTodo"; bout.innerHTML = "$3"; conty.appendChild(bout); var ul = document.createElement("ul");conty.appendChild(ul);  bout.onclick = function () {var tx = todoin.value;	var li = document.createElement("li");	li.innerHTML = tx;	var del = document.createElement("span");	del.innerHTML = "[x]";	del.addEventListener("click",function () { remove(li); },false);	li.appendChild(del);	ul.appendChild(li);}\\n  function remove (el) { ul.removeChild(el)}})()');
		tx = tx.replace(/(\\<temp\\>)/gi,'');
		tx = tx.replace(/(\\<\\/temp\\>)/gi,'');
		tx = tx.replace(/\\$key.([\\s\\S]*?)\\$/gi,'\`+dat[key].$1+\`');
		var sc = document.createElement("script");
		sc.innerHTML = tx;
		document.getElementById(cont).innerHTML = '';
		document.getElementById(cont).appendChild(sc);
	}
	
	
	function binding (cont) {var tx = document.getElementById(cont).innerHTML;tx = tx.replace(/\\$([\\s\\S]*?)\\$/gi,'$1');document.getElementById(cont).innerHTML = tx;var sc = document.createElement("script");var scr = \`if (document.getElementById("\`+cont+\`").children[1].tagName == "SECTION") {for (var i=0; i<document.getElementById("\`+cont+\`").children[1].children.length; i++) {if (document.getElementById("\`+cont+\`").children[1].children[i].getAttribute("@bind")) {document.getElementById("\`+cont+\`").children[1].children[i].innerHTML = window[document.getElementById("\`+cont+\`").children[1].children[i].getAttribute("@bind")];}}}else {for (var i=0; i<document.getElementById("\`+cont+\`").children[0].children.length; i++) {if (document.getElementById("\`+cont+\`").children[i].getAttribute("@bind")) {document.getElementById("\`+cont+\`").children[i].innerHTML = window[document.getElementById("\`+cont+\`").children[i].getAttribute("@bind")];}}}\`; sc.innerHTML = scr; document.getElementById(cont).appendChild(sc);}
	

	var elem = ['div','span','p','a','ul','li','input'];
	var evAn = ['click','over','mouseover','mouseout','mousedown','mouseup','mouseenter','mouseleave'];
	var even = ['onclick','onmouseover','onmouseout','onmousedown','onmouseup','onmouseenter','onmouseleave'];
	
	
		document.body.onload = function () {
			
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
			
		function eventingClick () {
			for (var i=0; i<1000; i++) {
				for (var j=0; j<elem.length; j++) {
					var el = document.getElementsByTagName(elem[j]);
					if (typeof el[i] !== 'undefined') {
						if (el[i].getAttribute('@click')) {
							el[i].setAttribute('onclick',el[i].getAttribute('@click'));
							//el[i].removeAttribute('@click');
						}
					}
				}
			}
		}
		
		function eventingOver () {
			for (var i=0; i<1000; i++) {
				for (var j=0; j<elem.length; j++) {
					var el = document.getElementsByTagName(elem[j]);
					if (typeof el[i] !== 'undefined') {
						if (el[i].getAttribute('@over')) {
							el[i].setAttribute('onmouseover',el[i].getAttribute('@over'));
							el[i].removeAttribute('@over');
						}
					}
				}
			}
		}
		
		function eventingOut () {
			for (var i=0; i<1000; i++) {
				for (var j=0; j<elem.length; j++) {
					var el = document.getElementsByTagName(elem[j]);
					if (typeof el[i] !== 'undefined') {
						if (el[i].getAttribute('@out')) {
							el[i].setAttribute('onmouseout',el[i].getAttribute('@out'));
							el[i].removeAttribute('@out');
						}
					}
				}
			}
		}
			eventingClick();
			eventingOver();
			eventingOut();
			bindingg();
	}


`;
















