$(function() {
	MostrarPagina(6);
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
		swal({
		  title: "Error al buscar usuario",
		  text: "Contacte al administrador del sistema",
		  icon: "error",
		  button: "Cerrar",
		});
		return;
	}
	
	$('#usu_id').val(respuesta[0][0]);
	$('#usu_alias').val(respuesta[0][1]);
	$('#usu_usuario').val(respuesta[0][2]);
	$('#mostrar_rol').val(respuesta[0][4]);
	$('#mostrar_situacion').val(respuesta[0][13]);
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
	
	HabilitarBoton('botonModificar');
	HabilitarBoton('botonLimpiarCaptura');
}

function HabilitarInputs() {
	// Get the form element
	let form = document.getElementById("formulario");

	// Iterate through form elements
	for (let i = 0; i < form.elements.length; i++) {
		let element = form.elements[i];

		// Check if the element has a 'disabled' attribute
		if (element.getAttribute("disabled") !== null) {
			// Remove the 'disabled' attribute
			element.removeAttribute("disabled");
		}
	}
	
	switch ($('#mostrar_rol').val()) {
		case 'ADMINISTRADOR':
			$("#usu_administrador").val('1'); 
			break;
		case 'USUARIO':
			$("#usu_administrador").val('2'); 
			break;
	}
	
	switch ($('#mostrar_situacion').val()) {
		case 'ACTIVO':
			$("#usu_situacion").val('1'); 
			break;
		case 'INACTIVO':
			$("#usu_situacion").val('0');
			break;
	}
	
	$("#usu_fechainicio").val($("#fechainicioUno").val());
	$("#usu_fechatermino").val($("#fechaTermino").val());
	
	HabilitarBoton('botonActualizar');
	$("#div_mostrar_rol").prop("hidden", true);
	$("#select_usu_administrador").prop("hidden", false);
	$("#div_mostrar_situacion").prop("hidden", true);
	$("#select_usu_situacion").prop("hidden", false);
	$("#div_usu_fechainicio").prop("hidden", false);
	$("#div_usu_fechatermino").prop("hidden", false);
	$("#autoComplete").prop("disabled", true);
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
			element.val('');
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
		
		} else if (elementType === 'radio' || elementType === 'checkbox') {
			element.prop('checked', false);
			
		} else if (element.is('select')) {
			element.prop('selectedIndex', 0);
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
		}
	});
	
	$('#datosDeControl :input').each(function() {
		const element = $(this);
		const elementType = element.attr('type');

		if (elementType === 'text' || elementType === 'number' || elementType === 'password'
			|| elementType === 'hidden' || elementType === 'date') {
			element.val('');
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
			
		} else if (elementType === 'radio' || elementType === 'checkbox') {
			element.prop('checked', false);
			
		} else if (element.is('select')) {
			element.prop('selectedIndex', 0);
			$(element).css("border-color", "");
			$(element).prop("disabled", true);
		}
	});
	
	document.getElementById('autoComplete').value = '';
	document.getElementById('nombreEmpleado').value = '';
	$("#autoComplete").prop("disabled", false);
	$("#botonLimpiarCaptura").prop("disabled", true);
	$("#botonActualizar").prop("disabled", true);
	$("#botonModificar").prop("disabled", true);
	$("#div_mostrar_rol").prop("hidden", false);
	$("#select_usu_administrador").prop("hidden", true);
	$("#div_mostrar_situacion").prop("hidden", false);
	$("#select_usu_situacion").prop("hidden", true);
	$("#div_usu_fechainicio").prop("hidden", true);
	$("#div_usu_fechatermino").prop("hidden", true);
	$("#divFechaTerminoLlena").prop("hidden", false);
	$("#divFechaTerminoVacia").prop("hidden", true);
	$("#fechaTerminoVacia").val("N/A");
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

function ValidarContrasena(password, confirmar_password) {
	const inputPassword = document.getElementById("password");
	const inputConfirmarPassword = document.getElementById("confirmar_password");
	
	if (password !== confirmar_password) {
		swal({
			title: "Las contraseñas no coinciden",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}

	// Check if the password is at least 8 characters long
	if (password.length < 8) {
		swal({
			title: "La contraseña debe tener mínimo 8 caracteres",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}

	if (password.length > 15) {
		swal({
			title: "La contraseña debe tener máximo 15 caracteres",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}

	// Check if the password contains at least one special character
	if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
		swal({
			title: "La contraseña debe tener mínimo un caracter especial",
			text: "Por ejemplo: $.-*!\"",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}

	// Check if the password contains at least one number
	if (!/\d/.test(password)) {
		swal({
			title: "La contraseña debe tener mínimo un número",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}

	// Check if the password contains at least one uppercase letter
	if (!/[A-Z]/.test(password)) {
		swal({
			title: "La contraseña debe tener mínimo una letra mayúscula",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}

	// Check if the password contains at least one lowercase letter
	if (!/[a-z]/.test(password)) {
		swal({
			title: "La contraseña debe tener mínimo una letra minúscula",
			text: "Por favor intente nuevamente",
			icon: "error",
			button: "Cerrar",
		});
		inputPassword.style.borderColor = "red";
		inputConfirmarPassword.style.borderColor = "red";
		return false;
	}
	
	// If all checks pass, the password is valid
	inputPassword.style.borderColor = "";
	inputConfirmarPassword.style.borderColor = "";
	return true;
}

function ValidarFormulario() {
  // Get the form element by its ID
  const form = document.getElementById("formulario");
  let valid = true;

  // Loop through the form's input fields and select elements
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];

	if (element.id == "usu_fechatermino") {
		continue;
	}

    // Check if it's an INPUT element
    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA"
    	|| element.tagName === "SELECT") {
      // Check if the input value is empty
      if (element.value.trim() === "") {
        valid = false;
        element.style.borderColor = "red"; // Highlight empty input
      } else {
        element.style.borderColor = ""; // Reset border color
      }
    }
  }
  return valid;
}

async function actualizarUsuario() {
	
	if (!ValidarFormulario()) {
		swal({
			title: "Rellene los campos marcados en rojo",
			text: "",
			icon: "error",
			button: "Cerrar",
		});
		return;
	}
	
	let datos = {};

	let password = '', confirmar_password = '';

	// Obtiene los id's de los inputs del bloque con id 'formulario'
	$('#formulario :input').each(function() {
		const element = $(this);

		switch (element.attr('id')) {
			case 'usu_id':
				datos.usu_id = $.trim(element.val());
				break;
			case 'usu_alias':
				datos.usu_alias = $.trim(element.val());
				break;
			case 'usu_usuario':
				datos.usu_usuario = $.trim(element.val());
				break;
			case 'password':
				password = $.trim(element.val());
				break;
			case 'confirmar_password':
				confirmar_password = $.trim(element.val());
				break;
			case 'usu_administrador':
				datos.usu_administrador = $.trim(element.val());
				break;
			case 'usu_situacion':
				datos.usu_situacion = $.trim(element.val());
				break;
			case 'usu_fechainicio':
				datos.usu_fechainicio = $.trim(element.val());
				break;
			case 'usu_fechatermino':
				if (datos.usu_fechatermino != "") {
					datos.usu_fechatermino = $.trim(element.val());
				}
				break;
		}
	});
	
	if (ValidarContrasena(password, confirmar_password)) {
		
		datos.usu_passoriginal = password;
		datos.usu_password = password;
		datos.usu_usucapturo = sessionStorage.idUsuario;
		datos.usu_usumodifico = sessionStorage.idUsuario;
		
		const request = await fetch('api/usuario/actualizar', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(datos)
		});

		const respuesta = await request.text();

		if (respuesta === "OK") {
			swal({
				title: "El usuario se ha actualizado correctamente",
				text: "",
				icon: "success",
				button: "Cerrar",
			});
			
			$('#formulario :input').each(function() {
				const element = $(this);
				const elementType = element.attr('type');

				if (elementType === 'text' || elementType === 'number' || elementType === 'password'
					|| elementType === 'hidden' || elementType === 'date') {
					$(element).css("border-color", "");
					$(element).prop("disabled", true);
				} else if (element.is('select')) {
					$(element).css("border-color", "");
					$(element).prop("disabled", true);
				}
			});

		} else {
			swal({
				title: "Error al modificar el usuario",
				text: "Consulte al administrador del sistema",
				icon: "error",
				button: "Cerrar",
			});
			
			$('#formulario :input').each(function() {
				const element = $(this);
				const elementType = element.attr('type');

				if (elementType === 'text' || elementType === 'number' || elementType === 'password'
					|| elementType === 'hidden' || elementType === 'date') {
					$(element).css("border-color", "");
					$(element).prop("disabled", true);
				} else if (element.is('select')) {
					$(element).css("border-color", "");
					$(element).prop("disabled", true);
				}
			});
		}
	}
}
