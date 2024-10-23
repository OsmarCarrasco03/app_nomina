<title>Consulta Tabulador de Puesto</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="css/tabuladores_de_puestos.css">

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center espacio-titulo ">
		<h3>CONSULTA TABULADOR DE PUESTO</h3>
	</div>
	
	<div
		class="text-center justify-content-md-center espacio-titulo ui-widget">

		<div class="autoComplete_wrapper ">
			<input id="autoComplete" type="search" dir="ltr" spellcheck=false
				autocorrect="off" autocomplete="off" autocapitalize="off" size="100">

		</div>

		<button type="button" id="abrirInfo" class="btn btn-primary"
			data-toggle="modal" data-target="#modalInfo" onclick="buscarPuesto()">Buscar
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
			</svg>
		</button>

		<button type="button" id="habilitarBusqueda" class="btn btn-danger"
			onclick="limpiarCampos()">Limpiar Campos
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
				<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
			</svg>
		</button>

	</div>

	<!-- Modal -->

	<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog"
		aria-labelledby="modalInfoLabel" aria-hidden="true">
		<div
			class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
			role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalInfoLabel">Selecciona una
						opción</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Cerrar" onclick="limpiarCampos()">
						<!-- <span aria-hidden="true">&times;</span> -->
					</button>
				</div>
				<div class="modal-body" id="modalBuscarPuesto">
					<!-- Opciones se agregarón aquí dinámicamente -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal" onclick="limpiarCampos()">Cerrar
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
						  </svg>
					</button>
					<button type="button" class="btn btn-primary" id="seleccionarBtn"
					onclick="SeleccionarPuestoABuscar(modalBuscarPuesto)">Seleccionar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
					</svg>
				</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Fin Modal -->
	<div class="text-center div-separacion-chica">
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

	<br>
	<!-- INICIO DE TABS -->
	<nav>
		<div class="nav nav-tabs" id="nav-tab" role="tablist">
			<!-- TITULOS DE LOS TABS -->

			<button class="nav-link active" id="nav-datos-puesto-tab"
				data-bs-toggle="tab" data-bs-target="#nav-datos-puesto"
				type="button" role="tab" aria-controls="nav-datos-puesto"
				aria-selected="true">Datos del Puesto</button>

			<button class="nav-link" id="nav-percepciones-fijas-tab"
				data-bs-toggle="tab" data-bs-target="#nav-percepciones-fijas"
				type="button" role="tab" aria-controls="nav-percepciones-fijas"
				aria-selected="false">Percepiones Fijas</button>

			<button class="nav-link" id="nav-deducciones-fijas-tab"
				data-bs-toggle="tab" data-bs-target="#nav-deducciones-fijas"
				type="button" role="tab" aria-controls="nav-deducciones-fijas"
				aria-selected="false">Deducciones Fijas</button>

			<button class="nav-link"
				id="nav-percepciones-variables-tab" data-bs-toggle="tab"
				data-bs-target="#nav-percepciones-variables" type="button"
				role="tab" aria-controls="nav-percepciones-variables"
				aria-selected="false">Percepiones Variables</button>

			<button class="nav-link"
				id="nav-deducciones-variables-tab" data-bs-toggle="tab"
				data-bs-target="#nav-deducciones-variables" type="button" role="tab"
				aria-controls="nav-deducciones-variables" aria-selected="false">Deducciones
				Variables</button>

			<button class="nav-link" id="nav-datos-control-tab"
				data-bs-toggle="tab" data-bs-target="#nav-datos-control"
				type="button" role="tab" aria-controls="nav-datos-control"
				aria-selected="false" hidden>Datos de Control</button>
		</div>
	</nav>

	<div class="tab-content" id="nav-tabContent">

		<!-- TAB DATOS DEL PUESTO -->
		<div class="tab-pane fade show active" id="nav-datos-puesto"
			role="tabpanel" aria-labelledby="nav-datos-puesto-tab" tabindex="0">

			<input type="hidden" id="puestoId" />

			<div class="row justify-content-md-center div-separacion-chica">

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

			<div class="row justify-content-md-center div-separacion-chica">
				<div class="col">
					<label><b>Categoría</b></label> <input id="Categoria" type="text"
						class="form-control" disabled />
				</div>

				<div class="col">
					<label><b>Subcategoría</b></label> <input id="Subcategoria"
						type="text" class="form-control" disabled />
				</div>

				<div class="col">
					<label><b>Clasificación Interna</b></label> <input
						id="Calsificacion_Interna" type="text" class="form-control"
						disabled />
				</div>

				<div class="col">
					<label><b>Declaración Patrimonial</b></label> <input
						id="Declaracion" type="text" class="form-control" disabled />
				</div>
			</div>
		</div>
		
		
		<!-- TAB DE PERCEPCIONES FIJAS -->
		<div class="tab-pane fade" id="nav-percepciones-fijas" role="tabpanel"
			aria-labelledby="nav-percepciones-fijas-tab" tabindex="0">
			<br>
			
			<input type="hidden" id="sumaConceptos1" />

			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Información del Concepto</th>
					</thead>
					<tbody id="tabla1"></tbody>
				</table>
			</div>
		</div>

		<!-- TAB DE DEDUCCIONES FIJAS -->
		<div class="tab-pane fade" id="nav-deducciones-fijas" role="tabpanel"
			aria-labelledby="nav-deducciones-fijas-tab" tabindex="0">
			<br>
			
			<input type="hidden" id="sumaConceptos2" />
			
			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Información del Concepto</th>
					</thead>
					<tbody id="tabla2"></tbody>
				</table>
			</div>
		</div>

		<!-- TAB DE PERCEPCIONES VARIABLES -->
		<div class="tab-pane fade" id="nav-percepciones-variables"
			role="tabpanel" aria-labelledby="nav-percepciones-variables-tab"
			tabindex="0">
			<br>
			
			<input type="hidden" id="sumaConceptos3" />
			
			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Información del Concepto</th>
					</thead>
					<tbody id="tabla3"></tbody>
				</table>
			</div>
		</div>

		<!-- TAB DE DEDUCCIONES VARIABLES -->
		<div class="tab-pane fade" id="nav-deducciones-variables"
			role="tabpanel" aria-labelledby="nav-deducciones-variables-tab"
			tabindex="0">
			<br>
			
			<input type="hidden" id="sumaConceptos4" />
			
			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Información del Concepto</th>
					</thead>
					<tbody id="tabla4"></tbody>
				</table>
			</div>
		</div>

		<!-- TAB DE DATOS DE CONTROL -->
		<div class="tab-pane fade" id="nav-datos-control" role="tabpanel"
			aria-labelledby="nav-datos-control-tab" tabindex="0">
			<br>
			<div class="row div-separacion-debajo">
				<div class="col-4">
					<p class="text-start espacio-inputs">
						<b>Fecha de inicio</b>
					</p>
					<input class="form-control" type="date" id="fechaInicio" disabled>
				</div>

				<div class="col-4" id="divFechaTerminoLlena" hidden>
					<p class="text-start espacio-inputs">
						<b>Fecha de término</b>
					</p>
					<input class="form-control" type="date" id="fechaTermino" disabled>
				</div>

				<div class="col-4" id="divFechaTerminoVacia">
					<p class="text-start espacio-inputs">
						<b>Fecha de término</b>
					</p>
					<input class="form-control" type="text" id="fechaTerminoVacia"
						value="N/A" disabled>
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
		</div>
	</div>
</div>

<br>
<br>

<script src="js/tabulador_consulta_puesto.js"></script>

<%@ include file="common/footer.jsp"%>