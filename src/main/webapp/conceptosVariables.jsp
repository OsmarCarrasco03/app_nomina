<%@ include file="common/header-sesion.jsp" %>
    <%@ include file="common/nav.jsp" %>

        <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

            <div class="container rounded div-padding input-color separacion-pequeña">
                <br><br>
                <div class="text-center espacio-titulo">
                    <h3>REGISTRAR CONCEPTOS VARIABLES</h3>
                </div>


                <div>
                    <div class="col*6">

                        <div class="row justify-content-md-center">
                            <div class="col-3 separacion-pequeña" style="text-align: right;">
                                <!--Año proceso-->
                                <label><b>Ejercicio Actual</b></label>
                            </div>
                            <div class="col-2 separacion-pequeña">
                                <!--Año proceso-->
                                <input type="text" class="form-control" id="AnioProceso" disabled>
                            </div>
                            <div class="col-3 separacion-pequeña" style="text-align: right;">
                                <!--periodo proceso-->
                                <label><b>Periodo Actual</b></label>
                            </div>
                            <div class="col-2 separacion-pequeña">
                                <!--periodo proceso-->
                                <input type="text" class="form-control" id="PeriodoProceso" disabled>
                            </div>

                        </div>

                        <div class="text-center justify-content-md-center separacion-pequeña ui-widget">
                            <div class="autoComplete_wrapper">
                                <input id="inpBuscar" class="resaltar-buscador" type="search" dir="ltr"
                                    spellcheck="false" autocorrect="off" autocomplete="off" autocapitalize="off">
                            </div>
                            <!--<button id="btnBuscarPersona" type="button"
								class="btn btn-primary">Seleccionar</button>-->
                        </div>
                    </div>

                    <div>
                        <div class="col-12 separacion-mediana">

                            <div class="row justify-content-md-center">
                                <div class="col-4 separacion-pequeña">
                                    <b>Curp</b> <input id="Curp" type="text" class="form-control"
                                        oninput="validarNumero(this)" disabled>
                                </div>
                                <div class="col-4 separacion-pequeña">
                                    <b>Nombre</b> <input id="Nombre" type="text" class="form-control"
                                        oninput="validarNumero(this)" disabled>
                                </div>
                                <div class="col-4 separacion-pequeña">
                                    <b>Situación</b> <input id="situacion" type="text" class="form-control" disabled>
                                </div>
                            </div>

                        </div>
                    </div>

                </div><br>

                <div class="container separacion-mediana" id="forms">

                    <!-- Pestañas -->
                    <ul class="nav nav-tabs" id="Tabs" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="datosGenerales-tab" data-bs-toggle="tab"
                                data-bs-target="#datosGenerales" type="button" role="tab" aria-controls="datosGenerales"
                                aria-selected="true">Tipo de Concepto y Concepto</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="temporalidad-tab" data-bs-toggle="tab"
                                data-bs-target="#temporalidad" type="button" role="tab" aria-controls="temporalidad"
                                aria-selected="false">Temporalidad</button>
                        </li>

                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="DatosControl-tab" data-bs-toggle="tab"
                                data-bs-target="#DatosControl" type="button" role="tab" aria-controls="DatosControl"
                                aria-selected="false">Datos de Control</button>
                        </li>

                    </ul>

                    <!-- Contenido de las pestañas -->
                    <div class="tab-content" id="TabContent">
                        <!-- Contenido de la pestaña "Datos Generales" -->
                        <div class="tab-pane fade show active" id="datosGenerales" role="tabpanel"
                            aria-labelledby="datosGenerales-tab"> <!--fade-->
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">

                                    </div>
                                    <div class="row">
                                        <div class="col-12 separacion-pequeña">
                                            <div class="color-hr">
                                                <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                                    TIPO DE CONCEPTO Y CONCEPTO</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <br>
                                    <div id="myDIV" class="text-left ">

                                        <div class="row justify-content-md-center">
                                            <div class="col-3">
                                                <b>Tipo</b><span style="color: red"> * </span>
                                                <select class="form-select" id="Tipo" aria-label="Default select ">

                                                </select>
                                            </div>
                                            <div class="col-3">

                                                <b>Concepto</b><span style="color: red"> * </span><br>
                                                <select class="form-select" id="Concepto" aria-label="Default select ">

                                                </select>

                                            </div>
                                            <div class="col-3">
                                                <b>Concepto Antecedente</b>
                                                <select class="form-select" id="ConceptoAntecedente"
                                                    aria-label="Default select ">

                                                </select>
                                            </div>
                                            <div class="col-3">
                                                <b>Pago Antecedente</b> <br>
                                                <input id="PagoAntecedente" type="text" class="form-control"
                                                    oninput="validaPagoAnte(this)">
                                            </div>

                                        </div>
                                    </div>

                                    <!--<div class="row">
                                        <div class="col-4 separacion-pequeña">
                                            <b>Trámite de C.L.A.P.P.</b> <br>
                                            <input id="tramiteCLAPP" type="text" class="form-control" disabled>
                                        </div>

                                    </div>-->
                                    <div class="row">

                                    </div>
                                    <div class="row">
                                        <div class="col-12 separacion-pequeña">
                                            <div class="color-hr">
                                                <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                                    FACTORES DE APLICACION</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="myDIV" class="text-left ">

                                        <div class="row justify-content-md-center">
                                            <div class="col-3 separacion-pequeña">
                                                <b>Tipo de Factor</b><span style="color: red"> * </span>
                                                <select class="form-select" id="TipoFactor"
                                                    aria-label="Default select ">

                                                </select>


                                            </div>
                                            <div class="col-3 separacion-pequeña">

                                                <b>Factor</b><br>
                                                <input id="Factor" type="text" class="form-control" disabled
                                                    oninput="validaFactor(this)">
                                            </div>
                                            <div class="col-3 separacion-pequeña">
                                                <b>Importe</b> <input id="Importe" type="text" class="form-control"
                                                    oninput="validaFactor(this)" disabled>
                                            </div>
                                            <div class="col-3 separacion-pequeña">

                                                <b>Nómina</b><span style="color: red"> * </span><br>
                                                <select class="form-select" id="nomina" aria-label="Default select ">

                                                </select>

                                            </div>

                                        </div>
                                        <div class="row">
                                            <div class="col-12 separacion-pequeña">
                                                <div class="color-hr">
                                                    <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                                        FORZAR IMPORTE</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-3 separacion-pequeña">

                                            </div>
                                            <div class="col-3 separacion-pequeña">
                                                <b>Forzar Importe</b><span style="color: red"> * </span><br>
                                                <select class="form-select" id="forzarImporte" aria-label="Default select" onclick="importeForzado()">
                                                    <option value="" disabled="" selected="">Selecciona una Opción</option>
                                                    <option value="1">SI</option>
                                                    <option value="2">NO</option>
                                                </select>
                                            </div>
                                            <div class="col-3 separacion-pequeña">
                                                <b>Importe</b> <input id="importeForzado" type="text" class="form-control"
                                                    oninput="validaFactor(this)" disabled>
                                            </div>
                                            <div class="col-3 separacion-pequeña">
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div id="myDIV" class="text-left ">

                                        <div class="row justify-content-md-center">

                                            <!-- <div class="col-4 separacion-pequeña">

                                                <b>Nómina</b><span style="color: red"> * </span><br>
                                                <select class="form-select" id="nomina" aria-label="Default select ">

                                                </select>

                                            </div>-->

                                            <!-- <div class="col-4 separacion-pequeña">

                                                <b>Contador</b><br>
                                                <input id="Contador" type="text" class="form-control">
                                            </div>-->


                                        </div>
                                    </div>

                                    <br>
                                </div>
                            </div>
                        </div>
                        <!-- Contenido de la pestaña "Datos de Unidad" -->


                        <div class="tab-pane fade" id="temporalidad" role="tabpanel" aria-labelledby="temporalidad-tab">

                            <!-- Agrega tu contenido para la pestaña de Datos de Unidad aquí -->
                            <div class="card">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="color-hr">
                                                <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                                    TEMPORALIDAD</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row justify-content-md-center">
                                        <div class="col-4 separacion-pequeña">
                                            <label><b>Temporalidad</b></label>
                                            <select class="form-select" id="contemporalidad"
                                                aria-label="Default select ">

                                            </select>

                                        </div>


                                    </div>

                                    <!--EMPIEZO CON LAS FUNCIONALIDADES PARA EL MODAL DE DISTRIBUCION-->
                                    <!-- <div class="row">
                                        <div class="col-12 separacion-pequeña">
                                            <div class="color-hr">
                                                <h5 class="custom-h5" style="text-align: center">CENTRO DE TRABAJO Y
                                                    DISTRIBUCIÓN
                                                </h5>
                                            </div>
                                        </div>
                                    </div>-->

                                    <div class="row justify-content-md-center">
                                        <div class="col separacion-pequeña">
                                            <label><b>Año de Inicio</b></label><br>
                                            <select class="form-select" id="AnioInicio" aria-label="Default select">
                                            </select>

                                        </div>
                                        <div class="col separacion-pequeña">
                                            <b>Periodo Inicial</b>
                                            <select class="form-select" id="periodoInicial" aria-label="Default select">
                                            </select>

                                        </div>
                                        <div class="col separacion-pequeña">
                                            <label><b>Año Final</b></label></b>
                                            <select class="form-select" id="AnioFinal" aria-label="Default select "
                                                disabled>
                                            </select>

                                        </div>

                                        <div class="col separacion-pequeña">
                                            <b>Periodo Final</b>
                                            <select class="form-select" id="periodoFinal" aria-label="Default select "
                                                disabled>

                                            </select>

                                        </div>
                                    </div>
                                    <div class="row justify-content-md-center">
                                        <div class="col-4 separacion-pequeña">
                                            <label><b>Fecha Ocurrencia Inicial</b></label>
                                            <input type="date" id="FechaOcurrenciaInicial" required
                                                style="width: 100%;">

                                        </div>
                                        <div class="col-4 separacion-pequeña">
                                            <label><b>Fecha Ocurrencia Final</b></label>
                                            <input type="date" id="FechaOcurrenciaFinal" required style="width: 100%;"
                                                disabled>

                                        </div>

                                    </div>


                                    <br>
                                </div>

                            </div>

                            <div class="text-center">

                                <button type="button" class="btn btn-danger" id="Cancelar" onclick="Cancelar()">Cancelar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-eraser-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z" />
                                    </svg>
                                </button>

                                <button type="button" class="btn btn-success" id="Guardar"
                                    onclick="enviarDatosAPI()">Guardar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-floppy-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z" />
                                        <path
                                            d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z" />
                                    </svg>
                                </button>

                            </div><br>


                        </div>


                        <!-- Contenido de la pestaña "Puesto autorizado vs puesto pagado" -->


                        <!-- Inicio seccion datos de control -->

                        <div class="tab-pane fade" id="DatosControl" role="tabpanel" aria-labelledby="DatosControl-tab">
                            <!-- Agrega tu contenido para la pestaña de Datos de Unidad aquí -->

                            <div class="card">
                                <div class="card-body">

                                    <div class="color-hr text-center separacion-pequeña">
                                        <h5>DATOS DE CONTROL</h5>
                                    </div>

                                    <div>
                                        <div class="row justify-content-md-center">

                                            <div class="col-4 separacion-pequeña">
                                                <b>Fecha Inicio</b> <input id="inpFechaInicio"
                                                    class="form-control text-center" type="text" disabled>
                                            </div>

                                            <div class="col-4 separacion-pequeña">
                                                <b>Fecha Término</b> <input id="inpFechaTermino"
                                                    class="form-control text-center" type="text" disabled>
                                            </div>

                                            <div class="col-4 separacion-pequeña">
                                                <b>Usuario que Capturó</b> <input id="inpUsuarioCapturo"
                                                    class="form-control text-center" type="text" disabled>
                                            </div>

                                        </div>

                                        <div class="row justify-content-md-center">

                                            <div class="col-4 separacion-pequeña">
                                                <b>Fecha de Modificación</b> <input id="inpFechaModificacion"
                                                    class="form-control text-center" type="text" disabled>
                                            </div>

                                            <div class="col-4 separacion-pequeña">
                                                <b>Usuario que Modificó</b> <input id="inpUsuarioModifico"
                                                    class="form-control text-center" type="text" disabled>
                                            </div>

                                            <div class="col-4 separacion-pequeña">
                                                <b>Situación</b> <input id="inpSituacion"
                                                    class="form-control text-center" type="text" disabled>
                                            </div>

                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Fin seccion datos de control -->


                </div>
            </div>
            </div>

            <script src="js/conceptosVariables.js"></script>
            <%@ include file="common/footer.jsp" %>