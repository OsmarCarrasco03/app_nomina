<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<link rel="stylesheet" href="css/arbol.css">

<div
	class="container rounded div-padding input-color div-separacion-mediana div-separacion-debajo">
	<div class="text-center espacio-titulo">
		<div>
			<h3>ASIGNAR MODULOS</h3>
		</div>

		<div class="justify-content-md-center ui-widget">

			<input style="WIDTH: 700px; HEIGHT: 30px" size=32 id="autoComplete"
				type="search" dir="ltr" spellcheck=false autocorrect="off"
				autocomplete="off" autocapitalize="off">
			
			
			<button type="button" class="btn btn-primary"
				onclick="buscarUsuario()" >Buscar 
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
		</div>
		<br>
	</div>

	<div class="text-center">
		<form id="formulario">
			<br> <input type="hidden" class="form-control" id="idPersona"
				disabled />

			<div class="row justify-content-md-center div-separacion-debajo">

				<font color="#cb0c0c"> DATOS GENERALES . </font>
				<hr>

				<div class="col-3">
					<p class="text-start espacio-inputs">
						<b>Alias de Usuario</b>
					</p>
					<input type="text" class="form-control" id="usu_alias" disabled />
				</div>

				<div class="col-3">
					<p class="text-start espacio-inputs">
						<b>Nombre de Usuario</b>
					</p>
					<input type="text" class="form-control" id="usu_usuario" disabled />
				</div>

				<div class="col-3">
					<p class="text-start espacio-inputs">
						<b>Rol de Usuario</b>
					</p>
					<input type="text" class="form-control" id="usu_administrador"
						disabled />
				</div>

				<div class="col-3">
					<p class="text-start espacio-inputs">
						<b>Situación</b>
					</p>
					<input type="text" class="form-control" id="usu_situacion" disabled />
				</div>
			</div>

		</form>
	</div>

	<div class="row">
		<div class="col-2 "></div>
		<div class="col-6">
			<div class="text-start">
				<div id="checkbox-tree"></div>
			</div>
		</div>
	</div>

	<div class="text-center justify-content-md-center div-separacion-md1">
		<button type="button" class="btn btn-danger" id="botonLimpiarCaptura"
			onclick="LimpiarCaptura()" disabled class="bi bi-x-circle-fill">Limpiar Consulta
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
				<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
			</svg>
		</button>
		
	</div>

	<div id="datosControl" class="text-center" hidden>
		<form id="datosDeControl">
			<div class="text-center espacio-titulo">
				<hr>
				<div class="color-hr">
					<h6>DATOS DE CONTROL</h6>
				</div>
				<hr>
			</div>

			<div class="row div-separacion-debajo">
				<div class="col-4">
					<p class="text-start espacio-inputs">
						<b>Fecha de inicio</b>
					</p>
					<input class="form-control" type="date" id="fechainicioUno"
						disabled>
				</div>

				<div class="col-4" id="divFechaTerminoLlena">
					<p class="text-start espacio-inputs">
						<b>Fecha de termino</b>
					</p>
					<input class="form-control" type="date" id="fechaTermino" disabled>
				</div>

				<div class="col-4" id="divFechaTerminoVacia" hidden>
					<p class="text-start espacio-inputs">
						<b>Fecha de termino</b>
					</p>
					<input class="form-control" type="text" value="N/A" disabled>
				</div>

				<div class="col-4">
					<p class="text-start espacio-inputs">
						<b>Usuario que capturó</b>
					</p>
					<input class="form-control" type="text" id="usuCapturo" disabled>
				</div>
			</div>

			<div class="row">
				<div class="col-4">
					<p class="text-start espacio-inputs">
						<b>Fecha de modificación</b>
					</p>
					<input class="form-control" type="date" id="fechaCaptura" disabled>
				</div>

				<div class="col-4">
					<p class="text-start espacio-inputs">
						<b>Usuario que realizó la última modificación </b>
					</p>
					<input class="form-control" type="text" id="usuModifico" disabled>
				</div>
			</div>
		</form>
	</div>
</div>

<script src="js/AsignarModulos.js"></script>
<script src="js/footer.js"></script>
<%@ include file="common/footer.jsp"%>