$(function() {
	MostrarPagina(38);
});

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
}

function VisualizarContrasena(idInputContrasena, idIconoOriginal, idIconoCambio) {
	let inputContrasena = document.getElementById(idInputContrasena);
	let iconoOriginal = document.getElementById(idIconoOriginal);
	let iconoCambio = document.getElementById(idIconoCambio);

	if (inputContrasena.type != "password") {
		inputContrasena.type = "password";
		iconoCambio.setAttribute("hidden", true);
		iconoOriginal.removeAttribute("hidden");
		return;
	}
	
	inputContrasena.type = "text";
	iconoOriginal.setAttribute("hidden", true);
	iconoCambio.removeAttribute("hidden")
}

function ValidarContrasena(password, confirmar_password) {
	const inputPassword = document.getElementById("nueva_contrasena");
	const inputConfirmarPassword = document.getElementById("confirmar_contrasena");
	
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

async function CambiarContrasena() {
	
	let password = '', confirmar_password = '';

	// Get the IDs of form elements in a form with the ID 'myForm' using jQuery
	$('#formulario :input').each(function() {
		const element = $(this);

		switch (element.attr('id')) {
			case 'nueva_contrasena':
				password = $.trim(element.val());
				break;
			case 'confirmar_contrasena':
				confirmar_password = $.trim(element.val());
				break;
		}
	});

	if (ValidarContrasena(password, confirmar_password)) {
		
		let datos = {};
		
		datos.usu_id = sessionStorage.idUsuario;
		datos.usu_password = password;

		const request = await fetch('api/usuario/cambiarContrasena', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(datos)
		})
		.then(response => response.json())
		.then(data => {
			return data;
		});
		
		if (request != true) {
			LimpiarCaptura();

			swal({
				title: "Error al cambiar contraseña",
				text: "Consulte a su administrador",
				icon: "error",
				buttons: {
					confirmar: true,
				},
			})
				.then((value) => {
					switch (value) {
						case "confirmar":
							cerrarSesion();
							break;
					}
				});
			return;
		}

		LimpiarCaptura();
		
		swal({
			title: "Se actualizó la contraseña correctamente",
			text: "",
			icon: "success",
			buttons: {
				confirmar: true,
			},
		})
			.then((value) => {
				switch (value) {
					case "confirmar":
						window.location.href = url_global + 'index';
						break;
				}
			});
	}
}

