<title>Configuración de Puestos</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center espacio-titulo ">
		<h3>Registro de Puesto</h3>
	</div>
	
	
	<div class="text-center justify-content-md-center espacio-titulo ui-widget" style="margin-top:60px">
		
		<div class="autoComplete_wrapper">
			<input id="autoComplete" type="search" dir="ltr" spellcheck=false
				autocorrect="off" autocomplete="off" autocapitalize="off"
				size="100">

			<button type="button" class="btn btn-primary" id="abrirInfo"
				onclick="buscarPuesto()" >Buscar 
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
					<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
				</svg>
			</button>
		</div>
		
	</div>
	
	
	
	
	
	
	<div class="text-center div-separacion-mediana">
		<div class="row justify-content-md-center">
			<div class="col-2">
				
				<label><b>Cdigo del Puesto</b></label>
				<input type="text" id="codigoPuesto" class="form-control" disabled/>
			</div>

			<div class="col-8">
				
				<label><b>Descripci�n</b></label>
				<input type="text" id="descripcion" class="form-control" disabled/>
			</div>
			
			<div class="col-2" id="situacionDiv">
				
				<label><b>Situaci�n</b></label>
				<input type="text" class="form-control" size="10" name="datepicker2"
					id="situacion" disabled/>
			</div>
	</div>
	</div>
	<div class="text-center espacio-titulo ">
			<br>
			
			<div class="color-hr">
				<p><b>CONFIGURACI�N DEL NUEVO PUESTO</b></p>
			</div>
			

		</div>

	<!-- Primera Secci�n -->
	<div class="text-center">
		<div class="row justify-content-md-center" style="margin-top: 40px">
		
			<div class="col">
				<label><b><span style = "color:red" > * </span>Tipo</b></label>

				<select id="Tipo" class="form-select" class="form-select is-invalid"
					aria-label="Default select example"	onchange="consultaDatosPuestos()">
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Zona</b></label>
				<select id="Zona" class="form-select"
					aria-label="Default select example"	onchange="consultaDatosPuestos()">
				</select>
				<!-- ><input type="text" class="form-control" size="10" name="datepicker2"
					id="grufunyxresp" />-->
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Nivel</b></label>
				<select id="Nivel" class="form-select"
					aria-label="Default select example"	onchange="consultaDatosPuestos()">
				</select>
			</div>

		</div>
		<div class="row justify-content-md-center" style="margin-top:30px">
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Categoria</b></label>
				<select id="Categoria" class="form-select"
					aria-label="Default select example" ">
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Subcateegoria</b></label>
				<select id="Subcateegoria" class="form-select"
					aria-label="Default select example">
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Clasificaci�n Interna</b></label>
				<select id="Clasificaci�n_Interna" class="form-select"
					aria-label="Default select example">
				</select>
			</div>
		</div>

		<div class="row justify-content-md-center div-separacion-mediana" style="margin-top:30px">			
			<div class="col">				
				<label><b><span style = "color:red" > * </span>Contrataci�n</b></label>
				<select id="Contratacion" class="form-select"
					aria-label="Default select example">
				</select>
			</div>
			<div class="col">
				
				<label><b><span style = "color:red" > * </span>Declaracion Patrimonial</b></label>
				<select id="Declaracion" class="form-select"
					aria-label="Default select example">
				</select>
			</div>
			

		</div>

		<div class="row justify-content-md-center div-separacion-mediana" style="margin-top:30px">			
			
			<div class="col">
				
				<label><b>Fecha de Captura</b></label>
				<input type="text" disabled selected id="fechaInicio"
					name="trip-start" />
			</div>
			
			<div class="text-center justify-content-md-center div-separacion-md1">
				<br>
				<button type="button" class="btn btn-success" id="botonRegistar"
					onclick="botonGenerarReporte()">Registrar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
						<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
						<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
					</svg>
				</button>
				<button type="button" class="btn btn-danger" id ="botonCancelar"
					onclick="botonSalirConsulta()">Cancelar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
						<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
					</svg>
				</button>
				<button type="button" class="btn btn-primary"
					id="limpiarBoton">Limpiar
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
						<path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
					</svg>
				</button>
				<!-- <button type="button" class="btn btn-warning"
				onclick="botonModificar()">Modificar</button> -->
			</div>
		</div>
		
	</div>
</div>

<script src="js/ConfiguraPuesto.js"></script>

<%@ include file="common/footer.jsp"%>