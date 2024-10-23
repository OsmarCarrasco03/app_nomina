
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<div id="separadorNav"></div>

<div
	class="container div-padding input-color">
	<div class="text-center espacio-titulo">
		<h3>CONSULTA DE PUESTOS</h3>
	</div>
	<br>
	<div class="text-center justify-content-md-center ui-widget">
		
		<div class="autoComplete_wrapper">
			<input id="autoComplete" type="text" dir="ltr" spellcheck=false
				autocorrect="off" autocomplete="off" autocapitalize="off"
				size="100">

			<button type="button" class="btn btn-primary" id="seleccion"
				onclick="mostrarDatos()">Seleccionar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
		</div>
		
	</div>

	<!-- Primera Secci�n -->
	<div class="text-center div-separacion-mediana2">
		<div class="row justify-content-md-center">
			<div class="col-2">
				<p>Código del Puesto</p>
				<input type="text" id="codigoPuesto" class="form-control" disabled/>
			</div>

			<div class="col-8">
				<p>Descripción</p>
				<input type="text" id="descripcion" class="form-control" disabled/>
			</div>
			
			<div class="col-2" id="situacionDiv">
				<p>Situación</p>
				<input type="text" class="form-control" size="10"
					id="situacion" disabled/>
			</div>
			
			<!--<div class="col-2" id="seleccionarSituacionDiv" hidden>
				<p>Situación</p>
				<select class="form-select" aria-label="Default select example"
					name="seleccionarSituacion" id="seleccionarSituacion">
					<option disabled>Seleccionar...</option>
					<option value="1">Activo</option>
					<option value="0">Inactivo</option>
				</select>
			</div>-->
		</div>

		<hr>

		<div class="color-hr">
			<h6>DATOS DE CONTROL</h6>
		</div>

		<hr>

		<div class="row justify-content-md-center div-separacion-mediana2">

			<div class="col">
				<p>Usuario capturó</p>
				<input type="text" id="usuarioCapturo" class="form-control" disabled/>
			</div>

			

			<div class="col">
				<p>Fecha Inicio</p>
				<input type="text" id="fechaInicio" class="form-control" disabled />
			</div>

			<div class="col">
				<p>Fecha Término</p>
				<input type="text" id="fechaTermino" class="form-control" disabled />
			</div>
		</div>
		<div class="row justify-content-md-center div-separacion-mediana2">

			<div class="col">
				<p>Usuario modificó</p>
				<input type="text" id="usuariomodifico" class="form-control" disabled/>
			</div>

			<div class="col">
				<p>Fecha Modificación</p>
				<input type="text" id="fechaModificacion" class="form-control" disabled/>
			</div>			

		</div>
		
		<!-- <div class="row justify-content-md-center div-separacion-mediana2">
			<div class="col-4">
				<p>Situaci�n</p>
				<input type="text" class="form-control" size="10" name="datepicker2"
					id="datepicker" value="Activo" />
			</div>
		</div> -->
	<br>
		<div class="text-center justify-content-md-center div-separacion-md1">
			<!-- <button type="button" class="btn btn-success" id="habilitarInsertarPuesto"
				onclick="habilitarInsertarPuesto()"> Insertar Puesto 
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
					<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
					<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
				</svg>
			</button>

			<button type="button" class="btn btn-success" id="insertarPuesto"
				onclick="insertarPuesto()" hidden>Insertar Puesto</button>

			<button type="button" class="btn btn-warning" id="modificarPuesto"
				onclick="modificarPuesto()" disabled> Modificar 
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
				</svg>
			</button> -->

			<button type="button" class="btn btn-danger" id="LimpiarDatos"
				onclick="LimpiarDatos()" disabled>Limpiar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
				</svg>
			</button>
		</div>
	</div>
</div>
<!--<script src="js/consulta_puestos.js"></script>-->
<script src="js/puestos.js"></script>

<%@ include file="common/footer.jsp"%>