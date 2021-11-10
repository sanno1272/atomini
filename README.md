# atom



**CONTEXT**
- OS => windows
- node V10.19.0

- Launch on cmd => node serveur.js
- browser => localhost:8080


----------
VERSION : 0.1.0
----------

Principles of this small framework is based on atomic design concept by Brad Frost.
the architecture is a SPA (single page application) principle which injected in a single dom element, called **organism**.

- parent container is **organism**
- orgnanism is designed with **molecules**
- the molecules contains **atoms**
- the interaction is made with **electrons**
- the css is a owner pre-processor **like**.

repo structure is angular 2+ like.

for comprehension :
- **organism** => container in which is injected the apps
- **molecules** => structure of the apps contains atoms
- **atoms** => html vue
- **electrons** => javascript functions
- **acss** => css pre-processor like 

----------

each apps are divided in a repo with four files (molecule, atom, electron, acss)
the code structure for the files is :
- The index is generated with nodejs which contains the HTML body, the framework, and the organism
- <b>MOLECULE</b> file structure itself and the atoms :

{ 'home'

	molecules{
	
		'nav',
	}
	
	@@nav{
	
		'head',
		'logo',
		'menu'
		
	}
	
}

so there is the home organism :
with molecules defined, in the example => nav
and the nav molecule => '@@nav' wrapping the atoms, => head, logo, etc ... 
This is the structure construction of the app

----------

- <b>ATOM</b> file contain the HTML vue :

@head{

	<div>
		Lorem Ipsum dolor set amet consectur coercis ut humanum <br>
		est jacta Lorem Ipsum dolor @{cesar} set amet consectur <br>
		coercis ut humanum est jacta  
	</div>
}

@logo{

<temp>
	
	<div>logo</div>
	
	<div @bind="$tutu$"></div>
	
	<loop ele="ul" for="dataa">
	
		<li>$key.nom$</li>
		
	</loop>
	
</temp>

}

@menu{

<temp>
	
	<loop ele="ul" for="dataa">
		
		<li>$key.nom$</li>
		
	</loop>
	
</temp>

}

----------

- <b>ELECTRON</b> file contains the javascript script :

var foo = "hello";

function hello () { 

	console.log(foo);

}

etc...

----------

- <b>ACSS</b> file contains the css :

@globalCol '#555';

@red '#ff0000';


bundle{ 'contenu'

	gradient linear horizontal #eee #bbb;
	
	color #333;
	
	padd 50px;
	
}


@nav {

	$contenu()$;
	
}


@logo{

	color #000;
	
}


@logo:hover {

	color #aaa;
	
}


// class

@@end {

	color $red$;
	
}



