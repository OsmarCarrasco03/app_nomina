$(function() {
	MostrarPagina(27);
	if (sessionStorage.permisos == 1) {
		$("#datosPersona-tab").prop("hidden", false);

	}
});
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

    // Por defecto, fetch utiliza GET
    const promesaUrl2 = fetch(url2).then(response => response.json());
    const promesaUrl3 = fetch(url3).then(response => response.json());

    Promise.all([promesaUrl1, promesaUrl2, promesaUrl3])
        .then(resultados => {
            if (resultados[0].error) {
                var numPlaza = document.getElementById("numeroPlaza");
                numPlaza.value = "";
                swal({
                    title: "El número de plaza no existe",
                    icon: 'error',
                    button: 'Aceptar'
                });
            } else {
                const datosApiPlaza = resultados[0];
                const datosPuestoPagado = resultados[1];
                const datosPuestoAutorizado = resultados[2];
                llenarTodosLosCampos(datosApiPlaza, datosPuestoPagado, datosPuestoAutorizado);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos de las APIs:', error);
        });
}

function llenarTodosLosCampos(datosApiPlaza, datosPuestoPagado, datosPuestoAutorizado) {
	
	let idPlazaPadre = datosApiPlaza.data[0][1];
	const inputNumPlazPadre = document.getElementById('numeroPlazaPadre');
	if (idPlazaPadre === 0) {
		inputNumPlazPadre.value = "";
	}else{
		agregarValorAlInput("numeroPlazaPadre", datosApiPlaza.data[0][1])
	}

	agregarValorAlInput("codigoIR", datosApiPlaza.data[0][2])
	agregarValorAlInput("EstatusOcupàcional", datosApiPlaza.data[0][4])
	agregarValorAlInput("MotivosDeObligacion", datosApiPlaza.data[0][6])
	agregarValorAlInput("Areas", datosApiPlaza.data[0][7])
	agregarValorAlInput("ContratacionesPublicas", datosApiPlaza.data[0][8])
	agregarValorAlInput("tramiteCLAPP", datosApiPlaza.data[0][9])
	agregarValorAlInput("TramiteEBI", datosApiPlaza.data[0][10])
	agregarValorAlInput("TramiteAEDMAJR", datosApiPlaza.data[0][12])
	agregarValorAlInput("NivelEquivalencia", datosApiPlaza.data[0][14])
	agregarValorAlInput("RFI", datosApiPlaza.data[0][15])
	agregarValorAlInput("TipoSerPub", datosApiPlaza.data[0][16])

	agregarValorAlInput("codigoUnidad", datosApiPlaza.data[0][18])
	agregarValorAlInput("nombreUnidad", datosApiPlaza.data[0][19])
	agregarValorAlInput("CentroTrabajo", datosApiPlaza.data[0][21])
	agregarValorAlInput("CentroDistribucion", datosApiPlaza.data[0][23])

	agregarValorAlInput("inpFechaInicio", datosApiPlaza.data[0][26])
	agregarValorAlInput("inpFechaTermino", datosApiPlaza.data[0][27])
	agregarValorAlInput("inpUsuarioCapturo", datosApiPlaza.data[0][29])
	agregarValorAlInput("inpFechaModificacion", datosApiPlaza.data[0][30])
	agregarValorAlInput("inpUsuarioModifico", datosApiPlaza.data[0][32])

	let situacion = parseInt(datosApiPlaza.data[0][33]);
	const inputSituacion = document.getElementById('inpSituacion');
	const inputSituacionPlaza = document.getElementById('inpSituacionPlaza');

	if (situacion === 1) {
		inputSituacion.value = 'ACTIVO';
		inputSituacionPlaza.value = 'ACTIVO';
	} else if (situacion === 2) {
		inputSituacion.value = 'BAJA';
		inputSituacionPlaza.value = 'BAJA';
	} else {
		inputSituacion.value = '';
		inputSituacionPlaza.value = '';
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

var boton = document.getElementById("seleccion");

boton.addEventListener("click", function() {

	$('#nuevaBusqueda').prop('disabled', false);
	$('#seleccion').prop('disabled', true);
	$('#autoCompleteNumPlaza').prop('disabled', true);
	
	var numPlaza = document.getElementById("autoCompleteNumPlaza");
	var valor = numPlaza.value;

	obtenerInfoPlaza(valor);
	agregarValorAlInput("numeroPlaza", valor);
	numPlaza.value = "";
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
	$('#nuevaBusqueda').prop('disabled', true);
	$('#seleccion').prop('disabled', false);
	$('#autoCompleteNumPlaza').prop('disabled', false);
	limpiarCampos();
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