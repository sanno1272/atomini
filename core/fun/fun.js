
function elId (el) {
	return document.getElementById(el);
}

function elClass (el) {
	return document.getElementsByClassName(el);
}

function toggleClass (el,cl) {
	return el.className = (el.className === cl || '') ? '':cl;
}

function toggleColor (el,cl) {
	return el.style.color = (el.style.color===cl || '') ? '':cl;
}

function create (tag,i,ob) {
	var t = document.createElement(tag);
	t.id = 'div-'+i;
	if (ob.className) t.className = ob.className;
	t.innerHTML = ob.html;
	elId(i).appendChild(t);
	
	try { ob.call(); } catch (e) {}
	//try { ob.className; } catch (e) {}
}

function click (el, c) {
	return (el.onclick = c);
}