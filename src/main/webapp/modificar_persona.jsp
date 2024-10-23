<title>Modificar Persona</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>



<div
	class="container rounded div-padding input-color div-separacion-mediana">

	<div class="text-center espacio-titulo ">
		<div>
			<h3>MODIFICACION DE PERSONA</h3>
		</div>
	</div>


	<div class="text-center justify-content-md-center ui-widget">

		<input id="autoComplete" type="search" dir="ltr" spellcheck="false"
			autocorrect="off" autocomplete="off" autocapitalize="off">

		<button id= "btnBuscar" style="margin-left: 10px;" type="button" class="btn btn-primary"
			onclick="buscarPersona()">Buscar
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
			</svg>
		</button>
			
			<!-- INICIO boton habilitar busqueda Servicio -->
		<button style="margin-left: 10px;" type="button"
			class="btn btn-success" id="habilitarBusqueda" disabled
			onclick="limpiarCamposHabilitar()">Habilitar Búsqueda
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
				<path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
			</svg>
		</button>
		<!-- FIN boton habilitar busqueda Servicio -->
		
	</div>
	<style>
		#autoComplete {
  
  padding: 10px;

  border-radius: 5px;
  font-size: 16px;
  outline: none;
  opacity: 0.8; /* Opacidad del 80% */
}

#autoComplete:focus {
  border-color: #007bff; /* Cambiar el color del borde al enfocar */
}

	</style>

</div>

<div class="container centered-container" id="forms">

	<ul class="nav nav-tabs" id="myTab" role="tablist">
		<li class="nav-item" role="presentation">
			<button class="nav-link active" id="datosGenerales-tab"
				data-bs-toggle="tab" data-bs-target="#datosGenerales" type="button"
				role="tab" aria-controls="datosGenerales" aria-selected="true">Datos
				Generales</button>
		</li>

		<li class="nav-item" role="presentation">
			<button class="nav-link" id="datosEmpleado-tab" data-bs-toggle="tab"
				data-bs-target="#datosEmpleado" type="button" role="tab"
				aria-controls="datosEmpleado" aria-selected="false">Datos
				de Empleado</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="datosComplementarios-tab" data-bs-toggle="tab"
				data-bs-target="#datosComplementarios" type="button" role="tab"
				aria-controls="datosComplementarios" aria-selected="false">Datos Complementarios</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="datos_hijos-tab" data-bs-toggle="tab"
				data-bs-target="#datos_hijos" type="button" role="tab"
				aria-controls="datos_hijos" aria-selected="false">Curp de
				Hijos</button>
			<br>
		</li>

		


		<li class="nav-item" role="presentation">
			<button  hidden class="nav-link" id="datosCentro-tab" data-bs-toggle="tab"
				data-bs-target="#datosCentro" type="button" role="tab"
				aria-controls="datosCentro" aria-selected="false">Datos de
				centro de trabajo y distribucion</button>
		</li>

		<li class="nav-item" role="presentation">
			<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
				data-bs-target="#datosControl" type="button" role="tab"
				aria-controls="datosControl" aria-selected="false">Datos de
				control</button>
		</li>

	</ul>

	<div class="tab-content" id="myTabContent">
		<div class="tab-pane fade show active" id="datosGenerales"
			role="tabpanel" aria-labelledby="datosGenerales-tab">
			<div class="card">
				<div class="card-body">


					<!--  AQUI EMPIEZA LA PARTE GENERAL DE LOS DATOS -->
					<div class="row" class="col-6	">
						<div class="text-center ">
							<div class="color-hr">
								<h6>DATOS GENERALES</h6>
							</div>
						</div>
					</div>
					<div class="row justify-content-md-center ">
						<div class="col-md-4">
							<label class="custom-label" class="required-field">Nombre<span
								class="required-field">*</span></label>
								
							<div class="input-group">
								<input class="form-control" type="text"
									onkeypress="return soloLetras(event)" oninput="validarMayusculas(this)" id="nombre" disabled>
									
									
								<button id="habilitarNombre" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								<input class="form-control" type="text"
									onkeypress="return soloLetras(event)" id="id" disabled hidden>
							</div>
						</div>

						<div class="col-md-4">
							<label class="custom-label">Apellido Paterno<span
								class="required-field">*</span></label>
							<div class="input-group">
							
								<input type="text" class="form-control" id="apellidopaterno"
									disabled onkeypress="return soloLetras(event)" oninput="validarMayusculas(this)" />
									
								<button id="habilitarApellidoPaterno"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div>


					<div class="col-md-4">
							<label class="custom-label">Apellido Materno<span
								class="required-field">*</span></label>
							<div class="input-group">
							
								<input type="text" class="form-control" id="apellidomaterno"
									disabled onkeypress="return soloLetras(event)" oninput="validarMayusculas(this)"/>
									
								<button id="habilitarApellidoMaterno"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div>
						
						<div class="col-md-4">
							<label class="custom-label">Fecha de nacimietno<span
								class="required-field">* </span></label> 
								<div class="input-group"><input type="date"
								class="form-control" id="fechauno" disabled />
								<button id="habilitarFecha_nacimiento"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
						</div>



						<div class="col-md-4">
							<label class="custom-label">Género<span
								class="required-field">*</span></label>
							<div class="input-group">
								<select id="genero" class="form-select"
									aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitarCampos" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>

							<input type="text" class="form-control" id="generoid" value=""
								hidden />


						</div>




						<div class="col-md-4">
							<label class="custom-label">Estado civil<span
								class="required-field">*</span></label>
							<div class="input-group">
								<select id="estadocivil" class="form-select"
									aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitarcivil" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>

							<input type="text" class="form-control" id="edocivilid" hidden  />
						</div>

						<div class="col-md-4">
							<label class="custom-label">Nacionalidad<span
								class="required-field"> *</span></label> 
								<div class="input-group"><select id="nacionalidad"
								class="form-select" aria-label="Default select example" disabled>
							</select> <input type="text" class="form-control" id="nacionalidadid"
								 hidden/>
								 
								 
								 <button id="habilitarNac" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								 </div>
						</div>
						<div class="col-md-4">
							<label class="custom-label">Estado<span
								class="required-field">*</span></label>
							<div class="input-group">
								<select  disabled id="estado" class="form-select" onchange="verificarEstado()"
									aria-label="Default select example" >
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitarEst" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>

							<input type="text" class="form-control" id="estadoid"
								 hidden/>
								 
								 <input type="text" class="form-control" id="estadogenerado" 
								 hidden/>


						</div>
						<div class="col-md-4">
							<label class="custom-label">Municipio<span
								class="required-field">*</span></label>
							<div class="input-group">
								<select id="municipio" class="form-select" onchange="verificarMunicipio()"
									aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								
								<button id="habilitarMun" class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								
								
								
							</div>

							<input type="text" class="form-control" id="municipioid" 
							 hidden/>
							 
							 <input type="text" class="form-control" id="municipiogenerado" 
							 hidden />


						</div>


								<div class="col-md-4">
							<label class="custom-label">Curp<span
								class="required-field">*</span></label>
							<div class="input-group">
							
								<input type="text" class="form-control" id="curp2"
									disabled onkeypress="return soloLetras(event)" oninput="validarCURP(this)" />
									
								<button id="habilitarCurp"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
							
						</div>
						

							<div class="col-md-4">
							<label class="custom-label">RFC<span
								class="required-field">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control" id="rfc"
									disabled onkeypress="return soloLetras(event)" />
								<!-- <button id="habilitarRfc"
									class="btn btn-outline-danger" type="button" disabled>
									<i class="bi bi-slash-circle-fill"></i>
								</button> -->
							</div>
						</div>
						
							<div class="col-md-4">
							<label class="custom-label">Homoclave<span
								class="required-field">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control" id="homoclave"
									disabled onkeypress="return soloLetras(event)" oninput="validarHC(this)" />
								<button id="habilitarHomoclave"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div>
						


<!-- 
								<div class="col-md-4">
							<label class="custom-label">No. de seguridad social<span
								class="required-field">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control" id="seguridadsocial"
									disabled onkeypress="return soloLetras(event)" oninput="validarNSS(this)"/>
								<button id="habilitarSeguridad"
									class="btn btn-outline-danger" type="button" disabled>
									<i class="bi bi-slash-circle-fill"></i>
								</button>
							</div>
						</div> -->
						

					</div>
					
					
					
					
					
					 <div class="text-center">
						<br>
						 <button id="botonModificar" type="submit" style="color:black" class="btn btn-warning"
							onclick="modificarPuesto()" disabled>
							Modificar todo
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
							</svg>
						 </button> 
						 
						 <button id="botonGuardar1" type="submit" class="btn btn-success"  onclick="guardarCambios()" disabled>
							Guardar cambios
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
								<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
								<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
							</svg>
						 </button> 
						
						
					</div> 
					<!--  AQUI TERMINA LA PARTE GENERAL DE LOS DATOS -->

					<br>



					<div class="text-center">
						<!-- <button type="button" class="btn btn-danger"
			onclick=" botonSalirConsulta()">Limpiar consulta</button> -->


					</div>

				</div>
			</div>
		</div>

		<!--================APARTADO DE DATOS COMPLEMENTARIOS==================-->
		<div class="tab-pane fade" id="datosComplementarios" role="tabpanel"
			aria-labelledby="datosComplementarios-tab">
			<div class="card">
				<div class="card-body">

					<div class="row">
						<div class="text-center ">
							
							<div class="color-hr">
								<h6>DATOS COMPLEMENTARIOS</h6>
							</div>
							
						</div>
					</div>
					<div class="row justify-content-md-center ">
						<div class="col-md-3">
							<label class="custom-label" for="correo">Correo electrónico<span class="required-field">*</span></label>
							<div style="position: relative;">
								<div class="input-group"><input disabled type="text" class="form-control" id="correo" >
								<div id="sugerencias-correo"></div>
								<button id="habilitarCorreo"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								
							</div>
						</div>
					</div>
					

						<div class="col-md-3">
							<label class="custom-label">Discapacidades <span
								class="required-field"> *</span></label> 	<div class="input-group">

								<select disabled id="discapacidadesBien"
								class="form-select" aria-label="Default select example">

				

							</select>
							<button id="habilitarDiscapacidades"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								
						</div>
						<input type="text" class="form-control" id="clavediscap"
									disabled hidden />
					</div>

						<div class="col-md-3">
							<label class="custom-label">Lenguajes <span
								class="required-field"> *</span></label> 
								<div class="input-group"><select disabled id="lenguajes"
								class="form-select" aria-label="Default select example">

							


							</select>
							<button id="habilitarLenguajes"
							class="btn btn-outline-danger" type="button" disabled>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
									<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
							  	</svg>
						</button>
						<input type="text" class="form-control" id="clavelenguajes"
									disabled hidden />
						</div>

					</div>
						<div class="col-md-3">
							<label class="custom-label">Escolaridad <span
								class="required-field"> *</span></label> 
								<div class="input-group">
								<select disabled id="escolaridad"
								class="form-select" aria-label="Default select example">

						
							</select>

							<button id="habilitarEscolaridad"
								class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
							</button>
						<input type="text" class="form-control" id="claveescolaridad"
									disabled hidden />
						</div>

						<br>

					</div>

					<div class="text-center">
						<br>
						 <button id="botonModificarComple" type="submit" class="btn btn-warning"
							onclick="modificarPuesto()" disabled>
							Modificar todo
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
							</svg>
						 </button> 
						 
						 <button id="botonGuardarComple" type="submit" class="btn btn-success"  onclick="guardarCambios()" disabled>
							Guardar cambios
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
								<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
								<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
							</svg>
						 </button> 
						
						
					</div> 
				</div>
				</div>
			</div>
		</div>
		<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE ORIGEN  -->
			<!-- AQUI EMPIEZA PARA LA PARTE DE DATOS DE ORIGEN  -->
			<div class="tab-pane fade" id="datos_hijos" role="tabpanel"
			aria-labelledby="datos_hijos-tab">
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
									<td><input type="text" class="form-control"
										id="curp_table" name="curp[]" disabled></td>
									<td><input type="text" class="form-control" id="hijo_name"
										name="nombre[]" disabled></td>
									<td><input type="text" class="form-control"
										id="apellido_paterno[]" disabled name="apellido_paterno[]"></td>
									<td><input type="text" class="form-control"
										id="apellido_materno[]" disabled name="apellido_materno[]"></td>
									<td><button id="eliminar_table" type="button"
											class="btn btn-danger" onclick="eliminarFila(this)">Eliminar
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
											</svg>
										</button></td>
								</tr>
							</tbody>
						</table>

						<!-- <button type="button" id="agregar_table" class="btn btn-primary"
							onclick="agregarFila()">Agregar CURP</button> -->
						<button type="submit" id="registrar_table" class="btn btn-success">ACTUALIZAR
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
								<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
								<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
							</svg>
						</button>

					</div>

				</div>

			</div>
		</div>

		<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE ORIGEN  -->

		<!-- Tarjeta para Datos de Origen -->
		<div class="tab-pane fade" id="datosEmpleado" role="tabpanel"
			aria-labelledby="datosEmpleado-tab">
			<div class="card">
				<div class="card-body">
					<!-- AQUI EMPIEZA PARA LA PARTE DE DATOS DE EMPLEADO  -->
					<div class="row">
						<div class="text-center ">
							<hr>
							<div class="color-hr">
								<h6>DATOS DE EMPLEADO</h6>
							</div>
							<hr>
						</div>
					</div>

					<div class="row justify-content-md-center">

					
					<div class="col-md-3">
							<label class="custom-label">No.de empleado<span
								class="required-field">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control" id="empleado" oninput="validarNE(this)"
									disabled onkeypress="return soloLetras(event)" />
								<button id="habilitarEmpleado"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div>

						<div class="col-md-3">
							<label class="custom-label">No. de seguridad social<span
								class="required-field">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control" id="seguridadsocial"
									disabled onkeypress="return soloLetras(event)" oninput="validarNSS(this)"/>
								<button id="habilitarSeguridad"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div> 

					<div class="col-md-3">
							<label class="custom-label">IDRUPS<span
								class="required-field">*</span></label>
							<div class="input-group">
								<input type="text" class="form-control" id="idusp" oninput="validarIDRUPS(this)"
									disabled onkeypress="return soloLetras(event)" />
								<button id="habilitarIdus"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div>

						
						<div class="col-md-3">
							<label class="custom-label">Regimen<span
								class="required-field">*</span></label>
							<div class="input-group">
								<select id="regimen" class="form-select"
									aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitarreg" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								<input type="text" class="form-control" id="regimenid" hidden  />
							</div>
						</div>

						<div class="col-md-3">
							<label class="custom-label">Fecha de ingreso<span
								class="required-field">* </span></label> 
								<div class="input-group"><input type="date"
								class="form-control" id="fechaingreso" disabled />
								<button id="habilitarFechaingreso"
									class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								</div>
						</div>

						<div class="col-md-3">
							<label class="custom-label">Fecha de ingreso sp<span
								class="required-field">* </span></label> <div class="input-group">
								<input type="date"
								class="form-control" id="fechaingresosp" disabled />
								<!-- <button id="habilitarFechaIngresosp"
									class="btn btn-outline-danger" type="button" disabled>
									<i class="bi bi-slash-circle-fill"></i>
								</button> -->
								</div>
						</div>
						<div class="col-md-3">
							<label class="custom-label">Situación<span
								class="required-field">*</span></label>
							<div class="input-group">
								<select id="situacion" class="form-select"
									aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitarsit" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								<input type="text" class="form-control" id="situacionid" hidden />
							</div>
						</div>

						<div class="col-3">
							<b>Fecha de termino</b> <span style="color: red"> * </span><input class="form-control" type="date"
								id="fechaTermino" disabled>
						</div>
						<div class="col-3">
							<label><b>Fecha
								Baja<span style="color: red"> * </span></b></label> <input type="date" class="form-control" id="fechabaja"
								disabled />
						</div>


						<div class="col-3">
							<label class="custom-label">Fonacot<span
								class="required-field">* </span></label> <div class="input-group"><input type="text"
								class="form-control" id="idinfonacot"
								onkeypress="return soloNumerofona	(event)" disabled />
								
								
								<button id="habilitarFon" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								
								</div>
								
								
								
						</div>
						<div class="col-md-3">
							<label class="custom-label">Código postal fiscal<span
								class="required-field">* </span></label> <div class="input-group"><input disabled type="text"
								class="form-control" id="cpfiscal" />

								<button id="habilitarCpf" class="btn btn-outline-danger"
									type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
						</div>
						</div>


					</div>

					<div class="text-center">
						<br>
						<button id="habilitarorigen2" type="submit" class="btn btn-warning"
							disabled>
							Modificar datos de origen
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
							</svg>
						</button>
						
						 <button id="botonGuardar3" type="submit" class="btn btn-success"  onclick="guardarCambios()" disabled>
							Guardar cambios
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
								<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
								<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
							</svg>
						 </button> 
					</div> 
					<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE EMPLEADO  -->



					<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE EMPLEADO  -->
				</div>
			</div>
		</div>
		<!-- Tarjeta para Datos de Origen -->
		<!-- Tarjeta para Datos de Origen -->
		
		
		

		<div class="tab-pane fade" id="datosCentro" role="tabpanel"
			aria-labelledby="datosCentro-tab">
			<div class="card">
				<div class="card-body">
					<div class="container " id="forms">
						<!-- AQUI EMPIEZA PARA LA PARTE DE CENTRO DE DISTRIBUCION Y TRABAJO  -->
						<div class="text-center ">
							<hr>
							<div class="color-hr">
								<h6>DATOS DE CENTRO DE TRABAJO Y DISTRIBUCION</h6>
							</div>
							<hr>
						</div>


						<div class="row">








							<div class="col-md-6">
								<b>Centro de Trabajo</b><span style="color: red"> * </span> <br> <input
									style="WIDTH:515px; HEIGHT: 30px" size=32
									id="autoCompletenone" type="search" dir="ltr" spellcheck=false
									autocorrect="off" autocomplete="off" autocapitalize="off"
									disabled><b><label for="otroInputc" disabled></label></b><span
									style="color: red"> </span> <input type="text"
									class="col form-control" disabled id="otroInputc" name="otroInputc"
									style="height: 30px;" /><br> 
									<input class = "col-12 text-center" type="text" id="ctra_id" name="ctra_id" >


								<div class="text-center">
									<!-- BOTONES CON FUNCIONALIDAD  -->
									<button id="especificactra" type="button" class="btn btn-dark"
										data-bs-toggle="modal" data-bs-target="#miModal" disabled>BUSQUEDA
										ESPECIFICA</button>
									<button id="nuevoBoton" type="button" class="btn btn-dark"
										data-bs-toggle="modal" data-bs-target="#nuevoModal">VER
										BUSQUEDA</button>
								</div>


								<!-- MODAL PARA VER LAS BUSQUEDAS  -->
								<div class="modal fade" id="nuevoModal" tabindex="-1"
									aria-labelledby="nuevoModalLabel" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered">
										<div class="modal-content">

											<div class="modal-header">
												<h5 class="modal-title" id="nuevoModalLabel">CENTRO DE
													TRABAJO</h5>
												<button type="button" id="nuevo" class="btn-close"
													data-bs-dismiss="modal" aria-label="Close"></button>
											</div>

											<div class="modal-body">
												<div class="mb-3"></div>
												<div class="mb-3"></div>
											</div>

											<div class="modal-footer">
												<button type="button" class="btn btn-secondary"
													data-bs-dismiss="modal">Cerrar</button>
											</div>
										</div>
									</div>
								</div>
								<!-- MODAL PARA VER LAS BUSQUEDAS  -->


								<!-- MODAL PARA INCRUSTAR EL JSP  -->

								<div class="modal fade" id="miModal" tabindex="-1"
									aria-labelledby="miModalLabel" aria-hidden="true">
									<div
										class="modal-dialog modal-dialog-centered modal-lg custom-modal">
										<div class="modal-content">
											<div class="p-4">
												<!-- Eliminadas las alertas -->
												<%@ include file="Modal_ctratrabajo.jsp"%>
												<div class="text-center">
													<button type="button" class="btn btn-secondary btn-modal"
														data-bs-dismiss="modal">Cerrar</button>
													<button id="btnsiguiente" type="button"
														class="btn btn-primary btn-modal">Guardar</button>
												</div>
											</div>
										</div>
									</div>
								</div>

								<!-- MODAL PARA INCRUSTAR EL JSP  -->
							</div>

							<!-- AQUI termina PARA LA PARTE DE CENTRO DE DISTRIBUCION Y TRABAJO  -->








							<div class="col-md-6">
								<b>Centro de Distribución</b><span style="color: red"> *
								</span> <input style="width: 515px; height: 30px" size="32"
									id="autoCompleteuno" type="search" dir="ltr" spellcheck="false"
									autocorrect="off" autocomplete="off" autocapitalize="off"
									disabled> <label><b></b><span
									style="color: red"> </span></label> <input type="text"
									class="col form-control" disabled id="otroInput" name=""
									style="height: 30px; padding-left: 100px !important;" /><br>
									<input class = "col-12 text-center" id="cdis_id" type="text" name="cdis_id" hidden>
								


								<div class="row">

									<div class="col text-center">
										<button id="especificacdis" type="button"
											class="btn btn-dark " data-bs-toggle="modal"
											data-bs-target="#miModaldist" disabled>BUSQUEDA
											ESPECIFICA</button>
										<button id="btnver" type="button" class="btn btn-dark "
											data-bs-toggle="modal" data-bs-target="#miModal2">VER
											BUSQUEDA</button>
									</div>
								</div>


								<div class="modal fade" id="miModal2" tabindex="-1"
									aria-labelledby="miModal2Label" aria-hidden="true">
									<div class="modal-dialog modal-dialog-centered">
										<div class="modal-content">
											<!-- Encabezado del modal -->
											<div></div>
											<div class="modal-header">
												<h5 class="text-center" class="color-hr" class="modal-title"
													id="miModal2Label">CENTRO DE DISTRIBUCION</h5>

												<button type="button" class="btn-close"
													data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<!-- Contenido del modal -->
											<div class="modal-body">
												<div class="mb-3"></div>


												<div class="mb-3"></div>
											</div>
											<!-- Botón de cierre del modal -->
											<div class="modal-footer">


												<button type="button" class="btn btn-secondary"
													data-bs-dismiss="modal">Cerrar</button>

											</div>
										</div>
									</div>
								</div>



								<div class="modal fade" id="miModaldist" tabindex="-1"
									aria-labelledby="miModalLabel" aria-hidden="true">
									<div
										class="modal-dialog modal-dialog-centered modal-lg custom-modal">
										<div class="modal-content">
											<div class="p-4">
												<div id="alertaModal"
													class="alert alert-danger custom-alert" role="alert"
													style="display: none;"></div>
												<!-- <div id="customAlert"
										style="display: none; background-color: #f44336; color: white; padding: 10px;">
										<strong>Error:</strong> <span id="alertMessaged"></span>

									</div> -->

												<div id="customAlert2">
													<!-- style="display: none; background-color: #ff9800; color: white; padding: 10px;">
														<strong>Advertencia:</strong> <span id="alertMessage2"></span> -->
												</div>
												<%@ include file="Modal_cdisdistribucion.jsp"%>
												<div class="text-center">

													<button type="button" class="btn btn-secondary btn-modal"
														data-bs-dismiss="modal">Cerrar</button>
													<button id="btnsiguientedist" type="button"
														class="btn btn-primary btn-modal">Guardar</button>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>







						<div
							class="text-center justify-content-md-center div-separacion-md1">


<!-- 							<button id="actualizarPersona" type="button" class="btn btn-success" onclick="guardarCambios()"> -->
<!-- 								ACTUALIZAR <i class="bi bi-upload"></i> -->
<!-- 							</button> -->
							
						 <button id="botonGuardar4" type="submit" class="btn btn-success"  onclick="guardarCambios()">
							Guardar cambios
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
								<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
								<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
							</svg>
						 </button> 


						</div>
						

					</div>
					








				</div>

			</div>
		</div>
	</div>
	<!-- Tarjeta para Datos de Origen -->
	<div class="tab-pane fade" id="datosControl" role="tabpanel"
		aria-labelledby="datosControl-tab">
		<div class="card">
			<div class="card-body">


				<div class="text-center div-separacion-debajo">
					<div class="row ">
						<div class=" ">
							<hr>
							<div class="color-hr">
								<h6>DATOS DE CONTROL</h6>
							</div>
							<hr>
						</div>


						<div class="col-4">
							<b>Fecha de inicio</b> <input class="form-control" type="date"
								id="fechainicioUno" disabled>
						</div>
						


						<div class="col-4">

							<b>Usuario que capturo</b> <input class="form-control"
								type="text" id="usuCapturo" disabled>
						</div>

						<div class="col-4">

							<b>Fecha de modificacion</b> <input class="form-control"
								type="date" id="fechaCaptura" disabled>
						</div>


						<div class="col-4">
							<b>Usuario que realizó la última modificación </b><input
								class="form-control" type="text" id="usuModifico" disabled>
						</div>

					</div>


				</div>

				<!-- FIN DE DATOS DE CONTROL  -->

				<hr>


			</div>

		</div>
	</div>
</div>
<!-- Agrega más tarjetas para otras secciones del formulario si es necesario -->
</div>



<script src="js/footer.js"></script>
<script src="js/modificar_persona.js"></script>
<%@ include file="common/footer.jsp"%>