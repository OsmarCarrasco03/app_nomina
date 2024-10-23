<title>Periodos de pago</title>
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="container rounded div-padding input-color div-separacion-mediana">

    <div class="text-center espacio-titulo">
        <h3>PERIODOS DE PAGO</h3>
    </div>

    <div class="container" id="forms">

        <!-- <<<<<<<<<< INICIO de pestañas >>>>>>>>>> -->
        <ul class="nav nav-tabs" id="Tabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="datosPeriodo-tab" data-bs-toggle="tab"
                    data-bs-target="#datosPeriodo" type="button" role="tab" aria-controls="datosPeriodo"
                    aria-selected="true">Periodos de pago</button>
            </li>

        </ul>
        <!-- <<<<<<<<<< FIN de pestañas >>>>>>>>>> -->

        <div class="tab-content" id="TabContent">

            <!-- <<<<<<<<<< INICIO seccion datos del periodo >>>>>>>>>> -->
            <div class="tab-pane fade show active" id="datosPeriodo" role="tabpanel" aria-labelledby="datosPeriodo-tab">
                <div class="card">
                    <div class="card-body">

                        <div class="color-hr text-center separacion-pequeña">
                            <h5>DATOS DEL PERIODO</h5>
                        </div>

                        <div class="table-responsive separacion-pequeña">
                            <table class="table" id="tablaDatos">
                                <thead>
                                    <tr>
                                        <th>Año</th>
                                        <th>Periodo</th>
                                        <th>Fecha Inicio</th>
                                        <th>Fecha Fin</th>
                                        <th>Situacion</th>
                                        <th class="text-center datosControl-tab" hidden>Datos de Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Aquí se insertarán las filas dinámicamente -->
                                </tbody>
                            </table>
                        </div>

                        <div class="text-center justify-content-md-center ui-widget">
                            <button type="button" class="btn btn-success" id="btnNuevoPeriodo">Abrir siguiente periodo
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-success" id="btnCerrarPeriodo" hidden>Cerrar Periodo
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                            </button>
                        </div>
                        <br>
                    </div>
                </div>
            </div>
            <!-- <<<<<<<<<< FIN seccion datos del periodo >>>>>>>>>> -->

            <!-- <<<<<<<<<< INICIO modal de datos de control >>>>>>>>>> -->
            <div class="modal fade" id="modalDatosControl" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-body">

                            <div class="color-hr text-center separacion-pequeña">
                                <h5>DATOS DE CONTROL</h5>
                            </div>

                            <div>
                                <div class="row justify-content-md-center">

                                    <div class="col-4 separacion-pequeña">
                                        <b>Fecha de Apertura</b> <input id="inpFechaInicio"
                                            class="form-control text-center" type="text" disabled>
                                    </div>

                                    <div class="col-4 separacion-pequeña">
                                        <b>Fecha de Cierre</b> <input id="inpFechaTermino"
                                            class="form-control text-center" type="text" disabled>
                                    </div>

                                    <div class="col-4 separacion-pequeña">
                                        <b>Usuario que Capturó</b> <input id="inpUsuarioCapturo"
                                            class="form-control text-center" type="text" disabled>
                                    </div>

                                </div>

                                <div class="row justify-content-md-center">

                                    <div class="col-4 separacion-pequeña">
                                        <b>Usuario que Cerro</b> <input id="inpUsuarioModifico"
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
                        <div class="modal-footer">
                            <button id="btnCerrarModal" type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- <<<<<<<<<< FIN modal de datos de control >>>>>>>>>> -->

        </div>
    </div>
</div>

<script src="js/consulta_periodos_quincenales.js"></script>
<%@ include file="common/footer.jsp" %>
