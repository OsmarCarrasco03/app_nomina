

<title>Registrar Cuenta de Banco</title>
<%@ include file="common/header-sesion.jsp" %>
<%@ include file="common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="container rounded div-padding input-color div-separacion-mediana">
    <div class="text-center espacio-titulo pb-0">

        <h3>REGISTRAR CUENTA DE BANCO</h3><br>

    </div>

    <div class="text-center pb-4">
        <div class="autoComplete_wrapper text-center justify-content-md-center form-floating mb-3">
            <input id="buscarPersona" class="resaltar-buscador" type="search" dir="ltr" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off">
        </div>
    </div>

    <div class="row justify-content-md-center">
        <div class="col-4">
            <label><b>CURP</b></label>
            <input type="text" class="form-control" id="intpCurp" disabled>
        </div>

        <div class="col-6">
            <label><b>Nombre</b></label>
            <input type="text" class="form-control" id="inptNombre" disabled>
        </div>
    </div> <br>

    <div class="color-hr text-center">
        <h6>DATOS GENERALES</h6>
    </div>
    
    <!-- inicio bloque 1 -->
    <div class="row">
        <div class="col-4">
            <label><b><span style="color: red;">*</span>Bancos</b></label>
            <select id="inptBancos" class="form-select" disabled>
            </select>
        </div>

        <div class="col-4">
            <label><b><span style="color: red;">*</span>Cuenta</b></label>
            <input type="text" class="form-control" id="inptCuenta" oninput="validarCuenta(this)" disabled>
        </div>
        <div class="col-4">
            <label><b><span style="color: red;">*</span>Clave Interbancaria</b></label>
            <input type="text" class="form-control" id="inptClaveInter" oninput="validarClaveInt(this)" disabled>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <label><b><span style="color: red;">*</span>Moneda</b></label>
            <select id="inptMoneda" class="form-select" disabled>
            </select>
        </div>

        <div class="col-4">
            <label><b><span style="color: red;">*</span>Tipo</b></label>
            <select id="inptTipo" class="form-select" disabled>
            </select>
        </div>

        <div class="col-4">
            <label><b><span style="color: red;">*</span>Modo de Pago</b></label>
            <select id="inptModoPago" class="form-select" disabled>
            </select>
        </div>
    </div> <br>
    <!-- fin bloque 1 -->

    <!-- Datos de control -->
    <div class="ocultarcontrol" hidden>
        <div class="color-hr text-center">
            <h6>DATOS DE CONTROL</h6>
        </div>
    
        <div class="row">
            <div class="col-4">
                <label><b>Fecha Inicio</b></label>
                <input type="text" class="form-control" id="fechaInicio" disabled>
                </select>
            </div>
    
            <div class="col-4">
                <label><b>Fecha Termino</b></label>
                <input class="form-control" id="fechaTermino" disabled>
            </div>
    
            <div class="col-4">
                <label><b>Usuario que capturo</b></label>
                <input type="text" class="form-control" id="inptUsuarioCaptura" disabled>
            </div>
    
        </div><br>
    
        <div class="row">
            <div class="col-4">
                <label><b>Fecha de Modificacion</b></label>
                <input type="text" class="form-control" id="fechaModifico" disabled>
                </select>
            </div>
    
            <div class="col-4">
                <label><b> Usuario que modifico</b></label> 
                <input type="text" class="form-control" id="inptUltimoUsuarioCaptura" disabled>
            </div>
    
            <div class="col-4">
                <label><b>Situacion</b></label> 
                <input type="text" class="form-control" id="situacion" disabled>
            </div>
    
        </div>
    </div>
    <!-- fin datos de control -->

    <br>

    <div class="row">
        <div class="text-center justify-content-md-center div-separacion-mdl">
            <button id="btnGuardar" class="btn btn-success" onclick="guardarDatos()" disabled>Guardar
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
                    <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                    <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                </svg>
            </button>
        </div>
    </div>

</div>
<br><br>



<script src="js/registrar_ctabancpersona.js"></script>
<%@ include file="common/footer.jsp" %>