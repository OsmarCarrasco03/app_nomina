
<%@ include file="common/header-sesion.jsp"%>
<%@ include file="common/nav.jsp"%>

<div
	class="container rounded div-padding input-color div-separacion-mediana">
	<div class="text-center  ">
		<div>
			<br>
			<h3>REGISTRO Y CONSULTA DE PDF</h3>
		</div>
	</div>
</div>

<div class="container rounded div-padding input-color ">
	<div class="card h-100">
		<div class="card-header">
			M�DULO DE DOCUMENTOS
			<ul class="nav nav-tabs card-header-tabs">
				<li class="nav-item"><a class="nav-link active"
					aria-current="true" href="#formulario">REGISTRO PDF</a></li>
				<li class="nav-item"><a class="nav-link"
					href="#componenteAdicional">CONSULTAR PDF</a></li>
					
					<li class="nav-item"><a class="nav-link"
					href="#subirimagen">SUBIR IMAGEN</a></li>
			</ul>
		</div>
		<div class="card-body">

			<div id="formulario" class="section">
				<form id="pdfForm" action="/api/rfc/registro" method="POST"
					enctype="multipart/form-data">
					<div class="form-group mb-2">
						<label for="nombrePDF">Nombre del PDF</label> <input type="text"
							class="form-control" name="nombrePDF" id="nombrePDF"
							placeholder="Nombre del PDF">
					</div>
					<div class="form-group">
						<label for="documento">Seleccionar PDF</label> <input
							class="form-control" type="file" id="pdfForm" name="documento">
					</div>
					<div class="form-group">
						<label for="situacion">Situaci�n</label> <input type="text"
							class="form-control" name="situacion" id="situacion"
							placeholder="Situaci�n">
					</div>
					<div class="form-group mb-2">
						<br>
						<button type="submit" class="btn btn-primary">Subir PDF
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
							</svg>
						</button>

					</div>
				</form>
			</div>


			<div id="componenteAdicional" class="section" style="display: none;">
				<div class="form-group mb-2">
					<label for="situacionSelect">Selecciona una situaci�n:</label> <select
						id="situacionSelect" for="situacionSelect" class="form-control">
					</select>
				</div>
				<div>
					<button onclick="descargarPDF()" id="descarga" class="btn btn-primary">Descargar
						PDF
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">
							<path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
							<path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>
						</svg>
					</button>
				</div>
			</div>
			
			
			
		<div id="subirimagen" class="section" style="display: none;">
                <form id="imagenForm" action="/api/imagen/subir" method="POST" enctype="multipart/form-data">
                   <div class="form-group mb-2">
						<label for="nombrePDF">Nombre de la imagen</label> <input type="text"
							class="form-control" name="nombrePDF" id="nombrePDF"
							placeholder="Nombre del PDF">
					</div>
					<div class="form-group">
						<label for="documento">Seleccionar imagen</label> <input
							class="form-control" type="file" id="pdfForm" name="documento">
					</div>
					<div class="form-group">
						<label for="situacion">Situaci�n</label> <input type="text"
							class="form-control" name="situacion" id="situacion"
							placeholder="Situaci�n">
					</div>
					<div class="form-group mb-2">
						<br>
						<button type="submit" class="btn btn-primary">Subir PDF
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/>
							</svg>
						</button>

					</div>
                </form>
            </div>

			
		</div>
	</div>
</div>




<script src="js/pruebaspdf.js"></script>



