const routes = `

@{ 'routes'
	template{
		<section>
			<loop ele="ul" for="routes">
				<li onclick=actionRoute('$key.r$')>$key.r$</li>
			</loop>
		</section>
	}
}

`;



