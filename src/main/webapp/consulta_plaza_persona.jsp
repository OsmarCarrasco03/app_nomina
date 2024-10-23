<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

			<div class="container rounded div-padding input-color div-separacion-mediana">
				<div class="text-center espacio-titulo ">

					<h3>CONSULTAR PLAZA POR PERSONA</h3>

				</div>
				<br>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="SwitchPlaza" checked>
					<label class="form-check-label" for="flexSwitchCheckCheckedDisabled">Busqueda por plaza</label>
				</div>
				<div class="form-check form-switch">
					<input class="form-check-input" type="checkbox" id="SwitchPersona">
					<label class="form-check-label" for="flexSwitchCheckDefault">Busqueda por persona</label>
				</div>
				<br>


				<!-- Inicio Busqueda ID Plaza -->

				<div class="row">
					<div class="autoComplete_wrapper">
						<div class="row">
							<div class="col-8 separacion-pequeña">
								<input id="autoCompleteNumPlaza" class="resaltar-buscador" type="search" dir="ltr"
									spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off"
									size="70" style="width: 100%; border: 1px solid">
							</div>






							<div class="col-4 separacion-pequeña">

								<button type="button" class="btn btn-primary" data-descripcion="1"
									id="btnBuscarPlaza">Buscar
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-search" viewBox="0 0 16 16">
										<path
											d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
									</svg>
								</button>


								<!-- INICIO boton Servicio -->
								<button style="margin-left: 20px;" type="button" class="btn btn-success"
									id="btnHabilitarBusqueda" disabled>Habilitar
									Busqueda
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-binoculars-fill" viewBox="0 0 16 16">
										<path
											d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z" />
									</svg>
								</button>

								<!-- FIN boton Servicio -->
							</div>

						</div>
					</div>
				</div>
				

				<!-- Inicio Busqueda ID Persona -->

				<div class="row">
					<div class="autoComplete_wrapper1" style="display: none;">
						<div class="row">
							<div class="col-8 separacion-pequeña">
								<input id="autoCompleteNumPersona" class="resaltar-buscador" type="search" dir="ltr"
									spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off" size="70"
									style="width: 100%; border: 1px solid">
							</div>
				
							<div class="col-4 separacion-pequeña">
				
								<button type="button" class="btn btn-primary" data-descripcion="1" id="btnBuscarPersona"
									style="display: none;">Buscar
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-search" viewBox="0 0 16 16">
										<path
											d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
									</svg>
								</button>
				
								<!-- INICIO boton Servicio -->
								<button style="margin-left: 20px;" type="button" class="btn btn-success" id="btnHabilitarBusquedaPersona"
									disabled style="display: none;">Habilitar
									Búsqueda
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-binoculars-fill" viewBox="0 0 16 16">
										<path
											d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				
				
				
				<br>
				<div class="container" id="forms">

					<!-- Inicio Pestañas -->
					<ul class="nav nav-tabs" id="Tabs" role="tablist">
						<li class="nav-item" role="presentation">
							<button class="nav-link active" id="datosPlaza-tab" data-bs-toggle="tab"
								data-bs-target="#datosPlaza" type="button" role="tab" aria-controls="datosPlaza"
								aria-selected="true">Plaza
							</button>
						</li>
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="datosUnidad-tab" data-bs-toggle="tab"
								data-bs-target="#datosUnidad" type="button" role="tab" aria-controls="datosUnidad"
								aria-selected="false">Unidad</button>
						</li>
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="datosPuesto-tab" data-bs-toggle="tab"
								data-bs-target="#datosPuesto" type="button" role="tab" aria-controls="datosPuesto"
								aria-selected="false">Puesto</button>
						</li>
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="datosPersona-tab" data-bs-toggle="tab"
								data-bs-target="#datosPersona" type="button" role="tab" aria-controls="datosPersona"
								aria-selected="false">Persona</button>
						</li>
						<li class="nav-item" role="presentation">
							<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
								data-bs-target="#datosControl" type="button" role="tab" aria-controls="datosControl"
								aria-selected="false" hidden>Datos de Control</button>
						</li>
					</ul>

					<!-- Contenido de las Pestañas -->
					<div class="tab-content" id="TabContent">
						<!-- Contenido de la pestaña "Datos Plaza" -->
						<div class="tab-pane fade show active" id="datosPlaza" role="tabpanel"
							aria-labelledby="datosPlaza-tab">
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
												<b>Número de Plaza</b> <input id="numeroPlaza" type="text"
													class="form-control" oninput="validarNumero(this)" disabled>
											</div>
										</div>

										<div class="row justify-content-md-center">
											<div class="col-4 separacion-pequeña">
												<b>Número de Plaza Padre</b> <input id="numeroPlazaPadre" type="text"
													class="form-control" oninput="validarNumero(this)" disabled>
											</div>
											<div class="col-4 separacion-pequeña">
												<b>Codigo Inteligente Rhnet </b> <input id="codigoIR" type="text"
													class="form-control" disabled>
											</div>
											<div class="col-4 separacion-pequeña">

												<b>Estatus Ocupacional</b><br> <input id="EstatusOcupàcional"
													type="text" class="form-control" disabled>
											</div>
										</div>
									</div>
									<div class="row">
										<div class="col-4 separacion-pequeña">
											<b>Motivos de Obligación de Declaración Patrimonial</b> <br>
											<input id="MotivosDeObligacion" type="text" class="form-control" disabled>
										</div>

										<div class="col-4 separacion-pequeña">
											<b>Áreas</b><br>
											<b>‎ </b><input id="Areas" type="text" class="form-control" disabled>
										</div>
										<div class="col-4 separacion-pequeña">
											<b>Contrataciones Públicas</b><br>
											<b>‎ </b><input id="ContratacionesPublicas" type="text" class="form-control"
												disabled>
										</div>
									</div>
									<div class="row">
										<div class="col-4 separacion-pequeña">
											<b>Trámite de C.L.A.P.P.</b> <br> <input id="tramiteCLAPP" type="text"
												class="form-control" disabled>
										</div>
										<div class="col-4 separacion-pequeña">
											<b>Trámite de E.B.I.</b> <br> <input id="TramiteEBI" type="text"
												class="form-control" disabled>
										</div>
										<div class="col-4 separacion-pequeña">
											<b>Trámite de A.E.D.M.A.J.R.</b> <br> <input id="TramiteAEDMAJR" type="text"
												class="form-control" disabled>
										</div>

									</div>


									<div class="row">
										<div class="col-4 separacion-pequeña">
											<b>Nivel de Equivalencia</b> <br> <input id="NivelEquivalencia" type="text"
												class="form-control" disabled>
										</div>
										<div class="col-4 separacion-pequeña">
											<b>RFI_RIUF</b> <input id="RFI" type="text" size="100" style="width: 100%;"
												class="form-control" disabled>
										</div>
										<div class="col-4 separacion-pequeña">
											<b>Tipo de Servidor Público</b> <input id="TipoSerPub" type="text"
												class="form-control" style="width: 100%;" size="100" disabled>
										</div>
									</div>

									<!-- FIN Seccion -->
									<br>
								</div>
							</div>
						</div>

						<!-- Contenido de la pestaña "Datos de Unidad" -->
						<div class="tab-pane fade" id="datosUnidad" role="tabpanel" aria-labelledby="datosUnidad-tab">
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
											<label><b>Código de la Unidad</b></label> <input type="text"
												class="form-control" id="codigoUnidad" disabled>
										</div>
										<div class="col-9 separacion-pequeña">
											<label><b>Nombre de la Unidad</b></label> <input type="text"
												class="form-control" id="nombreUnidad" disabled>
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
												<b>Centro de Trabajo</b> <input type="text" class="form-control"
													disabled id="CentroTrabajo" name="otroInputc" />
											</div>
											<div class="col-6">
												<b>Centro de Distribución</b> <input type="text" class="form-control"
													disabled id="CentroDistribucion" name="" />
											</div>
										</div>
									</div>
									<br>
								</div>
							</div>
						</div>

						<!-- Contenido de la pestaña "Puesto autorizado vs puesto pagado" -->
						<div class="tab-pane fade" id="datosPuesto" role="tabpanel" aria-labelledby="datosPuesto-tab">
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
															<label><b>Código del Puesto</b></label> <input type="text"
																class="form-control" id="CodigoPuesto" disabled />

														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Descripción</b></label> <input type="text"
																class="form-control" id="descripcion" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Tipo</b></label> <input type="text"
																class="form-control" id="tipo" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Zona</b></label> <input type="text"
																class="form-control" id="Zona" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Nivel</b></label> <input type="text"
																class="form-control" id="nivel" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Contratación</b></label> <input type="text"
																class="form-control" id="contratacion" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Categoría</b></label> <input type="text"
																class="form-control" id="categoria" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Subcategoría</b></label> <input type="text"
																class="form-control" id="subcategoria" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Clasificación Interna</b></label> <input
																type="text" class="form-control" id="classif_interna"
																disabled />
														</div>

														<div class="col-12 separacion-pequeña">
															<label><b>Declaración Patrimonial</b></label> <input
																type="text" class="form-control" id="declaracion_patri"
																disabled />
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
															<label><b>Código del Puesto</b></label> <input type="text"
																class="form-control" id="CodigoPuesto1" disabled />

														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Descripción</b></label> <input type="text"
																class="form-control" id="descripcion1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Tipo</b></label> <input type="text"
																class="form-control" id="tipo1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Zona</b></label> <input type="text"
																class="form-control" id="Zona1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Nivel</b></label> <input type="text"
																class="form-control" id="nivel1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Contratación</b></label> <input type="text"
																class="form-control" id="contratacion1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Categoría</b></label> <input type="text"
																class="form-control" id="categoria1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Subcategoría</b></label> <input type="text"
																class="form-control" id="subcategoria1" disabled />
														</div>
														<div class="col-12 separacion-pequeña">
															<label><b>Clasificación Interna</b></label> <input
																type="text" class="form-control" id="classif_interna1"
																disabled />
														</div>

														<div class="col-12 separacion-pequeña">
															<label><b>Declaración Patrimonial</b></label> <input
																type="text" class="form-control" id="declaracion_patri1"
																disabled />
														</div>

													</div>
												</div>
											</div>
										</div>
									</div>
									<br>
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
												<label><b>Nombre(s)</b></label><input id="inpNombre" type="text"
													class="form-control" disabled>

											</div>
											<div class="col-4">
												<b>Apellido Paterno</b> <input id="inpApellidoPat" type="text"
													class="form-control" disabled>
											</div>
											<div class="col-4">
												<b>Apellido Materno</b> <input id="inpApellidoMat" type="text"
													class="form-control" disabled>
											</div>
										</div>

										<div class="row justify-content-md-center">
											<div class="col-4 separacion-pequeña">
												<b>No. Empleado</b> <input id="inpNumEmpleado" type="text"
													class="form-control" oninput="validarNumero(this)" disabled>
											</div>

											<div class="col-4 separacion-pequeña">
												<b>Curp</b> <input id="inpCurp" type="text" class="form-control"
													oninput="validarNumero(this)" disabled>
											</div>

											<div class="col-4 separacion-pequeña">
												<b>Nivel</b><br> <input id="Nivel" type="text" class="form-control"
													oninput="validarNumero(this)" disabled>
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
												<b>Inicio de Vigencia</b><span style="color: red;">*</span> <input
													id="inpInicioVigencia" type="date" class="form-control" disabled>
											</div>
											<div class="col-4">
												<b>Fin de Vigencia</b> <input id="inpFinVigencia" type="date"
													class="form-control" disabled>
											</div>
										</div>
										<div class="row justify-content-md-center">
											<div class="col-md-auto">
												<br>
												<div class="custom-bg-color rounded p-2">
													<!-- Clase personalizada para un rectángulo con color de fondo E0e0e0 y padding -->
													<div class="form-check">
														<input class="form-check-input" type="checkbox" value=""
															id="checkSinVencimiento" disabled>
														<label class="form-check-label" for="checkSinVencimiento"
															style="margin-left: 5px;">
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

									<!-- <div class="text-center justify-content-md-center espacio-titulo ui-widget">

										<button id="btnLimpiarPersona" class="btn btn-primary" type="submit"
											onclick="limpiarInputs()" disabled>Limpiar Persona
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
												<path
													d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
											</svg>
										</button>
										<button id="btnGuardarCambios" class="btn btn-success" type="submit" disabled
											onclick="guardarDatos()">Nueva Busqueda
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
												<path
													d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
											</svg>
										</button>

									</div> -->
									<br>
									<!-- FIN Seccion -->
								</div>
							</div>
						</div>


						<!-- Contenido de la pestaña "Datos Plaza" -->

						<!-- Inicio seccion datos de control -->

						<div class="tab-pane fade" id="datosControl" role="tabpanel" aria-labelledby="datosControl-tab">
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
			<script src="js/consulta_plaza_persona.js"></script>



			<%@ include file="common/footer.jsp" %>