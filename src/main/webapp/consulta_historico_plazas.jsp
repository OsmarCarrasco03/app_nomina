<%@ include file="common/header-sesion.jsp" %>
	<title>Consultar Historico de Plazas</title>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

			<div class="container rounded div-padding input-color div-separacion-mediana">
				<div class="col-md-12 text-center separacion-pequeña">

					<div class="row" class="col-6">
							<div class="text-center">
								<h3>CONSULTAR HISTORICO DE PLAZAS</h3>
							</div>
					</div>
				</div>
		    </div>
  
			  <!-- EMPIEZA LAS CONSULTAS DE PLAZAS -->

			<div class="container centered-container" id="forms" style="overflow: hidden;">

				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<button class="nav-link active" id="datosPlazasPorPersona-tab" data-bs-toggle="tab"
							data-bs-target="#datosPlazasPorPersona" type="button" role="tab"
							aria-controls="datosPlazasPorPersona" aria-selected="true">Plazas por persona</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="datosPersonasPorPlaza-tab" data-bs-toggle="tab"
							data-bs-target="#datosPersonasPorPlaza" type="button" role="tab"
							aria-controls="datosPersonasPorPlaza" aria-selected="false">Personas por Plaza</button>
					</li>
				</ul>

				<div class="tab-content" id="myTabContent">
					<!--  AQUI EMPIEZA DATOS PLAZAS POR PERSONA-->
					<div class="tab-pane fade show active" id="datosPlazasPorPersona" role="tabpanel"
						aria-labelledby="datosPlazasPorPersona-tab">
						<div class="card">
							<div class="card-body">

								<div class="row ">
									<div class="text-center">
										<hr>
										<div class="color-hr">
											<h5>DATOS DE PLAZAS POR PERSONA</h5>
										</div>
										<hr>
									</div>

									<div class="text-center justify-content-md-center ui-widget">

										<input id="autoCompletePersona" type="search" dir="ltr" spellcheck="false"
											autocorrect="off" autocomplete="off" autocapitalize="off">
										<button id="botonpersona" type="button" class="btn btn-primary" onclick="obtenerInfoPersona()">Buscar
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
												<path
													d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
											</svg>
										</button>

										<button type="button" class="btn btn-danger" id="limpiarCampos"
											onclick="limpiarTabla2()">Limpiar
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
												<path
													d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
											</svg>
										</button>

									</div>
									<div class="text-center justify-content-md-center ui-widget">
										<br>
									</div>

									<div class="col-md-3">
										<label><b>CURP</b></label> <input type="text"
											class="form-control" value="" id="id_curp" disabled />
									</div>

									<div class="col-md-3">
										<label><b>Nombre Completo</b></label> <br> <input type="text"
											class="form-control" id="nombrePersona" value=""
											onchange="consultarPersona()" disabled />
									</div>

									<div class="col-md-3">
										<label><b>Número de Empleado</b></label> <input type="text"
											class="form-control" value="" id="no_empleado" disabled />
									</div>

									<div class="col-md-3">
										<label><b>Situación del Empleado</b></label> <input type="text"
											class="form-control" value="" id="situacion_empleadoPersona" disabled />
									</div>

								</div>
							</div>

							
							<div class="text-center espacio-titulo">
								<h5><b>"Plazas de esta persona"</b></h5>
							</div>

							<br>

							<div id="forms" class="container separacion-mediana"  style="overflow-x: auto;">
								<div id="forms" class="container separacion-mediana" >
									<div class="tablaDiv">
										<table id="Datostabla2" class="table table-bordered">
											<thead class="text-center align-middle table-success">
												<tr>
													<th colspan = "2" style="text-align: center;">Fecha</th>
													<th colspan = "9" style="text-align: center;">Puesto Pagado</th>
													<th colspan = ""></th>
													<th colspan = "2" style="text-align: center;">Centro</th>
												</tr>
												<tr>
													<!-- <th style="visibility: hidden;">Id</th> -->
													<th>Inicio</th>
													<th>Termino</th>
													<th>Num Plaza</th>
													<th>Plaza Padre</th>
													<th>Código</th>
													<th>Descripción</th>
													<th>Tipo</th>
													<th>Zona</th>
													<th>Nivel</th>
													<th>Contratación</th>
													<th>Categoría</th>
													<th>Unidad</th>
													<th>Distribución</th>
													<th>Trabajo</th>
												</tr>
											</thead>
											<tbody class="text-center align-middle">
											
											</tbody>
										</table>
									</div>
								</div>

							</div>
						  


				        </div>


					
						<br><br><br>


				    </div>

			     	<!-- AQUI FINALIZA EL MÓDULO DE DATOS PLAZAS POR PERSONA -->






			     	<!-- ///////////////////////////////////////////PLAZA//////////////////////////////////////////////////////// -->

				  <!-- DATOS PERSONAS POR PLAZA-->
			     	<div class="tab-pane fade" id="datosPersonasPorPlaza" role="tabpanel"
					aria-labelledby="datosPersonasPorPlaza-tab">
					<div class="card">
						<div class="card-body">



							<div class="row ">

								<div class="text-center ">
									<hr>
									<div class="color-hr">
										<h5>DATOS DE PERSONAS POR PLAZA</h5>
									</div>
									<hr>
								</div>



								<div class="text-center justify-content-md-center ui-widget">

									<input id="autoCompletePlaza" type="search" dir="ltr" spellcheck="false"
										autocorrect="off" autocomplete="off" autocapitalize="off">
									<button id="botonplaza" type="button" class="btn btn-primary">Buscar
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
											<path
												d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
										</svg>
									</button>
									<button type="button" class="btn btn-danger" id="limpiartabla"
										onclick="limpiarTabla()">Limpiar
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
											<path
												d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
										</svg>
									</button>
								</div>


								<div class="row">
									<div class="row">
										<div class="col-md-12 text-center separacion-pequeña">
								
										<!-- <div class="text-center separacion-pequeña"><br> -->
											<div class="color-hr">
												<p><b>DATOS DE PLAZA</b></p>
											</div>
										</div>
									</div>

									<div class="col-md-2">
										<label><b>Número de Plaza</b></label> <input type="text" class="form-control"
											id="num_plazaPlaza" value="" disabled />
									</div>
									<div class="col-md-2">
										<label><b>Plaza Padre</b></label> <input type="text" class="form-control" value=""
											id="plaza_padrePlaza" disabled />
									</div>
								</div>

								<div class="row">
									<div class="col-md-2 separacion-pequeña">
										<b>Unidad</b> 
										<input type="text" class="form-control" id="descripcion_unidad" value="" disabled />
										
									</div>
									<div class="col-md-8 separacion-pequeña">
										<b><br></b> 
										<input type="text" class="form-control" id="unidadPlaza" value="" disabled />
									</div>
								</div>

								<div class="row">

									<div class="col-md-2 separacion-pequeña">
										<label><b>Centro de Distribución</b></label> <input type="text" class="form-control"
											value="" id="clave_centro_distPlaza" disabled />
									</div>
									<div class="col-md-8 separacion-pequeña">
										<b><br></b> 
										<input type="text" class="form-control" id="centro_distPlaza" value="" disabled />
									</div>
								</div>

								<div class="row">
									<div class="col-md-2 separacion-pequeña">
										<label><b>Centro de Trabajo</b></label> <input type="text" class="form-control"
											id="clave_centro_trabajoPlaza" disabled />

									</div>
									<div class="col-md-8 separacion-pequeña">
										<b><br></b> 
										<input type="text" class="form-control" id="centro_trabajoPlaza" value="" disabled />
									</div>
								</div>



								<div class="row">
									<div class="col-md-12 text-center separacion-pequeña">
							
									<!-- <div class="text-center separacion-pequeña"><br> -->
										<div class="color-hr">
											<p><b>DATOS DE PUESTO</b></p>
										</div>
									</div>
								</div>

								<div class="col-md-3">
									<label><b>Codigo de Puesto</b></label> <input type="text" class="form-control"
										id="codigo_puestoPlaza" onchange="consultarPersona()" disabled />
								</div>

								<div class="col-md-3">
									<label><b>Descripción del Puesto</b></label> <input type="text" class="form-control"
										id="descripcion_puestoPlaza" onchange="consultarPersona()" disabled />
								</div>

								<div class="col-md-3">
									<label><b>Tipo</b></label> <input type="text" class="form-control" id="tipoPlaza"
										onchange="consultarPersona()" disabled />
								</div>
								<div class="col-md-3">
									<label><b>Zona</b></label> <input type="text" class="form-control" id="zonaPlaza"
										onchange="consultarPersona()" disabled />
								</div>
								<div class="col-md-3">
									<label><b>Nivel</b></label> <input type="text" class="form-control" id="nivelPlaza"
										onchange="consultarPersona()" disabled />
								</div>
								<div class="col-md-3">
									<label><b>Contratación</b></label> <input type="text" class="form-control"
										id="contratacionPlaza" onchange="consultarPersona()" disabled />
								</div>
								<div class="col-md-3">
									<label><b>Categoría</b></label> <input type="text" class="form-control"
										id="categoriaPlaza" onchange="consultarPersona()" disabled />
								</div>


							</div>

							<div class="row justify-content-md-center div-separacion-debajo">

								<style>
									table {
										width: 100%;
										border-collapse: collapse;
									}

									th,
									td {
										padding: 12px 15px;
										text-align: left;
										border-bottom: 1px solid #ddd;
									}

									th {
										background-color: #f2f2f2;
									}

									tr:hover {
										background-color: #f5f5f5;
									}
								</style>
								</head>

							</div>

							<div class="container rounded div-padding input-color separacion-pequeña">

								<div class="text-center espacio-titulo">
									<h5><b>"Personas con esta plaza"</b></h5>
								</div>

								<br>

								<div class="container separacion-mediana" id="forms" style="overflow-x: auto;">
									<div class="container separacion-mediana" id="forms">
										<!-- <style>
											.oculto {
												visibility: hidden;
											}
										</style> -->

										<body>


											<!-- <style>
												.oculto {
													visibility: hidden;
												}
											</style> -->

											<table id="Datostabla1" class="table table-bordered">
												<thead class="text-center align-middle table-success">
													<tr>
														<!-- <th style="visibility: hidden;">Id</th> -->
														<th>Inicio</th>
														<th>Termino</th>
														<th>Nombre</th>
														<th>Apellido Paterno</th>
														<th>Apellido Materno</th>
														<th>CURP</th>
														<th>No. Empleado</th>
													</tr>
												</thead>
												<tbody>

												</tbody>
											</table>

										</body>

									</div>
								</div>



							</div>

						</div>
					</div>
				  </div>
				</div>






			</div>



			<script src="js/consulta_historico_plazas.js"></script>
			<%@ include file="common/footer.jsp" %>