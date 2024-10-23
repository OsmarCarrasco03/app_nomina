<title>Alta de nuevo nivel</title>
<%@ include file="common/header-sesion.jsp" %>
	<%@ include file="common/nav.jsp" %>
		<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
		|	<div class="container rounded div-padding input-color div-separacion-mediana">

				<div class="row" class="col-6">
					<div class="text-center espacio-titulo">
						
							<h3>ALTA DE NUEVO NIVEL</h3>
							<br>
						
					</div>
				</div>


						 <div class="container text-center"> <!-- Agregamos la clase text-center para centrar el contenido -->
							<div class="rounded div-padding input-color">
								<div class="row">
									<div class="col-md-4">
										<b>Nivel</b>
										<label class="custom-label required-field" for="nivel"></label>
										<input type="text" class="form-control" id="inpNivel" name="nivel" aria-label="nivel" oninput="convertirMayusculas()" onkeypress="return" onchange="validarInput(this)">
										<div id="mensajeEscribiendo" style="display: none;" onclick="limpiarCampos()">Este dato es unívoco y de caracteres alfanuméricos.</div>
									</div>

									<div class="col-md-4">
										<b>Zona</b>
										<label class="custom-label required-field" for="descripcion"></label>
										<select type="text" class="form-select" id="inpZona" name="descripcion" aria-label="descripcion"></select>
									</div>
									<div class="col-md-4">
										<b>Situación</b>
										<label class="custom-label required-field" for="situacion"></label>
										<input type="text" class="form-control" id="idSituacion" value = "ACTIVO" disabled name="situacion" aria-label="situacion">
									</div>
								</div>
							</div>
						</div>

						<script>
							function convertirMayusculas() {
								var input = document.getElementById("inpNivel");
								input.value = input.value.toUpperCase();
							}
						</script>



				<%@ include file="datos_control.jsp"%>
				
				

					<div class="text-center"><br><br><br><button type="button" class="btn btn-danger" id="limpiarPuesto"  onclick="limpiarCampos()"
						 >Limpiar
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser-fill" viewBox="0 0 16 16">
								   <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z"/>
							   </svg>	
						</button>

						<button type="button" class="btn btn-success" id="registrarPuestoS"
								 >Registrar
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
									<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
									<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
								</svg>
						</button>

					</div>

					<div class="text-center">

				</div>

				

			</div>



				<script src="js/alta_Nivel.js"></script>

<script src="js/alta_nivel.js"></script>


<%@ include file="common/footer.jsp" %>
