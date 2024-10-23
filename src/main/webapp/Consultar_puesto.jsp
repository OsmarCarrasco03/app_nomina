<title>Consulta de Puestos</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center espacio-titulo ">
		<h3>CONSULTA DE PUESTOS</h3>
	</div>


	<div class="text-center justify-content-md-center espacio-titulo ui-widget">

		<div class="autoComplete_wrapper ">
			<input id="autoComplete" type="search" dir="ltr" spellcheck=false
				autocorrect="off" autocomplete="off" autocapitalize="off" size="100">

				

		</div>

		<button style="margin-left: 10px;" type="button"
			class="btn btn-primary" id="abrirInfo" data-toggle="modal"
			data-target="#modalInfo" onclick="buscarPuesto()">Buscar
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
			</svg>
		</button>
		<!-- INICIO boton habilitar busqueda Servicio -->
			<button style = "margin-left: 10px;" type = "button" class="btn btn-success" id="habilitarBusqueda"
			onclick="habilitarBusqueda()">Habilitar Búsqueda
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
				<path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
			</svg>
		</button>
			<!-- FIN boton habilitar busqueda Servicio -->

	</div>

	<!-- Modal -->

	<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog"
		aria-labelledby="modalInfoLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalInfoLabel">Selecciona una
						opción</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Cerrar">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<!-- Opciones se agregar�n aqu� din�micamente -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal">Cerrar
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
						</svg>
					</button>
					<button type="button" class="btn btn-primary" id="seleccionarBtn">Seleccionar
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>

<!-- Fin Modal -->
	<div class="text-center div-separacion-chica" >
		<div class="row justify-content-md-center">
			<div class="col-2">

				<label><b>Código del Puesto</b></label> <input type="text"
					id="codigoPuesto" class="form-control" disabled />
			</div>

			<div class="col-8">

				<label><b>Descripción</b></label> <input type="text"
					id="descripcion" class="form-control" disabled />
			</div>

			<div class="col-2" id="situacionDiv">

				<label><b>Situación</b></label> <input type="text"
					class="form-control" size="10" name="datepicker2" id="situacion"
					disabled />
			</div>
		</div>
	</div>
	<div class="text-center  ">
		<br>

		<div class="color-hr">
			<p>
				<b>DATOS DEL PUESTO</b>
			</p>
		</div>


	</div>

	<!-- Primera Secci�n -->
	<div class="text-center">
		<div class="row justify-content-md-center div-separacion-chica" >

			<div class="col">
				<label><b>Tipo</b></label> <input id="Tipo" type="text"
					class="form-control" disabled />

			</div>
			<div class="col">

				<label><b>Zona</b></label> <input id="Zona" type="text"
					class="form-control" disabled />
			</div>
			<div class="col">

				<label><b>Nivel</b></label> <input id="Nivel" type="text"
					class="form-control" disabled />
			</div>
			<div class="col">
				<label><b>Contratación</b></label> <input id="Contratacion"
					type="text" class="form-control" disabled />
			</div>

		</div>
		<div class="row justify-content-md-center div-separacion-chica" >
			<div class="col">

				<label><b>Categoria</b></label> <input id="Categoria" type="text"
					class="form-control" disabled />
			</div>
			<div class="col">

				<label><b>Subcateegoria</b></label> <input id="Subcategoria"
					type="text" class="form-control" disabled />
			</div>
			<div class="col">

				<label><b>Clasificación Interna</b></label> <input
					id="Calsificacion_Interna" type="text" class="form-control"
					disabled />
			</div>
			<div class="col">

				<label><b>Declaracion Patrimonial</b></label> <input
					id="Declaracion" type="text" class="form-control" disabled />
			</div>
		</div>
		<div class="row justify-content-md-center div-separacion-mediana div-separacion-chica">
				</div>
	</div>
</div>

<!-- Inicia seccion solo para administrador -->
<div id="datos_control" class="container"  hidden="true">
	<div class="text-center background-color">	

		<div class="color-hr">		
				<b>DATOS DE CONTROL</b>			
		</div>
	</div>
	<div class="text-center div-separacion-chica ">
		<div class="row justify-content-md-center">
			<div class="col-4">

				<label><b>Fecha de Captura</b></label> <input type="text"
					id="FechaIni" class="form-control" disabled />
			</div>

			<div class="col-4">

				<label><b>Fecha de Término</b></label> <input type="text"
					id="FechaFin" class="form-control" disabled />
			</div>

			<div class="col-4" id="situacionDiv">

				<label><b>Usuario que Capturó</b></label> <input type="text"
					class="form-control" id="UsuarioCapturo"
					disabled />
			</div>
		</div>
		
		<div class="row justify-content-md-center div-separacion-chica" >
			<div class="col-6">

				<label><b>Fecha de Modificación</b></label> <input type="text"
					id="FechaMod" class="form-control" disabled />
			</div>

			<div class="col-6">

				<label><b>Usuario que realizó la útima modificación</b></label> <input type="text"
					id="UsuarioUltMod" class="form-control" disabled />
			</div>
		</div>
		
	</div>
	
	<br>
</div>
<div class="text-center justify-content-md-center " >
				<button type="button" class="btn btn-primary" id="limpiarBoton"
					onclick="limpiarCamposHabilitar()">Limpiar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
						<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
					</svg>
				</button>

			</div>
			<br>	<br>	<br>

<script src="js/consulta_puestos.js"></script>

<%@ include file="common/footer.jsp"%>