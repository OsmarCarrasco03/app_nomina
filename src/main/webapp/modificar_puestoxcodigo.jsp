<title>MODIFICACIÓN CÓDIGO DE PUESTO</title>
<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


			<div id="separadorNav"></div>

			<div class="container div-padding input-color">
				<div class="text-center espacio-titulo">
					<h3>MODIFICAR CODIGO DE PUESTO</h3>
				</div>
				<br>
				<div class="text-center ">

					<div class="autoComplete_wrapper">
						<input id="autoComplete" type="text" dir="ltr" spellcheck=false autocorrect="off"
							autocomplete="off" autocapitalize="off" size="100">

						<button type="button" class="btn btn-primary" id="seleccion" onclick="mostrarDatos()">
							Buscar
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
								<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
							</svg>
						</button>
					</div>

				</div>
				<br>

				<!-- Primera Secci�n -->
				<!-- Primera Sección -->
				<div class="text-center div-separacion">
					<div class="row justify-content-md-center">
						<!-- Columna 1: Código del Puesto -->
						
						<div class="col-md-3" hidden>
							<label class="custom-label" class="required-field">id<span
									class="required-field">*</span></label>
							<div class="input-group">
								<input class="form-control" type="text" onkeypress="return soloLetras(event)"
									oninput="validarMayusculas(this)" id="idPuesto" disabled>
								
							</div>
						</div>


						<div class="col-md-3">
							<label class="custom-label" class="required-field">Código<span
									class="required-field">*</span></label>
							<div class="input-group">
								<input class="form-control" type="text" onkeypress="return soloLetras(event)"
									oninput="validarMayusculas(this)" id="codigoPuesto" disabled>
								<button id="habilitarcodigoPuesto" class="btn btn-outline-danger" type="button"
									disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
							</div>
						</div>



						<div class="col-md-3">
							<label class="custom-label" class="required-field">Descripcion<span
									class="required-field">*</span></label>

							<div class="input-group">
								<input class="form-control" type="text" onkeypress="return soloLetras(event)"
									oninput="validarMayusculas(this)" id="descripcion" disabled>


								<button id="habilitardescripcion" class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>

							</div>
						</div>


						<!-- Columna 3: Situación -->
						<div class="col-md-3">
							<label class="custom-label">Tipo<span class="required-field">*</span></label>
							<div class="input-group">
								<select id="tipo" class="form-select" aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitartip" class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								<input type="text" class="form-control" id="tipoid" hidden />
							</div>
						</div>


						<div class="col-md-3">
							<label class="custom-label">Situacion <span class="required-field">*</span></label>
							<div class="input-group">
								<select id="situ" class="form-select" aria-label="Default select example" disabled>
									<!-- Agrega las opciones del select aquí -->
								</select>
								<button id="habilitarsit" class="btn btn-outline-danger" type="button" disabled>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
										<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
									</svg>
								</button>
								<input type="text" class="form-control" id="situid" hidden />
							</div>
						</div>
					</div>
				</div>

				<div class="text-center">

					<hr>
					<div class="color-hr">
						<h6>DATOS DE CONTROL</h6>
					</div>

					<hr>

				</div>

				<div class="row justify-content-md-center div-separacion-mediana2">

					<div class="col">
						<p>Usuario capturó</p>
						<input type="text" id="usuarioCapturo" class="form-control" disabled />
					</div>




					<div class="col">
						<p>Fecha Inicio</p>
						<input type="date" id="fechaInicio" class="form-control" disabled />
					</div>

					<div class="col">
						<p>Fecha Término</p>
						<input type="date" id="fechaTermino" class="form-control" disabled/>
					</div>
				</div>
				<div class="row justify-content-md-center div-separacion-mediana2">

					<div class="col">
						<p>Usuario modificó</p>
						<input type="text" id="usuariomodifico" class="form-control" disabled />
					</div>

					<div class="col">
						<p>Fecha Modificación</p>
						<input type="date" id="fechaModificacion" class="form-control" disabled />
					</div>

				</div>

				<!-- <div class="row justify-content-md-center div-separacion-mediana2">
			<div class="col-4">
				<p>Situaci�n</p>
				<input type="text" class="form-control" size="10" name="datepicker2"
					id="datepicker" value="Activo" />
			</div>
		</div> -->
				<br>
				<!-- <div class="text-center justify-content-md-center div-separacion-md1">
			<button type="button" class="btn btn-success" id="habilitarInsertarPuesto"
				onclick="habilitarInsertarPuesto()"> Insertar Puesto </button>

			<button type="button" class="btn btn-success" id="insertarPuesto"
				onclick="insertarPuesto()" hidden>Insertar Puesto</button> -->
				<div class="text-center">
					<button type="button" id="limpiarPuesto" class="btn btn-primary">Limpiar Campos
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
							<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
						</svg>
					<button type="button" class="btn btn-danger" id="botonModificarUno" disabled>Habilitar todo
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
							<path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
						</svg>
					</button>
					<button disabled type="button" class="btn btn-warning" id="modificarPuesto"
						onclick="guardarCambios()"> Modificar 
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
						</svg>
					</button>

				</div>

			</div>
			</div>
			</div>


			<!--<script src="js/consulta_puestos.js"></script>-->
			<script src="js/modificar_puestoxcodigo.js"></script>

			<%@ include file="common/footer.jsp" %>
				<div class="col">

					<input type="text" id="usuarioCapturoid" class="form-control" hidden />
				</div>

				<div class="col">

					<input type="text" id="usuariomodificoid" class="form-control" hidden />
				</div>