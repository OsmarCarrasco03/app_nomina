$(async function () {
	if (sessionStorage.permisos == 1) {
		$("#nav-datos-control-tab").prop("hidden", false);
	}
	
	await ObtenerAnioyPeriodo()
	await NominasActivas()
	await iniciarAutoComplete()
});

async function ObtenerAnioyPeriodo() {

const periodo = await ObtenerPeriodoActual()

document.getElementById('anioPeriodo').value = periodo[0].pp_ejercicio;
document.getElementById('periodo').value = periodo[0].pp_quincena;
document.getElementById('inicioPeriodo').value = periodo[0].pp_fechadesde;
document.getElementById('finPeriodo').value = periodo[0].pp_fechahasta;

}

async function TraerUnidades(tipoUnidad) {

	let data = {}
	
	data.uni_ejercicio = document.getElementById('anioPeriodo').value
	data.uni_situacion = 1
	
	//Si vuelve a seleccionar el primer option
	if (tipoUnidad == 0) {
		await EliminarElementosPorClase('nuevaUnidad')
		await EliminarElementosPorClase('nuevaUnidadBr')
		//await OcultarDiv('inputsInicialesUnidades', false)
		return 
		
	} else if (tipoUnidad != 1) {
		//Tipo unidad 1 = todas, 2 = centrales, 3 = foraneas
		data.uni_tipo = tipoUnidad
	}
	
	const unidades = await fetch('api/nomina/traerUnidades', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
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
					text: "Data is null",
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
					text: "Data is null",
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
					text: "Consulte al administrador del sistema",
					icon: "error",
					button: "Aceptar",
				});
		});
	
	await LlenarUnidades(unidades)
}

async function LlenarUnidades(unidades) {
	
	let increment = 1
	
	await EliminarElementosPorClase('nuevaUnidad')
	await EliminarElementosPorClase('nuevaUnidadBr')
	//await OcultarDiv('inputsInicialesUnidades', true)
	
	unidades.forEach(function(unidad) {
		
		const divListaUnidades = document.getElementById('tabScrollUnidades')

		// Create a <br> element
		const brElement = document.createElement('br');
		brElement.className = 'nuevaUnidadBr';
		brElement.id = `brUnidad${increment}`

		// Div de la Fila completa
		const divElement = document.createElement('div');
		divElement.className = 'row justify-content-md-center nuevaUnidad';
		divElement.id = `unidad${increment}`
		
		// Create the hidden input element with id "idUnidad2"
		const hiddenInputElement = document.createElement('input');
		hiddenInputElement.type = 'hidden';
		hiddenInputElement.id = `idUnidad${increment}`;
		hiddenInputElement.value = unidad[0]

		// Create the first <div> with class "col-3"
		const divCol3 = document.createElement('div');
		divCol3.className = 'col-3';

		// Create the first input element with id "unidadClave2", type "text", class "form-control", and disabled attribute
		const inputElement1 = document.createElement('input');
		inputElement1.type = 'text';
		inputElement1.className = 'form-control';
		inputElement1.id = `unidadClave${increment}`;
		inputElement1.disabled = true;
		inputElement1.value = unidad[1]

		// Append the first input element to the first <div>
		divCol3.appendChild(inputElement1);

		// Create the second <div> with class "col"
		const divCol = document.createElement('div');
		divCol.className = 'col';

		// Create the second input element with id "unidadZona2", type "text", class "form-control", and disabled attribute
		const inputElement2 = document.createElement('input');
		inputElement2.type = 'text';
		inputElement2.className = 'form-control';
		inputElement2.id = `unidadZona${increment}`;
		inputElement2.disabled = true;
		inputElement2.value = unidad[2]
		
		// Append the second input element to the second <div>
		divCol.appendChild(inputElement2);
		
		//Div para la opción Eliminar
		const divCol1 = document.createElement('div');
		divCol1.className = 'col-1';

		const opcion = document.createElement('span')
		opcion.innerHTML = `<button id='botonBorrar${increment}' class="btn btn-danger btn-tabla"
								onclick="EliminarUnidad('unidad${increment}', 'brUnidad${increment}')" title="Eliminar">
								<svg width="16" height="16" 
									fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
									<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
								</svg>
							</button>`
		
		// Append the second input element to the second <div>
		divCol1.appendChild(opcion);
		
		// Append the hidden input, first <div>, and second <div> to the main <div> element
		divElement.appendChild(hiddenInputElement);
		divElement.appendChild(divCol3);
		divElement.appendChild(divCol);
		divElement.appendChild(divCol1);
		
		// Append the <br> and main <div> element to the body or any other desired parent element
		if (increment != 1) {
			divListaUnidades.appendChild(brElement);
		}
		divListaUnidades.appendChild(divElement);
		
		increment++
	})
}

async function ProcesarNomina(){
	
	const valorProcesarNomina = EleccionProcesarNomina()
	
	if(valorProcesarNomina == null){
		return swal({
			title: "Error",
			text: "Seleccione una opción para procesar la nómina",
			icon: "error",
			button: "Aceptar",
		});
	}
	
	switch (valorProcesarNomina) {
		case '1':
			const datosUnidades = document.querySelectorAll('.nuevaUnidad')
			
			if (datosUnidades.length == 0) {
				return swal({
					title: "Error",
					text: "No se han encontrado unidades a procesar.",
					icon: "error",
					button: "Aceptar",
				});
			}
			
			if (await ProcesarUnidades(datosUnidades)){
				return swal({
					title: "Completado",
					text: "Se ha procesado la nómina correctamente.",
					icon: "success",
					button: "Aceptar",
				});
			}
			
			swal({
				title: "Error al procesar la nómina por unidades.",
				text: "Contacte al administrador del sistema.",
				icon: "success",
				button: "Aceptar",
			});
			
			break
		case '2':
			const datosNomina = document.querySelectorAll('.nominas')
			
			if (datosNomina.length == 0) {
				return swal({
					title: "Error",
					text: "No se han encontrado nominas a procesar.",
					icon: "error",
					button: "Aceptar",
				});
			}
			
			switch (await ProcesarNominas(datosNomina)){
				case 1:
					swal({
						title: "Completado",
						text: "Se ha procesado la nómina correctamente.",
						icon: "success",
						button: "Aceptar",
					});
					break
				case 2:
					swal({
						title: "Seleccione una nómina para procesar.",
						text: "",
						icon: "warning",
						button: "Aceptar",
					});
					break
			}
			
			break
		case '3':
			const datosPersonas = document.querySelectorAll('.personas')
			
			if (datosPersonas.length == 0) {
				return swal({
					title: "Error",
					text: "No se han encontrado personas a procesar.",
					icon: "error",
					button: "Aceptar",
				});
			}
			
			if (await ProcesarPersonas(datosPersonas)){
				return swal({
					title: "Completado",
					text: "Se ha procesado la nómina correctamente.",
					icon: "success",
					button: "Aceptar",
				});
			}
			
			swal({
				title: "Error al procesar la nómina por persona.",
				text: "Contacte al administrador del sistema.",
				icon: "success",
				button: "Aceptar",
			});
			break
	}
}

async function ProcesarUnidades(unidades){
	
	const unidadesJSON = [];
	
	unidades.forEach(function(unidad) {
		const idUnidad = unidad.querySelector('input[type="hidden"]').value;
		const unidadClave = unidad.querySelector('.form-control[id^="unidadClave"]').value;
		const unidadZona = unidad.querySelector('.form-control[id^="unidadZona"]').value;

		const unidadData = {
			idUnidad: idUnidad,
			unidadClave: unidadClave,
			unidadZona: unidadZona
		}
		
        unidadesJSON.push(unidadData);
	})
	
	console.log(JSON.stringify(unidadesJSON, null, 2));
	return true
}

async function ProcesarNominas(nominas) {
	
	const nominasJSON = [];
	const totalNominas = nominas.length; //cantidad de nominas listadas
	let uncheckedCount = 0; //cantidad de checkboxes sin seleccionar
	
	for (const nomina of nominas) {
		const checkbox = nomina.querySelector('.elegirNomina');
		
		//Si no está marcado el checkbox, aumentará el contador uncheckedCount
		if (checkbox && !checkbox.checked) {
			uncheckedCount++;
			
		} else if (checkbox && checkbox.checked) {
			const nominaClave = nomina.querySelector('.form-control[id^="nominaClave"]').value;
			const nominaNombre = nomina.querySelector('.form-control[id^="nominaNombre"]').value;

			const nominaData = {
				nominaClave: nominaClave,
				nominaNombre: nominaNombre
			};
		
			nominasJSON.push(nominaData);
		}
	}
	
	if (uncheckedCount === totalNominas) {
		return 2;
	}
	
	console.log(JSON.stringify(nominasJSON, null, 2));
	return 1;
}

async function ProcesarPersonas(personas) {
	const personasJSON = []
	
	personas.forEach(function(persona) {
		const idPersona = persona.querySelector('input[type="hidden"]').value
		const personaCurp = persona.querySelector('.form-control[id^="personasCurp"]').value
		const personaNombre = persona.querySelector('.form-control[id^="personasNombre"]').value
		const personasSituacion = persona.querySelector('.form-control[id^="personasSituacion"]').value

		const personaData = {
			idPersona: idPersona,
			personaCurp: personaCurp,
			personaNombre: personaNombre,
			personasSituacion: personasSituacion
		}
		
        personasJSON.push(personaData)
	})
	
	console.log(JSON.stringify(personasJSON, null, 2))
	return true
}

function ResetRadios() {
    let radioButtons = document.querySelectorAll('.opcionProcesarNomina');

    radioButtons.forEach(function(radio) {
        radio.checked = false;
    });
}

function EliminarUnidad(divUnidad, br) {
	
	const unidad = document.getElementById(divUnidad)
	if (unidad) {
		unidad.parentNode.removeChild(unidad)
	}
	
	const brAEliminar = document.getElementById(br)
	if (brAEliminar) {
		brAEliminar.parentNode.removeChild(brAEliminar)
	}
	
}

async function LimpiarDatosUnidades() {
	EliminarElementosPorClase('nuevaUnidadBr')
	EliminarElementosPorClase('nuevaUnidad')
	//OcultarDiv('inputsInicialesUnidades', false)
	
	const selectElement = document.getElementById('selectUnidades');
    selectElement.selectedIndex = 0;
}

async function EliminarElementosPorClase(className) {
    // Select all elements with the specified class name
    const elements = document.querySelectorAll(`.${className}`)
	
    // Iterate over the NodeList and remove each element
    elements.forEach(element => {
        element.parentNode.removeChild(element)
    });
}

async function OcultarDiv(idDiv, boolean) {
	if (boolean === true) {
		document.getElementById(idDiv).setAttribute("hidden", boolean)
		return
	}
	document.getElementById(idDiv).removeAttribute("hidden")
}

async function NominasActivas() {
	
	const nominas = await fetch('api/dataNom/nominas', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
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
	
	await LlenarNominas(nominas)
}

async function LlenarNominas(nominas) {
	
	let increment = 1
	
	nominas.forEach(function(nomina) {
		
		// Create a <br> element
		const brElement = document.createElement('br')
		brElement.className = 'nuevaNominaBr'
		brElement.id = `brNomina${increment}`
		
		const divListaNominas = document.getElementById('tabScrollNominas')

		// Create the row div
		const rowDiv = document.createElement('div');
		rowDiv.className = 'row justify-content-md-center nominas';
		rowDiv.id = `nomina${increment}`;
		
		// Create the first column div with input
		const colDiv1 = document.createElement('div');
		colDiv1.className = 'col-2';
		
		const input1 = document.createElement('input');
		input1.type = 'text';
		input1.className = 'form-control';
		input1.id = `nominaClave${increment}`;
		input1.disabled = true;
		input1.value = nomina[0]
		
		colDiv1.appendChild(input1);

		// Create the second column div with input
		const colDiv2 = document.createElement('div');
		colDiv2.className = 'col';
		
		const input2 = document.createElement('input');
		input2.type = 'text';
		input2.className = 'form-control';
		input2.id = `nominaNombre${increment}`;
		input2.disabled = true;
		input2.value = nomina[1]
		
		colDiv2.appendChild(input2);

		// Create the third column div with checkbox
		const colDiv3 = document.createElement('div');
		colDiv3.className = 'col-1 text-center';
		
		const checkbox = document.createElement('input');
		checkbox.className = 'form-check-input elegirNomina';
		checkbox.type = 'checkbox';
		checkbox.id = `nominaCheckbox${increment}`;
		
		colDiv3.appendChild(checkbox);

		// Append all column divs to the row div
		rowDiv.appendChild(colDiv1);
		rowDiv.appendChild(colDiv2);
		rowDiv.appendChild(colDiv3);

		// Append the row div to the container
		if (document.getElementsByClassName('nominas').length > 0) {
			tabScrollPersonas.appendChild(brElement)
		}
		divListaNominas.appendChild(rowDiv);

		increment++
	})
}

async function buscarPersona() {
	const autoCompleteInput = document.getElementById('autoComplete').value.trim();
	//const query = autoCompleteInput;

	let datos = { per_curp: autoCompleteInput.split("-")[0].trim() };
	
	const datosPersona = await fetch('api/nomina/EmpleadoPorCurp', {
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
	
	if (await VerificarDuplicidadPersona(datosPersona)) {
		return swal({
			title: "Le persona ya se encuentra en la lista.",
			text: "",
			icon: "warning",
			button: "Aceptar",
		});
	}
	
	await LlenarDatosPersona(datosPersona)
}

async function VerificarDuplicidadPersona(datosPersona) {
	
	const id = datosPersona[0][0]; // Assuming the first element is the ID
    const personaIds = document.querySelectorAll('.hiddenPersonas');
    
    for (let personaId of personaIds) {
        if (personaId.value == id) {
            return true;
        }
    }
    return false;
}

async function LlenarDatosPersona(datosPersona) {
	
	let increment = 1
	
	datosPersona.forEach(function(persona) {
		
		// Create a <br> element
		const brElement = document.createElement('br')
		brElement.className = 'nuevaPersonadBr'
		brElement.id = `brPersona${increment}`
		
		// Create the parent div
		const rowDiv = document.createElement('div');
		rowDiv.className = 'row justify-content-md-center personas';
		rowDiv.id = `persona${increment}`;
		
		// Create the hidden input
		const hiddenInput = document.createElement('input')
		hiddenInput.type = 'hidden'
		hiddenInput.id = `idPersonas${increment}`
		hiddenInput.className = 'hiddenPersonas';
		hiddenInput.value = `${persona[0]}`
		rowDiv.appendChild(hiddenInput)

		// Create the first column div with input
		const colDiv1 = document.createElement('div')
		colDiv1.className = 'col-4'
		
		const input1 = document.createElement('input')
		input1.type = 'text'
		input1.className = 'form-control'
		input1.id = `personasCurp${increment}`
		input1.value = `${persona[1]}`
		input1.disabled = true
		
		colDiv1.appendChild(input1)
		rowDiv.appendChild(colDiv1)

		// Create the second column div with input
		const colDiv2 = document.createElement('div');
		colDiv2.className = 'col';
		
		const input2 = document.createElement('input');
		input2.type = 'text';
		input2.className = 'form-control';
		input2.id = `personasNombre${increment}`;
		input2.value = `${persona[2]}`
		input2.disabled = true;
		
		colDiv2.appendChild(input2);
		rowDiv.appendChild(colDiv2);

		// Create the third column div with input
		const colDiv3 = document.createElement('div');
		colDiv3.className = 'col-1';
		
		const input3 = document.createElement('input');
		input3.type = 'text';
		input3.className = 'form-control';
		input3.id = `personasSituacion${increment}`;
		input3.value = `${persona[4]}`
		input3.disabled = true;
		
		colDiv3.appendChild(input3);
		rowDiv.appendChild(colDiv3);
		
		const colOpcion = document.createElement('div');
		colOpcion.className = 'col-1';
		
		const opcion = document.createElement('span')
		opcion.innerHTML = `<button id='botonBorrarPersona${increment}' class="btn btn-danger btn-tabla"
								onclick="EliminarPersona('persona${increment}', 'brPersona${increment}')" title="Eliminar">
								<svg width="16" height="16" 
									fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
									<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
								</svg>
							</button>`
		
		colOpcion.appendChild(opcion);
		rowDiv.appendChild(colOpcion);
		
		// Append the row div to the container
		const tabScrollPersonas = document.getElementById('tabScrollPersonas');
		if (document.getElementsByClassName('personas').length > 0) {
			tabScrollPersonas.appendChild(brElement)
		}
		tabScrollPersonas.appendChild(rowDiv);
	})
}

async function EliminarPersona(divPersona, br) {
	
	const persona = document.getElementById(divPersona)
	if (persona) {
	persona.parentNode.removeChild(persona)
	}
	
	const brAEliminar = document.getElementById(br)
	if(brAEliminar){
		brAEliminar.parentNode.removeChild(brAEliminar)
	}
	
}

const verificarJson = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
}

function EleccionProcesarNomina() {
	const radios = document.querySelectorAll('.opcionProcesarNomina');
	let valorSeleccionado = null;

	radios.forEach(radio => {
		if (radio.checked) {
			valorSeleccionado = radio.value;
		}
	});
	return valorSeleccionado
}

/**Boton limpiar campos Modal de Persona */
function limpiarBusquedaPersona() {
	document.getElementById('autoComplete').value = ''
}

async function LimpiarDatosPersonas() {
	EliminarElementosPorClase('nuevaPersonadBr')
	EliminarElementosPorClase('personas')
}

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
