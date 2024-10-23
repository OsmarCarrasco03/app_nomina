<%@ include file="common/header-sesion.jsp"%>
<title>REPORTES DE EMPLEADOS</title>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<br>
<br>
<div class="container rounded div-padding input-color ">
	<div class="text-center espacio-titulo ">
		<h3>REPORTE DE EMPLEADOS</h3>

		<br>
	</div>
	<div class="text-center background-color">
		<h4>SELECCIONA EL REPORTE DE ACUERDO A LOS DATOS QUE DESEAS
			GENERAR</h4>
	</div>
	
</div>

<div class="container rounded div-padding input-color ">
	<div class="row mb-">
		<div class="col-md-3">
			<label class="custom-label" class="required-field" for="genero">Género<span
				class="required-field"> * </span></label> <select class="form-select"
				id="genero" name="genero" aria-label="Default select example">

			</select>


		</div>

		<div class="col-md-3">
			<label class="custom-label" class="required-field" for="situacion">Situación<span
				class="required-field"> * </span></label> <select class="form-select"
				id="situacion" name="situacion" aria-label="Default select example">

			</select>
		</div>

		<div class="col-md-3">
			<label class="custom-label" class="required-field" for="estado">Estado<span
				class="required-field"> * </span></label> <select class="form-select"
				id="estado" name="estado" aria-label="Default select example">

			</select>
		</div>


		<div class="col-md-3">
			 <label class="custom-label" class="required-field"
				for="estado">Municipio<span class="required-field"> *
			</span></label> <select class="form-select" id="municipio" name="municipio"
				aria-label="Default select example">

			</select>
		</div>



		<div class="col-md-3">
			<br> <label class="custom-label" class="required-field"
				for="edocivil">Estado Civil<span class="required-field">
					* </span></label> <select class="form-select" id="edocivil" name="edocivil"
				aria-label="Default select example">

			</select>
		</div>

		<div id="loadingOverlay" class="overlay">
			<div class="overlay-content">
				<img src="img/pareja.png" alt="Cargando..." class="spinner">
			</div>
		</div>
		
		  

		<!-- <div class="overlay" id="loadingOverlay" style="display: none">
			<div class="overlay-content">
				<div class="spinner-container">
					<div class="spinner-border text-primary" role="status">
						<span class="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		</div> -->

		<div class="col-md-3">
			<br> <label class="custom-label" class="required-field"
				for="nacionalidad">Nacionalidad</label> <select class="form-select"
				id="nacionalidad" name="nacionalidad"
				aria-label="Default select example">

			</select>
		</div>

	

		<div class="col-md-3">
			<br> <label class="custom-label" class="required-field"
				for="regimen">Régimen Issste<span class="required-field">
					* </span></label> <select class="form-select" id="regimen" name="regimen"
				aria-label="Default select example">

			</select>
		</div>
		<div class="col-md-3">
			<br> <label class="custom-label" class="required-field"
				for="contratacion">DISCAPACIDADES</label> <select class="form-select"
				id="discapacidades" name="discapacidades"
				aria-label="Default select example">

			</select>
		</div>

		<div class="col-md-3">
			<br> <label class="custom-label" class="required-field"
				for="contratacion">ESCOLARIDAD</label> <select class="form-select"
				id="escolaridad" name="escolaridad"
				aria-label="Default select example">

			</select>
		</div>

		<div class="col-md-3">
			<br> <label class="custom-label" class="required-field"
				for="contratacion">IDIOMA</label> <select class="form-select"
				id="idioma" name="idioma"
				aria-label="Default select example">

			</select>
		</div>

		<!-- <div>
			<br> -->
			<!-- <div class="row">
				<div class="col-md-6">
					<b>Centro de Trabajo</b><span style="color: red"> * </span> <input
						style="WIDTH: 600px; HEIGHT: 30px" size=32 id="autoComplete"
						type="search" dir="ltr" spellcheck=false autocorrect="off"
						autocomplete="off" autocapitalize="off"><b><label
						for="otroInputc"></label></b><span style="color: red"> </span> <input
						type="text" class="form-control" disabled id="otroInputc"
						name="otroInputc" style="width: 600px; height: 30px;" /><br>
					<input type="hidden" id="ctra_id" name="ctra_id"><input
						type="text" id="valorID" name="valorID" hidden>

					<div class="text-center">
						<button type="button" class="btn btn-dark" data-bs-toggle="modal"
							data-bs-target="#miModal">BUSQUEDA ESPECIFICA</button>
					</div>
					<div class="modal fade" id="miModal" tabindex="-1"
						aria-labelledby="miModalLabel" aria-hidden="true">
						<div
							class="modal-dialog modal-dialog-centered modal-lg custom-modal">
							<div class="modal-content">
								<div class="p-4">
									<div id="alertaModalctra" class="alert alert-danger"
										role="alert" style="display: none;"></div>
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
				</div>


				<div class="col-md-6">
					<b>Centro de Distribución</b><span style="color: red"> * </span> <input
						style="width: 600px; height: 30px" size="32" id="autoCompleteuno"
						type="search" dir="ltr" spellcheck="false" autocorrect="off"
						autocomplete="off" autocapitalize="off"> <label><b></b><span
						style="color: red"> </span></label> <input type="text"
						class="form-control" disabled id="otroInput" name=""
						style="width: 610px; height: 30px; padding-left: 100px !important;" /><br>
					<input type="hidden" id="cdis_id" name="cdis_id" value=""><input
						type="text" id="valorIDdist" name="valorIDdist" hidden>



					<div class="row">

						<div class="col text-center">
							<button type="button" class="btn btn-dark "
								data-bs-toggle="modal" data-bs-target="#miModaldist">BUSQUEDA
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
								<!-- <div class="modal-header">
									<h5 class="modal-title" id="miModal2Label">CENTRO DE
										DISTRIBUCION</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal"
										aria-label="Close"></button>
								</div> -->
								<!-- Contenido del modal -->
								<!-- <div class="modal-body">
									<div class="mb-3"></div>
									<div class="mb-3"></div>
								</div> -->
								<!-- Botón de cierre del modal -->
								<!-- <div class="modal-footer">
									<button type="button" class="btn btn-secondary"
										data-bs-dismiss="modal">Cerrar</button>
								</div>
							</div>
						</div>
					</div> -->



					<!-- <div class="modal fade" id="miModaldist" tabindex="-1"
						aria-labelledby="miModalLabel" aria-hidden="true">
						<div
							class="modal-dialog modal-dialog-centered modal-lg custom-modal">
							<div class="modal-content">
								<div class="p-4">
									<div id="alertaModal" class="alert alert-danger" role="alert"
										style="display: none;"></div>
									<div id="customAlert"
										style="display: none; background-color: #f44336; color: white; padding: 10px;">
										<strong>Error:</strong> <span id="alertMessage"></span>

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
					</div> -->

				<!-- </div> -->
			<!-- </div>  -->
		</div>





		<div class="text-center justify-content-md-center div-separacion-md1">
			<hr>
			<br>
			<button type="button" class="btn btn-outline-primary"
				id="generarReporteBtn">Generar Reporte
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
					<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
					<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
				</svg>
			</button>

		</div>
	</div>

</div>








<script src="js/reportes.js"></script>
<%@ include file="common/footer.jsp"%>