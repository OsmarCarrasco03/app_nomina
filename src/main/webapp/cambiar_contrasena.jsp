<%@ include file="common/header-sesion.jsp"%>
<title>Cambiar Contrasena</title>
<link rel='stylesheet' href='css/cambiar_contrasena.css'>
<%@ include file = "common/nav-cambiar-contrasena.jsp" %>

<div
	class="container rounded div-padding input-color div-separacion-mediana div-separacion-debajo">
	<div class="text-center espacio-titulo ">

		<div>
			<h3>Cambiar Contraseña</h3>
		</div>

		<!-- Primera Secciï¿½n -->
		<div class="container text-center formulario_contrasena">
			<form id="formulario">
				<br>

				<div class="row justify-content-md-center">
					
					<p class="text-start espacio-inputs"><b>Nueva contraseña</b>
					<span class="red-asterisk">*</span></p>
					
					<div class="input-group mb-3">
						
						<input type="password" class="form-control"
							aria-label="Recipient's username"
							aria-describedby="button-addon2" 
							id="nueva_contrasena">
						
						<button class="btn btn-outline-secondary" type="button"
							id="button-addon2" 
							onclick="VisualizarContrasena('nueva_contrasena', 'img-eye1', 'img-eyeslash1')" >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="img-eye1" 
								fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
							  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
							  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" id="img-eyeslash1" hidden 
								height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
							  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
							  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
							</svg>
							<!-- <img alt="Ojo" src="bootstrap-icons/eye.svg" id="img-eye1"/> -->
							<!-- <img alt="Ojo" src="bootstrap-icons/eye-slash.svg" 
							id="img-eyeslash1" hidden/> -->
						</button>
					</div>
				</div>

				<div class="row justify-content-md-center">
					
					<p class="text-start espacio-inputs"><b>Confirmar nueva contraseña</b>
					<span class="red-asterisk">*</span></p>
					
					<div class="input-group mb-3">
					
						<input type="password" class="form-control"
							aria-label="Recipient's username"
							aria-describedby="button-addon2"
							id="confirmar_contrasena">
							
						<button class="btn btn-outline-secondary" type="button"
							id="button-addon2" 
							onclick="VisualizarContrasena('confirmar_contrasena', 'img-eye2', 'img-eyeslash2')" >
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="img-eye2" 
								fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
							  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
							  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" id="img-eyeslash2" hidden
								height="16" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
							  <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
							  <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
							</svg>
							<!-- <img alt="Ojo" src="bootstrap-icons/eye.svg" id="img-eye2"/>
							<img alt="Ojo" src="bootstrap-icons/eye-slash.svg" 
							id="img-eyeslash2" hidden/> -->
						</button>
						
					</div>
				</div>
			</form>
		</div>

		<div class="text-center justify-content-md-center div-separacion-md1">
			<button type="button" class="btn btn-success" id="botonRegistrar"
				onclick="CambiarContrasena()"> Cambiar Contraseña 
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-floppy-fill" viewBox="0 0 16 16">
					<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0H3v5.5A1.5 1.5 0 0 0 4.5 7h7A1.5 1.5 0 0 0 13 5.5V0h.086a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5H14v-5.5A1.5 1.5 0 0 0 12.5 9h-9A1.5 1.5 0 0 0 2 10.5V16h-.5A1.5 1.5 0 0 1 0 14.5z"/>
					<path d="M3 16h10v-5.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5zm9-16H4v5.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5zM9 1h2v4H9z"/>
				</svg>
			</button>
		</div>
	</div>
</div>

<script src="js/cambiar_contrasena.js"></script>
<%@ include file = "common/footer-index.jsp" %>
