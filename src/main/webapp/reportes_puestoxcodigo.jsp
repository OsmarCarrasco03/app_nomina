<%@ include file="common/header-sesion.jsp"%>
<title>REPORTES CÓDIGO DE PUESTO</title>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<br>
<br>
<div class="container rounded div-padding input-color ">
	<div class="text-center espacio-titulo ">
		<h3>REPORTE CÓDIGO DE PUESTO</h3>

		<br>
	</div>
	<div class="text-center background-color">
		<h4>SELECCIONA EL REPORTE DE ACUERDO A LOS DATOS QUE DESEAS
			GENERAR</h4>
	</div>
	
</div>

<div class="container rounded div-padding input-color ">

	<!-- <div class="row mb-">
		<div class="col-md-3">
			<label class="custom-label" class="required-field" for="tipo">CÓDIGO<span
				class="required-field"> * </span></label> <select class="form-select"
				id="codigo" name="codigo" aria-label="Default select example">

			</select>


		</div> -->

		<div id="loadingOverlay" class="overlay">
			<div class="overlay-content">
				<img src="img/pareja.png" alt="Cargando..." class="spinner">
			</div>
		</div>


	<div class="row mb-">


		<div class="col-md-3">
			<label class="custom-label" class="required-field">Código<span
					class="required-field">*</span></label>

			
				<input class="form-control" type="text" onkeypress="return soloLetras(event)"
				onkeypress="return soloLetras(event)" id="codigo" >


				

			
		</div>


		<div class="col-md-3">
			<label class="custom-label" class="required-field">Descripcion<span
					class="required-field">*</span></label>

				<input class="form-control" type="text" onkeypress="return soloLetras(event)"
				onkeypress="return soloLetrasDes(event)" id="descripcion" >


				

			
		</div>



		<div class="col-md-3">
			<label class="custom-label" class="required-field" for="tipo">Tipo<span
				class="required-field"> * </span></label> <select class="form-select"
				id="tipo" name="tipo" aria-label="Default select example">

			</select>


		</div>


		<div class="col-md-3">
			<label class="custom-label" class="required-field" for="tipo">Situacion<span
				class="required-field"> * </span></label> <select class="form-select"
				id="situacion" name="situacion" aria-label="Default select example">

			</select>


		</div>

		

		<!-- <div class="col-md-3">
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
		</div> -->







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








<script src="js/reportes_puestoxcodigo.js"></script>
<%@ include file="common/footer.jsp"%>