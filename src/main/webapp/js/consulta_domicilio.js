
// INICIO funcion para ocultar los datos de control
$(function() {
	MostrarPagina(46);
	if (sessionStorage.permisos == 1) {
		$("#datosControlSeccion").prop("hidden", false);

	}
});
// FIN funcion para ocultar los datos de control

// INICIO variables globales
let idPersona = null;
let nombre = null;
let curp = null;
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

	const estadoRequest = await fetch('api/estado/id/nombre');
	const estadoData = await estadoRequest.json();
	const estadoFilter = estadoData.filter(item => item[0] === datosDompersona[1]);
	const estadoNombre = estadoFilter[0][1];

	const municipioRequest = await fetch('api/municipio/numero/edopadre/nombre');
	const municipioData = await municipioRequest.json();
	const municipioFilterEstado = municipioData.filter(item => item[1] === datosDompersona[1]);
	const municipioFilter = municipioFilterEstado.filter(item => item[0] === datosDompersona[2]);
	const municipioNombre = municipioFilter[0][2];

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
	document.getElementById('inpEstado').value = estadoNombre;
	document.getElementById('inpMunicipio').value = municipioNombre;
	document.getElementById('inpColonia').value = datosDompersona[3];
	document.getElementById('inpCodigoPostal').value = codigoPostal;
	document.getElementById('inpCalle').value = datosDompersona[5];
	document.getElementById('inpNumeroExterior').value = datosDompersona[6];
	document.getElementById('inpNumeroInterior').value = datosDompersona[7];
	document.getElementById('inpTelefono').value = datosDompersona[8];
	document.getElementById('inpFechaInicio').value = datosDompersona[9];
	document.getElementById('inpFechaTermino').value = datosDompersona[10];
	document.getElementById('inpUsuarioCapturo').value = datosDompersona[15];
	document.getElementById('inpFechaModificacion').value = datosDompersona[12];
	document.getElementById('inpUsuarioModifico').value = datosDompersona[16];
	document.getElementById('inpSituacion').value = situacion;

}
// FIN funcion para llenar los inputs

// INICIO funcion para limpiar
function limpiarInputs() {

	const inputId = ['inpBuscar', 'inpCurp', 'inpNombre', 'inpEstado', 'inpMunicipio', 'inpColonia', 'inpCodigoPostal', 'inpCalle', 'inpNumeroExterior', 'inpNumeroInterior', 'inpTelefono'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}
	});
}
// FIN funcion para limpiar

// INICIO funcion del boton guardar
btnBuscar.addEventListener('click', function() {

	limpiarInputs();
	fillDompersona();

});
// FIN funcion del boton guardar


