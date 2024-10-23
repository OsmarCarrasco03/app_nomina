<title>Registro de Puestos</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
 
<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center espacio-titulo">
		<h3>REGISTRO DE PUESTOS</h3>
	</div>
	
	
	<div class="text-center justify-content-md-center espacio-titulo ui-widget">
		
		<div class="autoComplete_wrapper">
			<input id="autoComplete" type="search" dir="ltr" spellcheck=false
				autocorrect="off" autocomplete="off" autocapitalize="off"
				size="100">

			<button style = "margin-left: 20px;" type="button" class="btn btn-primary" id="abrirInfo" data-toggle="modal" data-target="#modalInfo"
				onclick="buscarPuesto()">Buscar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
				
			<!-- INICIO boton Servicio -->
					<button style = "margin-left: 20px;" type="button" class="btn btn-success" id="habilitarBusqueda" disabled>Habilitar B�squeda
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
							<path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
						  </svg>
					</button>
				
				<!-- FIN boton Servicio -->
		</div>
		
	</div>	

    <!-- Modal -->
   
	
	<div class="text-center div-separacion-chica">
		<div class="row justify-content-md-center">
			<div class="col-2">
				
				<label><b>Código del Puesto</b></label>
				<input type="text" id="codigoPuesto" class="form-control" disabled/>
			</div>

			<div class="col-8">
				
				<label><b>Descripción</b></label>
				<input type="text" id="descripcion" class="form-control" disabled/>
			</div>
			
			<div class="col-2" id="situacionDiv">
				
				<label><b>Situación</b></label>
				<input type="text" class="form-control" size="10" name="datepicker2"
					id="situacion" disabled/>
			</div>
	</div>
	</div>
	<div class="text-center ">
			<br>
			
			<div class="color-hr">
				<p><b>CONFIGURACIÓN DEL NUEVO PUESTO</b></p>
			</div>
			

		</div>

	<!-- Primera Sección -->
	<div class="text-center">
		<div class="row justify-content-md-center" style="margin-top: 40px">
		
			<div class="col-3">
				<label><b><span style = "color:red" > * </span>Tipo</b></label>

				<select id="Tipo" class="form-select" class="form-select is-invalid"
					aria-label="Default select example"	onchange="consultaDatosPuestos()" disabled>
				</select>
			</div>
			<div class="col-3">
				
				<label><b><span style = "color:red" > * </span>Zona</b></label>
				<select id="Zona" class="form-select"
					aria-label="Default select example"	onchange="consultaDatosPuestos()" disabled>
				</select>
				<!-- ><input type="text" class="form-control" size="10" name="datepicker2"
					id="grufunyxresp" />-->
			</div>
			<div class="col-3">
				
				<label><b><span style = "color:red" > * </span>Nivel</b></label>
				<select id="Nivel" class="form-select"
					aria-label="Default select example"	onchange="consultaDatosPuestos()" disabled>
				</select>
			</div>
			<div class="col-3">				
				<label><b><span style = "color:red" > * </span>Contratación</b></label>
				<select id="Contratacion" class="form-select"
					aria-label="Default select example" disabled>
				</select>
			</div>
		</div>
		<div class="row justify-content-md-center" style="margin-top:30px">
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Categoria</b></label>
				<select id="Categoria" class="form-select"
					aria-label="Default select example" disabled>
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Subcategoria</b></label>
				<select id="Subcateegoria" class="form-select"
					aria-label="Default select example" disabled>
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Clasificación Interna</b></label>
				<select id="Clasificación_Interna" class="form-select"
					aria-label="Default select example" disabled>
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Declaracion Patrimonial</b></label>
				<select id="Declaracion" class="form-select"
					aria-label="Default select example" disabled>
				</select>
			</div>
		</div><br>

		<div class="color-hr text-center">
			<h6>DATOS DE CONTROL</h6>
		</div>
	
		<div class="row">
			<div class="col-4">
				<label><b>Fecha Inicio</b></label>
				<input type="text" class="form-control" id="fechaInicio" disabled>
				</select>
			</div>
	
			<div class="col-4">
				<label><b>Fecha Termino</b></label>
				<input class="form-control" id="fechaTermino" disabled>
			</div>
	
			<div class="col-4">
				<label><b>Usuario que capturo</b></label>
				<input type="text" class="form-control" id="inptUsuarioCaptura" disabled>
			</div>
	
		</div><br>
	
		<div class="row">
			<div class="col-4">
				<label><b>Fecha de Modificacion</b></label>
				<input type="text" class="form-control" id="fechaModifico" disabled>
				</select>
			</div>
	
			<div class="col-4">
				<label><b> Usuario que modifico</b></label> 
				<input type="text" class="form-control" id="inptUltimoUsuarioCaptura" disabled>
			</div>
	
			<div class="col-4">
				<label><b>Situacion</b></label> 
				<input type="text" class="form-control" id="situacionDatosControl" disabled>
			</div>
	
		</div>

		<div class="row justify-content-md-center" style="margin-top:30px">			
			
			
			
			<div class="text-center justify-content-md-center ">
				<br>
				<button type="button" class="btn btn-success" id="botonRegistar"
					onclick="botonGenerarReporte()">Registrar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
						<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
						<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
					  </svg>
				</button>
				<button type="button" class="btn btn-danger" id ="botonCancelar"
					onclick="botonSalirConsulta()">Cancelar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
					  </svg>					  
				</button>
					<!-- <button type="button" class="btn btn-primary"
					id="limpiarBoton">Limpiar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
						<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
					  </svg>
				</button> -->
				<!-- <button type="button" class="btn btn-warning"
				onclick="botonModificar()">Modificar</button> -->
			</div>
		</div>
		

		
	</div>
</div>

<br><br><br>
<!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> -->

<script src="js/ConfiguraPuesto.js"></script>

<%@ include file="common/footer.jsp"%>