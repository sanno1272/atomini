# atom

- Launch => node serveur_img.js
- browser => localhost:8080


----------
principles of the framework is based on atomic design concept.
the architecture is a SPA (single page application) principle.

- parent container is organism
- orgnanism is designed with molecules
- the molecules contains atoms
- the interaction is made with electrons
- the css is a owner pre-processor like.

repo structure is angular like.

for comprehension :
- organism => container in which is injected the apps
- molecules => structure of the apps contains atoms
- atoms => html vue
- electrons => javascript functions
- acss => css pre-processor like 

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



- <b>ELECTRON</b> file contains the javascript script :

var foo = "hello";

function hello () { 

	console.log(foo);

}

etc...

