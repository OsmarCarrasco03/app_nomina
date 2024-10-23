<%@ include file="common/header-sesion.jsp" %>
    <%@ include file="common/nav.jsp" %>
        <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

      

            <div class="container rounded div-padding input-color separacion-pequeña">
                <br><br>
                <div class="text-center espacio-titulo">
                    <h3>MODIFICACIÓN DE CONCEPTOS VARIABLES</h3>
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

                <div class="container separacion-mediana" id="forms" style="overflow-x: auto;">

                    <div class="container separacion-mediana" id="forms" style="overflow-x: auto;">
                        <div class="tablaDiv">
                           
                        </div>
                        
                    </div>
                    <br><br><br>
                </div>
                    <!-- Modal -->
                    <div id="myModal" class="modal fade">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <!-- Modal Header -->
                                <div class="modal-header">
                                    <h5 class="modal-title">Modificar Valor</h5>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>

                                <!-- Modal Body -->
                                <div class="modal-body">
                                    <input type="text" id="newValueInput" class="form-control"
                                        placeholder="Nuevo valor">
                                </div>

                                <!-- Modal Footer -->
                                <div class="modal-footer">
                                    <button type="button" id="confirmBtn" class="btn btn-primary">Confirmar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    

                 <!-- <<<<<<<<<< INICIO modal de datos de control >>>>>>>>>> -->
                 <div class="modal fade" id="modalEditar" tabindex="-1" role="dialog" aria-labelledby="modalLabel"
                     aria-hidden="true">
                    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-body">

                                <div class="color-hr text-center separacion-pequeña">
                                    <h5>INGRESE EL NUEVO VALOR</h5>
                                </div>

                                <div>
                                    <div class="row justify-content-md-center">
                                        <div class="col-4 separacion-pequeña">
                                            <b>FECHA NUEVA</b>
                                            <select name="" id="">
                                                <option value="">1</option>
                                                <option value="">1</option>
                                                <option value="">1</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                                <br>

                            </div>
                            <div class="modal-footer">
                                <button id="btnCerrarModal" type="button" class="btn btn-secondary"
                                    data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <<<<<<<<<< FIN modal de datos de control >>>>>>>>>> -->

            </div>

            <script src="js/modificacionconceptosVariables.js"></script>
            <%@ include file="common/footer.jsp" %>