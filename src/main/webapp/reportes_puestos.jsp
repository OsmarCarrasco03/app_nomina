<title>Configuración de Puestos</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<br>
<br>
<div class="container rounded div-padding input-color">
	<div class="text-center espacio-titulo ">
		<h3>REPORTE DE PUESTOS</h3>
	</div>

	<div class="text-center background-color">
		<h4>SELECCIONA EL REPORTE DE ACUERDO A LOS DATOS QUE DESEAS
			GENERAR</h4>
	</div>

	<div class=" justify-content-md-center espacio-titulo ui-widget">
		<div class="row">
			<div class="col-md offset-md-2">
				<label for="autoComplete"
					style="display: block; margin-bottom: 5px;"><b>BUSQUEDA
						POR CÓDIGO Y DESCRIPCION DE PUESTO</b></label> <input size="32"
					id="autoComplete" type="search" dir="ltr" spellcheck="false"
					autocorrect="off" autocomplete="off" autocapitalize="off">
				<input type="hidden" id="ctgp_id" name="ctgp_id">
			</div>

			<div class="col-md  justify-content-start">
				<br>
				<button type="button" class="btn btn-outline-primary"
					id="btnbusqueda" img src="bootstrap-icons/0-circle.sgv">
					Busqueda especifica
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
						<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
					</svg>
				</button>
			</div>
		</div>
		

		<div class="row">
			<div class="col-md-2">
				<b><label for="otroInputc"></label></b><span> </span> <input
					type="text" class="form-control" disabled id="descripcion"
					name="descripcion">
			</div>

			<div class="col-md-10">
				<b><label for="otroInputc"></label></b><span"> </span> <input
					type="text" class="form-control" disabled id="descripcionuno"
					name="descripcionuno">
			</div>
		</div>
	</div>
	<br>

	<div class="row justify-content-md-center" style="margin-top: px">

		<div class="col-md">
			<label class="custom-label" class="required-field"><b>Tipo<span
					class="required-field"> * </span></b></label> <select id="tipo"
				class="form-select" class="form-select is-invalid"
				aria-label="Default select example"
				onchange="consultaDatosPuestos()">
			</select>
		</div>
		<div class="col-md">

			<label><b>Zona<span class="required-field">* </span></b></label> <select
				id="zona" class="form-select" aria-label="Default select example"
				onchange="consultaDatosPuestos()">
			</select>

		</div>

		


		<div id="loadingOverlay" class="overlay">
			<div class="overlay-content">
				<img src="img/pareja.png" alt="Cargando..." class="spinner">
			</div>
		</div>
		

		<div class="col-md">

			<label><b>Nivel<span class="required-field"> * </span></b></label> <select
				id="Nivel" class="form-select" aria-label="Default select example"
				onchange="consultaDatosPuestos()">
			</select>
		</div>
		<div class="col-md">
			<label><b>Contratación<span class="required-field">
						* </span></b></label> <select id="Contratacion" class="form-select"
				aria-label="Default select example">
			</select>
		</div>

	</div>
	<div class="row justify-content-md-center" style="margin-top: 30px">
		<div class="col-md">

			<label><b>Categoria<span class="required-field"> *
				</span></b></label> <select id="Categoria" class="form-select"
				aria-label="Default select example">
			</select>
		</div>
		<div class="col">

			<label><b>Subcategoria<span class="required-field">
						* </span></b></label> <select id="Subcateegoria" class="form-select"
				aria-label="Default select example">
			</select>
		</div>
		<div class="col-md">

			<label><b>Clasificación  Interna<span class="required-field">
						* </span>
			</b></label> <select id="Clasificación_Interna" class="form-select"
				aria-label="Default select example">
			</select>
		</div>
		<div class="col-md">

			<label><b>Declaracion Patrimonial<span
					class="required-field"> * </span></b></label> <select id="Declaracion"
				class="form-select" aria-label="Default select example">
			</select>
		</div>
	</div>

	
	<br>
	<div class="text-center justify-content-md-center div-separacion-md1">
		<button type="button" class="btn btn-danger" id="btnregistro">GENERAR
			CSV
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
				<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
				<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
			</svg>
		</button>
		<button type="button" class="btn btn-success" id="btnlimpiar">
			LIMPIAR DATOS
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
				<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
			</svg>
		</button>
	</div>
	
	
	
<br><br>
<script src="js/reportes_puestos.js"></script>
<%@ include file="common/footer.jsp"%>