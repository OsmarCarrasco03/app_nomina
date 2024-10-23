<%@ include file="common/header-sesion.jsp"%>
<%@ include file = "common/nav.jsp" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<div id="separadorNav"></div>

<div class="container rounded div-padding input-color">
    <div class="text-center espacio-titulo ">
        <h3>CONSULTA GENERICA DE EMPLEADOS</h3>
        <h3 id="test"></h3>
    </div>

<!-- Primera Secci�n -->
	<div class="text-center">
       <div class="row justify-content-md-center">
           <div class="col">
               <p>Seguridad</p>

               <input type="password" class="form-control" id="exampleInputPassword1">
           </div>
           
           <div class="col">
               <p>Periodo de Pago Actual (Año)</p>

               <input type="text" class="form-control" size="10" name="datepicker2" id="datepicker" 
               value="2023"/>
           </div>

           <div class="col">
               <p>Periodo</p>
               <select class="form-select" aria-label="Default select example">
                   <option>Selecciona un periodo</option>
                   <option value="1">1</option>
                   <option value="2">2</option>
                   <option value="3">3</option>
                   <option value="4">4</option>
                   <option value="5">5</option>
                   <option value="6" selected>6</option>
               </select>
           </div>
       </div>

	   <div class="row justify-content-md-center div-separacion-mediana2">
	       <div class="col">
	           Nomina
	           <select class="form-select" aria-label="Default select example">
	               <option>Selecciona una Nomina</option>
	               <option value="1" selected>1 Ordinaria</option>
	               <option value="2">2 Extraordinaria</option>
	               <option value="3">3 Extraordinaria</option>
	           </select>
	       </div>
	       <div class="col"><br>
	           <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
	           <label class="form-check-label" for="flexCheckDefault">
	               Forzar Cálculo en linea
	           </label>
	       </div>
	    </div>
	
	   <div class="row justify-content-md-center div-separacion-mediana2">
	       <div class="col">
	           Situación
	           <input class="form-control" type="text" value="Activo" aria-label="readonly input example" readonly>
	       </div>
	       <div class="col"><br>
	           <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
	           <label class="form-check-label" for="flexCheckDefault">
	               Forzar Conceptos no integrados
	           </label>
	       </div>
	   </div>
	
	   <div class="row div-separacion-mediana2">
	       <div class="col-6">
	           Tipo de Contratación
	           <input class="form-control" type="text" value="Presupuestal" aria-label="readonly input example"
	               readonly>
	       </div>
	   </div>
	
	   <div class="row justify-content-md-center div-separacion-mediana2">
	       <div class="col">
	           Percepciones
	           <input class="form-control" type="text" value="12399.77" aria-label="readonly input example" readonly>
	       </div>
	       <div class="col">
	           Deducciones
	           <input class="form-control" type="text" value="4933.14" aria-label="readonly input example" readonly>
	       </div>
	       <div class="col">
	           Liquido
	           <input class="form-control" type="text" value="7466.63" aria-label="readonly input example" readonly>
	       </div>
	       <div class="col">
	           Gravable
	           <input class="form-control" type="text" value="12399.77" aria-label="readonly input example" readonly>
	       </div>
	       <div class="col">
	           Cotiz. Seg. S.
	           <input class="form-control" type="text" value="6297.38" aria-label="readonly input example" readonly>
	       </div>
	   </div>
	</div>
</div>

    <!-- Acorde�n -->
<div class="container rounded input-color div-padding-sm div-separacion-md1 div-separacion-debajo">
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button class="accordion-button acordeon-color" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    Datos Generales
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="container-fluid cew-9">
                        <div class="row">
                            <div class="col">
                                CURP
                                <input class="form-control" type="text" value="SIMD940523HDFMRV00"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                R.F.C.
                                <input class="form-control" type="text" value="SIMD940523"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Clave
                                <input class="form-control" type="text" value="L9A" aria-label="readonly input example"
                                    readonly>
                            </div>
                            <div class="col">
                                No. De Seguridad Social
                                <input class="form-control" type="text" value="01400500"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Número de empleado
                                <input class="form-control" type="text" value="26286"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Apellido Paterno
                                <input class="form-control" type="text" value="SIMÓN"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Apellido Materno
                                <input class="form-control" type="text" value="MARTÍNEZ"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Nombres
                                <input class="form-control" type="text" value="DAVID"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Género
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault1" checked>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                        Hombre
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault"
                                        id="flexRadioDefault2" >
                                    <label class="form-check-label" for="flexRadioDefault2">
                                        Mujer
                                    </label>
                                </div>
                            </div>
                            <div class="col">
                                Nacionalidad
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault1"
                                        id="flexRadioDefault3" checked>
                                    <label class="form-check-label" for="flexRadioDefault3">
                                        Mexicana
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault1"
                                        id="flexRadioDefault4">
                                    <label class="form-check-label" for="flexRadioDefault4">
                                        Extranjera
                                    </label>
                                </div>
                            </div>
                            <div class="col">
                                Estado Civil
                                <select class="form-select" aria-label="Default select example">
                                    <option>Selecciona un estado</option>
                                    <option value="1" selected>Soltero</option>
                                    <option value="2">Casado</option>

                                </select>
                            </div>
                            <div class="col">
                                ID Rust
                                <input class="form-control" type="text" value="002100092"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                <p>Lugar de Origen</p>
                                Estado
                                <select class="form-select" aria-label="Default select example">
                                    <option>Selecciona el estado </option>
                                    <option value="1" selected>CDMX</option>
                                    <option value="2">Aguascalientes</option>
                                    <option value="3">Coahuila</option>
                                </select>
                            </div>
                            <div class="col">
                                Delegación o Municipio
                                <select class="form-select" aria-label="Default select example">
                                    <option>Selecciona la Delegación o Municipio </option>
                                    <option value="1">Azcapotzalco</option>
                                    <option value="2" selected>Iztapalapa</option>
                                    <option value="3">Coyoacan</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Ingreso al Sector público
                                <input type="text" class="form-control" size="10" name="datepicker" id="datepicker2" value="01/06/2017"/>
                    <script>
                        $(document).ready(function () {
                            $("#datepicker2").datepicker({
                                format: "dd-mm-yyyy",
                               /* viewMode: "years",
                                minViewMode: "years",*/
                                autoclose: true
                            });
                        })
                    </script>
                            </div>
                            <div class="col">
                                Ingreso al Organismo
                                <input type="text" class="form-control" size="10" name="datepicker" id="datepicker3" value="01/07/2023"/>
                    <script>
                        $(document).ready(function () {
                            $("#datepicker3").datepicker({
                                format: "dd-mm-yyyy",
                               /* viewMode: "years",
                                minViewMode: "years",*/
                                autoclose: true
                            });
                        })
                    </script>
                            </div>
                            <div class="col">
                                Fecha de baja
                                <input type="text" class="form-control" size="10" name="datepicker" id="datepicker4" />
                    <script>
                        $(document).ready(function () {
                            $("#datepicker4").datepicker({
                                format: "dd-mm-yyyy",
                               /* viewMode: "years",
                                minViewMode: "years",*/
                                autoclose: true
                            });
                        })
                    </script>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button class="accordion-button collapsed acordeon-color" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Puesto
                </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="container-fluid cew-9">
                        <p>Datos del puesto</p>
                        <div class="row">
                            <div class="col">
                                Código
                                <input class="form-control" type="text" value="CF08021"
                                    aria-label="readonly input example" readonly>

                            </div>
                            <div class="col">
                                Nivel
                                <input class="form-control" type="text" value="26B3" aria-label="readonly input example"
                                    readonly>
                            </div>
                            <div class="col">
                                Tipo
                                <input class="form-control" type="text" value="Confianza"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Categoria
                                <input class="form-control" type="text" value="Coordinador"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Plaza
                                <input class="form-control" type="text" value="25830"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Descripción
                                <input class="form-control" type="text" value="Supervisor General"
                                    aria-label="readonly input example" readonly>
                            </div>

                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Grupo
                                <input class="form-control" type="text" value="Confianza"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Rama
                                <input class="form-control" type="text" value="Supervisión"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Zona Económica
                                <input class="form-control" type="text" value="II" aria-label="readonly input example"
                                    readonly>
                            </div>
                            <div class="col">
                                Rango
                                <input class="form-control" type="text" value="MÁximo"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                Sujeto a Dec. Patrimonial
                                <input class="form-control" type="text" value="No" aria-label="readonly input example"
                                    readonly>
                            </div>
                            <div class="col">
                                Radicación
                                <input class="form-control" type="text" value="972" aria-label="readonly input example"
                                    readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Unidad
                                <input class="form-control" type="text" value="1071100000"
                                    aria-label="readonly input example" readonly>

                            </div>
                            <div class="col-8">
                                <br>
                                <input class="form-control" type="text"
                                    value="Gerencia de Nomina y Análisis Presupuestal"
                                    aria-label="readonly input example" readonly>
                            </div>

                        </div>
                    </div>
                    <br>
					<hr>
                    <div class="container-fluid cew-9" style="margin-top: 30px;">
                        <div class="row">
                            <div class="col">
                                <p style="color: red;">Centro de distribución y centro de trabajo</p>
                            </div>

                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 5px;">
                        <div class="row">
                            <div class="col">
                                Centro de distribución
                                <input class="form-control" type="text" value="0900107123"
                                    aria-label="readonly input example" readonly>
                            </div>
                            <div class="col">
                                <br>
                                <input class="form-control" type="text"
                                    value="Gerencia de Nomina y Análisis Presupuestal"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>

                    <div class="container-fluid cew-9" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col">
                                Centro de trabajo
                                <input class="form-control" type="text" value="0000" aria-label="readonly input example"
                                    readonly>
                            </div>
                            <div class="col-8">
                                <br>
                                <input class="form-control" type="text" value="Sin asignación de centro"
                                    aria-label="readonly input example" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button class="accordion-button collapsed acordeon-color" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Percepciones
                </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree"
                data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <table class="table table-striped table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Cpto</th>
                                <th scope="col">Ant.</th>
                                <th scope="col">Tipo de Concepto</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">Ocurrencia</th>
                                <th scope="col">Ant. Aplicat.</th>
                                <th scope="col">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">05</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>Compesación Garantizada</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>4669.89</td>
                            </tr>
                            <tr>
                                <th scope="row">07</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>Sueldos Compactos</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>5204.88</td>
                            </tr>
							<tr>
                                <th scope="row">22</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>Ayuda de Servicios</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>402.50</td>
                            </tr>
                            <tr>
                                <th scope="row">38</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>Despensa</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>607.50</td>
                            </tr>
                            
                            <tr>
                                <th scope="row">44</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>Previsión Social Múltiple</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>422.50</td>
                            </tr>
                            <tr>
                                <th scope="row">77</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>Apoyo Desarrollo y Capacitación</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>1000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="accordion-item">
                <h2 class="accordion-header" id="headingFour">
                  <button class="accordion-button collapsed acordeon-color" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                    Deducciones
                  </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <table class="table table-striped table-hover table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">Cpto</th>
                                <th scope="col">Ant.</th>
                                <th scope="col">Tipo de Concepto</th>
                                <th scope="col">Concepto</th>
                                <th scope="col">Ocurrencia</th>
                                <th scope="col">Ant. Aplicat.</th>
                                <th scope="col">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">0A</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>SEGURO DE SALUD (ISSSTE)</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>157.65</td>
                            </tr>
                            <tr>
                                <th scope="row">0B</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>SEGURO DE SALUD PENSIONADOS Y FAMILIARES (ISSSTE)</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>35.83</td>
                            </tr>
							<tr>
                                <th scope="row">0C</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>PRESTACIONES SOCIALES Y CULTURALES (ISSSTE)</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>28.66</td>
                            </tr>
                            <tr>
                                <th scope="row">0D</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>SEGURO DE RETIRO CESANTIA Y VEJEZ (ISSSTE)</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>351.12</td>
                            </tr>
                            <tr>
                                <th scope="row">0E</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>SEGURO DE INVALIDEZ (ISSSTE)</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>35.83</td>
                            </tr>
                            <tr>
                                <th scope="row">01</th>
                                <td></td>

                                <td>Percepción Fija</td>
                                <td>IMPUESTO SOBRE PRODUCTOS DEL TRABAJO</td>
                                <td>01/03/2023</td>
                                <td></td>
                                <td>1,425.54</td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
        </div>
    </div>
    
    <div class="text-center justify-content-md-center div-separacion-md1">
        <button type="button" class="btn btn-success">Generar Reporte 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
            </svg>
        </button>
        <button type="button" class="btn btn-danger">Salir de la Consulta
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
            </svg>
        </button>
    </div>
</div>

    <!--Fin del acordeon-->

<%@ include file = "common/footer.jsp" %>