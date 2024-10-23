

$(function() {
	MostrarPagina(28);
	if (sessionStorage.permisos == 1) {
		$("#datosPersona-tab").prop("hidden", false);

	}
});

// INICIO variables globales (servicio)
let globalEstatusOcupacional = "";
let globalMotivosDeObligacion = "";
let globalTramiteAEDMAJR = "";
let globalNivelEquivalencia = "";

let idEstatusOcupacional;
let idMotivosDeObligacion;
let idTramiteAEDMAJR;
let idNivelEquivalencia;
let idUnidad;
let idCentroTrabajo;
let idCentroDistribucion;
let idPuestoAutorizado;
let idPuestoPagado;
let fechaInicio;
let usuarioCapturo;
let idSituacion;

let datosFinales;
// FIN variables globales (servicio)


// Inicia autocomplete para Numplaza

async function autocompletarNumPlaza() {
	const request = await fetch('api/numero_plaza/numerosPlaza', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data = await request.json();

	return data;
}

autocompletarNumPlaza().then(resultados => {

});


async function iniciarAutoCompleteNumPlaza() {
	const resultados = await autocompletarNumPlaza();
	const autoCompleteInput = document.getElementById('autoCompleteNumPlaza');

	const autoCompleteJS = new autoComplete({
		selector: "#autoCompleteNumPlaza",
		placeHolder: "Buscar por Número de Plaza",
		data: {
			src: resultados, // Usar el array combinado
			cache: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				query: (query, autoCompleteJS) => {
					if (query.length >= 3) { // Verifica si la longitud del texto es mayor o igual a 3
						autoCompleteJS.start();
					} else {
						autoCompleteJS.stop();
					}
				},
				selection: (event) => {
					const selection = event.detail.selection.value;
					autoCompleteInput.value = selection;
				}
			}
		}
	});
}

iniciarAutoCompleteNumPlaza();
// Fin autocomplete para Numplaza

function obtenerInfoPlaza(numPlaza) {
	const url1 = `api/plaza/${numPlaza}`;
	const url2 = `api/plaza/puestoPagado/${numPlaza}`;
	const url3 = `api/plaza/puestoAutorizado/${numPlaza}`;

    // Para POST, se necesita especificar el método y, si es necesario, el cuerpo de la solicitud
    const promesaUrl1 = fetch(url1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numPlaza }) // Puede incluir datos adicionales en el cuerpo de la solicitud
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

	const promesaUrl2 = fetch(url2).then(response => response.json());
	const promesaUrl3 = fetch(url3).then(response => response.json());

	Promise.all([promesaUrl1, promesaUrl2, promesaUrl3])
		.then(resultados => {

			if (resultados[0].error) {
				//console.error(resultados[0].error);
				var numPlaza = document.getElementById("numeroPlaza");
				numPlaza.value = "";
				swal({
					title: "El número de plaza no existe",//""resultados[0].error,
					icon: 'error',
					button: 'Aceptar'
				});

			} else {

				const datosApiPlaza = resultados[0];
				const datosPuestoPagado = resultados[1];
				const datosPuestoAutorizado = resultados[2];
				llenarTodosLosCampos(datosApiPlaza, datosPuestoPagado, datosPuestoAutorizado);

				var numPlaza = document.getElementById("autoCompleteNumPlaza");
				var valor = numPlaza.value;

				agregarValorAlInput("numeroPlaza", valor);
				numPlaza.value = "";
				desbloquearInputs();
				datosControl();
				guardarDatosIniciales();
			}


		})
		.catch(error => {
			// Manejar errores generales
			console.error('Error al obtener datos de las APIs:', error);
		});
}

function llenarTodosLosCampos(datosApiPlaza, datosPuestoPagado, datosPuestoAutorizado) {

	// INICIO guardado (servicio)
	globalEstatusOcupacional = datosApiPlaza.data[0][4];
	globalMotivosDeObligacion = datosApiPlaza.data[0][6];
	globalTramiteAEDMAJR = datosApiPlaza.data[0][12];
	globalNivelEquivalencia = datosApiPlaza.data[0][14];

	let idPlazaPadre = datosApiPlaza.data[0][1];
	idEstatusOcupacional = datosApiPlaza.data[0][3];
	idMotivosDeObligacion = datosApiPlaza.data[0][5];
	idTramiteAEDMAJR = datosApiPlaza.data[0][11];
	idNivelEquivalencia = datosApiPlaza.data[0][13];
	idUnidad = datosApiPlaza.data[0][17];
	idCentroTrabajo = datosApiPlaza.data[0][20];
	idCentroDistribucion = datosApiPlaza.data[0][22];
	idPuestoAutorizado = datosApiPlaza.data[0][24];
	idPuestoPagado = datosApiPlaza.data[0][25];
	fechaInicio = datosApiPlaza.data[0][26];
	usuarioCapturo = datosApiPlaza.data[0][28];
	idSituacion = datosApiPlaza.data[0][33];

	opcionesPlaza();
	// FIN guardado (servicio)

	llenarYGuardarSelect();

	const inputNumPlazPadre = document.getElementById('numeroPlazaPadre');

	if (idPlazaPadre === 0) {
		inputNumPlazPadre.value = "";
	} else {
		agregarValorAlInput("numeroPlazaPadre", datosApiPlaza.data[0][1])
	}

	agregarValorAlInput("codigoIR", datosApiPlaza.data[0][2])
	agregarValorAlInput("EstatusOcupàcional", datosApiPlaza.data[0][4])
	agregarValorAlInput("Areas", datosApiPlaza.data[0][7])
	agregarValorAlInput("ContratacionesPublicas", datosApiPlaza.data[0][8])
	agregarValorAlInput("tramiteCLAPP", datosApiPlaza.data[0][9])
	agregarValorAlInput("TramiteEBI", datosApiPlaza.data[0][10])
	agregarValorAlInput("RFI", datosApiPlaza.data[0][15])
	agregarValorAlInput("TipoSerPub", datosApiPlaza.data[0][16])

	agregarValorAlInput("codigoUnidad", datosApiPlaza.data[0][18])
	agregarValorAlInput("nombreUnidad", datosApiPlaza.data[0][19])
	agregarValorAlInput("otroInputc", datosApiPlaza.data[0][21])
	agregarValorAlInput("otroInput", datosApiPlaza.data[0][23])

	agregarValorAlInput("inpFechaInicio", datosApiPlaza.data[0][26])
	agregarValorAlInput("inpFechaTermino", datosApiPlaza.data[0][27])
	agregarValorAlInput("inpUsuarioCapturo", datosApiPlaza.data[0][29])

	const inputSituacion = document.getElementById('inpSituacion');
	if (idSituacion === 1) {
		inputSituacion.value = 'ACTIVO';
	} else if (idSituacion === 2) {
		inputSituacion.value = 'BAJA';
	} else {
		inputSituacion.value = '';
	}

	agregarValorAlInput("CodigoPuesto1", datosPuestoPagado.data[0][1])
	agregarValorAlInput("descripcion1", datosPuestoPagado.data[0][2])
	agregarValorAlInput("tipo1", datosPuestoPagado.data[0][3])
	agregarValorAlInput("Zona1", datosPuestoPagado.data[0][4])
	agregarValorAlInput("nivel1", datosPuestoPagado.data[0][5])
	agregarValorAlInput("categoria1", datosPuestoPagado.data[0][6])
	agregarValorAlInput("subcategoria1", datosPuestoPagado.data[0][7])
	agregarValorAlInput("classif_interna1", datosPuestoPagado.data[0][8])
	agregarValorAlInput("contratacion1", datosPuestoPagado.data[0][9])
	agregarValorAlInput("declaracion_patri1", datosPuestoPagado.data[0][10])

	agregarValorAlInput("CodigoPuesto", datosPuestoAutorizado.data[0][1])
	agregarValorAlInput("descripcion", datosPuestoAutorizado.data[0][2])
	agregarValorAlInput("tipo", datosPuestoAutorizado.data[0][3])
	agregarValorAlInput("Zona", datosPuestoAutorizado.data[0][4])
	agregarValorAlInput("nivel", datosPuestoAutorizado.data[0][5])
	agregarValorAlInput("categoria", datosPuestoAutorizado.data[0][6])
	agregarValorAlInput("subcategoria", datosPuestoAutorizado.data[0][7])
	agregarValorAlInput("classif_interna", datosPuestoAutorizado.data[0][8])
	agregarValorAlInput("contratacion", datosPuestoAutorizado.data[0][9])
	agregarValorAlInput("declaracion_patri", datosPuestoAutorizado.data[0][10])

	var puestPagado = datosPuestoPagado.data[0][0];
	var puestAutoriz = datosPuestoAutorizado.data[0][0];

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

}

// INICIO funcion para llenar select Situación de la Plaza y guardar el ID
function llenarYGuardarSelect() {

	let select = document.getElementById("inpSituacionPlaza");
	select.innerHTML = '';

	let optionActivo = document.createElement("option");
	optionActivo.value = "1";
	optionActivo.text = "ACTIVO";

	let optionBaja = document.createElement("option");
	optionBaja.value = "2";
	optionBaja.text = "BAJA";

	select.appendChild(optionActivo);
	select.appendChild(optionBaja);

	select.addEventListener('change', function() {
		idSituacion = parseInt(this.value);
	});

	if (idSituacion === 1) {
		optionActivo.selected = true;
	} else if (idSituacion === 2) {
		optionBaja.selected = true;
	}

}
// FIN funcion para llenar select Situación de la Plaza y guardar el ID

var boton = document.getElementById("seleccion");
boton.addEventListener("click", function() {

	var numPlaza = document.getElementById("autoCompleteNumPlaza");
	var valor = numPlaza.value;

	obtenerInfoPlaza(valor);
});

function agregarValorAlInput(inputId, nuevoValor) {

	var inputElement = document.getElementById(inputId);
	if (inputElement) {

		inputElement.removeAttribute("disabled");

		inputElement.value = nuevoValor;

		inputElement.setAttribute("disabled", "disabled");
	} else {
		console.error("Elemento de entrada no encontrado con el ID: " + inputId);
	}
}


var botonNuevaBusqueda = document.getElementById("nuevaBusqueda");

botonNuevaBusqueda.addEventListener("click", function() {

	location.reload();

});

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

function obtenerFechaActual() {

	var fechaActual = new Date();

	var año = fechaActual.getFullYear();
	var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
	var dia = ("0" + fechaActual.getDate()).slice(-2);

	var fechaFormateada = año + "-" + mes + "-" + dia;

	return fechaFormateada;
}

var fecha = obtenerFechaActual();
console.log("Fecha actual en formato AAAA/MM/DD: " + fecha);
let usuCapturo = sessionStorage.idUsuario;
console.log("usuario: " + usuCapturo);



let guardarUnidadId = ''; // Servicio
let arrayGuardarUnidadId = guardarUnidadId.split(";"); // Servicio


async function autocompletarUnidad() {

	const request = await fetch('api/unidad/detallesUnidad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const unidades = await request.json();

	let stringDatos = '';
	let stringId = ''; // Servicio

	for (let unidad of unidades) {
		stringDatos += unidad.uni_idunidad + ' - ' + unidad.uni_desc + ';';
		stringId += unidad.uni_id + ';'; // Servicio
	}

	let arrayDatosUnidad = stringDatos.split(";");
	let arrayIdUnidad = stringId.split(";"); // Servicio

	return { arrayDatosUnidad, arrayIdUnidad, arrayGuardarUnidadId }; // Servicio
}

// let arrayDatosUnidad = autocompletarUnidad();

async function setupAutoComplete() { // Servicio
	const { arrayDatosUnidad, arrayIdUnidad, arrayGuardarUnidadId } = await autocompletarUnidad(); // Servicio

	const autoCompleteJSUnidad = new autoComplete({
		selector: "#autoCompleteUnidad",
		placeHolder: "Busqueda por código o unidad",
		data: {
			src: arrayDatosUnidad,
			cache: true,
		},
		resultsList: {
			element: (list, data) => {
				if (!data.results.length) {
					// Create "No Results" message element
					const message = document.createElement("div");
					// Add class to the created element
					message.setAttribute("class", "no_result");
					// Add message text content
					message.innerHTML = `<span>No hay resultados para "${data.query}"</span>`;
					// Append message element to the results list
					list.prepend(message);
				}
			},
			noResults: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				selection: (event) => {
					const selection = event.detail.selection.value;
					const selectedIndex = arrayDatosUnidad.indexOf(selection); // Servicio
					const selectedId = arrayIdUnidad[selectedIndex]; // Servicio

					autoCompleteJSUnidad.input.value = selection;

					var botonNuevaBusqueda = document.getElementById("seleccionar");

					botonNuevaBusqueda.addEventListener("click", function() {
						agregarValorAlInput("codigoUnidad", selection.split("-")[0]);
						agregarValorAlInput("nombreUnidad", selection.split("-")[1]);
						arrayGuardarUnidadId.value = selectedId; // Servicio
						idUnidad = arrayGuardarUnidadId.value;
					});


					autoCompleteJSUnidad.input.classList.remove("input-invalid"); // Servicio


				}
			}
		}
	});

	// INICIO boton limpiar Servicio
	document.getElementById("habilitarBusqueda").addEventListener("click", function() {

		autoCompleteJSUnidad.input.disabled = false;
		autoCompleteJSUnidad.input.value = "";

		document.getElementById("codigoUnidad").value = "";
		document.getElementById("nombreUnidad").value = "";
		arrayGuardarUnidadId.value = null;

		autoCompleteJSUnidad.input.classList.add("input-invalid");

	});
	// FIN boton limpiar Servicio
}

// Llamamos a la función setupAutoComplete para inicializar el autocompletado
setupAutoComplete(); // Servicio	

function dividirDatos() {
	// Obtener el valor del input por medio de su id
	var inputData = document.getElementById("autoCompleteUnidad").value;

	// Dividir los datos por guion medio
	var datosDivididos = inputData.split("-");

	let datosUnidadId = arrayGuardarUnidadId.value; // Servicio
	// Almacenar las cadenas divididas en dos variables
	var primeraCadena = datosDivididos[0];
	var segundaCadena = datosDivididos[1];

	if (datosDivididos.length < 2) { // INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	}

	if (datosUnidadId != undefined) {


	} else {

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}

	/*
  	
  if(segundaCadena.trim() === ''){
  	
   swal({
  
	 title: 'El dato ingresdo no es válido',
	 icon: 'error',
	 button: 'Aceptar',
  
   });
  
   return;
  	
  }// FIN Validacion (servicio)*/

	agregarValorAlInput("codigoUnidad", datosDivididos[0]);
	agregarValorAlInput("nombreUnidad", datosDivididos[1]);


	var limpia = document.getElementById("autoCompleteUnidad");
	limpia.value = "";

}


document.getElementById('btnUCTD').addEventListener('click', function() {
	document.getElementById('buscadorUnidades').style.display = 'block';
});

document.getElementById('btnModCtrTrab').addEventListener('click', function() {
	document.getElementById('autoCompletenone').style.display = 'block';
	document.getElementById('btnBusCtra').style.display = 'block';
});

document.getElementById('btnModCtrDist').addEventListener('click', function() {


	document.getElementById('ctrDist').style.display = 'block';
	document.getElementById('autoCompleteuno').style.display = 'block';
});

document.getElementById('btnPP').addEventListener('click', function() {
	document.getElementById('autocompleteDere').style.display = 'block';
});

document.getElementById('btnPA').addEventListener('click', function() {
	document.getElementById('buscardorIzq').style.display = 'block';
});
 

document.getElementById('btnPA').addEventListener('click', function() {
	document.getElementById('buscardorIzq').style.display = 'block';
});

document.getElementById('habilitarPlazaPadre').addEventListener('click', function() {
	document.getElementById('numeroPlazaPadre').removeAttribute('disabled');

});

document.getElementById('habilitarCodigoIR').addEventListener('click', function() {
	document.getElementById('codigoIR').removeAttribute('disabled');

});

//document.getElementById('habilitarEstatusOcupacional').addEventListener('click', function() {
//	document.getElementById('EstatusOcupàcional').removeAttribute('disabled');
//
//});

document.getElementById('habilitarSituacionPlaza').addEventListener('click', function() {
	if (idEstatusOcupacional === 2) {

		swal({
			title: "¿Estás seguro?",
			text: "Esto habilitará la situación de la plaza. ¿Deseas continuar?",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					document.getElementById('inpSituacionPlaza').removeAttribute('disabled');
				}
			});

	} else {
		swal({
			title: "Acción no posible",
			text: "No se puede realizar la acción, ya que la plaza está ocupada",
			icon: 'error',
			button: 'Aceptar'
		});

	}

});

document.getElementById('habilitarMotivosDeObli').addEventListener('click', function() {
	document.getElementById('MotivosDeObligacion').removeAttribute('disabled');

});

document.getElementById('habilitarAreas').addEventListener('click', function() {
	document.getElementById('Areas').removeAttribute('disabled');

});

document.getElementById('habilitarContratacionesPub').addEventListener('click', function() {
	document.getElementById('ContratacionesPublicas').removeAttribute('disabled');

});

document.getElementById('habilitarTramiteClapp').addEventListener('click', function() {
	document.getElementById('tramiteCLAPP').removeAttribute('disabled');

});

document.getElementById('habilitarTramiteEbi').addEventListener('click', function() {
	document.getElementById('TramiteEBI').removeAttribute('disabled');

});

document.getElementById('habilitarTramiteAedmajr').addEventListener('click', function() {
	document.getElementById('TramiteAEDMAJR').removeAttribute('disabled');

});

document.getElementById('habilitarNivelEq').addEventListener('click', function() {
	document.getElementById('NivelEquivalencia').removeAttribute('disabled');

});

document.getElementById('habilitarRfi').addEventListener('click', function() {
	document.getElementById('RFI').removeAttribute('disabled');

});

document.getElementById('habilitarTipoSerPub').addEventListener('click', function() {
	document.getElementById('TipoSerPub').removeAttribute('disabled');

});

async function autocompletarRFI() {
	const request = await fetch('api/riuf/riuf_riuf', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data = await request.json();

	return data;
}

async function iniciarAutoCompleteRFI() {
	const resultados = await autocompletarRFI();
	const autoCompleteInput = document.getElementById('RFI');

	const autoCompleteJS = new autoComplete({
		selector: "#RFI",
		data: {
			src: resultados,
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
				}
			}
		}
	});
}

iniciarAutoCompleteRFI();



async function autocompletarTspCodigo() {
	const request = await fetch('api/ServPub/tspCodigo', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data1 = await request.json();


	return data1;
}

autocompletarTspCodigo().then(resultados => {

});


async function iniciarAutoCompleteTspCodigo() {
	const resultados = await autocompletarTspCodigo();
	const autoCompleteInput = document.getElementById('TipoSerPub');



	const autoCompleteJS = new autoComplete({
		selector: "#TipoSerPub",
		//placeHolder: "Buscar por Riuf",
		data: {
			src: resultados, // Usar el array combinado
			cache: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				query: (query, autoCompleteJS) => {
					if (query.length >= 3) { // Verifica si la longitud del texto es mayor o igual a 3
						autoCompleteJS.start();
					} else {
						autoCompleteJS.stop();
					}
				},
				selection: (event) => {
					const selection = event.detail.selection.value;
					autoCompleteInput.value = selection;
				}
			}
		}
	});
}
iniciarAutoCompleteTspCodigo();

// Fin codigo TspCodigo


// inicio Codigo buscadores



async function buscarPuestoX() {
	let datos = {};
	datos.ctgp_codigo = document
		.getElementById("segundoAutoComplete")
		.value.split("-")[0]
		.trim();

	const request = await fetch("api/puestos/consulta/datosXcodigo", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	});

	const puestos = await request.json();
	global_ctgp_codigo = document
		.getElementById("segundoAutoComplete")
		.value.split("-")[0]
		.trim();

	if (puestos.length === 0) {// INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}//FIN Validacion (servicio)

	if (!verificarJsonX(puestos)) {
		$("#modificarPuesto").removeAttr("disabled");
	}
	llenaModalX();
}

const verificarJsonX = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
};

async function autocompletarPuestosX() {
	const request = await fetch("api/puestos/puestosX_detallesX2/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puestos = await request.json();

	let stringDatos = "";

	for (var i = 0; i < puestos.length; i++) {
		stringDatos += puestos[i][0] + " - " + puestos[i][1] + ";";
	}

	let arrayDatosX = stringDatos.split(";");

	return arrayDatosX;
}

let arrayDatosX = autocompletarPuestosX();

const SegundoautoCompleteJS = new autoComplete({
	selector: "#segundoAutoComplete",
	placeHolder: "Busqueda por código o puesto",
	data: {
		src: arrayDatosX,
		cache: true,
	},
	resultsList: {
		element: (list, data) => {
			if (!data.results.length) {
				// Create "No Results" message element
				const message = document.createElement("div");
				// Add class to the created element
				message.setAttribute("class", "no_result");
				// Add message text content
				message.innerHTML = `<span>No hay resultados para "${data.query}"</span>`;
				// Append message element to the results list
				list.prepend(message);
			}
		},
		noResults: true,
	},
	resultItem: {
		highlight: true,
	},
	events: {
		input: {
			selection: (event) => {
				const selection = event.detail.selection.value;
				SegundoautoCompleteJS.input.value = selection;
			},
		},
	},
});

// Asocia el evento de abrir el modal al botón "abrirInfo"
//document.getElementById("abrirInfo").addEventListener("click", buscarPuestoX);

$("#modalInfo2").on("hidden.bs.modal", function() {
	$("body").removeClass("modal-open");
	$(".modal-backdrop").remove();
});

/* Finaliza funcion buscar puestos de Sergio */

/**Llenado del modal */

async function llenaModalX() {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto = await request.json();

	const modal = document.getElementById("modalInfo2");
	const modalTitle = modal.querySelector(".modal-title");
	const modalBody = modal.querySelector(".modal-body");

	// Abre el modal      puestoAutorizadoId = codigoSeleccionado;

	$(modal).modal("show");

	// Llena el modal con las opciones
	modalTitle.textContent = "Selecciona una opción";

	// Limpia el contenido anterior del modalBody
	modalBody.innerHTML = "";
	modalBody.innerHTML = `<table class="table table-striped table-hover">
  <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Selección</th>      
      <th scope="col">Codigo</th>
      <th scope="col">Descripción</th> 
      <th scope="col">Tipo</th> 
      <th scope="col">Zona</th> 
      <th scope="col">Nivel</th> 
      <th scope="col">Contratación</th>      
    </tr>
  </thead>
  <tbody></tbody>
</table>`;

	// Nombre común para todos los elementos de radio
	const radioGroupName = "opciones";

	// Agrega opciones al modalBody
	const table = modalBody.querySelector("table tbody");
	table.innerHTML = "";
	let contador = 0;

	for (var i = 0; i < puesto.length; i++) {
		if (puesto[i][2] === global_ctgp_codigo) {
			//&& puesto[i][27] === 1

			contador++;
			const row = document.createElement("tr");

			//Numero
			const cell1 = document.createElement("td");
			cell1.innerHTML = `<label class="form-check-label" ">
        ${contador}
    </label>`;

			//Seleccion
			const cell2 = document.createElement("td");
			cell2.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" value="${puesto[i][0]}"
   data-codigo="${puesto[i][0]}" data-codigo2="${puesto[i][2]}" data-descripcion="${puesto[i][3]}"/>`;

			//Codigo
			const cell3 = document.createElement("td");
			cell3.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][2]}">
        ${puesto[i][2]}
    </label>`;

			//Descripcion
			const cell4 = document.createElement("td");
			cell4.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][3]}">
        ${puesto[i][3]}
    </label>`;

			//Tipo
			const cell5 = document.createElement("td");
			cell5.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][5]}">
        ${puesto[i][5]}
    </label>`;

			//Zona
			const cell6 = document.createElement("td");
			cell6.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][7]}">
        ${puesto[i][7]}
    </label>`;

			//Nivel
			const cell7 = document.createElement("td");
			cell7.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][9]}">
        ${puesto[i][9]}
    </label>`;

			//Contratacion
			const cell8 = document.createElement("td");
			cell8.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][17]}">
        ${puesto[i][17]}
    </label>`;

			row.appendChild(cell1);
			row.appendChild(cell2);
			row.appendChild(cell3);
			row.appendChild(cell4);
			row.appendChild(cell5);
			row.appendChild(cell6);
			row.appendChild(cell7);
			row.appendChild(cell8);

			table.appendChild(row);
		}
	}

	seleccionarBtn2.addEventListener("click", function() {
		// Busca el elemento de radio seleccionado
		const selectedRadio = modalBody.querySelector(
			'input[type="radio"]:checked'
		);

		if (selectedRadio) {
			// Obtiene los valores personalizados del elemento de radio seleccionado
			const codigoSeleccionado = selectedRadio.getAttribute("data-codigo");

			idPuestoPagado = codigoSeleccionado;
			const codigoPuestoSeleccionado = selectedRadio.getAttribute(
				"data-codigo2"
			);
			const descripcionSeleccionada = selectedRadio.getAttribute(
				"data-descripcion"
			);

			consultarDetallesPersonalizadosX(codigoSeleccionado);

			const limpiar = document.getElementById("segundoAutoComplete");
			limpiar.value = "";

			$(modal).modal("hide");
		} else {
			seleccionX();
		}
	});
}

// Fin funcion llenar modal

async function consultarDetallesPersonalizadosX(codigoPuesto) {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto_detalleX = await request.json();
	//var codigoPuesto = document.getElementById("codigoPuesto").value;

	for (var i = 0; i < puesto_detalleX.length; i++) {
		if (puesto_detalleX[i][0] == codigoPuesto) {
			idDerecho = puesto_detalleX[i][0];
			agregarValorAlInput("CodigoPuesto1", puesto_detalleX[i][2]);
			agregarValorAlInput("descripcion1", puesto_detalleX[i][3]);
			agregarValorAlInput("tipo1", puesto_detalleX[i][5]);
			agregarValorAlInput("Zona1", puesto_detalleX[i][7]);
			agregarValorAlInput("nivel1", puesto_detalleX[i][9]);
			agregarValorAlInput("categoria1", puesto_detalleX[i][11]);
			agregarValorAlInput("subcategoria1", puesto_detalleX[i][13]);
			agregarValorAlInput("classif_interna1", puesto_detalleX[i][15]);
			agregarValorAlInput("contratacion1", puesto_detalleX[i][17]);
			agregarValorAlInput("declaracion_patri1", puesto_detalleX[i][19]);

			if (idIzquierdo != null) {
				if (idIzquierdo == idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px; text-align:center; background-color: #6ac358; color: #202220 "> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">' +
						'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
						'<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>' +
						"</svg> La configuración de los puestos es igual </h4>";

					areaDestino.innerHTML = nuevoHTML;
				} else if (idIzquierdo != idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px;text-align:center; background-color: #ec5b4d; color: white "> <svg  width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"> <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/> <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg> La configuración de los puestos es diferente</h4>';
					areaDestino.innerHTML = nuevoHTML;
				}
			}
		}
	}
}

// Llama a la función para cargar los datos cuando sea necesario
//consultarDetallesPersonalizadosX();

function seleccionX() {
	swal({
		title: "Aviso",
		text: "Selecciona el puesto que deseas consultar",
		icon: "warning",
		button: "Aceptar",
	});
}

// FIN DEL CODIGO PARA EL BUSCAADOR DERECHO

// INICIO CODIGO DEL BUSCADOR IZQUIERDO

/* Inicia funcion buscar puestos de Sergio */

async function buscarPuesto() {

	let datos = {};
	datos.ctgp_codigo = document
		.getElementById("autoComplete")
		.value.split("-")[0]
		.trim();

	const request = await fetch("api/puestos/consulta/datosXcodigo", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	});

	const puestos = await request.json();
	global_ctgp_codigo = document
		.getElementById("autoComplete")
		.value.split("-")[0]
		.trim();

	if (puestos.length === 0) {// INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}//FIN Validacion (servicio)

	if (!verificarJson(puestos)) {
		$("#modificarPuesto").removeAttr("disabled");
	}
	llenaModal();
}

const verificarJson = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
};

async function autocompletarPuestos() {
	const request = await fetch("api/puestos/puestosX_detallesX2/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puestos = await request.json();

	let stringDatos = "";

	for (var i = 0; i < puestos.length; i++) {
		stringDatos += puestos[i][0] + " - " + puestos[i][1] + ";";
	}

	let arrayDatos = stringDatos.split(";");

	return arrayDatos;
}

let arrayDatos = autocompletarPuestos();

const autoCompleteJS = new autoComplete({
	selector: "#autoComplete",
	placeHolder: "Busqueda por código o puesto",
	data: {
		src: arrayDatos,
		cache: true,
	},
	resultsList: {
		element: (list, data) => {
			if (!data.results.length) {
				// Create "No Results" message element
				const message = document.createElement("div");
				// Add class to the created element
				message.setAttribute("class", "no_result");
				// Add message text content
				message.innerHTML = `<span>No hay resultados para "${data.query}"</span>`;
				// Append message element to the results list
				list.prepend(message);
			}
		},
		noResults: true,
	},
	resultItem: {
		highlight: true,
	},
	events: {
		input: {
			selection: (event) => {
				const selection = event.detail.selection.value;
				autoCompleteJS.input.value = selection;
			},
		},
	},
});

// Asocia el evento de abrir el modal al botón "abrirInfo"
//document.getElementById("abrirInfo").addEventListener("click", buscarPuesto);

$("#modalInfo").on("hidden.bs.modal", function() {
	$("body").removeClass("modal-open");
	$(".modal-backdrop").remove();
});

/* Finaliza funcion buscar puestos de Sergio */

/**Boton limpiar */

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
			elemento.disabled = true; // Bloquea el elemento
			areaDestino.innerHTML = nuevoHTML;
		}
	});
}


/**Fin boton Limpiar */

/**Obtener Fecha */

function obtenerFechaActual() {
	const fecha = new Date();
	const dia = String(fecha.getDate()).padStart(2, "0");
	const mes = String(fecha.getMonth() + 1).padStart(2, "0");
	const año = fecha.getFullYear();

	return `${dia}/${mes}/${año}`;
}

/**Fin obtener Fecha */

/**Llenado del modal */

async function llenaModal() {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto = await request.json();

	const modal = document.getElementById("modalInfo");
	const modalTitle = modal.querySelector(".modal-title");
	const modalBody = modal.querySelector(".modal-body");

	// Abre el modal
	$(modal).modal("show");

	// Llena el modal con las opciones
	modalTitle.textContent = "Selecciona una opción";

	// Limpia el contenido anterior del modalBody
	modalBody.innerHTML = "";
	modalBody.innerHTML = `<table class="table table-striped table-hover">
  <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Selección</th>      
      <th scope="col">Codigo</th>
      <th scope="col">Descripción</th> 
      <th scope="col">Tipo</th> 
      <th scope="col">Zona</th> 
      <th scope="col">Nivel</th> 
      <th scope="col">Contratación</th>      
    </tr>
  </thead>
  <tbody></tbody>
</table>`;

	// Nombre común para todos los elementos de radio
	const radioGroupName = "opciones";

	// Agrega opciones al modalBody
	const table = modalBody.querySelector("table tbody");
	table.innerHTML = "";
	let contador = 0;

	for (var i = 0; i < puesto.length; i++) {
		if (puesto[i][2] === global_ctgp_codigo) {
			//&& puesto[i][27] === 1

			contador++;
			const row = document.createElement("tr");

			//Numero
			const cell1 = document.createElement("td");
			cell1.innerHTML = `<label class="form-check-label" ">
        ${contador}
    </label>`;

			//Seleccion
			const cell2 = document.createElement("td");
			cell2.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" value="${puesto[i][0]}"
   data-codigo="${puesto[i][0]}" data-codigo2="${puesto[i][2]}" data-descripcion="${puesto[i][3]}"/>`;

			//Codigo
			const cell3 = document.createElement("td");
			cell3.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][2]}">
        ${puesto[i][2]}
    </label>`;

			//Descripcion
			const cell4 = document.createElement("td");
			cell4.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][3]}">
        ${puesto[i][3]}
    </label>`;

			//Tipo
			const cell5 = document.createElement("td");
			cell5.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][5]}">
        ${puesto[i][5]}
    </label>`;

			//Zona
			const cell6 = document.createElement("td");
			cell6.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][7]}">
        ${puesto[i][7]}
    </label>`;

			//Nivel
			const cell7 = document.createElement("td");
			cell7.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][9]}">
        ${puesto[i][9]}
    </label>`;

			//Contratacion
			const cell8 = document.createElement("td");
			cell8.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][17]}">
        ${puesto[i][17]}
    </label>`;

			row.appendChild(cell1);
			row.appendChild(cell2);
			row.appendChild(cell3);
			row.appendChild(cell4);
			row.appendChild(cell5);
			row.appendChild(cell6);
			row.appendChild(cell7);
			row.appendChild(cell8);

			table.appendChild(row);
		}
	}

	seleccionarBtn.addEventListener("click", function() {
		// Busca el elemento de radio seleccionado
		const selectedRadio = modalBody.querySelector(
			'input[type="radio"]:checked'
		);

		if (selectedRadio) {
			// Obtiene los valores personalizados del elemento de radio seleccionado
			const codigoSeleccionado = selectedRadio.getAttribute("data-codigo");
			idPuestoAutorizado = codigoSeleccionado;
			puestoAutorizadoId = codigoSeleccionado;
			const codigoPuestoSeleccionado = selectedRadio.getAttribute(
				"data-codigo2"
			);
			const descripcionSeleccionada = selectedRadio.getAttribute(
				"data-descripcion"
			);

			consultarDetallesPersonalizados(codigoSeleccionado);

			const limpiar = document.getElementById("autoComplete");
			limpiar.value = "";

			$(modal).modal("hide");
		} else {
			seleccion();
		}
	});
}

// Fin funcion llenar modal

function agregarValorAlInput(inputId, nuevoValor) {
	// Obtener el elemento de entrada por su ID
	var inputElement = document.getElementById(inputId);

	// Verificar si el elemento existe
	if (inputElement) {
		// Habilitar el campo de entrada
		inputElement.removeAttribute("disabled");

		// Establecer el nuevo valor
		inputElement.value = nuevoValor;

		// Volver a deshabilitar el campo de entrada (si es necesario)
		inputElement.setAttribute("disabled", "disabled");
	} else {
		console.error("Elemento de entrada no encontrado con el ID: " + inputId);
	}
}

// Llamada a la función con el ID del input y el nuevo valor
//agregarValorAlInput("Input", "Nuevo valor");

async function consultarDetallesPersonalizados(codigoPuesto) {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto_detalle = await request.json();
	//var codigoPuesto = document.getElementById("codigoPuesto").value;

	for (var i = 0; i < puesto_detalle.length; i++) {
		if (puesto_detalle[i][0] == codigoPuesto) {
			idIzquierdo = puesto_detalle[i][0];
			agregarValorAlInput("CodigoPuesto", puesto_detalle[i][2]);
			agregarValorAlInput("descripcion", puesto_detalle[i][3]);
			agregarValorAlInput("tipo", puesto_detalle[i][5]);
			agregarValorAlInput("Zona", puesto_detalle[i][7]);
			agregarValorAlInput("nivel", puesto_detalle[i][9]);
			agregarValorAlInput("categoria", puesto_detalle[i][11]);
			agregarValorAlInput("subcategoria", puesto_detalle[i][13]);
			agregarValorAlInput("classif_interna", puesto_detalle[i][15]);
			agregarValorAlInput("contratacion", puesto_detalle[i][17]);
			agregarValorAlInput("declaracion_patri", puesto_detalle[i][19]);

			if (idDerecho != null) {
				if (idIzquierdo == idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px;text-align:center; background-color: #6ac358; color: #202220 "> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">' +
						'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
						'<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>' +
						"</svg> La configuración de los puestos es igual </h4>";

					areaDestino.innerHTML = nuevoHTML;
				} else if (idIzquierdo != idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px; text-align:center; background-color: #ec5b4d; color: white "> <svg  width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"> <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/> <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg> La configuración de los puestos es diferente</h4>';
					areaDestino.innerHTML = nuevoHTML;
				}
			}
		}
	}
}

// Llama a la función para cargar los datos cuando sea necesario
//consultarDetallesPersonalizados();

function seleccion() {
	swal({
		title: "Aviso",
		text: "Selecciona el puesto que deseas consultar",
		icon: "warning",
		button: "Aceptar",
	});
}

// Fin codigo Buscadores



// Inicia codigo IVAN




let ctraIdGlobal = ''; // Servicio

// /******************************************CUARTO  MÓDULO DE  DATOS DE CENTRO DE TRABAJO Y MODAL  *********************************/
document.addEventListener("DOMContentLoaded", function() {
	let ctraIdGlobal = ''; // Cambié el nombre de la variable y la inicialicé aquí

	async function autocompletarTrabajo() {
		const request = await fetch("api/persona/Obtenercentrotrabajo/", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});

		const personas = await request.json();
		let stringDatos = "";

		for (let persona of personas) {
			stringDatos += persona.ctra_clave + ' - ' + persona.ctra_nombre + ';';
		}

		let arrayDatosTrabajo = stringDatos.split(";");

		return { arrayDatosTrabajo, personas };
	}

	async function inicializarAutocompletadoTrabajo() {
		const { arrayDatosTrabajo, personas } = await autocompletarTrabajo();

		const autoCompleteTrabajo = new autoComplete({
			selector: "#autoCompletenone",
			placeHolder: "Búsqueda por clave o nombre",
			data: {
				src: arrayDatosTrabajo,
				cache: true,
			},
			resultItem: {
				highlight: true,
			},
			events: {
				input: {
					selection: (event) => {
						const selection = event.detail.selection.value;
						const values = selection.split(' - ');

						// Asignar el valor del ID correspondiente a la clave seleccionada
						const selectedPersona = personas.find(persona => persona.ctra_clave === values[0]);
						if (selectedPersona) {
							document.getElementById('ctra_id').value = selectedPersona.ctra_id;
							idCentroTrabajo = selectedPersona.ctra_id; // Asignar el valor a ctraIdGlobal
						}

						if (values.length === 3) {
							autoCompleteTrabajo.input.value = selection;
							document.getElementById('otroInputc').value = selection; // Cambiado aquí
						} else {
							autoCompleteTrabajo.input.value = selection;
							document.getElementById('otroInputc').value = selection; // Cambiado aquí
						}
					},
				},
			},
		});
	}

	inicializarAutocompletadoTrabajo();
});




// /*SE EMPIEZA A LLENAR Y A FUNCIONAR OS BOTONES INDEPENDIENTES PARA ACTIVAAR UN SEGUNDO MODAL  */
document.getElementById('btnsiguientectra').addEventListener('click', function() {

	// INICIO Validacion (Servicio)
	const opcionesModalSelect = document.getElementById('opcionesModal');
	const selectedOption = opcionesModalSelect.value;

	if (!selectedOption) {

		swal({
			title: 'Error',
			text: 'Completar los campos faltantes',
			icon: 'error',
			button: 'Aceptar',
		});
		return;
	}
	// FIN Validacion (Servicio)

	/*alert("si entro aquí a leer el SessionStorage");*/
	const valorObtenido = sessionStorage.getItem('ctroDist');

	if (valorObtenido) {
		var valores = valorObtenido.split("|");
		/*alert('id: ' + valores[0]);
		alert('clave: ' + valores[1]);
		alert('descripcion: ' + valores[2]);*/

		document.getElementById('autoCompletenone').value = valores[1] + ' - ' + valores[2];
		document.getElementById('otroInputc').value = valores[1] + ' - ' + valores[2];
		document.getElementById('ctra_id').value = valores[0];

		idCentroTrabajo = valores[0];

		sessionStorage.removeItem('ctroDist');
		/*alert('sessionStorage borrado');*/

		$('#miModal').modal('hide');
	}
});


const btnSiguiente = document.getElementById('btnsiguientectra');


const btnGuardars = document.getElementById('nuevoBoton');
btnGuardars.disabled = true;

btnSiguiente.addEventListener('click', () => {



	const opcionesModalSelect = document.getElementById('opcionesModal');
	const selectedOption = opcionesModalSelect.value;

	if (selectedOption) {
		habilitarBtnGuardars();
	} else {
		btnGuardars.disabled = true;
	}
});

function habilitarBtnGuardars() {
	btnGuardars.disabled = false;
}


btnSiguiente.addEventListener('click', () => {

	const opcionesModalSelect = document.getElementById('opcionesModal');
	const selectedOption = opcionesModalSelect.value;

	/*function mostrarAlerta(mensaje) {
	
		const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgIcon.setAttribute("width", "20");
		svgIcon.setAttribute("height", "20");
		svgIcon.setAttribute("fill", "currentColor");
		svgIcon.setAttribute("class", "bi bi-exclamation-circle");
		svgIcon.setAttribute("viewBox", "0 0 16 16");
	
	  
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.93 11.524a.818.818 0 1 1-1.647 0 .818.818 0 0 1 1.647 0zM8.018 4.5a.57.57 0 0 1 .567.543l.03 4.414a.57.57 0 1 1-1.138.057l-.03-4.414a.57.57 0 0 1 .57-.6zM8 12a.818.818 0 1 1 0-1.637A.818.818 0 0 1 8 12z");
	
	  
		svgIcon.appendChild(path);
	
		customAlert.innerHTML = '';
	
		const mensajeElemento = document.createElement("span");
		mensajeElemento.innerText = mensaje;
		customAlert.appendChild(mensajeElemento);
	
		customAlert.appendChild(svgIcon);
	
		customAlert.style.display = 'flex';
		customAlert.style.alignItems = 'center';
		customAlert.style.justifyContent = 'space-between';
	}
	
	// Llamada a la función mostrarAlerta si no se selecciona una 	opción
	if (!selectedOption) {
		mostrarAlerta('Por favor, selecciona una opción.');
		return;
	}*/


	const estadoModalSelect = document.getElementById('estadoModal');
	const selectedStateText = estadoModalSelect.options[estadoModalSelect.selectedIndex].innerText;

	const municipioModalSelect = document.getElementById('municipioModal');
	const selectesdtateText = municipioModalSelect.options[municipioModalSelect.selectedIndex].innerText;



	const calleModalInput = document.getElementById('calleModal').value;
	const localidadModalInput = document.getElementById('localidadModal').value;
	const coloniaModalInput = document.getElementById('coloniaModal').value;
	const exteriorModalInput = document.getElementById('exteriorModal').value;
	const interiorModalInput = document.getElementById('interiorModal').value;
	const calleunoModalInput = document.getElementById('calleunoModal').value;
	const calledosModalInput = document.getElementById('calledosModal').value;



	const nuevoModalBody = document.querySelector('#nuevoModal .modal-body');
	nuevoModalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="centroInput">Centro:</label>
            <input type="text" id="centroInput" value="${selectedOption}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="estadoInput">Estado:</label>
            <input type="text" id="estadoInput" value="${selectedStateText}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="municipioInput">Municipio:</label>
            <input type="text" id="municipioInput" value="${selectesdtateText}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="calleInput">Calle:</label>
            <input type="text" id="calleInput" value="${calleModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="coloniaInput">Colonia:</label>
            <input type="text" id="coloniaInput" value="${coloniaModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="localidadInput">Localidad:</label>
            <input type="text" id="localidadInput" value="${localidadModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="exteriorInput">No. Exterior:</label>
            <input type="text" id="exteriorInput" value="${exteriorModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="interiorInput">No. Interior:</label>
            <input type="text" id="interiorInput" value="${interiorModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="calleUnoInput">Entre Calle Uno:</label>
            <input type="text" id="calleUnoInput" value="${calleunoModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="calleDosInput">Entre Calle Dos:</label>
            <input type="text" id="calleDosInput" value="${calledosModalInput}" disabled>
        </div>
        <!-- Agrega más campos de entrada según tus necesidades -->
    </div>
`;


	/*   // Mostrar el segundo modal
	   $('#nuevoModal').modal('show');*/
});


/*FUNCIONALIDAD PARA CTRA DE TRABAJO Y CDIS DISTRIBUCION*/
/*IVAN RODRIGUEZ 27 DE NOVIEMBRE DE 2023*/
document.addEventListener("DOMContentLoaded", function() {
	let cdisIdVariable = ''; // Declara la variable fuera del alcance de la función autocompletarDistribucion

	async function autocompletarDistribucion() {
		const request = await fetch("api/persona/Obtenerdistribucion/", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const personas = await request.json();
		let stringDatos = "";
		for (let persona of personas) {
			stringDatos += persona.cdis_clave + ' - ' + persona.cdis_nombre + ';';
		}
		let arrayDatos = stringDatos.split(";");

		return { arrayDatos, personas };
	}

	async function inicializarAutocompletadoDistribucion() {
		const { arrayDatos, personas } = await autocompletarDistribucion();

		const autoCompleteJS = new autoComplete({
			selector: "#autoCompleteuno",
			placeHolder: "Búsqueda por clave o nombre",
			data: {
				src: arrayDatos,
				cache: true,
			},
			resultItem: {
				highlight: true,
			},
			events: {
				input: {
					selection: (event) => {
						const selection = event.detail.selection.value;
						const values = selection.split(' - ');

						// Asignar el valor del ID correspondiente a la clave seleccionada
						const selectedPersona = personas.find(persona => persona.cdis_clave === values[0]);
						if (selectedPersona) {
							idCentroDistribucion = selectedPersona.cdis_id;
						}
						autoCompleteJS.input.value = selection;
						document.getElementById('otroInput').value = selection;
					},
				},
			},
		});
	}

	inicializarAutocompletadoDistribucion();
});



const siguienteBtnDistribucion = document.getElementById('btnsiguientedist');
siguienteBtnDistribucion.addEventListener('click', () => {
	const campo1 = document.getElementById('estadoModalDistribucion'); // Reemplaza 'campo1' con el ID de tu primer campo
	const campo2 = document.getElementById('opcionesModal'); // Reemplaza 'campo2' con el ID de tu segundo campo

	if (!campo1.value.trim() || !campo2.value.trim()) {

		('customAlert2', 'Por favor, completa todos los campos.');
	} else {
		// Aquí iría el resto de tu lógica si los campos no están vacíos
	}
});

function mostrarAlerta(idAlerta, mensaje) {
	const customAlert = document.getElementById(idAlerta);
	const alertMessage = customAlert.querySelector('span');
	alertMessage.innerText = mensaje;
	customAlert.style.display = 'block';
}
const customAlert = document.getElementById('customAlert');

const otroInput = document.getElementById('otroInput');
const autoCompleteuno = document.getElementById('autoCompleteuno');
const valorIDdist = document.getElementById('cdis_id');


siguienteBtnDistribucion.addEventListener('click', () => {
	const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
	const selectedOption = opcionesModalSelect.value;

	if (!selectedOption) {
		swal({
			title: 'Error',
			text: 'Completar los campos faltantes',
			icon: 'error',
			button: 'Aceptar',
		});
		return;
	}

	const selectedText = opcionesModalSelect.querySelector(`option[value="${selectedOption}"]`).innerText;
	const concatenatedText = ` ${selectedText}`;
	otroInput.value = concatenatedText;
	autoCompleteuno.value = concatenatedText;
	const cdis_id = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].value;
	valorIDdist.value = cdis_id || '';
	idCentroDistribucion = valorIDdist.value;
	habilitarBtnGuardar();

	$('#miModaldist').modal('hide');
	hideAlert();
});




function hideAlert() {
	customAlert.style.display = 'none';
}

opcionesModalSelect.addEventListener('change', hideAlert);


const btnGuardar = document.getElementById('btnver');
btnGuardar.disabled = true;

function habilitarBtnGuardar() {
	btnGuardar.disabled = false;
}


btnGuardar.addEventListener('click', () => {

	const tablaDatos = document.createElement('table');
	tablaDatos.classList.add('table');



	const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
	const estadoModalSelect = document.getElementById('estadoModalDistribucion');


	const selectedOptionText = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].innerText;
	const selectedStateText = estadoModalSelect.options[estadoModalSelect.selectedIndex].innerText;


	const selectedUnidad = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].getAttribute('data-cdis-unidad');

	const modal2Body = document.querySelector('#miModal2 .modal-body');
	modal2Body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 15px;">
        <div>
            <label for="centroInput" style="display: block;">CENTRO DE DISTRIBUCIÓN:</label>
            <input type="text" id="centroInput" value="${selectedOptionText}" style="width: 100%; padding: 8px;" disabled>
        </div>
        <div>
            <label for="estadoInput" style="display: block;">ESTADO DE CENTRO DE DISTRIBUCION:</label>
            <input type="text" id="estadoInput" value="${selectedStateText}" style="width: 100%; padding: 8px;" disabled>
        </div>
        <div>
            <label for="unidadInput" style="display: block;">UNIDAD DE CENTRO:</label>
            <input type="text" id="unidadInput" value="${selectedUnidad}" style="width: 100%; padding: 8px;" disabled>
        </div>
    </div>
`;
	const estadoModalInput = document.getElementById('estado_modal');
	estadoModalInput.value = selectedStateText;


	const unidadModalInput = document.getElementById('unidad_modal');
	unidadModalInput.value = selectedUnidad;


	$('#miModaldist').modal('hide');


	$('#miModal2').modal('show');
});

// =====================================================================================================
// 										INICIO CODIGO DANIEL
// =====================================================================================================

// INICIO bloquear y agregr input-valid a los inputs
function desbloquearInputs() {

	const inputId = ['nuevaBusqueda', 'habilitarPlazaPadre', 'habilitarCodigoIR', 'habilitarEstatusOcupacional', 'habilitarSituacionPlaza', 'habilitarMotivosDeObli', 'habilitarAreas', 'habilitarContratacionesPub', 'habilitarTramiteClapp', 'habilitarTramiteEbi', 'habilitarTramiteAedmajr', 'habilitarNivelEq', 'habilitarRfi', 'habilitarTipoSerPub', 'btnGuardarCambios', 'btnCancelar', 'btnUCTD', 'btnModCtrTrab', 'btnModCtrDist', 'btnPA', 'btnPP'];

	inputId.forEach(id => {
		const boton = document.getElementById(id);

		$('#seleccion').prop('disabled', true);
		$('#autoCompleteNumPlaza').prop('disabled', true);

		if (boton) {
			boton.disabled = false;
		}
	});
}
// FIN bloquear y agregr input-valid a los inputs

// INICIO convertir en mayusculas todas las letras (servicio)
const idInputsUpperCase = [
	"TipoSerPub",
	"Areas",
	"ContratacionesPublicas",
	"tramiteCLAPP",
	"TramiteEBI"
];

for (const inputId of idInputsUpperCase) {
	const input = document.getElementById(inputId);
	input.addEventListener("input", function() {
		input.value = input.value.toUpperCase();
	});
}
// FIN convertir en mayusculas todas las letras (servicio)

// INICIO validacion de solo numeros (servio)
function validarNumeros(input) {
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
	input.value = soloNumeros;
}
// FIN validacion de solo numeros (servio)

// INICIO validacion de solo numeros RFI (servio)
function validarNumerosRFI(input) {
	var valor = input.value.trim();
	var soloNumeros = valor.replace(/[^\d-]/g, '');

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
	input.value = soloNumeros;
}
// FIN validacion de solo numeros RFI (servio)

// INICIO funcion para llenar y seleccionar automaticamente los select (servicio)
async function opcionesPlaza() {
	const request = await fetch("api/plaza/detallesPlaza/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const detalle_plaza = await request.json();

	// INICIO captura de datos tipo texto Servicio
//	$("#EstatusOcupàcional").change(function() {
//		//EstatusOcupàcional = $(this).find(":selected").text();
//		EstatusOcupàcional = document.getElementById("EstatusOcupàcional").options[document.getElementById("EstatusOcupàcional").selectedIndex].getAttribute("value");
//	});

	$("#MotivosDeObligacion").change(function() {
		//MotivosDeObligacion = $(this).find(":selected").text();
		MotivosDeObligacion = document.getElementById("MotivosDeObligacion").options[document.getElementById("MotivosDeObligacion").selectedIndex].getAttribute("value");
	});

	$("#TramiteAEDMAJR").change(function() {
		//TramiteAEDMAJR = $(this).find(":selected").text();
		TramiteAEDMAJR = document.getElementById("TramiteAEDMAJR").options[document.getElementById("TramiteAEDMAJR").selectedIndex].getAttribute("value");
	});

	$("#NivelEquivalencia").change(function() {
		//NivelEquivalencia = $(this).find(":selected").text();
		NivelEquivalencia = document.getElementById("NivelEquivalencia").options[document.getElementById("NivelEquivalencia").selectedIndex].getAttribute("value");
	});
	// FIN captura de datos tipo texto Servicio

	//for (var i = 0; i < detalle_plaza.length; i++) {
	for (let detalle of detalle_plaza) {

		// estatus ocupacional

//		if (detalle.lplz_clase == 1) {
//			$("#EstatusOcupàcional").append(
//				"<option value='" +
//				detalle.lplz_id +
//				"'" +
//				(detalle.lplz_descripcion.trim() === globalEstatusOcupacional ? " selected" : "") +
//				">" +
//				detalle.lplz_descripcion +
//				"</option>"
//			);
//		}

		//  Motivos de Obligación de Declaración Patrimonial

		if (detalle.lplz_clase == 2) {
			$("#MotivosDeObligacion").append(
				"<option value='" +
				detalle.lplz_id +
				"'" +
				(detalle.lplz_descripcion.trim() === globalMotivosDeObligacion ? " selected" : "") +
				">" +
				detalle.lplz_descripcion +
				"</option>"
			);
		}

		//  ASIGNACION Y EMISION DE DICTAMENES EN MATERIA DE AVALUOS Y JUSTIPRECIACION DE RENTAS

		if (detalle.lplz_clase == 7) {
			$("#TramiteAEDMAJR").append(
				"<option value='" +
				detalle.lplz_id +
				"'" +
				(detalle.lplz_descripcion.trim() === globalTramiteAEDMAJR ? " selected" : "") +
				">" +
				detalle.lplz_descripcion +
				"</option>"
			);
		}

		// Nivel de equivalencia

		if (detalle.lplz_clase == 8) {
			$("#NivelEquivalencia").append(
				"<option value='" +
				detalle.lplz_id +
				"'" +
				(detalle.lplz_descripcion.trim() === globalNivelEquivalencia ? " selected" : "") +
				">" +
				detalle.lplz_descripcion +
				"</option>"
			);
		}
	}
}
// FIN funcion para llenar y seleccionar automaticamente los select (servicio)

// INICIO funcion para obtener los datos para luego comprarlos
function obtenerDatos() {

	let inpNumeroPlaza = document.getElementById("numeroPlaza").value;
	let inpNumeroPlazaPadre = document.getElementById("numeroPlazaPadre").value;
	let inpCodigoIR = document.getElementById("codigoIR").value;
	let inpAreas = document.getElementById("Areas").value;
	let inpContratacionesPublicas = document.getElementById("ContratacionesPublicas").value;
	let inpTramiteCLAPP = document.getElementById("tramiteCLAPP").value;
	let inpTramiteEBI = document.getElementById("TramiteEBI").value;
	let inpRFI = document.getElementById("RFI").value;
	let inpTipoSerPub = document.getElementById("TipoSerPub").value;

	return {
		plz_numero: inpNumeroPlaza,
		plz_numplzpadre: inpNumeroPlazaPadre,
		plz_codintrhnet: inpCodigoIR,
		plz_estatusocup: idEstatusOcupacional,
		plz_situacion: idSituacion,
		plz_motoblidecpatri: idMotivosDeObligacion,
		plz_areas: inpAreas,
		plz_conpublicas: inpContratacionesPublicas,
		plz_traclap: inpTramiteCLAPP,
		plz_traebi: inpTramiteEBI,
		plz_traemdmajr: idTramiteAEDMAJR,
		plz_nivelequiv: idNivelEquivalencia,
		plz_rfiriuf: inpRFI,
		plz_tiposervpublico: inpTipoSerPub,
		plz_unidad: idUnidad,
		plz_centrodist: idCentroDistribucion,
		plz_centrotrabajo: idCentroTrabajo,
		plz_ptoautorizado: idPuestoAutorizado,
		plz_ptopagado: idPuestoPagado
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
	datosFinales = JSON.stringify(obtenerDatos());

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

// INICIO funcion para eliminar los input-invalid de los input y selects
const idInputsInvalid = [
	"numeroPlazaPadre",
	"codigoIR",
	"Areas",
	"ContratacionesPublicas",
	"tramiteCLAPP",
	"TramiteEBI",
	"RFI",
	"TipoSerPub"
];

for (const inputsId of idInputsInvalid) {
	const input = document.getElementById(inputsId);
	input.addEventListener("input", function() {
		input.classList.remove('input-invalid');
	});
}
// FIN funcion para eliminar los input-invalid de los input y selects

// INICIO funcion para guardar los seleccion con change
function guardarSelects() {

//	const estatusOcupacionalSelect = $('#EstatusOcupàcional');
	const motivosDeObligacionSelect = $('#MotivosDeObligacion');
	const tramiteAEDMAJRSelect = $('#TramiteAEDMAJR');
	const nivelEquivalenciaSelect = $('#NivelEquivalencia');

//	estatusOcupacionalSelect.on('change', async function() {
//		idEstatusOcupacional = $(this).val();
//	});

	motivosDeObligacionSelect.on('change', async function() {
		idMotivosDeObligacion = $(this).val();
	});

	tramiteAEDMAJRSelect.on('change', async function() {
		idTramiteAEDMAJR = $(this).val();
	});

	nivelEquivalenciaSelect.on('change', async function() {
		idNivelEquivalencia = $(this).val();
	});
}
guardarSelects();
// FIN funcion para guardar los seleccion con change

// INICIO funcion para guardar y conexion de API para subir a BD
function guardarConfiguracion() {

	const arrayInputs = [
		{ id: "codigoIR", mensage: "Por favor, no deje el campo Código Inteligente Rhnet vacío." },
		{ id: "Areas", mensage: "Por favor, no deje el campo Áreas vacío" },
		{ id: "ContratacionesPublicas", mensage: "Por favor, no deje el campo Contrataciones Públicas vacío." },
		{ id: "tramiteCLAPP", mensage: "Por favor, no deje el campo Trámite de C.L.A.P.P. vacío" },
		{ id: "TramiteEBI", mensage: "Por favor, no deje el campo Trámite de E.B.I. vacío" },
		{ id: "RFI", mensage: "Por favor, no deje el campo RFI_RIUF vacío." },
		{ id: "TipoSerPub", mensage: "Por favor, no deje el campo Tipo de Servidor Público vacío." }
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

	let inpNumeroPlaza = document.getElementById("numeroPlaza").value;
	let inpNumeroPlazaPadre = document.getElementById("numeroPlazaPadre").value;
	let inpCodigoIR = document.getElementById("codigoIR").value;
	let inpAreas = document.getElementById("Areas").value;
	let inpContratacionesPublicas = document.getElementById("ContratacionesPublicas").value;
	let inpTramiteCLAPP = document.getElementById("tramiteCLAPP").value;
	let inpTramiteEBI = document.getElementById("TramiteEBI").value;
	let inpRFI = document.getElementById("RFI").value;
	let inpTipoSerPub = document.getElementById("TipoSerPub").value;
	let inpFechaModificacion = document.getElementById("inpFechaModificacion").value;
	let fechaTermino = document.getElementById("inpFechaTermino").value;
	let inpUsuarioModifico = sessionStorage.idUsuario;
	
	if(idSituacion === 2){
		fechaTermino = inpFechaModificacion
	}else if(idSituacion === 1){
		fechaTermino = "";
	}

	let data = {
		plz_numero: inpNumeroPlaza,
		plz_numplzpadre: inpNumeroPlazaPadre,
		plz_codintrhnet: inpCodigoIR,
		plz_estatusocup: idEstatusOcupacional,
		plz_motoblidecpatri: idMotivosDeObligacion,
		plz_areas: inpAreas,
		plz_conpublicas: inpContratacionesPublicas,
		plz_traclap: inpTramiteCLAPP,
		plz_traebi: inpTramiteEBI,
		plz_traemdmajr: idTramiteAEDMAJR,
		plz_nivelequiv: idNivelEquivalencia,
		plz_rfiriuf: inpRFI,
		plz_tiposervpublico: inpTipoSerPub,
		plz_unidad: idUnidad,
		plz_centrodist: idCentroDistribucion,
		plz_centrotrabajo: idCentroTrabajo,
		plz_ptoautorizado: idPuestoAutorizado,
		plz_ptopagado: idPuestoPagado,
		
		plz_fechainicio: fechaInicio,
		plz_fechatermino: fechaTermino,
		plz_usucapturo: usuarioCapturo,
		plz_fechamod: inpFechaModificacion,
		plz_usumodifico: inpUsuarioModifico,
		plz_situacion: idSituacion
	};

	let datosPlazaModificarJson = JSON.stringify(data);

	let url = "api/plaza/modificar/subir/datos";

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

// INICIO funcion del boton guardar
btnGuardarCambios.addEventListener('click', function() {
	compararDatos();
});
// FIN funcion del boton guardar

// INICIO llenar los datos de control
function datosControl() {
	$("#inpUsuarioModifico").val(sessionStorage.nombre);
	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#inpFechaModificacion").val(fechaHoy);
}
	// FIN llenar los datos de control