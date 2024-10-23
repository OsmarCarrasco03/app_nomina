<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
			<div class="container rounded div-padding input-color div-separacion-mediana">
				<div class="text-center espacio-titulo ">
					<h3> REGISTRAR DE ID'S DE CONCEPTOS</h3>
				</div>



<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="modalInfoLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="myModalLabel">Tabla de Partidas</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="table-responsive">
                    <table id="tablaPartidas" class="table table-striped">
                    
                     <input type="text" id="filtroBusqueda" placeholder="Buscar..." class="form-control mt-3">
                        <thead>
                            <tr>
                                <th>Clave</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody id="tbodyPartidas">
                            <!-- Aquí se agregarán las filas de la tabla dinámicamente -->
                        </tbody>
                    </table>
                </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>




<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
				  <div class="modal-content">
					<div class="modal-header">
					  <h5 class="modal-title" id="myModalLabel">Tabla de Partidas</h5>
					  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					  </button>
					</div>
					<div class="modal-body">
					  <table id="tablaPartidas" class="table">
						<thead>
						  <tr>
							<th>Clave</th>
							<th>Nombre</th>
						  </tr>
						</thead>
						<tbody id="tbodyPartidas">
						  <!-- Aquí se agregarán las filas de la tabla dinámicamente -->
						</tbody>
					  </table>
					</div>
					<div class="modal-footer">
					  <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
					</div>
				  </div>
				</div>
			  </div>



				<div class="modal fade" id="modalInfo" tabindex="-1" role="dialog" aria-labelledby="modalInfoLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="modalInfoLabel">Calendario de períodos de pago.</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar" onclick="limpiarCampos()"></button>
							</div>
							<div class="modal-body">
								<table class="table">
									<thead>
										<tr>
											<th>PERIODO</th>
											<th>FECHA INICIAL</th>
											<th>FECHA FINAL </th>
											<th>APLICA</th>
										</tr>
									</thead>
									<tbody>
										<!-- Aquí puedes insertar las filas de la tabla dinámicamente -->
										
										<!-- Puedes agregar más filas según sea necesario -->
									</tbody>
								</table>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limpiarCampos()">Cerrar</button>
								<button type="button" class="btn btn-primary" id="seleccionarBtn">Seleccionar</button>
							</div>
						</div>
					</div>
				</div>


				<br>

				<div class="container centered-container" id="forms">

					<ul class="nav nav-tabs" id="myTab" role="tablist">
						<li class="nav-item" role="presentation">
							<button class="nav-link active" id="datosConcepto-tab" data-bs-toggle="tab"
								data-bs-target="#datosConcepto" type="button" role="tab" aria-controls="datosConcepto"
								aria-selected="true">ID's DE CONCEPTO</button>
						</li>

						<li class="nav-item" role="presentation">
							<button class="nav-link" id="valorConcepto-tab" data-bs-toggle="tab"
								data-bs-target="#valorConcepto" type="button" role="tab" aria-controls="valorConcepto"
								aria-selected="false">VALORES
								DE CONCEPTO</button>
						</li>

						<li class="nav-item" role="presentation">
							<button class="nav-link" id="datosEmpleado-tab" data-bs-toggle="tab"
								data-bs-target="#datosEmpleado" type="button" role="tab" aria-controls="datosEmpleado"
								aria-selected="false">PARÁMETROS DE CONCEPTO</button>
						</li>


						<li class="nav-item" role="presentation">
							<button class="nav-link" id="datosCentro-tab" data-bs-toggle="tab"
								data-bs-target="#datosCentro" type="button" role="tab" aria-controls="datosCentro"
								aria-selected="false">IMPORTE DE CONCEPTO</button>
						</li>

						<li class="nav-item" role="presentation" hidden>
							<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
								data-bs-target="#datosControl" type="button" role="tab" aria-controls="datosControl"
								aria-selected="false">Datos
								de control</button>
						</li>

					</ul>

					<div class="tab-content" id="myTabContent">
						<div class="tab-pane fade show active" id="datosConcepto" role="tabpanel"
							aria-labelledby="datosConcepto-tab">
							<div class="card">
								<div class="card-body">

									<div class="text-center">
										<hr>
										<div class="color-hr">
											<b>
												<P>IDENTIFICADORES DE CONCEPTO</P>
											</b>
										</div>
										<hr>
									</div>

									<div>


										<div class="row justify-content-md-center">
											<div class="col-2">
												<b> EJERCICIO</b>
												<input class="form-control" id="ejercicio" >
											</div><div class="col-2">
												<b> vigencia</b>
												<input type= 'date'class="form-control" id="vigencia" >
											</div>
											<div class="col-2">
												<b> CLAVE</b>
												<input class="form-control" id="conceptos" >
											</div>

											<!-- Sección 2 -->
										<div class="col-5">
    <label for="clasificacionRegistro"><b>CLASIFICACIÓN</b></label>
    <select class="form-control" id="clasificacionRegistro">
     
        <!-- Agrega más opciones según sea necesario -->
    </select>
</div>


											<!-- Sección 3 -->
											<div class="col-5">
												<label for="tipo"><b>TIPO</b></label>
												<select class="form-control" id="tipo">
												 
													<!-- Agrega más opciones según sea necesario -->
												</select>
											</div>
										</div><br>



										<div class="row justify-content-md-center">
											<!-- Sección 4 -->
											<div class="col-md-12">
												<div class="input-group mb-2">
													<div class="input-group-prepend col-md-2">
														<span class="input-group-text"
															id="basic-addon3"><b>DESCRIPCION</b></span>
													</div>
													<div class="col-md-10">
														<input class="form-control" id="descripcion" >
													</div>
												</div><br>


												<div class="row justify-content-md-center">
													<!-- Sección 4 -->
													<div class="col-md-12">
														<div class="row">
															<div class="col-md-2 text-right">
																<div class="input-group-prepend col-md-25">

																	<span class="input-group-text" id="basic-addon3"><b>PARTIDA</b>
																		<button id="btnAbrirModal" class="btn btn-primary" style="padding: 0; width: 40px; height: 25px; margin-right: 5px;">
																			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" style="width: 16px; height: 16px;">
																				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
																			</svg>
																		</button>
																	</span>
																	
																	

																	
																	
																</div>
															</div>
															<div class="col-md-2">
																<div class="input-group">
																	<input class="form-control" id="partida" >
																</div>
															</div>
															<div class="col-md-8">
																<!-- Sin input-group para el segundo select -->
																<input class="form-control" id="descpartida" >
															</div>

															
														</div>
													</div>
												</div>

												<div class="text-center">
													<hr>
													<div class="color-hr">
														<b>
															<P>PRENTACIÓN EN RADICACIÓN</P>
														</b>
													</div>
													<hr>
												</div>
												<div class="row">
													<div class="col-3 border p-3">
														<b>Reportando bloque que genera</b>
														<form name="input">
															<input type="radio" name="TIPOCOSTO" id="SiTipocosto"
																 /> SI
															<input type="radio" name="TIPOCOSTO" id="NoTipocosto"
																 /> NO
														</form>
													</div>

													<div class="col-3 border p-3">
														<b>Diferenciado por antecedente</b>
														<form name="input"><br>
															<input type="radio" name="AGRPXANTECEDENTE"
																id="SiAgrpzantecedente" />SI
															<input type="radio" name="AGRPXANTECEDENTE"
																id="NoAgrpzantecedente"  /> NO

														</form>
													</div>


													<div class="col-3 border p-3">
														<b>Forzar prestación de concepto</b>

														<form name="input"><br>
															<input type="radio" name="RFPCONCEPTO" id="SiRfpconcepto"
																 />SI
															<input type="radio" name="RFPCONCEPTO" id="NoRfpconcepto"
																 />NO

														</form>
													</div>


													<div class="col-3 border p-3">
														<b>Reportado en bloque que genera(CANCELADOS)</b>
														<form name="input">
															<input type="radio" name="TIPOCOSTOCAN" id="SiTipocostocan"
																 />SI
															<input type="radio" name="TIPOCOSTOCAN" id="NoTipocostocan"
																 />NO
														</form>
													</div>
												</div>

												<div class="text-center">
													<hr>
													<div class="color-hr">
														<b>AGRUPACIONES DE ISR ANUAL</b>
													</div>
													<hr>
												</div>

												<div class="row">
													<div class="col-4">
														<b>Grupo primario de conceptos acumulados:</b>
													</div>
													<div class="col-8">
													
														<select class="form-control" id="grupoAcum">
														 
															<!-- Agrega más opciones según sea necesario -->
														</select><br>
													</div>

													<div class="col-4">
														<b>Grupo secundario de conceptos acumulados:</b>
													</div>
													<div class="col-8">
														
													
															<select class="form-control" id="grupoSecu">
															 
																<!-- Agrega más opciones según sea necesario -->
															</select><br>
														
														<br>

														<form name="input">


															<input type="radio" name="CLASEGRPSEC" id="conceptogravado"
																 />Concepto gravado
															<input type="radio" name="CLASEGRPSEC" id="conceptoexterno"
															/>Concepto externo

														</form>
														<br>
													</div>


													<div class="col-4">
														<b>Deducción de grupo de conceptos</b>
													</div>
													<div class="col-8">

														<select class="form-control" id="grupoAcumd">
															 
															<!-- Agrega más opciones según sea necesario -->
														</select><br>

														<br>
													</div>
												</div>


											</div>

										</div>

									</div>


								</div>
							</div>
						</div>


						<!-- ==============================AQUI FIN DEL PRIMER MÓDULO ID'S DE CONCEPTO ================================ -->


						<div class="tab-pane fade" id="valorConcepto" role="tabpanel"
							aria-labelledby="valorConcepto-tab">
							<div class="card">
								<div class="card-body">
									<!-- AQUI EMPIEZA PARA LA PARTE DE DATOS DE ORIGEN  -->
									<div class="row">
										<div class="text-center ">
											<hr>
											<div class="color-hr">
												<h6>VALOR DE CONCEPTO</h6>
											</div>
											<hr>
										</div>
									</div>

									<!-- AQUI TERMINA PARA LA PARTE DE DATOS DE ORIGEN  -->
									<div class="accordion-body">
										<div class="container-fluid cew-9">
											<div class="row">
												<hr>
												<b>
													<p>VALORES DE CONCEPTO</p>
												</b>
												<hr>
												<div class="col">
													<P>ID de cuenta de pasivo para registro de costos en GRP</P>
												</div>
												<div class="col">
													<input class="form-control" id="cuentapasivo" name="CUENTAPASIVO"
														>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col">
													<P>ID de proveedor para registro de cuenta por pagar en GRP</P>
												</div>
												<div class="col">
													<input class="form-control" id="idprovgrp" name="IDPROVGRP"
													>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col">
													<P>ID de cuenta de egresos o ingresos para registro de
														costos en GRP</P>
												</div>
												<div class="col">
													<input class="form-control" id="rubrocontable" name="RUBROCONTABLE"
														>
												</div>
											</div>
											<br>
											COSTOCENTRALIZADO

											<div class="row">
												<div class="col-6">
													<P>Registro de costo centralizado o por Unidad Operativa GRP</P>
												</div>
												<div class="col-6">
													<form name="input">

														<input type="radio" name="COSTOCENTRALIZADO"
															id="CentraCostocentralizado" />Centralizado
														<input type="radio" name="COSTOCENTRALIZADO"
															id="UnidadCostocentralizado"/>Unidad Operativa GRP
													</form>
												</div>
											</div>
											<br>
											<div class="row">
												<div class="col">
													<P>Costo asignado a partida de:</P>
												</div>
												<div class="col">
													<form name="input">
														<input type="radio" name="TIPOAGASTO" id="Sitipogasto"
														 />Concepto Base
														<input type="radio" name="TIPOAGASTO" id="Notipogasto"
															 />Concepto Antecedente

													</form>
												</div>
											</div>
											<div class="row">
												<div class="col">
													<hr>
													<b>
														<P>VALORES DE TIMBRADO</P>
													</b>
													<hr>
												</div>
												<div class="row">
													<P>ID de registro de CONCEPTO REGULAR en archivo de timbrado:</P>
													<div class="col">
														<select class="form-control" id="alfatimbrado">
															 
															<!-- Agrega más opciones según sea necesario -->
														</select>
													</div>
													<div class="col-5">
														<select class="form-control" id="timbrado">
															 
															<!-- Agrega más opciones según sea necesario -->
														</select>
													</div>

													<div class="col-5">
														<form name="input">
															<p>Activar *Otros Pagos*</p>
															<input type="radio" name="activaruno" id="activaruno" /> SI
															<input type="radio" name="activardos" id="activardos" />
														</form>
													</div>
												</div>
											</div>
											<div class="row">
												<P>ID de registro de CONTRA CONCEPTO en archivos de timbrado</P>
												<div class="col">
													<select class="form-control" id="alfatimbradoContra">
															 
														<!-- Agrega más opciones según sea necesario -->
													</select>
												</div>
												<div class="col-5">
													<select class="form-control" id="timbradoContra">
															 
														<!-- Agrega más opciones según sea necesario -->
													</select>
												</div>

												<div class="col-5">
													<form name="input">
														<p>Activar *Otros Pagos*</p>
														<input type="radio" name="activartres" id="activartres"
															value="SI" /> SI <input type="radio" name="activarcuatro"
															id="activarcuatro" value="NO" /> NO
													</form>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>
						</div>




						<div class="tab-pane fade" id="datosEmpleado" role="tabpanel"
							aria-labelledby="datosEmpleado-tab">
							<div class="card">
								<div class="card-body">
									<!-- AQUI EMPIEZA PARA LA PARTE DE DATOS DE EMPLEADO  -->
									<div class="row">
										<div class="text-center">
											<hr>
											<div class="color-hr">
												<h6>PARÁMETROS DEL CONCEPTO</h6>
											</div>
											<hr>
										</div>
									</div>

									<!-- Tablas con radio buttons -->
									<div class="row">
										<div class="col">
											<!-- Tabla izquierda -->
											<table class="table">
												<thead>
													<tr>
														<th scope="col">Parámetro</th>
														<th scope="col">Sí</th>
														<th scope="col">No</th>
													</tr>
												</thead>
												<tbody>
													<!-- Aquí puedes añadir filas según tus datos -->
													<tr>
														<td>Aplicar a todos los puesto</td>
														<td><input type="radio" name="TIPOAPLICA" id="Sitipoaplica">
														</td>
														<td><input type="radio" name="TIPOAPLICA" id="Notipoaplica">
														</td>
													</tr>
													<tr>
														<td>Conceptos Gravable</td>
														<td><input type="radio" name="CONCEPTOGRAVABLE" id="Sigravable"
																></td>
														<td><input type="radio" name="CONCEPTOGRAVABLE" id="Nogravable" >
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill ml-2" style="margin-left: 10px; cursor: pointer;" alt="Ícono de búsqueda" onclick="abrirModal(this)">
																<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
																<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
															</svg>
															
		
		
		
		
		
		
		
														</td>
														
																
													</tr>

													<div class="modal fade" id="myModalNuevo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
														<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
															<div class="modal-content">
																<div class="modal-header">
																	<h5 class="modal-title">Nuevo Modal</h5>
																	<button type="button" class="close" data-dismiss="modal" aria-label="Close">
																		<span aria-hidden="true">&times;</span>
																	</button>
																</div>
																<div class="modal-body">
																	<span class="text-danger">Modalidad de calculo de
																		impuesto</span>
																	<div class="row">
		
																		<div class="col-md-8">
																			<label>Modalidad de determinación de
																				importe</label>
																		

																				<select class="form-control" id="gvmodalidad">
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																		<div class="col-md-4">
																			<label>Factor</label>
																			<input type="number" class="form-control"
																				name="GVFACTOR" id="gvfactor" >
																		</div>
																	</div>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<label>Modalidad de integración a base
																				gravable</label>
																		
																				<select class="form-control" id="gvtipointegra" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																	</div>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<div class="form-check">
																				<input class="form-check-input"
																					type="checkbox" name="AFXCANCELACION"
																					id="afxcancelacion" >
																				<label class="form-check-label"
																					for="baseGravableCheckbox1">
																					Afectado para base gravable de
																					cancelación
																				</label>
																			</div>
																		</div>
																	</div>
																	<hr>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<div class="form-check">
																				<input class="form-check-input"
																					type="checkbox" name="GVEXCENTO"
																					id="gvexcento" >
																				<label class="form-check-label"
																					for="baseGravableCheckbox2">
																					Exento Aplicable
																				</label>
																			</div>
																		</div>
																	</div>
																	<hr>
																	<div class="row">
																		<div class="col-md-8">
																			<label>Modalidad de determinación de importe
																				exento</label>
																			
																				<select class="form-control" id="gvexcmod" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																		<div class="col-md-4">
																			<label>Factor</label>
																			<input type="number" class="form-control"
																				name="GVEXCFACTOR" id="gvexcfactor" >
																		</div>
																	</div>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<div class="form-check">
																				<input class="form-check-input"
																					type="checkbox" id="subsidiar" >
																				<label class="form-check-label"
																					for="subsidiar">
																					Impuesto Subsidiado
																				</label>
																			</div>
																		</div>
																	</div>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<label>Gasto Asignado a</label>
																		

																				<select class="form-control" id="subgasto" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																	</div>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<b>PERSONAL ACTIVO</b>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col-md-8">
																			<label>Calcular sobre base</label>
																			
																				<select class="form-control" id="subtcalac" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																		<div class="col-md-4">
																			<label>Gravar subsidio</label>
																		
																				<select class="form-control" id="subtgrvac" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																	</div>
																	<div class="row mt-3">
																		<div class="col-md-12">
																			<b>PERSONAL DE BAJA</b>
																		</div>
																	</div>
																	<div class="row">
																		<div class="col-md-8">
																			<label>Calcular sobre la base</label>
																		
																				<select class="form-control" id="subtcalba" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																		<div class="col-md-4">
																			<label>Gravar subsidio</label>
																		

																				<select class="form-control" id="subtgrvba" >
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																	</div>
																	<input type="text" class="form-control" id="nuevoInput">
																</div>
																<div class="modal-footer">
																	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
																</div>
															</div>
														</div>
													</div>
													
												
														
		
													<tr	>
														<td>Conceptos Cotizable (Seguridad Social)</td>
														<td><input type="radio" name="CONCEPTOCOTIZABLE" id="Sicotizable"
																></td>
														<td><input type="radio" name="CONCEPTOCOTIZABLE" id="Nocotizbale">
		
		
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill ml-2" style="margin-left: 10px; cursor: pointer;" alt="Ícono de búsqueda" onclick="abrirModaldos(this)">
																<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
																<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
															</svg>
															
															
														</td>
													</tr>
													<div class="modal fade" id="myModalcotizable" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
														  aria-labelledby="staticBackdropLabel" aria-hidden="true">
														  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
															<div class="modal-content">
																<div class="modal-header">
																	<h5 class="modal-title">COTIZABLE</h5>
																	<button type="button" class="close" data-dismiss="modal"
																		aria-label="Close">
																		<span aria-hidden="true">&times;</span>
																	</button>
																</div>
																<div class="modal-body">
																	Seguridad social
																	<div class="row">
		
																		<div class="col-md-8">
																			<label>Modalidad </label>
																		
																				<select class="form-control" id="czmodalidad">
															 
																					<!-- Agrega más opciones según sea necesario -->
																				</select>
																		</div>
																		
																		<div class="col-md-4">
																			<label>Factor</label>
																			<input type="text" class="form-control"
																				name="CZFACTOR" id="czfactor" >
																		</div>
																	</div>
																</div>
																<div class="modal-footer">
																	<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
													
																</div>
															</div>
														</div>
													</div>
		


													<tr>
														<td>Afectado por base cotizable</td>
														<td><input type="radio" name="AFXMBCOTIZABLE" id="Siafectado">
														</td>
														<td><input type="radio" name="AFXMBCOTIZABLE" id="Noafectado">
														</td>
													</tr>


													<tr>
														<td>Aplicar en todos los periodos de pago</td>
														<td><input type="radio" name="PERIODOSDEPAGO" id="Siperiodosdepago" ></td>
														<td><input type="radio" name="PERIODOSDEPAGO" id="Noperiodosdepago">
															
															<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="ml-2" style="margin-left: 10px;" alt="Ícono de búsqueda" id="mostrarOpcionesuno" type="button" class="btn btn-primary" data-bs-toggle="modal"  id="modalInfo" fill="currentColor" class="bi bi-eye-fill ml-2" style="margin-left: 10px; cursor: pointer;" alt="Ícono de búsqueda" onclick="abrirModaltres(this)">
																<path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
																<path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
															</svg>
															
															
															
															
		
													</tr>
		
													<!-- <button id="mostrarOpcionesuno" type="button" class="btn btn-primary rounded-pill py-2 px-4 border-0" data-bs-toggle="modal" data-bs-target="#staticBackdropPeriodo">
														BUSQUEDA DE CONCEPTOS
														<img src="bootstrap-icons/search.svg" class="ml-2" alt="Ícono de búsqueda">
													</button> -->
													
													<!-- MODAL PARA CONCEPTOS DE NÓMINA  -->
		<div class="modal fade" id="staticBackdropPeriodo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
		aria-labelledby="staticBackdropLabel" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="staticBackdropLabel">CONCEPTOS DE NÓMINA</h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body" id="opcionesBodyPeriodos" style="max-height: 400px; overflow-y: auto;">
					<!-- Contenido de la tabla de opciones se agregará aquí -->
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
				</div>
			</div>
		</div>
		</div>
		
										
										
												</div>
													<tr>
														<td>Impreso en comprobante</td>
														<td><input type="radio" name="IMPRIMIR" id="Siimprimir"></td>
														<td><input type="radio" name="IMPRIMIR" id="Noimprimir"></td>
													</tr>

													<tr>
														<td>Afectado por inasistencia</td>
														<td><input type="radio" name="AFXFALTAS" id="Siafxfaltas"></td>
														<td><input type="radio" name="AFXFALTAS" id="Noafxfaltas"></td>
													</tr>

													<tr>
														<td>Afectado por contador de aplicaciones</td>
														<td><input type="radio" name="MODCONTADORES"
																id="SiModcontadores"></td>
														<td><input type="radio" name="MODCONTADORES"
																id="NoModcontadores"></td>
													</tr>

													<tr>
														<td>Afectado por liquidación (Sueldos)</td>
														<td><input type="radio" name="LIQSUELDOS" id="SiLiqsueldos">
														</td>
														<td><input type="radio" name="LIQSUELDOS" id="NoLiqsueldos">
														</td>
													</tr>

													<tr>
														<td>Afectado por liquidación (Prestaciones)</td>
														<td><input type="radio" name="LIQOTRASPREST"
																id="SiLiqotrasprest"></td>
														<td><input type="radio" name="LIQOTRASPREST"
																id="NoLiqotrasprest"></td>
													</tr>


													<tr>
														<td>Concepto de grupo de finiquito</td>
														<td><input type="radio" name="AFXFINIQUITO" id="SiAfxfiniquito">
														</td>
														<td><input type="radio" name="AFXFINIQUITO" id="NoAfxfiniquito">
														</td>
													</tr>


													<!-- Añade más filas según sea necesario -->
												</tbody>
											</table>
										</div>
										<div class="col">
											<!-- Tabla derecha -->
											<table class="table">
												<thead>
													<tr>
														<th scope="col">Parámetro</th>
														<th scope="col">Sí</th>
														<th scope="col">No</th>
													</tr>
												</thead>
												<tbody>
													<!-- Aquí puedes añadir filas según tus datos -->
													<tr>
														<td>Afectado por bloque de calculos retroactivos</td>
														<td><input type="radio" name="AFXANLRETRO" id="SiAfxanlretro">
														</td>
														<td><input type="radio" name="AFXANLRETRO" id="NoAfxanlretro">
														</td>
													</tr>
													<tr>
														<td>Afectado en pago fraccionado (Cálculo X día)</td>
														<td><input type="radio" name="AFXCALFRAC" id="SiAfxcalfrac">
														</td>
														<td><input type="radio" name="AFXCALFRAC" id="NoAfxcalfrac">
														</td>
													</tr>

													<tr>
														<td>Afectado para pensión alimenticia básica</td>
														<td><input type="radio" name="AFXPENSION" id="SiAfxpension">
														</td>
														<td><input type="radio" name="AFXPENSION" id="NoAfxpension">
														</td>
													</tr>

													<tr>
														<td>Afectado para pensión x neto líquido</td>
														<td><input type="radio" name="AFXPENNETO" id="SiAfxpenneto">
														</td>
														<td><input type="radio" name="AFXPENNETO" id="NoAfxpenneto">
														</td>
													</tr>



													<tr>
														<td>Afectado para pensión x per. adicional</td>
														<td><input type="radio" name="AFXPENADIC" id="SiAfxpenadic">
														</td>
														<td><input type="radio" name="AFXPENADIC" id="NoAfxpenadic">
														</td>
													</tr>


													<tr>
														<td>Afectado por suspensión en sueldos</td>
														<td><input type="radio" name="AFXSUSPENSION"
																id="SiAfxsuspension"></td>
														<td><input type="radio" name="AFXSUSPENSION"
																id="NoAfxsuspension"></td>
													</tr>

													<tr>
														<td>Afectado por licencia médica sin sueldo</td>
														<td><input type="radio" name="AFXLICSS" id="SiAfxlicss"></td>
														<td><input type="radio" name="AFXLICSS" id="NoAfxlicss"></td>
													</tr>


													<tr>
														<td>Afectado por licencia médica a medio sueldo</td>
														<td><input type="radio" name="AFXLICMS" id="SiAfxlicms"></td>
														<td><input type="radio" name="AFXLICMS" id="NoAfxlicms"></td>
													</tr>

													<tr>
														<td>Incluir en cálculo de reintegros</td>
														<td><input type="radio" name="AFXREINTEGRO" id="SiAfxreintegro">
														</td>
														<td><input type="radio" name="AFXREINTEGRO" id="NoAfxreintegro">
														</td>
													</tr>

													<tr>
														<td>Concepto de grupo de Indemnizaciones</td>
														<td><input type="radio" name="GRPINDEMNI" id="SiGrpindemni">
														</td>
														<td><input type="radio" name="GRPINDEMNI" id="NoGrpindemni">
														</td>
													</tr>


													<!-- Añade más filas según sea necesario -->
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>





						<div class="tab-pane fade" id="datosCentro" role="tabpanel" aria-labelledby="datosCentro-tab">
							<div class="card">
								<div class="card-body">
									<div class="container " id="forms">
										<!-- AQUI EMPIEZA PARA LA PARTE DE CENTRO DE DISTRIBUCION Y TRABAJO  -->
										<div class="text-center ">
											<hr>
											<div class="color-hr">
												<h6>IMPORTE
													DE CONCEPTO</h6>
											</div>
											<hr>
										</div>





										<div class="accordion-body">
											<div class="row">
												<hr>
												<b>
													<p>VALORES DE IMPORTE</p>
												</b>
												<hr>

												<div class="col-2">
													<br>
													<p>Tipo de importe</p>
												</div>

												<div class="col-10">
													<p></p>
													<select class="form-control" id="tipoimporte">
															 
														<!-- Agrega más opciones según sea necesario -->
													</select>
												</div>

											</div>
											<div class="row">

												<div class="col-2">
													<br>
													<p>Factor de origen</p>
												</div>

												<div class="col-10">
													<p></p>
													<select class="form-control" id="origenfactor">
															 
														<!-- Agrega más opciones según sea necesario -->
													</select>
													
														
												</div>

											</div>
											<div class="row">

												<div class="col-2">
													<br>
													<p>Origen de importe</p>
												</div>

												<div class="col-10">
													<p></p>

													<select class="form-control" id="origenimp">
															 
														<!-- Agrega más opciones según sea necesario -->
													</select>

													
												</div>
											</div>

										</div>
										<div class="row">

											<div class="col-2"><br>
												<p>Importe del concepto</p>
											</div>

											<div class="col-10">
												<p></p>

												<input class="form-control" name="	IMPORTE" id="importe" >

												</select><br>
											</div>
										</div>

										<br>
										<div class="row">
											<hr>
											<b>
												<p>VALORES ACEPTADOS EN FACTOR</p>
											</b>
											<hr>

											<div class="col">
												<br>
												<p>FACTOR MINIMO</p>
											</div>

											<div class="col">
												<p></p>
												<input type="text" class="form-control" id="exampleInputClave"
													placeholder="NO APLICA">
											</div>

											<div class="col">
												<br>
												<p>FACTOR MAXIMO</p>
											</div>

											<div class="col">
												<br><input type="text" class="form-control" id="exampleInputClave"
													placeholder="NO APLICA">
											</div>

											<div class="col">
												<br>
												<p>FACTOR UNICO</p>
											</div>

											<div class="col">
												<p></p>
												<select class="form-select" aria-label="Default select example">
													<option selected>1/4 día</option>
													<option value="1">1</option>


												</select><br>
											</div>
											<br>

										</div>

									</div>


<div class ="text-center">
									<button type="button" class="btn btn-success" id="registrarConcepto">
										Registrar 
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

			</div>


			<br><br>

			
			  

			

<script src="js/registro_concepto.js"></script>

			<%@ include file="common/footer.jsp" %>