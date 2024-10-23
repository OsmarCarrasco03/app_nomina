<%@ include file="common/header-sesion.jsp"%>
<title>Modificar Usuario</title>
<%@ include file = "common/nav.jsp" %>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<div
	class="container rounded div-padding input-color div-separacion-mediana div-separacion-debajo">
	<div class="text-center espacio-titulo ">

		<div>
			<h3>Modificar Usuario</h3>
		</div>

		<div class="justify-content-md-center ui-widget">

			<input style="WIDTH: 700px; HEIGHT: 30px" size=32 id="autoComplete"
				type="search" dir="ltr" spellcheck=false autocorrect="off"
				autocomplete="off" autocapitalize="off">

			<button type="button" class="btn btn-primary"
				onclick="buscarUsuario()">Buscar
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
				
				<input type="hidden" class="form-control" id="usu_id" />

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
					
					<div id="div_mostrar_rol" class="col-3">
						<p class="text-start espacio-inputs"><b>Rol de Usuario</b>
						<span class="red-asterisk">*</span></p>
						<input type="text" class="form-control" id="mostrar_rol" disabled/>
					</div>
					
					<div id="select_usu_administrador" class="col-3" hidden>
						<p class="text-start espacio-inputs"><b>Rol de Usuario</b>
						<span class="red-asterisk">*</span></p>
						<select class="form-select"
							id="usu_administrador" aria-label="Default select example" disabled >
							<option value="" disabled>Seleccionar...</option>
							<option value="1">Administrador</option>
							<option value="2">Usuario</option>
						</select>
					</div>
					
					<div id="div_mostrar_situacion" class="col-3">
						<p class="text-start espacio-inputs"><b>Situación</b>
						<span class="red-asterisk">*</span></p>
						<input type="text" class="form-control" id="mostrar_situacion" disabled/>
					</div>
					
					<div id="select_usu_situacion" class="col-3" hidden>
						<p class="text-start espacio-inputs"><b>Situación</b>
						<span class="red-asterisk">*</span></p>
						<select class="form-select"
							id="usu_situacion" aria-label="Default select example" disabled >
							<option value="" disabled>Seleccionar...</option>
							<option value="1">Activo</option>
							<option value="0">Inactivo</option>
						</select>
					</div>

					<div id="div_usu_fechainicio" class="col-3" hidden>
						<p class="text-start espacio-inputs"><b>Fecha de Inicio</b>
						<span class="red-asterisk">*</span></p>
						<input type="date" class="form-control" id="usu_fechainicio" disabled />
					</div>

					<div id="div_usu_fechatermino" class="col-3" hidden>
						<p class="text-start espacio-inputs"><b>Fecha de Término</b></p>
						<input type="date" class="form-control" id="usu_fechatermino" disabled />
					</div>
				</div>

			</form>
		</div>

		<div class="text-center justify-content-md-center div-separacion-md1">
			<button type="button" class="btn btn-success" id="botonActualizar"
				disabled onclick="actualizarUsuario()">Actualizar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
					<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
					<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
				</svg>
			</button>
			<button type="button" class="btn btn-warning" id="botonModificar"
				disabled onclick="HabilitarInputs()">Modificar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
				</svg>
			</button>
			<button type="button" class="btn btn-danger" id="botonLimpiarCaptura"
				disabled onclick="LimpiarCaptura()">Cancelar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
				</svg>
			</button>
		</div>
	</div>
</div>

<div id="datosControl" class="container text-center div-separacion-debajo" hidden>
	<form id="datosDeControl">
		<div class="text-center espacio-titulo ">
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
				<input class="form-control" type="date" id="fechainicioUno" disabled>
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
				<input class="form-control" id="fechaTerminoVacia" 
					type="text" value="N/A" disabled>
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
	<br><br>
</div>

<script src="js/modificar_usuario.js"></script>
<%@ include file = "common/footer.jsp" %>
