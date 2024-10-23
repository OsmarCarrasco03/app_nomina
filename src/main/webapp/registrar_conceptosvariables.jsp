
<%@ include file="common/header-sesion.jsp"%>
<title>CARGA MASIVA</title>
<%@ include file = "common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>


<div class="container rounded div-padding input-color div-separacion-mediana">
    <div class="row">
        <div class="col-12 text-center">
            <hr>
            <div class="color-hr">
                <h3>CARGA MASIVA DE CONCEPTOS</h3>
            </div>
            <hr>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <label class="custom-label">EJERCICIO</label>
                    <input class="form-control custom-border" type="text" id="ejercicio" value="2024" disabled>

                </div>
    
                <div class="col-md-4">
                    <label class="custom-label">PERIODO</label>
                    <input class="form-control custom-border" type="text" id="periodo" value="19" disabled>
                </div>
            </div>
        </div>
    </div>
    
    <style>
        .custom-border {
            border: 2px solid #000; /* Borde negro */
            border-radius: 5px; /* Bordes redondeados */
        }
    </style>
    
    
    <style>
        .custom-file-input {
            border: 2px solid #007bff; /* Color azul */
            border-radius: 5px; /* Bordes redondeados */
        }
    
        .custom-file-input:focus {
            outline: none; /* Eliminar el contorno al hacer clic */
            border-color: #007bff; /* Cambiar el color del borde cuando está enfocado */
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Efecto de sombra al enfocar */
        }
    </style>
    
    
  <br>  <br>  
  <style>
    .custom-border {
        border: 2px solid #000; /* Borde negro */
        border-radius: 5px; /* Bordes redondeados */
    }

    .custom-card {
        background-color: #f8f9fa; /* Color de fondo */
        box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* Sombra sutil */
    }
</style>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col">
            <div class="card custom-card">
                <div class="card-body">
                    <h2 class="card-title text-center">Seleccionar archivo</h2>
                    <form id="csvForm" enctype="multipart/form-data">
                        <div class="form-group">
                            <div class="input-group mb-3">
                                <input type="file" name="file" class="form-control " id="fileInput" accept=".csv">
                            </div>
                        </div>
                        <br>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary btn-block" id="cargarArchivo">Cargar Archivo</button>
                            <button disabled id="procesar" class="btn btn-success" onclick="validarYProcesar()">Validar datos</button>
                            <button type="button" id="borrar" class="btn btn-danger" onclick="eliminarDatos()">Eliminar Datos</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card custom-card">
                <div class="card-body">
                    <h2 class="card-title text-center">Procesar Datos</h2>
                    <br>
                    <div class="text-center">
                        <button id="cargar" class="btn btn-success" onclick="insertarDatos()">PROCESAR</button>
                    </div>
                    <br><br>
                </div>
            </div>
        </div>
    </div>
</div>

    
    <!-- DATOS DE CONTROL (Ocultos) -->
    <input type="text" id="estatus" value="1" hidden>
    <div class="row" hidden>
        <div class="col-md-4">
            <input class="form-control" type="text" id="inpFechaInicio" disabled>
        </div>
        <div class="col-md-4">
            <input class="form-control" type="text" id="fechaTermino" disabled>
        </div>
        <div class="col-md-4">
            <input class="form-control" type="text" id="inpUsuarioCapturo" name="usuarioCapturo" hidden>
            <button type="submit" form="miFormulario" hidden></button>
        </div>
        <div class="col-md-4">
            <input class="form-control" type="text" id="inpFechaModificacion" disabled>
        </div>
        <div class="col-md-4">
            <input class="form-control" type="text" id="inpUsuarioModifico" disabled>
        </div>
        <div class="col-md-4">
            <input class="form-control" type="text" id="inpSituacion" value="1" disabled>
        </div>
    </div>
</div>






<script src="js/registrar_conceptosvariables.js"></script>

<%@ include file = "common/footer.jsp" %>

