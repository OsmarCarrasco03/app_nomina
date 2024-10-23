<%@ include file="common/header.jsp"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
 <div class="bg">
	<!--<div><h2>Ambiente de pruebas (QA)</h2></div>-->
	<div class="box">
		<img src="img/logo.png" class="logo-login"> 
		<br> <br>
		<h2 class="titulo-nomina">Nómina</h2>
		<h2>Inicio de sesión</h2>
		
		<form>		
			<div class="inputBox">
				<input type="text" id="nombre" required="usaurio1">
				 <label>Nombre</label>
			</div>
			
			<div class="inputBox">
				<input type="password" id="contrasena" required="usuario">
				 <label>Contraseña</label>
			</div>
			
			<div class="inputBox">
				<div class="text-center div-separacion-md1">
					<button type="button" class="btn btn-success"
						onclick="iniciarSesion()">Iniciar sesión</button>
				</div>
			</div>			
		</form>
	</div>

</div>

<%@ include file="common/footer-index.jsp"%>