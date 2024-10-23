<title>Consultar Cuenta de Banco</title>
<%@ include file="common/header-sesion.jsp" %>
<%@ include file="common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="container rounded div-padding input-color div-separacion-mediana">
    <div class="text-center espacio-titulo pb-0">

        <h3>CONSULTAR CUENTA DE BANCO</h3><br>

    </div>

    <div class="text-center pb-4">
        <div class="autoComplete_wrapper text-center justify-content-md-center form-floating mb-3">
            <input id="buscarPersona" class="resaltar-buscador" type="search" dir="ltr" spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off">
        </div>
        <button id="btnBuscar" type="button" class="btn btn-primary">Buscar
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
        </button>
    </div>

    <div class="color-hr text-center">
        <h6>DATOS GENERALES</h6>
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
    </div> 

    <!-- inicio bloque 1 -->
    <div class="row">
        <div class="col-4">
            <label><b>Bancos</b></label>
            <input type="text" class="form-control" id="inptBancos" disabled>
        </div>

        <div class="col-4">
            <label><b>Cuenta</b></label>
            <input type="text" class="form-control" id="inptCuenta" disabled>
        </div>
        <div class="col-4">
            <label><b>Clave Interbancaria</b></label>
            <input type="text" class="form-control" id="inptClaveInter" disabled>
        </div>
    </div>

    <div class="row">
        <div class="col-4">
            <label><b>Moneda</b></label>
            <input type="text" class="form-control" id="inptMoneda" disabled>
        </div>

        <div class="col-4">
            <label><b>Tipo</b></label>
            <input type="text" class="form-control" id="inptTipo" disabled>
        </div>

        <div class="col-4">
            <label><b>Modo de Pago</b></label>
            <input type="text" class="form-control" id="inptModoPago" disabled>
        </div>
    </div> <br>
    <!-- fin bloque 1 -->

    <div class="color-hr text-center">
        <h6>DATOS DE CONTROL</h6>
    </div>

    <div class="row">
        <div class="col-4">
            <label><b>Fecha Inicio</b></label>
            <input type="text" class="form-control" id="fechaInicio" disabled>
        </div>

        <div class="col-4">
            <label><b>Fecha Termino</b></label>
            <input type="text" class="form-control" id="fechaTermino" disabled>
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

    </div><br>


</div>
<br><br>

<script src="js/consulta_ctabancpersona.js"></script>
<%@ include file="common/footer.jsp" %>