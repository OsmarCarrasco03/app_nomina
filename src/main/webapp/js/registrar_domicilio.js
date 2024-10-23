// INICIO variables globales
let idPersona = null;
let idEstado = null;
let idMunicipio = null;
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
	const curpInput = document.getElementById('inpCurp');
	const nombreInput = document.getElementById('inpNombre');

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
					autoCompleteInput.value = '';
					const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
					curpInput.value = selectedPerson[1];
					nombreInput.value = `${selectedPerson[3]} ${selectedPerson[4]} ${selectedPerson[2]}`;
					idPersona = idMap[selection];
					nuevaBusqueda();
				}
			}
		}
	});
}
iniciarAutoComplete();
// FIN funcion para busacar una persona por su CURP o Nombre en el inpBuscar

// INICIO llenar los datos de control
function datosControl() {
	$("#inpUsuarioCapturo").val(sessionStorage.nombre);
	$("#inpUsuarioModifico").val(sessionStorage.nombre);

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#inpFechaModificacion").val(fechaHoy);

	$("#inpFechaInicio").val(fechaHoy);
	var inputSituacion = document.getElementById('inpSituacion');
	inputSituacion.value = "ACTIVO";
}
// FIN llenar los datos de control

// INICIO funcion para llenar el input inpEstado
async function cargarEstados() {

	const requestEstados = await fetch('api/estado/id/nombre', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const estados = await requestEstados.json();

	const nombresEstados = estados.map(item => item[1]);
	const idsEstados = estados.map(item => item[0]);

	const inpEstado = document.getElementById('inpEstado');

	$('#inpEstado').empty();
	const optionDefault = document.createElement('option');
	optionDefault.value = '';
	optionDefault.text = 'Selecciona una opción';
	optionDefault.disabled = true;
	optionDefault.selected = true;
	inpEstado.add(optionDefault);

	nombresEstados.forEach((nombre, index) => {
		const option = document.createElement('option');
		option.value = nombre;
		option.text = nombre;
		option.dataset.estadoId = idsEstados[index];
		inpEstado.add(option);
	});

	inpEstado.addEventListener('change', guardarIdEstado);

}
// FIN funcion para llenar el input inpEstado

// INICIO funcion para filtrar y llenar el inpMunicipio
async function cargarMunicipios() {

	const requestMunicipios = await fetch('api/municipio/numero/edopadre/nombre', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const municipios = await requestMunicipios.json();

	const inpMunicipio = document.getElementById('inpMunicipio');

	$('#inpMunicipio').empty();
	const optionDefault = document.createElement('option');
	optionDefault.value = '';
	optionDefault.text = 'Selecciona una opción';
	optionDefault.disabled = true;
	optionDefault.selected = true;
	inpMunicipio.add(optionDefault);

	let idEstados = parseInt(idEstado);

	const municipiosFiltrados = municipios.filter(item => item[1] === idEstados);

	municipiosFiltrados.forEach(municipio => {
		const option = document.createElement('option');
		option.value = municipio[0];
		option.text = municipio[2];
		option.dataset.municipioId = municipio[0];
		inpMunicipio.add(option);
	});

	inpMunicipio.addEventListener('change', guardarIdMunicipio);

}
// FIN funcion para filtrar y llenar el inpMunicipio

// Llama a la función cargarMunicipios cuando cambie el estado seleccionado
document.getElementById('inpEstado').addEventListener('change', cargarMunicipios);

// INICIO guardar el id del estado y desbloquear el inpMunicipio
function guardarIdEstado() {

	const inpEstado = document.getElementById('inpEstado');
	const inpMunicipio = document.getElementById('inpMunicipio');
	const selectedOption = inpEstado.options[inpEstado.selectedIndex];

	idEstado = selectedOption.dataset.estadoId;

	inpMunicipio.classList.add('input-valid');
	$('#inpMunicipio').prop('disabled', false);

	setTimeout(() => {
		inpMunicipio.classList.remove('input-valid');
	}, 1000);
}
// FIN guardar el id del estado y desbloquear el inpMunicipio

// INICIO guardar el id del municipio
function guardarIdMunicipio() {

	const inpMunicipio = document.getElementById('inpMunicipio');
	const selectedOption = inpMunicipio.options[inpMunicipio.selectedIndex];

	idMunicipio = selectedOption.dataset.municipioId;

}
// FIN guardar el id del municipio

// INICIO bloquear y agregr input-valid a los inputs
function desbloquearInputs() {

	const inputIds = ['btnSubirCambios', 'inpEstado', 'inpColonia', 'inpCodigoPostal', 'inpCalle', 'inpNumeroExterior', 'inpNumeroInterior', 'inpTelefono'];
	const inputIdValid = ['inpCurp', 'inpNombre', 'inpEstado', 'inpColonia', 'inpCodigoPostal', 'inpCalle', 'inpNumeroExterior', 'inpNumeroInterior', 'inpTelefono'];

	const placeholders = {
		inpColonia: "Ingrese la colonia",
		inpCodigoPostal: "Ingrese el código postal",
		inpCalle: "Ingrese la calle",
		inpNumeroExterior: "Ingrese el número exterior",
		inpNumeroInterior: "Ingrese el número interior",
		inpTelefono: "Ingrese sus datos"
	};

	inputIds.forEach(id => {
		const inputElement = document.getElementById(id);

		inputIdValid.forEach(id => {
			const inputElementValid = document.getElementById(id);


			$('#inpMunicipio').empty();
			$('#inpMunicipio').prop('disabled', true);
			inputElement.placeholder = placeholders[id];
			inputElementValid.classList.add('input-valid');
			inputElement.disabled = false;

			if (inputElement.tagName.toLowerCase() === 'input') {
				inputElement.value = '';
			}

			setTimeout(() => {
				inputElementValid.classList.remove('input-valid');
			}, 1000);
		});
	});
}
// FIN bloquear y agregr input-valid a los inputs

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

// INICIO funcion que laza un swal si tenemos campos llenos y pregunta si desea continuar
function nuevaBusqueda() {

	const arrayInputs = [
		{ id: "inpEstado" },
		{ id: "inpColonia" },
		{ id: "inpMunicipio" },
		{ id: "inpCodigoPostal" },
		{ id: "inpCalle" },
		{ id: "inpNumeroExterior" },
		{ id: "inpNumeroInterior" },
		{ id: "inpTelefono" }
	];

	for (const inputsId of arrayInputs) {

		const input = document.getElementById(inputsId.id);
		const value = input.value;

		if (value !== '') {

			swal({
				title: '¿Estás seguro?',
				text: 'Se borrarán los cambios hechos',
				icon: 'warning',
				buttons: true,
				dangerMode: true
			})
				.then((willDelete) => {
					if (willDelete) {

						cargarEstados();
						desbloquearInputs();
						datosControl();

					}
				});
			return;
		}
	}
	cargarEstados();
	desbloquearInputs();
	datosControl();
}
// FIN funcion que laza un swal si tenemos campos llenos y pregunta si desea continuar

// INICIO funcion para validar y guardar los inputs
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
	//	let inpFechaTermino = document.getElementById("inpFechaTermino").value;
	let inpUsuarioCapturo = sessionStorage.idUsuario;
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
		//		domp_fechatermino: inpFechaTermino,
		domp_usucapturo: inpUsuarioCapturo,
		domp_fechamod: inpFechaModificacion,
		domp_usumodifico: inpUsuarioModifico,
		domp_situacion: inpSituacion
	};

	let domicilioDatosJson = JSON.stringify(data);

	let url = "api/subir/datos/domicilio";

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
			swal("Oops!", "Something went wrong!", "error");
		});

}
// FIN funcion para validar y guardar los inputs

// INICIO funcion del boton guardar
btnSubirCambios.addEventListener('click', function() {

	guardarConfiguracion();

});
// FIN funcion del boton guardar