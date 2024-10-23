<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<div class="container">
    <div class="row">
        <div class="col-md-12 text-center separacion-pequeña">

        <!-- <div class="text-center separacion-pequeña"><br> -->
            <div class="color-hr">
                <p><b>DATOS DE CONTROL</b></p>
            </div>
        </div>
    </div>

    <div class="row">
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

        <div class="col-md-4" >
            <b>Usuario que capturo</b>
            <label class="custom-label required-field" for="usucapturo"></label>
            <input type="text" class="form-control" id="inpUsuarioCapturo" disabled>
        </div>
    </div>

    <div class="row">
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
            <input id="inpSituacion" class="form-control" type="text" disabled>
        </div>

    </div>

</div>

<script src="js/datos_control.js"></script>
