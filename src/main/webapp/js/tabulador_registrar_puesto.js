$('document').ready(function() {
	if (sessionStorage.permisos == 1) {
		$("#nav-datos-control-tab").prop("hidden", false);
	}
	//Resetea los selects al primer option
	let elementosFormulario = document.querySelectorAll('select');
	
	elementosFormulario.forEach(function(elemento) {
		elemento.selectedIndex = 0;
	});
});

const autoCompleteInput = document.getElementById("autoComplete");

autoCompleteInput.addEventListener("click", function() {
	// Remueve la clase 'input-invalid'
	this.classList.remove('input-invalid');
});

async function autocompletarPuestosSinConceptos() {
	const request = await fetch('api/puestos/consultar/puestosSinConceptos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const puestos = await request.json();
	
	let stringDatos = '';

	for (let i = 0; i < puestos.length; i++) {
		stringDatos += puestos[i][0] + ' - ' + puestos[i][1] + ';';
	}

	let arrayDatos = stringDatos.split(";");

	return arrayDatos;
}

let arrayDatos = autocompletarPuestosSinConceptos();

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
		highlight: true
	},
	events: {
		input: {
			selection: (event) => {
				const selection = event.detail.selection.value;
				autoCompleteJS.input.value = selection;

				autoCompleteJS.input.disabled = true; // Servicio
				autoCompleteJS.input.classList.remove("input-invalid"); // Servicio
			}
		}
	}
});

const autoCompleteCopiarPuesto = document.getElementById("autocompletarCopiarPuesto");

autoCompleteCopiarPuesto.addEventListener("click", function() {
	// Remueve la clase 'input-invalid'
	this.classList.remove('input-invalid');
});

async function autocompletarPuestos() {
	const request = await fetch('api/puestos/puestosX_detallesX2/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const puestos = await request.json();

	let stringDatos = '';

	for (let i = 0; i < puestos.length; i++) {
		stringDatos += puestos[i][0] + ' - ' + puestos[i][1] + ';';
	}

	let arrayDatos = stringDatos.split(";");

	return arrayDatos;
}

let nuevoPuesto = autocompletarPuestos();

const autocompletarCopiarPuesto = new autoComplete({
	selector: "#autocompletarCopiarPuesto",
	placeHolder: "Busqueda por código o puesto",
	data: {
		src: nuevoPuesto,
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
				autocompletarCopiarPuesto.input.value = selection;

				autocompletarCopiarPuesto.input.disabled = true; // Servicio
				autocompletarCopiarPuesto.input.classList.remove("input-invalid"); // Servicio
			}
		}
	}
});

let global_ctgp_codigo;

async function buscarPuesto(idAutocomplete, idModal, idDivContenido, botonSeleccionar) {

	let datos = {};
	datos.ctgp_codigo = global_ctgp_codigo = 
	document.getElementById(idAutocomplete).value.split("-")[0].trim();
	
	const request = await fetch('api/puestos/consulta/datosXcodigo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});
	
	const puestos = await request.json();
	
	// INICIO Validación Servicio
	if (puestos.length === 0) {
		document.getElementById('cerrarModalPuestos').click();
		return swal({
			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'
		});
	}
	// FIN Validación Servicio
	
	llenaModal(datos, idModal, idDivContenido, botonSeleccionar);
}

async function llenaModal(codigoPuesto, idModal, idDivContenido) {
	
	const request = await fetch('api/puestos/consultaXCodigo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(codigoPuesto)
	});
	
	const puesto = await request.json();
	
	const modal = document.getElementById(idModal);
	const modalBody = document.getElementById(idDivContenido);
	
	// Abre el modal
	$(modal).modal('show');

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

	for (let i = 0; i < puesto.length; i++) {

		if (puesto[i][2] === global_ctgp_codigo) {	

			contador++;
			const row = document.createElement("tr");

			const numero = document.createElement("td");
			numero.innerHTML = `<label class="form-check-label" >
							   		${contador}
							   </label>`;

			const seleccion = document.createElement("td");
			seleccion.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" 
								value="${puesto[i][0]}" data-codigo="${puesto[i][0]}" 
								data-codigo2="${puesto[i][2]}" data-descripcion="${puesto[i][3]}"
								data-idpuesto="${puesto[i][1]}" data-situacion="${puesto[i][27]}"/>`;

			const codigo = document.createElement("td");
			codigo.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][2]}">
							        ${puesto[i][2]}
							    </label>`;

			const descripcion = document.createElement("td");
			descripcion.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][3]}">
								        ${puesto[i][3]}
								    </label>`;

			const tipo = document.createElement("td");
			tipo.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][5]}">
						     	 ${puesto[i][5]}
						     </label>`;

			const zona = document.createElement("td");
			zona.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][7]}">
						         ${puesto[i][7]}
						     </label>`;

			const nivel = document.createElement("td");
			nivel.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][9]}">
						          ${puesto[i][9]}
						      </label>`;

			const contratacion = document.createElement("td");
			contratacion.innerHTML = `<label class="form-check-label" for="opcion${puesto[i][17]}">
								         ${puesto[i][17]}
								     </label>`;

			row.appendChild(numero);
			row.appendChild(seleccion);
			row.appendChild(codigo);
			row.appendChild(descripcion);
			row.appendChild(tipo);
			row.appendChild(zona);
			row.appendChild(nivel);
			row.appendChild(contratacion);

			table.appendChild(row);
		}
	}
}

function SeleccionarPuestoABuscar(modalBuscarPuesto) {
	// Busca el elemento de radio seleccionado
	const selectedRadio = modalBuscarPuesto.querySelector('input[type="radio"]:checked');
	
	if (selectedRadio) {
		// Obtiene los valores personalizados del elemento de radio seleccionado
		const codigoSeleccionado = selectedRadio.getAttribute('data-codigo');
		const codigoPuestoSeleccionado = selectedRadio.getAttribute('data-codigo2');
		const descripcionSeleccionada = selectedRadio.getAttribute('data-descripcion');
		const situacionPuesto = selectedRadio.getAttribute('data-situacion');

		// Asigna los valores a los campos de entrada
		const codigoInput = document.getElementById('codigoPuesto');
		const descripcionInput = document.getElementById('descripcion');

		consultarDetallesPersonalizados(codigoSeleccionado, false);

		codigoInput.value = codigoPuestoSeleccionado;
		descripcionInput.value = descripcionSeleccionada;

		const limpiar = document.getElementById('autoComplete');
		limpiar.value = '';

		if (situacionPuesto == '1') {
			document.getElementById('situacion').value = "ACTIVO";
		} else {
			document.getElementById('situacion').value = "INACTIVO";
			document.getElementById('situacion').style.borderColor = "red";
		}
		
		document.getElementById("copiarDatosPuesto").disabled = false;
		
		$('#modalInfo').modal('hide');
		
	} else {
		swal({
			title: "Aviso",
			text: "Selecciona el puesto que deseas consultar",
			icon: "warning",
			button: "Aceptar",
		});
	}
}

function SeleccionarConceptosACopiar(conceptosACopiar) {
	const selectedRadio = conceptosACopiar.querySelector('input[type="radio"]:checked');
	
	if (selectedRadio) {
		// Obtiene los valores personalizados del elemento de radio seleccionado
		const codigoSeleccionado = selectedRadio.getAttribute('data-codigo');
		const situacionPuesto = selectedRadio.getAttribute('data-situacion');
		const limpiar = document.getElementById('autoComplete');

		if (situacionPuesto != '1') {

			swal({
				title: "Aviso",
				text: "El puesto seleccionado está inactivo ¿desea continuar?",
				icon: "warning",
				buttons: ["Cancelar", "Aceptar"],
				dangerMode: true,
			})
				.then((willDelete) => { //Si le da clic al botón Aceptar
					if (willDelete) { //Se activa el if
						consultarDetallesPersonalizados(codigoSeleccionado, true);
						limpiar.value = '';
						HabilitarBotonesAgregarConceptos()
						$(modal).modal('hide');
						return;
					}
				});
		}
		
		consultarDetallesPersonalizados(codigoSeleccionado, true);
		limpiar.value = '';
		HabilitarBotonesAgregarConceptos()
		$('#modalCopiarPuesto').modal('hide');
		
	} else {
		swal({
			title: "Aviso",
			text: "Selecciona el puesto que deseas copiar",
			icon: "warning",
			button: "Aceptar",
		});
	}
}

function HabilitarBotonesAgregarConceptos() {
	document.getElementById("btnAgregarConcepto").disabled = false;
	document.getElementById("btnAgregarConcepto2").disabled = false;
	document.getElementById("btnAgregarConcepto3").disabled = false;
	document.getElementById("btnAgregarConcepto4").disabled = false;
	document.getElementById("agregarNuevoPuesto").disabled = false;
}

function agregarValorAlInput(inputId, nuevoValor) {

	let inputElement = document.getElementById(inputId);
	
	if (inputElement) {
		inputElement.removeAttribute("disabled");
		inputElement.value = '';
		inputElement.value = nuevoValor;
		inputElement.setAttribute("disabled", "disabled");
	}
}

async function consultarDetallesPersonalizados(codigoPuesto, mostrarOpciones) {
	
	let datos = {};
	datos.ctgp_codigo = global_ctgp_codigo;
	
	const request = await fetch('api/puestos/consultaXCodigo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});
	
	const puesto_detalle = await request.json();
	
	if (verificarJson(puesto_detalle)){
		return swal({
		  title: "No se encontraron datos del puesto",
		  text: "",
		  icon: "info",
		  button: "Cerrar",
		});
	}
	
	for (let i = 0; i < puesto_detalle.length; i++) {
		if (puesto_detalle[i][0] == codigoPuesto) {
			//Id del puesto que no tiene conceptos
			if (mostrarOpciones === false) {
				agregarValorAlInput("puestoIdAutocompletado", puesto_detalle[i][0]);
			}
			//Id del puesto del que se copiarán los conceptos
			if (mostrarOpciones === true) {
				agregarValorAlInput("puestoIdACopiarConceptos", puesto_detalle[i][0]);
			}
			
			agregarValorAlInput("Tipo", puesto_detalle[i][5]);
			agregarValorAlInput("Zona", puesto_detalle[i][7]);
			agregarValorAlInput("Nivel", puesto_detalle[i][9]);
			agregarValorAlInput("Categoria", puesto_detalle[i][11]);
			agregarValorAlInput("Subcategoria", puesto_detalle[i][13]);
			agregarValorAlInput("Calsificacion_Interna", puesto_detalle[i][15]);
			agregarValorAlInput("Contratacion", puesto_detalle[i][17]);
			agregarValorAlInput("Declaracion", puesto_detalle[i][19]);
			/*agregarValorAlInput("usuCapturo", puesto_detalle[i][23]);
			agregarValorAlInput("fechaInicio", puesto_detalle[i][20]);
			agregarValorAlInput("fechaCaptura", puesto_detalle[i][24]);
			agregarValorAlInput("usuModifico", puesto_detalle[i][26]);
			if (puesto_detalle[i][21] !== null){
				$("divFechaTerminoLlena").prop("hidden", false);
				agregarValorAlInput("fechaTermino", puesto_detalle[i][21]);	
				$("divFechaTerminoVacia").prop("hidden", true);
			}*/
		}
	}
	
	consultaConcepto(1);
	consultaConcepto(2);
	consultaConcepto(3);
	consultaConcepto(4);
}

async function consultaConcepto(tipoConcepto) {
	
	let datos = {};
	datos.cxpto_idpuesto = $('#puestoIdACopiarConceptos').val();
	datos.cxpto_tipocpto = tipoConcepto;

	const consultaConceptosFijos = await fetch('api/puestos/ConsultaConceptoFijo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	}).then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar los conceptos tipo: " + tipoConcepto + ", consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar los conceptos tipo: " + tipoConcepto + ", consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar los conceptos tipo: " + tipoConcepto + ", consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});

	const conceptosFijos = await consultaConceptosFijos;
	
	const consultaConceptosVariables = await fetch('api/puestos/ConsultaConceptoVariable', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	}).then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar los conceptos tipo: " + tipoConcepto + ", consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar los conceptos tipo: " + tipoConcepto + ", consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar los conceptos tipo: " + tipoConcepto + ", consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});

	const conceptosVariables = await consultaConceptosVariables;
	
	let filtroConceptosVariables = await CompararConceptosIguales(conceptosFijos, conceptosVariables)
	
	if (filtroConceptosVariables === 0){
		CrearTablaConceptos(tipoConcepto, conceptosFijos, conceptosVariables)
	
	} else {
		CrearTablaConceptos(tipoConcepto, conceptosFijos, filtroConceptosVariables)
	}
}

async function CompararConceptosIguales(conceptosFijos, conceptosVariables) {
    
    if (conceptosFijos.length == 0 || conceptosVariables.length == 0) {
        return 0;
    }
    
    let cantidadConceptosIguales = 0;

    // Crea un nuevo array de conceptosVariables e itera para compararlo con conceptosFijos
    let filtroConceptosVariables = conceptosVariables.filter(function(conceptoVariable) {
        let sonIguales = false;

        for (let i = 0; i < conceptosFijos.length; i++) {

            if (conceptoVariable[1] === conceptosFijos[i][1]) {
                cantidadConceptosIguales++;
                sonIguales = true;
                break; // Sale del ciclo cuando encuentra una coincidencia
            }
        }

        // Si los conceptos son iguales, se elimina el concepto del nuevo array
        return !sonIguales;
    });

    return filtroConceptosVariables;
}

async function CrearTablaConceptos(tipoConcepto, conceptosFijos, conceptosVariables) {
	const tabla = document.getElementById("tabla" + tipoConcepto.toString());
	
	$("#tabla" + tipoConcepto.toString()).empty();
	
	if (verificarJson(conceptosFijos) && verificarJson(conceptosVariables)) {
		let contadorId = 1;
	
		while (contadorId == 1) {
			const row = document.createElement("tr");
			row.id = `fila${contadorId}_${tipoConcepto}`;
			
			const concept = document.createElement("td");
			concept.id = `concepto${contadorId}_${tipoConcepto}`;
			concept.innerHTML = `N/A`;

			const descripcion = document.createElement("td");
			descripcion.id = `descripcion${contadorId}_${tipoConcepto}`;
			descripcion.innerHTML = `N/A`;

			const importe = document.createElement("td");
			importe.id = `importe${contadorId}_${tipoConcepto}`;
			importe.innerHTML = `N/A`;
			
			const opcion = document.createElement("td");
			opcion.id = `opcion${contadorId}_${tipoConcepto}`;
			opcion.innerHTML = `N/A`;
			
			const datosDeControl = document.createElement("td");
			datosDeControl.id = `datosControl${contadorId}_${tipoConcepto}`;
			datosDeControl.innerHTML = `N/A`;
			
			row.appendChild(concept);
			row.appendChild(descripcion);
			row.appendChild(importe);
			row.appendChild(opcion);
			row.appendChild(datosDeControl);
			
			tabla.appendChild(row);

			contadorId++;
		}
		return;
	}
	
	if (conceptosFijos.length > 0) {
		await TablaConceptosFijos(tabla, tipoConcepto, conceptosFijos)
	}
	
	if (conceptosVariables.length > 0){
		await TablaConceptosVariables(tabla, tipoConcepto, conceptosVariables)
	}
	
	$('.input-number').toArray().forEach(function(field){
	   new Cleave(field, {
	      numeral: true,
    	  numeralDecimalScale: 3
	   })
	});
}

async function TablaConceptosFijos(tabla, tipoConcepto, conceptosFijos) {
	
	let contadorId = 1;
	let sumaConceptosISPT = 0;
	let sumaConceptos0X = 0;
	
	conceptosFijos.forEach(function(concepto) {
		const row = document.createElement("tr");
		row.id = `${concepto[0]}`;
		
		const concept = document.createElement("td");
		concept.id = `concepto${contadorId}_${tipoConcepto}`;
		concept.innerHTML = `${concepto[1]}`;

		const descripcion = document.createElement("td");
		descripcion.id = `descripcion${contadorId}_${tipoConcepto}`;
		descripcion.innerHTML = `${concepto[2]}`;

		const importe = document.createElement("td");
		importe.id = `importe${contadorId}_${tipoConcepto}`;
		
		const numeroFormateado = numbro(concepto[3]).format({
			thousandSeparated: true,
    		mantissa: 3
		});
		
		importe.innerHTML = `<div class="editar-importe" lang="es-MX">
								<input type="text" 
									class="form-control input-number margen_boton text-end" 
									id="importeInput${contadorId}_${tipoConcepto}" 
									value="${numeroFormateado}" disabled>
									
								<input type="hidden" class="input-number" 
									id="importeHidden${contadorId}_${tipoConcepto}" 
									value="${numeroFormateado}" />
							</div>
							<div class="editar-importe">
								<button id='botonAplicarEdicion${contadorId}_${tipoConcepto}' class="btn btn-success btn-tabla btn-editar"
									onclick="AplicarEdicionConcepto(${concepto[0]}, importeInput${contadorId}_${tipoConcepto}, concepto${contadorId}_${tipoConcepto})" 
									title="Aplicar Edición de Concepto" disabled>
									
									<svg width="16" height="16" 
										fill="currentColor" class="bi bi-check-circle-fill" 
										viewBox="0 0 16 16">
									  <path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
									</svg>
								</button>
							</div>
							<div class="editar-importe">
								<button id='botonCancelarEditar${contadorId}_${tipoConcepto}' class="btn btn-danger btn-tabla btn-editar"
									onclick="ToggleEditarConcepto(importeInput${contadorId}_${tipoConcepto}, importeHidden${contadorId}_${tipoConcepto})"
									title="Cancelar Edición de Concepto" disabled>
									
									<svg width="16" height="16"
										fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
									  <path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
									</svg>
								</button>
							</div>`;
		
		const opcion = document.createElement("td");
		opcion.id = `opcion${contadorId}_${tipoConcepto}`;
		opcion.innerHTML = `<button id='botonBorrar${contadorId}_${tipoConcepto}' class="btn btn-danger btn-tabla"
								onclick="AlertBorrarConcepto('${concepto[0]}')" title="Eliminar">
								<svg width="16" height="16" 
									fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
									<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
								</svg>
							</button>
							<button id='botonEditar${contadorId}_${tipoConcepto}' class="btn btn-warning btn-tabla"
								onclick="ToggleEditarConcepto(importeInput${contadorId}_${tipoConcepto}, importeHidden${contadorId}_${tipoConcepto})" title="Editar">
								<svg width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
								  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								</svg>
							</button>`;
		
		const datosDeControl = document.createElement("td");
		datosDeControl.classList.add('contenedorDatosControl')
		datosDeControl.id = `datosControl${contadorId}_${tipoConcepto}`;
		
		if (concepto[7] === null) { //Si la fecha de término es null
			datosDeControl.innerHTML = `<div class="w3-container contenedorDatosControl">
											<p class="w3-tooltip">
												Datos de Control
												<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
													fill="currentColor" class="bi bi-info-circle-fill"
													viewBox="0 0 16 16">
							  						<path
														d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
												</svg>
												<span class="w3-text w3-tag w3-animate-opacity w3-round-xlarge">
														Fecha de inicio: <br> <span id="tooltipFechaInicio${contadorId}_${tipoConcepto}"> ${concepto[6]} </span> <br>
														Fecha de término: <br> <span id="tooltipFechaTermino${contadorId}_${tipoConcepto}"> N/A </span> <br>
														Usuario que capturó: <br> <span id="tooltipUsuarioCapturo${contadorId}_${tipoConcepto}"> ${concepto[9]} </span><br>
														Fecha de modificación: <br> <span id="tooltipFechaModificacion${contadorId}_${tipoConcepto}"> ${concepto[10]} </span> <br>
														Usuario que realizó la última modificación: <br> <span id="tooltipUsuFechaMod${contadorId}_${tipoConcepto}"> ${concepto[12]} </span>
												</span> 
											</p>
										</div>`;
		} else {
			datosDeControl.innerHTML = `<div class="w3-container contenedorDatosControl">
										<p class="w3-tooltip">
											Datos de Control
											<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-info-circle-fill"
												viewBox="0 0 16 16">
						  						<path
													d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
											</svg>
											<span class="w3-text w3-tag w3-animate-opacity w3-round-xlarge">
													Fecha de inicio: <br> <span id="tooltipFechaInicio${contadorId}_${tipoConcepto}"> ${concepto[6]} </span> <br>
													Fecha de término: <br> <span id="tooltipFechaTermino${contadorId}_${tipoConcepto}"> ${concepto[7]} </span> <br>
													Usuario que capturó: <br> <span id="tooltipUsuarioCapturo${contadorId}_${tipoConcepto}"> ${concepto[9]} </span><br>
													Fecha de modificación: <br> <span id="tooltipFechaModificacion${contadorId}_${tipoConcepto}"> ${concepto[10]} </span> <br>
													Usuario que realizó la última modificación: <br> <span id="tooltipUsuFechaMod${contadorId}_${tipoConcepto}"> ${concepto[12]} </span>
											</span> 
										</p>
									</div>`;
		}
		
		row.appendChild(concept);
		row.appendChild(descripcion);
		row.appendChild(importe);
		row.appendChild(opcion);
		row.appendChild(datosDeControl);

		tabla.appendChild(row);
		
		//Sumar las percepciones fijas quincenales para obtener los conceptos 0X (revisar excel)
		if (concepto[1] === '07' || concepto[1] === '02') {
			sumaConceptos0X += concepto[3]
		
		} else if (concepto[1] === '77') {
			sumaConceptos0X += concepto[3]
		
		} else if (concepto[1] === 'A1' || concepto[1] === 'A2' || concepto[1] === 'A3'
				|| concepto[1] === 'A4' || concepto[1] === 'A5') {
			sumaConceptos0X += concepto[3]
		}
		
		ejercicio = concepto[4]
		//Suma de conceptos para calcular ISPT (revisar excel)
		sumaConceptosISPT += concepto[3]
		contadorId++
	});
	
	if(tipoConcepto == 1){
		document.getElementById("sumaConceptosISPT").value = sumaConceptosISPT
	}
	
	document.getElementById("sumaConceptos" + tipoConcepto).value = sumaConceptos0X;
	
	switch (tipoConcepto) {
		case 1: //Tipo 1: Percepciones fijas
			const uma = await ObtenerTopeDeIngresoUma()
			//Calcular tope de salario en base a la UMA (revisar excel)
			const topeIngreso = ((uma * 10) * 15).toFixed(3)
			
			//Obtener el tope de salario mínimo según la zona del puesto (revisar excel)
			const datosSalarioMinimo = await ObtenerSalarioMinimo(
						document.getElementById('Zona').value)
			const topeSalarioMinimo = (datosSalarioMinimo[0].salm_importe * 15).toFixed(3)
			
			/*Si la suma de ingresos es menor al tope de ingresos de la UMA, 
			se calculan los conceptos en base a ese sueldo, de lo contrario 
			se calcula usando el tope de ingreso de la UMA (revisar excel) */
			
			if (sumaConceptos0X < topeSalarioMinimo) {
				CalcularISPT(sumaConceptosISPT, ejercicio)
				CalcularConceptosX0T2(topeSalarioMinimo)
				
			} else if (sumaConceptos0X < topeIngreso) {
				CalcularISPT(sumaConceptosISPT, ejercicio)
				CalcularConceptosX0T2(sumaConceptos0X)
			
			} else {
				CalcularISPT(sumaConceptosISPT, ejercicio)
				CalcularConceptosX0T2(topeIngreso)
			}
			break
	}
}

async function TablaConceptosVariables(tabla, tipoConcepto, conceptosVariables) {
	
	let sumaConceptosISPT = 0;
	let sumaConceptos0X = 0;
	let contadorId = contarFilasTbody("tabla" + tipoConcepto.toString()) + 1
	
	conceptosVariables.forEach(function(concepto) {
		const row = document.createElement("tr");
		row.id = `${concepto[0]}`;
		
		const concept = document.createElement("td");
		concept.id = `concepto${contadorId}_${tipoConcepto}`;
		concept.innerHTML = `${concepto[1]}`;

		const descripcion = document.createElement("td");
		descripcion.id = `descripcion${contadorId}_${tipoConcepto}`;
		descripcion.innerHTML = `${concepto[2]}`;

		const importe = document.createElement("td");
		importe.id = `importe${contadorId}_${tipoConcepto}`;
		
		importe.innerHTML = `<div class="editar-importe" lang="es-MX">
								<input type="text" 
									class="form-control input-number margen_boton text-end" 
									id="importeInput${contadorId}_${tipoConcepto}" disabled>
									
								<input type="hidden" class="input-number" 
									id="importeHidden${contadorId}_${tipoConcepto}" />
							</div>
							<div class="editar-importe" hidden>
								<button id='botonAplicarEdicion${contadorId}_${tipoConcepto}' class="btn btn-success btn-tabla btn-editar"
									onclick="AplicarEdicionConcepto(${concepto[0]}, importeInput${contadorId}_${tipoConcepto}, concepto${contadorId}_${tipoConcepto})" 
									title="Aplicar Edición de Concepto" disabled>
									
									<svg width="16" height="16" 
										fill="currentColor" class="bi bi-check-circle-fill" 
										viewBox="0 0 16 16">
									  <path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
									</svg>
								</button>
							</div>
							<div class="editar-importe" hidden>
								<button id='botonCancelarEditar${contadorId}_${tipoConcepto}' class="btn btn-danger btn-tabla btn-editar"
									onclick="ToggleEditarConcepto(importeInput${contadorId}_${tipoConcepto}, importeHidden${contadorId}_${tipoConcepto})"
									title="Cancelar Edición de Concepto" disabled>
									
									<svg width="16" height="16"
										fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
									  <path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
									</svg>
								</button>
							</div>`;
		
		
		const opcion = document.createElement("td");
		opcion.id = `opcion${contadorId}_${tipoConcepto}`;
		opcion.innerHTML = `<button id='botonBorrar${contadorId}_${tipoConcepto}' class="btn btn-danger btn-tabla"
								onclick="AlertBorrarConcepto('${concepto[0]}')" title="Eliminar">
								<svg width="16" height="16" 
									fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
									<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
								</svg>
							</button>
							<button id='botonEditar${contadorId}_${tipoConcepto}' class="btn btn-warning btn-tabla" hidden
								onclick="ToggleEditarConcepto(importeInput${contadorId}_${tipoConcepto}, importeHidden${contadorId}_${tipoConcepto})" title="Editar">
								<svg width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
								  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
								  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
								</svg>
							</button>`;
		
		const datosDeControl = document.createElement("td");
		datosDeControl.classList.add('contenedorDatosControl')
		datosDeControl.id = `datosControl${contadorId}_${tipoConcepto}`;
		
		if (concepto[7] === null) { //Si la fecha de término es null
			datosDeControl.innerHTML = `<div class="w3-container contenedorDatosControl">
											<p class="w3-tooltip">
												Datos de Control
												<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
													fill="currentColor" class="bi bi-info-circle-fill"
													viewBox="0 0 16 16">
							  						<path
														d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
												</svg>
												<span class="w3-text w3-tag w3-animate-opacity w3-round-xlarge">
														Fecha de inicio: <br> <span id="tooltipFechaInicio${contadorId}_${tipoConcepto}"> ${concepto[6]} </span> <br>
														Fecha de término: <br> <span id="tooltipFechaTermino${contadorId}_${tipoConcepto}"> N/A </span> <br>
														Usuario que capturó: <br> <span id="tooltipUsuarioCapturo${contadorId}_${tipoConcepto}"> ${concepto[9]} </span><br>
														Fecha de modificación: <br> <span id="tooltipFechaModificacion${contadorId}_${tipoConcepto}"> ${concepto[10]} </span> <br>
														Usuario que realizó la última modificación: <br> <span id="tooltipUsuFechaMod${contadorId}_${tipoConcepto}"> ${concepto[12]} </span>
												</span> 
											</p>
										</div>`;
		} else {
			datosDeControl.innerHTML = `<div class="w3-container contenedorDatosControl">
										<p class="w3-tooltip">
											Datos de Control
											<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-info-circle-fill"
												viewBox="0 0 16 16">
						  						<path
													d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
											</svg>
											<span class="w3-text w3-tag w3-animate-opacity w3-round-xlarge">
													Fecha de inicio: <br> <span id="tooltipFechaInicio${contadorId}_${tipoConcepto}"> ${concepto[6]} </span> <br>
													Fecha de término: <br> <span id="tooltipFechaTermino${contadorId}_${tipoConcepto}"> ${concepto[7]} </span> <br>
													Usuario que capturó: <br> <span id="tooltipUsuarioCapturo${contadorId}_${tipoConcepto}"> ${concepto[9]} </span><br>
													Fecha de modificación: <br> <span id="tooltipFechaModificacion${contadorId}_${tipoConcepto}"> ${concepto[10]} </span> <br>
													Usuario que realizó la última modificación: <br> <span id="tooltipUsuFechaMod${contadorId}_${tipoConcepto}"> ${concepto[12]} </span>
											</span> 
										</p>
									</div>`;
		}
		
		row.appendChild(concept);
		row.appendChild(descripcion);
		row.appendChild(importe);
		row.appendChild(opcion);
		row.appendChild(datosDeControl);

		tabla.appendChild(row);
		
		//Sumar las percepciones fijas quincenales para obtener los conceptos 0X (revisar excel)
		if (concepto[1] === '07' || concepto[1] === '02') {
			sumaConceptos0X += concepto[3]
		
		} else if (concepto[1] === '77') {
			sumaConceptos0X += concepto[3]
		
		} else if (concepto[1] === 'A1' || concepto[1] === 'A2' || concepto[1] === 'A3'
				|| concepto[1] === 'A4' || concepto[1] === 'A5') {
			sumaConceptos0X += concepto[3]
		}
		
		ejercicio = concepto[4]
		sumaConceptosISPT += concepto[3] //Suma de conceptos para calcular ISPT (revisar excel)
		contadorId++
	});
	
	document.getElementById("sumaConceptos" + tipoConcepto).value = sumaConceptos0X;
}

async function ObtenerIdConceptoTd(concepto, tipoConcepto) {
    // Select all <td> elements
    let tabla = document.getElementById('tabla' + tipoConcepto)
    let elementosTd = tabla.querySelectorAll('td')
	
    // Iterate through the <td> elements
    for (let td of elementosTd) {
        // Check if the text content of the <td> matches the concept value
        if (td.textContent.trim() === concepto) {
            // Return the id of the matching <td>
            const inputs = td.parentElement.getElementsByTagName('div')[0].children
            //return td.id
            return inputs
        }
    }
    
	return swal({
		title: "Error al encontrar el concepto " + concepto,
		text: "Consulte al administrador del sistema",
		icon: "error",
		button: "Aceptar",
	})
}

function contarFilasTbody(tablaId) {
	
    let tbody = document.getElementById(tablaId)
    let cantidadFilas = tbody.childElementCount
    
    return cantidadFilas
}

async function CalcularISPT(salarioBase, ejercicio) {
	
	let datos = {};
	datos.salarioBase = salarioBase;
	datos.ejercicio = ejercicio;

	const request = await fetch('api/puestos/calcular/FC01T2', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(datos)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 01, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 01, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
				title: "Error",
				text: "Error al consultar el concepto 01, consulte al administrador del sistema",
				icon: "error",
				button: "Aceptar",
			});
		});

	const numeroFormateado = numbro(request).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	const inputConcepto01 = await ObtenerIdConceptoTd('01', 2)
	
	const importeInput = inputConcepto01[0].id
	const importeHidden = inputConcepto01[1].id
	
	document.getElementById(importeInput).value = numeroFormateado
	document.getElementById(importeHidden).value = numeroFormateado
}

async function CalcularConceptosX0T2(salarioBase) {
	CalcularConcepto0A(salarioBase)
	CalcularConcepto0B(salarioBase)
	CalcularConcepto0C(salarioBase)
	CalcularConcepto0D(salarioBase)
	CalcularConcepto0E(salarioBase)
}

async function CalcularConcepto0A(salarioBase) {
	
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	
	let sn_cptos0xt2 = {};
	sn_cptos0xt2.concepto = "0A"
	sn_cptos0xt2.percepcionesFijas = salarioBase
	sn_cptos0xt2.ejercicio = currentYear
	
	const request = await fetch('api/puestos/calcular/FC0AT2', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sn_cptos0xt2)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0A, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0A, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar el concepto 0A, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});
		
	const numeroFormateado = numbro(request).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	const inputConcepto01 = await ObtenerIdConceptoTd('0A', 2)
	
	const importeInput = inputConcepto01[0].id
	const importeHidden = inputConcepto01[1].id
	
	document.getElementById(importeInput).value = numeroFormateado
	document.getElementById(importeHidden).value = numeroFormateado
}

async function CalcularConcepto0B(salarioBase) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	
	let sn_cptos0xt2 = {};
	sn_cptos0xt2.concepto = "0B"
	sn_cptos0xt2.percepcionesFijas = salarioBase
	sn_cptos0xt2.ejercicio = currentYear
	
	const request = await fetch('api/puestos/calcular/FC0BT2', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sn_cptos0xt2)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0B, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0B, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar el concepto 0B, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});
	
	const numeroFormateado = numbro(request).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	const inputConcepto01 = await ObtenerIdConceptoTd('0B', 2)
	
	const importeInput = inputConcepto01[0].id
	const importeHidden = inputConcepto01[1].id
	
	document.getElementById(importeInput).value = numeroFormateado
	document.getElementById(importeHidden).value = numeroFormateado
}

async function CalcularConcepto0C(salarioBase) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	
	let sn_cptos0xt2 = {};
	sn_cptos0xt2.concepto = "0C"
	sn_cptos0xt2.percepcionesFijas = salarioBase
	sn_cptos0xt2.ejercicio = currentYear
	
	const request = await fetch('api/puestos/calcular/FC0CT2', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sn_cptos0xt2)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0C, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0C, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar el concepto 0C, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});
	
	const numeroFormateado = numbro(request).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	const inputConcepto01 = await ObtenerIdConceptoTd('0C', 2)
	
	const importeInput = inputConcepto01[0].id
	const importeHidden = inputConcepto01[1].id
	
	document.getElementById(importeInput).value = numeroFormateado
	document.getElementById(importeHidden).value = numeroFormateado
}

async function CalcularConcepto0D(salarioBase) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	
	let sn_cptos0xt2 = {};
	sn_cptos0xt2.concepto = "0D"
	sn_cptos0xt2.percepcionesFijas = salarioBase
	sn_cptos0xt2.ejercicio = currentYear
	
	const request = await fetch('api/puestos/calcular/FC0DT2', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sn_cptos0xt2)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0D, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0D, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar el concepto 0D, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});
		
	const numeroFormateado = numbro(request).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	const inputConcepto01 = await ObtenerIdConceptoTd('0D', 2)
	
	const importeInput = inputConcepto01[0].id
	const importeHidden = inputConcepto01[1].id
	
	document.getElementById(importeInput).value = numeroFormateado
	document.getElementById(importeHidden).value = numeroFormateado
}

async function CalcularConcepto0E(salarioBase) {
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	
	let sn_cptos0xt2 = {};
	sn_cptos0xt2.concepto = "0E"
	sn_cptos0xt2.percepcionesFijas = salarioBase
	sn_cptos0xt2.ejercicio = currentYear
	
	const request = await fetch('api/puestos/calcular/FC0ET2', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(sn_cptos0xt2)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0E, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {
			// Check if data is null
			if (data === null) {
				// Handle the case where data is null
				console.log('Response is null');
				return swal({
					title: "Error",
					text: "Error al consultar el concepto 0E, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation:', error);
			return swal({
					title: "Error",
					text: "Error al consultar el concepto 0E, consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});
		
	const numeroFormateado = numbro(request).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	const inputConcepto01 = await ObtenerIdConceptoTd('0E', 2)
	
	const importeInput = inputConcepto01[0].id
	const importeHidden = inputConcepto01[1].id
	
	document.getElementById(importeInput).value = numeroFormateado
	document.getElementById(importeHidden).value = numeroFormateado
}

//Habilita/Deshabilita los inputs y botones para editar el importe del concepto
function ToggleEditarConcepto(inputImporte, inputValorOriginal) {
	
	const inputTr = inputImporte.closest('tr');
	const botonesAHabilitar = inputTr.getElementsByClassName('btn-editar');
	
	if (inputImporte.disabled) {
		Array.from(botonesAHabilitar).forEach(function(boton) {
			boton.disabled = false;
		});
		
		inputImporte.disabled = false;
		
	} else {
		Array.from(botonesAHabilitar).forEach(function(boton) {
			boton.disabled = true;
		});
		inputImporte.value = inputValorOriginal.value;
		inputImporte.disabled = true;
	}
}

async function AplicarEdicionConcepto(conceptoId, inputModificado, conceptoString) {
	
	const importeSinComas = inputModificado.value.replace(/,/g, '');
	
	const numeroFormateado = numbro(importeSinComas).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	inputModificado.value = numeroFormateado
	const inputTr = inputModificado.closest('tr');
	const botonesAHabilitar = inputTr.getElementsByClassName('btn-editar');
	
	Array.from(botonesAHabilitar).forEach(function(boton) {
		boton.disabled = true;
	});
	inputModificado.disabled = true;
}

async function llenarConcepto(tipoConcepto) {
	
	const select = document.getElementById("selectTipo" + tipoConcepto.toString());
	
	//Detiene la ejecución del script si detecta que ya se han llenado los options anteriormente
	if (select.options.length > 1) {
		return;
	}
	
	let datos = {};
	datos.cxpto_tipocpto = tipoConcepto;
	datos.cxpto_idpuesto = document.getElementById("puestoIdACopiarConceptos").value;
	
	/*Obtiene los datos de los conceptos para crear el select dentro del modal Agregar Nuevo Concepto*/
	const request = await fetch('api/puestos/agregar/LlenarModalConcepto', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});
	
	const conceptos = await request.json();
	
	if (verificarJson(conceptos)){
		return swal({
		  title: "Error al obtener los conceptos.",
		  text: "Contacte a su administrador.",
		  icon: "error",
		  button: "Cerrar",
		});
	}
	
	conceptos.forEach(function(concepto) {
		const option = document.createElement("option");
		option.value = `${concepto[0]};${concepto[1]};${concepto[3]};${concepto[4]}`
						+ `;${concepto[5]};${concepto[6]};${concepto[8]};${concepto[9]}`
						+ `;${concepto[11]}`;
		option.innerHTML = `${concepto[0]}`;
		
		select.appendChild(option);
	});
	
	const descripcion = document.getElementById("descripcionTipo" + tipoConcepto.toString());
	const importe = document.getElementById("importeTipo" + tipoConcepto.toString());
	
	//Agrega evento onchange al select de conceptos del modal
	select.onchange = function() {ConceptoSeleccionado(select, descripcion, importe)};
	
	//Agrega evento onclick al botón seleccionar del modal
	document.getElementById("seleccionarNuevoConcepto" + tipoConcepto.toString())
		.onclick = function() {AgregarNuevoConcepto(select, tipoConcepto)};
	
	//Eventos para resetear los selects e inputs de los modals de nuevos conceptos
	document.getElementById("cancelarNuevoConcepto" + tipoConcepto.toString())
		.onclick = function() {ResetOpciones('selectTipo' + tipoConcepto.toString(), 
												'descripcionTipo' + tipoConcepto.toString(),
												'importeTipo' + tipoConcepto.toString())}
	
	document.getElementById("cerrarModal" + tipoConcepto.toString())
		.onclick = function() {ResetOpciones('selectTipo' + tipoConcepto.toString(), 
												'descripcionTipo' + tipoConcepto.toString(),
												'importeTipo' + tipoConcepto.toString())}
}

//Agrega la descripción del input dependiendo del concepto seleccionado
//Dentro del modal de Agregar Concepto
function ConceptoSeleccionado(selectId, inputDescripcion, inputImporte) {
	inputDescripcion.value = selectId.value.split(";")[1];
	
	const importeFormateado = numbro(selectId.value.split(";")[2]).format({
			thousandSeparated: true,
    		mantissa: 3
		});
	
	inputImporte.value = importeFormateado;
}

function AgregarNuevoConcepto(selectId, tipoConcepto) {
	
	let conceptosTablaHidden = document.getElementById('conceptosTabla' + tipoConcepto).value;
	
	const tabla = document.getElementById("tabla" + tipoConcepto.toString());
	const idInputImporte = document.getElementById("importeTipo" + tipoConcepto.toString());
	
	//Añadir el nuevo concepto al input hidden que tiene todos los conceptos a insertar en la bd
	let inputConceptos = document.getElementById("conceptosTabla" + + tipoConcepto.toString())
	//Formato: ${Descripción concepto};${importeConcepto}|
	let inputConceptosValores = inputConceptos.value
	inputConceptosValores += `${selectId.value.split(";")[0]};${idInputImporte.value}|`
	
	inputConceptos.removeAttribute('value');
	inputConceptos.value = inputConceptosValores
	
	/*Si la tabla de conceptos está vacía tendrá una fila con valores N/A, al agregar 
	un nuevo concepto se elimina esa fila y se sustituye por el concepto agregado */
	if (tabla.getElementsByTagName("tr").length == 1) {
		tr = tabla.getElementsByTagName("tr")[0];
		if (tr.id == `na1_${tipoConcepto}`) {
			tabla.removeChild(tr)
		}
	}
	
	const row = document.createElement("tr");
	row.id = `${selectId.value.split(";")[3]}`;
	
	const concept = document.createElement("td");
	concept.id = `concepto${selectId.value.split(";")[0]}_${tipoConcepto}`;
	concept.innerHTML = `${selectId.value.split(";")[0]}`;

	const descripcion = document.createElement("td");
	descripcion.id = `descripcion${selectId.value.split(";")[0]}_${tipoConcepto}`;
	descripcion.innerHTML = `${selectId.value.split(";")[1]}`;

	const importe = document.createElement("td");
	importe.id = `importe${selectId.value.split(";")[0]}_${tipoConcepto}`;

	const numeroFormateado = numbro(idInputImporte.value).format({
		thousandSeparated: true,
		mantissa: 3
	});
	
	importe.innerHTML = `<div class="editar-importe" lang="es-MX">
								<input type="text" 
									class="form-control input-number margen_boton text-end" 
									id="importeInput${selectId.value.split(";")[0]}_${tipoConcepto}" 
									value="${numeroFormateado}" disabled>
									
								<input type="hidden" class="input-number" 
									id="importeHidden${selectId.value.split(";")[0]}_${tipoConcepto}" 
									value="${numeroFormateado}" />
							</div>
							<div class="editar-importe">
								<button id='botonAplicarEdicion${selectId.value.split(";")[0]}_${tipoConcepto}' class="btn btn-success btn-tabla btn-editar"
									onclick="AplicarEdicionConcepto(${selectId.value.split(";")[3]}, 
									importeInput${selectId.value.split(";")[0]}_${tipoConcepto}, 
									concepto${selectId.value.split(";")[0]}_${tipoConcepto})" 
									title="Aplicar Edición de Concepto" disabled>
									
									<svg width="16" height="16" 
										fill="currentColor" class="bi bi-check-circle-fill" 
										viewBox="0 0 16 16">
									  <path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
									</svg>
								</button>
							</div>
							<div class="editar-importe">
								<button id='botonCancelarEditar${selectId.value.split(";")[0]}_${tipoConcepto}' 
								class="btn btn-danger btn-tabla btn-editar"
									onclick="ToggleEditarConcepto(importeInput${selectId.value.split(";")[0]}_${tipoConcepto}, 
									importeHidden${selectId.value.split(";")[0]}_${tipoConcepto})"
									title="Cancelar Edición de Concepto" disabled>
									
									<svg width="16" height="16"
										fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
									  <path
											d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
									</svg>
								</button>
							</div>`;

	const opcion = document.createElement("td");
	opcion.id = `opcion${selectId.value.split(";")[0]}_${tipoConcepto}`;
	opcion.innerHTML = `<button id='botonBorrar${selectId.value.split(";")[0]}_${tipoConcepto}' class="btn btn-danger btn-tabla"
							onclick="AlertBorrarConcepto('${selectId.value.split(";")[3]}')" title="Eliminar">
							<svg width="16" height="16" 
								fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
								<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
							</svg>
						</button>
						<button id='botonEditar${selectId.value.split(";")[0]}_${tipoConcepto}' class="btn btn-warning btn-tabla"
							onclick="ToggleEditarConcepto(importeInput${selectId.value.split(";")[0]}_${tipoConcepto}, importeHidden${selectId.value.split(";")[0]}_${tipoConcepto})" title="Editar">
							<svg width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
							  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
							  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
							</svg>
						</button>`;
	
	opcion.classList.add('opcionTabla');
	
	/*Al no tener contador, los Ids de los nuevos puestos agregados serán diferentes */
	
	const datosDeControl = document.createElement("td");
	datosDeControl.classList.add('contenedorDatosControl')
	datosDeControl.id = `datosControl_${tipoConcepto}`;

	if (selectId.value.split(";")[5] === "null") { //Si la fecha de término es null
		datosDeControl.innerHTML = `<div class="w3-container contenedorDatosControl">
											<p class="w3-tooltip">
												Datos de Control
												<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
													fill="currentColor" class="bi bi-info-circle-fill"
													viewBox="0 0 16 16">
							  						<path
														d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
												</svg>
												<span class="w3-text w3-tag w3-animate-opacity w3-round-xlarge">
														Fecha de inicio: <br> <span id="tooltipFechaInicio${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[4]} </span> <br>
														Fecha de término: <br> <span id="tooltipFechaTermino${selectId.value.split(";")[0]}_${tipoConcepto}"> N/A </span> <br>
														Usuario que capturó: <br> <span id="tooltipUsuarioCapturo${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[6]} </span><br>
														Fecha de modificación: <br> <span id="tooltipFechaModificacion${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[7]} </span> <br>
														Usuario que realizó la última modificación: <br> <span id="tooltipUsuFechaMod${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[8]} </span>
												</span> 
											</p>
										</div>`;
	} else {
		datosDeControl.innerHTML = `<div class="w3-container contenedorDatosControl">
										<p class="w3-tooltip">
											Datos de Control
											<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16"
												fill="currentColor" class="bi bi-info-circle-fill"
												viewBox="0 0 16 16">
						  						<path
													d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
											</svg>
											<span class="w3-text w3-tag w3-animate-opacity w3-round-xlarge">
													Fecha de inicio: <br> <span id="tooltipFechaInicio${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[4]} </span> <br>
													Fecha de término: <br> <span id="tooltipFechaTermino${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[5]} </span> <br>
													Usuario que capturó: <br> <span id="tooltipUsuarioCapturo${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[6]} </span><br>
													Fecha de modificación: <br> <span id="tooltipFechaModificacion${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[7]} </span> <br>
													Usuario que realizó la última modificación: <br> <span id="tooltipUsuFechaMod${selectId.value.split(";")[0]}_${tipoConcepto}"> ${selectId.value.split(";")[8]} </span>
										</p>
									</div>`;
	}

	row.appendChild(concept);
	row.appendChild(descripcion);
	row.appendChild(importe);
	row.appendChild(opcion);
	row.appendChild(datosDeControl);

	tabla.appendChild(row);
	
	conceptosTablaHidden += `${selectId.value.split(";")[0]};${numeroFormateado}|`
	
	swal({
		title: "Se ha agregado el concepto correctamente.",
		text: "",
		icon: "success",
		button: "Cerrar",
	});
	
	ResetOpciones('selectTipo' + tipoConcepto.toString(), 
						'descripcionTipo' + tipoConcepto.toString(),
						'importeTipo' + tipoConcepto.toString())
}

//Resetea los datos de los modals para agregar nuevos conceptos
function ResetOpciones(select, inputDescripcion, inputImporte) {
	let selectElement = document.getElementById(select);

	// Remove options starting from index 1 (second option)
	for (let i = selectElement.options.length - 1; i > 0; i--) {
	    selectElement.remove(i);
	}
	
	document.getElementById(select).selectedIndex = 0;
	document.getElementById(inputDescripcion).value = "";
	document.getElementById(inputImporte).value = "";
}

async function AgregarNuevoPuesto(){
	
	const conceptosTabla1 = document.getElementById("conceptosTabla1");
	const conceptosTabla2 = document.getElementById("conceptosTabla2");
	const conceptosTabla3 = document.getElementById("conceptosTabla3");
	const conceptosTabla4 = document.getElementById("conceptosTabla4");
	
	swal({
		title: "¿Está seguro de copiar los conceptos de este puesto?",
		text: "",
		icon: "warning",
		buttons: ["Cancelar", "Aceptar"],
		dangerMode: true,
	})
		.then(async (willDelete) => { //Si le da clic al botón Aceptar
			if (willDelete) { //Se activa el if

				const response1 = await EjecutarInsercionDeConceptos(conceptosTabla1, 1)

				if (!(await VerificarInsercionDeConceptos(response1))) {
					return RespuestaError();
				}

				const response2 = await EjecutarInsercionDeConceptos(conceptosTabla2, 2)
				
				if (!(await VerificarInsercionDeConceptos(response2))) {
					return RespuestaError();
				}
				
				const response3 = await EjecutarInsercionDeConceptos(conceptosTabla3, 3)
				
				if (!(await VerificarInsercionDeConceptos(response3))) {
					return RespuestaError();
				}
				
				const response4 = await EjecutarInsercionDeConceptos(conceptosTabla4, 4)
				
				if (!(await VerificarInsercionDeConceptos(response4))) {
					return RespuestaError();
				}
				
				return swal({
					title: "Se han insertado los conceptos correctamente.",
					text: "",
					icon: "success",
					button: "Cerrar",
				}).then(() => {
					RecargarPagina()
				});
			}
		});
}

function RecargarPagina() {
	location.reload();
}

function RespuestaError(){
	return swal({
		title: "Error al insertar los conceptos.",
		text: "Contacte al administrador.",
		icon: "error",
		button: "Cerrar",
	});
}

async function EjecutarInsercionDeConceptos(conceptos, tipoConcepto){
	
	if (conceptos.value.split("|")[0] === "N/A") {
		return true;
	}
	
	const conceptosImportes = conceptos.value.split("|")
	conceptosImportes.pop()
	
	let datos = {};
	datos.cxpto_tipocpto = tipoConcepto;
	datos.cxpto_idpuesto = document.getElementById("puestoIdAutocompletado").value;
	datos.cxpto_usucapturo = sessionStorage.idUsuario;
	datos.cxpto_usumodifico = sessionStorage.idUsuario;
	datos.cxpto_concepto = conceptosImportes[0].split(";")[0]
    datos.cxpto_importe = conceptosImportes[0].split(";")[1]
	
	const promises = conceptosImportes.map(async elemento => {
    	
    	datos.cxpto_concepto = elemento.split(";")[0]
    	datos.cxpto_importe = elemento.split(";")[1]
    	
    	const request = await fetch('api/puestos/insertar/insertarPuesto', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(datos)
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			// Check if the response is null
			if (response.status === 204) {
				// Handle the case where the response is null
				console.log('Response is null');
				// You can return null or handle it as per your requirement
				return false
			}
			// If response is not null, parse the JSON response
			return response.json();
		})
		.then(data => {

			if (data === null) {
				console.log('Response is null');
				return false
				
			} else {
				// Process the data if it's not null
				return data;
			}
		})
		.catch(error => {
			// Handle errors
			console.error('There was a problem with the fetch operation: ', error);
			return false
		});
    	
    	return request //true o false
	});
	
	const resultados = await Promise.all(promises)
	
	return resultados
}

async function VerificarInsercionDeConceptos(resultados) {
    if (typeof resultados === 'boolean' && resultados === true) {
        return true;
    }

    for (let resultado of resultados) {
        if (!resultado) {
            return false;
        }
    }
    return true;
}

//Alert Confirmar Borrar Concepto
function AlertBorrarConcepto(conceptoId) {

	swal({
		title: "¿Está seguro de eliminar el concepto?",
		text: "",
		icon: "warning",
		buttons: ["Cancelar", "Aceptar"],
		dangerMode: true,
	})
		.then((willDelete) => { //Si le da clic al botón Aceptar
			if (willDelete) { //Se activa el if
				//Se llama a la función con la API que elimina el concepto
				if (borrarConcepto(conceptoId)) {
					return swal({
						title: "Se ha eliminado el concepto.",
						text: "",
						icon: "success",
						button: "Cerrar",
					});
				}

				swal({
					title: "Error al eliminar el concepto.",
					text: "Consulte a su administrador.",
					icon: "error",
					button: "Cerrar",
				});
			}
		});
}

function borrarConcepto(conceptoId) {
	document.getElementById(conceptoId).remove()
	if (!document.getElementById(conceptoId)) {
		return true;
	}
	return false;
}

const verificarJson = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
}

$('#modalInfo').on('hidden.bs.modal', function() {
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
});

function OcultarEspacios(divId) {
	
	let ocultarEspacios = divId.querySelectorAll('br');
	let contador = 0;
	
	ocultarEspacios.forEach(function(elemento){
		if (contador > 3) {
			elemento.setAttribute('style', 'display:none');
		}
		contador++;
	})
}

function limpiarTabla(idDivBr) {
	$("#autocompletarCopiarPuesto").val('');
	$("#conceptosACopiar").empty();
	autocompletarCopiarPuesto.input.disabled = false;
	
	let mostrarEspacios = idDivBr.querySelectorAll('br');
	
	mostrarEspacios.forEach(function(elemento) {
		elemento.removeAttribute('style');
	})
}

/**Boton limpiar campos*/
function limpiarCampos() {

	let elementosFormulario = document.querySelectorAll('input, textarea, select');
	
	elementosFormulario.forEach(function(elemento) {
		elemento.value = '';
		elemento.disabled = true;
		
		if (elemento.id == 'fechaTerminoVacia'){
			$("divFechaTerminoLlena").prop("hidden", true);
			$("divFechaTerminoVacia").prop("hidden", false);
		
		} else if (elemento.tagName.toLowerCase() === 'select') {
			elemento.selectedIndex = 0;
			elemento.value = '';
			elemento.disabled = false;
			
			for (let i = elemento.options.length - 1; i > 0; i--) {
			    elemento.remove(i);
			}
		}
	});
	$("tbody").empty();
	
	const opciones = document.getElementsByClassName('opcionTabla');
	
	Array.from(opciones).forEach(function(boton) {
		boton.setAttribute('hidden', 'true');
	});
	
	document.getElementById('situacion').style.borderColor = "";
	
	autoCompleteJS.input.disabled = false;
	autocompletarCopiarPuesto.input.disabled = false;
	document.getElementById("btnAgregarConcepto").disabled = true;
	document.getElementById("btnAgregarConcepto2").disabled = true;
	document.getElementById("btnAgregarConcepto3").disabled = true;
	document.getElementById("btnAgregarConcepto4").disabled = true;
}
