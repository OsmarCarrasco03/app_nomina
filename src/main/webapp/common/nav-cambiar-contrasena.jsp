<%@ page contentType="text/html; charset=UTF-8"%>

<nav id="navbar" class="navbar navbar-expand-lg navbar-dark sticky-top"
	aria-label="Main navigation">
	<div class="container">
		<a href="index" class="navbar-brand"> <img src="img/logo.png"
			class="img-fluid" alt="financiera">
		</a>

		<h2 id="titulo-nomina" class="titulo-nomina">Nómina</h2>

		<button class="navbar-toggler p-0 border-0" type="button"
			data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault"
			aria-controls="navbarsExampleDefault" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarsExampleDefault">
			<ul id="nav-dinamico" class="navbar-nav ms-auto navbar-nav-scroll">
				<li class="nav-item"><a class="nav-link active" href="#" 
				onclick="cerrarSesion()">Cerrar Sesión</a></li>
			</ul>
		</div>
	</div>
</nav>