<%@ include file="common/header-sesion.jsp"%>
<title>Consultar nivel</title>
<%@ include file = "common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<div
	class="container rounded div-padding input-color div-separacion-mediana div-separacion-debajo">
	<div class="col-md-12 text-center separacion-pequeña">

		<div class="row" class="col-6">
			<div class="text-center espacio-titulo">
				
					<h3>CONSULTA DE NUEVO NIVEL</h3>
				<br>
			</div>
		</div>

		<div class="justify-content-md-center ui-widget">
		

			<input style="WIDTH: 700px; HEIGHT: 30px" size=32 id="autoComplete"
				type="search" dir="ltr" spellcheck=false autocorrect="off" autocomplete="off"
				 autocapitalize="off" placeholder="Búsqueda por Nivel" oninput="this.value = this.value.toUpperCase()" onchange="validarInput(this)">

				
			
			<button type="button" class="btn btn-primary" data-descripcion="1"
			data-toggle="modal" data-target="#modalInfo" id="botonBuscar"
				onclick="buscarNivel()">Buscar
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
						<input type="text" class="form-control" id="id_nivel" disabled/>
					</div>

					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Zona</b></p>
						<input type="text" class="form-control" id="id_zona" disabled />
					</div>
					
					<div class="col-3">
						<p class="text-start espacio-inputs"><b>Situación</b></p>
						<input type="text" class="form-control" id="id_situacion" disabled />
					</div>
				
				</div>

			</form>
		</div>

		
		<!-- Segunda Sección -->
		<div id="datosControl" class="text-center" hidden>
			<%@ include file="datos_control.jsp"%>
		</div>
	</div>

	<div class="text-center justify-content-md-center div-separacion-md1">
		<button type="button" class="btn btn-danger" id="limpiarPuesto"
			 >Limpiar 
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
				<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
			</svg>	
		</button>
	</div>

</div>

<script src="js/consulta_nivel.js"></script>
<%@ include file = "common/footer.jsp" %>
