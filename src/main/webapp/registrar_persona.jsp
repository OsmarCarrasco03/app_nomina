<title>Registro Persona</title>
<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
			<br><br><br>
			<div class="container rounded div-padding input-color ">
				<div class="text-center espacio-titulo ">
					<h3>REGISTRO DE EMPLEADOS</h3>
				</div>
			</div>

			<div class="container centered-container" id="forms" style="overflow: hidden;">

				<ul class="nav nav-tabs" id="myTab" role="tablist">
					<li class="nav-item" role="presentation">
						<button class="nav-link active" id="datosGenerales-tab" data-bs-toggle="tab"
							data-bs-target="#datosGenerales" type="button" role="tab" aria-controls="datosGenerales"
							aria-selected="true">Datos
							Generales</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="datosEmpleado-tab" data-bs-toggle="tab"
							data-bs-target="#datosEmpleado" type="button" role="tab" aria-controls="datosEmpleado"
							aria-selected="false">Datos
							de Empleado</button>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="datosComplementarios-tab" data-bs-toggle="tab"
							data-bs-target="#datosComplementarios" type="button" role="tab"
							aria-controls="datosComplemenatrios" aria-selected="false">Datos Complementarios</button>
						<br>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="datos_hijos-tab" data-bs-toggle="tab" data-bs-target="#datos_hijos"
							type="button" role="tab" aria-controls="datos_hijos" aria-selected="false">Curp de
							Hijos</button>
						<br>
					</li>
					<li class="nav-item" role="presentation">
						<button class="nav-link" id="datosCentro-tab" data-bs-toggle="tab" data-bs-target="#datosCentro"
							type="button" role="tab" aria-controls="datosCentro" aria-selected="false" hidden>Datos de
							centro de trabajo y distribucion</button>
					</li>
					<li hidden class="nav-item" role="presentation">
						<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
							data-bs-target="#datosControl" type="button" role="tab" aria-controls="datosControl"
							aria-selected="false">
							Datos de control<br>
							<img src="bootstrap-icons/lock-fill.svg" alt="Lock Icon">
						</button>
						</button>
					</li>
				</ul>


				<div class="tab-content" id="myTabContent">
					<!--  AQUI EMPIEZA LA PARTE GENERAL DE LOS DATOS -->
					<div class="tab-pane fade show active" id="datosGenerales" role="tabpanel"
						aria-labelledby="datosGenerales-tab">
						<div class="card">
							<div class="card-body">
								<div class="row" class="col-6">
									<div class="text-center ">
										<div class="color-hr">
											<h6>DATOS GENERALES</h6>
										</div>
									</div>
								</div>
								<div class="row ">

									<div class="col-md-4">
										<label class="custom-label" class="required-field">Nombre<span
												class="required-field">*</span></label> <input class="form-control"
											type="text" onkeypress="return soloLetras(event)" id="nombre"
											placeholder="Nombre(s)">
									</div>

									<div class="col-md-4">
										<label class="custom-label">Apellido Paterno<span class="required-field">
												*</span></label> <input type="text" class="form-control"
											id="apellidopaterno" placeholder="Apellido paterno"
											onkeypress="return soloLetras(event)" />
									</div>

									<div class="col-md-4">
										<label class="custom-label"> Apellido Materno<span class="required-field">*
											</span></label> <input type="text" class="form-control" id="apellidomaterno"
											placeholder="Apellido materno	" onkeypress="return soloLetras(event)" />
									</div>

									<div class="col-md-4">
										<label class="custom-label" for="fecha_nacimiento">Fecha
											de nacimiento (DD-MM-AAAA)*:</label>
										<div class="input-group">

											<select class="form-select me-3" id="dia" name="dia" style="width: 80px;"
												maxlength="2">
												<option value="">DD</option>

											</select> <select class="form-select me-3" id="mes" name="mes"
												style="width: 80px;" maxlength="2">
												<option value="">MM</option>

											</select> <input type="text" class="form-control mx-2" id="anio" name="anio"
												style="width: 100px;" maxlength="4" placeholder="Año">




											<div class="input-group-append">
												<button class="btn btn-outline-secondary" type="button"
													id="calendario-icon">
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
														<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
													</svg>
												</button>
											</div>
										</div>
									</div>

									<div class="col-md-4">
										<label class="custom-label" for="sexo">Género<span class="required-field">
												*</span></label> <select class="form-select" id="genero" name="sexo">

										</select>
									</div>

									<div class="col-md-4">
										<label class="custom-label">Estado civil<span class="required-field">
												*</span></label> <select id="estadocivil" class="form-select"
											aria-label="Default select example">
										</select>
									</div>

									<div class="col-md-4">
										<label class="custom-label">Nacionalidad<span class="required-field">
												*</span></label> <select id="nacionalidad" class="form-select"
											aria-label="Default select example">
										</select>
									</div>


									<div class="col-md-4">
										<label class="custom-label">Estado de origen <span class="required-field">
												*</span></label> <select id="estado" class="form-select"
											aria-label="Default select example">
										</select>
									</div>

									<div class="col-md-4">
										<label class="custom-label">
											Municipio de origen
											<span class="tooltip-icon" data-toggle="tooltip" data-placement="top"
												data-original-title="Este campo no es obligatorio">&#9432;</span>
										</label>
										<select id="municipio" class="form-select"
											aria-label="Default select example"></select>
									</div>


									<div class="col-md-4">
										<label class="custom-label"> Curp<span class="required-field">* </span></label>
										<input type="text" class="form-control" id="curp2"
											onkeypress="return soloLetrasNumeros(event)" oninput="validarCURP(this)"
											placeholder="Ej. ROSI010401HMCDNVA6" />
									</div>

									<div class="col-md-4">
										<label class="custom-label"> RfC<span class="required-field">* </span></label>
										<input type="text" onkeypress="return soloLetrasNumerosrfc(event)"
											class="form-control" id="rfc" placeholder="Ej. ROSI010401" />
									</div>

									<div class="col-md-4">
										<label class="custom-label"> Homoclave<span class="required-field">*
											</span></label> <input type="text" class="form-control" id="homoclave"
											onkeypress="return soloLetrasNumeroshomo(event)" placeholder="Ej. GY3" />
									</div>
								</div>

								<br>

								<div class="text-center">

									<button id="calculo" class="btn btn-primary" data-bs-dismiss="modal"
										onclick="calcularCurp()">GENERA CURP
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
											<path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
										</svg>
									</button>



								</div>

							</div>
						</div>
					</div>
					<!-- AQUI FINALIZA EL MÓDULO DE DATOS GENERALES -->


					<!--================APARTADO DE DATOS COMPLEMENTARIOS==================-->
					<div class="tab-pane fade" id="datosComplementarios" role="tabpanel"
						aria-labelledby="datosComplementarios-tab">
						<div class="card">
							<div class="card-body">

								<div class="row">
									<div class="text-center ">

										<div class="color-hr" class="md">
											<h6>DATOS COMPLEMENTARIOS</h6>
										</div>

									</div>
								</div>
								<div class="row justify-content-md-center ">
									<div class="col-md-3">
										<label class="custom-label" for="correo">Correo electrónico<span
												class="required-field">*</span></label>
										<div style="position: relative;">
											<input type="text" class="form-control" id="correo"
												placeholder="Correo electrónico">
											<div id="sugerencias-correo"></div>
										</div>
									</div>


									<div class="col-md-3">
										<label class="custom-label">Discapacidades <span class="required-field">
												*</span></label> <select id="discapacidades" class="form-select"
											aria-label="Default select example">


										</select>
									</div>

									<div class="col-md-3">
										<label class="custom-label">Lenguajes <span class="required-field">
												*</span></label> <select id="lenguajes" class="form-select"
											aria-label="Default select example">



										</select>
									</div>
									<div class="col-md-3">
										<label class="custom-label">Escolaridad <span class="required-field">
												*</span></label> <select id="escolaridad" class="form-select"
											aria-label="Default select example">


										</select>
									</div>

									<br>

								</div>


								<div class="text-center justify-content-md-center div-separacion-md1">
									<button type="button" class="btn btn-primary"  botonSalirConsulta()">Limpiar
										consulta
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
											<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
										</svg>
									</button>
									<button type="button" class="btn btn-success" id="registrarPersona">
										Registrar 
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
											<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
											<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
										</svg>
									</button>
									<br> <br>
								</div>
							</div>
						</div>
					</div>
					<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE ORIGEN  -->



					<!-- AQUI EMPIEZA PARA LA PARTE DE DATOS DE ORIGEN  -->
					<div class="tab-pane fade" id="datos_hijos" role="tabpanel" aria-labelledby="datos_hijos-tab">
						<div class="card">
							<div class="card-body">

								<div class="row">
									<div class="text-center ">

										<div class="color-hr">
											<h6>CURP DE HIJOS</h6>
										</div>

									</div>
								</div>

								<div class="container mt-2">

									<table class="table table-bordered" id="tablaCURPs">
										<thead>
											<tr>
												<th>CURP</th>
												<th>Nombre</th>
												<th>Apellido Paterno</th>
												<th>Apellido Materno</th>
												<th>Acciones</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><input type="text" class="form-control" id="curp_table"
														name="curp[]"></td>
												<td><input type="text" class="form-control" id="hijo_name"
														name="nombre[]"></td>
												<td><input type="text" class="form-control" id="apellido_paterno[]"
														name="apellido_paterno[]"></td>
												<td><input type="text" class="form-control" id="apellido_materno[]"
														name="apellido_materno[]"></td>
												<td><button id="eliminar_table" type="button" class="btn btn-danger"
														onclick="eliminarFila(this)">Eliminar
														<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
															<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
														</svg>
													</button></td>
											</tr>
										</tbody>
									</table>

									<button type="button" id="agregar_table" class="btn btn-primary"
										onclick="agregarFila()">Agregar CURP
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
											<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
											<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
										</svg>
									</button>
									<button type="submit" id="registrar_table"
										class="btn btn-success">Registrar
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
											<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
										</svg>
									</button>

								</div>

							</div>

						</div>
					</div>

					<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE ORIGEN  -->



					<!-- AQUI EMPIEZA LOS DATOS DEL EMPLEADO -->
					<div class="tab-pane fade" id="datosEmpleado" role="tabpanel" aria-labelledby="datosEmpleado-tab">
						<div class="card">
							<div class="card-body">


								<div class="row">
									<div class="text-center ">

										<div class="color-hr">
											<h6>DATOS DE EMPLEADO</h6>
										</div>

									</div>
								</div>

								<div class="row justify-content-md-center">

									<div class="col-md-3">
										<label class="custom-label"> Número de empleado<span class="required-field">*
											</span></label> <input type="text" class="form-control" id="empleado"
											onkeypress="return soloNumeroempleado(event)" placeholder="Ej.27565" />
									</div>



									<div class="col-md-3">
										<label class="custom-label">
											No. de seguridad social
											<span class="tooltip-icon" data-toggle="tooltip" data-placement="top"
												data-original-title="Este campo no es obligatorio">&#9432;</span>
										</label>
										<input type="text" class="form-control" id="seguridadsocial" value=""
											onkeypress="return soloNumerosseguridad(event)"
											placeholder="Ej.80942408636" />
									</div>


									<div class="col-md-3">
										<label class="custom-label">
											IDRUSP
											<span class="tooltip-icon" data-toggle="tooltip" data-placement="top"
												data-original-title="Este campo no es obligatorio">&#9432;</span>
										</label>
										<input type="text" class="form-control" id="idusp"
											onkeypress="return soloNumeroidrups(event)" placeholder="Ej.002029515" />
									</div>

									<div class="col-md-3">
										<label class="custom-label">Regimen issste<span class="required-field">
												*</span></label> <select id="regimen" class="form-select"
											aria-label="Default select example">
										</select>
									</div>
									<div class="col-md-3">
										<label class="custom-label">Fecha de ingreso<span class="required-field">*
											</span></label> <input type="date" class="form-control" id="fechaingreso" />
									</div>

									<div class="col-md-3">
										<label class="custom-label">Fecha de ingreso sp<span class="required-field">*
											</span></label> <input type="date" class="form-control"
											id="fechaingresosp" />
									</div>

									<div class="col-md-3">
										<label class="custom-label">
											Fonacot
											<span class="tooltip-icon" data-toggle="tooltip" data-placement="top"
												data-original-title="Este campo no es obligatorio">&#9432;</span>
										</label>
										<input type="text" class="form-control" id="idinfonacot"
											onkeypress="return soloNumerofona	(event)" placeholder="EJ.1321162" />
									</div>




									<div class="col-md-3">
										<label class="custom-label">Código postal fiscal<span class="required-field">*
											</span></label> <input type="text" class="form-control"
											id="postal_fiscal" />
									</div>


									<div class="col-md-3">
										<label class="custom-label">Situación<span class="required-field">
												*</span></label> <select id="situacion" class="form-select"
											aria-label="Default select example">
										</select>
									</div>
								</div>

							</div>
						</div>
					</div>

					<!-- ======AQUI TERMINA PARA LA PARTE DE DATOS DE ORIGEN==========  -->


					<!-- AQUI EMPIEZA PARA LA PARTE DE CENTRO DE DISTRIBUCION Y TRABAJO  -->
					<div class="tab-pane fade" id="datosCentro" role="tabpanel" aria-labelledby="datosCentro-tab">
						<div class="card">
							<div class="card-body">
								<!-- INGRESAR UN TAB  -->
							</div>
						</div>
					</div>

					<!-- AQUI FINALIZA PARA LOS DATOS DE CENTRO DE TRABAJO Y DISTRIBUCION -->



					<!-- AQUI EMPIEZAN LOS DATOS DE CONTROL -->
					<div class="tab-pane fade" id="datosControl" role="tabpanel" aria-labelledby="datosControl-tab">
						<div class="card">
							<div class="card-body">
								<div class="text-center div-separacion-debajo">
									<div class="row ">
										<div class=" ">
											<hr>
											<div class="color-hr">
												<h6>DATOS DE CONTROL</h6>
												<img src="bootstrap-icons/lock-fill.svg" alt="Lock Icon">

											</div>
											<hr>
										</div>


										<!-- Ruta al archivo SVG dentro de la carpeta "bootstrap-icons" -->

										<div class="col-4">
											<b>Fecha de captura</b> <input class="form-control" type="date"
												id="fechainicioUno" disabled>
										</div>
										<!-- <div class="col-4">
								<b>Fecha de termino</b> <input class="form-control" type="date"
									id="fechaTermino" disabled>
							</div> -->


										<div class="col-4">

											<b>Usuario que capturo</b> <input class="form-control" type="text"
												id="usuCapturo" disabled>
										</div>

										<div class="col-4">

											<b>Fecha de modificacion</b> <input class="form-control" type="date"
												id="fechaCaptura" disabled>
										</div>


										<div class="col-4">
											<b>Usuario que realizó la última modificación </b><input
												class="form-control" type="text" id="usuModifico" disabled>
										</div>

									</div>


								</div>


								<hr>


							</div>

						</div>
					</div>
				</div>
				<!-- Agrega más tarjetas para otras secciones del formulario si es necesario -->
			</div>

			<br>
			<br>
			<br>
			<br>
			<br>
			<br>

			<script src="js/calendario.js"></script>
			<link rel="stylesheet" type="text/css" href="css/calendario.css">
			<link rel="stylesheet" type="text/css" href="css/calendarioicon.css">

			<!-- <script src="js/calendariodos.js"></script>
-->

			<script src="js/footer.js"></script>
			<script src="js/ingrese_persona.js"></script>
			<%@ include file="common/footer.jsp" %>