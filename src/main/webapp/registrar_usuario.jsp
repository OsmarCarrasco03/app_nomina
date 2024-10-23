<%@ include file="common/header-sesion.jsp"%>

<title>Registrar Usuario</title>
<%@ include file = "common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div
	class="container rounded div-padding input-color div-separacion-mediana div-separacion-debajo">
	<div class="text-center espacio-titulo ">

		<div>
			<h3>REGISTRAR USUARIO</h3>
		</div>

		<div class="justify-content-md-center ui-widget">

			<input style="WIDTH: 700px; HEIGHT: 30px" size=32 id="autoComplete"
				type="search" dir="ltr" spellcheck=false autocorrect="off"
				autocomplete="off" autocapitalize="off">

			<button type="button" class="btn btn-primary"
				onclick="buscarPersona()">Buscar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
		</div>
		
		<br>
		
		<div class="row justify-content-md-center div-separacion-debajo">
		
			<div class="col-5">
				<p class="text-start espacio-inputs"><b>Empleado</b><span class="red-asterisk">*</span></p>
				<input type="text" class="form-control" id="nombreEmpleado" disabled />
			</div>
		</div>

		<!-- Primera Secci�n -->
		<div class="text-center">
			<form id="formulario">
				<br>
				
				<input type="hidden" class="form-control" id="idPersona" disabled />

				<div class="row justify-content-md-center div-separacion-debajo">

					<font color="#cb0c0c"> DATOS GENERALES . </font>
					<hr>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Alias de Usuario</b>
						<span class="red-asterisk">*</span></p>
						<input type="text" class="form-control" id="usu_alias" disabled/>
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Nombre de Usuario</b>
						<span class="red-asterisk">*</span></p>
						<input type="text" class="form-control" id="usu_usuario" disabled />
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Contraseña</b>
						<span class="red-asterisk">*</span></p>
						<input type="password" class="form-control" id="password" disabled />
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Confirmar contraseña</b>
						<span class="red-asterisk">*</span></p>
						<input type="password" class="form-control" id="confirmar_password" disabled />
					</div>
				</div>

				<div class="row justify-content-md-center div-separacion-debajo">

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Rol de Usuario</b>
						<span class="red-asterisk">*</span></p>
						<select class="form-select"
							id="usu_administrador" aria-label="Default select example" disabled >
							<option value="" disabled>Seleccionar...</option>
							<option value="1">Administrador</option>
							<option value="2">Usuario</option>
						</select>
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Situación</b>
						<span class="red-asterisk">*</span></p>
						<select class="form-select"
							id="usu_situacion" aria-label="Default select example" disabled >
							<option value="" disabled>Seleccionar...</option>
							<option value="1">Activo</option>
							<option value="0">Inactivo</option>
						</select>
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Fecha de Inicio</b>
						<span class="red-asterisk">*</span></p>
						<input type="date" class="form-control" id="usu_fechainicio" disabled />
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Fecha de Término</b></p>
						<input type="date" class="form-control" id="usu_fechatermino" disabled />
					</div>
				</div>

			</form>
		</div>

		<div class="text-center justify-content-md-center div-separacion-md1">
			<button type="button" class="btn btn-success" id="botonRegistrar"
				onclick="RegistrarUsuario()" disabled>Registrar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
					<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
					<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
				</svg>
			</button>
			<button type="button" class="btn btn-danger" id="botonLimpiarCaptura"
				onclick="LimpiarCaptura()" disabled>Cancelar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
				</svg>
			</button>
		</div>
	</div>
</div>

<script src="js/registrar_usuario.js"></script>
<%@ include file = "common/footer.jsp" %>
