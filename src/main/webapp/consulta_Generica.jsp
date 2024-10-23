<%@ include file="common/header-sesion.jsp" %>
    <%@ include file="common/nav.jsp" %>

        <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

            <div class="container rounded div-padding input-color separacion-pequeña">
                <br><br>
                <div class="text-center espacio-titulo">
                    <h3>CONSULTA GENÉRICA</h3>
                </div>
            </div>


            <div class="col*12">

                <div class="row justify-content-md-center">
                    <div class="col-2 separacion-pequeña">
                        <!--Año proceso-->
                        <label><b>Ejercicio Actual</b></label>
                        <input type="text" class="form-control" id="AnioProceso" disabled>
                    </div>

                    <div class="col-2 separacion-pequeña">
                        <!--periodo proceso-->
                        <label><b>Periodo Actual</b></label>
                        <input type="text" class="form-control" id="PeriodoProceso" disabled>
                    </div>

                    <div class="col-2 separacion-pequeña">
                        <!--Año proceso-->
                        <label><b>Desde</b></label>
                        <input type="text" class="form-control" id="PerInicio" disabled>
                    </div>

                    <div class="col-2 separacion-pequeña">
                        <!--periodo proceso-->
                        <label><b>Hasta</b></label>
                        <input type="text" class="form-control" id="PerFin" disabled>
                    </div>
                </div>
            </div>

            <div class="col-12 separacion-mediana">

                <div class="row justify-content-md-center">



                </div>

            </div>

            <div class="container ">
                <div class="row">
                    <div class="col-5 separacion-pequeña">
                        <label><b>Buscar Persona</b></label>
                        <input id="inpBuscar" class="resaltar-buscador" type="search" dir="ltr" spellcheck="false"
                            autocorrect="off" autocomplete="off" autocapitalize="off">

                    </div>
                    <div class="col-1 separacion-pequeña">
                        
                    </div>
                    <div class="col-3 separacion-pequeña">
                        <label><b>Nómina</b></label> <input id="Nomina" type="text" class="form-control" disabled>
                    </div>

                    <div class="col-2 separacion-pequeña"><br>
                        <input type="checkbox" id="CalLinea" onclick="actualizarValor()">
                        <label></label><b>Forzar cálculo en linea</b></label>
                    </div>
                </div>
            </div>

            <div class="container separacion-pequeña">
                <div class="row justify-content-md-center">
                    <div class="col-2">
                        <label><b>Percepciones</b></label>
                        <input type="text" class="form-control" id="percepciones" disabled>
                    </div>
                    <div class="col-2">
                        <label><b>Deducciones</b></label>
                        <input type="text" class="form-control" id="deducciones" disabled>
                    </div>
                    <div class="col-2">
                        <label><b>Liquido</b></label>
                        <input type="text" class="form-control" id="liquido" disabled>
                    </div>
                    <div class="col-2">
                        <label><b>Gravable</b></label>
                        <input type="text" class="form-control" id="gravable" disabled>
                    </div>
                    <div class="col-2">
                        <label><b>Cotiz. Seg. S.</b></label>
                        <input type="text" class="form-control" id="cotizSegS" disabled>
                    </div>

                </div>

            </div>

            <br>

            <div class="container separacion-mediana" id="forms">

                <!-- Pestañas -->
                <ul class="nav nav-tabs" id="Tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="datosGenerales-tab" data-bs-toggle="tab"
                            data-bs-target="#datosGenerales" type="button" role="tab" aria-controls="datosGenerales"
                            aria-selected="true">Datos Generales</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="puesto-tab" data-bs-toggle="tab" data-bs-target="#puesto"
                            type="button" role="tab" aria-controls="puesto" aria-selected="false">Puesto</button>
                    </li>

                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="Percepciones-tab" data-bs-toggle="tab"
                            data-bs-target="#Percepciones" type="button" role="tab" aria-controls="Percepciones"
                            aria-selected="false">Percepciones</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="Deducciones-tab" data-bs-toggle="tab" data-bs-target="#Deducciones"
                            type="button" role="tab" aria-controls="Deducciones"
                            aria-selected="false">Deducciones</button>
                    </li>

                </ul>


                <div class="tab-content" id="TabContent">

                    <div class="tab-pane fade show active" id="datosGenerales" role="tabpanel"
                        aria-labelledby="datosGenerales-tab">
                        <div class="card">
                            <div class="card-body">
                                <div class="row">

                                </div>
                                <div class="row">
                                    <div class="col-12 ">
                                        <div class="color-hr">
                                            <h5 class="custom-h5" style="text-align: center">
                                                DATOS GENERALES</h5>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-12">

                                    <div class="row">
                                        <div class="col-6">
                                            <label><b>Nombre</b></label> <input id="nombre" type="text"
                                                class="form-control" disabled>
                                        </div>
                                        <div class="col-3">
                                            <label><b>Situación</b></label> <input id="situacion" type="text"
                                                class="form-control" disabled>
                                        </div>
                                        <div class="col-3">

                                            <label><b>Código Fiscal (Timbrado)</b></label>
                                            <input id="codFiscal" type="text" class="form-control" disabled>
                                        </div>

                                    </div>
                                </div>
                                <div class="text-left separacion-pequeña">

                                    <div class="row justify-content-md-center">
                                        <div class="col-3">
                                            <label><b>CURP</b></label> <input id="curp" type="text" class="form-control"
                                                disabled>
                                        </div>
                                        <div class="col-3">

                                            <label><b>RFC</b> </label><input id="rfc" type="text" class="form-control"
                                                disabled>

                                        </div>
                                        <div class="col-2">
                                            <label><b>Homoclave</b></label>
                                            <input id="homoclave" type="text" class="form-control" disabled>
                                        </div>
                                        <div class="col-2">
                                            <label><b>No. Seguro Social</b></label> <br>
                                            <input id="segSocial" type="text" class="form-control" disabled>
                                        </div>
                                        <div class="col-2">
                                            <label><b>No. Empleado</b></label> <br>
                                            <input id="noEmpleado" type="text" class="form-control" disabled>
                                        </div>

                                    </div>
                                </div>



                                <div class="row justify-content-md-center">
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Género</b></label>
                                        <input id="genero" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-3 separacion-pequeña">

                                        <label><b>Nacionalidad</b></label>
                                        <input id="nacionalidad" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Estado Civil</b></label>
                                        <input id="edocivil" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">

                                        <label><b>ID Rusp</b></label>
                                        <input id="idRusp" type="text" class="form-control" disabled>
                                    </div>


                                </div>

                                <div class="row justify-content-md-center">
                                    <div class="col-12 separacion-pequeña">
                                        <div class="color-hr">
                                            <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                                LUGAR DE ORIGEN</h5>
                                        </div>
                                    </div>

                                    <div class="col-3 separacion-pequeña">

                                        <label><b>Estado</b></label>
                                        <input id="estado" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">

                                        <label> <b>Delegación o Municipio</b></label>
                                        <input id="DeloMuni" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="color-hr">
                                    <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                        INGRESO AL ORGANISMO</h5>
                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-3 separacion-pequeña">

                                        <label> <b>Ingreso al Sector Público</b></label>
                                        <input id="ingresoSP" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">

                                        <label><b>Ingreso al Organismo</b></label>
                                        <input id="ingresoOrg" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">

                                        <label> <b>Fecha de Baja</b></label>
                                        <input id="fechaBaja" type="text" class="form-control" disabled>
                                    </div>
                                </div>


                                <br>
                            </div>
                        </div>
                    </div>
                    <!-- Fin seccion DATOS GENERALES -->


                    <div class="tab-pane fade" id="puesto" role="tabpanel" aria-labelledby="puesto-tab">


                        <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="color-hr">
                                            <h5 class="custom-h5" style="text-align: center">
                                                PUESTO</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-2 separacion-pequeña">
                                        <label><b>Código</b></label>
                                        <input id="codigo" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-8 separacion-pequeña">
                                        <label><b>Descripción del Puesto</b></label><br>
                                        <input id="descripcion" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-2 separacion-pequeña">
                                        <label><b>Plaza</b></label>
                                        <input id="plaza" type="text" class="form-control" disabled>
                                    </div>
                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Tipo</b></label>
                                        <input id="tipo" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Zona</b></label>
                                        <input id="zonaEco" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Nivel</b></label>
                                        <input id="nivel" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Contratación</b></label>
                                        <input id="contratacion" type="text" class="form-control" disabled>
                                    </div>



                                </div>
                                <div class="row justify-content-md-center">

                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Categoría</b></label>
                                        <input id="categoria" type="text" class="form-control" disabled>
                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Subcategoria</b></label>
                                        <input id="subcategoria" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Clasificación Interna</b></label>
                                        <input id="ClasInterna" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-3 separacion-pequeña">
                                        <label><b>Sujeto a Dec Patrimonial</b></label>
                                        <input id="patrimonial" type="text" class="form-control" disabled>

                                    </div>

                                </div>
                                <div class="row justify-content-md-center">



                                    <!-- <div class="col-6 separacion-pequeña">
                                        <label><b>Radicación</b></label>
                                        <input id="radicacion" type="text" class="form-control" disabled>

                                    </div>-->

                                </div>

                                <div class="col-12">
                                    <div class="color-hr">
                                        <h5 class="custom-h5 separacion-pequeña" style="text-align: center">
                                            CENTRO DE DISTRIBUCIÓN Y CENTRO DE TRABAJO</h5>
                                    </div>
                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-2 separacion-pequeña">
                                        <label><b>Número de Unidad</b></label>
                                        <input id="numeroUni" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-10 separacion-pequeña">
                                        <label><b>Nombre de la Unidad</b></label>
                                        <input id="nombreUni" type="text" class="form-control" disabled>

                                    </div>

                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-2 separacion-pequeña">
                                        <label><b>No. de Centro de Dist</b></label>
                                        <input id="numeroCenDist" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-10 separacion-pequeña">
                                        <label><b>Nombre del Centro de Distribución</b></label>
                                        <input id="nomCenDist" type="text" class="form-control" disabled>

                                    </div>

                                </div>
                                <div class="row justify-content-md-center">
                                    <div class="col-2 separacion-pequeña">
                                        <label><b>No. de Centro de Trab.</b></label>
                                        <input id="numeroCenTrab" type="text" class="form-control" disabled>

                                    </div>
                                    <div class="col-10 separacion-pequeña">
                                        <label><b>Nombre del Centro de Trabajo</b></label>
                                        <input id="nomCenTrab" type="text" class="form-control" disabled>

                                    </div>

                                </div>


                                <br>
                            </div>

                        </div>

                        <br>


                    </div>





                    <!-- Fin seccion PUESTO -->

                    <div class="tab-pane fade" id="Percepciones" role="tabpanel" aria-labelledby="Percepciones-tab">

                        <div class="card">

                            <div class="card-body">

                                <div class="color-hr text-center">
                                    <h5>PERCEPCIONES</h5>
                                </div>

                                <div id="tablaPercepcionesPrincipal" style="font-size: 15px;">
                                    <table class="table table-bordered" id="tablaPercepciones">
                                        <thead class="text-center align-middle table-dark">
                                            <tr>
                                                <th rowspan="2">Clave</th>
                                                <th rowspan="2">Antec</th>
                                                <th rowspan="2">Tipo de Concepto</th>
                                                <th rowspan="2">Concepto</th>
                                                <th colspan="2">Ocurrencia</th>
                                                <th rowspan="2">Ant. Aplicat.</th>
                                                <th rowspan="2">Importe</th>
                                            </tr>
                                            <tr>
                                                <th>Inicio</th>
                                                <th>Final</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                    </div>
                    <!-- Fin seccion PERCEPCIONES -->

                    <div class="tab-pane fade" id="Deducciones" role="tabpanel" aria-labelledby="Deducciones">


                        <div class="card">
                            <div class="card-body">

                                <div class="color-hr text-center">
                                    <h5>DEDUCCIONES</h5>
                                </div>

                                <div>
                                    <div id="tablaDeduccionesPrincipal" style="font-size: 15px;">
                                    <table class="table table-bordered" id="tablaDeducciones">
                                        <thead class="text-center align-middle table-dark">
                                            <tr>
                                                <th rowspan="2">Clave</th>
                                                <th rowspan="2">Ant</th>
                                                <th rowspan="2">Tipo de Concepto</th>
                                                <th rowspan="2">Concepto</th>
                                                <th colspan="2">Ocurrencia</th>
                                                <th rowspan="2">Ant. Aplicat.</th>
                                                <th rowspan="2">Importe</th>
                                            </tr>
                                            <tr>
                                                <th>Inicio</th>
                                                <th>Final</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Fin seccion DEDUCCIONES -->


            </div>
            </div>

            <script src="js/consulta_Generica.js"></script>
            <%@ include file="common/footer.jsp" %>