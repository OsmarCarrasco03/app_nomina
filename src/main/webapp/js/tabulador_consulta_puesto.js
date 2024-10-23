$(function () {
	if (sessionStorage.permisos == 1) {
		$("#nav-datos-control-tab").prop("hidden", false);
	}
});

// servicio
const autoCompleteInput = document.getElementById("autoComplete");

autoCompleteInput.addEventListener("click", function() {
	// Remueve la clase 'input-invalid'
	this.classList.remove('input-invalid');
});
// fin servicio

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

let global_ctgp_codigo;

async function buscarPuesto() {

	let datos = {};
	datos.ctgp_codigo = global_ctgp_codigo = 
	document.getElementById('autoComplete').value.split("-")[0].trim();
	
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
		swal({
			title: 'Por favor, ingrese un dato válido.',
			icon: 'error',
			button: 'Aceptar'
		});
		return;
	}
	// FIN Validación Servicio
	
	llenaModal(datos);
}

async function llenaModal(codigoPuesto) {
	const request = await fetch('api/puestos/consultaXCodigo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(codigoPuesto)
	});
	
	const puesto = await request.json();
	
	const modal = document.getElementById("modalInfo");
	const modalTitle = modal.querySelector(".modal-title");
	const modalBody = modal.querySelector(".modal-body");

	// Abre el modal
	$(modal).modal('show');

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
								data-situacion="${puesto[i][27]}"/>`;

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
	//const selectedRadio = modalBody.querySelector('input[type="radio"]:checked');
	const selectedRadio = modalBuscarPuesto.querySelector('input[type="radio"]:checked');

	if (selectedRadio) {
		// Obtiene los valores personalizados del elemento de radio seleccionado
		const codigoSeleccionado = selectedRadio.getAttribute('data-codigo');
		const codigoPuestoSeleccionado = selectedRadio.getAttribute('data-codigo2');
		const descripcionSeleccionada = selectedRadio.getAttribute('data-descripcion');
		const situacionSeleccionada = selectedRadio.getAttribute('data-situacion');
		
		// Asigna los valores a los campos de entrada
		const codigoInput = document.getElementById('codigoPuesto');
		const descripcionInput = document.getElementById('descripcion');

		consultarDetallesPersonalizados(codigoSeleccionado);

		codigoInput.value = codigoPuestoSeleccionado;
		descripcionInput.value = descripcionSeleccionada;

		const limpiar = document.getElementById('autoComplete');
		limpiar.value = '';
		
		if (situacionSeleccionada == 1) {
			document.getElementById('situacion').value = "ACTIVO";
		} else {
			document.getElementById('situacion').value = "INACTIVO";
			document.getElementById('situacion').classList.add('puestoInactivo')
		}

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

async function consultarDetallesPersonalizados(codigoPuesto) {
	
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
		swal({
		  title: "No se encontraron datos del puesto",
		  text: "",
		  icon: "info",
		  button: "Cerrar",
		});
		return;
	}
	
	for (let i = 0; i < puesto_detalle.length; i++) {
		if (puesto_detalle[i][0] == codigoPuesto) {
			agregarValorAlInput("Tipo", puesto_detalle[i][5]);
			agregarValorAlInput("Zona", puesto_detalle[i][7]);
			agregarValorAlInput("Nivel", puesto_detalle[i][9]);
			agregarValorAlInput("Categoria", puesto_detalle[i][11]);
			agregarValorAlInput("Subcategoria", puesto_detalle[i][13]);
			agregarValorAlInput("Calsificacion_Interna", puesto_detalle[i][15]);
			agregarValorAlInput("Contratacion", puesto_detalle[i][17]);
			agregarValorAlInput("Declaracion", puesto_detalle[i][19]);
			agregarValorAlInput("usuCapturo", puesto_detalle[i][23]);
			agregarValorAlInput("fechaInicio", puesto_detalle[i][20]);
			agregarValorAlInput("fechaCaptura", puesto_detalle[i][24]);
			agregarValorAlInput("usuModifico", puesto_detalle[i][26]);
			if (puesto_detalle[i][21] !== null){
				$("divFechaTerminoLlena").prop("hidden", false);
				agregarValorAlInput("fechaTermino", puesto_detalle[i][21]);	
				$("divFechaTerminoVacia").prop("hidden", true);
			}
			agregarValorAlInput("puestoId", puesto_detalle[i][0]);
		}
	}
	
	consultaConcepto(1);
	consultaConcepto(2);
	consultaConcepto(3);
	consultaConcepto(4);
}

async function consultaConcepto(tipoConcepto) {
	let datos = {};
	datos.cxpto_idpuesto = $('#puestoId').val();
	datos.cxpto_tipocpto = tipoConcepto;

	const consultaConceptos = await fetch('api/puestos/ConsultaTipoConcepto', {
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

	const conceptos = await consultaConceptos;

	const tabla = document.getElementById("tabla" + tipoConcepto.toString());
	let ejercicio = null;
	
	$("#tabla" + tipoConcepto.toString()).empty();
	
	if (verificarJson(conceptos)) {
		let contadorId = 1;
	
		while (contadorId == 1) {
			const row = document.createElement("tr");

			const concept = document.createElement("td");
			concept.id = `concepto${contadorId}_${tipoConcepto}`;
			concept.innerHTML = `N/A`;

			const descripcion = document.createElement("td");
			descripcion.id = `descripcion${contadorId}_${tipoConcepto}`;
			descripcion.innerHTML = `N/A`;

			const importe = document.createElement("td");
			importe.id = `importe${contadorId}_${tipoConcepto}`;
			importe.innerHTML = `N/A`;
			
			const datosDeControl = document.createElement("td");
			datosDeControl.id = `datosControl${contadorId}_${tipoConcepto}`;
			datosDeControl.innerHTML = `N/A`;

			row.appendChild(concept);
			row.appendChild(descripcion);
			row.appendChild(importe);
			row.appendChild(datosDeControl);

			tabla.appendChild(row);

			contadorId++;
		}
		return;
	}
	
	let contadorId = 1;
	let sumaConceptosISPT = 0;
	let sumaConceptos0X = 0;
	
	conceptos.forEach(function(concepto) {
		const row = document.createElement("tr");

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
		
		importe.innerHTML = `${numeroFormateado}`
		
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
		
		row.appendChild(concept)
		row.appendChild(descripcion)
		row.appendChild(importe)
		row.appendChild(datosDeControl)
		
		tabla.appendChild(row)
		
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
			se calculan los concetos en base a ese sueldo, de lo contrario 
			se calcula usando el tope de ingreso de la UMA (revisar excel)*/ 
			
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
	
	document.getElementById("importe1_2").innerHTML = numeroFormateado
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
	
	document.getElementById('importe2_2').innerHTML = numeroFormateado
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
	
	document.getElementById('importe3_2').innerHTML = numeroFormateado
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
	
	document.getElementById('importe4_2').innerHTML = numeroFormateado
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
	
	document.getElementById('importe5_2').innerHTML = numeroFormateado
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
	
	document.getElementById('importe6_2').innerHTML = numeroFormateado
}

function convertirFecha(inputDate) {
	// Divide la fecha en sus componentes: año, mes y día
	let dateComponents = inputDate.split('-');

	if (dateComponents.length !== 3) {
		// Verifica si la fecha de entrada tiene el formato correcto
		return 'Fecha no válida';
	}

	// Crea una nueva fecha en el formato "dd/mm/aaaa"
	let outputDate = dateComponents[2] + '/' + dateComponents[1] + '/' + dateComponents[0];

	return outputDate;
}

const verificarJson = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
}

$('#modalInfo').on('hidden.bs.modal', function() {
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();
});

/**Boton limpiar */
function limpiarCampos() {

	let elementosFormulario = document.querySelectorAll('input, textarea, select');
	
	elementosFormulario.forEach(function(elemento) {
		elemento.value = '';
		
		if (elemento.id == 'fechaTerminoVacia'){
			$("divFechaTerminoLlena").prop("hidden", true);
			$("divFechaTerminoVacia").prop("hidden", false);
		}
	});
	$("tbody").empty();
	document.getElementById('situacion').classList.remove('puestoInactivo')
	autoCompleteJS.input.disabled = false;
}
