<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center espacio-titulo ">

		<h3>MODIFICAR PLAZA POR PERSONA</h3>

	</div>
	<br>

	<!-- Inicio Busqueda ID Plaza -->

	<div class="row">
		<div class="autoComplete_wrapper">
			<div class="row">
				<div class="col-8 separacion-pequeña">
					<input id="autoCompleteNumPlaza" class="resaltar-buscador"
						type="search" dir="ltr" spellcheck="false" autocorrect="off"
						autocomplete="off" autocapitalize="off" size="100"
						style="width: 100%; border: 1px solid">
				</div>


				<div class="col-4 separacion-pequeña">

					<button type="button" class="btn btn-primary" data-descripcion="1"
						id="btnBuscarPlaza">Buscar
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</button>
						

					<!-- INICIO boton Servicio -->
					<button style="margin-left: 20px;" type="button"
						class="btn btn-success" id="btnHabilitarBusqueda" disabled>Habilitar
						Busqueda
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
							<path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
						</svg>
					</button>

					<!-- FIN boton Servicio -->
				</div>

			</div>
		</div>
	</div>
	<br>
	<div class="container" id="forms">

		<!-- Inicio Pestañas -->
		<ul class="nav nav-tabs" id="Tabs" role="tablist">
			<li class="nav-item" role="presentation">
				<button class="nav-link active" id="datosPlaza-tab"
					data-bs-toggle="tab" data-bs-target="#datosPlaza" type="button"
					role="tab" aria-controls="datosPlaza" aria-selected="true">Plaza
				</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="datosUnidad-tab" data-bs-toggle="tab"
					data-bs-target="#datosUnidad" type="button" role="tab"
					aria-controls="datosUnidad" aria-selected="false">Unidad</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="datosPuesto-tab" data-bs-toggle="tab"
					data-bs-target="#datosPuesto" type="button" role="tab"
					aria-controls="datosPuesto" aria-selected="false">Puesto</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="datosPersona-tab" data-bs-toggle="tab"
					data-bs-target="#datosPersona" type="button" role="tab"
					aria-controls="datosPersona" aria-selected="false">Persona</button>
			</li>
			<li class="nav-item" role="presentation">
				<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
					data-bs-target="#datosControl" type="button" role="tab"
					aria-controls="datosControl" aria-selected="false" hidden>Datos de Control</button>
			</li>
		</ul>

		<!-- Contenido de las Pestañas -->
		<div class="tab-content" id="TabContent">
			<!-- Contenido de la pestaña "Datos Plaza" -->
			<div class="tab-pane fade show active" id="datosPlaza"
				role="tabpanel" aria-labelledby="datosPlaza-tab">
				<!--fade-->
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="color-hr text-center separacion-pequeña">
									<h5>DATOS GENERALES DE PLAZA</h5>
								</div>
							</div>
						</div>
						<!-- Seccion -->
						<div id="myDIV" class="text-left separacion-pequeña">

							<div class="row justify-content-md-center">
								<div class="col-4">
									<label><b>Número de Plaza</b></label> 
									<div class="input-group">
									<input id="numeroPlaza" type="text" class="form-control" oninput="validarNumero(this)" disabled>
										<button id="habilitarnumeroPlaza" class="btn btn-outline-danger" type="button" enabled>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
											</svg>
										</button>
									</div>
								</div>
							</div>

							<div class="row justify-content-md-center">
								<div class="col-4 separacion-pequeña">
									<label><b>Número de Plaza Padre</b></label>
									<div class="input-group">
									<input id="numeroPlazaPadre" type="text" class="form-control" oninput="validarNumero(this)" disabled>
										<button id="habilitarnumeroPlazaPadre" class="btn btn-outline-danger" type="button" enabled>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
											</svg>
										</button>
									</div>
								</div>
								
								<div class="col-4 separacion-pequeña">
									<label><b>Codigo Inteligente Rhnet </b></label>
									<div class="input-group">
									<input id="codigoIR" type="text" class="form-control" disabled>
										<button id="habilitarcodigoIR" class="btn btn-outline-danger" type="button" enabled>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
											</svg>
										</button>
									</div>
								</div>
								
								<div class="col-4 separacion-pequeña">
									<label><b>Estatus Ocupacional</b></label><br> 
										<div class="input-group">
										<input id="EstatusOcupàcional" type="text" class="form-control" disabled>
										<button id="habilitarEstatusOcupàcional" class="btn btn-outline-danger" type="button" enabled>
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
											</svg>
										</button>
										</div>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-4 separacion-pequeña">
								<label><b>Motivos de Obligación de Declaración Patrimonial</b></label><br>
								<div class="input-group">
								<input id="MotivosDeObligacion" type="text" class="form-control" disabled>
								<button id="habilitarMotivosDeObligacion" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>

							<div class="col-4 separacion-pequeña">
								<label><b>Áreas</b></label><br>
								<b>‎ </b>
								<div class="input-group">
								<input id="Areas" type="text" class="form-control" disabled>
								<button id="habilitarAreas" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							
							<div class="col-4 separacion-pequeña">
								<label><b>Contrataciones Públicas</b></label><br>
								<b>‎ </b>
								<div class="input-group">
								<input id="ContratacionesPublicas" type="text" class="form-control" disabled>
								<button id="habilitarContratacionesPublicas" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-4 separacion-pequeña">
								<label><b>Trámite de C.L.A.P.P.</b></label><br>
								<div class="input-group">
								<input id="tramiteCLAPP" type="text" class="form-control" disabled>
								<button id="habilitartramiteCLAPP" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							
							<div class="col-4 separacion-pequeña">
								<label><b>Trámite de E.B.I.</b></label><br>
								<div class="input-group">
								<input id="TramiteEBI" type="text" class="form-control" disabled>
								<button id="habilitarTramiteEBI" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							
							<div class="col-4 separacion-pequeña">
								<label><b>Trámite de A.E.D.M.A.J.R.</b></label><br>
								<div class="input-group">
								<input id="TramiteAEDMAJR" type="text" class="form-control" disabled>
								<button id="habilitarTramiteAEDMAJR" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
						</div>


						<div class="row">
							<div class="col-4 separacion-pequeña">
								<label><b>Nivel de Equivalencia</b></label><br>
								<div class="input-group">
								<input id="NivelEquivalencia" type="text" class="form-control" disabled>
								<button id="habilitarNivelEquivalencia" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							
							<div class="col-4 separacion-pequeña">
								<label><b>RFI_RIUF</b></label>
								<div class="input-group">
								<input id="RFI" type="text" class="form-control" disabled>
								<button id="habilitarRFI" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							
							<div class="col-4 separacion-pequeña">
								<label><b>Tipo de Servidor Público</b></label>
								<div class="input-group">
								<input id="TipoSerPub" type="text" class="form-control" disabled>
								<button id="habilitarTipoSerPub" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							<div class="text-center justify-content-md-center espacio-titulo ui-widget">
				<button id="btnModificar" class="btn btn-primary" type="submit" onclick="modificarDatos()">Modificar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
									<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								  </svg>
							</button>
				</div>
						</div>

						<!-- FIN Seccion -->
						<br>
					</div>
				</div>
			</div>

			<!-- Contenido de la pestaña "Datos de Unidad" -->
			<div class="tab-pane fade" id="datosUnidad" role="tabpanel"
				aria-labelledby="datosUnidad-tab">
				<!-- Agrega tu contenido para la pestaña de Datos de Unidad aquí -->
				<div class="card">
					<div class="card-body">
						<div class="row">
							<div class="col-12">
								<div class="color-hr text-center separacion-pequeña">
									<h5>UNIDAD</h5>
								</div>
							</div>
						</div>
						
						<div class="row">
							<div class="col-3 separacion-pequeña">
								<label><b>Código de la Unidad</b></label>
								<div class="input-group">
								<input type="text" class="form-control" id="codigoUnidad" disabled>
								<button id="habilitarcodigoUnidad" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
							
							<div class="col-9 separacion-pequeña">
								<label><b>Nombre de la Unidad</b></label>
								<div class="input-group">
								<input type="text" class="form-control" id="nombreUnidad" disabled>
								<button id="habilitarnombreUnidad" class="btn btn-outline-danger" type="button" enabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
							</div>
						</div>
						<br>
						
						<!--EMPIEZO CON LAS FUNCIONALIDADES PARA EL MODAL DE DISTRIBUCION-->
						<div class="row">
							<div class="col-12">
								<div class="color-hr text-center separacion-pequeña">
									<h5>CENTRO DE TRABAJO Y DISTRIBUCIÓN</h5>
								</div>
							</div>
						</div>
						<div class="container separacion-pequeña">
							<div class="row">
								<div class="col-6">
									<label><b>Centro de Trabajo</b></label>
									<div class="input-group">
									<input type="text" class="form-control" disabled id="CentroTrabajo" name="otroInputc" />
									<button id="habilitarCentroTrabajo" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
								
								<div class="col-6">
									<label><b>Centro de Distribución</b></label>
									<div class="input-group">
									<input type="text" class="form-control" disabled id="CentroDistribucion" name="CentroDist" />
									<button id="habilitarCentroDistribucion" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
							</div>
						</div>
						<br>
					</div>
					<div
							class="text-center justify-content-md-center espacio-titulo ui-widget">
							<button id="btnModificar1" class="btn btn-primary" type="submit" onclick="modificarDatos()">Modificar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
									<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								  </svg>
							</button>
				</div>
				</div>
			</div>

			<!-- Contenido de la pestaña "Puesto autorizado vs puesto pagado" -->
			<div class="tab-pane fade" id="datosPuesto" role="tabpanel"
				aria-labelledby="datosPuesto-tab">
				<div class="card">
					<div class="card-body">
						<div class="container">
							<div class="row">
								<div class="col-6">
									<div class="color-hr text-center separacion-pequeña">
										<h5>PUESTO AUTORIZADO</h5>
									</div>
								</div>
								<div class="col-6">
									<div class="color-hr text-center separacion-pequeña">
										<h5>PUESTO PAGADO</h5>
									</div>
								</div>

							</div>
						</div>
						<div id="areaDestino"></div>

						<div class="container">

							<div class="row">
								<!-- Formulario a la izquierda -->
								<div class="col-6">
									<div class="formulario-izquierda">

										<!-- Contenedor para el formulario izquierdo -->
										<div class="container">
											<div class="col-12 separacion-pequeña">
												<label><b>Código del Puesto</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="CodigoPuesto" disabled />
												<button id="habilitarCodigoPuesto" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Descripción</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="descripcion" disabled />
												<button id="habilitardescripcion" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Tipo</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="tipo" disabled />
												<button id="habilitartipo" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Zona</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="Zona" disabled />
												<button id="habilitarZona" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Nivel</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="nivel" disabled />
												<button id="habilitarnivel" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Contratación</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="contratacion" disabled />
												<button id="habilitarcontratacion" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Categoría</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="categoria" disabled />
												<button id="habilitarcategoria" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Subcategoría</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="subcategoria" disabled />
												<button id="habilitarsubcategoria" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Clasificación Interna</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="classif_interna" disabled />
												<button id="habilitarclassif_interna" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>

											<div class="col-12 separacion-pequeña">
												<label><b>Declaración Patrimonial</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="declaracion_patri" disabled />
												<button id="habilitardeclaracion_patri" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>

										</div>
									</div>
								</div>

								<!-- Formulario a la derecha -->
								<div class="col-6">
									<div class="formulario-izquierda">

										<!-- Contenedor para el formulario derecho -->
										<div class="container">
											<div class="col-12 separacion-pequeña">
												<label><b>Código del Puesto</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="CodigoPuesto1" disabled />
												<button id="habilitarCodigoPuesto1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Descripción</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="descripcion1" disabled />
												<button id="habilitardescripcion1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Tipo</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="tipo1" disabled />
												<button id="habilitartipo1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Zona</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="Zona1" disabled />
												<button id="habilitarZona1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Nivel</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="nivel1" disabled />
												<button id="habilitarnivel1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Contratación</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="contratacion1" disabled />
												<button id="habilitarcontratacion1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Categoría</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="categoria1" disabled />
												<button id="habilitarcategoria1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Subcategoría</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="subcategoria1" disabled />
												<button id="habilitarsubcategoria1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>
											
											<div class="col-12 separacion-pequeña">
												<label><b>Clasificación Interna</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="classif_interna1" disabled />
												<button id="habilitarclassif_interna1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>

											<div class="col-12 separacion-pequeña">
												<label><b>Declaración Patrimonial</b></label>
												<div class="input-group">
												<input type="text" class="form-control" id="declaracion_patri1" disabled />
												<button id="habilitardeclaracion_patri1" class="btn btn-outline-danger" type="button" enabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
												</button>
												</div>
											</div>

										</div>
									</div>
								</div>
							</div>
						</div>
						<br>
					</div>
					<div
							class="text-center justify-content-md-center espacio-titulo ui-widget">
							<button id="btnModificar2" class="btn btn-primary" type="submit" onclick="modificarDatos()">Modificar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
									<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								  </svg>
							</button>
				</div>
				</div>
			</div>

			<!-- Contenido de la pestaña "Datos Persona" -->
			<div class="tab-pane fade " id="datosPersona" role="tabpanel"
				aria-labelledby="datosPersona-tab">
				<!--fade-->
				<div class="card">
					<div class="card-body">

						<!-- INICIO bloque 1 input de buscar persona mas botones de buscar y habilitar busqueda -->
						<div
							class="text-center justify-content-md-center separacion-pequeña ui-widget">
							<div class="autoComplete_wrapper">
								<input id="inpBuscar" class="resaltar-buscador" type="search"
									dir="ltr" spellcheck="false" autocorrect="off"
									autocomplete="off" autocapitalize="off">
							</div>
							<button id="btnBuscarPersona" type="button"
								class="btn btn-primary">Buscar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
									<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
								</svg>
							</button>
						</div>
						
						<!-- FIN bloque 1 input de buscar persona mas botones de buscar y habilitar busqueda -->

						<div class="row">
							<div class="col-12 separacion-pequeña">
								<div class="color-hr text-center separacion-pequeña">
									<h5>DATOS DE PERSONA</h5>
								</div>
							</div>
						</div>
						<!-- Seccion -->
						<div id="myDIV" class="text-left separacion-pequeña">

							<div class="row justify-content-md-center">
								<div class="col-4">
									<label><b>Nombre(s)</b></label>
									<div class="input-group">
									<input id="inpNombre" type="text" class="form-control" disabled>
									<button id="habilitarinpNombre" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
								
								<div class="col-4">
									<label><b>Apellido Paterno</b></label>
									<div class="input-group">
									<input id="inpApellidoPat" type="text" class="form-control" disabled>
									<button id="habilitarinpApellidoPat" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
								
								<div class="col-4">
									<label><b>Apellido Materno</b></label>
									<div class="input-group">
									<input id="inpApellidoMat" type="text" class="form-control" disabled>
									<button id="habilitarinpApellidoMat" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
							</div>

							<div class="row justify-content-md-center">
								<div class="col-4 separacion-pequeña">
									<label><b>No. Empleado</b></label>
									<div class="input-group">
									<input id="inpNumEmpleado" type="text" class="form-control" oninput="validarNumero(this)" disabled>
									<button id="habilitarinpNumEmpleado" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>

								<div class="col-4 separacion-pequeña">
									<label><b>Curp</b></label>
									<div class="input-group">
									<input id="inpCurp" type="text" class="form-control" oninput="validarNumero(this)" disabled>
									<button id="habilitarinpCurp" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>

								<div class="col-4 separacion-pequeña">
									<label><b>Nivel</b></label><br>
									<div class="input-group">
									<input id="Nivel" type="text" class="form-control" oninput="validarNumero(this)" disabled>
									<button id="habilitarNivel" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>

							</div>

						</div>
						
						<div class="row">
							<div class="col-12 separacion-pequeña">
								<div class="color-hr text-center separacion-pequeña">
									<h5>VIGENCIA</h5>
								</div>
							</div>
						</div>
						
						<div id="myDIV" class="text-left separacion-pequeña">

							<div class="row justify-content-md-center">
								<div class="col-4">
									<label><b>Inicio de Vigencia</b></label><span style="color: red;">*</span>
									<div class="input-group">
									<input id="inpInicioVigencia" type="date" class="form-control" disabled>
									<button id="habilitarinpInicioVigencia" class="btn btn-outline-danger" type="button" enabled>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
								
								<div class="col-4">
									<label><b>Fin de Vigencia</b></label>
									<div class="input-group">
									<input id="inpFinVigencia" type="date" class="form-control" disabled>
									<button id="habilitarinpFinVigencia" class="btn btn-outline-danger" type="button" enabled onclick="habilitar()">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
										</svg>
									</button>
									</div>
								</div>
							</div>
							<div class="row justify-content-md-center">
								<div class="col-md-auto">
									<br>
									<div class="custom-bg-color rounded p-2"> <!-- Clase personalizada para un rectángulo con color de fondo E0e0e0 y padding -->
										<div class="form-check">
											<input class="form-check-input" type="checkbox" value="" id="checkSinVencimiento" disabled>
											<label class="form-check-label" for="checkSinVencimiento" style="margin-left: 5px;">
												Sin fecha de vencimiento 
											</label>
										</div>
									</div>
								</div>
							</div>

							<style>
								.custom-bg-color {
    background-color: #E0E0E0;
}

							</style>
							
							
							
							
							

						</div>
						
						<div
							class="text-center justify-content-md-center espacio-titulo ui-widget">
							
							<button id="btnModificar3" class="btn btn-primary" type="submit" onclick="modificarDatos()">Modificar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
									<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
									<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								  </svg>
							</button>
							<button id="btnLimpiarPersona" class="btn btn-primary"
								type="submit" onclick="limpiarInputs()" enabled>Limpiar Persona
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
									<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
								</svg>
							</button>
							<button id="btnAsignarPlaza" class="btn btn-success"
								type="submit" enabled onclick="asignarPlaza()">Asignar Plaza
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
									<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
								</svg>
							</button>
							<button id="btnGuardarCambios" class="btn btn-primary"
								type="submit" enabled onclick="guardarDatos()">Guardar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
									<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
									<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
								  </svg>
							</button>

						</div>
						<br>
						<!-- FIN Seccion -->
					</div>
				</div>
			</div>


			<!-- Contenido de la pestaña "Datos Plaza" -->

			<!-- Inicio seccion datos de control -->

			<div class="tab-pane fade" id="datosControl" role="tabpanel"
				aria-labelledby="datosControl-tab">
				<!-- Agrega tu contenido para la pestaña de Datos de Unidad aquí -->

				<div class="card">
					<div class="card-body">

						<div class="color-hr text-center separacion-pequeña">
							<h5>DATOS DE CONTROL</h5>
						</div>

						<div>
							<div class="row justify-content-md-center">

								<div class="col-4 separacion-pequeña">
									<b>Fecha Inicio</b> <input id="inpFechaInicio"
										class="form-control text-center" type="text" disabled>
								</div>

								<div class="col-4 separacion-pequeña">
									<b>Fecha Término</b> <input id="inpFechaTermino"
										class="form-control text-center" type="text" disabled>
								</div>

								<div class="col-4 separacion-pequeña">
									<b>Usuario que Capturó</b> <input id="inpUsuarioCapturo"
										class="form-control text-center" type="text" disabled>
								</div>

							</div>

							<div class="row justify-content-md-center">

								<div class="col-4 separacion-pequeña">
									<b>Fecha de Modificación</b> <input id="inpFechaModificacion"
										class="form-control text-center" type="text" disabled>
								</div>

								<div class="col-4 separacion-pequeña">
									<b>Usuario que Modificó</b> <input id="inpUsuarioModifico"
										class="form-control text-center" type="text" disabled>
								</div>

								<div class="col-4 separacion-pequeña">
									<b>Situación</b> <input id="inpSituacion"
										class="form-control text-center" type="text" disabled>
								</div>

							</div>
						</div>
						<br>
					</div>
				</div>

			</div>

			<!-- Fin seccion datos de control -->

		</div>


	</div>


</div>

<br>
<br>
<br>
<script src="js/footer.js"></script>
<script src="js/modifica_plaza_persona.js"></script>

<%@ include file="common/footer.jsp"%>