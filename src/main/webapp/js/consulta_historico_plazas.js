var ID_PERSONA = "";
var PER_NOMBRE = "";
var PER_CURP = "";
var SITUACION = "";

// INICIO autocomplete para Persona
async function autocompletarPersona() {
    const request = await fetch('api/empleado/conSituacion', {
	//const request = await fetch('api/persona/consulta/datosXGerencia', {
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
            id_persona: item[0], // Suponiendo que el ID está en la primera posición
            per_curp: item[1].split(';'),
            per_nombre: item[2] + ' ' + item[3] + ' ' +item[4],
			per_situacion: item[5]
        };
        objetosDatos.push(objeto);
    }
	
    return objetosDatos;
}

autocompletarPersona().then(resultados => {
    // Aquí puedes hacer algo con los resultados si es necesario
});

async function iniciarAutoComplete() {
    const resultados = await autocompletarPersona();
    const autoCompleteInput = document.getElementById('autoCompletePersona');

    // Crear un array de cadenas combinadas de CURP y nombre
    const combinedValues = resultados.map(resultado => ({
        displayValue: `${resultado.per_curp} - ${resultado.per_nombre} ` ,
        id_persona: resultado.id_persona,
		per_nombre: resultado.per_nombre,
		per_curp: resultado.per_curp,
		per_situacion: resultado.per_situacion
    }));

    const autoCompleteJS = new autoComplete({
        selector: "#autoCompletePersona",
        placeHolder: "Buscar por CURP o Nombre...",
        data: {
            src: combinedValues, // Usar el array combinado
            keys: ["displayValue"], // Especificar la propiedad a usar para las sugerencias
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
                    autoCompleteInput.value = selection.displayValue;
                    // console.log('ID Persona:', selection.id_persona);
					//console.log(selection.per_nombre);
					const nombrecompleto = selection.per_nombre;
					//console.log(nombrecompleto);
					ID_PERSONA = selection.id_persona;
					PER_NOMBRE = nombrecompleto;
					PER_CURP = selection.per_curp;
					SITUACION = selection.per_situacion;
                }
            }
        }
    });
}

// Llamar a la función para inicializar el autocomplete
iniciarAutoComplete();
// FIN autocomplete para Persona


// INICIO autocomplete para Numplaza

async function autocompletarNumPlaza() {
	const request = await fetch('api/numero_plaza/numerosPlaza', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});
	const data = await request.json();

	return data;
}

autocompletarNumPlaza().then(resultados => {

});


async function iniciarAutoCompleteNumPlaza() {
	const resultados = await autocompletarNumPlaza();
	const autoCompleteInput = document.getElementById('autoCompletePlaza');

	const autoCompleteJS = new autoComplete({
		selector: "#autoCompletePlaza",
		placeHolder: "Buscar por Número de Plaza",
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

iniciarAutoCompleteNumPlaza();

// FIN autocomplete para Numplaza

//INICIO funcion para llenar los inputs rapidamente
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
	}
}
//FIN funcion para llenar los inputs rapidamente

// INICIO funcion para limpiar los campos

function limpiarCampos() {
	location.reload()
}

// FIN funcion para limpiar los campos

//INICIO funcion para limpiar tablas

function limpiarTabla() {
	// Referencia a la tabla
	var tabla = document
	  .getElementById("Datostabla1")
	  .getElementsByTagName("tbody")[0];
  
	// Limpiar la tabla eliminando todas las filas
	tabla.innerHTML = "";
	
	let inputs = ['num_plazaPlaza','plaza_padrePlaza', 'descripcion_unidad', 'unidadPlaza', 'clave_centro_distPlaza', 'centro_distPlaza',
		'clave_centro_trabajoPlaza', 'centro_trabajoPlaza', 'codigo_puestoPlaza', 'descripcion_puestoPlaza', 'tipoPlaza', 'zonaPlaza', 'nivelPlaza', 
		'contratacionPlaza', 'categoriaPlaza'
	];
	inputs.forEach(element => {
		limpiar = document.getElementById(element);
		limpiar.value="";
	});
	var numPlaza = document.getElementById("autoCompletePlaza");
	var botonPlaza = document.getElementById("botonplaza");
	numPlaza.disabled=false;
	botonPlaza.disabled = false; 

  }
//FIN funcion para limpiar tablas

//INICIO funcion para limpiar tablas de DATOS DE PLAZAS POR PERSONA

function limpiarTabla2() {
	// Referencia a la tabla
	var tabla = document
	  .getElementById("Datostabla2")
	  .getElementsByTagName("tbody")[0];
  
	// Limpiar la tabla eliminando todas las filas
	tabla.innerHTML = "";
	
	let inputs = ['autoCompletePersona', 'id_curp', 'nombrePersona', 'no_empleado', 'situacion_empleadoPersona', 
	];
	inputs.forEach(element => {
		limpiar = document.getElementById(element);
		limpiar.value="";
	}); 

  }
//FIN funcion para limpiar tablas



//INICIO accion a la hora de apretar el boton de buscar persona

//function obtenerInfoPersona(id_persona, per_nombre, per_curp, situacion){
async function obtenerInfoPersona(){
	if (document.getElementById('autoCompletePersona').value == "") {
		swal({
			title: 'Por favor, ingrese y seleccione un curp o nombre valido.',
			icon: 'error',
			button: 'Aceptar'
		});
	} else {
		limpiarTabla2();

		var id_persona = ID_PERSONA;
		var per_nombre = PER_NOMBRE;
		var per_curp = PER_CURP;
		var situacion = SITUACION;

			try {
				//Llamada a la api de los datos de plaza usando el numero de plza
				const request = await fetch("api/consulta/HistoricoPlazasPorPersona/" + id_persona, {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					}
				});
		
				const datosPersona = await request.json();

				if (datosPersona.length != 0) {
					const num_plaza=datosPersona[0][5];
					//console.log(num_plaza);
					let numeros_de_plaza = [];
					for (let i = 0; i < datosPersona.length; i++) {
						numeros_de_plaza[i] = datosPersona[i][5];
						
					}
					//console.log(numeros_de_plaza);
			
					if (id_persona === 0) {
						swal({
							title: 'Por favor, ingrese y seleccione un curp o nombre valido.',
							icon: 'error',
							button: 'Aceptar'
						});
						return;
					}

					//Llamada a la api de los datos de empleado
					const request4 = await fetch("api/consulta/datosEmpleado/" + id_persona, {
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						}
					});
			
					const datosEmpleado = await request4.json();
					//console.log(datosEmpleado[0][31]);
					const no_empleado = datosEmpleado[0][16];
					//const situacion = datosEmpleado[0][31];



					let datos_de_las_plazas = [];

					for (let i = 0; i < numeros_de_plaza.length; i++) {
						
						//Llamada a la api de los datos de plaza usando el numero de plza
						const request3 = await fetch("api/consulta/HistoricoPlaza/" + numeros_de_plaza[i], {
							method: "GET",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							}
						});
						const datosPlaza = await request3.json();

						datos_de_las_plazas[i] = datosPlaza;
					};
					//console.log(datos_de_las_plazas);
					
					let puestos_ids = [];
					for (let i = 0; i < datos_de_las_plazas.length; i++) {
						puestos_ids[i] = datos_de_las_plazas[i][0][12];
						
					}

					//const puesto_id=datos_de_las_plazas[0][0][12];
					//console.log(puestos_ids);


					let datos_de_los_puestos = [];

					for (let i = 0; i < puestos_ids.length; i++) {
						
						//Llamada a la api Obtener datos de puesto recibiendo como parametro un id del puesto
						const request2 = await fetch("api/consulta/HistoricoPuesto/" + puestos_ids[i], {
							method: "GET",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							}
						});
						
						const datosPuesto = await request2.json();
						datos_de_los_puestos[i] = datosPuesto;
						
					}
					
					//console.log(datos_de_los_puestos);
					//limpiarTabla();
					var inputbuscar = document.getElementById("autoCompletePersona");
							
					// Limpiar la tabla eliminando todas las filas
					inputbuscar.value = "";
					

					llenardatosPersona(datosPersona,per_nombre,datos_de_los_puestos[0],situacion, per_curp, no_empleado);

					// Referencia a la tabla
					var tabla = document
					.getElementById("Datostabla2")
					.getElementsByTagName("tbody")[0];

					// Limpiar la tabla eliminando todas las filas
					tabla.innerHTML = "";
					//console.log(datos_de_los_puestos.length);
					llenartablaPlazasPorPersona(datosPersona,datos_de_los_puestos);
					
				} else {
					try {
						//Llamada a la api de los datos de plaza usando el numero de plza
						const request = await fetch("api/consulta/ActualPlazasPorPersona/" + id_persona, {
							method: "GET",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							}
						});
			
					const datosPersona = await request.json();
					//console.log(datosPersona);
					//const num_plaza=datosPersona[0][5];
					//console.log(num_plaza);
					let numeros_de_plaza = [];
					for (let i = 0; i < datosPersona.length; i++) {
						numeros_de_plaza[i] = datosPersona[i][5];
						
					}
					//console.log(numeros_de_plaza);
			
			
					if (id_persona === 0) {
						swal({
							title: 'Por favor, ingrese y seleccione un curp o nombre valido.',
							icon: 'error',
							button: 'Aceptar'
						});
						return;
					}
		
					//Llamada a la api de los datos de empleado
					const request4 = await fetch("api/consulta/datosEmpleado/" + id_persona, {
						method: "GET",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						}
					});
			
					const datosEmpleado = await request4.json();
					//console.log(datosEmpleado[0][31]);
					const no_empleado = datosEmpleado[0][16];
					//const situacion = datosEmpleado[0][31];
		
		
		
					let datos_de_las_plazas = [];
		
					for (let i = 0; i < numeros_de_plaza.length; i++) {
						
						//Llamada a la api de los datos de plaza usando el numero de plza
						const request3 = await fetch("api/consulta/HistoricoPlaza/" + numeros_de_plaza[i], {
							method: "GET",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							}
						});
						const datosPlaza = await request3.json();
		
						datos_de_las_plazas[i] = datosPlaza;
					};
					//console.log(datos_de_las_plazas);
					
					let puestos_ids = [];
					for (let i = 0; i < datos_de_las_plazas.length; i++) {
						puestos_ids[i] = datos_de_las_plazas[i][0][12];
						
					}
		
					//const puesto_id=datos_de_las_plazas[0][0][12];
					//console.log(puestos_ids);
		
		
					let datos_de_los_puestos = [];
		
					for (let i = 0; i < puestos_ids.length; i++) {
						
						//Llamada a la api Obtener datos de puesto recibiendo como parametro un id del puesto
						const request2 = await fetch("api/consulta/HistoricoPuesto/" + puestos_ids[i], {
							method: "GET",
							headers: {
								Accept: "application/json",
								"Content-Type": "application/json",
							}
						});
						
						const datosPuesto = await request2.json();
						datos_de_los_puestos[i] = datosPuesto;
						
					}
					
					//console.log(datos_de_los_puestos);
					//limpiarTabla();
					var inputbuscar = document.getElementById("autoCompletePersona");
							
					// Limpiar la tabla eliminando todas las filas
					inputbuscar.value = "";
					
		
					llenardatosPersona(datosPersona,per_nombre,datos_de_los_puestos[0],situacion, per_curp, no_empleado);
		
					//console.log(datosPersona);
					//console.log(datos_de_los_puestos);
					llenartablaPlazasPorPersona(datosPersona,datos_de_los_puestos);
		
					//llenardatosPersona(datosPersona,per_nombre[0],datos_de_los_puestos[0],situacion);
						
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
	
}

//FIN accion a la hora de apretar el boton de buscar persona

//INICIO funcion para llenar los campos de plazas
async function llenardatosPersona(datosPersona,nombre,datosPuesto,situacion,curp, no_empleado){
	agregarValorAlInput("id_curp", curp)
	agregarValorAlInput("no_empleado", no_empleado)
    agregarValorAlInput("nombrePersona", nombre);
	//console.log(situacion);
	if(situacion==1){
		agregarValorAlInput("situacion_empleadoPersona", 'ACTIVO');
	} else {
		agregarValorAlInput("situacion_empleadoPersona", 'INACTIVO');
	}
    
    agregarValorAlInput("num_plazaPersona", datosPersona[0][5]);
    agregarValorAlInput("plaza_padrePersona", datosPersona[0][6]);
    agregarValorAlInput("unidadPersona", datosPersona[0][9]);
    agregarValorAlInput("centro_distPersona", datosPersona[0][12]);
    agregarValorAlInput("centro_trabajoPersona", datosPersona[0][15]);
    agregarValorAlInput("codigo_puestoPersona", datosPuesto[0][2]);
    agregarValorAlInput("descripcion_puestoPersona", datosPuesto[0][3]);
    agregarValorAlInput("tipoPersona", datosPuesto[0][5]);
    agregarValorAlInput("zonaPersona", datosPuesto[0][7]);
    agregarValorAlInput("nivelPersona", datosPuesto[0][9]);
	agregarValorAlInput("contratacionPersona", datosPuesto[0][11]);
	agregarValorAlInput("categoriaPersona", datosPuesto[0][13]);

}

//FIN funcion para llenar los campos de plazas

//INICIO para llenar la tabla PlazasPersona de todas las plazas que ha tenido cierta persona

async function llenartablaPlazasPorPersona(datospersona,datosPuesto) {
	//console.log(datospersona);
	//console.log(datosPuesto);

  	  // Referencia a la tabla
	  var tabla3 = document
		.getElementById("Datostabla2")
		.getElementsByTagName("tbody")[0];
	  
	 for (let i = 0; i < datospersona.length; i++) {
		// Crear una nueva fila para cada nombre de la tabla de nomina
		var fila = tabla3.insertRow();
  
		// Insertar celdas en la fila para cada atributo de la nomina
		//var celdaId = fila.insertCell(0);
		var celdaInicio = fila.insertCell(0);
		var celdaTermino = fila.insertCell(1);
		var celdaNumPlaza = fila.insertCell(2);
		var celdaPlazaPadre = fila.insertCell(3);
		var celdaCodigo = fila.insertCell(4);
		var celdaDescripcion = fila.insertCell(5);
		var celdaTipo = fila.insertCell(6);
		var celdaZona = fila.insertCell(7);
		var celdaNivel = fila.insertCell(8);
		var celdaContratacion = fila.insertCell(9);
		var celdaCategoria = fila.insertCell(10);
		var celdaUnidad = fila.insertCell(11);
		var celdaDistribucion = fila.insertCell(12);
		var celdaTrabajo = fila.insertCell(13);
		
		celdaInicio.innerHTML = datospersona[i][3];
		celdaTermino.innerHTML = datospersona[i][4];
		celdaNumPlaza.innerHTML = datospersona[i][5];
		celdaPlazaPadre.innerHTML = datospersona[i][6];
		celdaCodigo.innerHTML = datosPuesto[i][0][2];
		celdaDescripcion.innerHTML = datosPuesto[i][0][3];
		celdaTipo.innerHTML = datosPuesto[i][0][5];
		celdaZona.innerHTML = datosPuesto[i][0][7];
		celdaNivel.innerHTML = datosPuesto[i][0][9];
		celdaContratacion.innerHTML = datosPuesto[i][0][11];
		celdaCategoria.innerHTML = datosPuesto[i][0][13];
		celdaUnidad.innerHTML = datospersona[i][9];
		celdaDistribucion.innerHTML = datospersona[i][12];
		celdaTrabajo.innerHTML = datospersona[i][15];

	  }
  }

////////////////////////////////////////////////  PLAZA   ///////////////////////////////////////////////////////////////////////////////////////

//INICIO accion a la hora de apretar el boton de buscar plaza
var botonPlaza = document.getElementById("botonplaza");

botonPlaza.addEventListener("click", async function() {

	var numPlaza = document.getElementById("autoCompletePlaza");
	var valor = numPlaza.value;

	if (valor == "") {
		swal({
			title: 'Por favor, ingrese y seleccione un número de plaza valido.',
			icon: 'error',
			button: 'Aceptar'
		});
	} else {
		//Llamada a la api de los datos de plaza usando el numero de plza
		const request = await fetch("api/consulta/HistoricoPlaza/" + valor, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			}
		});

		const datosPlaza = await request.json();
		const puesto_id=datosPlaza[0][0];
		limpiarTabla();
		obtenerInfoPlaza(valor);
		llenartablaPersonasPorPlaza(puesto_id);
		//agregarValorAlInput("numeroPlaza", valor);
		numPlaza.value = "";
	}

});
//FIN accion a la hora de apretar el boton de buscar plaza

//INICIO funcion para la informacion de la plaza
async function obtenerInfoPlaza(numplaza){
    try {
        //Llamada a la api de los datos de plaza usando el numero de plza
        const request = await fetch("api/consulta/HistoricoPlaza/" + numplaza, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        const datosPlaza = await request.json();
        //console.log(datosPlaza);

        if (numplaza === 0) {
            swal({
                title: 'Por favor, ingrese un número de plaza valido.',
                icon: 'error',
                button: 'Aceptar'
            });
            return;
        }

        const puesto_id=datosPlaza[0][12];
        //Llamada a la api Obtener datos de puesto recibiendo como parametro un id del puesto
        const request2 = await fetch("api/consulta/HistoricoPuesto/" + puesto_id, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });

        const datosPuesto = await request2.json();

        llenardatosPlaza(datosPlaza,datosPuesto);

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

//FIN funcion para la informacion de la plaza

//INICIO funcion para llenar los campos de plazas
async function llenardatosPlaza(numplaza,numpuesto){
    agregarValorAlInput("num_plazaPlaza", numplaza[0][1]);
    agregarValorAlInput("plaza_padrePlaza", numplaza[0][2]);
	agregarValorAlInput("descripcion_unidad", numplaza[0][4])
    agregarValorAlInput("unidadPlaza", numplaza[0][5]);
	agregarValorAlInput("clave_centro_distPlaza", numplaza[0][7]);
    agregarValorAlInput("centro_distPlaza", numplaza[0][8]);
	agregarValorAlInput("clave_centro_trabajoPlaza", numplaza[0][10]);
    agregarValorAlInput("centro_trabajoPlaza", numplaza[0][11]);
    agregarValorAlInput("codigo_puestoPlaza", numpuesto[0][2]);
    agregarValorAlInput("descripcion_puestoPlaza", numpuesto[0][3]);
    agregarValorAlInput("tipoPlaza", numpuesto[0][5]);
    agregarValorAlInput("zonaPlaza", numpuesto[0][7]);
    agregarValorAlInput("nivelPlaza", numpuesto[0][9]);
    agregarValorAlInput("contratacionPlaza", numpuesto[0][11]);
    agregarValorAlInput("categoriaPlaza", numpuesto[0][13]);

}

//FIN funcion para llenar los campos de plazas

//INICIO para llenar la tabla PersonasPlaza de personas que han tenido cierta plaza

async function llenartablaPersonasPorPlaza(numplaza) {
	try {
	  const request = await fetch("api/consulta/HistoricoPersonaPlaza/" + numplaza, {
		method: "GET",
		headers: {
		  Accept: "application/json",
		  "Content-Type": "application/json",
		},
	  });
  
	  const datospersonasporplaza = await request.json();
	  if (datospersonasporplaza != '') {
			// Referencia a la tabla
			var tabla2 = document
			.getElementById("Datostabla1")
			.getElementsByTagName("tbody")[0];
		
		for (let i = 0; i < datospersonasporplaza.length; i++) {
			// Crear una nueva fila para cada nombre de la tabla de nomina
			var fila = tabla2.insertRow();
	
			// Insertar celdas en la fila para cada atributo de la nomina
			//var celdaId = fila.insertCell(0);
			var celdaInicio = fila.insertCell(0);
			var celdaTermino = fila.insertCell(1);
			var celdaNombre = fila.insertCell(2);
			var celdaApellidoPaterno = fila.insertCell(3);
			var celdaApellidoMaterno = fila.insertCell(4);
			var CURP = fila.insertCell(5);
			var NO_EMPLEADO = fila.insertCell(6);
			
			//tabla2.rows[i].cells[0].classList.toggle('oculto');
			//celdaId.innerHTML = nominasoperando[i][0]//`<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][0]}" disabled style="visibility: hidden; />`; // Incremento el índice en 1 para empezar desde 1 en lugar de 0
			celdaInicio.innerHTML = datospersonasporplaza[i][8];
			//celdaTermino.innerHTML = datospersonasporplaza[i][9];
			celdaNombre.innerHTML = datospersonasporplaza[i][4];
			celdaApellidoPaterno.innerHTML = datospersonasporplaza[i][5];
			celdaApellidoMaterno.innerHTML = datospersonasporplaza[i][6];
			CURP.innerHTML = datospersonasporplaza[i][3];
			NO_EMPLEADO.innerHTML = datospersonasporplaza[i][7];

			
			if (datospersonasporplaza[i][9] == undefined) {
			celdaTermino.innerHTML = "";
			} else {
			celdaTermino.innerHTML = datospersonasporplaza[i][9];
			}
		}
	  }else{
		const request = await fetch("api/consulta/ActualPersonaPlaza/" + numplaza, {
			method: "GET",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			},
		  });
	  
		  const datospersonasporplaza = await request.json();
		  //console.log(datospersonasporplaza)
		  // Referencia a la tabla
		  var tabla2 = document
			.getElementById("Datostabla1")
			.getElementsByTagName("tbody")[0];
		  
		  for (let i = 0; i < datospersonasporplaza.length; i++) {
			// Crear una nueva fila para cada nombre de la tabla de nomina
			var fila = tabla2.insertRow();
	  
			// Insertar celdas en la fila para cada atributo de la nomina
			//var celdaId = fila.insertCell(0);
			var celdaInicio = fila.insertCell(0);
			var celdaTermino = fila.insertCell(1);
			var celdaNombre = fila.insertCell(2);
			var celdaApellidoPaterno = fila.insertCell(3);
			var celdaApellidoMaterno = fila.insertCell(4);
			var CURP = fila.insertCell(5);
			var NO_EMPLEADO = fila.insertCell(6);
			
			//tabla2.rows[i].cells[0].classList.toggle('oculto');
			//celdaId.innerHTML = nominasoperando[i][0]//`<input class="form-check-input" type="radio" name="seleccion" value="${nominasoperando[i][0]}" disabled style="visibility: hidden; />`; // Incremento el índice en 1 para empezar desde 1 en lugar de 0
			celdaInicio.innerHTML = datospersonasporplaza[i][8];
			//celdaTermino.innerHTML = datospersonasporplaza[i][9];
			celdaNombre.innerHTML = datospersonasporplaza[i][4];
			celdaApellidoPaterno.innerHTML = datospersonasporplaza[i][5];
			celdaApellidoMaterno.innerHTML = datospersonasporplaza[i][6];
			CURP.innerHTML = datospersonasporplaza[i][3];
			NO_EMPLEADO.innerHTML = datospersonasporplaza[i][7];
			
			if (datospersonasporplaza[i][9] == undefined) {
			  celdaTermino.innerHTML = "";
			} else {
			  celdaTermino.innerHTML = datospersonasporplaza[i][9];
			}
		  }
	  }
	  
	} catch (error) {

	}
  }

//FIN para llenar la tabla PersonasPlaza de personas que han tenido cierta plaza
