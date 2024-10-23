<title>Modificar Domicilio</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="container rounded div-padding input-color div-separacion-mediana">
	
		<div class="text-center espacio-titulo">
			<h3>MODIFICAR DOMICILIO</h3>
		</div>
		
		<!-- INICIO bloque 1 input de buscar persona mas botones de buscar y habilitar busqueda -->
		
		<div class="text-center justify-content-md-center espacio-titulo ui-widget">
		    <div class="autoComplete_wrapper">
		        <input id="inpBuscar" class="resaltar-buscador" type="search" dir="ltr" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off">
		    </div>
		    <button id="btnBuscar" type="button" class="btn btn-primary">Buscar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
		</div>
		
		<br>

		<div class="row justify-content-md-center text-center">
			<div class="col-4">
				<label><b>CURP</b></label> <input id="inpCurp" type="text" class="form-control text-center" disabled>
			</div>

			<div class="col-6">
				<label><b>Nombre(s)</b></label> <input id="inpNombre" type="text" class="form-control text-center" disabled>
			</div>
		</div>

		<!-- FIN bloque 1 input de buscar persona mas botones de buscar y habilitar busqueda -->
		
		<br>
		<div class="color-hr text-center separacion-pequeña">
			<h5>DATOS GENERALES</h5>
		</div>
		
		<!-- INICIO bloque 2 inputs para el registro de domicilio -->
		
		<div>
			<div class="row justify-content-md-center">
		
				<div class="col-4 separacion-pequeña">
					<b>Estado<span class="required-field">*</span></b>
						<select id="inpEstado" class="form-select" onchange="verificarEstado()" disabled></select>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Municipio<span class="required-field">*</span></b>
						<select id="inpMunicipio" class="form-select" onchange="verificarMunicipio()" disabled></select>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Colonia<span class="required-field">*</span></b> 
						<input id="inpColonia" class="form-control" type="text" disabled>
				</div>
			
			</div>
			
			<div class="row justify-content-md-center">
		
				<div class="col-4 separacion-pequeña">
					<b>Código Postal<span class="required-field">*</span></b> 
						<input id="inpCodigoPostal" class="form-control" type="text" oninput="validarCodigoPostal(this)" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Calle<span class="required-field">*</span></b> 
						<input id="inpCalle" class="form-control" type="text" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Número Exterior</b> 
						<input id="inpNumeroExterior" class="form-control" type="text" disabled>
				</div>
			
			</div>
			
			<div class="row justify-content-md-center">
		
				<div class="col-4 separacion-pequeña">
					<b>Número Interior</b> 
						<input id="inpNumeroInterior" class="form-control" type="text" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Teléfono Particular<span class="required-field">*</span></b> 
						<input id="inpTelefono" class="form-control" type="text" oninput="validarTelefono(this)" disabled>
				</div>
			
			</div>
		</div>
		
		<!-- FIN bloque 2 inputs para el registro de domicilio -->

	<div id="datosControlSeccion" hidden>
		<br>
		<div class="color-hr text-center separacion-pequeña">
			<h5>DATOS DE CONTROL</h5>
		</div>
		
		<!-- INICIO bloque 3 inputs para los datos de control -->
		
		<div>
			<div class="row justify-content-md-center"> 
				
				<div class="col-4 separacion-pequeña">
					<b>Fecha Inicio</b> 
						<input id="inpFechaInicio" class="form-control text-center" type="text" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Fecha Término</b> 
						<input id="inpFechaTermino" class="form-control text-center" type="text" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Usuario que Capturó</b> 
						<input id="inpUsuarioCapturo" class="form-control text-center" type="text" disabled>
				</div>
			
			</div>
			
			<div class="row justify-content-md-center">
				
				<div class="col-4 separacion-pequeña">
					<b>Fecha de Modificación</b> 
						<input id="inpFechaModificacion" class="form-control text-center" type="text" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Usuario que Modificó</b> 
						<input id="inpUsuarioModifico" class="form-control text-center" type="text" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Situación</b> 
						<input id="inpSituacion" class="form-control text-center" type="text" disabled>
				</div>
			
			</div>
		</div>
	</div>
		<!-- FIN bloque 3 inputs para los datos de control -->
		
		<div class="text-center justify-content-md-center espacio-titulo ui-widget">
		
			<button id="btnCancelar" class="btn btn-danger" type="submit" disabled
			onclick="cancelar()" disabled>Cancelar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
					<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
				</svg>
			</button>
			<button id="btnGuardarCambios" class="btn btn-success" type="submit" disabled
			onclick="">Guardar Cambios
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
					<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
					<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
			  	</svg>
			</button>
		
		</div><br>
	
	</div>

<script src="js/footer.js"></script>
<script src="js/modificar_domicilio.js"></script>
<%@ include file="common/footer.jsp"%>