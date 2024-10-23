
<form id="myForm">
<div class="container rounded  input-color">

	<div class="col-12">
		<h5 class="modal-title"> ===CENTRO DE TRABAJO===</h5>
	</div>

	<div class="row">
		<div class="col-12">
			<label class="custom-label">Estado <span
				class="required-field"> *</span></label> <select id="estadoModal"
				class="form-select" aria-label="Default select example"></select>
		</div>
	</div>

	<div class="col-12">
		<label class="custom-label">Municipio <span
			class="required-field"> *</span></label> <select id="municipioModal"
			class="form-select" aria-label="Default select example"></select>
	</div>

	<div class="col-12">
		<label class="custom-label">Centro de trabajo<span
			class="required-field"> *</span></label> <select id="opcionesModal"
			class="form-select" aria-label="Default select example"
			onchange="crearSessionStorage()"></select>
	</div>

	<div id="alertaOpciones" style="color: red; display: none;">NO
		HAY OPCIONES DISPONIBLES PARA EL CAMPO CENTRO DE TRABAJO</div>

	<div class="text-center">
<hr>
	   <div class="color-hr">
			<h6>DATOS DE CENTRO DE TRABAJO</h6>
	   </div>
   </div>
<hr>
</div>

<div class="container rounded div-padding input-color">


	<div class="row">
		<div class="col-12" id="checkboxContainer">
			<label class="custom-label" class="required-field">Calle<span
				class="required-field"> *</span></label> <input class="form-control"
				type="text" id="calleModal" disabled>
		</div>
		<div class="col-12" id="checkboxContainer">
			<label class="custom-label" class="required-field">Colonia<span
				class="required-field"> *</span></label> <input class="form-control"
				type="text" id="coloniaModal" disabled>
		</div>
		<div class="row">
			<div class="col-4" id="checkboxContainer">
				<label class="custom-label" class="required-field">Localidad<span
					class="required-field"> *</span></label> <input class="form-control"
					type="text" id="localidadModal" disabled>
			</div>



			<div class="col-4" id="checkboxContainer">
				<label class="custom-label" class="required-field">No.
					exterior<span class="required-field"> *</span>
				</label> <input class="form-control" type="text" id="exteriorModal" disabled>
			</div>
			<div class="col-4" id="checkboxContainer">
				<label class="custom-label" class="required-field">No.
					interior<span class="required-field"> *</span>
				</label> <input class="form-control" type="text" id="interiorModal" disabled>
			</div>
		</div>
		
		
		
		<div class="row">
			
			<div class="col-6" id="checkboxContainer">
				<label class="custom-label" class="required-field">Entre
					calle uno<span class="required-field"> *</span>
				</label> <input class="form-control" type="text" id="calleunoModal" disabled>
			</div>
			<div class="col-6" id="checkboxContainer">
				<label class="custom-label" class="required-field">Entre
					calle dos<span class="required-field"> *</span>
				</label> <input class="form-control" type="text" id="calledosModal" disabled>
			</div>

		</div>

<hr>

	</div>


</div>
<div class="">




	<div class="col-6" id="checkboxContainer">
		<label class="custom-label" class="required-field"><span
			class="required-field"> </span></label> <input class="form-control"
			type="text" id="idModal" disabled hidden>
	</div>


	<input type="hidden" id="hiddenValueInput" name="hiddenValue">

</div>

</form>
<script src="js/modal_ctratrabajo.js"></script>