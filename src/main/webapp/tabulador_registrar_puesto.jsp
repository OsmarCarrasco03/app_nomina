<title>Tabulador Registrar Puesto</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<link rel="stylesheet" type="text/css" href="css/tabuladores_de_puestos.css">

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center espacio-titulo ">
		<h3>Tabulador Registrar Puesto</h3>
	</div>

	<div
		class="text-center justify-content-md-center espacio-titulo ui-widget">

		<div class="autoComplete_wrapper">
			<input id="autoComplete" type="search" dir="ltr" spellcheck=false
				autocorrect="off" autocomplete="off" autocapitalize="off" size="100">
		</div>
			
		<button type="button" id="abrirInfo" class="btn btn-primary"
			onclick="buscarPuesto('autoComplete', 'modalInfo', 'modalBuscarPuesto', 'seleccionarBtn')"
			>Buscar</button>		

		<button type="button" id="habilitarBusqueda" class="btn btn-danger"
			onclick="limpiarCampos()">Limpiar Campos</button>

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
						aria-label="Cerrar" id="cerrarModalPuestos" onclick="limpiarCampos()">
					</button>
				</div>
				<div class="modal-body" id="modalBuscarPuesto">
					<!-- Opciones se agregarón aquí dinámicamente -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal" onclick="limpiarCampos()">Cerrar</button>
					<button type="button" class="btn btn-primary" id="seleccionarBtn"
						onclick="SeleccionarPuestoABuscar(modalBuscarPuesto)">Seleccionar</button>
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
	
	<div class="text-center justify-content-md-center">

		<button type="button" class="btn btn-primary" id="copiarDatosPuesto"
		data-bs-toggle="modal" data-bs-target="#modalCopiarPuesto"
		disabled>Copiar Datos de Puesto</button>

		<!-- Modal Copiar Puesto -->
		<div class="modal fade" id="modalCopiarPuesto" tabindex="-1" role="dialog"
			aria-labelledby="modalCopiarPuestoLabel" aria-hidden="true">
			<div
				class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl"
				role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="modalCopiarPuestoLabel">Copiar Datos
							de Puesto</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal"
							aria-label="Cerrar" onclick="limpiarTabla(modalBodyNuevoPuesto)"></button>
					</div>
					<div class="modal-body" id="modalBodyNuevoPuesto">
						<div
							class="text-center justify-content-md-center ui-widget">

							<div class="autoComplete_wrapper">
								<input id="autocompletarCopiarPuesto" type="search" dir="ltr"
									spellcheck=false autocorrect="off" autocomplete="off"
									autocapitalize="off" size="100">
							</div>
							
							<button type="button" id="buscarNuevoPuesto" class="btn btn-primary"
					onclick="buscarPuesto('autocompletarCopiarPuesto', 'modalCopiarPuesto', 'conceptosACopiar', 'copiarConceptosPuesto');OcultarEspacios(modalBodyNuevoPuesto)"
								>Buscar</button>

							<button type="button" id="habilitarBusqueda"
								class="btn btn-danger" onclick="limpiarTabla(modalBodyNuevoPuesto)">Limpiar
								Tabla</button>
							
							<div id="conceptosACopiar" class="container">
							</div>
							
						</div>
						<br><br><br><br><br>
						<br><br><br><br>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger"
							data-bs-dismiss="modal" id="cancelarNuevoPuesto"
							onclick="limpiarTabla(modalBodyNuevoPuesto)">Cancelar</button>
						<button type="button" class="btn btn-primary" 
							id="copiarConceptosPuesto"
							onclick="SeleccionarConceptosACopiar(conceptosACopiar)">Seleccionar</button>
					</div>
				</div>
			</div>
		</div>
	</div>

	<br>
	<!-- INICIO DE TABS -->
	<nav>
		<div class="nav nav-tabs" id="nav-tab" role="tablist">
			<!-- TITULOS DE LOS TABS -->

			<button class="nav-link active titulo-tab" id="nav-datos-puesto-tab"
				data-bs-toggle="tab" data-bs-target="#nav-datos-puesto"
				type="button" role="tab" aria-controls="nav-datos-puesto"
				aria-selected="true">Datos del Puesto</button>

			<button class="nav-link titulo-tab" id="nav-percepciones-fijas-tab"
				data-bs-toggle="tab" data-bs-target="#nav-percepciones-fijas"
				type="button" role="tab" aria-controls="nav-percepciones-fijas"
				aria-selected="false">Percepiones Fijas</button>

			<button class="nav-link titulo-tab" id="nav-deducciones-fijas-tab"
				data-bs-toggle="tab" data-bs-target="#nav-deducciones-fijas"
				type="button" role="tab" aria-controls="nav-deducciones-fijas"
				aria-selected="false">Deducciones Fijas</button>

			<button class="nav-link titulo-tab"
				id="nav-percepciones-variables-tab" data-bs-toggle="tab"
				data-bs-target="#nav-percepciones-variables" type="button"
				role="tab" aria-controls="nav-percepciones-variables"
				aria-selected="false">Percepiones Variables</button>

			<button class="nav-link titulo-tab"
				id="nav-deducciones-variables-tab" data-bs-toggle="tab"
				data-bs-target="#nav-deducciones-variables" type="button" role="tab"
				aria-controls="nav-deducciones-variables" aria-selected="false">Deducciones
				Variables</button>

		</div>
	</nav>

	<div class="tab-content" id="nav-tabContent">

		<!-- TAB DATOS DEL PUESTO -->
		<div class="tab-pane fade show active" id="nav-datos-puesto"
			role="tabpanel" aria-labelledby="nav-datos-puesto-tab" tabindex="0">

			<input type="hidden" id="puestoIdAutocompletado" />
			<input type="hidden" id="puestoIdACopiarConceptos" />

			<div class="row justify-content-md-center div-separacion-chica" id="camposConsulta1">
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

			<div class="row justify-content-md-center div-separacion-chica" id="camposConsulta2">
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
			
			<input type="hidden" id="conceptosTabla1" />
			
			<div class="text-center justify-content-md-center">

				<button type="button" class="btn btn-primary" data-bs-toggle="modal"
					data-bs-target="#modalConcepto" onclick="llenarConcepto(1)"
					id="btnAgregarConcepto" disabled>Agregar Nuevo Concepto</button>

				<!-- Modal Agregar Nuevo Concepto -->
				<div class="modal fade" id="modalConcepto" tabindex="-1"
					role="dialog" aria-labelledby="modalConceptoLabel"
					aria-hidden="true">
					<div
						class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
						role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modalConceptoLabel">Agregar
									Nuevo Concepto</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Cerrar" id="cerrarModal1"></button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-3">
										<p class="text-start espacio-inputs">
											<b>Concepto</b> <span class="red-asterisk">*</span>
										</p>
										<select class="form-select" id="selectTipo1"
											aria-label="Default select example">
											<option value="" disabled>Seleccionar...</option>
										</select>
									</div>

									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Descripción</b> <span class="red-asterisk">*</span>
										</p>
										<input id="descripcionTipo1" type="text" 
											class="form-control" disabled />
									</div>
									
									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Importe</b> <!-- <span class="red-asterisk">*</span> -->
										</p>
										<input id="importeTipo1" type="text" 
											class="form-control" disabled />
									</div>
								</div>
								<br>
								<div class="modal-footer">
									<button type="button" class="btn btn-danger"
										data-bs-dismiss="modal"
										id="cancelarNuevoConcepto1">Cancelar</button>
									<button type="button" class="btn btn-primary"
										data-bs-dismiss="modal"
										id="seleccionarNuevoConcepto1">Seleccionar</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<br> 
			
			<input type="hidden" id="sumaConceptos1" />
			<input type="hidden" id="sumaConceptosISPT" />
			
			<div class="table-responsive">
				<table class="table table-hover align-middle caption-top">
				<!-- <caption>Lista de conceptos</caption> -->
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Opción</th>
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
			
			<input type="hidden" id="conceptosTabla2" />
			
			<div class="text-center justify-content-md-center">

				<button type="button" class="btn btn-primary" data-bs-toggle="modal"
					data-bs-target="#modalConcepto2" onclick="llenarConcepto(2)"
					id="btnAgregarConcepto2" disabled>Agregar Nuevo Concepto</button>

				<!-- Modal Agregar Nuevo Concepto -->
				<div class="modal fade" id="modalConcepto2" tabindex="-1"
					role="dialog" aria-labelledby="modalConcepto2Label"
					aria-hidden="true">
					<div
						class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
						role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modalConcepto2Label">Agregar
									Nuevo Concepto</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Cerrar" id="cerrarModal2"></button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-3">
										<p class="text-start espacio-inputs">
											<b>Concepto</b> <span class="red-asterisk">*</span>
										</p>
										<select class="form-select" id="selectTipo2"
											aria-label="Default select example">
											<option value="" disabled>Seleccionar...</option>
										</select>
									</div>

									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Descripción</b> <span class="red-asterisk">*</span>
										</p>
										<input id="descripcionTipo2" type="text" 
											class="form-control" disabled />
									</div>
									
									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Importe</b> <!-- <span class="red-asterisk">*</span> -->
										</p>
										<input id="importeTipo2" type="text" 
											class="form-control" disabled />
									</div>
								</div>
								<br>
								<div class="modal-footer">
									<button type="button" class="btn btn-danger"
										data-bs-dismiss="modal"
										id="cancelarNuevoConcepto2">Cancelar</button>
									<button type="button" class="btn btn-primary"
										data-bs-dismiss="modal"
										id="seleccionarNuevoConcepto2">Seleccionar</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<br>
			
			<input type="hidden" id="sumaConceptos2" />
			
			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Opción</th>
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
			
			<input type="hidden" id="conceptosTabla3" />
			
			<div class="text-center justify-content-md-center">

				<button type="button" class="btn btn-primary" data-bs-toggle="modal"
					data-bs-target="#modalConcepto3" onclick="llenarConcepto(3)"
					id="btnAgregarConcepto3" disabled>Agregar Nuevo Concepto</button>

				<!-- Modal Agregar Nuevo Concepto -->
				<div class="modal fade" id="modalConcepto3" tabindex="-1"
					role="dialog" aria-labelledby="modalConcepto3Label"
					aria-hidden="true">
					<div
						class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
						role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modalConcepto3Label">Agregar
									Nuevo Concepto</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Cerrar" id="cerrarModal3"></button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-3">
										<p class="text-start espacio-inputs">
											<b>Concepto</b> <span class="red-asterisk">*</span>
										</p>
										<select class="form-select" id="selectTipo3"
											aria-label="Default select example">
											<option value="" disabled>Seleccionar...</option>
										</select>
									</div>

									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Descripción</b> <span class="red-asterisk">*</span>
										</p>
										<input id="descripcionTipo3" type="text" 
											class="form-control" disabled />
									</div>
									
									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Importe</b> <!-- <span class="red-asterisk">*</span> -->
										</p>
										<input id="importeTipo3" type="text" 
											class="form-control" disabled />
									</div>
								</div>
								<br>
								<div class="modal-footer">
									<button type="button" class="btn btn-danger"
										data-bs-dismiss="modal"
										id="cancelarNuevoConcepto3">Cancelar</button>
									<button type="button" class="btn btn-primary"
										data-bs-dismiss="modal"
										id="seleccionarNuevoConcepto3">Seleccionar</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<br>
			
			<input type="hidden" id="sumaConceptos3" />
			
			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Opción</th>
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
			
			<input type="hidden" id="conceptosTabla4" />
			
			<div class="text-center justify-content-md-center">

				<button type="button" class="btn btn-primary" data-bs-toggle="modal"
					data-bs-target="#modalConcepto4" onclick="llenarConcepto(4)"
					id="btnAgregarConcepto4" disabled>Agregar Nuevo Concepto</button>

				<!-- Modal Agregar Nuevo Concepto -->
				<div class="modal fade" id="modalConcepto4" tabindex="-1"
					role="dialog" aria-labelledby="modalConcepto4Label"
					aria-hidden="true">
					<div
						class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
						role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modalConcepto4Label">Agregar
									Nuevo Concepto</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal"
									aria-label="Cerrar" id="cerrarModal4"></button>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-3">
										<p class="text-start espacio-inputs">
											<b>Concepto</b> <span class="red-asterisk">*</span>
										</p>
										<select class="form-select" id="selectTipo4"
											aria-label="Default select example">
											<option value="" disabled>Seleccionar...</option>
										</select>
									</div>

									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Descripción</b> <span class="red-asterisk">*</span>
										</p>
										<input id="descripcionTipo4" type="text" 
											class="form-control" disabled />
									</div>
									
									<div class="col">
										<p class="text-start espacio-inputs">
											<b>Importe</b> <span class="red-asterisk">*</span>
										</p>
										<input id="importeTipo4" type="text" 
											class="form-control" disabled />
									</div>
								</div>
								<br>
								<div class="modal-footer">
									<button type="button" class="btn btn-danger"
										data-bs-dismiss="modal"
										id="cancelarNuevoConcepto4">Cancelar</button>
									<button type="button" class="btn btn-primary"
										data-bs-dismiss="modal"
										id="seleccionarNuevoConcepto4">Seleccionar</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<br>
			
			<input type="hidden" id="sumaConceptos4" />
						
			<div class="table-responsive">
				<table class="table table-hover align-middle">
					<thead>
						<th>Concepto</th>
						<th>Descripción</th>
						<th>Importe</th>
						<th>Opción</th>
						<th>Información del Concepto</th>
					</thead>
					<tbody id="tabla4"></tbody>
				</table>
			</div>
		</div>

		
	</div>
	<br>
	<div class="text-center justify-content-md-center">
		<button type="button" class="btn btn-success"
		id="agregarNuevoPuesto" onclick="AgregarNuevoPuesto()"
		disabled>Aplicar Cambios</button>
	</div>
</div>
<br><br>
<script src="js/tabulador_registrar_puesto.js"></script>

<%@ include file="common/footer.jsp"%>