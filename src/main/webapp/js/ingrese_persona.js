// CAMPO GENERO MAPEADO PARA OBTENER EL CURP DE ACUERDO A LAS REGLAS
const generoMapper = {
	'1': 'H',
	'2': 'M'
};
async function consultarGenero() {
	try {
		const response = await fetch('api/persona/Obtenergenero/');
		const personas = await response.json();

		const generoSelect = $('#genero');
		generoSelect.empty().append('<option value="" disabled selected>Selecciona una opción</option>');

		personas.forEach(persona => {
			const generoValue = generoMapper[persona.lper_clave];
			generoSelect.append(`<option value="${generoValue}" data-clave="${persona.lper_clave}">${persona.lper_descripcion}</option>`);
		});
	} catch (error) {
		// console.error('Error al obtener datos del género:', error);
	}
}
$(document).ready(function () {
	consultarGenero();
});











$('#genero').on('change', function () {
	const selectedOption = $(this).find('option:selected');
	const generoValue = selectedOption.val();
	const generoClave = selectedOption.attr('data-clave');

	// console.log('Valor del género:', generoValue);
	// console.log('Clave del género:', generoClave);
});

/*AQUI EMPEIZA EL SELECT DE EDOCIVIL */
async function consultarPersonaEdocivil() {
	const request = await fetch('api/persona/Obteneredocivil/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});


	const personas = await request.json();
	const estadocivilSelect = $('#estadocivil');
	estadocivilSelect.empty();
	estadocivilSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		-
			estadocivilSelect.append(`<option value="${persona.lper_clave}">${persona.lper_descripcion}</option>`);

	});
}
$(document).ready(function () {
	consultarPersonaEdocivil();
});
/*AQUI TERMINO EL SELECT DE EDOCIVIL */



/*AQUI EMPEIZA EL SELECT DE NACIONALIDAD */
async function consultarNacionalidades() {
	const request = await fetch('api/persona/Obtenernacionalidad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const nacionalidades = await request.json();
	const nacionalidadSelect = $('#nacionalidad');
	nacionalidadSelect.empty();
	nacionalidadSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	nacionalidades.forEach(nacionalidad => {
		nacionalidadSelect.append(`<option value="${nacionalidad.lper_clave}">${nacionalidad.lper_descripcion}</option>`);
	});
}
$(document).ready(function () {
	consultarNacionalidades();
});
/*TERMINA EL SELECT DE NACIONALIDAD */

// AQUI EMPIEZA EL VALOR PARA ESTADO 
const estadoMapper = {
	'1': 'AS', '2': 'BC', '3': 'BS', '4': 'CC', '5': 'CL', '6': 'CM',
	'7': 'CS', '8': 'CH', '9': 'DF', '10': 'DG', '11': 'GT', '12': 'GR', '13': 'HG',
	'14': 'JC', '15': 'MC', '16': 'MN', '17': 'MS', '18': 'NT', '19': 'NL',
	'20': 'OC', '21': 'PL', '22': 'QT', '23': 'QR', '24': 'SP', '25': 'SL',
	'26': 'SR', '27': 'TC', '28': 'TS', '29': 'TL', '30': 'VZ', '31': 'YN', '32': 'ZS',
};

async function cargarEstadosYMunicipios() {
	// Obtener estados
	const requestEstados = await fetch('api/persona/Obtenerestado/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const estados = await requestEstados.json();
	const estadoSelect = $('#estado');
	estadoSelect.empty();
	estadoSelect.append('<option value="" disabled selected>Selecciona un estado</option>');

	estados.forEach(estado => {
		const estadoValue = estadoMapper[estado.edo_id];
		estadoSelect.append(`<option value="${estadoValue}" data-edo-id="${estado.edo_id}">${estado.edo_nombre}</option>`);
	});

	estadoSelect.on('change', async function () {
		// Función para consultar municipios por estado
		const estadoSeleccionado = $(this).val();
		const estadoId = $(this).find(':selected').data('edo-id');

		// console.log('Valor del estado:', estadoSeleccionado);

		// Obtener municipios
		const requestMunicipios = await fetch('api/persona/Obtenermunicipio/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		const municipios = await requestMunicipios.json();
		const municipioSelect = $('#municipio');
		municipioSelect.empty();
		municipioSelect.append('<option value="" disabled selected>Selecciona un municipio</option>');

		// console.log('Municipios sin filtrar:', municipios);

		const municipiosFiltrados = municipios.filter(municipio => municipio.mun_edopadre === estadoId);
		municipiosFiltrados.forEach(municipio => {
			municipioSelect.append(`<option value="${municipio.mun_numero}">${municipio.mun_nombre}</option>`);
		});


	});
}

$(document).ready(function () {
	cargarEstadosYMunicipios();
});

$('#estado').on('change', function () {
	const selectedOption = $(this).find(':selected');
	const estadoValue = selectedOption.val();
	const estadoClave = selectedOption.attr('data-edo-id');

	// console.log('Valor del estado:', estadoValue);
	// console.log('Clave del estado:', estadoClave);

	// Lógica adicional si es necesario
});

/*AQUI EMPIEZA EL SELECT DE REGIMEN*/
async function consultarRegimen() {
	try {
		const request = await fetch('api/persona/Obtenerisste/', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!request.ok) {
			throw new Error('No se pudo obtener la lista de regímenes.');
		}

		const regimenes = await request.json();
		const regimenSelect = $('#regimen');
		regimenSelect.empty();
		regimenSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
		regimenes.forEach(regimen => {
			regimenSelect.append(`<option value="${regimen.lper_clave}">${regimen.lper_descripcion}</option>`);

		});
	} catch (error) {

	}
}
$(document).ready(function () {
	consultarRegimen();
});

/*AQUI EMPEIZA EL SELECT DE SITUACION */
async function consultarSituacion() {
	const request = await fetch('api/persona/Obtenersituacion/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const situaciones = await request.json();
	const situacionSelect = $('#situacion');
	situacionSelect.empty();
	situacionSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	situaciones.forEach(situacion => {
		situacionSelect.append(`<option value="${situacion.lper_clave}">${situacion.lper_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarSituacion();

});

//SELECT DE IDIOMA
async function consultarIdioma() {
	const request = await fetch('api/persona/Obteneridioma/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const idiomas = await request.json();
	const idiomaSelect = $('#lenguajes');
	idiomaSelect.empty();
	idiomaSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	idiomas.forEach(idioma => {
		idiomaSelect.append(`<option value="${idioma.idio_id}">${idioma.idio_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarIdioma();

});

//SELECT DE ESCUELA
async function consultarEscuela() {
	const request = await fetch('api/persona/Obtenerescolaridad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const escolaridades = await request.json();
	const escolaridadSelect = $('#escolaridad');
	escolaridadSelect.empty();
	escolaridadSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	escolaridades.forEach(escolaridad => {
		escolaridadSelect.append(`<option value="${escolaridad.esc_id}">${escolaridad.esc_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarEscuela();

});


//SELECT DE DISCAPACIDADES
async function consultarDiscapacidad() {
	const request = await fetch('api/persona/Obtenerdiscapacidad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const discapacidades = await request.json();
	const discapacidadSelect = $('#discapacidades');
	discapacidadSelect.empty();
	discapacidadSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	discapacidades.forEach(discapacidad => {
		discapacidadSelect.append(`<option value="${discapacidad.lper_clave}">${discapacidad.lper_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarDiscapacidad();

});

// INICO DE VALIDACIONES PARA EL REGISTRO 
/*BOTON REGISTAR PERO OBTENBIENDO VALIDACIONES DE ACUERODO A LO REQUERIDO */
document.getElementById("registrarPersona").addEventListener("click", function () {

	const campos = document.querySelectorAll('input, select, textarea');
	const idsExcluir = ['otroInputc', 'otroInput', 'fechainicioUno', 'fechaTermino', 'usuCapturo', 'fechaCaptura', 'usuModifico',
		'estadoModal', 'municipioModal', 'opcionesModal', 'calleModal', 'coloniaModal', 'localidadModal', 'exteriorModal', 'interiorModal', 'calleunoModal',
		'calledosModal', 'estadoModalDistribucion', 'opcionesModalDistribucion', 'seguridadsocial', 'idinfonacot', 'idusp', 'municipio'];

	const camposFiltrados = Array.from(campos).filter(campo => !idsExcluir.includes(campo.id));
	let camposVacios = true;

	camposFiltrados.forEach(campo => {
		if (campo.value.trim() !== '') {
			camposVacios = false;
			campo.classList.remove('input-invalid');
		} else {
			campo.classList.add('input-invalid');
		}

		// Remove input-invalid class when user starts typing
		campo.addEventListener('input', function () {
			campo.classList.remove('input-invalid');
		});
	});

	if (camposVacios) {
		swal({
			title: 'Por favor, llena los campos de color rojo ya que son de carcater obligatorio.',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	}


	//VALIDACION PARA NOMBRE 	
	const nombreInput = document.getElementById('nombre');
	const nombre = nombreInput.value.trim();
	if (nombre === '') {
		mostrarError('Por favor, ingrese un nombre válido.');
	} else {
		nombreInput.value = nombre.toUpperCase();
		nombreInput.classList.remove('input-invalid');
	}
	function mostrarError(mensaje) {
		nombreInput.classList.add('input-invalid');

		swal({
			title: mensaje,
			icon: 'error',
			button: 'Aceptar'
		});
	}
	//FIN VALIDACION PARA NOMBRE 	


	// VALIDACION APELLIDO PATERNO 
	const appaternoInput = document.getElementById('apellidopaterno');
	const appaterno = appaternoInput.value.trim();
	if (appaterno === '') {
		mostrarError('Por favor, ingrese un apellido paterno válido.');
	} else {
		appaternoInput.value = appaterno.toUpperCase();
		appaternoInput.classList.remove('input-invalid');
	}
	function mostrarError(mensaje) {
		if (nombre === '') {
			mensaje = 'Por favor, ingrese un nombre válido.';
		}

		swal({
			title: mensaje,
			icon: 'error',
			button: 'Aceptar'
		});
	}
	// FIN VALIDACION APELLIDO PATERNO 


	// VALIDACION APELLIDO MATERNO
	const apmaternoInput = document.getElementById('apellidomaterno');
	const apmaterno = apmaternoInput.value.trim();

	if (apmaterno === '') {
		mostrarError('Por favor, ingrese un apellido materno válido.');
	} else {
		apmaternoInput.value = apmaterno.toUpperCase();
		apmaternoInput.classList.remove('input-invalid');
	}

	function mostrarError(mensaje) {
		if (nombre === '') {
			mensaje = 'Por favor, ingrese un nombre válido.';
		}

		swal({
			title: mensaje,
			icon: 'error',
			button: 'Aceptar'
		});

		// Puedes añadir más lógica de manejo de errores aquí si es necesario
	}

	// FIN VALIDACION APELLIDO MATERNO

	// validacion para fecha de nacimiento 
	const dia = document.getElementById('dia').value;
	const mes = document.getElementById('mes').value;
	const anio = document.getElementById('anio').value;

	if (dia === '' || mes === '' || anio === '') {
		swal({
			title: 'Por favor, ingrese una fecha correcta.',
			icon: 'error',
			button: 'Aceptar',
		});

		// Puedes detener el flujo de ejecución aquí o realizar alguna otra acción
		return;
	}

	// fin validacion para fecha de nacimiento 

	// VALIDACION PARA GÉNERO
	const generoSelect = document.getElementById('genero');
	const generoClave = generoSelect.options[generoSelect.selectedIndex].dataset.clave;

	if (generoSelect.value !== "") {

	} else {
		swal({
			title: 'Por favor, ingrese un genero  válido.',
			icon: 'error',
			button: 'Aceptar'
		});
		return
	}
	//FIN DE GÉMERO 

	const estadocivilInput = document.getElementById('estadocivil');
	let estadocivil = estadocivilInput.value.trim();

	if (estadocivil === '') {
		estadocivilInput.classList.add('input-invalid');

		swal({
			title: 'El campo ESTADO CIVIL no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	} else {
		estadocivilInput.classList.remove('input-invalid');
		// Parse estadocivil to integer
		estadocivil = parseInt(estadocivil, 10);

		// Now, estadocivil is an integer
	}

	//TERMINO DE VALIDADCION PARA ESTADOCIVIL 

	//VALIDACION PARA NACIONALIDAD
	const nacionalidadInput = document.getElementById('nacionalidad');
	const nacionalidad = nacionalidadInput.value.trim();
	if (nacionalidad === '') {
		nacionalidadInput.classList.add('input-invalid');

		swal({
			title: 'El campo NACIONALIDAD no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	} else {

		nacionalidadInput.classList.remove('input-invalid');


	}
	// TERMINO VALIDACION PARA NACIONALIDAD

	const estadoSelect = document.getElementById('estado');
	const estadoValue = estadoSelect.value;
	const estadoId = Object.keys(estadoMapper).find(key => estadoMapper[key] === estadoValue);

	// Validar si se ha seleccionado un estado
	if (estadoValue !== "") {
		// console.log('Valor del estado:', estadoValue);
		// console.log('Clave del estado:', estadoId);

		// Aquí puedes continuar con el resto de tu lógica después de la validación exitosa
	} else {
		swal({
			title: 'Por favor, seleccione un estado válido.',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	}


	// VALIDACION PARA CURP
	const curpInput = document.getElementById('curp2');
	const curp = curpInput.value.trim();

	if (curp === '') {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'El campo CURP no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}

	if (curp.length < 18) {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'La CURP debe tener al menos 18 caracteres',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}


	const primerosCuatroCaracteresSonLetras = /^[A-Za-z]{4}$/.test(curp.slice(0, 4));

	if (!primerosCuatroCaracteresSonLetras) {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'Los primeros cuatro caracteres de la CURP deben ser letras',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}


	const caracteresDel5al10SonNumeros = /^\d{6}$/.test(curp.slice(4, 10));

	if (!caracteresDel5al10SonNumeros) {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'Los caracteres de la posición 5 a la 10 de la CURP deben ser números',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}
	const caracterEnPosicion11Valido = /^[HM]$/.test(curp.charAt(10));

	if (!caracterEnPosicion11Valido) {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'El caracter en la posición 11 de la CURP debe ser "H" o "M"',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}

	const estadosValidos = /^(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)$/;
	const posiciones12y13Validas = estadosValidos.test(curp.slice(11, 13));

	if (!posiciones12y13Validas) {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'Las posiciones 12 y 13 de la CURP deben corresponder a un estado o ser "NE"',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}

	const ultimos5CaracteresAlfanumericos = /^[A-Za-z0-9]{5}$/.test(curp.slice(-5));

	if (!ultimos5CaracteresAlfanumericos) {
		curpInput.classList.add('input-invalid');

		swal({
			title: 'Los últimos 5 caracteres de la CURP deben ser alfanuméricos',
			icon: 'error',
			button: 'Aceptar',
		});

		return;
	}

	curpInput.classList.remove('input-invalid');

	// FIN DE LA VALIDACION PARA CURP


	//VALIDACION RFC
	const rfcInput = document.getElementById('rfc');
	const rfc = rfcInput.value.trim();

	if (rfc === '') {
		rfcInput.classList.add('input-invalid');
		swal({
			title: 'Por favor, ingrese un RFC en el campo.',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	} else if (rfc.length !== 10) {
		rfcInput.classList.add('input-invalid');
		swal({
			title: 'El RFC debe tener 10 caracteres.',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	} else if (!/^[A-Za-z]{4}[0-9]{6}$/.test(rfc.substring(0, 10))) {
		rfcInput.classList.add('input-invalid');
		swal({
			title: 'Las primeras cuatro letras deben ser letras y los siguientes seis caracteres deben ser números en el RFC.',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	} else {
		const rfcEnMayusculas = rfc.toUpperCase();
		rfcInput.value = rfcEnMayusculas;
		rfcInput.classList.remove('input-invalid');

	}
	//TERMINO DE VALIDADICOND E RFC

	//VALIDADCION HOMOCLAVE 
	const homoclaveInput = document.getElementById('homoclave');
	const homoclave = homoclaveInput.value.trim();

	if (homoclave === '') {
		homoclaveInput.classList.add('input-invalid');
		swal({
			title: 'El campo Homoclave no puede estar vacío',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	} else {
		const regexHomoclave = /^[a-zA-Z0-9]{3}$/;

		if (!regexHomoclave.test(homoclave)) {
			homoclaveInput.classList.add('input-invalid');
			swal({
				title: 'La Homoclave debe tener exactamente 3 caracteres alfanuméricos',
				icon: 'error',
				button: 'Aceptar'
			});
			return;
		} else {
			const homoclaveEnMayusculas = homoclave.toUpperCase();
			homoclaveInput.value = homoclaveEnMayusculas;
			homoclaveInput.classList.remove('input-invalid');

		}
	}

	// TERMINO DE VALIDACION DE HOMOCLAVE

	//VALIDACION PARA NO.SEGURIDAD
	const noseguridadInput = document.getElementById('seguridadsocial');
	const noseguridad = noseguridadInput.value.trim();

	if (noseguridad !== "") {
		const numeros = noseguridad.replace(/\D/g, '');

		if (numeros.length !== 11 || !/^[0-9]{11}$/.test(numeros)) {
			swal({
				title: "El No. de seguridad social debe contener 11 números",
				text: "Inténtelo de nuevo !!",
				icon: "error",
				button: "Aceptar",
			});


			noseguridadInput.classList.remove('input-valid');
			noseguridadInput.classList.add('input-invalid');

			return;
		} else {

			noseguridadInput.classList.remove('input-invalid');

		}
	} else {

		noseguridadInput.classList.remove('input-invalid');

	}
	//TERMINO DE VALIDACION PARA NO.SEGURIDAD

	//VALIDADCION PARA EMPLEADO 
	const empleadoInput = document.getElementById('empleado');
	const empleado = empleadoInput.value.trim();
	if (empleado === '') {
		empleadoInput.classList.add('input-invalid');

		swal({
			title: 'El campo No. Empleado no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	} else {

		empleadoInput.classList.remove('input-invalid');

	}

	if (!/^[0-9]{5,6}$/.test(empleado)) {

		empleadoInput.classList.add('input-invalid');

		swal({

			title: 'El No. Empleado debe contener de 5 a 6 números',

			icon: 'error',

			button: 'Aceptar',

		});

		return;

	} else {

		empleadoInput.classList.remove('input-invalid');


	}
	//TERMINO DE VALIDADCION PARA EMPLEADO


	//VALIDACION PARA IDUSP
	const iduspInput = document.getElementById('idusp');
	const idusp = iduspInput.value.trim();

	if (idusp !== '') {

		if (!/^[0-9]{1,9}$/.test(idusp)) {

			iduspInput.classList.add('input-invalid');
			swal({
				title: 'El campo IDUDP no cumple con el formato requerido (debe contener hasta 9 números).',
				icon: 'error',
				button: 'Aceptar',
			});
			return;
		} else {

			iduspInput.classList.remove('input-invalid');

		}
	} else {

		iduspInput.classList.remove('input-invalid');

	}




	//VALIDACION PARA REGIMEN 
	const regimenInput = document.getElementById('regimen');
	const regimen = regimenInput.value.trim();

	if (regimen === '') {

		regimenInput.classList.add('input-invalid');

		swal({
			title: 'El campo REGIMEN no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	} else {

		regimenInput.classList.remove('input-invalid');


	}

	//TERMINO DE VALIDACION PARA IDUSP

	//VALIDACION PARA FECHA INGRESO 
	const fechaingresoInput = document.getElementById('fechaingreso');
	const fechaingreso = fechaingresoInput.value.trim();

	if (fechaingreso === '') {
		fechaingresoInput.classList.add('input-invalid');

		swal({
			title: 'El campo fecha ingreso no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	} else {

		fechaingresoInput.classList.remove('input-invalid');


	}
	//TERMINO DE VALIDACION PARA FECHA INGRESO 

	//VALIDACION DE FECHA INGRESO SP
	const fechaingresospInput = document.getElementById('fechaingresosp');
	const fechaingresosp = fechaingresospInput.value.trim();

	if (fechaingresosp === '') {
		fechaingresospInput.classList.add('input-invalid');

		swal({
			title: 'El campo fecha ingreso sp no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	} else {

		fechaingresospInput.classList.remove('input-invalid');


	}
	//TERMINO DE VALIDACION DE FECHA INGRESO SP


	//VALIDACION PARA EL CAMPO DE FONACOT 
	const fonacotInput = document.getElementById('idinfonacot');
	const fonacotValue = fonacotInput.value.trim();

	if (fonacotValue !== '') {

		const regexNumeric = /^[0-9]+$/;
		if (!regexNumeric.test(fonacotValue)) {
			fonacotInput.classList.add('input-invalid');
			swal({
				title: 'El campo Fonacot solo debe contener valores numéricos.',
				icon: 'error',
				button: 'Aceptar',
			});
			return;
		} else {

			fonacotInput.classList.remove('input-invalid');

		}
	} else {

		fonacotInput.classList.remove('input-invalid');

	}
	//TERMINO VALIDACION PARA EL CAMPO DE FONACOT 


	//VALIDACION PARA EL CAMPO DE SITUACION 
	const situacionInput = document.getElementById('situacion');
	const situacion = situacionInput.value.trim();
	if (situacion === '') {
		situacionInput.classList.add('input-invalid');
		swal({
			title: 'El campo fecha situacion no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',
		});
		return;
	} else {
		situacionInput.classList.remove('input-invalid');


	}
	//TERMINO VALIDACION PARA EL CAMPO DE SITUACION 


	const email = document.getElementById('correo').value;
	const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!regexEmail.test(email)) {
		swal({
			title: 'Por favor, ingrese una dirección de correo electrónico válida.Ej. @gmail, @outlook.com, @hotmail.com',
			icon: 'error',
			button: 'Aceptar',
		});

		// Puedes detener el flujo de ejecución aquí o realizar alguna otra acción
		return;
	}




	const discapacidadInput = document.getElementById('discapacidades');
	const discapacidad = discapacidadInput.value.trim();

	if (discapacidad === '') {
		discapacidadInput.classList.add('input-invalid');

		swal({
			title: 'El campo de discapacidad no puede estar vacío',
			icon: 'error',
			button: 'Aceptar'
		});

		return;
	} else {
		discapacidadInput.classList.remove('input-invalid');
		// Resto de tu lógica si el campo no está vacío
	}


	const idiomaInput = document.getElementById('lenguajes');
	const idioma = idiomaInput.value.trim();

	if (idioma === '') {
		idiomaInput.classList.add('input-invalid');

		swal({
			title: 'El campo de idioma no puede estar vacío',
			icon: 'error',
			button: 'Aceptar'
		});

		return;
	} else {
		idiomaInput.classList.remove('input-invalid');
		// Resto de tu lógica si el campo no está vacío
	}

	const escolaridadInput = document.getElementById('escolaridad');
	const escolaridad = escolaridadInput.value.trim();

	if (escolaridad === '') {
		escolaridadInput.classList.add('input-invalid');

		swal({
			title: 'El campo de escolaridad no puede estar vacío',
			icon: 'error',
			button: 'Aceptar'
		});

		return;
	} else {
		escolaridadInput.classList.remove('input-invalid');
		// Resto de tu lógica si el campo no está vacío
	}

	const idUsuario = sessionStorage.idUsuario;
	const fechainicio = document.getElementById('fechainicioUno').value;
	const usumodifico = document.getElementById('usuModifico').value;
	/*const usucapturo = document.getElementById('usuCapturo').value;*/
	const fechamod = document.getElementById('fechaCaptura').value;
	const origenmun = document.getElementById('municipio').value;
	const idinfonacot = document.getElementById('idinfonacot').value;
	// Formatea la fecha
	const fechaNacimiento = `${anio}-${mes}-${dia}`;
	// Imprime el resultado en la consola
	// console.log(fechaNacimiento);
	const cpfiscal = document.getElementById('postal_fiscal').value;


	const nuevaPersona = {

		per_cpfiscal: cpfiscal,

		per_fechanacimiento: fechaNacimiento,

		per_email: email,

		per_tipodiscap: discapacidad,

		per_escolaridad: escolaridad,

		per_idioma: idioma,

		per_nombre: nombre,

		per_rfc: rfc,

		per_homoclave: homoclave,

		per_curp: curp,

		per_appaterno: appaterno,

		per_apmaterno: apmaterno,

		per_numempleado: empleado,

		per_genero: generoClave,

		per_edocivil: estadocivil,

		per_idrusp: idusp,

		per_noseguridad: noseguridad,

		per_regimenissste: regimen,

		per_fechaingreso: fechaingreso,

		per_fechaingresosp: fechaingresosp,

		per_nacionalidad: nacionalidad,

		per_origenedo: estadoId,

		per_origenmun: origenmun,

		per_fechainicio: fechainicio,


		per_usucapturo: idUsuario,

		per_fechamod: fechamod,

		per_usumodifico: idUsuario,

		per_situacion: situacion,

		per_idinfonacot: idinfonacot



	};

	console.log(nuevaPersona);
	swal({
		title: '¿Estás seguro de registrar esta persona?',
		text: 'Una vez registrado, no podrás deshacer esta acción',
		icon: 'warning',
		buttons: ['Cancelar', 'Aceptar'],
		dangerMode: true,

	})
		.then((willRegister) => {
			if (willRegister) {
				fetch('api/personas/registrar', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(nuevaPersona),
				})
					.then(response => {
						if (response.status === 400) {
							return response.text();
						}
						return response.json();
					})
					.then(data => {
						console.log(data);
						if (data === "CURPExistente") {
							swal({
								title: 'El CURP ya existe en la base de datos. No se pudo registrar la persona con ese CURP',
								text: "Inténtelo de nuevo !!",
								icon: "error",
								button: "Aceptar",
							});

						} else if (data === "RFCExistente") {
							swal({
								title: 'El RFC con homoclave ya existe en la base de datos. No se pudo registrar la persona.',
								text: "Inténtelo de nuevo !!",
								icon: "error",
								button: "Aceptar",
							});

						} else if (data === "EmpleadoExistente") {
							swal({
								title: 'El Numero de empeleao ya existe en la base de datos. No se pudo registrar la persona.',
								text: "Inténtelo de nuevo !!",
								icon: "error",
								button: "Aceptar",
							});
						} else if (data === "noSeguridadExistentes") {
							swal({
								title: 'El Numero de seguridad Social ya existe en la base de datos. No se pudo registrar la persona.',
								text: "Inténtelo de nuevo !!",
								icon: "error",
								button: "Aceptar",
							});
						} else if (data === "OK") {
							swal("¡Persona registrada exitosamente!", {
								icon: "success",
							});

						} else {
							swal({
								title: "SALISTE DE LA CONSULTA CON EXITO ",
								text: "Buen trabajo !!",
								icon: "success",
								button: "Aceptar",
							});
						}
					})
					.catch(error => {
						swal({
							title: "REGISTRO CON EXITO ",
							text: "Buen trabajo !!",
							icon: "success",
							button: "Aceptar",
						});
					});

			} else {

			}

		});

});




//LIMPIA TODOS LOS CAMPOS QUE YA NO NECECITAMOS 
function botonSalirConsulta() {
	const camposALimpiar = [
		'#nombre', '#apellidopaterno', '#apellidomaterno', '#curp2', '#rfc', '#homoclave', '#genero', '#calleModal', '#coloniaModal', '#localidadModal', '#exteriorModal', '#interiorModal', '#calleunoModal', '#calledosModal',
		'#estadocivil', '#seguridadsocial', '#fechaingreso', '#fechaingresosp', '#centrodetrabajo', '#estadoModal', '#municipioModal', '#opcionesModal', , '#mes', '#dia', '#anio', '#correo', '#lenguajes', '#discapacidades', '#escolaridad',
		'#nacionalidad', '#estado', '#distribucion', '#contratacion', '#empleado', '#input-invalid', '#situacion', '#regimen', '#municipio', '#autoComplete', '#idusp', '#otroInput', '#otroInputc', '#autoCompleteuno'
	];

	swal({
		title: "SALISTE DE LA CONSULTA CON EXITO ",
		text: "¡Buen trabajo!",
		icon: "success",
		button: "Aceptar"
	});

	camposALimpiar.forEach(function (campo) {
		$(campo).val('');

		if ($(campo).hasClass('input-invalid') || $(campo).hasClass('input-valid')) {
			$(campo).removeClass('input-invalid');
			$(campo).removeClass('input-valid');
		}
	});

	$('#formulario').attr('true');
}




/*FUNCION PARA ESTABLECER LIMITANTES Y VALIDAR LA ACCIONES DE LOS INPUT*/


function soloLetras(e) {
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


function soloLetrasNumeros(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode);

	const letrasYNumeros = "0123456789 ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; // Permitir letras y números

	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	if (input.value.length >= 18 && especiales.indexOf(keyCode) === -1 && keyCode !== 8) {
		e.preventDefault();
		return false;
	}

	if (letrasYNumeros.indexOf(tecla.toUpperCase()) === -1 && !esEspecial) {
		e.preventDefault();
		return false;
	}

	setTimeout(function () {
		input.value = input.value.toUpperCase(); // Convertir todo el valor del input a mayúsculas después de un breve retraso
	}, 0);

	return true;
}


function soloLetrasNumerosrfc(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode);

	const letrasYNumeros = "0123456789 ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; // Permitir letras y números

	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	if (input.value.length >= 10 && especiales.indexOf(keyCode) === -1 && keyCode !== 8) {
		e.preventDefault();
		return false;
	}

	if (letrasYNumeros.indexOf(tecla.toUpperCase()) === -1 && !esEspecial) {
		e.preventDefault();
		return false;
	}

	setTimeout(function () {
		input.value = input.value.toUpperCase(); // Convertir todo el valor del input a mayúsculas después de un breve retraso
	}, 0);

	return true;
}

function soloLetrasNumeroshomo(e) {
	const input = e.target;
	const keyCode = e.keyCode || e.which;
	const tecla = String.fromCharCode(keyCode);

	const letrasYNumeros = "0123456789 ÁÉÍÓÚABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; // Permitir letras y números

	const especiales = [8, 37, 39, 46];
	const esEspecial = especiales.includes(keyCode);

	if (input.value.length >= 3 && especiales.indexOf(keyCode) === -1 && keyCode !== 8) {
		e.preventDefault();
		return false;
	}

	if (letrasYNumeros.indexOf(tecla.toUpperCase()) === -1 && !esEspecial) {
		e.preventDefault();
		return false;
	}

	setTimeout(function () {
		input.value = input.value.toUpperCase(); // Convertir todo el valor del input a mayúsculas después de un breve retraso
	}, 0);

	return true;
}

function soloNumerosseguridad(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key);
	let caracteresPermitidos = "0123456789";
	let especiales = [8, 37, 39, 46];


	if (caracteresPermitidos.indexOf(tecla) === -1 && especiales.indexOf(key) === -1) {
		return false;
	}

	let valorCampo = e.target.value.replace(/\D/g, '');

	if (valorCampo.length >= 11 && especiales.indexOf(key) === -1 && key !== 1) {
		e.preventDefault();
	}
}


function soloNumeroempleado(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key);
	let caracteresPermitidos = "0123456789";
	let especiales = [8, 37, 39, 46];


	if (caracteresPermitidos.indexOf(tecla) === -1 && especiales.indexOf(key) === -1) {
		return false;
	}

	let valorCampo = e.target.value.replace(/\D/g, '');

	if (valorCampo.length >= 6 && especiales.indexOf(key) === -1 && key !== 1) {
		e.preventDefault();
	}
}


function soloNumeroidrups(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key);
	let caracteresPermitidos = "0123456789";
	let especiales = [8, 37, 39, 46];


	if (caracteresPermitidos.indexOf(tecla) === -1 && especiales.indexOf(key) === -1) {
		return false;
	}

	let valorCampo = e.target.value.replace(/\D/g, '');

	if (valorCampo.length >= 9 && especiales.indexOf(key) === -1 && key !== 1) {
		e.preventDefault();
	}
}


function soloNumerofona(e) {
	let key = e.keyCode || e.which;
	let tecla = String.fromCharCode(key);
	let caracteresPermitidos = "0123456789";
	let especiales = [8, 37, 39, 46];


	if (caracteresPermitidos.indexOf(tecla) === -1 && especiales.indexOf(key) === -1) {
		return false;
	}

	let valorCampo = e.target.value.replace(/\D/g, '');

	if (valorCampo.length >= 7 && especiales.indexOf(key) === -1 && key !== 1) {
		e.preventDefault();
	}
}





/*TERMINO DE LA FUNCION PARA ESTABLECER LIMITANTES Y VALIDAR LA ACCIONES DE LOS INPUT*/


// FORMULA DE CURP 

(function (global) {
	'use strict';
	var comunes = ['MARIA', 'MA', 'MA.', 'JOSE', 'J', 'J.'];

	function filtraInconvenientes(str) {
		var inconvenientes = ['BACA', 'LOCO', 'BUEI', 'BUEY', 'MAME', 'CACA', 'MAMO',
			'CACO', 'MEAR', 'CAGA', 'MEAS', 'CAGO', 'MEON', 'CAKA', 'MIAR', 'CAKO', 'MION',
			'COGE', 'MOCO', 'COGI', 'MOKO', 'COJA', 'MULA', 'COJE', 'MULO', 'COJI', 'NACA',
			'COJO', 'NACO', 'COLA', 'PEDA', 'CULO', 'PEDO', 'FALO', 'PENE', 'FETO', 'PIPI',
			'GETA', 'PITO', 'GUEI', 'POPO', 'GUEY', 'PUTA', 'JETA', 'PUTO', 'JOTO', 'QULO',
			'KACA', 'RATA', 'KACO', 'ROBA', 'KAGA', 'ROBE', 'KAGO', 'ROBO', 'KAKA', 'RUIN',
			'KAKO', 'SENO', 'KOGE', 'TETA', 'KOGI', 'VACA', 'KOJA', 'VAGA', 'KOJE', 'VAGO',
			'KOJI', 'VAKA', 'KOJO', 'VUEI', 'KOLA', 'VUEY', 'KULO', 'WUEI', 'LILO', 'WUEY',
			'LOCA'];

		if (inconvenientes.indexOf(str) > -1) {
			str = str.replace(/^(\w)\w/, '$1X');
		}

		return str;
	}

	/**
	 * ajustaCompuesto()
	 * Cuando el nombre o los apellidos son compuestos y tienen
	 * proposiciones, contracciones o conjunciones, se deben eliminar esas palabras
	 * a la hora de calcular el CURP.
	 * @param {string} str - String donde se eliminarán las partes que lo hacen compuesto
	 */


	/*El objetivo ajustar o modificar una cadena de texto (str) 
	que representa un nombre o apellido, eliminando ciertas partes que podrían indicar que el nombre o apellido es compuesto. */
	function ajustaCompuesto(str) {
		var compuestos = [/\bDA\b/, /\bDAS\b/, /\bDE\b/, /\bDEL\b/, /\bDER\b/, /\bDI\b/,
			/\bDIE\b/, /\bDD\b/, /\bEL\b/, /\bLA\b/, /\bLOS\b/, /\bLAS\b/, /\bLE\b/,
			/\bLES\b/, /\bMAC\b/, /\bMC\b/, /\bVAN\b/, /\bVON\b/, /\bY\b/];

		compuestos.forEach(function (compuesto) {
			if (compuesto.test(str)) {
				str = str.replace(compuesto, '');
			}
		});

		return str;
	}

	/**
	* zeropad()
	* Rellena con ceros un string, para que quede de un ancho determinado.
	* @param {number} ancho - Ancho deseado.
	* @param {number} num - Numero que sera procesado.
	*/
	function zeropad(ancho, num) {
		var pad = Array.apply(0, Array.call(0, ancho)).map(function () { return 0; }).join('');

		return (pad + num).replace(new RegExp('^.*([0-9]{' + ancho + '})$'), '$1');
	}
	/**
	* primerConsonante()
	* Saca la primer consonante interna del string, y la devuelve.
	* Si no hay una consonante interna, devuelve X.
	* @param {string} str - String del cual se va a sacar la primer consonante.
	*/
	function primerConsonante(str) {
		str = str.trim().substring(1).replace(/[AEIOU]/ig, '').substring(0, 1);
		return (str === '' || str === 'Ñ') ? 'X' : str;
	}

	/**
	* filtraCaracteres()
	* Filtra convirtiendo todos los caracteres no alfabeticos a X.
	* @param {string} str - String el cual sera convertido.
	*/
	function filtraCaracteres(str) {
		return str.toUpperCase().replace(/[\d_\-\.\/\\,]/g, 'X');
	}

	/**
	* estadoValido()
	* Valida si el estado esta en la lista de estados, de acuerdo a la RENAPO.
	* @param {string} str - String con el estado.
	*/
	function estadoValido(str) {
		var estado = ['AS', 'BC', 'BS', 'CC', 'CS', 'CH', 'CL', 'CM', 'DF', 'DG',
			'GT', 'GR', 'HG', 'JC', 'MC', 'MN', 'MS', 'NT', 'NL', 'OC', 'PL', 'QT',
			'QR', 'SP', 'SL', 'SR', 'TC', 'TS', 'TL', 'VZ', 'YN', 'ZS', 'NE'];

		return (estado.indexOf(str.toUpperCase()) > -1);
	}


	/**
	* normalizaString()
	* Elimina los acentos, eñes y diéresis que pudiera tener el nombre.
	* @param {string} str - String con el nombre o los apellidos.
	*/
	function normalizaString(str) {
		var origen, destino, salida;
		origen = ['Ã', 'À', 'Á', 'Ä', 'Â', 'È', 'É', 'Ë', 'Ê', 'Ì', 'Í', 'Ï', 'Î',
			'Ò', 'Ó', 'Ö', 'Ô', 'Ù', 'Ú', 'Ü', 'Û', 'ã', 'à', 'á', 'ä', 'â',
			'è', 'é', 'ë', 'ê', 'ì', 'í', 'ï', 'î', 'ò', 'ó', 'ö', 'ô', 'ù',
			'ú', 'ü', 'û', 'Ç', 'ç'];
		destino = ['A', 'A', 'A', 'A', 'A', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I',
			'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'a', 'a', 'a', 'a', 'a',
			'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'u',
			'u', 'u', 'u', 'c', 'c'];
		str = str.split('');
		salida = str.map(function (char) {
			var pos = origen.indexOf(char);
			return (pos > -1) ? destino[pos] : char;
		});

		return salida.join('');
	}


	/**
	* agregaDigitoVerificador()
	* Agrega el dígito que se usa para validar el CURP.
	* @param {string} curp_str - String que contiene los primeros 17 caracteres del CURP.
	*/
	function agregaDigitoVerificador(curp_str) {
		var curp, caracteres, curpNumerico, suma, digito;

		// Convierte el CURP en un arreglo
		curp = curp_str.substring(0, 17).toUpperCase().split('');
		caracteres = [
			'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E',
			'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
			'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
		];

		// Convierte el curp a un arreglo de números, usando la posición de cada
		// carácter, dentro del arreglo `caracteres`.
		curpNumerico = curp.map(function (caracter) {
			return caracteres.indexOf(caracter);
		});

		suma = curpNumerico.reduce(function (prev, valor, indice) {
			return prev + (valor * (18 - indice));
		}, 0);

		digito = (10 - (suma % 10));

		if (digito === 10) {
			digito = 0;
		}

		return curp_str + digito;
	}

	/**
	 * extraerInicial()
	 * Funcion que extrae la inicial del primer nombre, o, si tiene mas de 1 nombre Y el primer
	 * nombre es uno de la lista de nombres comunes, la inicial del segundo nombre
	 * @param {string} nombre - String que representa todos los nombres (excepto los apellidos) separados por espacio
	 */
	function extraerInicial(nombre) {
		var nombres, primerNombreEsComun;
		nombres = nombre.toUpperCase().trim().split(/\s+/);
		primerNombreEsComun = (nombres.length > 1 && comunes.indexOf(nombres[0]) > -1);

		if (primerNombreEsComun) {
			return nombres[1].substring(0, 1);
		}

		return nombres[0].substring(0, 1);
	}

	/**
	* generaCurp()
	* Función principal que genera el CURP.
	* @param {object} param - Objeto que tiene los parámetros necesarios para poder generar el curp,
	* Las propiedasdes del objeto param son:
	* @param {string} nombre - Nombre(s).
	* @param {string} apellido_paterno - Apellido materno.
	* @param {string} apellido_materno - Apellido materno.
	* En caso de haber conjunciones en los apellidos, estas deben ir aqui.
	* @param {string} sexo - Sexo. H para hombre, M para mujer.
	* @param {string} estado - Estado, usando las abreviaturas oficiales.
	* @param {array} fecha_nacimiento - Arreglo con [ día, mes, año ], cada uno como numero.
	* @param {string} [homonimia] - Opcional. Valor usado para evitar repeticiones, es asignado por gobernación.
	* Por default es 0 si la fecha de nacimiento es menor o igual a 1999, o A, si es igual o mayor a 2000.
	*/
	function generaCurp(param) {
		var inicial_nombre, vocal_apellido, posicion_1_4, posicion_14_16, curp, primera_letra_paterno, primera_letra_materno, nombres, nombre_a_usar, pad;

		pad = zeropad.bind(null, 2);
		if (!estadoValido(param.estado)) {
			return false;
		}

		param.nombre = ajustaCompuesto(normalizaString(param.nombre.toUpperCase())).trim();
		param.apellido_paterno = ajustaCompuesto(normalizaString(param.apellido_paterno.toUpperCase())).trim();

		param.apellido_materno = param.apellido_materno || "";
		param.apellido_materno = ajustaCompuesto(normalizaString(param.apellido_materno.toUpperCase())).trim();

		inicial_nombre = extraerInicial(param.nombre);

		vocal_apellido = param.apellido_paterno.trim().substring(1).replace(/[BCDFGHJKLMNÑPQRSTVWXYZ]/g, '').substring(0, 1);
		vocal_apellido = (vocal_apellido === '') ? 'X' : vocal_apellido;

		primera_letra_paterno = param.apellido_paterno.substring(0, 1);
		primera_letra_paterno = primera_letra_paterno === 'Ñ' ? 'X' : primera_letra_paterno;

		if (!param.apellido_materno || param.apellido_materno === "") {
			primera_letra_materno = 'X';
		} else {
			primera_letra_materno = param.apellido_materno.substring(0, 1);
			primera_letra_materno = primera_letra_materno === 'Ñ' ? 'X' : primera_letra_materno;
		}

		posicion_1_4 = [
			primera_letra_paterno,
			vocal_apellido,
			primera_letra_materno,
			inicial_nombre
		].join('');

		posicion_1_4 = filtraInconvenientes(filtraCaracteres(posicion_1_4));

		nombres = param.nombre.split(" ").filter(function (palabra) {
			return palabra !== "";
		});
		nombre_a_usar = comunes.indexOf(nombres[0]) > -1 ? nombres[1] : nombres[0];

		posicion_14_16 = [
			primerConsonante(param.apellido_paterno),
			primerConsonante(param.apellido_materno),
			primerConsonante(nombre_a_usar)
		].join('');

		curp = [
			posicion_1_4,
			pad(param.fecha_nacimiento[2] - 1900),
			pad(param.fecha_nacimiento[1]),
			pad(param.fecha_nacimiento[0]),
			param.sexo.toUpperCase(),
			param.estado.toUpperCase(),
			posicion_14_16,
			param.homonimia || (param.fecha_nacimiento[2] > 1999 ? 'A' : 0)
		].join('');

		return agregaDigitoVerificador(curp);
	}

	// Si es un navegador, exporta 'generaCurp' a una variable global.
	if (global.hasOwnProperty('window') && global.window === global) {
		global.generaCurp = generaCurp;
	} else {
		module.exports = generaCurp;
	}

}(this));
/*==============================================================================*/
/*+++ Aqui va la implementacion +++*/
function calcularCurp() {
	var nombre = document.getElementById("nombre").value;
	var apellido_paterno = document.getElementById("apellidopaterno").value;
	var apellido_materno = document.getElementById("apellidomaterno").value;
	var sexo = document.getElementById("genero").value;
	var estado = document.getElementById("estado").value;
	var fecha_nacimiento = [document.getElementById("dia").value
		, document.getElementById("mes").value
		, document.getElementById("anio").value];

	/*
	var curp = generaCurp({
	  nombre            : 'Constantina',
	  apellido_paterno  : 'Vazquez',
	  apellido_materno  : 'Bautista',
	  sexo              : 'M',
	  estado            : 'PL',
	  fecha_nacimiento  : [25, 02, 1957]
	});
	*/

	var curp = generaCurp({
		nombre: nombre,
		apellido_paterno: apellido_paterno,
		apellido_materno: apellido_materno,
		sexo: sexo,
		estado: estado,
		fecha_nacimiento: fecha_nacimiento
	});

	if (nombre === '' || apellido_paterno === '' || apellido_materno === '' || sexo === '' || estado === '' || fecha_nacimiento.includes('')) {


		swal({
			title: 'Por favor, completa todos los campos antes de calcular la CURP.',
			icon: "error",

		  });
        return; // Detener la ejecución si algún campo está vacío
    }

	var primeros10Caracteres = curp.substring(0, 10);
	document.getElementById('rfc').value = primeros10Caracteres;
	document.getElementById('curp2').value = curp;
	document.getElementById('nombre').value = nombre;
	document.getElementById('apellidopaterno').value = apellido_paterno;
	document.getElementById('apellidomaterno').value = apellido_materno;


}


/***********/
function validarInput(input) {
	var curp = input.value.toUpperCase(),
		resultado = document.getElementById("resultado2"),
		valido = "No válido";

	if (curpValida(curp)) {
		valido = "Válido";
		resultado.classList.add("ok");
	} else {
		resultado.classList.remove("ok");
	}

	resultado.innerText = "CURP: " + curp + "\nFormato: " + valido;
}

function curpValida(curp) {
	var re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
		validado = curp.match(re);

	if (!validado)  //Coincide con el formato general?
		return false;

	//Validar que coincida el dígito verificador
	function digitoVerificador(curp17) {
		//Fuente https://consultas.curp.gob.mx/CurpSP/
		var diccionario = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
			lngSuma = 0.0,
			lngDigito = 0.0;
		for (var i = 0; i < 17; i++)
			lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
		lngDigito = 10 - lngSuma % 10;
		if (lngDigito == 10)
			return 0;
		return lngDigito;
	}
	if (validado[2] != digitoVerificador(validado[1]))
		return false;

	return true; //Validado
}





function habilitarInputs() {
	// Obtener referencias a los elementos input
	var nombreInput = document.getElementById('nombre');
	var paternoInput = document.getElementById('apellidopaterno');
	var maternoInput = document.getElementById('apellidomaterno');
	var curpInput = document.getElementById('curp2');
	var rfcInput = document.getElementById('rfc');
	var homoclaveInput = document.getElementById('homoclave');
	var generoInput = document.getElementById('genero');
	var estadocivilInput = document.getElementById('estadocivil');
	var socialInput = document.getElementById('seguridadsocial');
	var nacionalidadInput = document.getElementById('nacionalidad');
	var estadoInput = document.getElementById('estado');
	var municipioInput = document.getElementById('municipio');

	var empleadoInput = document.getElementById('empleado');
	var iduspInput = document.getElementById('idusp');
	var contratacionInput = document.getElementById('contratacion');
	var regimenInput = document.getElementById('regimen');
	var fechadeingresoInput = document.getElementById('fechaingreso');
	var fechadeingresospInput = document.getElementById('fechaingresosp');
	var fonacotInput = document.getElementById('idinfonacot');
	var situacionInput = document.getElementById('situacion');
	var mesInput = document.getElementById('mes');
	var diaInput = document.getElementById('dia');
	var anioInput = document.getElementById('anio');
	var calculoInput = document.getElementById('calculo');
	var nametableInput = document.getElementById('hijo_name');
	var tablecurpInput = document.getElementById('curp_table');
	var appaternotableInput = document.getElementById('apellido_paterno[]');
	var apmaternotableInput = document.getElementById('apellido_materno[]');
	var eliminarInput = document.getElementById('eliminar_table');
	var registroInput = document.getElementById('agregar_table');
	var agregarInput = document.getElementById('registrar_table');
	var fiscalInput = document.getElementById('postal_fiscal');
	var correoInput = document.getElementById('correo');
	var discapacidadInput = document.getElementById('discapacidades');
	var lenguajeInput = document.getElementById('lenguajes');
	var escolaridadInput = document.getElementById('escolaridad');
	var ctraInput = document.getElementById('autoComplete');
	var cdisInput = document.getElementById('autoCompleteuno');



	// Habilitar los inputs


	ctraInput.disabled = false;
	cdisInput.disabled = false;

	fiscalInput.disabled = false;
	eliminarInput.disabled = false;
	registroInput.disabled = false;
	agregarInput.disabled = false;

	correoInput.disabled = false;
	discapacidadInput.disabled = false;
	lenguajeInput.disabled = false;
	escolaridadInput.disabled = false;
	tablecurpInput.disabled = false;
	nametableInput.disabled = false;
	appaternotableInput.disabled = false;
	apmaternotableInput.disabled = false;

	calculoInput.disabled = false;
	diaInput.disabled = false;
	mesInput.disabled = false;
	anioInput.disabled = false;
	nombreInput.disabled = false;
	paternoInput.disabled = false;
	maternoInput.disabled = false;
	curpInput.disabled = false;
	rfcInput.disabled = false;
	homoclaveInput.disabled = false;
	generoInput.disabled = false;
	estadocivilInput.disabled = false;
	socialInput.disabled = false;
	nacionalidadInput.disabled = false;
	estadoInput.disabled = false;
	municipioInput.disabled = false;


	empleadoInput.disabled = false;
	iduspInput.disabled = false;
	contratacionInput.disabled = false;
	regimenInput.disabled = false;
	fechadeingresoInput.disabled = false;
	fechadeingresospInput.disabled = false;
	fonacotInput.disabled = false;
	situacionInput.disabled = false;


}







/*VALIDACION DE INICIO DE SESION*/
$(document).ready(function () {

	$("#usuCapturo").val(sessionStorage.nombre);

});
$(document).ready(function () {

	$("#usuModifico").val(sessionStorage.nombre);

});
$(document).ready(function () {

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechaCaptura").val(fechaHoy);

});

$(document).ready(function () {
	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechainicioUno").val(fechaHoy);

});
// $(document).ready(function () {

// 	var fechaHoy = new Date().toISOString().split('T')[0];
// 	$("#fechaTermino").val(fechaHoy);

// });

var selectDia = document.getElementById('dia');
for (var i = 1; i <= 31; i++) {
	var option = document.createElement('option');
	option.value = i.toString().padStart(2, '0'); // Añade un 0 delante si es necesario
	option.text = i.toString().padStart(2, '0');
	selectDia.appendChild(option);
}

// Generar opciones para el select de mes (del 1 al 12)
var selectMes = document.getElementById('mes');
for (var j = 1; j <= 12; j++) {
	var optionMes = document.createElement('option');
	optionMes.value = j.toString().padStart(2, '0'); // Añade un 0 delante si es necesario
	optionMes.text = j.toString().padStart(2, '0');
	selectMes.appendChild(optionMes);
}








/*VALIDACION DE INICIO DE SESION*/
$(document).ready(function () {

	$("#usuCapturo").val(sessionStorage.nombre);

});
$(document).ready(function () {

	$("#usuModifico").val(sessionStorage.nombre);

});
$(document).ready(function () {

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechaCaptura").val(fechaHoy);

});

$(document).ready(function () {
	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechainicioUno").val(fechaHoy);

});
$(document).ready(function () {

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechaTermino").val(fechaHoy);

});

// var selectDia = document.getElementById('dia');
// for (var i = 1; i <= 31; i++) {
//     var option = document.createElement('option');
//     option.value = i.toString().padStart(2, '0'); // Añade un 0 delante si es necesario
//     option.text = i.toString().padStart(2, '0');
//     selectDia.appendChild(option);
//     if (i === 31) {
//         break; 
//     }
// }


// // Generar opciones para el select de mes (del 1 al 12)
// var selectMes = document.getElementById('mes');
// for (var j = 1; j <= 12; j++) {
// 	var optionMes = document.createElement('option');
// 	optionMes.value = j.toString().padStart(2, '0'); // Añade un 0 delante si es necesario
// 	optionMes.text = j.toString().padStart(2, '0');
// 	selectMes.appendChild(optionMes);
// }




function agregarFila() {
	var tabla = document.getElementById("tablaCURPs");
	var nuevaFila = tabla.insertRow(tabla.rows.length);
	var cell1 = nuevaFila.insertCell(0);
	var cell2 = nuevaFila.insertCell(1);
	var cell3 = nuevaFila.insertCell(2);
	var cell4 = nuevaFila.insertCell(3);
	var cell5 = nuevaFila.insertCell(4);
	
	

	cell1.innerHTML = '<input type="text" class="form-control" name="curp[]">';
	cell2.innerHTML = '<input type="text" class="form-control" name="nombre[]">';
	cell3.innerHTML = '<input type="text" class="form-control" name="apellido_paterno[]">';
	cell4.innerHTML = '<input type="text" class="form-control" name="apellido_materno[]">';
	cell5.innerHTML = '<button type="button" class="btn btn-danger" onclick="eliminarFila(this)">Eliminar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg></button>';
}

function eliminarFila(boton) {
	var fila = boton.parentNode.parentNode;
	fila.parentNode.removeChild(fila);
}







//FUNCION PARA EL CALENDARIO CON EL ICONO
$(document).ready(function () {
	$('#calendario-icon').datepicker({
		format: 'dd-mm-yyyy',
		autoclose: true,
		todayHighlight: true,
		language: 'es', // Cambia al idioma que desees
		startDate: '-100y',  // Permitir fechas hasta 100 años en el pasado
		endDate: '+100y',   // Permitir fechas hasta 100 años en el futuro
	}).on('changeDate', function (e) {
		// Al seleccionar una fecha en el calendario
		var fecha = e.format('dd-mm-yyyy').split('-');
		$('#dia').val(fecha[0]);
		$('#mes').val(fecha[1]);
		$('#anio').val(fecha[2]);
	});
});




// Generar opciones para el select de mes (del 1 al 12)
var selectMes = document.getElementById('mes');
for (var j = 1; j <= 12; j++) {
	var optionMes = document.createElement('option');
	optionMes.value = j.toString().padStart(2, '0'); // Añade un 0 delante si es necesario
	optionMes.text = j.toString().padStart(2, '0');
	selectMes.appendChild(optionMes);
}






	



