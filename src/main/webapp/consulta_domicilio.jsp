<title>Consultar Domicilio</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="container rounded div-padding input-color div-separacion-mediana">
	
		<div class="text-center espacio-titulo">
			<h3>CONSULTAR DOMICILIO</h3>
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

		<!-- FIN bloque 1 input de buscar persona mas botones de buscar y habilitar busqueda -->
		
		<br>
		<div class="color-hr text-center separacion-pequeña">
			<h5>DATOS GENERALES</h5>
		</div>
		
		<!-- INICIO bloque 2 inputs para el registro de domicilio -->
		
		<div>
			
			<div class="row justify-content-md-center">
				<div class="col-4 separacion-pequeña">
					<label><b>CURP</b></label> <input id="inpCurp" type="text" class="form-control" disabled>
				</div>
	
				<div class="col-6 separacion-pequeña">
					<label><b>Nombre(s)</b></label> <input id="inpNombre" type="text" class="form-control" disabled>
				</div>
				
			</div>
			
			<div class="row justify-content-md-center">
		
				<div class="col-4 separacion-pequeña">
					<b>Estado</b>
						<input id="inpEstado" class="form-control" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Municipio</b>
						<input id="inpMunicipio" class="form-control" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Colonia</b> 
						<input id="inpColonia" class="form-control" type="text" disabled>
				</div>
			
			</div>
			
			<div class="row justify-content-md-center">
			
				<div class="col-4 separacion-pequeña">
					<b>Código Postal</b> 
						<input id="inpCodigoPostal" class="form-control" type="text" oninput="validarCodigoPostal(this)" disabled>
				</div>
				
				<div class="col-4 separacion-pequeña">
					<b>Calle</b> 
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
					<b>Teléfono Particular</b> 
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
			<br><br><br>
		</div>
	</div>
		<!-- FIN bloque 3 inputs para los datos de control -->
			
	</div>

<script src="js/footer.js"></script>
<script src="js/consulta_domicilio.js"></script>
<%@ include file="common/footer.jsp"%>