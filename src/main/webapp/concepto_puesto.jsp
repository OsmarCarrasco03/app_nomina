
<%@ include file="common/header-sesion.jsp"%>

<title>Conceptos Por Puesto</title>
<%@ include file="common/nav.jsp"%>


<div class="containerx rounded div-padding input-color div-separacion-mediana">
        <div class="text-center espacio-titulo ">
            <h3>Conceptos Por Puesto</h3>
        </div>

        <!-- Primera Secci�n -->
        <div class="containerx">
            <div class="row justify-content-md-center">
                <div class="col">
                    
                    <input type="text" class="form-control" id="exampleInputPassword1">
                </div>
                <div class="col">
                    <p>Fecha Inicio</p>
                    <input type="text" class="form-control" id="exampleInputPassword1">
                </div>
            </div>
        </div>

        <!-- Inicio de la lista doble -->
        <div class="containerx" style="margin-top: 20px">
            <form name="selection" method="post" onSubmit="return selectAll()">
                <div class="row justify-content-center">
                    <div class="col-md-4 text-center">
                        <select multiple size="10" id="fromx" class="custom-select">
                            <option value="1">Prestamo hipotecario fovissste salario
							minimo</option>
						<option value="2">Seguro de da�os fovissste</option>
						<option value="3">Seguro de automovil</option>
						<option value="4">Seguro de gastos mayores</option>
						<option value="5">SSL por cuenta y nombre de sps y m.m.</option>
						<option value="6">Seguro de separacion indiviualizado</option>
						<option value="7">Prima adicional de seguro de separacion
						</option>
						<option value="8">Credito fisofo, sofom</option>
						<option value="9">CREDIPRESTO, SAPI, SOFOM</option>
						<option value="10">Nomina apoyo SAPI, SOFOM</option>
                        </select>
                    </div>
                    <div class="col-md-2 text-center">
                        <div class="controls" id="botones">
                            <a href="javascript:moveSelected('fromx', 'to')"> Agregar Concepto &gt;</a>
                            <a href="javascript:moveSelected('to', 'fromx')">&lt; Quitar Concepto</a>
                            <a href="javascript:moveAll('fromx', 'to')">Agregar Todos &gt;&gt;</a>
                            <a href="javascript:moveAll('to', 'fromx')">&lt;&lt; Quitar Todos</a>
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <select multiple id="to" size="10" name="topics[]" class="custom-select"></select>
                    </div>
                </div>
            </form>
            <div class="row justify-content-center" style="margin-top: 20px">
                <div class="col">
                    <button type="button" class="btn btn-success" style="float: right">Guardar
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
                            <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
                            <path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
                          </svg>
                    </button>
                </div>
                <div class="col">
                    <button type="button" class="btn btn-warning">Editar
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Fin de la lista doble -->
    </div>



<%@ include file="common/footer.jsp"%>
