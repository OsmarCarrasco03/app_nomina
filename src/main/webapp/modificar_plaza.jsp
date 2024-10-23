<%@ include file="common/header-sesion.jsp" %>
    <%@ include file="common/nav.jsp" %>
    <%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

        <div class="container rounded div-padding input-color separacion-pequeña">
            <br><br><br><br>
            <div class="text-center espacio-titulo">
                <h3>MODIFICACIÓN DE PLAZAS</h3>
            </div>

            <br>

            <div class="container" id="forms">

                <!-- Pesta?as -->
                <ul class="nav nav-tabs" id="Tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="datosGenerales-tab" data-bs-toggle="tab"
                            data-bs-target="#datosGenerales" type="button" role="tab" aria-controls="datosGenerales"
                            aria-selected="true">Datos
                            Generales</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="datosUnidad-tab" data-bs-toggle="tab" data-bs-target="#datosUnidad"
                            type="button" role="tab" aria-controls="datosUnidad" aria-selected="false">Datos de
                            Unidad</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="PuesPagvsPA-tab" data-bs-toggle="tab" data-bs-target="#PuesPagvsPA"
                            type="button" role="tab" aria-controls="PuesPagvsPA" aria-selected="false">Puesto Autorizado
                            vs Puesto Pagado</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="datosPersona-tab" data-bs-toggle="tab"
                            data-bs-target="#datosControl" type="button" role="tab"
                            aria-controls="datosControl" aria-selected="false" hidden>Datos de Control</button>
                    </li>
                </ul>

                <!-- Contenido de las pesta?as -->
                <div class="tab-content" id="TabContent">
                    <!-- Contenido de la pesta?a "Datos Generales" -->
                    <div class="tab-pane fade show active" id="datosGenerales" role="tabpanel"
                        aria-labelledby="datosGenerales-tab"> <!--fade-->
                        <div class="card">
                            <div class="card-body">
                                <div class="row separacion-pequeña">
                                    <div class="autoComplete_wrapper">
                                        <div class="row">
                                            <div class="col-8 separacion-pequeña">
                                                <input id="autoCompleteNumPlaza" type="search" dir="ltr"
                                                    spellcheck="false" autocorrect="off" autocomplete="off"
                                                    autocapitalize="off" size="100" class="resaltar-buscador"
                                                    style="width:100%; border: 1px solid; height: 35px;">
                                            </div>


                                            <div class="col-4 separacion-pequeña">

                                                <button type="button" class="btn btn-primary" data-descripcion="1"
                                                    id="seleccion">Seleccionar
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                </button>

                                                <!-- INICIO boton Servicio -->
                                                <button style="margin-left: 20px;" type="button" class="btn btn-success"
                                                    id="nuevaBusqueda" disabled>Nueva
                                                    Busqueda
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
                                                        <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
                                                    </svg>
                                                </button>

                                                <!-- FIN boton Servicio -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               <br>
                                <div class="row">
                                    <div class="col-12 separacion-pequeña">
                                        <div class="color-hr">
                                            <h5 class="custom-h5" style="text-align: center">DATOS GENERALES</h5>
                                        </div>
                                    </div>
                                </div>
                                <br>
                                <div id="myDIV" class="text-left">

                                    <div class="row justify-content-md-center">
                                        <div class="col-4">
                                            <b>Número de Plaza</b><span style="color: red"> * </span> <input id="numeroPlaza" type="text"
                                                class="form-control" oninput="validarNumero(this)" disabled>
                                        </div>
                                        <div class="col-4">
                                            <label for="numeroPlazaPadre"><b>Número de Plaza Padre</b></label>
                                            <div class="input-group">
                                                <input id="numeroPlazaPadre" type="text" class="form-control" oninput="validarNumeros(this)" disabled>
                                                <div class="input-group-append">
                                                    <button id="habilitarPlazaPadre" class="btn btn-outline-danger"
                                                        type="button" disabled>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
														</svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row justify-content-md-center">
                                        <div class="col-4 separacion-pequeña">
                                            <label><b>Codigo Inteligente Rhnet</b><span style="color: red"> * </span></label>
                                            <div class="input-group">
                                                <input id="codigoIR" type="text" class="form-control" oninput="validarNumeros(this)" disabled>
                                                <div class="input-group-append">
                                                    <button id="habilitarCodigoIR" class="btn btn-outline-danger"
                                                        type="button" disabled>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
														  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
														</svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div class="col-4 separacion-pequeña">

                                            <b>Estatus Ocupacional</b><span style="color: red"> * </span><br>
                                            <input id="EstatusOcupàcional" type="text" class="form-control"
                                                disabled>
                                        </div>
                                        
                                        <div class="col-4 separacion-pequeña">
                                            <label><b>Situación de la Plaza</b><span style="color: red"> * </span></label>
                                            <div class="input-group">
                                                <select id="inpSituacionPlaza" class="form-select" aria-label="Default select example" disabled></select>
                                                <button id="habilitarSituacionPlaza" class="btn btn-outline-danger"
                                                    type="button" disabled>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
													  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Motivos de Obligación de Declaración Patrimonial</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
<!--                                             <input id="MotivosDeObligacion" type="text" class="form-control" disabled> -->
                                            <select id="MotivosDeObligacion" class="form-select" aria-label="Default select example" disabled></select>
                                            <button id="habilitarMotivosDeObli" class="btn btn-outline-danger"
                                                type="button" disabled>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
												</svg>
                                            </button>
                                        </div>
                                    </div>
									
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Áreas</b><span style="color: red"> * </span><br><b>‎ </b></label>
                                        <div class="input-group">
                                            <input id="Areas" type="text" class="form-control" disabled>
                                            <div class="input-group-append">
                                                <button id="habilitarAreas" class="btn btn-outline-danger" type="button" disabled>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
													  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Contrataciones Públicas</b><span style="color: red"> * </span><br><b>‎ </b></label>
                                        <div class="input-group">
                                            <input id="ContratacionesPublicas" type="text" class="form-control" disabled>
                                            <div class="input-group-append">
                                                <button id="habilitarContratacionesPub" class="btn btn-outline-danger" type="button" disabled>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
													  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                <div class="row">
                                    
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Trámite de C.L.A.P.P.</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
                                            <input id="tramiteCLAPP" type="text" class="form-control" disabled>
                                            <div class="input-group-append">
                                                <button id="habilitarTramiteClapp" class="btn btn-outline-danger" type="button" disabled>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
													  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Trámite de E.B.I.</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
                                            <input id="TramiteEBI" type="text" class="form-control" disabled>
                                            <div class="input-group-append">
                                                <button id="habilitarTramiteEbi" class="btn btn-outline-danger" type="button" disabled>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
													  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
													</svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Trámite de A.E.D.M.A.J.R.</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
<!--                                             <input id="TramiteAEDMAJR" type="text" class="form-control" disabled> -->
                                            <select id="TramiteAEDMAJR" class="form-select" aria-label="Default select example" disabled></select>
                                            <button id="habilitarTramiteAedmajr" class="btn btn-outline-danger"
                                                type="button" disabled>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
												</svg>
                                            </button>
                                        </div>
                                    </div>

                                </div>


                                <div class="row">
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Nivel de Equivalencia</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
<!--                                             <input id="NivelEquivalencia" type="text" class="form-control" disabled> -->
                                            <select id="NivelEquivalencia" class="form-select" aria-label="Default select example" disabled></select>
                                            <button id="habilitarNivelEq" class="btn btn-outline-danger" 
                                            type="button" disabled>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
												</svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>RFI_RIUF</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
                                            <input id="RFI" oninput="validarNumerosRFI(this)" type="text" size= "25" style="width: 100%" class="form-control" disabled>
                                            <button id="habilitarRfi" class="btn btn-outline-danger" 
                                            type="button" disabled>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
												</svg>
                                            </button>
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    <div class="col-4 separacion-pequeña">
                                        <label><b>Tipo de Servidor Público</b><span style="color: red"> * </span></label>
                                        <div class="input-group">
                                            <input id="TipoSerPub" type="text" size="25" style="width: 100%;"  class="form-control" disabled>
                                            <button id="habilitarTipoSerPub" class="btn btn-outline-danger"
                                                type="button" disabled>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle-fill" viewBox="0 0 16 16">
												  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.646-2.646a.5.5 0 0 0-.708-.708l-6 6a.5.5 0 0 0 .708.708z"/>
												</svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                    <!-- Contenido de la pesta?a "Datos de Unidad" -->


                    <div class="tab-pane fade" id="datosUnidad" role="tabpanel" aria-labelledby="datosUnidad-tab">

                        <!-- Agrega tu contenido para la pesta?a de Datos de Unidad aqu? -->
                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <br>
                                        <div class="color-hr">
                                            <h5 class="custom-h5" style="text-align: center">UNIDAD</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">

                                    <div class="col-2"></div>
                                    <div class="col-8">
                                        <div class="d-grid gap-2">

                                            <button class="btn btn-outline-success" id="btnUCTD"
                                                style="margin-top: 20px; margin-bottom: 15px;" type="button" disabled>Modificar
                                                Unidad
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="col-2"></div>
                                </div>



                                <div class="row" style="display: none;" id="buscadorUnidades">
                                    <div class="autoComplete_wrapper">
                                        <div class="row">
                                            <div class="col-8 separacion-pequeña">
                                                <input id="autoCompleteUnidad" type="search" dir="ltr"
                                                    spellcheck="false" autocorrect="off" autocomplete="off"
                                                    autocapitalize="off" size="100" class="resaltar-buscador"
                                                    style="width:100%; border: 1px solid; height: 35px;">
                                            </div>

                                            <div class="col-4 separacion-pequeña">

                                                <button type="button" class="btn btn-primary" data-descripcion="1" 
                                                    id="seleccionar">Seleccionar
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                </button> 

<!--                                                 INICIO boton Servicio -->
                                                <button style="margin-left: 20px;" hidden type="button"
                                                    class="btn btn-success" id="habilitarBusqueda">Habilitar
                                                    Búsqueda
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
                                                        <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
                                                    </svg>
                                                </button>

<!--                                                 FIN boton Servicio -->
                                            </div>
                                        </div>
                                    </div>
                                </div>





                                <div class="row">
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Código de la Unidad</b><span style="color: red"> * </span></label> <input type="text"
                                            class="form-control" id="codigoUnidad" disabled>
                                    </div>
                                    <div class="col-9 separacion-pequeña">
                                        <label><b>Nombre de la Unidad</b><span style="color: red"> * </span></label> <input type="text"
                                            class="form-control" id="nombreUnidad" disabled>
                                    </div>
                                </div>

                                <br>
                                <!--EMPIEZO CON LAS FUNCIONALIDADES PARA EL MODAL DE DISTRIBUCION-->
                                <div class="row">


                                    <div class="col-12 separacion-pequeña">
                                        <div class="color-hr">
                                            <h5 class="custom-h5" style="text-align: center">CENTRO DE TRABAJO Y
                                                DISTRIBUCIÓN
                                            </h5>
                                        </div>
                                    </div>


                                </div>
                                <div class="container separacion-pequeña">
                                    <!--Inicio del row-->
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="d-grid gap-2">

                                                <button class="btn btn-outline-success" id="btnModCtrTrab"
                                                    style="margin-top: 20px; margin-bottom: 15px;"
                                                    type="button" disabled>Modificar
                                                    Centro de Trabajo
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div class="col-6">
                                            <div class="d-grid gap-2">

                                                <button class="btn btn-outline-success" id="btnModCtrDist"
                                                    style="margin-top: 20px; margin-bottom: 15px;"
                                                    type="button" disabled>Modificar
                                                    Centro de Distribución
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>


                                    </div>
                                    <div class="row">

                                        <div class="col-md-6" id="ctrtrab">
                                            <b>Centro de Trabajo</b><span style="color: red"> * </span>
                                            <input style="WIDTH:515px; HEIGHT: 30px; display: none;" size=32
                                                id="autoCompletenone" type="search" dir="ltr" spellcheck=false
                                                autocorrect="off" autocomplete="off" autocapitalize="off" class="resaltar-buscador">
<!--                                             <label for="otroInputc"></label> -->
                                            <input type="text" class="col form-control" id="otroInputc" disabled
                                                name="otroInputc" style="WIDTH:515px; height: 30px;" /><br>
                                            <input class="col-12 text-center" type="text" id="ctra_id" name="ctra_id"
                                                style="display: none;">
                                            <div id="btnBusCtra" style="display: none;">
                                                <button id="especificactra" type="button" class="btn btn-dark"
                                                    data-bs-toggle="modal" data-bs-target="#miModal">BUSQUEDA
                                                    ESPECIFICA
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                </button>
                                                <button id="nuevoBoton" type="button" class="btn btn-dark"
                                                    data-bs-toggle="modal" data-bs-target="#nuevoModal">VER
                                                    BUSQUEDA
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
                                                        <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <!-- MODAL PARA VER LAS BUSQUEDAS  -->
                                        <div class="modal fade" id="nuevoModal" tabindex="-1"
                                            aria-labelledby="nuevoModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">

                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="nuevoModalLabel">CENTRO DE
                                                            TRABAJO</h5>
                                                        <button type="button" id="nuevo" class="btn-close"
                                                            data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>

                                                    <div class="modal-body">
                                                        <div class="mb-3"></div>
                                                        <div class="mb-3"></div>
                                                    </div>

                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Cerrar
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                              </svg>                                                              
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- MODAL PARA VER LAS BUSQUEDAS  -->


                                        <!-- MODAL PARA INCRUSTAR EL JSP  -->

                                        <div class="modal fade" id="miModal" tabindex="-1"
                                            aria-labelledby="miModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg custom-modal">
                                                <div class="modal-content">
                                                    <div class="p-4">
                                                        <!-- Eliminadas las alertas -->
                                                        <%@ include file="Modal_ctratrabajo.jsp" %>
                                                            <div class="text-center">
                                                                <button type="button"
                                                                    class="btn btn-secondary btn-modal"
                                                                    data-bs-dismiss="modal">Cerrar
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                                      </svg>                                                                      
                                                                </button>
                                                                <button id="btnsiguientectra" type="button"
                                                                    class="btn btn-primary btn-modal">Guardar
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                                                                        <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <!--Centro de distribucion-->


                                        <div class="col-md-6">

                                            <b>Centro de Distribución</b><span style="color: red"> * </span>

                                            <input style="width: 515px; height: 30px; display: none;" size=" 32"
                                                id="autoCompleteuno" type="search" dir="ltr" spellcheck="false"
                                                autocorrect="off" autocomplete="off" autocapitalize="off" class="resaltar-buscador">
                                            <input type="text" class="col form-control" disabled id="otroInput"
                                                style="width: 515px; height: 30px;" ><br>
                                            <!--AQUI SE GUARDA EL ID DE CENTRO DE DISTRIBUCION-->
                                            <input class="col-12 text-center" id="cdis_id" type="text" name="cdis_id"
                                                style="display: none;">

                                            <div id="ctrDist" style="display: none;">

                                                <input class="col-12 text-center" id="cdis_id" type="text"
                                                    name="cdis_id" style="display: none;">
                                                <button id="especificacdis" type="button" class="btn btn-dark "
                                                    data-bs-toggle="modal" data-bs-target="#miModaldist">BUSQUEDA
                                                    ESPECIFICA
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                </button>
                                                <button id="btnver" type="button" class="btn btn-dark "
                                                    data-bs-toggle="modal" data-bs-target="#miModal2">VER
                                                    BUSQUEDA
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-binoculars-fill" viewBox="0 0 16 16">
                                                        <path d="M4.5 1A1.5 1.5 0 0 0 3 2.5V3h4v-.5A1.5 1.5 0 0 0 5.5 1zM7 4v1h2V4h4v.882a.5.5 0 0 0 .276.447l.895.447A1.5 1.5 0 0 1 15 7.118V13H9v-1.5a.5.5 0 0 1 .146-.354l.854-.853V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v.793l.854.853A.5.5 0 0 1 7 11.5V13H1V7.118a1.5 1.5 0 0 1 .83-1.342l.894-.447A.5.5 0 0 0 3 4.882V4zM1 14v.5A1.5 1.5 0 0 0 2.5 16h3A1.5 1.5 0 0 0 7 14.5V14zm8 0v.5a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5V14zm4-11H9v-.5A1.5 1.5 0 0 1 10.5 1h1A1.5 1.5 0 0 1 13 2.5z"/>
                                                    </svg>
                                                </button>
                                            </div>



                                        </div>

                                        <div class="modal fade" id="miModal2" tabindex="-1"
                                            aria-labelledby="miModal2Label" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content">
                                                    <!-- Encabezado del modal -->
                                                    <div></div>
                                                    <div class="modal-header">
                                                        <h5 class="text-center" class="color-hr" class="modal-title"
                                                            id="miModal2Label">
                                                            CENTRO DE DISTRIBUCION</h5>

                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Close"></button>
                                                    </div>
                                                    <!-- Contenido del modal -->
                                                    <div class="modal-body">
                                                        <div class="mb-3"></div>


                                                        <div class="mb-3"></div>
                                                    </div>
                                                    <!-- Bot?n de cierre del modal -->
                                                    <div class="modal-footer">


                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Cerrar
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                              </svg>                                                              
                                                        </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="modal fade" id="miModaldist" tabindex="-1"
                                            aria-labelledby="miModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered modal-lg custom-modal">
                                                <div class="modal-content">
                                                    <div class="p-4">
                                                        <div id="alertaModal" class="alert alert-danger custom-alert"
                                                            role="alert" style="display: none;"></div>


                                                        <%@ include file="Modal_cdisdistribucion.jsp" %>
                                                            <div class="text-center">

                                                                <button type="button"
                                                                    class="btn btn-secondary btn-modal"
                                                                    data-bs-dismiss="modal">Cerrar
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                                      </svg>                                                                      
                                                                </button>
                                                                <button id="btnsiguientedist" type="button"
                                                                    class="btn btn-primary btn-modal">Guardar
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
                                                                        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                                                                        <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>





                                        <!--Fin centro de distribucion-->





                                    </div>
                                    <!--Fin del row-->
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>

                    <!-- Contenido de la pesta?a "Puesto autorizado vs puesto pagado" -->
                    <div class="tab-pane fade" id="PuesPagvsPA" role="tabpanel" aria-labelledby="PuesPagvsPA-tab">

                        <div class="card">
                            <div class="card-body">
                                <!-- Agrega tu contenido para la pesta?a de Puesto autorizado vs puesto pagado aqu? -->

                                <div class="container">
                                    <div class="row">
                                        <div class="col-6">
                                            <br>
                                            <div class="color-hr">
                                                <h5 class="custom-h5" style="text-align: center">PUESTO
                                                    AUTORIZADO</h5>
                                            </div>
                                            <div class="d-grid gap-2">

                                                <button class="btn btn-outline-success" id="btnPA"
                                                    style="margin-top: 20px; margin-bottom: 15px;"
                                                    type="button" disabled>Modificar
                                                    el Puesto Autorizado
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <br>
                                            <div class="color-hr">
                                                <h5 class="custom-h5" style="text-align: center">PUESTO PAGADO
                                                </h5>
                                            </div>
                                            <div class="d-grid gap-2">

                                                <button class="btn btn-outline-success" id="btnPP"
                                                    style="margin-top: 20px; margin-bottom: 15px;"
                                                    type="button" disabled>Modificar
                                                    el Puesto Pagado
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="areaDestino"></div>
                                <div class="row">
                                    <dir class="col-6">
                                        <div id="buscardorIzq" style="display: none;"> <!--style="display: none;"-->

                                            <!-- Buscardor izquierdo -->
                                            <div
                                                class="text-center justify-content-md-center espacio-titulo ui-widget col-12">
                                                <div class="autoComplete_wrapper">
                                                    <input id="autoComplete" type="search" dir="ltr" spellcheck="false"
                                                        autocorrect="off" autocomplete="off" autocapitalize="off"
                                                        size="100" class="resaltar-buscador"
                                                        style="width: 90%; border: 1px solid; height: 30px"><br> <br>
                                                    <button type="button" class="btn btn-primary" data-descripcion="1"
                                                        data-toggle="modal" data-target="#modalInfo"
                                                        onclick="buscarPuesto()">Buscar
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- Fin buscardor -->

                                            <!-- Modal -->

                                            <div class="modal fade" id="modalInfo" tabindex="-1" role="dialog"
                                                aria-labelledby="modalInfoLabel" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog modal-lg" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="modalInfoLabel">Selecciona una
                                                                opción</h5>
                                                            <button type="button" class="btn-close"
                                                                data-bs-dismiss="modal" aria-label="Cerrar">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <!-- Opciones se agregar?n aqu? din?micamente -->
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary"
                                                                data-bs-dismiss="modal">Cerrar
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                                  </svg>                                                                  
                                                            </button>
                                                            <button type="button" class="btn btn-primary"
                                                                id="seleccionarBtn">Seleccionar
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </dir>
                                  
                                  <div class="col-6">

                                    <div id="autocompleteDere" style="display: none;"><!--style="display: none;"-->

                                        <!-- Buscardor Derecho -->
                                        <div
                                            class="text-center justify-content-md-center espacio-titulo ui-widget col-12">
                                            <div class="autoComplete_wrapper">
                                                <input id="segundoAutoComplete" type="search" dir="ltr"
                                                    spellcheck="false" autocorrect="off" autocomplete="off"
                                                    autocapitalize="off" size="100" class="resaltar-buscador"
                                                    style="width: 90%; border: 1px solid; height: 30px"><br>
                                                <br>
                                                <button type="button" class="btn btn-primary"
                                                    id="abrirInfo_segundoAutoComplete" data-toggle="modal"
                                                    data-target="#modalInfo2" data-descripcion="2"
                                                    onclick="buscarPuestoX()">Buscar
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <!-- Fin buscardor -->

                                        <!-- Modal -->

                                        <div class="modal fade" id="modalInfo2" tabindex="-1" role="dialog"
                                            aria-labelledby="modalInfoLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog modal-lg" role="document">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title" id="modalInfoLabel">Selecciona una
                                                            opción</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                            aria-label="Cerrar">
                                                            <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <!-- Opciones se agregar?n aqu? din?micamente -->
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary"
                                                            data-bs-dismiss="modal">Cerrar
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                                                              </svg>                                                              
                                                        </button>
                                                        <button type="button" class="btn btn-primary"
                                                            id="seleccionarBtn2">Seleccionar
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <!-- Fin modal -->
                            <div class="container">
                                <div class="row">
                                    <!-- Formulario a la izquierda -->
                                    <div class="col-6">
                                        <div class="formulario-izquierda">
                                            <!-- Contenedor para el formulario izquierdo -->
                                            <div class="container">
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Código del Puesto</b><span style="color: red"> * </span></label> <input type="text"
                                                        class="form-control" id="CodigoPuesto" disabled />

                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Descripción</b></label> <input type="text"
                                                        class="form-control" id="descripcion" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Tipo</b></label> <input type="text" class="form-control"
                                                        id="tipo" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Zona</b></label> <input type="text" class="form-control"
                                                        id="Zona" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Nivel</b></label> <input type="text" class="form-control"
                                                        id="nivel" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Contratación</b></label> <input type="text"
                                                        class="form-control" id="contratacion" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Categoría</b></label> <input type="text"
                                                        class="form-control" id="categoria" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Subcategoría</b></label> <input type="text"
                                                        class="form-control" id="subcategoria" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Clasificación Interna</b></label> <input type="text"
                                                        class="form-control" id="classif_interna" disabled />
                                                </div>

                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Declaración Patrimonial</b></label> <input type="text"
                                                        class="form-control" id="declaracion_patri" disabled />
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <!-- Formulario a la derecha -->
                                    <div class="col-6">
                                        <div class="formulario-izquierda">
                                            <!-- Contenedor para el formulario derecho -->
                                            <div class="container">
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Código del Puesto</b><span style="color: red"> * </span></label> <input type="text"
                                                        class="form-control" id="CodigoPuesto1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Descripción</b></label> <input type="text"
                                                        class="form-control" id="descripcion1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Tipo</b></label> <input type="text" class="form-control"
                                                        id="tipo1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Zona</b></label> <input type="text" class="form-control"
                                                        id="Zona1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Nivel</b></label> <input type="text" class="form-control"
                                                        id="nivel1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Contratación</b></label> <input type="text"
                                                        class="form-control" id="contratacion1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Categoría</b></label> <input type="text"
                                                        class="form-control" id="categoria1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Subcategoría</b></label> <input type="text"
                                                        class="form-control" id="subcategoria1" disabled />
                                                </div>
                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Clasificación Interna</b></label> <input type="text"
                                                        class="form-control" id="classif_interna1" disabled />
                                                </div>

                                                <div class="col-12 separacion-pequeña">
                                                    <label><b>Declaración Patrimonial</b></label> <input type="text"
                                                        class="form-control" id="declaracion_patri1" disabled />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
							<div
								class="text-center justify-content-md-center espacio-titulo ui-widget">

<!-- 								<button id="btnCancelar" class="btn btn-danger" type="submit" -->
<!-- 									disabled onclick="cancelar()" disabled>Cancelar</button> -->
								<button id="btnGuardarCambios" class="btn btn-success"
									type="submit" disabled onclick="">Guardar Cambios
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
                                        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                                        <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                                    </svg>
                                </button>

							</div>
						</div>
                            <div class="container">
                                <div class="row">
                                    <div class="col-6 separacion-pequeña justify-content-md-center">
                                    </div>
                                    <div class="col-2 separacion-pequeña " style="transform: translate(-50%, 50%);">
                                    </div>
                                    <div class="col-6 separacion-pequeña justify-content-md-center">
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <br><br>
                </div>

                <!-- Inicio seccion datos de control -->

			<div class="tab-pane fade" id="datosControl" role="tabpanel"
            aria-labelledby="datosControl-tab">
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

        <script src="js/modifica_plaza.js"></script>
        <%@ include file="common/footer.jsp" %>