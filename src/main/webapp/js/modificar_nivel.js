//Variables Globales
var data_id = null;
var usucapturo_id = null;

/* Inicio Función Buscar Nivel */

async function buscarNivel() {
    let datos = {};
    datos.ctg_nivel = document
        .getElementById("autoComplete")
        .value.split("-")[0]
        .trim();

    try {
        const request = await fetch("api/nivel/autocompletarNivel/" + datos.ctg_nivel, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        const niveles = await request.json();

        if (datos.ctg_nivel.length === 0) {
            swal({
                title: 'Por favor, ingrese un nivel válido.',
                icon: 'error',
                button: 'Aceptar'
            });
            return;
        }


		//Convierte un object data a un arreglo
		const arreglo = Object.values(niveles.data);
		
        llenaModalX(arreglo);

		

    } catch (error) {
        console.error("Error al obtener los datos:", error);
        swal({
            title: 'Error al obtener los datos.',
            text: 'Por favor, inténtelo de nuevo más tarde.',
            icon: 'error',
            button: 'Aceptar'
        });
    }
	
}

async function llenaModalX(puesto) {
    const modal = document.getElementById("modalInfo");
    const modalTitle = modal.querySelector(".modal-title");
    const modalBody = modal.querySelector(".modal-body");
	//console.log(puesto);
	
    $(modal).modal("show");
    modalTitle.textContent = "Selecciona una opción";

    modalBody.innerHTML = "";
    modalBody.innerHTML = `<table class="table table-striped table-hover">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Selección</th>      
                <th scope="col">Nivel</th>
                <th scope="col">Zona</th> 
                <th scope="col">Situación</th>      
            </tr>
        </thead>
        <tbody></tbody>
    </table>`;

    const radioGroupName = "opciones";
    const table = modalBody.querySelector("table tbody");
    table.innerHTML = "";
    let contador = 0;
	
    if (puesto.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = "<td colspan='5'>No se encontraron datos</td>";
        table.appendChild(row);
        return;
    }


    for (var i = 0; i < puesto.length; i++) {
        contador++;
        const row = document.createElement("tr");

		//Número
        const cell1 = document.createElement("td");
        cell1.innerHTML = `<label class="form-check-label">${contador}</label>`;

		//Selección
        const cell2 = document.createElement("td");
        cell2.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" value="${puesto[i][0]}"
        data-id="${puesto[i][0]}" data-nivel="${puesto[i][1]}" data-zona="${puesto[i][2]}" data-situacion="${puesto[i][3]}"  />`;

		//Nivel
        const cell3 = document.createElement("td");
        cell3.innerHTML = `<label class="form-check-label">${puesto[i][1]}</label>`;

		//Zona
        const cell4 = document.createElement("td");
        cell4.innerHTML = `<label class="form-check-label">${puesto[i][2]}</label>`;


		//Situación
        const cell5 = document.createElement("td");
		if(puesto[i][3] == 1){
			cell5.innerHTML = `<label class="form-check-label">ACTIVO</label>`;
		} else {
			cell5.innerHTML = `<label class="form-check-label">INACTIVO</label>`;
		}
		
        

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);

        table.appendChild(row);
    }

	seleccionarBtn.addEventListener("click", function () {
		// Busca el elemento de radio seleccionado
		const selectedRadio = modalBody.querySelector(
		  'input[type="radio"]:checked'
		);
	
		if (selectedRadio) {
		  // Obtiene los valores personalizados del elemento de radio seleccionado
		  const codigoSeleccionado = selectedRadio.getAttribute("data-id");
		  //console.log("Soy el puesto autorizado arriba", codigoSeleccionado);
		  NivelSeleccionadoID = codigoSeleccionado;
		  
		  const ConsultaNivel = selectedRadio.getAttribute(
			"data-nivel"
		  );
		  const consultaZona = selectedRadio.getAttribute(
			"data-zona"
		  );
		  const consultaSituacion = selectedRadio.getAttribute(
			"data-situacion"
		  );
		
		  //console.log(codigoSeleccionado);
		  consultarDetallesPersonalizados(puesto, codigoSeleccionado);
		  data_id = codigoSeleccionado;
		  const limpiar = document.getElementById("autoComplete");
		  limpiar.value = "";
	
		  $(modal).modal("hide");
		} else {
		  seleccion();
		}
	  });

}
//Fin función llenar modal

function validarInput(input){// Expresión regular para verificar si el valor contiene solo caracteres no alfanuméricos
	var regex = /^[^\w\s]+$/;

	   if (regex.test(input.value)){
		// Si el valor contiene solo caracteres no alfanuméricos, se limpia el input
	input.value = ""; 
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


// Llamada a la función con el ID del input y el nuevo valor
//agregarValorAlInput("Input", "Nuevo valor");

async function consultarDetallesPersonalizados(nivelesSeleccionados, idNivel) {
	const request = await fetch("api/nivel/consulta/usuarioCapturo", {
	  method: "GET",
	  headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	  },
	});
  
	const nombreusuario = await request.json();
	
	for (var i = 0; i < nivelesSeleccionados.length; i++) {
	  if (nivelesSeleccionados[i][0] == idNivel) {
		idIzquierdo = nivelesSeleccionados[i][0];
		agregarValorAlInput("id_nivel", nivelesSeleccionados[i][1]);
		agregarValorAlInput("id_zona", nivelesSeleccionados[i][2]);
		agregarValorAlInput("select_zona", nivelesSeleccionados[i][2]);

		
		if(nivelesSeleccionados[i][3] == 1){
			agregarValorAlInput("id_situacion", "ACTIVO");
			agregarValorAlInput("select_situacion", nivelesSeleccionados[i][3]);
			agregarValorAlInput("inpSituacion", "ACTIVO");

		} else {
			agregarValorAlInput("id_situacion", "INACTIVO");
			agregarValorAlInput("select_situacion",  nivelesSeleccionados[i][3]);
			agregarValorAlInput("inpSituacion", "INACTIVO");

		}

		agregarValorAlInput("inpFechaInicio", nivelesSeleccionados[i][4]);
		agregarValorAlInput("inpFechaModificacion", nivelesSeleccionados[i][5]);


		if(nivelesSeleccionados[i][8] !== null){
			agregarValorAlInput("fechaTermino", nivelesSeleccionados[i][8]);
		}
		

		for(var j = 0; j < nombreusuario.length; j++){
			if(nombreusuario[j][0] == nivelesSeleccionados[i][6]){
				usucapturo_id = nombreusuario[j][0];
				agregarValorAlInput("inpUsuarioCapturo", nombreusuario[j][1]);

			}
			if(nombreusuario[j][0] == nivelesSeleccionados[i][7]){
				usucapturo_id = nombreusuario[j][0];
				agregarValorAlInput("inpUsuarioModifico", nombreusuario[j][1]);
			}
		}
		
	  }
	}
}
	//INICIO funcion limpiar campos
function limpiarInputs() {
	document.getElementById('id_nivel').value = '';
	document.getElementById('id_zona').value = '';
	document.getElementById('id_situacion').value = '';
	document.getElementById('select_zona').value = '';
	document.getElementById('select_situacion').value = '';
	document.getElementById('inpFechaInicio').value = '';
	document.getElementById('fechaTermino').value = '';
	document.getElementById('inpFechaModificacion').value = '';
	document.getElementById('inpUsuarioCapturo').value = '';
	document.getElementById('inpUsuarioModifico').value = '';
	document.getElementById('inpSituacion').value = '';
	$("#div_mostrar_zona").prop("hidden", false);
	$("#select_usu_zona").prop("hidden", true);
	$("#div_mostrar_situacion").prop("hidden", false);
	$("#select_usu_situacion").prop("hidden", true);


	//Deshabilitar inputs
	// Busca el elemento con el id "formulario"
	let form = document.getElementById("formulario");

	// Iterar a través de los elementos del formulario: Utiliza un bucle para recorrer todos los elementos dentro del formulario.
	for (let i = 0; i < form.elements.length; i++) {
		let element = form.elements[i];

		// Verificar si un elemento está deshabilitado y habilitarlo: Comprueba si el elemento tiene el atributo "disabled" y, si es así, lo elimina para habilitarlo.
		if (element.getAttribute("disabled") === null) {
			// Set the 'disabled' attribute
			element.setAttribute("disabled", "disabled");
		}
	}

	DeshabilitarBotones();
	swal("Buen trabajo!", "Los campos se guardarón correctamente!", "success");
}

//Función para limpiar con el botón Buscar

function limpiarBuscar() {
	document.getElementById('id_nivel').value = '';
	document.getElementById('id_zona').value = '';
	document.getElementById('id_situacion').value = '';
	document.getElementById('select_zona').value = '';
	document.getElementById('select_situacion').value = '';
	document.getElementById('inpFechaInicio').value = '';
	document.getElementById('fechaTermino').value = '';
	document.getElementById('inpFechaModificacion').value = '';
	document.getElementById('inpUsuarioCapturo').value = '';
	document.getElementById('inpUsuarioModifico').value = '';
	document.getElementById('inpSituacion').value = '';
	$("#div_mostrar_zona").prop("hidden", false);
	$("#select_usu_zona").prop("hidden", true);
	$("#div_mostrar_situacion").prop("hidden", false);
	$("#select_usu_situacion").prop("hidden", true);


	//Deshabilitar inputs
	// Busca el elemento con el id "formulario"
	let form = document.getElementById("formulario");

	// Iterar a través de los elementos del formulario: Utiliza un bucle para recorrer todos los elementos dentro del formulario.
	for (let i = 0; i < form.elements.length; i++) {
		let element = form.elements[i];

		// Verificar si un elemento está deshabilitado y habilitarlo: Comprueba si el elemento tiene el atributo "disabled" y, si es así, lo elimina para habilitarlo.
		if (element.getAttribute("disabled") === null) {
			// Set the 'disabled' attribute
			element.setAttribute("disabled", "disabled");
		}
	}



	const valorInput = document.getElementById("autoComplete").value.split("-")[0].trim();
	//console.log(valorInput);
	if(valorInput && valorInput.length > 0){
		document.getElementById("botonModificar").removeAttribute("disabled");
		document.getElementById("limpiarPuesto").removeAttribute("disabled");
		

	}else{
		document.getElementById("botonModificar").setAttribute("disabled", "disabled");
		document.getElementById("limpiarPuesto").setAttribute("disabled", "disabled");
		document.getElementById("botonActualizar").setAttribute("disabled", "disabled");
	
	}



}

// Event Listener para el botón
document.getElementById('limpiarPuesto').addEventListener('click', limpiarInputs);
document.getElementById('botonBuscar').addEventListener('click', limpiarBuscar);
//FIN función limpiar campos

//Función para habilitar inputs

function HabilitarInputs() {
	// Busca el elemento con el id "formulario"
	let form = document.getElementById("formulario");

	// Iterar a través de los elementos del formulario: Utiliza un bucle para recorrer todos los elementos dentro del formulario.
	for (let i = 0; i < form.elements.length; i++) {
		let element = form.elements[i];

		// Verificar si un elemento está deshabilitado y habilitarlo: Comprueba si el elemento tiene el atributo "disabled" y, si es así, lo elimina para habilitarlo.
		if (element.getAttribute("disabled") !== null) {
			// Remove the 'disabled' attribute
			element.removeAttribute("disabled");
		}
	}
	

	//Cambiar valores dependienbotonActualizar
	switch ($('#id_zona').val()) {
		case '1':
			$("#id_zona").val('1');
			break;
		case '2':
			$("#id_zona").val('2'); 
			break;
		case '3':
			$("#id_zona").val('3'); 
		break;
	}
	
	switch ($('#id_situacion').val()) {
		case 'ACTIVO':
			$("#inp_situacion").val('1'); 
			break;
		case 'INACTIVO':
			$("#inp_situacion").val('2');
			break;
	}

	
	//Habilitar un botón: Llama a una función llamada "HabilitarBoton" para habilitar un botón con el ID "botonActualizar".
	
	HabilitarBoton('botonActualizar');
	$("#id_nivel").prop("hidden", false);
	$("#div_mostrar_zona").prop("hidden", true);
	$("#select_usu_zona").prop("hidden", false);
	$("#div_mostrar_situacion").prop("hidden", true);
	$("#select_usu_situacion").prop("hidden", false);

	// }

	function HabilitarBoton(idBoton){
		document.getElementById(idBoton).removeAttribute("disabled");
	}
}

function DeshabilitarBotones() {

	document.getElementById("botonModificar").setAttribute("disabled", "disabled");
	document.getElementById("botonActualizar").setAttribute("disabled", "disabled");
	document.getElementById("limpiarPuesto").setAttribute("disabled", "disabled");

}

//**************************************ACTUALIZAR NIVEL*************************

// INICIO llenar los datos de control
function datosControl() {
	
	var situacion_control= document.getElementById('select_situacion').value;
	//console.log(situacion_control);
	if(situacion_control == 1){
		var inputSituacion= document.getElementById('inpSituacion');
		inputSituacion.value= "ACTIVO"
	} else {
		var inputSituacion= document.getElementById('inpSituacion');
		inputSituacion.value = "INACTIVO"
	}

}

// FIN llenar los datos de control

//Guardar el valor del Input Nivel y lo convierte en mayúsculas
var nivelInput = document.getElementById('id_nivel');
const mensjEscribiendo = document.getElementById('mensajeEscribiendo');


function convertirMayusculas() {
	nivelInput.value = nivelInput.value.toUpperCase();
}

nivelInput.addEventListener('input', function () {
	if (this.value.trim() !== '') {
		// Si el campo no está vacío, muestra el mensaje encima del campo
		mensjEscribiendo.style.display = 'block';
		posicionaMensaje();
	} else {
		// Si el campo está vacío, oculta el mensaje
		mensjEscribiendo.style.display = 'none';
	}
});

//Función que permite unicamente escribir carácteres alfanúmericos, y denegar carácteres especiales
function validarInput(input) {
    input.addEventListener('keydown', function(event) {

		
		input.value = input.value.toUpperCase();
        // Código ASCII de las teclas permitidas: letras, números y espacios
        var allowedKeys = /^[a-zA-Z0-9\s]*$/;
        // Permite las teclas de control como Enter, Tab, Flechas, etc.
        var allowedControlKeys = [8, 9, 13, 16, 17, 18, 20, 27, 32, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46];

        // Verifica si la tecla presionada es una tecla de control
        if (allowedControlKeys.includes(event.keyCode)) {
            return; // Permite las teclas de control
        }

        // Verifica si el carácter ingresado es permitido
        if (!allowedKeys.test(event.key)) {
            event.preventDefault(); // Cancela la pulsación de tecla
            // alert("¡No se permiten caracteres especiales!");
			swal({
				title: '¡No se permiten caracteres especiales!',
				icon: 'error',
				button: 'Aceptar',
	
			});

        }
    });
}

validarInput(id_nivel);

// Función para validar los campos de nivel, zona, situacion

document.getElementById("botonActualizar").addEventListener("click", function () {

 
	const nivelInput = document.getElementById('id_nivel');
	const nivel = nivelInput.value.trim();
	if (nivel === '') {
		nivelInput.classList.add('input-invalid');

		swal({
			title: 'El campo nivel no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});
		
		return;

	} else {
		nivelInput.classList.remove('input-invalid');
	}

	const zonaInput = document.getElementById('select_zona');
	const zona = zonaInput.value.trim();
	if (zona === '') {
		zonaInput.classList.add('input-invalid');

		swal({
			title: 'El campo zona no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});
		
		return;

	} else {

		zonaInput.classList.remove('input-invalid');


	}

	const situacionInput = document.getElementById('select_situacion');
	const situacion = situacionInput.value.trim();
	if (situacion === '') {
		situacionInput.classList.add('input-invalid');

		swal({
			title: 'El campo situación no puede estar vacío',
			icon: 'error',
			button: 'Aceptar',

		});
		
		return;

	} else {
		situacionInput.classList.remove('input-invalid');
	}

	//Inicializa funcion datos control
	datosControl1();
	datosControl();
	
	const inicio = document.getElementById('inpFechaInicio').value;
	const fechamod = document.getElementById('inpFechaModificacion').value;
	const usumod = sessionStorage.idUsuario;
	
	if (situacion == 2) {
		var fechatermino = new Date().toISOString().split('T')[0];
		const nuevoPuesto = {
			nvl_id: data_id,
			nvl_nivel: nivel,
			nvl_zona: zona,
			nvl_situacion: situacion,
			nvl_fechatermino: fechatermino,
			nvl_fechamod: fechamod,
			nvl_usumodifico: usumod,
		};

		//console.log(nuevoPuesto);

	swal({
		title: '¿Estás seguro de registrar este puesto?',
		text: 'Una vez registrado, no podrás deshacer esta acción',
		icon: 'warning',
		buttons: ['Cancelar', 'Aceptar'],
		dangerMode: true,
	}).then((willRegister) => {
		if (willRegister) {
			fetch('api/nivel/actualizar', {
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
				//console.log(data);
				if (data === true) {
					swal("¡Puesto registrado exitosamente!", {
						icon: "success",
					});
					limpiarInputs();
					DeshabilitarBotones();
				} else {
					detallesPuesto += `Descripción: ${puestoData[0].ctgp_descripcion}\n`;


							swal({
								title: "¡Error al registrar el puesto!",
								text: `El código ya existe. Detalles del puesto:\n${detallesPuesto}`,
								icon: "error",
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
		
	} else {
		var fechainicio = new Date().toISOString().split('T')[0];

			const nuevoPuesto = {
			nvl_id: data_id,
			nvl_nivel: nivel,
			nvl_zona: zona,
			nvl_situacion: situacion,
			nvl_fechainicio: fechainicio,
			nvl_fechamod: fechamod,
			nvl_usumodifico: usumod,
		};

		//console.log(nuevoPuesto);
		swal({
			title: '¿Estás seguro de registrar este puesto?',
			text: 'Una vez registrado, no podrás deshacer esta acción',
			icon: 'warning',
			buttons: ['Cancelar', 'Aceptar'],
			dangerMode: true,
		}).then((willRegister) => {
			if (willRegister) {
				fetch('api/nivel/actualizar', {
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
					//console.log(data);
					if (data === true) {
						swal("¡Puesto registrado exitosamente!", {
							icon: "success",
						});
						limpiarInputs();
						DeshabilitarBotones();
					} else {
					
								swal({
									title: "¡Error al registrar el puesto!",
									text: `El código ya existe. Detalles del puesto:\n${detallesPuesto}`,
									icon: "error",
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
	}
});