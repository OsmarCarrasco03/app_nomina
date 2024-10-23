async function buscarPersona() {
	const generoElegido = document.getElementById('genero').value;
	const situacionElegida = document.getElementById('situacion').value;
	const orgienedoElegido = document.getElementById('estado').value;
	const origenmunElegido = document.getElementById('municipio').value;
	const edocivilElegido = document.getElementById('edocivil').value;
	const nacionalidadElegido = document.getElementById('nacionalidad').value;

	const regimenisssteElegido = document.getElementById('regimen').value;

	const tipodiscapElegido = document.getElementById('discapacidades').value;

	const escolaridadElegido = document.getElementById('escolaridad').value;

	const idiomaElegido = document.getElementById('idioma').value;

	const datos = {};

	if (generoElegido) {
		datos.per_genero = generoElegido;
	}

	if (situacionElegida) {
		datos.per_situacion = situacionElegida;
	}


	if (orgienedoElegido) {
		datos.per_origenedo = orgienedoElegido;
	}

	if (origenmunElegido) {
		datos.per_origenmun = origenmunElegido;
	}

	if (edocivilElegido) {
		datos.per_edocivil = edocivilElegido;
	}


	if (nacionalidadElegido) {
		datos.per_nacionalidad = nacionalidadElegido;
	}

	if (regimenisssteElegido) {
		datos.per_regimenissste = regimenisssteElegido;
	}

	if (tipodiscapElegido) {
		datos.per_tipodiscap = tipodiscapElegido;
	}

	if (escolaridadElegido) {
		datos.per_escolaridad = escolaridadElegido;
	}

	if (idiomaElegido) {
		datos.per_idioma = idiomaElegido;
	}


	const request = await fetch('api/puestos/consulta/datosXeleccion', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	const personas = await request.json();

	descargarCSV(personas);


}


const button = document.getElementById('generarReporteBtn');

const loadingOverlay = document.getElementById('loadingOverlay');


// Función para mostrar la imagen de carga
function mostrarCarga() {
	loadingOverlay.style.display = 'flex';
}

// Función para ocultar la imagen de carga
function ocultarCarga() {
	loadingOverlay.style.display = 'none';
}

button.addEventListener('click', async () => {
	try {
		mostrarCarga(); // Mostrar la imagen de carga al iniciar la búsqueda

		// Realizar la búsqueda y generación del reporte
		await buscarPersona();

		// Mostrar un mensaje de éxito después de completar la búsqueda
		swal({
			title: "Reporte generado con éxito!",
			text: "Buen trabajo!",
			icon: "success",
			button: "Aceptar",
		});
	} catch (error) {
		// En caso de error, mostrar un mensaje de error
		swal({
			title: "Error",
			text: "Hubo un error al generar el reporte.",
			icon: "error",
			button: "Aceptar",
		});
	} finally {
		ocultarCarga(); // Ocultar la imagen de carga al completar la búsqueda, independientemente del resultado
	}

	// Reiniciar los valores de los selects
	const selects = document.querySelectorAll('select');
	selects.forEach(select => {
		select.value = "";
	});
});





function convertirAFormatoCSV(datos) {



	const separador = ',';



	const csvRows = [];







	// Agregar una fila de encabezado con descripciones



	const encabezado = ['ID', 'CURP', 'RFC', 'HOMOCLAVE', 'NOMBRE COMPLETO', 'GÉNERO ID', 'GENERO DESC', 'NO.DE SEGURIDAD SOCIAL', 'IDEDOCIVIL', 'ESTADO CIVIL', 'FECHA INGRESO', 'FECHAINGRESO SP',



		'FECHA BAJA', 'CLAVE NACIONALIDAD', 'NACIONALIDAD', 'CLAVE ORIGENEDO', 'ESTADO', 'CLAVE ORIGENMUN', 'MUNICIPIO', 'IDIOMA', 'IDIDIOMA',



		'ESCOLARIDAD', 'IDESCOLARIDAD', 'NUMERO DE EMPLEADO', 'CLAVE REGIMEN ISSSTE', 'REGIMEN', 'IDRUSP', 'IDFONACOT', 'FECHA INICIO', 'FECHA TERMINO', 'CLAVE DE USUCAPTURÓ', 'USUARIO QUE CAPTURÓ',



		'FECHA DE MODIFICACION', 'CLAVE USU MODIFICÓ', 'USUARIO QUE MODIFICÓ', 'DISCAPACIDAD', 'IDDISCAPACIDAD', 'CLAVE SITUACION', 'SITUACION'];



	csvRows.push(encabezado);







	// Convertir los datos en filas



	datos.forEach(fila => {



		const filaCSV = Object.keys(fila).map((clave, indice) => {



			let valor = fila[clave];



			// Asegurar que la columna "HOMOCLAVE" se trate como texto



			if (clave === 'HOMOCLAVE') {



				return `="${valor.toString().replace(/"/g, '""')}"`; // Encerrar entre comillas y agregar el signo "=" para evitar notación exponencial



			}



			if (typeof valor === 'string') {



				return `"${valor.replace(/"/g, '""')}"`;



			}



			return valor;



		});



		csvRows.push(filaCSV);



	});







	const csv = csvRows.map(row => row.join(separador)).join('\n');



	const BOM = '\uFEFF'; // Marca de orden de bytes para UTF-8



	return `data:text/csv;charset=utf-8,${encodeURIComponent(BOM + csv)}`;



}









function descargarCSV(datos) {



	const csv = convertirAFormatoCSV(datos);







	const enlace = document.createElement('a');



	enlace.setAttribute('href', csv);



	enlace.setAttribute('download', 'datos.csv');







	enlace.style.display = 'none';



	document.body.appendChild(enlace);



	enlace.click();



	document.body.removeChild(enlace);



}




document.addEventListener("DOMContentLoaded", function () {
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
			stringDatos +=
				persona.ctra_id + ' - ' + persona.ctra_clave + ' - ' + persona.ctra_nombre + ';';
		}

		let arrayDatosTrabajo = stringDatos.split(";");

		return arrayDatosTrabajo;
	}

	let arrayDatosTrabajo = autocompletarTrabajo();

	const autoCompleteTrabajo = new autoComplete({
		selector: "#autoComplete",
		placeHolder: "Búsqueda por clave o nombre",
		data: {
			src: arrayDatosTrabajo,
			cache: true,
		},
		resultItem: {
			element: (item, data) => {
				const values = data.value.split(" - ");
				const resultItem = document.createElement("div");
				resultItem.innerHTML = `<span>${values.slice(1).join(" - ")}</span>`;
				item.innerHTML = "";
				item.appendChild(resultItem);
			},
			highlight: true,
		},
		events: {
			input: {
				selection: (event) => {
					const selection = event.detail.selection.value;
					const values = selection.split(' - ');
					let selectedValue;

					if (values.length === 3) {
						// Valor seleccionado desde el modal
						selectedValue = values[0];
						autoCompleteTrabajo.input.value = selection;
						document.getElementById('ctra_id').value = values[0];
						document.getElementById('otroInputc').value = values.slice(1).join(' - ');
					} else {
						// Valor seleccionado normalmente
						selectedValue = values[0];
						autoCompleteTrabajo.input.value = values.slice(1).join(' - ');
						document.getElementById('ctra_id').value = selectedValue;
						document.getElementById('otroInputc').value = values.slice(1).join(' - ');
					}


				},
			},
		},

	});






	document.getElementById('btnsiguiente').addEventListener('click', function () {
		alert("si entro aquí a leer el SessionStorage");
		const valorObtenido = sessionStorage.getItem('ctroDist');
		if (valorObtenido) {
			var valores = valorObtenido.split("|");
			alert('id: ' + valores[0]);
			alert('clave: ' + valores[1]);
			alert('descripcion: ' + valores[2]);

			// Pegar los valores en campos específicos (reemplaza 'autoCmplite' y 'otroInputc' con los IDs correctos de tus campos)
			document.getElementById('autoComplete').value = valores[1] + ' - ' + valores[2];
			document.getElementById('otroInputc').value = valores[1] + ' - ' + valores[2];
			document.getElementById('valorID').value = valores[0];

			sessionStorage.removeItem('ctroDist');
			alert('sessionStorage borrado');
			const alertaModal = document.getElementById('alertaModal');
			alertaModal.style.display = 'none';
			// Cierra el modal después de realizar las operaciones
			$('#miModal').modal('hide');
		}

	});
});





async function consultarDiscap() {
	const request = await fetch('api/persona/Obtenerdiscapacidad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const discapSelect = $('#discapacidades');
	discapSelect.empty();


	discapSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		discapSelect.append(`<option value="${persona.lper_clave}">${persona.lper_descripcion}</option>`);
	});
}


$(document).ready(function () {
	consultarDiscap();
});


async function consultarEsc() {
	const request = await fetch('api/persona/Obtenerescolaridad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const escSelect = $('#escolaridad');
	escSelect.empty();


	escSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		escSelect.append(`<option value="${persona.esc_id}">${persona.esc_descripcion}</option>`);
	});
}


$(document).ready(function () {
	consultarEsc();
});



async function consultarIdio() {
	const request = await fetch('api/persona/Obteneridioma/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const idioSelect = $('#idioma');
	idioSelect.empty();


	idioSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		idioSelect.append(`<option value="${persona.idio_id}">${persona.idio_descripcion}</option>`);
	});
}


$(document).ready(function () {
	consultarIdio();
});







async function consultarPuestoDetalle() {
	const request = await fetch('api/persona/Obtenergenero/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const generoSelect = $('#genero');
	generoSelect.empty();


	generoSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		generoSelect.append(`<option value="${persona.lper_clave}">${persona.lper_descripcion}</option>`);
	});
}


$(document).ready(function () {
	consultarPuestoDetalle();
});


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


async function consultarPuestoEstadoS() {
	const request = await fetch('api/persona/Obtenerestado/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const estados = await request.json();


	const estadoSelect = $('#estado');
	estadoSelect.empty();


	estadoSelect.append('<option value="" disabled selected>Selecciona un estado</option>');


	estados.forEach(estado => {
		estadoSelect.append(`<option value="${estado.edo_id}">${estado.edo_nombre}</option>`);
	});


	estadoSelect.on('change', function () {
		const estadoSeleccionado = $(this).val();
		consultarMunicipiosPorEstadoS(estadoSeleccionado);
	});
}


async function consultarMunicipiosPorEstadoS(estadoSeleccionado) {
	const estadoId = parseInt(estadoSeleccionado);

	const request = await fetch('api/persona/Obtenermunicipio/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const municipios = await request.json();


	const municipioSelect = $('#municipio');
	municipioSelect.empty();


	municipioSelect.append('<option value="" disabled selected>Selecciona un municipio</option>');


	const municipiosFiltrados = municipios.filter(municipio => municipio.mun_edopadre === estadoId);


	municipiosFiltrados.forEach(municipio => {
		municipioSelect.append(`<option value="${municipio.mun_numero}">${municipio.mun_nombre}</option>`);
	});
}



$(document).ready(function () {
	consultarPuestoEstadoS();
});


async function consultarPuestoEdocivil() {
	const request = await fetch('api/persona/Obteneredocivil/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const personas = await request.json();


	const estadocivilSelect = $('#edocivil');
	estadocivilSelect.empty();


	estadocivilSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	personas.forEach(persona => {
		estadocivilSelect.append(`<option value="${persona.lper_clave}">${persona.lper_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarPuestoEdocivil();
});

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

async function consultarContratacion() {
	const request = await fetch('api/persona/Obtenercontratacion/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const contrataciones = await request.json();


	const contratacionSelect = $('#contratacion');
	contratacionSelect.empty();


	contratacionSelect.append('<option value="" disabled selected>Selecciona una opción</option>');
	contrataciones.forEach(contratacion => {
		contratacionSelect.append(`<option value="${contratacion.lper_clave}">${contratacion.lper_descripcion}</option>`);
	});
}

$(document).ready(function () {
	consultarContratacion();
});

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








let footer = document.querySelector('footer');

if (!footer) {
	footer = document.createElement('footer');


	footer.innerHTML = `
					        <div class="footer-content">
					            <p>Copyright &copy; 2023. Financiera para el Bienestar, Todos los derechos reservados.</p>
					        </div>
					    `;


	footer.style.backgroundColor = '#13322b';
	footer.style.color = 'white';
	footer.style.textAlign = 'center';
	footer.style.fontSize = '15px';
	footer.style.position = 'fixed';
	footer.style.bottom = '0';
	footer.style.width = '100%';


	document.body.appendChild(footer);
}


document.addEventListener("DOMContentLoaded", function () {

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

			stringDatos +=

				persona.cdis_id + ' - ' + persona.cdis_clave + ' - ' + persona.cdis_nombre + ';';

		}


		let arrayDatos = stringDatos.split(";");

		return arrayDatos;


	}


	let arrayDatos = autocompletarDistribucion();

	const autoCompleteJS = new autoComplete({

		selector: "#autoCompleteuno",

		placeHolder: "Búsqueda por clave o nombre",

		data: {

			src: arrayDatos,

			cache: true,

		},

		resultItem: {

			element: (item, data) => {

				const values = data.value.split(" - ");

				const resultItem = document.createElement("div");

				resultItem.innerHTML = `<span>${values.slice(1).join(" - ")}</span>`;

				item.innerHTML = "";

				item.appendChild(resultItem);

			},

			highlight: true,

		},

		events: {

			input: {

				selection: (event) => {

					const selection = event.detail.selection.value;

					const values = selection.split(' - ');

					const cdis_id = values[0];

					autoCompleteJS.input.value = values.slice(1).join(' - ');

					document.getElementById('cdis_id').value = cdis_id;

					document.getElementById('otroInput').value = values.slice(1).join(' - ');

				},

			},

		},

	});

});




const siguienteBtnDistribucion = document.getElementById('btnsiguientedist');

const otroInput = document.getElementById('otroInput');
const autoCompleteuno = document.getElementById('autoCompleteuno');
const valorIDdist = document.getElementById('valorIDdist');
const customAlert = document.getElementById('customAlert');

siguienteBtnDistribucion.addEventListener('click', () => {
	const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
	const selectedOption = opcionesModalSelect.value;


	if (!selectedOption) {
		alertMessage.innerText = 'Por favor, selecciona una opción.';
		customAlert.style.display = 'block';
		return;
	}

	const selectedText = opcionesModalSelect.querySelector(`option[value="${selectedOption}"]`).innerText;
	const concatenatedText = ` ${selectedText}`;
	otroInput.value = concatenatedText;
	autoCompleteuno.value = concatenatedText;
	const cdis_id = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].value;
	valorIDdist.value = cdis_id || '';
	habilitarBtnGuardar();

	$('#miModaldist').modal('hide');
	hideAlert();
});

function hideAlert() {
	customAlert.style.display = 'none';
}

opcionesModalSelect.addEventListener('change', hideAlert);





// Obtener el botón "Guardar" del primer modal
const btnGuardar = document.getElementById('btnver');
btnGuardar.disabled = true;

function habilitarBtnGuardar() {
	btnGuardar.disabled = false;
}

// Manejar evento al hacer clic en el botón "Guardar"
btnGuardar.addEventListener('click', () => {

	const tablaDatos = document.createElement('table');
	tablaDatos.classList.add('table'); // 


	// Obtener el valor seleccionado y el texto del primer modal
	const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
	const estadoModalSelect = document.getElementById('estadoModalDistribucion');

	const selectedOption = opcionesModalSelect.value;
	const selectedState = estadoModalSelect.value;

	if (!selectedOption || !selectedState) {
		document.getElementById('alertMessage').innerText = 'Por favor, selecciona una opción y un estado.';
		document.getElementById('customAlert').style.display = 'block';
		return;
	}

	const selectedOptionText = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].innerText;
	const selectedStateText = estadoModalSelect.options[estadoModalSelect.selectedIndex].innerText;

	// Obtener el valor de cdis_unidad del elemento seleccionado
	const selectedUnidad = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].getAttribute('data-cdis-unidad');

	const modal2Body = document.querySelector('#miModal2 .modal-body');
	modal2Body.innerHTML = `

<ul style="list-style-type: disc;">
    <li>CENTRO DE DISTRIBUCIÓN: ${selectedOptionText}</li><hr>
    <li>ESTADO DE CENTRO DE DISTRIBUCION: ${selectedStateText}</li><hr>
    <li>UNIDAD DE CENTRO: ${selectedUnidad}</li><hr>
</ul>

    
`;

	// Establecer el estado seleccionado en el input del segundo modal
	const estadoModalInput = document.getElementById('estado_modal');
	estadoModalInput.value = selectedStateText;

	// Establecer cdis_unidad en el input con id "unidad_modal"
	const unidadModalInput = document.getElementById('unidad_modal');
	unidadModalInput.value = selectedUnidad;

	// Cerrar el primer modal
	$('#miModaldist').modal('hide');

	// Mostrar el segundo modal
	$('#miModal2').modal('show');
});