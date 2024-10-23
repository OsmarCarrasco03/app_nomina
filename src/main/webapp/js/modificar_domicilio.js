
// INICIO funcion para ocultar los datos de control
$(function() {
	MostrarPagina(47);
	if (sessionStorage.permisos == 1) {
		$("#datosControlSeccion").prop("hidden", false);

	}
});
// FIN funcion para ocultar los datos de control

// INICIO variables globales
let idPersona = null;
let idEstado = null;
let idMunicipio = null;
let idUsuCapturo = null;
let nombre = null;
let curp = null;
let datosIniciales = null;
// FIN variables globales

// INICIO funcion para llamar a la API persona
async function autocompletarPersona() {
	const request = await fetch('api/personas/id/curp/nombre/apellidos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const data = await request.json();

	const combinedValues = data.map(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}`);

	const idMap = {};
	data.forEach(item => {
		const combinedValue = `${item[1]} - ${item[3]} ${item[4]} ${item[2]}`;
		idMap[combinedValue] = item[0];
	});

	return { combinedValues, idMap, data };
}
// FIN funcion para llamar a la API persona

// INICIO funcion para busacar una persona por su CURP o Nombre en el inpBuscar
async function iniciarAutoComplete() {
	const { combinedValues, idMap, data } = await autocompletarPersona();
	const autoCompleteInput = document.getElementById('inpBuscar');

	const autoCompleteJS = new autoComplete({
		selector: "#inpBuscar",
		placeHolder: "Buscar por CURP o Nombre(s)...",
		data: {
			src: combinedValues,
			cache: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				query: (query, autoCompleteJS) => {
					if (query.length >= 3) {
						autoCompleteJS.start();
					} else {
						autoCompleteJS.stop();
					}
				},
				selection: (event) => {
					const selection = event.detail.selection.value;
					autoCompleteInput.value = selection;
					const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
					curp = selectedPerson[1];
					nombre = `${selectedPerson[3]} ${selectedPerson[4]} ${selectedPerson[2]}`;
					idPersona = idMap[selection];
				}
			}
		}
	});
}
iniciarAutoComplete();
// FIN funcion para busacar una persona por su CURP o Nombre en el inpBuscar

// INICIO llenar los datos de control
function datosControl() {
	$("#inpUsuarioModifico").val(sessionStorage.nombre);

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#inpFechaModificacion").val(fechaHoy);
	var inputSituacion = document.getElementById('inpSituacion');
	inputSituacion.value = "ACTIVO";
}
// FIN llenar los datos de control

// INICIO funcion para llenar los inputs
async function fillDompersona() {
	const request = await fetch('api/dompersona/traer/all/datos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const data = await request.json();

	const datosFiltrados = data.filter(item => item[0] === idPersona);
	const datosDompersona = datosFiltrados.length > 0 ? datosFiltrados[0] : null;

	if (datosDompersona === null) {
		swal({
			title: "No hay datos disponibles",
			text: "No se encontraron datos para mostrar",
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	}

	limpiarInputs();
	desbloquearInputs();
	datosControl();

	idEstado = datosDompersona[1];
	idMunicipio = datosDompersona[2];
	idUsuCapturo = datosDompersona[11];

	const estadoSelect = $('#inpEstado');
	const municipioSelect = $('#inpMunicipio');

	estadoSelect.empty();
	municipioSelect.empty();

	const estadoRequest = await fetch('api/estado/id/nombre');
	const estadoData = await estadoRequest.json();
	estadoData.forEach(item => {
		estadoSelect.append(`<option value="${item[0]}">${item[1]}</option>`);
	});
	estadoSelect.val(datosDompersona[1]);


	estadoSelect.on('change', async function() {
		idEstado = $(this).val();
		await filtrarMunicipiosPorEstado(idEstado);
	});

	const municipioRequest = await fetch('api/municipio/numero/edopadre/nombre');
	const municipioData = await municipioRequest.json();
	const municipioFilterEstado = municipioData.filter(item => item[1] === datosDompersona[1]);
	municipioFilterEstado.forEach(item => {
		municipioSelect.append(`<option value="${item[0]}">${item[2]}</option>`);
	});
	municipioSelect.val(datosDompersona[2]);

	municipioSelect.on('change', async function() {
		idMunicipio = $(this).val();
	});

	let codigoPostal = datosDompersona[4];
	let situacion = datosDompersona[14];

	if (/^\d{4}$/.test(codigoPostal)) {
		codigoPostal = "0" + codigoPostal;
	}

	if (situacion === 1) {
		situacion = "ACTIVO";
	} else if (situacion === 2) {
		situacion = "BAJA";
	}

	document.getElementById('inpCurp').value = curp;
	document.getElementById('inpNombre').value = nombre;
	document.getElementById('inpColonia').value = datosDompersona[3];
	document.getElementById('inpCodigoPostal').value = codigoPostal;
	document.getElementById('inpCalle').value = datosDompersona[5];
	document.getElementById('inpNumeroExterior').value = datosDompersona[6];
	document.getElementById('inpNumeroInterior').value = datosDompersona[7];
	document.getElementById('inpTelefono').value = datosDompersona[8];
	document.getElementById('inpFechaInicio').value = datosDompersona[9];
	document.getElementById('inpFechaTermino').value = datosDompersona[10];
	document.getElementById('inpUsuarioCapturo').value = datosDompersona[15];
}
// FIN funcion para llenar los inputs

// INICIO funcion para filtrar municipios por el estado
async function filtrarMunicipiosPorEstado(idEstado) {
	idEstadoEntero = parseInt(idEstado);
	const requestMunicipios = await fetch('api/municipio/numero/edopadre/nombre', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const response = await requestMunicipios.json();

	const municipios = response.filter(item => item[1] === idEstadoEntero);

	const municipioSelect = $('#inpMunicipio');
	municipios.forEach(item => {
		municipioSelect.append(`<option value="${item[0]}">${item[2]}</option>`);
	});
}
// FIN funcion para filtrar municipios por el estado

// INICIO funcion para agregar el placeholder en estado y agregar input-invalid en municipio
async function verificarEstado() {

	let estadoSelect = $('#inpEstado');
	let municipioSelect = $('#inpMunicipio');
	let estadoInput = estadoSelect.val();

	if (estadoInput !== "#inpEstado") {

		municipioSelect.addClass('input-invalid');
		municipioSelect.empty().append('<option value="" disabled selected>Selecciona una opción</option>');

	}
}
// FIN funcion para agregar el placeholder y agregar input-invalid

// INICIO funcion para remover el input-invalid de municipio
async function verificarMunicipio() {

	let municipioSelect = $('#inpMunicipio');
	let municipioInput = municipioSelect.val();

	if (municipioInput !== "#inpMunicipio") {

		municipioSelect.removeClass('input-invalid');

	}
}
// FIN funcion para remover el input-invalid de municipio

// INICIO funcion para obtener los datos para luego comprarlos
function obtenerDatos() {
	let inpColonia = document.getElementById("inpColonia").value;
	let inpCodigoPostal = document.getElementById("inpCodigoPostal").value;
	let inpCalle = document.getElementById("inpCalle").value;
	let inpNumeroExterior = document.getElementById("inpNumeroExterior").value;
	let inpNumeroInterior = document.getElementById("inpNumeroInterior").value;
	let inpTelefono = document.getElementById("inpTelefono").value;

	return {
		domp_idpersona: idPersona,
		domp_estado: idEstado,
		domp_municipio: idMunicipio,
		domp_colonia: inpColonia,
		domp_codpostal: inpCodigoPostal,
		domp_calle: inpCalle,
		domp_numext: inpNumeroExterior,
		domp_numint: inpNumeroInterior,
		domp_telparticular: inpTelefono
	};
}
// FIN funcion para obtener los datos para luego comprarlos

// INICIO funcion para guardar los datos iniciales
function guardarDatosIniciales() {
	datosIniciales = JSON.stringify(obtenerDatos());
}
// FIN funcion para guardar los datos iniciales

// INICIO funcion para comprar los Datos inciales y finales
function compararDatos() {
	let datosFinales = JSON.stringify(obtenerDatos());

	if (datosIniciales === datosFinales) {

		swal({
			title: 'ADVERTENCIA',
			text: 'No se ha realizado ningún cambio.',
			icon: 'warning',
			dangerMode: true
		})
			.then((willDelete) => {
				if (willDelete) {
				}
			});
		return;
	} else {
		guardarConfiguracion();
	}
}
// FIN funcion para comprar los Datos inciales y finales

// INICIO funcion para limpiar
function limpiarInputs() {

	const inputId = ['inpBuscar', 'inpCurp', 'inpNombre', 'inpEstado', 'inpMunicipio', 'inpMunicipio', 'inpColonia', 'inpCodigoPostal', 'inpCalle', 'inpNumeroExterior', 'inpNumeroInterior', 'inpTelefono'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}
	});
}
// FIN funcion para limpiar

// INICIO bloquear y agregr input-valid a los inputs
function desbloquearInputs() {

	const inputId = ['inpBuscar', 'inpEstado', 'inpMunicipio', 'inpMunicipio', 'inpColonia', 'inpCodigoPostal', 'inpCalle', 'inpNumeroExterior', 'inpNumeroInterior', 'inpTelefono'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

		$('#btnGuardarCambios').prop('disabled', false);
		$('#btnCancelar').prop('disabled', false);

		$('#btnBuscar').prop('disabled', true);
		$('#inpBuscar').prop('disabled', true);
		inputElement.classList.add('input-valid');
		inputElement.disabled = false;

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}

		setTimeout(() => {
			inputElement.classList.remove('input-valid');
		}, 1000);
	});
}
// FIN bloquear y agregr input-valid a los inputs

// INICIO funcion del boton guardar
btnBuscar.addEventListener('click', async function() {

	await fillDompersona();
	guardarDatosIniciales();

});
// FIN funcion del boton guardar

// INICIO validacion de solo numeros
function validarCodigoPostal(input) {
	var valor = input.value.trim();
	var soloNumeros = valor.replace(/\D/g, '');

	clearTimeout(input.tooltipTimeout);
	input.tooltipTimeout = setTimeout(function() {
		$(input).tooltip('dispose');
	}, 1500);

	// Ocultar tooltips existentes
	$(input).tooltip('dispose');

	if (valor !== soloNumeros) {
		$(input).tooltip({
			title: 'Solo se aceptan números',
			placement: 'top',
			trigger: 'manual',
			delay: { show: 500, hide: 200 },
			container: 'body',
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
		}).tooltip('show');
	}

	if (valor.length >= 5) {
		soloNumeros = soloNumeros.substring(0, 5);

		if (valor.length > 5) {
			$(input).tooltip({
				title: 'Son máximo 5 números',
				placement: 'top',
				trigger: 'manual',
				delay: { show: 500, hide: 200 },
				container: 'body',
				template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
			}).tooltip('show');
		}
	}
	input.value = soloNumeros;
}

function validarTelefono(input) {
	var valor = input.value.trim();
	var soloNumeros = valor.replace(/\D/g, '');

	clearTimeout(input.tooltipTimeout);
	input.tooltipTimeout = setTimeout(function() {
		$(input).tooltip('dispose');
	}, 1500);

	// Ocultar tooltips existentes
	$(input).tooltip('dispose');

	if (valor !== soloNumeros) {
		$(input).tooltip({
			title: 'Solo se aceptan números',
			placement: 'top',
			trigger: 'manual',
			delay: { show: 500, hide: 200 },
			container: 'body',
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
		}).tooltip('show');
	}

	if (valor.length >= 10) {
		soloNumeros = soloNumeros.substring(0, 10);

		if (valor.length > 10) {
			$(input).tooltip({
				title: 'Son máximo 10 números',
				placement: 'top',
				trigger: 'manual',
				delay: { show: 500, hide: 200 },
				container: 'body',
				template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
			}).tooltip('show');
		}
	}
	input.value = soloNumeros;
}
// FIN validacion de solo numeros

// INICIO convertir en mayusculas todas las letras
const idInputsUpperCase = [
	"inpColonia",
	"inpCalle",
	"inpNumeroExterior",
	"inpNumeroInterior"
];

for (const inputId of idInputsUpperCase) {
	const input = document.getElementById(inputId);
	input.addEventListener("input", function() {
		input.value = input.value.toUpperCase();
	});
}
// FIN convertir en mayusculas todas las letras

// INICIO funcion para eliminar los input-invalid de los input y selects
const idInputsInvalid = [
	"inpEstado",
	"inpMunicipio",
	"inpColonia",
	"inpCodigoPostal",
	"inpCalle",
	"inpTelefono"
];

for (const inputsId of idInputsInvalid) {
	const input = document.getElementById(inputsId);
	input.addEventListener("input", function() {
		input.classList.remove('input-invalid');
	});
}
// FIN funcion para eliminar los input-invalid de los input y selects

// INICIO funcion para guardar y conexion de API para subir a BD
function guardarConfiguracion() {

	const arrayInputs = [
		{ id: "inpEstado", mensage: "Por favor, ingrese un estado." },
		{ id: "inpMunicipio", mensage: "Por favor, ingrese un municipio." },
		{ id: "inpColonia", mensage: "Por favor, ingrese una colonia." },
		{ id: "inpCodigoPostal", mensage: "Por favor, ingrese un código postal." },
		{ id: "inpCalle", mensage: "Por favor, ingrese una calle." },
		{ id: "inpTelefono", mensage: "Por favor, ingrese un número de teléfono." }
	];

	for (const inputsId of arrayInputs) {

		const input = document.getElementById(inputsId.id);
		const value = input.value;

		if (value === '') {

			input.classList.add('input-invalid');

			swal({

				title: inputsId.mensage,
				icon: 'error',
				button: 'Aceptar'

			});

			return;

		}
	}

	const inputCodigoPostal = document.getElementById("inpCodigoPostal");
	const inputTelefono = document.getElementById("inpTelefono");

	if (inputCodigoPostal.value.length !== 5) {
		inputCodigoPostal.classList.add('input-invalid');

		swal({
			title: "Código postal invalido",
			icon: 'error',
			button: 'Aceptar'
		});

		return;
	}

	if (inputTelefono.value.length !== 10) {
		inputTelefono.classList.add('input-invalid');

		swal({
			title: "Número de telefono invalido",
			icon: 'error',
			button: 'Aceptar'
		});

		return;

	}

	let inpColonia = document.getElementById("inpColonia").value;
	let inpCodigoPostal = document.getElementById("inpCodigoPostal").value;
	let inpCalle = document.getElementById("inpCalle").value;
	let inpNumeroExterior = document.getElementById("inpNumeroExterior").value;
	let inpNumeroInterior = document.getElementById("inpNumeroInterior").value;
	let inpTelefono = document.getElementById("inpTelefono").value;

	let inpFechaInicio = document.getElementById("inpFechaInicio").value;
	let inpFechaTermino = document.getElementById("inpFechaTermino").value;
	let inpUsuarioCapturo = idUsuCapturo;
	let inpFechaModificacion = document.getElementById("inpFechaModificacion").value;
	let inpUsuarioModifico = sessionStorage.idUsuario;
	let inpSituacion = "1";

	let data = {
		domp_idpersona: idPersona,
		domp_estado: idEstado,
		domp_municipio: idMunicipio,
		domp_colonia: inpColonia,
		domp_codpostal: inpCodigoPostal,
		domp_calle: inpCalle,
		domp_numext: inpNumeroExterior,
		domp_numint: inpNumeroInterior,
		domp_telparticular: inpTelefono,
		domp_fechainicio: inpFechaInicio,
		domp_fechatermino: inpFechaTermino,
		domp_usucapturo: inpUsuarioCapturo,
		domp_fechamod: inpFechaModificacion,
		domp_usumodifico: inpUsuarioModifico,
		domp_situacion: inpSituacion
	};

	let datosJson = JSON.stringify(data);

	let url = "api/domicilio/subir/datos/modificar";

	// Opciones para la solicitud fetch
	let options = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	};

	// Realizar la solicitud fetch
	fetch(url, options)
		.then(response => {
			if (response.ok) {
				return response.text();
			} else {
				throw new Error('Error al realizar la solicitud');
			}
		})
		.then(data => {
			if (data.includes("Advertencia:")) {
				return swal({
					title: "Advertencia",
					text: data,
					icon: "warning",
					button: "Aceptar"
				});
			} else {
				return swal({
					title: "El registro fue exitoso",
					text: "Buen trabajo !!",
					icon: "success",
					button: "Aceptar"
				});
			}
		})
		.then(() => {
			location.reload();
		})
		.catch(error => {
			console.error('Error:', error);
			swal("Oops!", "¡Algo salió mal!", "error");
		});
}
// FIN funcion para guardar y conexion de API para subir a BD

// INICIO funcion para el boton cancelar
function cancelar() {
    location.reload();
}
// FIN funcion para el boton cancelar

// INICIO funcion del boton guardar
btnGuardarCambios.addEventListener('click', function() {

	compararDatos();

});
// FIN funcion del boton guardar
