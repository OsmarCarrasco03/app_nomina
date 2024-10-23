$(function() {
	MostrarPagina(4);
	$('#usu_administrador').prop('selectedIndex', 0);
	$('#usu_situacion').prop('selectedIndex', 0);
});

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


async function RegistrarUsuario() {
	
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

	// Get the IDs of form elements in a form with the ID 'myForm' using jQuery
	$('#formulario :input').each(function() {
		const element = $(this);

		switch (element.attr('id')) {
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

		datos.usu_idpersona = document.getElementById('idPersona').value;
		datos.usu_passoriginal = password;
		datos.usu_password = password;
		datos.usu_usucapturo = sessionStorage.idUsuario;
		datos.usu_usumodifico = sessionStorage.idUsuario;

		request = await fetch('api/usuario/registrar', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(datos)
		});

		respuesta = await request.text();

		if (respuesta != "OK") {
			swal({
				title: "Error al registrar el usuario",
				text: "Consulte a su administrador",
				icon: "error",
				button: "Cerrar",
			});
			return;
		}
		
		swal({
			title: "Usuario registrado correctamente",
			text: "",
			icon: "success",
			button: "Cerrar",
		});
	}
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
	document.getElementById('autoComplete').value = '';
	document.getElementById('nombreEmpleado').value = '';
	$("#botonRegistrar").prop("disabled", true);
	$("#botonLimpiarCaptura").prop("disabled", true);
}

let idsPersona = []

async function autocompletarPersona() {
	const request = await fetch('api/usuario/autocompletarPersona', {
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
		return
	}
	
	let objetosDatos = [];

	for (let item of data) {
		let objeto = {
			per_curp: item[1].split(';'),
			per_nombre: item[2].split(';')

		};
		objetosDatos.push(objeto);
		idsPersona += item[0] + ',' + item[1] + ';';
	}
	return objetosDatos;
}

async function iniciarAutoComplete() {
	const resultados = await autocompletarPersona();
	
	const autoCompleteInput = document.getElementById('autoComplete');

	const combinedValues = resultados.map(resultado => `${resultado.per_curp} - ${resultado.per_nombre}`);

	const autoCompleteJS = new autoComplete({
		selector: "#autoComplete",
		placeHolder: "Buscar por CURP o Nombre...",
		data: {
			src: combinedValues, // Usar el array combinado
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
	$("#botonRegistrar").prop("disabled", false);
	$("#botonLimpiarCaptura").prop("disabled", false);
}

async function buscarPersona() {

	const values = document.getElementById('autoComplete').value;

	// Split the values by spaces
	const splitValues = values.split('-');
	document.getElementById('nombreEmpleado').value = splitValues[1].trim();

	let buscar_persona = {};
	buscar_persona.curp = splitValues[0].trim();
	buscar_persona.nombre = splitValues[1].trim();

	// Remove line symbols from each element
	//const sanitizedValues = splitValues.map(value => value.replace(/-/g, ''));

	// Filter out empty values
	//const cleanedValues = sanitizedValues.filter(value => value !== '');

	let request = await fetch('api/usuario/registrar/buscarUsuario', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(buscar_persona)
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

	respuesta.forEach(function(arrayAnidado) {
		arrayAnidado.forEach(function(element) {
			if (Number.isInteger(element)) {
				document.getElementById('idPersona').value = element;
			}
		});
	});
	
	let datos = {};
	datos.usu_idpersona = document.getElementById('idPersona').value;
	
	request = await fetch('api/usuario/registrar/verificarUsuario', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	respuesta = await request.text();
	
	if (respuesta === "error") {
		swal({
		  title: "Error al verificar usuario",
		  text: "Contacte al administrador del sistema",
		  icon: "error",
		  button: "Cerrar",
		});
		return;
	}
	
	if (respuesta == "registrado") {
		swal({
			title: "El empleado ya se encuentra registrado en el sistema. \n ¿Desea modificar los datos del usuario?",
			text: "",
			icon: "warning",
			buttons: {
				cancel: "Cancelar",
				confirmar: true,
			},
		})
			.then((value) => {
				switch (value) {

					case "confirmar":
						window.location.href = url_global + "modificar_usuario";
						break;

					default:
						LimpiarCaptura();
						swal("Se han limpiado los campos de captura.");
				}
			});
	} else {
		HabilitarInputs();
	}
}
