$(function() {
	MostrarPagina(27);
	if (sessionStorage.permisos == 1) {
		$("#datosPersona-tab").prop("hidden", false);

	}
});

// INICIO variables globales
let numPersona = null;
let idPlaza = null;
let idPersona = null;
let nombre;
let apellido_pat;
let apellido_mat;
let curp;
let numEmpleado;
let nivelPagado;
// FIN variables globales




// ================================================================================
// 					CODIGO PARA LA API DE CONSULTAR PLAZA POR PERSONA
// ================================================================================


function obtenerInfoPlaza(idPlaza) {
	const url1 = `api/snplazapersona/idplaza/${idPlaza}`;

    // Para POST, se necesita especificar el método y, si es necesario, el cuerpo de la solicitud
    const promesaUrl1 = fetch(url1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idPlaza }) // Puede incluir datos adicionales en el cuerpo de la solicitud
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de respuesta ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        return Promise.resolve({ error: `Error al obtener datos de la API url1: ${error}` });
    });

	Promise.all([promesaUrl1])
		.then(resultados => {

			if (resultados[0].error) {
				swal({
					title: "El número de persona no existe",//""resultados[0].error,
					icon: 'error',
					button: 'Aceptar'
				});

			} else {

				const datosApiPersona = resultados[0];
				llenarTodosLosCampos(datosApiPersona);
			}
		})
		.catch(error => {
			// Manejar errores generales
			console.error('Error al obtener datos de las APIs:', error);
		});
		console.log("datos por id persona", promesaUrl1);
}






function obtenerInfoPersona(idPersona) {
	const url1 = `api/snplazapersona/idpersona/${idPersona}`;

    // Para POST, se necesita especificar el método y, si es necesario, el cuerpo de la solicitud
    const promesaUrl1 = fetch(url1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idPersona }) // Puede incluir datos adicionales en el cuerpo de la solicitud
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error de respuesta ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        return Promise.resolve({ error: `Error al obtener datos de la API url1: ${error}` });
    });

	Promise.all([promesaUrl1])
		.then(resultados => {

			if (resultados[0].error) {
				swal({
					title: "El número de persona no existe",//""resultados[0].error,
					icon: 'error',
					button: 'Aceptar'
				});

			} else {

				const datosApiPersona = resultados[0];
				llenarTodosLosCampos(datosApiPersona);
			}
		})
		.catch(error => {
			// Manejar errores generales
			console.error('Error al obtener datos de las APIs:', error);
		});
		console.log("datos por id persona", promesaUrl1);
}











// ================================================================================
// 					FIN CODIGO PARA LA API DE CONSULTAR PLAZA POR PERSONA
// ================================================================================

function agregarValorAlInput(idInput, valor) {
    // Obtener el elemento de input por su ID
    var input = document.getElementById(idInput);
    // Verificar si el elemento existe antes de asignarle un valor
    if (input) {
        input.value = valor;
    } else {
        console.error("Elemento de input con ID " + idInput + " no encontrado.");
    }
}





function llenarTodosLosCampos(datosApiPlaza) {
	
	let idPlazaPadre = datosApiPlaza.data[0][3];
	const inputNumPlazPadre = document.getElementById('numeroPlazaPadre');
	if (idPlazaPadre === 0) {
		inputNumPlazPadre.value = "";
	}else{
		agregarValorAlInput("numeroPlazaPadre", datosApiPlaza.data[0][3])
	}
	//Plaza
	console.log(datosApiPlaza.data)
	agregarValorAlInput("numeroPlaza", datosApiPlaza.data[0][2])
	agregarValorAlInput("codigoIR", datosApiPlaza.data[0][4])
	agregarValorAlInput("EstatusOcupàcional", datosApiPlaza.data[0][6])
	agregarValorAlInput("MotivosDeObligacion", datosApiPlaza.data[0][8])
	agregarValorAlInput("Areas", datosApiPlaza.data[0][9])
	agregarValorAlInput("ContratacionesPublicas", datosApiPlaza.data[0][10])
	agregarValorAlInput("tramiteCLAPP", datosApiPlaza.data[0][11])
	agregarValorAlInput("TramiteEBI", datosApiPlaza.data[0][12])
	agregarValorAlInput("TramiteAEDMAJR", datosApiPlaza.data[0][14])
	agregarValorAlInput("NivelEquivalencia", datosApiPlaza.data[0][16])
	agregarValorAlInput("RFI", datosApiPlaza.data[0][17])
	agregarValorAlInput("TipoSerPub", datosApiPlaza.data[0][18])

	//Unidad
	agregarValorAlInput("codigoUnidad", datosApiPlaza.data[0][20])
	agregarValorAlInput("nombreUnidad", datosApiPlaza.data[0][21])
	agregarValorAlInput("CentroTrabajo", datosApiPlaza.data[0][27])
	agregarValorAlInput("CentroDistribucion", datosApiPlaza.data[0][24])

	//Puesto autorizado
	agregarValorAlInput("CodigoPuesto", datosApiPlaza.data[0][30])
	agregarValorAlInput("descripcion", datosApiPlaza.data[0][31])
	agregarValorAlInput("tipo", datosApiPlaza.data[0][33])
	agregarValorAlInput("Zona", datosApiPlaza.data[0][35])
	agregarValorAlInput("nivel", datosApiPlaza.data[0][37])
	agregarValorAlInput("contratacion", datosApiPlaza.data[0][45])
	agregarValorAlInput("categoria", datosApiPlaza.data[0][39])
	agregarValorAlInput("subcategoria", datosApiPlaza.data[0][41])
	agregarValorAlInput("classif_interna", datosApiPlaza.data[0][43])
	agregarValorAlInput("declaracion_patri", datosApiPlaza.data[0][47])

	//Puesto pagado
	agregarValorAlInput("CodigoPuesto1", datosApiPlaza.data[0][50])
	agregarValorAlInput("descripcion1", datosApiPlaza.data[0][51])
	agregarValorAlInput("tipo1", datosApiPlaza.data[0][53])
	agregarValorAlInput("Zona1", datosApiPlaza.data[0][55])
	agregarValorAlInput("nivel1", datosApiPlaza.data[0][57])
	agregarValorAlInput("contratacion1", datosApiPlaza.data[0][65])
	agregarValorAlInput("categoria1", datosApiPlaza.data[0][59])
	agregarValorAlInput("subcategoria1", datosApiPlaza.data[0][61])
	agregarValorAlInput("classif_interna1", datosApiPlaza.data[0][63])
	agregarValorAlInput("declaracion_patri1", datosApiPlaza.data[0][67])

	//Persona
	agregarValorAlInput("inpNombre", datosApiPlaza.data[0][68])
	agregarValorAlInput("inpApellidoPat", datosApiPlaza.data[0][69])
	agregarValorAlInput("inpApellidoMat", datosApiPlaza.data[0][70])
	agregarValorAlInput("inpNumEmpleado", datosApiPlaza.data[0][71])
	agregarValorAlInput("inpCurp", datosApiPlaza.data[0][72])
	agregarValorAlInput("Nivel", datosApiPlaza.data[0][37])
	agregarValorAlInput("inpInicioVigencia", datosApiPlaza.data[0][73])
	agregarValorAlInput("inpFinVigencia", datosApiPlaza.data[0][74])


	var puestPagado = datosApiPlaza.data[0][28];
	var puestAutoriz = datosApiPlaza.data[0][48];

	if (puestPagado == puestAutoriz) {
		var areaDestino = document.getElementById("areaDestino");
		var nuevoHTML =
			'<h4 class="custom-h4" style="margin-top:20px; text-align:center; background-color: #6ac358; color: #202220 "> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">' +
			'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
			'<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>' +
			"</svg> La configuración de los puestos es igual </h4>";

		areaDestino.innerHTML = nuevoHTML;
	} else if (puestPagado != puestAutoriz) {
		var areaDestino = document.getElementById("areaDestino");
		var nuevoHTML =
			'<h4 class="custom-h4" style="margin-top:20px;text-align:center; background-color: #ec5b4d; color: white "> <svg  width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"> <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/> <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg> La configuración de los puestos es diferente</h4>';
		areaDestino.innerHTML = nuevoHTML;
	}
    $('#btnBuscarPlaza').prop('disabled', true);
	$('#btnHabilitarBusqueda').prop('disabled', false);
	$('#autoCompleteNumPlaza').prop('disabled', true);

	$('#btnBuscarPersona').prop('disabled', true);
	$('#btnHabilitarBusquedaPersona').prop('disabled', false);
	$('#autoCompleteNumPersona').prop('disabled', true);

}

// INICIO funcion de boton buscar plaza
btnBuscarPlaza.addEventListener("click", function() {

	obtenerInfoPlaza(idPlaza);

});
// FIN funcion de boton buscar plaza

// INICIO funcion de botobn de habilitar busqueda
btnHabilitarBusqueda.addEventListener("click", function() {
	limpiarCampos();
	$('#btnBuscarPlaza').prop('disabled', false);
	$('#btnHabilitarBusqueda').prop('disabled', true);

	// Agregar la clase CSS usando la propiedad classList
	document.getElementById("autoCompleteNumPlaza").classList.add("input-valid");

	setTimeout(() => {
		document.getElementById("autoCompleteNumPlaza").classList.remove('input-valid');
	}, 1000);

	$('#autoCompleteNumPlaza').prop('disabled', false);

});
// FIN funcion de botobn de habilitar busqueda

// INICIO funcion para limpiar los campos
function limpiarCampos() {
	var elementosFormulario = document.querySelectorAll(
		"input, textarea, select"
	);

	elementosFormulario.forEach(function(elemento) {
		var areaDestino = document.getElementById("areaDestino");
		var nuevoHTML = "";

		if (elemento.id !== "fechaCapt") {
			//fechaCaptura
			elemento.value = "";
			areaDestino.innerHTML = nuevoHTML;
		}

	});
}
// FIN funcion para limpiar los campos

btnBuscarPlaza.addEventListener('click', function() {

	var nivel1Input = document.getElementById("nivel1");
	var valorNivel1 = nivel1Input.value.trim();

	if (valorNivel1 !== "") {

		llenarInputsPersona();
	} else {
		// swal({
		// 	title: "Se necesita buscar un número de plaza",
		// 	icon: 'error',
		// 	button: 'Aceptar'
		// });
	}



});

// Evento click para el botón "SwitchPlaza"
$('#SwitchPlaza').on('click', function() {
    // Cambiar el estado del botón
    $('#SwitchPlaza').prop('checked', true).prop('disabled', false);
    $('#SwitchPersona').prop('checked', false).prop('disabled', false);
	$('#btnBuscarPlaza').prop('disabled', false);
	$('#btnHabilitarBusqueda').prop('disabled', true);
	$('#autoCompleteNumPlaza').prop('disabled', false);
	
	// Ocultar el segundo div de búsqueda de persona
    $('.autoComplete_wrapper1:eq(0)').hide();

    // Mostrar el primer div de búsqueda de plaza
    $('.autoComplete_wrapper').show();

    // Ocultar los botones de buscar y habilitar búsqueda
    $('#btnBuscarPersona').hide();
    $('#btnHabilitarBusquedaPersona').hide();
    // Limpiar campos si es necesario
    limpiarCampos();
    // Activar la búsqueda de plaza
    $('#btnBuscarPlaza').prop('disabled', false);
    $('#btnHabilitarBusqueda').prop('disabled', true);
    $('#autoCompleteNumPlaza').prop('disabled', false);
});

// Evento click para el botón "SwitchPersona"
$('#SwitchPersona').on('click', function() {
    // Cambiar el estado del botón
    $('#SwitchPersona').prop('checked', true).prop('disabled', false);
    $('#SwitchPlaza').prop('checked', false).prop('disabled', false);
	$('#btnBuscarPersona').prop('disabled', false);
	$('#btnHabilitarBusquedaPersona').prop('disabled', true);
	$('#autoCompleteNumPersona').prop('disabled', false);

	// Ocultar el primer div de búsqueda de plaza
    $('.autoComplete_wrapper:eq(0)').hide();

    // Mostrar el segundo div de búsqueda de persona
    $('.autoComplete_wrapper1:eq(0)').show();
	// Ocultar los botones de buscar y habilitar búsqueda
    $('#btnBuscarPersona').show();
    $('#btnHabilitarBusquedaPersona').show();
    // Limpiar campos si es necesario
    limpiarCampos();
});


// INICIO funcion de boton buscar persona
btnBuscarPersona.addEventListener("click", function() {

	obtenerInfoPersona(idPersona);

});
// FIN funcion de boton buscar plaza

// INICIO funcion de botobn de habilitar busqueda
btnHabilitarBusquedaPersona.addEventListener("click", function() {
	limpiarCampos();
	$('#btnBuscarPersona').prop('disabled', false);
	$('#btnHabilitarBusquedaPersona').prop('disabled', true);

	// Agregar la clase CSS usando la propiedad classList
	document.getElementById("autoCompleteNumPersona").classList.add("input-valid");

	setTimeout(() => {
		document.getElementById("autoCompleteNumPersona").classList.remove('input-valid');
	}, 1000);

	$('#autoCompleteNumPersona').prop('disabled', false);

});
// FIN funcion de botobn de habilitar busqueda

// INICIO funcion para limpiar los campos
function limpiarCampos() {
	var elementosFormulario = document.querySelectorAll(
		"input, textarea, select"
	);

	elementosFormulario.forEach(function(elemento) {
		var areaDestino = document.getElementById("areaDestino");
		var nuevoHTML = "";

		if (elemento.id !== "fechaCapt") {
			//fechaCaptura
			elemento.value = "";
			areaDestino.innerHTML = nuevoHTML;
		}

	});
}
// FIN funcion para limpiar los campos


// });







/*=============================================================================================
									Buscador de numero de plaza
=============================================================================================*/

async function autocompletarNumeroPlaza() {
	const request = await fetch('api/numero_plaza/id/numerosPlaza', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data = await request.json();

	const combinedValues = data.map(item => `${item[1]}`);

	const idMap = {};
	data.forEach(item => {
		const combinedValue = `${item[1]}`;
		idMap[combinedValue] = item[0];
	});

	return { combinedValues, idMap, data };
}
autocompletarNumeroPlaza().then(resultados => {

});

async function iniciarAutocompleteNumPlaza() {
	const { combinedValues, idMap, data } = await autocompletarNumeroPlaza();
	const autoCompleteInput = document.getElementById('autoCompleteNumPlaza');

	const autoCompleteJS = new autoComplete({
		selector: "#autoCompleteNumPlaza",
		placeHolder: "Buscar por Número de plaza...",
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
					const selectedPerson = data.find(item => `${item[1]}` === selection);
					idPlaza = idMap[selection];
					// nuevaBusqueda();
					console.log(idPlaza);
				}
			}
		}
	});
}
iniciarAutocompleteNumPlaza();
/*=============================================================================================
									Buscador de persona
=============================================================================================*/

























/*=============================================================================================
									Buscador de persona
=============================================================================================*/

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

async function iniciarAutoComplete() {
	const { combinedValues, idMap, data } = await autocompletarPersona();
	const autoCompleteInput = document.getElementById('autoCompleteNumPersona');

	const autoCompleteJS = new autoComplete({
		selector: "#autoCompleteNumPersona",
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
					idPersona = idMap[selection];
					// nuevaBusqueda();
					console.log(idPersona);
				}
			}
		}
	});
}
iniciarAutoComplete();
/*=============================================================================================
									Buscador de persona
=============================================================================================*/