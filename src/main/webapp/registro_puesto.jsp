<title>REGISTRO CÓDIGO DE PUESTO</title>
<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
			<div class="container rounded div-padding input-color div-separacion-mediana">

				<div class="row" class="col-6	">
					<div class="text-center espacio-titulo">
						
						
						<h3>REGISTRO CODIGO DE PUESTO</h3>
						
						
					</div>
				</div>

				<div class="container rounded div-padding input-color">
					<div class="row">
						<div class="col-md-4">
							<b>Código</b>
							<label class="custom-label required-field" for="codigo"></label>
							<input type="text" class="form-control" id="codigoPuesto" name="codigo" aria-label="codigo"
								onkeypress="return soloLetras(event)">
							<div id="mensajeEscribiendo" style="display: none;" onclick="limpiarCampos()">Este dato es
								unívoco y de caracteres alfanuméricos. </div>
						</div>


						<div class="col-md-4">
							<b>Descripción</b>
							<label class="custom-label required-field" for="descripcion"></label>
							<input type="text" class="form-control" id="descripcionPuesto" name="descripcion"
								aria-label="descripcion" onkeypress="return soloLetrasDes(event)">
						</div>


						<div class="col-md-4">
							<label class="custom-label" class="required-field" for="tipo">Tipo<span
									class="required-field"> </span></label> <select class="form-select" id="tipo"
								name="tipo" aria-label="Default select example">

							</select>

						</div>

						<div class="col-md-4" hidden>
							<b>Fecha Inicio</b>
							<label class="custom-label required-field" for=""></label>
							<input type="date" class="form-control" id="fechaInicio">
						</div>

						<div class="col-md-4" hidden>
							<b>Usuario que capturo</b>
							<label class="custom-label required-field" for="usucapturo"></label>
							<input type="text" class="form-control" id="usucapturoPuesto">
						</div>



						<div class="col-md-4" hidden>
							<b>Fecha Mod</b>
							<label class="custom-label required-field" for=""></label>
							<input type="date" class="form-control" id="fechaMod">
						</div>



						<div class="col-md-4" hidden>
							<b>Usuario que Modifico</b>
							<label class="custom-label required-field" for="usumodifico"></label>
							<input type="text" class="form-control" id="usuModifico">
						</div>

						<div class="col-md-4" hidden>
							<b>SITUACION</b>
							<label class="custom-label required-field" for="situacion"></label>
							<input type="text" class="form-control" id="situacion" value='1'>
						</div>

					</div>


					<div class="text-center"> <br><button type="button" id="limpiarPuesto" class="btn btn-primary"
							onclick="limpiarCampos()">Limpiar Campos
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
								<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
							  </svg>
						</button>

						<button type="button" id="registrarPuestoS" class="btn btn-success">REGISTRAR 
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
								<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
								<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
							</svg>
						</button>

					</div>

					<div class="text-center">

					</div>
				</div>



				<script src="js/registro_puesto.js"></script>

				<%@ include file="common/footer.jsp" %>