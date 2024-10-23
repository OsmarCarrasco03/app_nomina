<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>




<div class="container rounded div-padding input-color div-separacion-mediana">
<div class="row" class="col-6">
	<div class="text-center ">
		<hr>
		<div class="color-hr">
			<h3>CARGA MASIVA DE CONCEPTOS</h3>
		</div>
		<hr>
	</div>
</div>
</div>
	<div class="row justify-content-center mt-5">
<div class="col-md-4">
	<label class="custom-label" class="required-field">EJERCICIO<span
		class="required-field"></span></label> <input class="form-control"
		type="text" id="ejercicio" value="2024" disabled>
</div>


<div class="col-md-4">
	<label class="custom-label" class="required-field">PERIODO<span
		class="required-field"></span></label> <input class="form-control"
		type="text" id="periodo" value="19" disabled>
</div>
</div>
<div class="container">
	<div class="row justify-content-center mt-5">
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h2 class="card-title text-center">Seleccionar archivo</h2>
					<form id="csvForm" enctype="multipart/form-data" class="text-center">
						<div class="form-group">
							<input type="file" name="file" id="fileInput" class="form-control-file" accept=".csv">
						</div>
						<br>
						<button type="submit" class="btn btn-primary btn-block">Cargar Archivo</button>
						<button id="procesar" class="btn btn-success" onclick="validarYProcesar()">Validar datos</button>
						<button type="button" id="borrar" class="btn btn-danger" onclick="eliminarDatos()">Eliminar Datos</button>
					</form>
					<!-- <div id="message" class="mt-3 text-center"></div> -->
				</div>
				

			</div>
		</div>
	</div>




	<div class="row justify-content-center mt-5">
		<div class="col-md-6">
			<div class="card">
				<div class="card-body">
					<h2 class="card-title text-center">Procesar Datos</h2>
					<div class="text-center">
						<button id="cargar" class="btn btn-success" onclick="insertarDatos()">PROCESAR</button>

					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="col-md-4">
	<label class="custom-label" class="required-field"><span
		class="required-field"></span></label> <input class="form-control"
		type="text" id="estatus" value="1" hidden>
</div>

<div class="container">
    <div class="row" hidden>
        <div class="col-md-12 text-center separacion-pequeña">

        <!-- <div class="text-center separacion-pequeña"><br> -->
            <div class="color-hr">
                <p><b>DATOS DE CONTROL</b></p>
            </div>
        </div>
    </div>

    <div class="row" hidden>
        <div class="col-md-4" >
            <b>Fecha Inicio</b>
            <label class="custom-label required-field" for=""></label>
            <input type="text" class="form-control" id="inpFechaInicio" disabled>
        </div>

        <div class="col-md-4" >
            <b>Fecha Término</b>
            <label class="custom-label required-field" for=""></label>
            <input type="text" class="form-control" id="fechaTermino" disabled>
        </div>

        <form id="miFormulario">
            <input type="text" id="inpUsuarioCapturo" name="usuarioCapturo">
            <button type="submit">Enviar</button>
        </form>
        
    </div>

    <div class="row" hidden>
        <div class="col-md-4" >
            <b>Fecha Modificación</b>
            <label class="custom-label required-field" for=""></label>
            <input type="text" class="form-control" id="inpFechaModificacion" disabled>
        </div>

		<div class="col-md-4" >
            <b>Fecha Modificación</b>
            <label class="custom-label required-field" for=""></label>
            <input type="text" class="form-control" id="inpFechaModificacion" disabled>
        </div>



        <div class="col-md-4" >
            <b>Usuario que Modifico</b>
            <label class="custom-label required-field" for="usumodifico"></label>
            <input type="text" class="form-control" id="inpUsuarioModifico" disabled>
        </div>

        <div class="col-md-4">
            <label class="custom-label" class="required-field" for="tipo">Situación<span
                    class="required-field"> </span></label>
            <input id="inpSituacion" class="form-control" value ="1" type="text" disabled>
        </div>

    </div>

</div>




<script src="js/registrar_conceptosvariables.js"></script>











