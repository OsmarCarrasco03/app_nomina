async function consultarTipo() {
	const request = await fetch('api/puesto/tipo', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const tipos = await request.json();
	const tipoSelect = $('#tipo');
	tipoSelect.empty();
	tipoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	tipos.forEach(tipo => {
		tipoSelect.append(`<option value="${tipo.lpto_clave}">${tipo.lpto_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarTipo();

});



document.getElementById("registrarPuestoS").addEventListener("click", function () {


	const codigoInput = document.getElementById('codigoPuesto');
	const codigo = codigoInput.value.trim();
	if (codigo === '') {
		codigoInput.classList.add('input-invalid');

		swal({
			title: 'El campo código no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	} else {

		codigoInput.classList.remove('input-invalid');


	}


	const descripcionInput = document.getElementById('descripcionPuesto');
	const descripcion = descripcionInput.value.trim();

	if (descripcion == '') {
		descripcionInput.classList.add('input-invalid')
		swal({
			title: 'Por favor, ingrese una descripción en el campo.',
			icon: 'error',
			button: 'Aceptar',
		});
		return;

	} else {
		descripcionInput.classList.remove('input-invalid')
	}

	const tipoInput = document.getElementById('tipo');
	const tipo = tipoInput.value.trim();
	if (tipo == '') {
		tipoInput.classList.add('input-invalid')
		swal({
			title: 'Por favor, ingrese un tipo en el campo.',
			icon: 'error',
			button: 'Aceptar',
		});
		return;
	} else {
		tipoInput.classList.remove('input-invalid')
	}

	const inicio = document.getElementById('fechaInicio').value;

	const usucapturo = document.getElementById('usucapturoPuesto').value;
	const fechamod = document.getElementById('fechaMod').value;
	const usumod = document.getElementById('usuModifico').value;
	const situacion = document.getElementById('situacion').value;



	const nuevoPuesto = {
		ctgp_codigo: codigo,
		ctgp_descripcion: descripcion,
		ctgp_tipo: tipo,
		ctgp_fechainicio: inicio,
		ctgp_usucapturo: usucapturo,
		ctgp_fechamod: fechamod,
		ctgp_usumodifico: usumod,
		ctgp_situacion: situacion
	};

	console.log(nuevoPuesto);

	swal({
		title: '¿Estás seguro de registrar este puesto?',
		text: 'Una vez registrado, no podrás deshacer esta acción',
		icon: 'warning',
		buttons: ['Cancelar', 'Aceptar'],
		dangerMode: true,
	}).then((willRegister) => {
		if (willRegister) {
			fetch('api/persona/registroPuesto', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(nuevoPuesto),
			}).then(response => {
				if (!response.ok) {
					throw new Error('Error al registrar el puesto');
				}
				return response.json();
			}).then(data => {
				console.log(data);
				if (data === true) {
					swal("¡Puesto registrado exitosamente!", {
						icon: "success",
					});
				} else {
					// Si el código ya existe, se hace una solicitud GET para obtener los datos del puesto
					fetch(`api/puesto/${nuevoPuesto.ctgp_codigo}`)
						.then(response => {
							if (!response.ok) {
								throw new Error('Error al obtener los datos del puesto');
							}
							return response.json();
						})
						.then(puestoData => {
							console.log(puestoData);
							let detallesPuesto = `Código: ${puestoData[0].ctgp_codigo}\n`;
							detallesPuesto += `Descripción: ${puestoData[0].ctgp_descripcion}\n`;


							swal({
								title: "¡Error al registrar el puesto!",
								text: `El código ya existe. Detalles del puesto:\n${detallesPuesto}`,
								icon: "error",
							});
						})

						.catch(error => {
							console.error('Error al obtener los datos del puesto:', error);
							swal("¡Error al obtener los datos del puesto!", {
								icon: "error",
							});
						});
				}
			}).catch(error => {
				console.error('Error:', error);
				swal("¡Error al registrar el puesto!", {
					icon: "error",
				});
			});
		}
	});


});

$(document).ready(function () {
	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechaInicio").val(fechaHoy);

});

$(document).ready(function () {

	$("#usucapturoPuesto").val(sessionStorage.idUsuario);

});


$(document).ready(function () {

	$("#usuModifico").val(sessionStorage.idUsuario);

});


$(document).ready(function () {
	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechaMod").val(fechaHoy);

});


function soloLetras(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode);

	// Permitir letras mayúsculas, números y teclas especiales (borrar, mover cursor)
	const permitidos = /[A-Za-z0-9\s]/;
	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	// Si la tecla presionada no es permitida y no es una tecla especial, prevenir su ingreso
	if (!permitidos.test(tecla) && !esEspecial) {
		e.preventDefault();
		return false;
	}

	// Convertir todo el valor del input a mayúsculas después de un breve retraso
	setTimeout(function () {
		input.value = input.value.toUpperCase();
	}, 0);

	return true;
}


function soloLetrasDes(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode).toUpperCase();
	const letrasMayusculas = " ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	if (letrasMayusculas.indexOf(tecla) === -1 && !esEspecial) {
		e.preventDefault();
		return false;
	}

	setTimeout(function () {
		input.value = input.value.toUpperCase(); // Convertir todo el valor del input a mayúsculas después de un breve retraso
	}, 0);

	return true;
}



function limpiarInputs() {
	document.getElementById('codigoPuesto').value = '';
	document.getElementById('descripcionPuesto').value = '';
	document.getElementById('tipo').value = '';
	document.getElementById('situ').value = '';
	document.getElementById('usuarioCapturo').value = '';
	document.getElementById('fechaInicio').value = '';
	document.getElementById('fechaTermino').value = '';
	document.getElementById('usuariomodifico').value = '';
	document.getElementById('fechaModificacion').value = '';
	document.getElementById('autoComplete').value = '';


}

// Event Listener para el botón
document.getElementById('limpiarPuesto').addEventListener('click', limpiarInputs);


function mostrarAlerta() {
	swal("Buen trabajo!", "Los campos se limpiarón correctamente!", "success");

}


const codigoInput = document.getElementById('codigoPuesto');
const mensajeEscribiendo = document.getElementById('mensajeEscribiendo');

codigoInput.addEventListener('input', function () {
	if (this.value.trim() !== '') {
		// Si el campo no está vacío, muestra el mensaje encima del campo
		mensajeEscribiendo.style.display = 'block';
		posicionaMensaje();
	} else {
		// Si el campo está vacío, oculta el mensaje
		mensajeEscribiendo.style.display = 'none';
	}
});

// Función para posicionar el mensaje encima del campo de entrada
function posicionaMensaje() {
	const rect = codigoInput.getBoundingClientRect();
	mensajeEscribiendo.style.top = (rect.top - mensajeEscribiendo.offsetHeight - 5) + 'px';
	mensajeEscribiendo.style.left = rect.left + 'px';
}


function eliminarClaseInputInvalid() {
	const inputs = document.querySelectorAll('.input-invalid');
	inputs.forEach(input => {
		input.classList.remove('input-invalid');
	});
}

function limpiarCampos() {
	mostrarAlerta();
	eliminarClaseInputInvalid();
	eliminarElementos();

}

function eliminarElementos() {
	// Obtener el elemento <div> y eliminarlo
	const divMensaje = document.getElementById('mensajeEscribiendo');
	divMensaje.parentNode.removeChild(divMensaje);

	// Obtener el campo de entrada y eliminar el event listener
	const codigoInput = document.getElementById('codigoPuesto');
	codigoInput.removeEventListener('input', mostrarMensaje);
}

