<title>Agregar Periodo</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

	<div class="container rounded div-padding input-color div-separacion-mediana">
	
		<div class="text-center espacio-titulo">
			<h3>AGREGAR PERIODO</h3>
		</div>
		
		<div class="container" id="forms">
		
			<!-- <<<<<<<<<< INICIO de pestañas >>>>>>>>>> -->
			<ul class="nav nav-tabs" id="Tabs" role="tablist">
			    <li class="nav-item" role="presentation">
			        <button class="nav-link active" id="datosPeriodo-tab" data-bs-toggle="tab"
			            data-bs-target="#datosPeriodo" type="button" role="tab" aria-controls="datosPeriodo"
			            aria-selected="true">Datos del Periodo</button>
			    </li>
			</ul>
			<!-- <<<<<<<<<< FIN de pestañas >>>>>>>>>> -->
			
			<div class="tab-content" id="TabContent">
			
				<!-- <<<<<<<<<< INICIO seccion datos del periodo >>>>>>>>>> -->
				<div class="tab-pane fade show active" id="datosPeriodo" role="tabpanel" aria-labelledby="datosPeriodo-tab">
					<div class="card">
						<div class="card-body">
	
							<div class="color-hr text-center separacion-pequeña">
								<h5>DATOS DEL PERIODO</h5>
							</div>
							
							<div class="table-responsive separacion-pequeña">
								<table class="table">
									<thead>
										<tr>
											<th class="col-2">AÑO</th>
											<th class="col-3">FECHA DE APERTURA</th>
											<th class="col-3">FECHA DE CIERRE</th>
											<th class="col-2">SITUACIÓN</th>
											<th class="col-2 text-center">DATOS DE CONTROL</th>
										</tr>
									</thead>
									<tbody>
										<!-- :) -->
									</tbody>
								</table>
							</div>										
	
							<div class="text-center justify-content-md-center espacio-titulo ui-widget">
								<button type="button" class="btn btn-success"
									id="btnRegistrarPeriodo">Registrar Periodo
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
										<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
										<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
									</svg>
								</button>
							</div>
							<br>

						</div>
					</div>
				</div>
				<!-- <<<<<<<<<< FIN seccion datos del periodo >>>>>>>>>> -->

				<!-- <<<<<<<<<< INICIO modal de datos de control >>>>>>>>>> -->
				<div class="modal fade" id="modalDatosControl" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
					<div class="modal-dialog modal-lg modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-body">

							<div class="color-hr text-center separacion-pequeña">
								<h5>DATOS DE CONTROL</h5>
							</div>

							<div>
								<div class="row justify-content-md-center">

									<div class="col-4 separacion-pequeña">
										<b>Fecha de Apertura</b> <input id="inpFechaInicio"
											class="form-control text-center" type="text" disabled>
									</div>

									<div class="col-4 separacion-pequeña">
										<b>Fecha de Cierre</b> <input id="inpFechaTermino"
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
						<div class="modal-footer">
						<button id="btnCerrarModal" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
								<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
							</svg>
						</button>
						</div>
					</div>
					</div>
				</div>
				<!-- <<<<<<<<<< FIN modal de datos de control >>>>>>>>>> -->

			</div>
		</div>
	</div>

<script src="js/footer.js"></script>
<script src="js/consulta_periodos_anuales.js"></script>
<%@ include file="common/footer.jsp"%> 