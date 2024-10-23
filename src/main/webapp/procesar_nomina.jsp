<title>Procesar Nómina</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<link rel="stylesheet" type="text/css" href="css/procesar_nomina.css">

<div
	class="container rounded div-padding input-color div-separacion-mediana">

	<div class="text-center espacio-titulo">
		<h3>PROCESAR NÓMINA</h3>
	</div>

	<div class="text-center div-separacion-chica">
		<div class="row justify-content-md-center">
			
			<div class="col">
				<br>
				<h5 class="color-h5">Periodo de Pago Actual:</h5>
			</div>
			
			<div class="col-2">
				<label><b>Año</b></label> <input type="text" id="anioPeriodo"
					class="form-control" disabled />				
			</div>

			<div class="col-3">
				<label><b>Periodo</b></label> <input type="text" id="periodo"
					class="form-control" disabled />
			</div>

			<div class="col-2">
				<label><b>De</b></label> <input type="date" id="inicioPeriodo"
					class="form-control" disabled />
			</div>

			<div class="col-2">
				<label><b>A</b></label> <input type="date" id="finPeriodo"
					class="form-control" disabled />
			</div>

		</div>
		<br>
		<div id="divRadioOpciones">
			<h5 class="color-h5">Opciones para Procesar Nómina</h5>

			<div class="form-check form-check-inline">
				<input class="form-check-input opcionProcesarNomina" type="radio"
					name="inlineRadioOptions" id="unidad" value="1">
				<label class="form-check-label" for="unidad">Unidad</label>
			</div>

			<div class="form-check form-check-inline">
				<input class="form-check-input opcionProcesarNomina" type="radio"
					name="inlineRadioOptions" id="nomina" value="2">
				<label class="form-check-label" for="nomina">Nómina</label>
			</div>

			<div class="form-check form-check-inline">
				<input class="form-check-input opcionProcesarNomina" type="radio"
					name="inlineRadioOptions" id="personas" value="3">
				<label class="form-check-label" for="personas">Personas</label>
			</div>

			<div class="form-check form-check-inline">
				<button type="button" class="btn btn-danger btn-sm"
					title="Borrar" onclick="ResetRadios()">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
						fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
  						<path
							d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
					</svg>
				</button>
			</div>

		</div>
		<!-- <br>
		<div class="container">
			<div class="text-center">
				<button type="button" class="btn btn-danger btn-sm"
					onclick="ResetRadios()">Resetear Opciones</button>
			</div>
		</div> -->
	</div>

	<br>
	<!-- INICIO DE TABS -->
	<nav>
		<div class="nav nav-tabs" id="nav-tab" role="tablist">

			<button class="nav-link active" id="nav-unidad-tab"
				data-bs-toggle="tab" data-bs-target="#nav-unidad"
				type="button" role="tab" aria-controls="nav-unidad"
				aria-selected="true">UNIDAD</button>

			<button class="nav-link" id="nav-nomina-tab"
				data-bs-toggle="tab" data-bs-target="#nav-nomina"
				type="button" role="tab" aria-controls="nav-nomina"
				aria-selected="false">NÓMINA</button>

			<button class="nav-link" id="nav-personas-tab"
				data-bs-toggle="tab" data-bs-target="#nav-personas"
				type="button" role="tab" aria-controls="nav-personas"
				aria-selected="false">PERSONAS</button>

		</div>
	</nav>

	<div class="tab-content" id="nav-tabContent">

		<!-- TAB DE UNIDAD -->
		<div class="tab-pane fade show active" id="nav-unidad" role="tabpanel"
			aria-labelledby="nav-unidad-tab" tabindex="0">
			
			<br>
			<div class="row container justify-content-md-center">
				<!-- <div class="col-5"></div> -->
				<div class="col">
					<label><b>Grupo</b></label> <select class="form-select"
					aria-label="Default select example" onchange="TraerUnidades(value)"
					id="selectUnidades" >
					<option value="0" selected>Seleccionar opción...</option>
					<option value="1">Todas las unidades</option>
					<option value="2">Unidades centrales</option>
					<option value="3">Unidades foráneas</option>
					</select>
				</div>
				
				<div class="col-2">
					<br>
					<button type="button" class="btn btn-danger" onclick="LimpiarDatosUnidades()">
						Limpiar Datos
					</button>
				</div>
			</div>

			<br>
			<div class="container">
				<div class="row justify-content-md-center">
					<h5 class="color-h5">Lista de Unidades a Procesar</h5>

					<div class="col-3">
						<label><b>Clave</b></label>
					</div>

					<div class="col">
						<label><b>Zona</b></label>
					</div>

					<div class="col-1">
						<label><b>Opción</b></label>
					</div>
				</div>
			</div>

			<div class="container tab-scroll scroll-vertical"
				id="tabScrollUnidades">
				<!-- <div id="inputsInicialesUnidades">
					<div class="row justify-content-md-center unidad" id="unidad1">
						<input type="hidden" id="idUnidad1" />

						<div class="col-3">
							<input type="text" class="form-control" id="unidadClave1"
								disabled />
						</div>

						<div class="col">
							<input type="text" class="form-control" id="unidadZona1" disabled />
						</div>

						<div class="col-1">
							<input type="text" class="form-control" id="unidadOpcion1"
								disabled />
						</div>
					</div>
					<br class="unidad">
					<div class="row justify-content-md-center unidad" id="unidad2">
						<input type="hidden" id="idUnidad2" />

						<div class="col-3">
							<input id="Tipo" type="text" class="form-control"
								id="unidadClave2" disabled />
						</div>

						<div class="col">
							<input id="Zona" type="text" class="form-control"
								id="unidadZona2" disabled />
						</div>

						<div class="col-1">
							<input type="text" class="form-control" id="unidadOpcion2"
								disabled />
						</div>
					</div>
					<br class="unidad">
					<div class="row justify-content-md-center unidad" id="unidad3">
						<input type="hidden" id="idUnidad3" />

						<div class="col-3">
							<input id="Tipo" type="text" class="form-control"
								id="unidadClave3" disabled />
						</div>

						<div class="col">
							<input id="Zona" type="text" class="form-control"
								id="unidadZona3" disabled />
						</div>

						<div class="col-1">
							<input type="text" class="form-control" id="unidadOpcion3"
								disabled />
						</div>
					</div>
					<br class="unidad">
					<div class="row justify-content-md-center unidad" id="unidad4">
						<input type="hidden" id="idUnidad4" />

						<div class="col-3">
							<input id="Tipo" type="text" class="form-control"
								id="unidadClave4" disabled />
						</div>

						<div class="col">
							<input id="Zona" type="text" class="form-control"
								id="unidadZona4" disabled />
						</div>

						<div class="col-1">
							<input type="text" class="form-control" id="unidadOpcion4"
								disabled />
						</div>
					</div>
					<br class="unidad">
					<div class="row justify-content-md-center unidad" id="unidad5">
						<input type="hidden" id="idUnidad5" />

						<div class="col-3">
							<input id="Tipo" type="text" class="form-control"
								id="unidadClave5" disabled />
						</div>

						<div class="col">
							<input id="Zona" type="text" class="form-control"
								id="unidadZona5" disabled />
						</div>

						<div class="col-1">
							<input type="text" class="form-control" id="unidadOpcion5"
								disabled />
						</div>
					</div>
				</div> -->
			</div>
		</div>
		<!-- TAB DE NÓMINA -->
		<div class="tab-pane fade" id="nav-nomina" role="tabpanel"
			aria-labelledby="nav-nomina-tab" tabindex="0">

			<br>
			<div class="container">
				<div class="row justify-content-md-center">
					<h5 class="color-h5">Nóminas Procesadas en el Periodo
						Seleccionado</h5>

					<div class="col-3">
						<label><b>Clave</b></label>
					</div>

					<div class="col">
						<label><b>Nombre</b></label>
					</div>

					<div class="col-1">
						<label><b>Seleccionar</b></label>
					</div>
				</div>
			</div>

			<div class="container tab-scroll scroll-vertical"
				id="tabScrollNominas">
				<!-- <div id="inputsInicialesNominas">
					<div class="row justify-content-md-center" id="nomina1">
						<div class="col-2">
							<input type="text" class="form-control" id="nominaClave1"
								disabled />
						</div>

						<div class="col">
							<input type="text" class="form-control" id="nominaNombre1"
								disabled />
						</div>

						<div class="col-1 text-center">
							<input class="form-check-input" type="checkbox"
								id="nominaCheckbox1" disabled>
						</div>
					</div>-->
			</div>
		</div>

		<!-- TAB DE PERSONAS -->
		<div class="tab-pane fade" id="nav-personas" role="tabpanel"
			aria-labelledby="nav-personas-tab" tabindex="0">
			<br>
			<!-- Button trigger modal -->
			<div class="row justify-content-md-center">
				<div class="col-5"></div>
				<div class="col">
					<button type="button" class="btn btn-primary"
						data-bs-toggle="modal" data-bs-target="#modalInfo">Buscar
						Persona</button>
				</div>
				<div class="col-2">
					<button type="button" class="btn btn-danger" onclick="LimpiarDatosPersonas()">
						Limpiar Datos
					</button>
				</div>
			</div>
			<!-- Modal -->

			<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog"
				aria-labelledby="modalInfoLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-scrollable modal-xl"
					role="document">
					<div class="modal-content">

						<div class="modal-header">
							<h5 class="modal-title" id="modalInfoLabel">Selecciona una
								opción</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal"
								aria-label="Cerrar" onclick="limpiarBusquedaPersona()"></button>
						</div>

						<div class="modal-body" id="modalBodyPersona">
							<div class="text-center justify-content-md-center ui-widget">

								<input id="autoComplete" type="search" dir="ltr"
									spellcheck="false" autocorrect="off" autocomplete="off"
									autocapitalize="off">

								<button type="button" class="btn btn-primary"
									onclick="buscarPersona()" data-bs-dismiss="modal">
									Agregar
									<!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
										fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
										<path
											d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
									</svg> -->
								</button>

								<button type="button" class="btn btn-danger"
									onclick="limpiarBusquedaPersona()">
									Limpiar Búsqueda
								</button>
							</div>
							<!-- <br>
							<div id="inputsPersonas">
							</div> -->
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary"
								data-bs-dismiss="modal" onclick="limpiarBusquedaPersona()">
								Cerrar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
									fill="currentColor" class="bi bi-x-circle-fill"
									viewBox="0 0 16 16">
								<path
										d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
						  		</svg>
							</button>
							<!-- <button type="button" class="btn btn-primary" id="seleccionarBtn">
								Seleccionar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
									fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
								<path
										d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
								</svg>
							</button> -->
							<!-- <button type="button" class="btn btn-primary" id="seleccionarBtn"
								onclick="SeleccionarPuestoABuscar(modalBuscarPuesto)">
								Seleccionar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
									fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
								<path
										d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
								</svg>
							</button> -->
						</div>
					</div>
				</div>
			</div>

			<br>
			<div class="container">
				<div class="row justify-content-md-center">
					<h5 class="color-h5">Criterios x Persona</h5>

					<div class="col-4">
						<label><b>CURP</b></label>
					</div>

					<div class="col">
						<label><b>Nombre</b></label>
					</div>

					<div class="col-1">
						<label><b>Situación</b></label>
					</div>
					
					<div class="col-1">
						<label><b>Opción</b></label>
					</div>
				</div>
			</div>

			<div class="container tab-scroll scroll-vertical"
				id="tabScrollPersonas">
				<!-- <div class="row justify-content-md-center" id="persona1">
					<input type="hidden" id="idPersonas2" />
					
					<div class="col-4">
						<input id="Tipo" type="text" class="form-control" id="personasCurp2" disabled />
					</div>
					
					<div class="col">
						<input id="Zona" type="text" class="form-control" id="personasNombre2" disabled />
					</div>
					
					<div class="col-3">
						<input id="Zona" type="text" class="form-control" id="personasSituacion2" disabled />
					</div>
				</div> -->
			</div>
		</div>
	</div>
	<hr>
	<div class="container text-center">
		<button type="button" class="btn btn-success" onclick="ProcesarNomina()">
			Procesar Nómina
		</button>
	</div>
</div>

<br><br><br>

<script src="js/procesar_nomina.js"></script>

<%@ include file="common/footer.jsp"%>