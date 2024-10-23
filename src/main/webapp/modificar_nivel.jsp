<%@ include file="common/header-sesion.jsp"%>
<title>Modificar nivel</title>
<%@ include file = "common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div
	class="container rounded div-padding input-color div-separacion-mediana div-separacion-debajo">
	<div class="col-md-12 text-center separacion-pequeña">

		<div class="row" class="col-6">
			<div class="text-center espacio-titulo">

					<h3>MODIFICAR EL NUEVO NIVEL</h3>
				<br>
			</div>
		</div>

		<div class="justify-content-md-center ui-widget">
		

			<input style="WIDTH: 700px; HEIGHT: 30px" size=32 id="autoComplete"
				type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off"
				 autocapitalize="off" placeholder="Búsqueda por Nivel" oninput="this.value = this.value.toUpperCase()" onchange="validarInput(this)">

				
			
			<button type="button" class="btn btn-primary" data-descripcion="1"
			data-toggle="modal" data-target="#modalInfo" id="botonBuscar"
				onclick="buscarNivel()" onclick="limpiarBuscar()" > Buscar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
		</div>

		
		<!-- Modal -->

		<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog"
		aria-labelledby="modalInfoLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog modal-lg" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="modalInfoLabel">Selecciona una
						opción</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Cerrar">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<!-- Opciones se agregarán aquí dinámicamente -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-bs-dismiss="modal">Cerrar
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
						</svg>
					</button>
					<button type="button" class="btn btn-primary"
						id="seleccionarBtn">Seleccionar
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Fin modal -->

		<!-- Primera Sección -->
		<div class="text-center">
			<form id="formulario">
				
				<input type="hidden" class="form-control" id="idPersona" disabled />

				<div class="row justify-content-md-center div-separacion-debajo">
					
					<div class="text-center espacio-titulo">
						
						<div class="color-hr">
							<p><b>DATOS GENERALES</b></p>
						</div>
						
					</div>
					
					
					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Nivel</b></p>
						<input type="text" class="form-control" id="id_nivel" oninput="convertirMayusculas()" onchange="validarInput(this)" disabled/>
					</div>

					

					<div id="div_mostrar_zona" class="col-3">
						<p class="text-start espacio-inputs"><b>Zona</b>
						<span class="red-asterisk">*</span></p>
						<input type="text" class="form-control" id="id_zona" disabled/>
					</div>

				

					<div id="select_usu_zona" class="col-3" hidden>
						<p class="text-start espacio-inputs"><b>Zona</b>
						<span class="red-asterisk">*</span></p>
						<select class="form-select"
							id="select_zona" aria-label="Default select example" disabled >
							<option value="1">I</option>
							<option value="2">II</option>
							<option value="3">III</option>
						</select>
					</div>
					
			
					<div id="div_mostrar_situacion" class="col-3">
						<p class="text-start espacio-inputs"><b>Situación</b>
						<span class="red-asterisk">*</span></p>
						<input type="text" class="form-control" id="id_situacion" disabled/>
					</div>

					

					<div id="select_usu_situacion" class="col-3" hidden>
						<p class="text-start espacio-inputs"><b>Situación</b>
						<span class="red-asterisk">*</span></p>
						<select class="form-select"
							id="select_situacion" aria-label="Default select example" disabled >
							<option value="1">ACTIVO</option>
							<option value="2">INACTIVO</option>
						</select>
					</div>


				
				</div>

			</form>
		</div>

		
		<!-- Segunda Sección -->
		<%@ include file="datos_control.jsp"%>
	</div>

	<div class="text-center justify-content-md-center div-separacion-md1">

		<button type="button" class="btn btn-warning" id="botonModificar"
	    onclick="HabilitarInputs()" disabled>Modificar
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
			<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
		</svg>
		</button>

		<button type="button" class="btn btn-success" id="botonActualizar"
				disabled >Guardar
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
					<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
					<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
				</svg>
		</button>

		<button type="button" class="btn btn-danger" id="limpiarPuesto" disabled
			 >Limpiar
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
				<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
			</svg>	
		</button>

	</div>

</div>

<script src="js/modificar_nivel.js"></script>
<%@ include file = "common/footer.jsp" %>
