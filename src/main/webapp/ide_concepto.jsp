<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<br>

		 <br>
		
		
		<div class="container rounded div-padding input-color div-separacion-mediana">
			<div class="text-center">
				<h3> CONSULTA DE ID'S DE CONCEPTOS</h3>

				

			</div>
			
			<div class="text-center justify-content-md-center ui-widget">

		
			
			<!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalInfo" id="'modalInfo">
				Abrir Modal
			</button>
			 -->

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
			










			

		</div>
		<div class="text-center">
			<div class="btn-container d-inline-block border rounded-pill px-3 py-2 shadow-sm">
				<button id="mostrarOpciones" type="button" class="btn btn-primary rounded-pill py-2 px-4 border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
					BUSQUEDA DE CONCEPTOS
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
					  </svg>
				</button>

				<button id="limpiarConsulta" type="button" class="btn btn-danger rounded-pill py-2 px-4 border-0" onclick="limpiarConsulta()">
					Limpiar Consulta
				
				</button>
				
				
			</div>
		</div><br>

		


		
		
		
		
				
		
		<!-- MODAL PARA CONCEPTOS DE NÓMINA  -->
		<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
			aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="staticBackdropLabel">CONCEPTOS DE NÓMINA</h5>
						
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body" id="opcionesBody" style="max-height: 400px; overflow-y: auto;">
						
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
		
					</div>
				</div>
			</div>



		</div>


		<div class="container centered-container" id="forms" style="overflow: hidden;">


			<ul class="nav nav-tabs" id="myTab" role="tablist">
				<li class="nav-item" role="presentation">
					<button class="nav-link active" id="datosConcepto-tab"
						data-bs-toggle="tab" data-bs-target="#datosConcepto" type="button"
						role="tab" aria-controls="datosConcepto" aria-selected="true">ID'S DE CONCEPTO</button>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="datosValor-tab" data-bs-toggle="tab"
						data-bs-target="#datosValor" type="button" role="tab"
						aria-controls="datosValors" aria-selected="false">VALORES DE CONCEPTO</button>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="datosComplementarios-tab"
						data-bs-toggle="tab" data-bs-target="#datosComplementarios"
						type="button" role="tab" aria-controls="datosComplemenatrios"
						aria-selected="false">PARAMETROS DE CONCEPTO</button>
					<br>
				</li>
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="datos_hijos-tab" data-bs-toggle="tab"
						data-bs-target="#datos_hijos" type="button" role="tab"
						aria-controls="datos_hijos" aria-selected="false">IMPORTE DE CONCEPTO</button>
					<br>
				</li>
			
				<li class="nav-item" role="presentation">
					<button class="nav-link" id="datosControl-tab" data-bs-toggle="tab"
						data-bs-target="#datosControl"type="button" role="tab"
						aria-controls="datosControl" aria-selected="false">
						DATOS DE CONTROL<br>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
							<path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
							<path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
							<path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
						  </svg>
					</button>
					</button>
				</li>
			</ul>
		 
			
		<div class="tab-content" id="myTabContent">
			<!--  AQUI EMPIEZA LA PARTE GENERAL DE LOS DATOS -->
			<div class="tab-pane fade show active" id="datosConcepto" role="tabpanel" aria-labelledby="datosConcepto-tab">
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
		
						<div class="row justify-content-md-center">
							<div class="col-2">
								<b> EJERCICIO</b>
								<input class="form-control" id="ejercicio" disabled>
							</div>
							<div class="col-2">
								<b> CLAVE</b>
								<input class="form-control" id="conceptos" disabled>
							</div>

							<div class="col-4">
								<b>TIPO</b>
								<input class="form-control" id="tipo" disabled><br>
							</div>
		
		
							<div class="col-4">
								<b> CLASIFICACIÓN</b>
								<input class="form-control" id="clasificacion" disabled>
							</div>
		
						
							<div class="col-md-12">
								<div class="input-group mb-2">
									<div class="input-group-prepend col-md-2">
										<span class="input-group-text" id="basic-addon3"><b>DESCRIPCION</b></span>
									</div>
									<div class="col-md-10">
										<input class="form-control" id="descripcion" disabled><br>
									</div>
								</div>
							</div>
		
							<div class="col-md-12">
								<div class="row">
									<div class="col-md-3">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
												<span class="input-group-text" id="basic-addon3"><b>PARTIDA</b></span>
											</div>
											<input class="form-control" id="partida" disabled>
										</div>
									</div>
									<div class="col-md-9">
										<div class="input-group mb-2">
											<div class="input-group-prepend">
		
											</div>
											<input class="form-control" id="despartida" disabled>
										</div>
									</div>
								</div>
							</div>
		
		
						</div><br>
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
									<input type="radio" name="TIPOCOSTO" id="SiTipocosto" disabled /> SI
									<input type="radio" name="TIPOCOSTO" id="NoTipocosto" disabled /> NO
								</form>
							</div>
		
							<div class="col-3 border p-3">
								<b>Diferenciado por antecedente</b>
								<form name="input"><br>
									<input type="radio" name="AGRPXANTECEDENTE" id="SiAgrpzantecedente" disabled />SI
									<input type="radio" name="AGRPXANTECEDENTE" id="NoAgrpzantecedente" disabled /> NO
		
								</form>
							</div>
		
		
							<div class="col-3 border p-3">
								<b>Forzar prestación de concepto</b>
		
								<form name="input"><br>
									<input type="radio" name="RFPCONCEPTO" id="SiRfpconcepto" disabled />SI
									<input type="radio" name="RFPCONCEPTO" id="NoRfpconcepto" disabled />NO
		
								</form>
							</div>
		
		
							<div class="col-3 border p-3">
								<b>Reportado en bloque que genera(CANCELADOS)</b>
								<form name="input">
									<input type="radio" name="TIPOCOSTOCAN" id="SiTipocostocan" disabled />SI
									<input type="radio" name="TIPOCOSTOCAN" id="NoTipocostocan" disabled />NO
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
								<input class="form-control" id="grupoacum" name="GRUPOACUM" disabled>
								<br>
							</div>
		
							<div class="col-4">
								<b>Grupo secundario de conceptos acumulados:</b>
							</div>
							<div class="col-8">
								<div class="form-group">
									<input class="form-control" id="gruposecu" name="GRUPOSECU" disabled>
								</div>
								<br>
		
								<form name="input">
		
		
									<input type="radio" name="CLASEGRPSEC" id="conceptogravado" disabled />Concepto gravado
									<input type="radio" name="CLASEGRPSEC" id="conceptoexterno" disabled />Concepto exento
		
								</form>
								<br>
							</div>
		
		
							<div class="col-4">
								<b>Deducción de grupo de conceptos</b>
							</div>
							<div class="col-8">
		
								<input class="form-control" id="grupoacumd" name="GRUPOACUMD" disabled>
		
								<br>
							</div>
						</div>
		
					</div>
				</div> <br><br><br>
			</div>


				<!--====================== AQUI FINALIZA EL MÓDULO DE DATOS GENERALES ============================================================-->
		 
		 
		 
		 
					<!-- DATOS -->
				<div class="tab-pane fade" id="datosValor" role="tabpanel"
				aria-labelledby="datosValor-tab">
				<div class="card">
					<div class="card-body">
		 
						<div class="row">
							<div class="text-center ">
								<hr>
								<div class="color-hr">
									<h6>VALOR DE CONCEPTO</h6>
								</div>
								<hr>
							</div>
						</div>


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
											disabled>
									</div>
								</div>
								<br>
								<div class="row">
									<div class="col">
										<P>ID de proveedor para registro de cuenta por pagar en GRP</P>
									</div>
									<div class="col">
										<input class="form-control" id="idprovgrp" name="IDPROVGRP" disabled>
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
											disabled>
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
												id="CentraCostocentralizado" disabled />Centralizado
											<input type="radio" name="COSTOCENTRALIZADO"
												id="UnidadCostocentralizado" disabled />Unidad Operativa GRP
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
												disabled />Concepto Base
											<input type="radio" name="TIPOAGASTO" id="Notipogasto"
												disabled />Concepto Antecedente
			
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
											<input class="form-control" id="equivtimbrado" disabled>
										</div>
										<div class="col-5">
											<input class="form-control" id="sueldos" disabled>
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
										<input class="form-control" id="equivtimbradoContra" disabled>
									</div>
									<div class="col-5">
										<input class="form-control" id="ingresos" disabled>
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
				</div><br><br><br>
			</div>
		 
		 
			<!-- ======DATOS=========  -->
		 
		 
		 
		 
				<!--================DATOS ==================-->
				<div class="tab-pane fade" id="datosComplementarios" role="tabpanel"
					aria-labelledby="datosComplementarios-tab">
					<div class="card">
						<div class="card-body">
							
							<div class="row">
								<div class="text-center">
									<hr>
									<div class="color-hr">
										<h6>PARÁMETROS DEL CONCEPTO</h6>
									</div>
									<hr>
								</div>
							</div>

							<div class="row">
								<div class="col">
									<!-- Tabla izquierda -->
									<table class="table" id="tabla1">
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
										
												<div class="modal fade" id="myModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
			                                      aria-labelledby="staticBackdropLabel" aria-hidden="true">
												  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
													<div class="modal-content">
														<div class="modal-header">
															<h5 class="modal-title">Valores de impuesto</h5>
															<button type="button" class="close" data-dismiss="modal"
																aria-label="Close">
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
																	<input type="text" class="form-control"
																		name="GVMODALIDAD" id="gvmodalidad" disabled>
																</div>
																<div class="col-md-4">
																	<label>Factor</label>
																	<input type="number" class="form-control"
																		name="GVFACTOR" id="gvfactor" disabled>
																</div>
															</div>
															<div class="row mt-3">
																<div class="col-md-12">
																	<label>Modalidad de integración a base
																		gravable</label>
																	<input type="text" class="form-control"
																		name="GVTIPOINTEGRA" id="gvtipointegra" disabled>
																</div>
															</div>
															<div class="row mt-3">
																<div class="col-md-12">
																	<div class="form-check">
																		<input class="form-check-input"
																			type="checkbox" name="AFXCANCELACION"
																			id="afxcancelacion" disabled>
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
																			id="gvexcento" disabled>
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
																	<input type="text" class="form-control"
																		name=" GVEXCMOD" id="gvexcmod" disabled>
																</div>
																<div class="col-md-4">
																	<label>Factor</label>
																	<input type="number" class="form-control"
																		name="GVEXCFACTOR" id="gvexcfactor" disabled>
																</div>
															</div>
															<div class="row mt-3">
																<div class="col-md-12">
																	<div class="form-check">
																		<input class="form-check-input"
																			type="checkbox" id="subsidiar" disabled>
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
																	<input type="text" class="form-control"
																		name="SUBGASTO" id="subgasto" disabled>
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
																	<input type="text" class="form-control"
																		name="SUBTCALAC" id="subtcalac" disabled>
																</div>
																<div class="col-md-4">
																	<label>Gravar subsidio</label>
																	<input type="text" class="form-control"
																		name="SUBTGRVAC" id="subtgrvac" disabled>
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
																	<input type="text" class="form-control"
																		name="SUBTCALBA" id="subtcalba" disabled>
																</div>
																<div class="col-md-4">
																	<label>Gravar subsidio</label>
																	<input type="text" class="form-control"
																		name="SUBTGRVBA" id="subtgrvba" disabled>
																</div>
															</div>
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
																	<input type="text" class="form-control"
																		name="CZMODALIDAD" id="czmodalidad" disabled>
																</div>
																<div class="col-md-4">
																	<label>Factor</label>
																	<input type="text" class="form-control"
																		name="CZFACTOR" id="czfactor" disabled>
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
												<td><input type="radio" name="MODCONTADORES" id="SiModcontadores">
												</td>
												<td><input type="radio" name="MODCONTADORES" id="NoModcontadores">
												</td>
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
												<td><input type="radio" name="LIQOTRASPREST" id="SiLiqotrasprest">
												</td>
												<td><input type="radio" name="LIQOTRASPREST" id="NoLiqotrasprest">
												</td>
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
									<table class="table" id="table2">
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
												<td><input type="radio" name="AFXSUSPENSION" id="SiAfxsuspension">
												</td>
												<td><input type="radio" name="AFXSUSPENSION" id="NoAfxsuspension">
												</td>
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
					</div><br><br><br>
				</div>
				<!-- DATOS -->
		 
		 
		 
		 
		 
		 
				<!-- DATOS  -->
				<div class="tab-pane fade" id="datos_hijos" role="tabpanel"
					aria-labelledby="datos_hijos-tab">
					<div class="card">
						<div class="card-body">
		 
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
												<input class="form-control" name="TIPOIMPORTE" id="tipoimporte"
													disabled>
											</div>

										</div>
										<div class="row">

											<div class="col-2">
												<br>
												<p>Factor de origen</p>
											</div>

											<div class="col-10">
												<p></p>
												<input class="form-control" name="ORIGENFACTOR" id="origenfactor"
													disabled>
											</div>

										</div>
										<div class="row">

											<div class="col-2">
												<br>
												<p>Origen de importe</p>
											</div>

											<div class="col-10">
												<p></p>

												<input class="form-control" name="ORIGENIMP" id="origenimp" disabled>
											</div>
										</div>

									
									<div class="row">

										<div class="col-2"><br>
											<p>Importe del concepto</p>
										</div>

										<div class="col-10">
											<p></p>

											<input class="form-control" name="	IMPORTE" id="importe" disabled>

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
		 
		 
					</div>
				</div>
		 <br><br>
		 
				<!-- DATOS  -->
		 
		 
		 </div>
		 
				<!-- DATOS  -->
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
										<b>Fecha de inicio</b> <input class="form-control" type="date" name="FECHAINICIO"
											id="fechainicio" disabled>
									</div>
									
			
									<div class="col-4">
			
										<b>Usuario que capturo</b> <input class="form-control" name="USUCAPTURO"
											type="text" id="usucapturo" disabled>
									</div>
			
									<div class="col-4">
			
										<b>Fecha de modificacion</b> <input class="form-control" name="FECHAMOD"
											type="date" id="fechamod" disabled>
									</div>
			
			
									<div class="col-4">
										<b>Usuario que realizó la última modificación </b><input
											class="form-control" type="text" id="usumodifico" name="USUMODIFICO" disabled> 
									</div>
			
								</div>
			
			
							</div>
		 
					</div>
				</div>
		 
		 
		 
			
		 
		 
		 
		 
		 
		 
	
		 
		 
				<!-- DATOS -->
		 
		 
		 
		 
		 
		
			</div>
			<!-- Agrega más tarjetas para otras secciones del formulario si es necesario -->
		 </div>
		 
		 <%@ include file="common/footer.jsp" %>


			<script src="js/consulta_concepto.js"></script>






			