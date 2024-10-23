

// INICIO variables globales
let idPersona = null;
let idPlaza = null;
let nombre;
let apellido_pat;
let apellido_mat;
let curp;
let numEmpleado;
let nivelPagado;
// FIN variables globales

/* ================================ INICIO PESTAÑA PLAZA/UNIDAD/PUESTO ================================ */

// INICIO autocomplete para Numplaza
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
// FIN autocomplete para Numplaza

// INICIO traer APIS de plaza, puesto pagado y puesto autorizado
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
			const datosApiPlaza = resultados[0];

			if (datosApiPlaza.data[0][33] !== 1) {
				swal({
					title: "La plaza se ha dado de baja",
					text: "No hay datos disponibles",
					icon: 'error',
					button: 'Aceptar'
				});
				return;
			} 
			
			if (datosApiPlaza.data[0][3] == 1) {
				swal({
					title: "La plaza ya se encuentra Ocupada",
					text: "Esta acción no se puede realizar",
					icon: 'error',
					button: 'Aceptar'
				});
				return;
			} else {
				const puestoPagado = resultados[1];
				const puestoAutorizado = resultados[2];
				llenarTodosLosCampos(datosApiPlaza, puestoPagado, puestoAutorizado);
			}

			var numPlaza = document.getElementById("autoCompleteNumPlaza");
			var valor = numPlaza.value;
		
			agregarValorAlInput("numeroPlaza", valor);
			numPlaza.value = "";
			datosControl();

		})
		.catch(error => {
			// Manejar errores generales
			swal({
				title: "Error al obtener datos de las API",
				text: "Asegúrese de que el código sea correcto",
				icon: 'error',
				button: 'Aceptar'
			});
			return;
		});
}
// FIN traer APIS de plaza, puesto pagado y puesto autorizado

// INICIO llenar los inputs 
function llenarTodosLosCampos(datosApiPlaza, datosPuestoPagado, datosPuestoAutorizado) {
	
	nivelPagado = datosPuestoPagado.data[0][5];
	idPlaza = datosApiPlaza.data[0][34];

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

	if (situacion === 1) {
		inputSituacion.value = 'ACTIVO';
	} else if (situacion === 2) {
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

	$('#btnBuscarPlaza').prop('disabled', true);
	$('#btnHabilitarBusqueda').prop('disabled', false);
	$('#autoCompleteNumPlaza').prop('disabled', true);

}
// FIN llenar los inputs 

// INICIO para agregar un nuevo valor a un elemento de entrada HTML
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
// FIN para agregar un nuevo valor a un elemento de entrada HTML

// INICIO funcion de boton buscar plaza
btnBuscarPlaza.addEventListener("click", function() {

	var numPlaza = document.getElementById("autoCompleteNumPlaza");
	var valor = numPlaza.value;

	obtenerInfoPlaza(valor);

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

/* ================================ FIN PESTAÑA PLAZA/UNIDAD/PUESTO ================================ */

/* ================================ INICIO PESTAÑA PERSONA ================================ */

// INICIO funcion para llamar a la API persona
async function autocompletarPersona() {
	const request = await fetch('api/personas/id/curp/nombre/apellidos/numempleado', {
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
					nombre = `${selectedPerson[2]}`;
					apellido_pat = `${selectedPerson[3]}`;
					apellido_mat = `${selectedPerson[4]}`;
					numEmpleado = selectedPerson[5];
					idPersona = idMap[selection];
				}
			}
		}
	});
}
iniciarAutoComplete();
// FIN funcion para busacar una persona por su CURP o Nombre en el inpBuscar


// INICIO funcion para llenar los inputs
function llenarInputsPersona() {

	// Obtener el valor del input por medio de su id
	var inputData = document.getElementById("inpBuscar").value;

	// Dividir los datos por guion medio
	var datosDivididos = inputData.split("-");

	if (idPersona === null) { // INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	}

	document.getElementById('inpBuscar').value = '';
	document.getElementById('inpCurp').value = curp;
	document.getElementById('inpNombre').value = nombre;
	document.getElementById('inpApellidoPat').value = apellido_pat;
	document.getElementById('inpApellidoMat').value = apellido_mat;
	document.getElementById('inpNumEmpleado').value = numEmpleado;
	document.getElementById('Nivel').value = nivelPagado;

	//desbloquea boton de registro 
	$('#btnLimpiarPersona').prop('disabled', false);
	$('#btnGuardarCambios').prop('disabled', false);
	$('#inpBuscar').prop('disabled', true);
	$('#btnBuscarPersona').prop('disabled', true);
	$('#inpInicioVigencia').prop('disabled', false); 



}
// FIN funcion para llenar los inputs

// INICIO funcion para limpiar los campos de la pestaña Persona
function limpiarInputs() {

	const inputId = ['inpBuscar', 'inpCurp', 'inpNombre', 'inpApellidoPat', 'inpApellidoMat', 'inpNumEmpleado', 'Nivel','inpInicioVigencia','inpFinVigencia'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}
	});

	$('#inpBuscar').prop('disabled', false);
	$('#btnBuscarPersona').prop('disabled', false);
	$('#inpInicioVigencia').prop('disabled', true);
	$('#inpFinVigencia').prop('disabled', true);
	$('#btnLimpiarPersona').prop('disabled', true); 
	$('#btnGuardarCambios').prop('disabled', true); 

	// Desmarca y deshabilita el checkbox
	$('#checkSinVencimiento').prop({
		'checked': false,
		'disabled': true
	});
  

	idPersona = null;

	// Agregar la clase CSS usando la propiedad classList
	document.getElementById("inpBuscar").classList.add("input-valid");

	setTimeout(() => {
		document.getElementById("inpBuscar").classList.remove('input-valid');
	}, 1000);

}
// FIN funcion para limpiar los campos de la pestaña Persona

// INICIO funcion del boton guardar
btnBuscarPersona.addEventListener('click', function() {

	var nivel1Input = document.getElementById("nivel1");
	var valorNivel1 = nivel1Input.value.trim();

	if (valorNivel1 !== "") {

		llenarInputsPersona();
	} else {
		swal({
			title: "Se necesita buscar un número de plaza",
			icon: 'error',
			button: 'Aceptar'
		});
	}



});
// FIN funcion del boton guardar

// INICIO funcion para guardar y subir los datos de Asignar Plaza
function guardarDatos(){

	//validacion de fecha 
	 var fechaVig = document.getElementById('inpInicioVigencia').value;

	 // Verificar si la fecha está vacía
	 if (fechaVig === '') {
		 // Mostrar un mensaje de error utilizando SweetAlert
		 swal("Fecha vacia","Por favor, elije una fecha de inicio","error");
		 return;
	 }
	
	let inpFechaInicio = document.getElementById("inpFechaInicio").value;
	let inpUsuarioCapturo = sessionStorage.idUsuario;
	let inpFechaModificacion = document.getElementById("inpFechaModificacion").value;
	let inpUsuarioModifico = sessionStorage.idUsuario;
	let inpInicioVigencia = document.getElementById("inpInicioVigencia").value;
	let inpFinVigencia = document.getElementById("inpFinVigencia").value;
	let inpSituacion = 1;

	let data = {
		pxp_idplaza: idPlaza,
		pxp_idpersona: idPersona,
		pxp_fechainicio: inpFechaInicio,
		pxp_usucapturo: inpUsuarioCapturo,
		pxp_fechamod: inpFechaModificacion,
		pxp_usumodifico: inpUsuarioModifico,
		pxp_vigdesde: inpInicioVigencia,
		pxp_vighasta: inpFinVigencia,
		pxp_situacion: inpSituacion
	};

	let personaPlazaDatosJson = JSON.stringify(data);

	 let url = "api/snplazapersona/subir/datos/modulo/asignarplazaporpersona";
	
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
// FIN funcion para guardar y subir los datos de Asignar Plaza

/* ================================ FIN PESTAÑA PERSONA ================================ */

/* ================================ INICIO PESTAÑA CONTROL ================================ */

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

/* ================================ FIN PESTAÑA CONTROL ================================ */

function fechaInicio(){
	// Obtener la fecha actual
var fechaActual = new Date();

// Formatear la fecha actual en formato YYYY-MM-DD
var dia = ("0" + fechaActual.getDate()).slice(-2);
var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2);
var hoy = fechaActual.getFullYear() + "-" + mes + "-" + dia;

// Establecer la fecha mínima en el input date
document.getElementById("inpInicioVigencia").min = hoy;
}

fechaInicio();


function fechaFin() {
    // Obtener la fecha de inicio seleccionada por el usuario
    var fechaInicioSeleccionada = new Date(document.getElementById("inpInicioVigencia").value);

    // Clonar la fecha de inicio para calcular la fecha mínima para el input de fecha final
    var fechaMinima = new Date(fechaInicioSeleccionada);

    // Añadir un mes y un día a la fecha mínima
    // fechaMinima.setMonth(fechaMinima.getMonth() + 1);
    fechaMinima.setDate(fechaMinima.getDate() + 2);

    // Obtener el día, mes y año de la fecha mínima
    var diaMinimo = ("0" + fechaMinima.getDate()).slice(-2);
    var mesMinimo = ("0" + (fechaMinima.getMonth() + 1)).slice(-2);
    var anioMinimo = fechaMinima.getFullYear();

    // Formatear la fecha mínima en formato YYYY-MM-DD
    var fechaMinimaFormateada = anioMinimo + "-" + mesMinimo + "-" + diaMinimo;

    // Establecer la fecha mínima en el input de fecha final
    var inpFinVigencia = document.getElementById("inpFinVigencia");
    inpFinVigencia.min = fechaMinimaFormateada;
    inpFinVigencia.disabled = false;

	var checkSinVencimiento = document.getElementById("checkSinVencimiento");
	checkSinVencimiento.disabled = false;

	
}

// Habilitar el input de fecha final después de seleccionar una fecha de inicio
document.getElementById("inpInicioVigencia").addEventListener("change", fechaFin);

// Agregar event listener al input de fecha final para ubicarlo en el primer día permitido
document.getElementById("inpFinVigencia").addEventListener("click", function() {
    // Obtener la fecha mínima permitida
    var fechaMinima = new Date(document.getElementById("inpFinVigencia").min);

    // Establecer el valor del input de fecha final al primer día permitido
    document.getElementById("inpFinVigencia").valueAsDate = fechaMinima;
});

// Agregar event listener al checkbox para desactivar el input de fecha final y establecer fechaVencimiento en null
document.getElementById("checkSinVencimiento").addEventListener("change", function() {
    var inpFinVigencia = document.getElementById("inpFinVigencia");
    if (this.checked) {
        inpFinVigencia.disabled = true;
    } else {
        inpFinVigencia.disabled = false;
    }

	inpFinVigencia.value = null;
});