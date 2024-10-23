<title>Consulta Persona</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<br>
	<div class="text-center ">

		<div>
			<h3>CONSULTA DE PERSONA</h3>
		</div>
	</div>

	<div class="text-center justify-content-md-center ui-widget">

		<input id="autoComplete" type="search" dir="ltr" spellcheck="false"
			autocorrect="off" autocomplete="off" autocapitalize="off">
		<button type="button" class="btn btn-primary"
			onclick="buscarPersona()">Buscar
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
			</svg>
		</button>
	</div>
	
	
<br>
   



<!-- EMPIEZA LA NEUVA CONSULTA DE PERSONA  -->




<div class="container centered-container" id="forms" style="overflow: hidden;">


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
			<button class="nav-link" id="datosComplementarios-tab"
				data-bs-toggle="tab" data-bs-target="#datosComplementarios"
				type="button" role="tab" aria-controls="datosComplemenatrios"
				aria-selected="false">Datos Complementarios</button>
			<br>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="datos_hijos-tab" data-bs-toggle="tab"
				data-bs-target="#datos_hijos" type="button" role="tab"
				aria-controls="datos_hijos" aria-selected="false">Curp de
				Hijos</button>
			<br>
		</li>
		<li class="nav-item" role="presentation">
			<button hidden class="nav-link" id="datosCentro-tab" data-bs-toggle="tab"
				data-bs-target="#datosCentro" type="button" role="tab"
				aria-controls="datosCentro" aria-selected="false">Datos de
				centro de trabajo y distribucion</button>
		</li>
		<li class="nav-item" role="presentation">
			<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
				data-bs-target="#datosControl"type="button" role="tab"
				aria-controls="datosControl" aria-selected="false">
				Datos de control<br>
				<img src="bootstrap-icons/lock-fill.svg" alt="Lock Icon">
			</button>
			</button>
		</li>
	</ul>
 
 
 
 
	<div class="tab-content" id="myTabContent">
		<!--  AQUI EMPIEZA LA PARTE GENERAL DE LOS DATOS -->
		<div class="tab-pane fade show active" id="datosGenerales"
			role="tabpanel" aria-labelledby="datosGenerales-tab">
			<div class="card">
				<div class="card-body">
					
					
					<div class="row ">
						<div class="text-center">
			<hr>
			<div class="color-hr">
							<h6>DATOS GENERALES</h6>
						</div>
						<hr>
					</div>
		
		
					<div class="col-md-4">
						<label><b>Nombre</b></label> <br> <input type="text"
							class="form-control" id="nombre" value=""
							onchange="consultarPersona()" disabled />
					</div>
		
					<div class="col-md-4">
						<label><b>Apellido Paterno</b></label> <input type="text"
							class="form-control" id="apellidopaterno" value=""
							onchange="consultarPersona()" disabled />
					</div>
		
					<div class="col-md-4">
						<label><b>Apellido Materno</b></label><br> <input type="text"
							class="form-control" id="apellidomaterno" value=""
							onchange="consultarPersona()" disabled />
					</div>
					<div class="col-md-4">
						<label><b>Fecha de nacimiento</b></label> <input type="date"
							class="form-control" value="" id="fecha_nacimiento" disabled />
					</div> 
					<div class="col-md-4">
						<label><b>Genero</b></label> <input type="text" class="form-control"
							id="genero" value="" onchange="consultarPersona()" disabled />
                    </div>
					<div class="col-md-4">
						<label><b>Estado Civil</b></label> <input type="text"
							class="form-control" id="estadocivil" value=""
							onchange="consultarPersona()" disabled />
					</div>
					<div class="col-md-4">
						<label><b>Nacionalidad</b></label> <input type="text"
							class="form-control" value="" id="nacionalidad" disabled />
					</div>
					<div class="col-md-4">
		
						<label><b>Estado de Origen</b></label> <input type="text"
							class="form-control" value="" id="estado" disabled />
					</div>
					<div class="col-md-4">
						<label><b> Municipio de origen</b></label> <input type="text"
							class="form-control" value="" id="municipio" disabled />
					</div>

					<div class="col-md-4">
						<label><b>CURP</b></label> <input type="text" class="form-control"
							id="curp2" name="curp" name="curp2" disabled />
					</div>
		
					<div class="col-md-4">
						<label><b>RFC</b></label> <input type="text" class="form-control"
							id="rfc" value="" onchange="consultarPersona()" disabled />
					</div>
					<div class="col-4">
						<label><b>Homoclave</b></label> <input type="text"
							class="form-control" id="homoclave" value="" disabled />
					</div>
		
					
					
					
							
				</div>
				
			
 
				</div>
			</div>
		</div>
		<!-- AQUI FINALIZA EL MÓDULO DE DATOS GENERALES -->
 
 
 
 
			<!-- DATOS -->
		<div class="tab-pane fade" id="datosEmpleado" role="tabpanel"
		aria-labelledby="datosEmpleado-tab">
		<div class="card">
			<div class="card-body">



				<div class="row ">

					<div class="text-center ">
			<hr>
			<div class="color-hr">
							<h6>DATOS DEL EMPLEADO</h6>
						</div>
						<hr>
					</div>
		
					<div class="col-md-3">
						<label><b>Número de empleado</b></label> <input type="text"
							class="form-control" id="empleado" value="" disabled />
					</div>
					<div class="col-md-3">
						<label><b>No.de seguridad social</b></label> <input type="text"
							class="form-control" value="" id="seguridadsocial" disabled />
					</div> 
		
		
					<div class="col-md-3">
						<b>IDUSP</b> <input type="text" class="form-control" id="idusp"
							value="" disabled />
					</div>
					<div class="col-md-3">
						<label><b>Régimen ISSSTE</b></label> <input type="text"
							class="form-control" value="" id="regimen" disabled />
					</div>
		
		
					
					<div class="col-md-3">
						<label><b>Fecha de Ingreso</b></label> <input type="date"
							class="form-control" id="fechaingreso" disabled />
		
					</div>
					<div class="col-md-3">
						<label><b>Fecha Ingreso SP</b></label> <input type="date"
							class="form-control" id="fechaingresosp"
							onchange="consultarPersona()" disabled />
					</div>

					<div class="col-md-3">
						<label><b><span style="color: red"> </span>Fecha Baja</b></label> <input
							type="date" class="form-control" id="fechabaja" disabled />
					</div>

					<div class="col-md-3">
						<label><b><span style="color: red"> </span>IDFONACOT</b></label> <input
							type="text" class="form-control" id="idfonacot" disabled />
					</div>

					<div class="col-md-4">
						<label><b><span style="color: red"> </span>CÓDIGO POSTAL FISCAL</b></label> <input
							type="text" class="form-control" id="cpfiscal" disabled />
					</div>

					<div class="col-md-4">
						<label><b>Situación</b></label> <input type="text"
							class="form-control" id="situacion" value=""
							onchange="consultarPersona()" disabled />
		
					</div>
		
					
				</div>
		
				<div class="row justify-content-md-center div-separacion-debajo">
		
					
					
		
		
		
		
					
					
				</div>
 
					<!-- <div class="row">

						<div class="text-center ">
			<hr>
			<div class="color-hr">
							<h6>DATOS DE ORIGEN</h6>
						</div>
						<hr>
					</div>
					
		
		
				</div> -->
			
 
 
			</div>
		</div>
	</div>
 
 
	<!-- ======DATOS=========  -->
 
 
 
 
		<!--================DATOS ==================-->
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
							<label class="custom-label" for="correo">Correo electrónico</label>
							<div style="position: relative;">
								<input type="text" class="form-control" id="correo" disabled>
								<div id="correo"></div>
							</div>
						</div>
					

						<div class="col-md-3">
							<label class="custom-label">Discapacidades </label> <input type="text" class="form-control" id="discapacidades" disabled >

								
							
						</div>

						<div class="col-md-3">
							<label class="custom-label">Lenguajes </label><input type="text" class="form-control" id="lenguajes" disabled>

							

							</select>
						</div>
						<div class="col-md-3">
							<label class="custom-label">Escolaridad </label> <input type="text" class="form-control" id="escolaridad" disabled>


							</select>
						</div>

						<br>

					</div>






 
				
				</div>
			</div>
		</div>
		<!-- DATOS -->
 
 
 
 
 
 
		<!-- DATOS  -->
		<div class="tab-pane fade" id="datos_hijos" role="tabpanel"
			aria-labelledby="datos_hijos-tab">
			<div class="card">
				<div class="card-body">
 
 
					<div class="row">
						<div class="text-center ">
							
							<div class="color-hr">
								<h6>DATOS CURP HIJOS</h6>
							</div>
							
						</div>
					</div>
					<div class="row justify-content-md-center ">
						<div class="col-md-3">

						


							<label class="custom-label" for="correo">NOMBRE</label>
							<div style="position: relative;">
								<input type="text" class="form-control" id="nombre_hijo" disabled>
								<div id="sugerencias-correo"></div>
							</div>
						</div>

						<div class="col-md-3">
							<label class="custom-label">EMAIL </label> <input type="text" class="form-control" id="correo" disabled>


						</div>
					

						<div class="col-md-3">
							<label class="custom-label">APELLIDO PATERNO </label> <input type="text" class="form-control" id="appapellido_hijo" disabled >

								
							
						</div>

						<div class="col-md-3">
							<label class="custom-label">APELLIDO MATERNO </label><input type="text" class="form-control" id="matapellido_hijo" disabled>

							

						
						</div>
						

						<br>

					</div>
 
 
				</div>
 
 
			</div>
		</div>
 
 
		<!-- DATOS  -->
 
 
 
 
 
 
	
 
 
 
 
 
 
		<!-- DATOS -->
		<div class="tab-pane fade" id="datosCentro" role="tabpanel"
			aria-labelledby="datosCentro-tab">
			<div class="card">
				<div class="card-body">
				
 <!-- ESCRIBIR DATOS  -->
 
 
				</div>
			</div>
		</div>
 
 
		<!-- DATOS -->
 
 
 
 
 
 
		<!-- DATOS   -->
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

								<b>Usuario que capturo</b> <input class="form-control"
									type="text" id="usuCapturo" disabled>
							</div>

							<div class="col-4">

								<b>Fecha de captura</b> <input class="form-control"
									type="date" id="fechaCaptura" disabled>
							</div>


							<div class="col-4">
								<b>Usuario que realizó la última captura </b><input
									class="form-control" type="text" id="usuModifico" disabled>
							</div>

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
 











<script src="js/footer.js"></script>
<script src="js/modal_ctratrabajo.js"></script>

<script src="js/consulta_persona.js"></script>
<%@ include file="common/footer.jsp"%>
