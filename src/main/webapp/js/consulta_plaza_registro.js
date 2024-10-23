let ctraIdGlobal = ''; // Servicio
let cdisIdGlobal = ''; // Servicio

// /******************************************CUARTO  MÓDULO DE  DATOS DE CENTRO DE TRABAJO Y MODAL  *********************************/
document.addEventListener("DOMContentLoaded", function() {
	let ctraIdGlobal = ''; // Cambié el nombre de la variable y la inicialicé aquí

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
			stringDatos += persona.ctra_clave + ' - ' + persona.ctra_nombre + ';';
		}

		let arrayDatosTrabajo = stringDatos.split(";");

		return { arrayDatosTrabajo, personas };
	}

	async function inicializarAutocompletadoTrabajo() {
		const { arrayDatosTrabajo, personas } = await autocompletarTrabajo();

		const autoCompleteTrabajo = new autoComplete({
			selector: "#autoCompletenone",
			placeHolder: "Búsqueda por clave o nombre",
			data: {
				src: arrayDatosTrabajo,
				cache: true,
			},
			resultItem: {
				highlight: true,
			},
			events: {
				input: {
					selection: (event) => {
						const selection = event.detail.selection.value;
						const values = selection.split(' - ');

						// Asignar el valor del ID correspondiente a la clave seleccionada
						const selectedPersona = personas.find(persona => persona.ctra_clave === values[0]);
						if (selectedPersona) {
							document.getElementById('ctra_id').value = selectedPersona.ctra_id;
							ctraIdGlobal = selectedPersona.ctra_id; // Asignar el valor a ctraIdGlobal
						}

						if (values.length === 3) {
							autoCompleteTrabajo.input.value = selection;
							document.getElementById('otroInputc').value = selection; // Cambiado aquí
						} else {
							autoCompleteTrabajo.input.value = selection;
							document.getElementById('otroInputc').value = selection; // Cambiado aquí
						}
					},
				},
			},
		});
	}

	inicializarAutocompletadoTrabajo();

});




// /*SE EMPIEZA A LLENAR Y A FUNCIONAR OS BOTONES INDEPENDIENTES PARA ACTIVAAR UN SEGUNDO MODAL  */
document.getElementById('btnsiguientectra').addEventListener('click', function() {

	// INICIO Validacion (Servicio)
	const opcionesModalSelect = document.getElementById('opcionesModal');
	const selectedOption = opcionesModalSelect.value;

	if (!selectedOption) {

		swal({
			title: 'Error',
			text: 'Completar los campos faltantes',
			icon: 'error',
			button: 'Aceptar',
		});
		return;
	}
	// FIN Validacion (Servicio)

	/*alert("si entro aquí a leer el SessionStorage");*/
	const valorObtenido = sessionStorage.getItem('ctroDist');

	if (valorObtenido) {
		var valores = valorObtenido.split("|");
		/*alert('id: ' + valores[0]);
		alert('clave: ' + valores[1]);
		alert('descripcion: ' + valores[2]);*/

		document.getElementById('autoCompletenone').value = valores[1] + ' - ' + valores[2];
		document.getElementById('otroInputc').value = valores[1] + ' - ' + valores[2];
		document.getElementById('ctra_id').value = valores[0];

		ctraIdGlobal = valores[0];

		sessionStorage.removeItem('ctroDist');
		/*alert('sessionStorage borrado');*/

		$('#miModal').modal('hide');
	}
});


const btnSiguiente = document.getElementById('btnsiguientectra');


const btnGuardars = document.getElementById('nuevoBoton');
btnGuardars.disabled = true;

btnSiguiente.addEventListener('click', () => {



	const opcionesModalSelect = document.getElementById('opcionesModal');
	const selectedOption = opcionesModalSelect.value;

	if (selectedOption) {
		habilitarBtnGuardars();
	} else {
		btnGuardars.disabled = true;
	}
});

function habilitarBtnGuardars() {
	btnGuardars.disabled = false;
}


btnSiguiente.addEventListener('click', () => {

	const opcionesModalSelect = document.getElementById('opcionesModal');
	const selectedOption = opcionesModalSelect.value;

	/*function mostrarAlerta(mensaje) {
	
		const svgIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svgIcon.setAttribute("width", "20");
		svgIcon.setAttribute("height", "20");
		svgIcon.setAttribute("fill", "currentColor");
		svgIcon.setAttribute("class", "bi bi-exclamation-circle");
		svgIcon.setAttribute("viewBox", "0 0 16 16");
	
	  
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.93 11.524a.818.818 0 1 1-1.647 0 .818.818 0 0 1 1.647 0zM8.018 4.5a.57.57 0 0 1 .567.543l.03 4.414a.57.57 0 1 1-1.138.057l-.03-4.414a.57.57 0 0 1 .57-.6zM8 12a.818.818 0 1 1 0-1.637A.818.818 0 0 1 8 12z");
	
	  
		svgIcon.appendChild(path);
	
		customAlert.innerHTML = '';
	
		const mensajeElemento = document.createElement("span");
		mensajeElemento.innerText = mensaje;
		customAlert.appendChild(mensajeElemento);
	
		customAlert.appendChild(svgIcon);
	
		customAlert.style.display = 'flex';
		customAlert.style.alignItems = 'center';
		customAlert.style.justifyContent = 'space-between';
	}
	
	// Llamada a la función mostrarAlerta si no se selecciona una 	opción
	if (!selectedOption) {
		mostrarAlerta('Por favor, selecciona una opción.');
		return;
	}*/


	const estadoModalSelect = document.getElementById('estadoModal');
	const selectedStateText = estadoModalSelect.options[estadoModalSelect.selectedIndex].innerText;

	const municipioModalSelect = document.getElementById('municipioModal');
	const selectesdtateText = municipioModalSelect.options[municipioModalSelect.selectedIndex].innerText;



	const calleModalInput = document.getElementById('calleModal').value;
	const localidadModalInput = document.getElementById('localidadModal').value;
	const coloniaModalInput = document.getElementById('coloniaModal').value;
	const exteriorModalInput = document.getElementById('exteriorModal').value;
	const interiorModalInput = document.getElementById('interiorModal').value;
	const calleunoModalInput = document.getElementById('calleunoModal').value;
	const calledosModalInput = document.getElementById('calledosModal').value;



	const nuevoModalBody = document.querySelector('#nuevoModal .modal-body');
	nuevoModalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="centroInput">Centro:</label>
            <input type="text" id="centroInput" value="${selectedOption}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="estadoInput">Estado:</label>
            <input type="text" id="estadoInput" value="${selectedStateText}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="municipioInput">Municipio:</label>
            <input type="text" id="municipioInput" value="${selectesdtateText}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="calleInput">Calle:</label>
            <input type="text" id="calleInput" value="${calleModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="coloniaInput">Colonia:</label>
            <input type="text" id="coloniaInput" value="${coloniaModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="localidadInput">Localidad:</label>
            <input type="text" id="localidadInput" value="${localidadModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="exteriorInput">No. Exterior:</label>
            <input type="text" id="exteriorInput" value="${exteriorModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="interiorInput">No. Interior:</label>
            <input type="text" id="interiorInput" value="${interiorModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="calleUnoInput">Entre Calle Uno:</label>
            <input type="text" id="calleUnoInput" value="${calleunoModalInput}" disabled>
        </div>
        <div style="display: flex; align-items: center;">
            <label style="width: 120px; margin-right: 10px;" for="calleDosInput">Entre Calle Dos:</label>
            <input type="text" id="calleDosInput" value="${calledosModalInput}" disabled>
        </div>
        <!-- Agrega más campos de entrada según tus necesidades -->
    </div>
`;


	/*   // Mostrar el segundo modal
	   $('#nuevoModal').modal('show');*/
});


/*FUNCIONALIDAD PARA CTRA DE TRABAJO Y CDIS DISTRIBUCION*/
/*IVAN RODRIGUEZ 27 DE NOVIEMBRE DE 2023*/
document.addEventListener("DOMContentLoaded", function() {
	let cdisIdVariable = ''; // Declara la variable fuera del alcance de la función autocompletarDistribucion

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
			stringDatos += persona.cdis_clave + ' - ' + persona.cdis_nombre + ';';
		}
		let arrayDatos = stringDatos.split(";");

		return { arrayDatos, personas };
	}

	async function inicializarAutocompletadoDistribucion() {
		const { arrayDatos, personas } = await autocompletarDistribucion();

		const autoCompleteJS = new autoComplete({
			selector: "#autoCompleteuno",
			placeHolder: "Búsqueda por clave o nombre",
			data: {
				src: arrayDatos,
				cache: true,
			},
			resultItem: {
				highlight: true,
			},
			events: {
				input: {
					selection: (event) => {
						const selection = event.detail.selection.value;
						const values = selection.split(' - ');

						// Asignar el valor del ID correspondiente a la clave seleccionada
						const selectedPersona = personas.find(persona => persona.cdis_clave === values[0]);
						if (selectedPersona) {
							document.getElementById('cdis_id').value = selectedPersona.cdis_id;
						}

						cdisIdGlobal = values[0];

						autoCompleteJS.input.value = selection;
						document.getElementById('otroInput').value = selection;
					},
				},
			},
		});
	}

	inicializarAutocompletadoDistribucion();
});



const siguienteBtnDistribucion = document.getElementById('btnsiguientedist');
siguienteBtnDistribucion.addEventListener('click', () => {
	const campo1 = document.getElementById('estadoModalDistribucion'); // Reemplaza 'campo1' con el ID de tu primer campo
	const campo2 = document.getElementById('opcionesModal'); // Reemplaza 'campo2' con el ID de tu segundo campo

	if (!campo1.value.trim() || !campo2.value.trim()) {

		('customAlert2', 'Por favor, completa todos los campos.');
	} else {
		// Aquí iría el resto de tu lógica si los campos no están vacíos
	}
});

function mostrarAlerta(idAlerta, mensaje) {
	const customAlert = document.getElementById(idAlerta);
	const alertMessage = customAlert.querySelector('span');
	alertMessage.innerText = mensaje;
	customAlert.style.display = 'block';
}
const customAlert = document.getElementById('customAlert');

const otroInput = document.getElementById('otroInput');
const autoCompleteuno = document.getElementById('autoCompleteuno');
const valorIDdist = document.getElementById('cdis_id');


siguienteBtnDistribucion.addEventListener('click', () => {
	const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
	const selectedOption = opcionesModalSelect.value;

	if (!selectedOption) {
		swal({
			title: 'Error',
			text: 'Completar los campos faltantes',
			icon: 'error',
			button: 'Aceptar',
		});
		return;
	}

	const selectedText = opcionesModalSelect.querySelector(`option[value="${selectedOption}"]`).innerText;
	const concatenatedText = ` ${selectedText}`;
	otroInput.value = concatenatedText;
	autoCompleteuno.value = concatenatedText;
	const cdis_id = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].value;
	valorIDdist.value = cdis_id || '';
	cdisIdGlobal = valorIDdist.value;
	habilitarBtnGuardar();

	$('#miModaldist').modal('hide');
	hideAlert();
});




function hideAlert() {
	customAlert.style.display = 'none';
}

opcionesModalSelect.addEventListener('change', hideAlert);


const btnGuardar = document.getElementById('btnver');
btnGuardar.disabled = true;

function habilitarBtnGuardar() {
	btnGuardar.disabled = false;
}


btnGuardar.addEventListener('click', () => {

	const tablaDatos = document.createElement('table');
	tablaDatos.classList.add('table');



	const opcionesModalSelect = document.getElementById('opcionesModalDistribucion');
	const estadoModalSelect = document.getElementById('estadoModalDistribucion');


	const selectedOptionText = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].innerText;
	const selectedStateText = estadoModalSelect.options[estadoModalSelect.selectedIndex].innerText;


	const selectedUnidad = opcionesModalSelect.options[opcionesModalSelect.selectedIndex].getAttribute('data-cdis-unidad');

	const modal2Body = document.querySelector('#miModal2 .modal-body');
	modal2Body.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 15px;">
        <div>
            <label for="centroInput" style="display: block;">CENTRO DE DISTRIBUCIÓN:</label>
            <input type="text" id="centroInput" value="${selectedOptionText}" style="width: 100%; padding: 8px;" disabled>
        </div>
        <div>
            <label for="estadoInput" style="display: block;">ESTADO DE CENTRO DE DISTRIBUCION:</label>
            <input type="text" id="estadoInput" value="${selectedStateText}" style="width: 100%; padding: 8px;" disabled>
        </div>
        <div>
            <label for="unidadInput" style="display: block;">UNIDAD DE CENTRO:</label>
            <input type="text" id="unidadInput" value="${selectedUnidad}" style="width: 100%; padding: 8px;" disabled>
        </div>
    </div>
`;
	const estadoModalInput = document.getElementById('estado_modal');
	estadoModalInput.value = selectedStateText;


	const unidadModalInput = document.getElementById('unidad_modal');
	unidadModalInput.value = selectedUnidad;


	$('#miModaldist').modal('hide');


	$('#miModal2').modal('show');
});



























$("document").ready(function() {
	//consultarDetallesPersonalizadosX();


	limpiarCampos();
	opcionesPlaza();
	eliminarEstilos();

	if (sessionStorage.permisos == 1) {
		$("#datos_control").prop("hidden", false);
	}
	$(".tab-pane").hide();

	// Mostramos el contenido de la pestaña activa
	var activeTab = $(".nav-link.active").attr("href");
	$("#" + activeTab).show();


});

// Inicia autocomplete para TspCodigo



let idIzquierdo;
let idDerecho;



let guardarUnidadId = ''; // Servicio
let arrayGuardarUnidadId = guardarUnidadId.split(";"); // Servicio




// INICIO variables creadas Servicio
// Para guardar el id de unidad

// Para guardar el id de puesto autorizado y puesto pagado
let puestoAutorizadoId;
let puestoPagadoId;
// Para guardar el texto de los selects

let MotivosDeObligacion;
let TramiteAEDMAJR;
let NivelEquivalencia;
// FIN variables creadas Servicio


// Crear el elemento footer


// Añadir el footer al final del body  api/unidad/detallesUnidad/
//document.body.appendChild(footer);

/*****COMIENZO DE LAS FUNCIONES DEL BUSCADOR DE LA UNIDAD***** */

async function autocompletarUnidad() {

	const request = await fetch('api/unidad/detallesUnidad/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const unidades = await request.json();

	//console.log(unidades);

	let stringDatos = '';
	let stringId = ''; // Servicio

	for (let unidad of unidades) {
		stringDatos += unidad.uni_idunidad + ' - ' + unidad.uni_desc + ';';
		stringId += unidad.uni_id + ';'; // Servicio
	}

	let arrayDatosUnidad = stringDatos.split(";");
	let arrayIdUnidad = stringId.split(";"); // Servicio

	return { arrayDatosUnidad, arrayIdUnidad, arrayGuardarUnidadId }; // Servicio
}

// let arrayDatosUnidad = autocompletarUnidad();

async function setupAutoComplete() { // Servicio
	const { arrayDatosUnidad, arrayIdUnidad, arrayGuardarUnidadId } = await autocompletarUnidad(); // Servicio

	const autoCompleteJSUnidad = new autoComplete({
		selector: "#autoCompleteUnidad",
		placeHolder: "Busqueda por código o unidad",
		data: {
			src: arrayDatosUnidad,
			cache: true,
		},
		resultsList: {
			element: (list, data) => {
				if (!data.results.length) {
					// Create "No Results" message element
					const message = document.createElement("div");
					// Add class to the created element
					message.setAttribute("class", "no_result");
					// Add message text content
					message.innerHTML = `<span>No hay resultados para "${data.query}"</span>`;
					// Append message element to the results list
					list.prepend(message);
				}
			},
			noResults: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				selection: (event) => {
					const selection = event.detail.selection.value;
					const selectedIndex = arrayDatosUnidad.indexOf(selection); // Servicio
					const selectedId = arrayIdUnidad[selectedIndex]; // Servicio

					autoCompleteJSUnidad.input.value = selection;
					arrayGuardarUnidadId.value = selectedId; // Servicio

					//console.log(arrayGuardarUnidadId.value);

					autoCompleteJSUnidad.input.disabled = true; // Servicio
					autoCompleteJSUnidad.input.classList.remove("input-invalid"); // Servicio


				}
			}
		}
	});

	// INICIO boton limpiar Servicio
	document.getElementById("habilitarBusqueda").addEventListener("click", function() {
		
		$('#habilitarBusqueda').prop('disabled', true);
		$('#btnSeleccionarUnidad').prop('disabled', false);

		autoCompleteJSUnidad.input.disabled = false;
		autoCompleteJSUnidad.input.value = "";

		document.getElementById("codigoUnidad").value = "";
		document.getElementById("nombreUnidad").value = "";
		arrayGuardarUnidadId.value = null;

		autoCompleteJSUnidad.input.classList.add("input-valid");

	});
	// FIN boton limpiar Servicio
}

// Llamamos a la función setupAutoComplete para inicializar el autocompletado
setupAutoComplete(); // Servicio	

function dividirDatos() {
	
	$('#habilitarBusqueda').prop('disabled', false);
	$('#btnSeleccionarUnidad').prop('disabled', true);
	
	// Obtener el valor del input por medio de su id
	var inputData = document.getElementById("autoCompleteUnidad").value;

	// Dividir los datos por guion medio
	var datosDivididos = inputData.split("-");
	let datosUnidadId = arrayGuardarUnidadId.value; // Servicio
	// Almacenar las cadenas divididas en dos variables
	var primeraCadena = datosDivididos[0];
	var segundaCadena = datosDivididos[1];
	// console.log(datosUnidadId);  

	if (datosDivididos.length < 2) { // INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar',

		});

		return;

	}

	if (datosUnidadId != undefined) {


	} else {

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}

	agregarValorAlInput("codigoUnidad", datosDivididos[0]);
	agregarValorAlInput("nombreUnidad", datosDivididos[1]);


	var limpia = document.getElementById("autoCompleteUnidad");
	limpia.value = "";

}

/*****FIN DE LAS FUNCIONES DEL BUSCADOR DE LA UNIDAD***** */



// COMIENZO DE LAS FUNCIONES PARA BUSCARDOR DERECHO

/* Inicia funcion buscar puestos de Sergio */

async function buscarPuestoX() {
	let datos = {};
	datos.ctgp_codigo = document
		.getElementById("segundoAutoComplete")
		.value.split("-")[0]
		.trim();

	const request = await fetch("api/puestos/consulta/datosXcodigo", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	});

	const puestos = await request.json();
	global_ctgp_codigo = document
		.getElementById("segundoAutoComplete")
		.value.split("-")[0]
		.trim();

	if (puestos.length === 0) {// INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}//FIN Validacion (servicio)

	if (!verificarJsonX(puestos)) {
		$("#modificarPuesto").removeAttr("disabled");
	}
	llenaModalX();
}

const verificarJsonX = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
};

async function autocompletarPuestosX() {
	const request = await fetch("api/puestos/puestosX_detallesX2/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puestos = await request.json();

	let stringDatos = "";

	for (var i = 0; i < puestos.length; i++) {
		stringDatos += puestos[i][0] + " - " + puestos[i][1] + ";";
	}

	let arrayDatosX = stringDatos.split(";");

	return arrayDatosX;
}

let arrayDatosX = autocompletarPuestosX();

const SegundoautoCompleteJS = new autoComplete({
	selector: "#segundoAutoComplete",
	placeHolder: "Busqueda por código o puesto",
	data: {
		src: arrayDatosX,
		cache: true,
	},
	resultsList: {
		element: (list, data) => {
			if (!data.results.length) {
				// Create "No Results" message element
				const message = document.createElement("div");
				// Add class to the created element
				message.setAttribute("class", "no_result");
				// Add message text content
				message.innerHTML = `<span>No hay resultados para "${data.query}"</span>`;
				// Append message element to the results list
				list.prepend(message);
			}
		},
		noResults: true,
	},
	resultItem: {
		highlight: true,
	},
	events: {
		input: {
			selection: (event) => {
				const selection = event.detail.selection.value;
				SegundoautoCompleteJS.input.value = selection;
			},
		},
	},
});

// Asocia el evento de abrir el modal al botón "abrirInfo"
//document.getElementById("abrirInfo").addEventListener("click", buscarPuestoX);

$("#modalInfo2").on("hidden.bs.modal", function() {
	$("body").removeClass("modal-open");
	$(".modal-backdrop").remove();
});

/* Finaliza funcion buscar puestos de Sergio */

/**Llenado del modal */

async function llenaModalX() {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto = await request.json();
	//console.log(puesto);

	const modal = document.getElementById("modalInfo2");
	const modalTitle = modal.querySelector(".modal-title");
	const modalBody = modal.querySelector(".modal-body");

	// Abre el modal      puestoAutorizadoId = codigoSeleccionado;

	$(modal).modal("show");

	// Llena el modal con las opciones
	modalTitle.textContent = "Selecciona una opción";

	// Limpia el contenido anterior del modalBody
	modalBody.innerHTML = "";
	modalBody.innerHTML = `<table class="table table-striped table-hover">
  <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Selección</th>      
      <th scope="col">Codigo</th>
      <th scope="col">Descripción</th> 
      <th scope="col">Tipo</th> 
      <th scope="col">Zona</th> 
      <th scope="col">Nivel</th> 
      <th scope="col">Contratación</th>      
    </tr>
  </thead>
  <tbody></tbody>
</table>`;

	// Nombre común para todos los elementos de radio
	const radioGroupName = "opciones";

	// Agrega opciones al modalBody
	const table = modalBody.querySelector("table tbody");
	table.innerHTML = "";
	let contador = 0;

	for (var i = 0; i < puesto.length; i++) {
		if (puesto[i][2] === global_ctgp_codigo) {
			//&& puesto[i][27] === 1

			contador++;
			const row = document.createElement("tr");

			//Numero
			const cell1 = document.createElement("td");
			cell1.innerHTML = `<label class="form-check-label" ">
        ${contador}
    </label>`;

			//Seleccion
			const cell2 = document.createElement("td");
			cell2.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" value="${puesto[i][0]}"
   data-codigo="${puesto[i][0]}" data-codigo2="${puesto[i][2]}" data-descripcion="${puesto[i][3]}"/>`;

			//Codigo
			const cell3 = document.createElement("td");
			cell3.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][2]}">
        ${puesto[i][2]}
    </label>`;

			//Descripcion
			const cell4 = document.createElement("td");
			cell4.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][3]}">
        ${puesto[i][3]}
    </label>`;

			//Tipo
			const cell5 = document.createElement("td");
			cell5.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][5]}">
        ${puesto[i][5]}
    </label>`;

			//Zona
			const cell6 = document.createElement("td");
			cell6.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][7]}">
        ${puesto[i][7]}
    </label>`;

			//Nivel
			const cell7 = document.createElement("td");
			cell7.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][9]}">
        ${puesto[i][9]}
    </label>`;

			//Contratacion
			const cell8 = document.createElement("td");
			cell8.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][17]}">
        ${puesto[i][17]}
    </label>`;

			row.appendChild(cell1);
			row.appendChild(cell2);
			row.appendChild(cell3);
			row.appendChild(cell4);
			row.appendChild(cell5);
			row.appendChild(cell6);
			row.appendChild(cell7);
			row.appendChild(cell8);

			table.appendChild(row);
		}
	}

	seleccionarBtn2.addEventListener("click", function() {
		// Busca el elemento de radio seleccionado
		const selectedRadio = modalBody.querySelector(
			'input[type="radio"]:checked'
		);

		if (selectedRadio) {
			// Obtiene los valores personalizados del elemento de radio seleccionado
			const codigoSeleccionado = selectedRadio.getAttribute("data-codigo");

			puestoPagadoId = codigoSeleccionado;
			const codigoPuestoSeleccionado = selectedRadio.getAttribute(
				"data-codigo2"
			);
			const descripcionSeleccionada = selectedRadio.getAttribute(
				"data-descripcion"
			);

			consultarDetallesPersonalizadosX(codigoSeleccionado);

			const limpiar = document.getElementById("segundoAutoComplete");
			limpiar.value = "";

			$(modal).modal("hide");
		} else {
			seleccionX();
		}
	});
}

// Fin funcion llenar modal

async function consultarDetallesPersonalizadosX(codigoPuesto) {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto_detalleX = await request.json();
	//var codigoPuesto = document.getElementById("codigoPuesto").value;

	for (var i = 0; i < puesto_detalleX.length; i++) {
		if (puesto_detalleX[i][0] == codigoPuesto) {
			idDerecho = puesto_detalleX[i][0];
			agregarValorAlInput("CodigoPuesto1", puesto_detalleX[i][2]);
			agregarValorAlInput("descripcion1", puesto_detalleX[i][3]);
			agregarValorAlInput("tipo1", puesto_detalleX[i][5]);
			agregarValorAlInput("Zona1", puesto_detalleX[i][7]);
			agregarValorAlInput("nivel1", puesto_detalleX[i][9]);
			agregarValorAlInput("categoria1", puesto_detalleX[i][11]);
			agregarValorAlInput("subcategoria1", puesto_detalleX[i][13]);
			agregarValorAlInput("classif_interna1", puesto_detalleX[i][15]);
			agregarValorAlInput("contratacion1", puesto_detalleX[i][17]);
			agregarValorAlInput("declaracion_patri1", puesto_detalleX[i][19]);

			if (idIzquierdo != null) {
				if (idIzquierdo == idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px; text-align:center; background-color: #6ac358; color: #202220 "> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">' +
						'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
						'<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>' +
						"</svg> La configuración de los puestos es igual </h4>";

					areaDestino.innerHTML = nuevoHTML;
				} else if (idIzquierdo != idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px;text-align:center; background-color: #ec5b4d; color: white "> <svg  width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"> <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/> <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg> La configuración de los puestos es diferente</h4>';
					areaDestino.innerHTML = nuevoHTML;
				}
			}
		}
	}
}

// Llama a la función para cargar los datos cuando sea necesario
//consultarDetallesPersonalizadosX();

function seleccionX() {
	swal({
		title: "Aviso",
		text: "Selecciona el puesto que deseas consultar",
		icon: "warning",
		button: "Aceptar",
	});
}

// FIN DEL CODIGO PARA EL BUSCAADOR DERECHO

// INICIO CODIGO DEL BUSCADOR IZQUIERDO

/* Inicia funcion buscar puestos de Sergio */

async function buscarPuesto() {

	let datos = {};
	datos.ctgp_codigo = document
		.getElementById("autoComplete")
		.value.split("-")[0]
		.trim();

	const request = await fetch("api/puestos/consulta/datosXcodigo", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	});

	const puestos = await request.json();
	global_ctgp_codigo = document
		.getElementById("autoComplete")
		.value.split("-")[0]
		.trim();

	if (puestos.length === 0) {// INICIO Validacion (servicio)

		swal({

			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}//FIN Validacion (servicio)

	if (!verificarJson(puestos)) {
		$("#modificarPuesto").removeAttr("disabled");
	}
	llenaModal();
}

const verificarJson = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
};

async function autocompletarPuestos() {
	const request = await fetch("api/puestos/puestosX_detallesX2/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puestos = await request.json();

	let stringDatos = "";

	for (var i = 0; i < puestos.length; i++) {
		stringDatos += puestos[i][0] + " - " + puestos[i][1] + ";";
	}

	let arrayDatos = stringDatos.split(";");

	return arrayDatos;
}

let arrayDatos = autocompletarPuestos();

const autoCompleteJS = new autoComplete({
	selector: "#autoComplete",
	placeHolder: "Busqueda por código o puesto",
	data: {
		src: arrayDatos,
		cache: true,
	},
	resultsList: {
		element: (list, data) => {
			if (!data.results.length) {
				// Create "No Results" message element
				const message = document.createElement("div");
				// Add class to the created element
				message.setAttribute("class", "no_result");
				// Add message text content
				message.innerHTML = `<span>No hay resultados para "${data.query}"</span>`;
				// Append message element to the results list
				list.prepend(message);
			}
		},
		noResults: true,
	},
	resultItem: {
		highlight: true,
	},
	events: {
		input: {
			selection: (event) => {
				const selection = event.detail.selection.value;
				autoCompleteJS.input.value = selection;
			},
		},
	},
});

// Asocia el evento de abrir el modal al botón "abrirInfo"
//document.getElementById("abrirInfo").addEventListener("click", buscarPuesto);

$("#modalInfo").on("hidden.bs.modal", function() {
	$("body").removeClass("modal-open");
	$(".modal-backdrop").remove();
});

/* Finaliza funcion buscar puestos de Sergio */

/**Boton limpiar */

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

/**Fin boton Limpiar */

/**Obtener Fecha */

function obtenerFechaActual() {
	const fecha = new Date();
	const dia = String(fecha.getDate()).padStart(2, "0");
	const mes = String(fecha.getMonth() + 1).padStart(2, "0");
	const año = fecha.getFullYear();

	return `${dia}/${mes}/${año}`;
}

/**Fin obtener Fecha */

/**Llenado del modal */

async function llenaModal() {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto = await request.json();

	const modal = document.getElementById("modalInfo");
	const modalTitle = modal.querySelector(".modal-title");
	const modalBody = modal.querySelector(".modal-body");

	// Abre el modal
	$(modal).modal("show");

	// Llena el modal con las opciones
	modalTitle.textContent = "Selecciona una opción";

	// Limpia el contenido anterior del modalBody
	modalBody.innerHTML = "";
	modalBody.innerHTML = `<table class="table table-striped table-hover">
  <thead>
    <tr>
    <th scope="col">#</th>
    <th scope="col">Selección</th>      
      <th scope="col">Codigo</th>
      <th scope="col">Descripción</th> 
      <th scope="col">Tipo</th> 
      <th scope="col">Zona</th> 
      <th scope="col">Nivel</th> 
      <th scope="col">Contratación</th>      
    </tr>
  </thead>
  <tbody></tbody>
</table>`;

	// Nombre común para todos los elementos de radio
	const radioGroupName = "opciones";

	// Agrega opciones al modalBody
	const table = modalBody.querySelector("table tbody");
	table.innerHTML = "";
	let contador = 0;

	for (var i = 0; i < puesto.length; i++) {
		if (puesto[i][2] === global_ctgp_codigo) {
			//&& puesto[i][27] === 1

			contador++;
			const row = document.createElement("tr");

			//Numero
			const cell1 = document.createElement("td");
			cell1.innerHTML = `<label class="form-check-label" ">
        ${contador}
    </label>`;

			//Seleccion
			const cell2 = document.createElement("td");
			cell2.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" value="${puesto[i][0]}"
   data-codigo="${puesto[i][0]}" data-codigo2="${puesto[i][2]}" data-descripcion="${puesto[i][3]}"/>`;

			//Codigo
			const cell3 = document.createElement("td");
			cell3.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][2]}">
        ${puesto[i][2]}
    </label>`;

			//Descripcion
			const cell4 = document.createElement("td");
			cell4.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][3]}">
        ${puesto[i][3]}
    </label>`;

			//Tipo
			const cell5 = document.createElement("td");
			cell5.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][5]}">
        ${puesto[i][5]}
    </label>`;

			//Zona
			const cell6 = document.createElement("td");
			cell6.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][7]}">
        ${puesto[i][7]}
    </label>`;

			//Nivel
			const cell7 = document.createElement("td");
			cell7.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][9]}">
        ${puesto[i][9]}
    </label>`;

			//Contratacion
			const cell8 = document.createElement("td");
			cell8.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][17]}">
        ${puesto[i][17]}
    </label>`;

			row.appendChild(cell1);
			row.appendChild(cell2);
			row.appendChild(cell3);
			row.appendChild(cell4);
			row.appendChild(cell5);
			row.appendChild(cell6);
			row.appendChild(cell7);
			row.appendChild(cell8);

			table.appendChild(row);
		}
	}

	seleccionarBtn.addEventListener("click", function() {
		// Busca el elemento de radio seleccionado
		const selectedRadio = modalBody.querySelector(
			'input[type="radio"]:checked'
		);

		if (selectedRadio) {
			// Obtiene los valores personalizados del elemento de radio seleccionado
			const codigoSeleccionado = selectedRadio.getAttribute("data-codigo");
			//console.log("Soy el puesto autorizado arriba", codigoSeleccionado);
			puestoAutorizadoId = codigoSeleccionado;
			const codigoPuestoSeleccionado = selectedRadio.getAttribute(
				"data-codigo2"
			);
			const descripcionSeleccionada = selectedRadio.getAttribute(
				"data-descripcion"
			);

			consultarDetallesPersonalizados(codigoSeleccionado);

			const limpiar = document.getElementById("autoComplete");
			limpiar.value = "";

			$(modal).modal("hide");
		} else {
			seleccion();
		}
	});
}

// Fin funcion llenar modal

function agregarValorAlInput(inputId, nuevoValor) {
	// Obtener el elemento de entrada por su ID
	var inputElement = document.getElementById(inputId);

	// Verificar si el elemento existe
	if (inputElement) {
		// Habilitar el campo de entrada
		inputElement.removeAttribute("disabled");

		// Establecer el nuevo valor
		inputElement.value = nuevoValor;

		// Volver a deshabilitar el campo de entrada (si es necesario)
		inputElement.setAttribute("disabled", "disabled");
	} else {
		console.error("Elemento de entrada no encontrado con el ID: " + inputId);
	}
}

// Llamada a la función con el ID del input y el nuevo valor
//agregarValorAlInput("Input", "Nuevo valor");

async function consultarDetallesPersonalizados(codigoPuesto) {
	const request = await fetch("api/puestos/puestosX_detallesX/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const puesto_detalle = await request.json();
	//var codigoPuesto = document.getElementById("codigoPuesto").value;

	for (var i = 0; i < puesto_detalle.length; i++) {
		if (puesto_detalle[i][0] == codigoPuesto) {
			idIzquierdo = puesto_detalle[i][0];
			agregarValorAlInput("CodigoPuesto", puesto_detalle[i][2]);
			agregarValorAlInput("descripcion", puesto_detalle[i][3]);
			agregarValorAlInput("tipo", puesto_detalle[i][5]);
			agregarValorAlInput("Zona", puesto_detalle[i][7]);
			agregarValorAlInput("nivel", puesto_detalle[i][9]);
			agregarValorAlInput("categoria", puesto_detalle[i][11]);
			agregarValorAlInput("subcategoria", puesto_detalle[i][13]);
			agregarValorAlInput("classif_interna", puesto_detalle[i][15]);
			agregarValorAlInput("contratacion", puesto_detalle[i][17]);
			agregarValorAlInput("declaracion_patri", puesto_detalle[i][19]);

			if (idDerecho != null) {
				if (idIzquierdo == idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px;text-align:center; background-color: #6ac358; color: #202220 "> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">' +
						'<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>' +
						'<path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>' +
						"</svg> La configuración de los puestos es igual </h4>";

					areaDestino.innerHTML = nuevoHTML;
				} else if (idIzquierdo != idDerecho) {
					var areaDestino = document.getElementById("areaDestino");
					var nuevoHTML =
						'<h4 class="custom-h4" style="margin-top:20px; text-align:center; background-color: #ec5b4d; color: white "> <svg  width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16"> <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/> <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg> La configuración de los puestos es diferente</h4>';
					areaDestino.innerHTML = nuevoHTML;
				}
			}
		}
	}
}

// Llama a la función para cargar los datos cuando sea necesario
//consultarDetallesPersonalizados();

function seleccion() {
	swal({
		title: "Aviso",
		text: "Selecciona el puesto que deseas consultar",
		icon: "warning",
		button: "Aceptar",
	});
}

function convertirFecha(inputDate) {
	// Divide la fecha en sus componentes: año, mes y día
	var dateComponents = inputDate.split("-");

	if (dateComponents.length !== 3) {
		// Verifica si la fecha de entrada tiene el formato correcto
		return "Fecha no válida";
	}

	// Crea una nueva fecha en el formato "dd/mm/aaaa"
	var outputDate =
		dateComponents[2] + "/" + dateComponents[1] + "/" + dateComponents[0];

	return outputDate;
}

async function opcionesPlaza() {
	const request = await fetch("api/plaza/detallesPlaza/", {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});

	const detalle_plaza = await request.json();

	//console.log(detalle_plaza);
	$("#MotivosDeObligacion").append(
		'<option value="" disabled selected>Selecciona una opción</option>'
	);
	$("#TramiteAEDMAJR").append(
		'<option value="" disabled selected>Selecciona una opción</option>'
	);
	$("#NivelEquivalencia").append(
		'<option value="" disabled selected>Selecciona una opción</option>'
	);


	// INICIO captura de datos tipo texto Servicio

	$("#MotivosDeObligacion").change(function() {
		//MotivosDeObligacion = $(this).find(":selected").text();
		MotivosDeObligacion = document.getElementById("MotivosDeObligacion").options[document.getElementById("MotivosDeObligacion").selectedIndex].getAttribute("value");
	});

	$("#TramiteAEDMAJR").change(function() {
		//TramiteAEDMAJR = $(this).find(":selected").text();
		TramiteAEDMAJR = document.getElementById("TramiteAEDMAJR").options[document.getElementById("TramiteAEDMAJR").selectedIndex].getAttribute("value");
	});

	$("#NivelEquivalencia").change(function() {
		//NivelEquivalencia = $(this).find(":selected").text();
		NivelEquivalencia = document.getElementById("NivelEquivalencia").options[document.getElementById("NivelEquivalencia").selectedIndex].getAttribute("value");
	});
	// FIN captura de datos tipo texto Servicio

	//for (var i = 0; i < detalle_plaza.length; i++) {
	for (let detalle of detalle_plaza) {
		//console.log(detalle_plaza);

		//  Motivos de Obligación de Declaración Patrimonial

		if (detalle.lplz_clase == 2) {
			$("#MotivosDeObligacion").append("<option value = " + detalle.lplz_id + ">" + detalle.lplz_descripcion + "</option>");
		}

		//  ASIGNACION Y EMISION DE DICTAMENES EN MATERIA DE AVALUOS Y JUSTIPRECIACION DE RENTAS

		if (detalle.lplz_clase == 7) {
			$("#TramiteAEDMAJR").append(
				"<option value = " +
				detalle.lplz_id +
				">" +
				detalle.lplz_descripcion +
				"</option>"
			);
		}

		// Nivel de equivalencia

		if (detalle.lplz_clase == 8) {
			$("#NivelEquivalencia").append(
				"<option value = " +
				detalle.lplz_id +
				">" +
				detalle.lplz_descripcion +
				"</option>"
			);
		}
	}
}

// FIN Funcion guardar configuracion

/* Iniciar codigo de guardar*/



// INICIO Validaciones

//INICIO Validacion de solo numeros
function validarNumero(input) {
	var valor = input.value.trim();
	var soloNumeros = valor.replace(/\D/g, ''); // Eliminar caracteres no numéricos

	if (valor !== soloNumeros) {

		swal({
			title: 'Solo se aceptan números',
			icon: 'warning',
			button: 'Aceptar',
		});
	}

	if (soloNumeros.length > 5) {
		soloNumeros = soloNumeros.substring(0, 5);
	}

	input.value = soloNumeros;
}
//FIN Validacion de solo numeros




// INICIO Validaciones input y selects

// Funcion para eliminar los input-invalid de los input y selects
const arrayInputs = [
	"numeroPlaza",
	"numeroPlazaPadre",
	"codigoIR",
	"MotivosDeObligacion",
 	"Areas",
	"ContratacionesPublicas",
	"tramiteCLAPP",
	"TramiteEBI",
	"TramiteAEDMAJR",
	"NivelEquivalencia",
	"RFI",
	"TipoSerPub",
	"autoCompleteUnidad",
	"autoCompletenone",
	"autoCompleteuno",
	"autoComplete",
	"segundoAutoComplete"
];

for (const inputsId of arrayInputs) {
	const input = document.getElementById(inputsId);
	input.addEventListener("input", function() {
		input.classList.remove('input-invalid');
		input.classList.remove('input-valid');
	});
}
// Funcion para validar los input y selects al momento de darle al boton de registrarPlaza

// INICIO convertir en mayusculas todas las letras
const idInputsUpperCase = [
	"TipoSerPub",
	"Areas",
	"ContratacionesPublicas",
	"tramiteCLAPP",
	"TramiteEBI"
];

for (const inputId of idInputsUpperCase) {
	const input = document.getElementById(inputId);
	input.addEventListener("input", function() {
		input.value = input.value.toUpperCase();
	});
}
// FIN convertir en mayusculas todas las letras

// Funcion guardar configuracion
function guardarConfiguracion() {
		
	const arrayInputs = [
		{ id: "numeroPlaza", mensage: "Por favor, no deje el campo Número de Plaza vácio" },
		{ id: "codigoIR", mensage: "Por favor, no deje el campo Código Inteligente Rhnet vacío" },
		{ id: "MotivosDeObligacion", mensage: "Por favor, no deje el campo Motivos de Obligación de Declaración Patrimonial vacío" },
		{ id: "Areas", mensage: "Por favor, no deje el campo Áreas vacío" },
		{ id: "ContratacionesPublicas", mensage: "Por favor, no deje el campo Contrataciones Públicas vacío" },
		{ id: "tramiteCLAPP", mensage: "Por favor, no deje el campo Trámite de C.L.A.P.P. vacío" },
		{ id: "TramiteEBI", mensage: "Por favor, no deje el campo Trámite de E.B.I. vacío" },
		{ id: "TramiteAEDMAJR", mensage: "Por favor, no deje el campo Trámite de A.E.D.M.A.J.R. vacío" },
		{ id: "NivelEquivalencia", mensage: "Por favor, no deje el campo Nivel de Equivalencia vacío" },
		{ id: "RFI", mensage: "Por favor, no deje el campo RFI_RIUF vacío" },
		{ id: "TipoSerPub", mensage: "Por favor, no deje el campo Tipo de Servidor Público vacío" }
	];

	for (const inputsId of arrayInputs) {

		const input = document.getElementById(inputsId.id);
		const value = input.value;

		if (value === '') {

			input.classList.add('input-invalid');

			swal({

				title: inputsId.mensage,
				icon: 'error',
				button: 'Aceptar'

			});

			return;

		}
	}

	// Unidad
	const autoCompleteUnidadInput = document.getElementById("autoCompleteUnidad");
	const codigoUnidadInput = document.getElementById("codigoUnidad");
	const codigoUnidad = codigoUnidadInput.value;

	if (codigoUnidad === '') {

		autoCompleteUnidadInput.classList.add('input-invalid');

		swal({

			title: 'Por favor, no deje el campo Código de Unidad vacío',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	} else {

		autoCompleteUnidadInput.classList.remove('input-invalid');

	}
	
	// Centro de trabajo
	const autoCompletenoneInput = document.getElementById("autoCompletenone");
	const codigoCentroTrabajoInput = document.getElementById("otroInputc");
	const codigoCentroTrabajo = codigoCentroTrabajoInput.value;

	if (codigoCentroTrabajo === '') {

		autoCompletenoneInput.classList.add('input-invalid');

		swal({

			title: 'Por favor, no deje el campo Centro de Trbajo vacío',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	} else {

		autoCompletenoneInput.classList.remove('input-invalid');

	}
	
	// Centro de Distribución
	const autoCompleteunoInput = document.getElementById("autoCompleteuno");
	const codigoCentroDistribucionInput = document.getElementById("otroInput");
	const codigoCentroDistribucion = codigoCentroDistribucionInput.value;

	if (codigoCentroDistribucion === '') {

		autoCompleteunoInput.classList.add('input-invalid');

		swal({

			title: 'Por favor, no deje el campo Centro de Distribución vacío',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	} else {

		autoCompleteunoInput.classList.remove('input-invalid');

	}
	
	// Puesto Autorizado
	const autoCompleteInput = document.getElementById("autoComplete");
	const CodigoPuestoInput = document.getElementById("CodigoPuesto");
	const CodigoPuesto = CodigoPuestoInput.value;

	if (CodigoPuesto === '') {

		autoCompleteInput.classList.add('input-invalid');

		swal({

			title: 'Por favor, no deje el campo Puesto Autorizado vacío',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	} else {

		autoCompleteInput.classList.remove('input-invalid');

	}
	
	// Puesto Pagado
	const segundoAutoCompleteInput = document.getElementById("segundoAutoComplete");
	const CodigoPuesto1Input = document.getElementById("CodigoPuesto1");
	const CodigoPuesto1 = CodigoPuesto1Input.value;

	if (CodigoPuesto1 === '') {

		segundoAutoCompleteInput.classList.add('input-invalid');

		swal({

			title: 'Por favor, no deje el campo Puesto Pagado vacío',
			icon: 'error',
			button: 'Aceptar'

		});

		return;

	}

	// INICIO funcion de guardado y conversion a JSON Servicio
	let numeroPlaza = document.getElementById("numeroPlaza").value;
	let numeroPlazaPadre = document.getElementById("numeroPlazaPadre").value;
	let codigoIR = document.getElementById("codigoIR").value;

	let EstatusOcupàcional = 2;

	let Areas = document.getElementById("Areas").value;
	let ContratacionesPublicas = document.getElementById("ContratacionesPublicas").value;
	let tramiteCLAPP = document.getElementById("tramiteCLAPP").value;
	let TramiteEBI = document.getElementById("TramiteEBI").value;
	let RFI = document.getElementById("RFI").value;
	let TipoSerPub = document.getElementById("TipoSerPub").value;

	let Centro_trab = document.getElementById("ctra_id").value;
	let Centro_dist = document.getElementById("cdis_id").value;

	let inpFechaInicio = document.getElementById("inpFechaInicio").value;
	let inpUsuarioCapturo = sessionStorage.idUsuario;
	let inpFechaModificacion = document.getElementById("inpFechaModificacion").value;
	let inpUsuarioModifico = sessionStorage.idUsuario;
	let inpSituacion = 1;

	let data = {
		plz_numero: numeroPlaza,
		plz_numplzpadre: numeroPlazaPadre,
		plz_codintrhnet: codigoIR,
		plz_estatusocup: EstatusOcupàcional,
		plz_motoblidecpatri: MotivosDeObligacion,
		plz_areas: Areas,
		plz_conpublicas: ContratacionesPublicas,
		plz_traclap: tramiteCLAPP,
		plz_traebi: TramiteEBI,
		plz_traemdmajr: TramiteAEDMAJR,
		plz_nivelequiv: NivelEquivalencia,
		plz_rfiriuf: RFI,
		plz_tiposervpublico: TipoSerPub,

		plz_unidad: arrayGuardarUnidadId.value,
		plz_centrotrabajo: Centro_trab,
		plz_centrodist: Centro_dist,

		plz_ptoautorizado: puestoAutorizadoId,
		plz_ptopagado: puestoPagadoId,

		plz_fechainicio: inpFechaInicio,
		plz_usucapturo: inpUsuarioCapturo,
		plz_fechamod: inpFechaModificacion,
		plz_usumodifico: inpUsuarioModifico,
		plz_situacion: inpSituacion
	};


	let newData = JSON.stringify(data);
	console.log("ñññññ", newData);

	let url = 'api/guardarDatosPlaza';


	// Opciones para la solicitud fetch
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
				swal({
					title: "Advertencia",
					text: data,
					icon: "warning",
					button: "Aceptar"
				});
			} else {
				swal({
					title: "El registro fue exitoso",
					text: "Buen trabajo !!",
					icon: "success",
					button: "Aceptar"
				});
				limpiarCampos();
			}
		})
		.catch(error => {
			console.error('Error:', error);
			swal("Oops!", "Algo salio mal, contacta al administrador", "error");
		});
}
	// FIN funcion de guardado y conversion a JSON Servicio

iniciarAutoCompleteRFI();

/*function openTab(evt, tabName) {
		var i, tabcontent, tablinks;
		tabcontent = document.getElementsByClassName("tab-content");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].classList.remove('active');
		}
		document.getElementById(tabName).classList.add('active');
	}*/

async function autocompletarTspCodigo() {
	const request = await fetch('api/ServPub/tspCodigo', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data1 = await request.json();


	return data1;
}

autocompletarTspCodigo().then(resultados => {

});


async function iniciarAutoCompleteTspCodigo() {
	const resultados = await autocompletarTspCodigo();
	const autoCompleteInput = document.getElementById('TipoSerPub');



	const autoCompleteJS = new autoComplete({
		selector: "#TipoSerPub",
		//placeHolder: "Buscar por Riuf",
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


iniciarAutoCompleteTspCodigo();

// Fin codigo TspCodigo


// Inicia autocomplete para RFI

async function autocompletarRFI() {
	const request = await fetch('api/riuf/riuf_riuf', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data = await request.json();

	//console.log(data);
	return data;
}

autocompletarRFI().then(resultados => {

});

async function iniciarAutoCompleteRFI() {
	const resultados = await autocompletarRFI();
	const autoCompleteInput = document.getElementById('RFI');



	const autoCompleteJS = new autoComplete({
		selector: "#RFI",
		//placeHolder: "Buscar por Riuf",
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

autocompletarRFI();
// Fin codigo autocomplete RFI

function eliminarEstilos() {
	var datosGenerales = document.getElementById('datosGenerales');

	var datosComplementarios = document.getElementById('datosComplementarios');

	// Verifica si existe el atributo style en cada elemento y si su valor es "display: none;"
	// Si existe y es "display: none;", elimina el atributo style
	if (datosGenerales.style.display === 'none') {
		datosGenerales.style.display = '';
	}

	if (datosComplementarios.style.display === 'none') {
		datosComplementarios.style.display = '';
	}
}

function validarRfi(input) {
	var valor = input.value.trim();
	var soloNumeros = valor.replace(/[^\d-]/g, '');

	clearTimeout(input.tooltipTimeout);
	input.tooltipTimeout = setTimeout(function() {
		$(input).tooltip('dispose');
	}, 1500);

	// Ocultar tooltips existentes
	$(input).tooltip('dispose');

	if (valor !== soloNumeros) {
		$(input).tooltip({
			title: 'Solo se aceptan números',
			placement: 'top',
			trigger: 'manual',
			delay: { show: 500, hide: 200 },
			container: 'body',
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
		}).tooltip('show');
	}

	if (valor.length >= 16) {
		soloNumeros = soloNumeros.substring(0, 15);

		if (valor.length > 15) {
			$(input).tooltip({
				title: 'Son máximo 15 números',
				placement: 'top',
				trigger: 'manual',
				delay: { show: 500, hide: 200 },
				container: 'body',
				template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
			}).tooltip('show');
		}
	}
	input.value = soloNumeros;
}


function validarNum(input) {
	var valor = input.value.trim();
	var soloNumeros = valor.replace(/\D/g, '');

	clearTimeout(input.tooltipTimeout);
	input.tooltipTimeout = setTimeout(function() {
		$(input).tooltip('dispose');
	}, 1500);

	// Ocultar tooltips existentes
	$(input).tooltip('dispose');

	if (valor !== soloNumeros) {
		$(input).tooltip({
			title: 'Solo se aceptan números',
			placement: 'top',
			trigger: 'manual',
			delay: { show: 500, hide: 200 },
			container: 'body',
			template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
		}).tooltip('show');
	}

	if (valor.length >= 16) {
		soloNumeros = soloNumeros.substring(0, 15);

		if (valor.length > 15) {
			$(input).tooltip({
				title: 'Son máximo 15 números',
				placement: 'top',
				trigger: 'manual',
				delay: { show: 500, hide: 200 },
				container: 'body',
				template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
			}).tooltip('show');
		}
	}
	input.value = soloNumeros;
}

function obtenerFechaActual() {
	// Crear un nuevo objeto Date que representa la fecha y hora actuales
	var fechaActual = new Date();

	// Obtener el año, mes y día
	var año = fechaActual.getFullYear();
	var mes = ("0" + (fechaActual.getMonth() + 1)).slice(-2); // Agrega un cero adelante si es necesario
	var dia = ("0" + fechaActual.getDate()).slice(-2); // Agrega un cero adelante si es necesario

	// Formatear la fecha en el formato AAAA/MM/DD
	var fechaFormateada = año + "-" + mes + "-" + dia;

	// Devolver la fecha formateada
	return fechaFormateada;
}

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

document.getElementById("PuesPagvsPA-tab").addEventListener("click", datosControl);