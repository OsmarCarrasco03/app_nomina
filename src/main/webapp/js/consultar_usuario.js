$(function() {
	MostrarPagina(5);
	if(sessionStorage.permisos == 1){
		$("#datosControl").prop("hidden", false);
	}
});

async function buscarUsuario() {
	const values = document.getElementById('autoComplete').value;
	
	// Split the values by spaces
	const splitValues = values.split('-');
	document.getElementById('nombreEmpleado').value = splitValues[1].trim();
	
	let usuario = {};
	usuario.usu_usuario = splitValues[0].trim();

	let request = await fetch('api/usuario/consultar', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(usuario)
	});

	let respuesta = await request.json();
	
	if (verificarJson1(respuesta)) {
		return swal({
		  title: "Error al buscar usuario",
		  text: "Contacte al administrador del sistema",
		  icon: "error",
		  button: "Cerrar",
		});
	}
	
	$('#usu_alias').val(respuesta[0][1]);
	$('#usu_usuario').val(respuesta[0][2]);
	$('#usu_administrador').val(respuesta[0][4]);
	$('#usu_situacion').val(respuesta[0][13]);
	$('#fechainicioUno').val(respuesta[0][5]);
	$('#usuCapturo').val(respuesta[0][8]);
	$('#fechaCaptura').val(respuesta[0][9]);
	$('#usuModifico').val(respuesta[0][11]);
	
	if (respuesta[0][6] == null) {
		$("#divFechaTerminoLlena").prop("hidden", true);
		$("#divFechaTerminoVacia").prop("hidden", false);
		
	} else {
		$('#fechaTermino').val(respuesta[0][6]);
	}
	
	HabilitarBoton('botonLimpiarCaptura');
}

function HabilitarBoton(idBoton){
	document.getElementById(idBoton).removeAttribute("disabled");
}

function LimpiarCaptura() {
	// Reset all form elements in a form with the ID 'myForm' using jQuery
	$('#formulario :input').each(function() {
		const element = $(this);
		const elementType = element.attr('type');

		if (elementType === 'text' || elementType === 'number' || elementType === 'password'
			|| elementType === 'hidden' || elementType === 'date') {
			element.val(''); // Clear text and number input fields
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
			
		} else if (elementType === 'radio' || elementType === 'checkbox') {
			element.prop('checked', false); // Uncheck radio buttons and checkboxes
			
		} else if (element.is('select')) {
			element.prop('selectedIndex', 0); // Reset the selected index for select elements
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
		}
	});
	
	$('#datosDeControl :input').each(function() {
		const element = $(this);
		const elementType = element.attr('type');

		if (elementType === 'text' || elementType === 'number' || elementType === 'password'
			|| elementType === 'hidden' || elementType === 'date') {
			element.val(''); // Clear text and number input fields
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
			
		} else if (elementType === 'radio' || elementType === 'checkbox') {
			element.prop('checked', false); // Uncheck radio buttons and checkboxes
			
		} else if (element.is('select')) {
			element.prop('selectedIndex', 0); // Reset the selected index for select elements
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
		}
	});
	
	$("#divFechaTerminoLlena").prop("hidden", false);
	$("#divFechaTerminoVacia").prop("hidden", true);
	document.getElementById('fechaTerminoVacia').removeAttribute('value')
	$("#fechaTerminoVacia").val("N/A");
	
	document.getElementById('autoComplete').value = '';
	document.getElementById('nombreEmpleado').value = '';
	$("#botonLimpiarCaptura").prop("disabled", true);
}

let idsPersona = []

async function autocompletarPersona() {
	const request = await fetch('api/usuario/autocompletarUsuario', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const data = await request.json();
	
	if (verificarJson1(data)) {
		swal({
		  title: "Error al obtener autocompletado",
		  text: "Contacte al administrador del sistema",
		  icon: "error",
		  button: "Cerrar",
		});
		return;
	}
	
	let stringDatos = '';

	for (let usuarios of data) {
		stringDatos += usuarios[2] +  ' - ' + usuarios[4] + ' ' + usuarios[5] + ' ' + usuarios[6] + ';';
	}

	let arrayDatos = stringDatos.split(";");
	
	return arrayDatos;
}

async function iniciarAutoComplete() {
	const resultados = await autocompletarPersona();
	const autoCompleteInput = document.getElementById('autoComplete');

	const autoCompleteJS = new autoComplete({
		selector: "#autoComplete",
		placeHolder: "Buscar por Nombre o Usuario",
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

// Llama a la función para iniciar autoComplete
iniciarAutoComplete();

