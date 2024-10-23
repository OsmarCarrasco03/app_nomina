$(function() {
	MostrarPagina(13);
	if(sessionStorage.permisos == 1){
		$("#datosControl").prop("hidden", false);
	}
});

async function autocompletarPersona() {
	const request = await fetch('api/snpersona/consulta/personaXTabla', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data = await request.json();
	let objetosDatos = [];

	for (let item of data) {
		let objeto = {
			per_curp: item[1].split(';'),
			per_nombre: item[2].split(';')
		};
		objetosDatos.push(objeto);
	}

	return objetosDatos;
}

autocompletarPersona().then(resultados => {

});

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

iniciarAutoComplete();

// Función para asignar valor a un campo de formulario y deshabilitarlo
function asignarValorYDeshabilitarCampo(campoId, valor) {
	const campo = document.getElementById(campoId);
	if (campo) {
		campo.value = valor;
		campo.disabled = true;
	}
}

async function buscarPersona() {
	const autoCompleteInput = document.getElementById('autoComplete');
	const query = autoCompleteInput.value.trim();

	if (query.length === 0) {
		return;
	}

	let datos = { per_curp: query.split("-")[0].trim() };

	const request = await fetch('api/persona/consulta/datosXGerencia', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	const personas = await request.json();
	console.log('Datos de persona:', personas);

	if (personas[0] && personas[0].length > 0) {
		const personaObjeto = {};
		personas[0].forEach((value, index) => {
			personaObjeto[`campo${index + 1}`] = value;
		});
		console.log('Persona objeto:', personaObjeto);


		const nombres = personaObjeto.campo5.split(' ');

		if (nombres.length > 2) {
			const segundoNombre = nombres.slice(2).join(' ');
			asignarValorYDeshabilitarCampo('nombre', segundoNombre);
		} else {
			asignarValorYDeshabilitarCampo('nombre', '');
		}
		asignarValorYDeshabilitarCampo('apellidopaterno', personaObjeto.campo5.split(' ')[0]);
		asignarValorYDeshabilitarCampo('apellidomaterno', personaObjeto.campo5.split(' ')[1]);
		asignarValorYDeshabilitarCampo('fecha_nacimiento', personaObjeto.campo24);
	    asignarValorYDeshabilitarCampo('nacionalidad', personaObjeto.campo15);
		asignarValorYDeshabilitarCampo('estado', personaObjeto.campo17);
        asignarValorYDeshabilitarCampo('municipio', personaObjeto.campo19);
		asignarValorYDeshabilitarCampo('curp2', personaObjeto.campo2);
		asignarValorYDeshabilitarCampo('rfc', personaObjeto.campo3);
		asignarValorYDeshabilitarCampo('homoclave', personaObjeto.campo4);
		$('#genero').empty();
		$('#genero').append('<option value="' + personaObjeto.campo7 + '">' + personaObjeto.campo7 + '</option>');
		asignarValorYDeshabilitarCampo('genero', personaObjeto.campo7);
		asignarValorYDeshabilitarCampo('estadocivil', personaObjeto.campo10);
		asignarValorYDeshabilitarCampo('empleado', personaObjeto.campo26);
		asignarValorYDeshabilitarCampo('seguridadsocial', personaObjeto.campo8);
		asignarValorYDeshabilitarCampo('idusp', personaObjeto.campo29);
		asignarValorYDeshabilitarCampo('regimen', personaObjeto.campo28);	
		asignarValorYDeshabilitarCampo('idfonacot', personaObjeto.campo29); 
		asignarValorYDeshabilitarCampo('fechainicioUno', personaObjeto.campo31);
		asignarValorYDeshabilitarCampo('fechaTermino', personaObjeto.campo32);
		asignarValorYDeshabilitarCampo('usuCapturo', personaObjeto.campo34);
		asignarValorYDeshabilitarCampo('fechaCaptura', personaObjeto.campo35);
        asignarValorYDeshabilitarCampo('usuModifico', personaObjeto.campo37);
		asignarValorYDeshabilitarCampo('fechaingreso', personaObjeto.campo11);
		asignarValorYDeshabilitarCampo('fechaingresosp', personaObjeto.campo12);
	    asignarValorYDeshabilitarCampo('fechabaja', personaObjeto.campo13);
		asignarValorYDeshabilitarCampo('discapacidades', personaObjeto.campo40);
		asignarValorYDeshabilitarCampo('situacion', personaObjeto.campo39);
        asignarValorYDeshabilitarCampo('cpfiscal', personaObjeto.campo25);
	    asignarValorYDeshabilitarCampo('correo', personaObjeto.campo42);
		asignarValorYDeshabilitarCampo('lenguajes', personaObjeto.campo20);
		asignarValorYDeshabilitarCampo('escolaridad', personaObjeto.campo22);

		generarArchivoCSV(personaObjeto);
	} else {
		alert('No se encontraron datos de la persona.');
	}
}


function botonSalirConsulta() {
	const camposALimpiar = [
		'#nombre', '#situacion', '#fechaCaptura', '#fechainicioUno', '#fechaTermino', '#usuCapturo', '#usuModifico', '#apellidopaterno', '#apellidomaterno', '#curp2', '#rfc', '#homoclave', '#genero',
		'#estadocivil', '#seguridadsocial', '#fechaingreso', '#fechaingresosp', '#centrodetrabajo',
		'#nacionalidad', '#estado', '#distribucion', '#idfonacot', '#contratacion', '#empleado', '#regimen', '#fechabaja', '#municipio', '#autoComplete', '#idusp', '#usuModifico'
	];

	camposALimpiar.forEach(campo => $(campo).val(''));

	swal({
		title: 'SALISTE DE LA CONSULTA CON ÉXITO',
		text: '¡Buen trabajo!',
		icon: 'success',
		button: 'Aceptar',
	});
}

//BOTON HABILITAR BUSQUEDA
function limpiarCamposHabilitar() {
	limpiarCampos();
	
	const idsDeshabilitar = [
		'nombre', 'apellidopaterno', 'apellidomaterno', 'curp2', 'rfc',
		'homoclave', 'genero', 'estadocivil', 'seguridadsocial', 'nacionalidad',
		'estado', 'municipio', 'empleado', 'idusp', 'contratacion', 'regimen',
		'fechaingreso', 'fechaingresosp', 'situacion', 'fechabaja',
		'fechaTermino', 'idinfonacot'
	];
	
	idsDeshabilitar.forEach(function(id) {
		const elemento = document.getElementById(id);
		if (elemento) {
			elemento.disabled = true;
			elemento.value = '';
		}
	
		// Limpiar elementos específicos usando jQuery
		$('#' + id).empty();
	});
}
