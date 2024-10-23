<title>Registra nomina</title>
<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
			<div class="container rounded div-padding input-color div-separacion-mediana">
				<div class="row" class="col-6">
					<div class="text-center ">
						<hr>
						<div class="color-hr">
							<h3>Administración de Nominas por Periodo</h3>
						</div>
						<hr>
					</div>
				</div>


				<div class="container">
					<div class="row justify-content-center">
						<div class="rounded div-padding input-color col-md-8">
							<div class="row">
								<div class="col-md-3 text-center">
									<b>Ejercicio</b>
									<label class="custom-label required-field" for="descripcion"></label>
									<select type="text" id="inpEjercicio" class="form-select" name="descripcion" aria-label="descripcion" ></select>
								</div>
								<div class="col-md-3 text-center">
									<b>Periodo</b>
									<label class="custom-label required-field" for="descripcion"></label>
									<select type="text" class="form-select" id="inpPeriodo" name="descripcion" aria-label="descripcion" ></select>
								</div>

								<div class="col-md-3 text-center" style="position: relative; top: 24px;">
									<button type="button" class="btn btn-primary" data-descripcion="1" data-toggle="modal" data-target="#modalInfo" id="boton" onclick="tablaPeriodo()">Buscar
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
											<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
										</svg>
									</button>
								</div>

								<div class="col-md-3 text-center" style="position: relative; left: -40px; top: 24px;">
									<button type="button" class="btn btn-success" data-descripcion="1" data-toggle="modal" data-target="#modalInfo" id="botonBuscar" disabled >Agregar Nómina
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

					
		<!-- Modal -->

		<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog"
		aria-labelledby="modalInfoLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog modal-lg" role="document">
			<div class="modal-content">
				
				<div class="modal-header">
					<h5 class="modal-title" id="modalInfoLabel">Selecciona una
						nomina para registrar</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal"
						aria-label="Cerrar">
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
						id="seleccionarBtn" >Registrar Nomina
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
							<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
	<!-- Fin modal -->
				
				
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

	<br>

	<body>
		<div class="container text-center">
			<h3>Nóminas Operando</h3>
		</div>

		<style>
			.oculto {
				visibility: hidden;
			}
		</style>

		<table id="tablaInfoNominasOperando">
			<thead>
				<tr>
					<!-- <th style="visibility: hidden;">Id</th> -->
					<th>Ejercicio</th>
					<th>Clave</th>
					<th>Nombre</th>
					<th>Situacion</th>
					<th>Periodo</th>
					<th>Fecha Inicio</th>
					<th>Fecha Termino</th>
					<th>Selección</th>
				</tr>
			</thead>
			<tbody>
				
			</tbody>
		</table>

	</body>

	<div class="text-center"><br><br><br><button type="button" class="btn btn-danger" id="bajaNomina"  
		>Dar de baja
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
					<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
				</svg>	
		</button>


	</div>

	<br>

	<%@ include file="datos_control.jsp"%>
	
</div>
	

<script src="js/registrar_nomina.js"></script>
<%@ include file="common/footer.jsp" %>