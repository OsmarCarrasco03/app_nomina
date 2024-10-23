
// Variables globales
const searchInput = document.getElementById('autoComplete'); // Servicio

let estadoIdGlobal = ''; // Servicio
let municipioIdGlobal = ''; // Servicio

let ctraIdGlobal = ''; // Servicio
let cdisIdGlobal = ''; // Servicio

/*AQUI EMPIEZA LA FUNCION PARA GENERAR LA BUSQUEDA Y COLOCAR LOS DATOS EN LOS INPUTS*/
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
			src: combinedValues,
			cache: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				query: (query, autoCompleteJS) => {
					if (query.length >= 3) {
						autoCompleteJS.start();
					} else {
						autoCompleteJS.stop();
					}
				},
				selection: (event) => {
					const selection = event.detail.selection.value;
					autoCompleteInput.value = selection;
					searchInput.disabled = true;// servicio
				}
			}
		}
	});
}
iniciarAutoComplete();
/*AQUI ESTA EL BUSCADOR DE DATOS */

//AQUI TERMINA LA PARTE EN DONDE BUSCA Y TE DA UN LISTADO  DE TODO LO QUE ESTA GENERADO DE LA BASE DE DATOS
//EMPEZAMOS CON ASIGNAR LOS VALORES A LOS INPUT DESHABILITANDOLOS
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

	let datos = {};
	datos.per_curp = query.split("-")[0].trim();

	const request = await fetch('api/persona/consulta/datosXGerencia', {  //QUERY DONDE ME TRAE TODOS MIS DATOS SELECCIONADOS
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});


	
	const personas = await request.json();
console.log(datos);
	const personaObjeto = {};
	for (let i = 0; i < personas[0].length; i++) {
		personaObjeto[`campo${i + 1}`] = personas[0][i];
	}

	const camposSelect = [
		'#genero', '#estadocivil', '#nacionalidad', '#estado', '#municipio',
		'#contratacion', '#regimen', '#fechabaja', '#situacion' // Agrega todos los campos <select> que deseas deshabilitar
	];
	console.log(personaObjeto);
	camposSelect.forEach(function(campo) {
		$(campo).prop('disabled', true);
	});

	const partesNombres = personaObjeto.campo5.split(' ');

	// Si hay más de un nombre, asignar el segundo nombre y los siguientes
	if (partesNombres.length > 1) {
		const segundoNombre = partesNombres.slice(2).join(' ');
		asignarValorYDeshabilitarCampo('nombre', segundoNombre);
	} else {
		// Si solo hay un nombre o ninguno, asignar una cadena vacía
		asignarValorYDeshabilitarCampo('nombre', '');
	}

	asignarValorYDeshabilitarCampo('id', personaObjeto.campo1);
	asignarValorYDeshabilitarCampo('apellidopaterno', personaObjeto.campo5.split(' ')[0]);
	asignarValorYDeshabilitarCampo('apellidomaterno', personaObjeto.campo5.split(' ')[1]);
	asignarValorYDeshabilitarCampo('curp2', personaObjeto.campo2);
	asignarValorYDeshabilitarCampo('rfc', personaObjeto.campo3);
    asignarValorYDeshabilitarCampo('homoclave', personaObjeto.campo4);
	asignarValorYDeshabilitarCampo('generoid', personaObjeto.campo6);
    $('#genero').empty();
	$('#genero').append('<option value="' + personaObjeto.campo7 + '">' + personaObjeto.campo7 + '</option>');
	asignarValorYDeshabilitarCampo('edocivilid', personaObjeto.campo9);
	$('#estadocivil').empty();
	$('#estadocivil').append('<option value="' + personaObjeto.campo10 + '">' + personaObjeto.campo10 + '</option>');
	asignarValorYDeshabilitarCampo('nacionalidadid', personaObjeto.campo14);
	$('#nacionalidad').empty();
	$('#nacionalidad').append('<option value="' + personaObjeto.campo15 + '">' + personaObjeto.campo15 + '</option>');
	asignarValorYDeshabilitarCampo('estadoid', personaObjeto.campo16);
	$('#estado').empty();
	$('#estado').append('<option value="' + personaObjeto.campo17 + '">' + personaObjeto.campo17 + '</option>');
	asignarValorYDeshabilitarCampo('municipioid', personaObjeto.campo18);
	$('#municipio').empty();

	// Verificar si personaObjeto.campo21 no es nulo ni está vacío
	if (personaObjeto.campo19 !== null && personaObjeto.campo19.trim() !== '') {
		$('#municipio').append('<option value="' + personaObjeto.campo19 + '">' + personaObjeto.campo19 + '</option>');
	}
	asignarValorYDeshabilitarCampo('empleado', personaObjeto.campo26);
	asignarValorYDeshabilitarCampo('seguridadsocial', personaObjeto.campo8);
	asignarValorYDeshabilitarCampo('regimenid', personaObjeto.campo27);
	asignarValorYDeshabilitarCampo('regimen', personaObjeto.campo28);
   $('#regimen').empty();
	$('#regimen').append('<option value="' + personaObjeto.campo28 + '">' + personaObjeto.campo28 + '</option>');
	asignarValorYDeshabilitarCampo('situacion', personaObjeto.campo39);
	$('#situacion').empty();
	$('#situacion').append('<option value="' + personaObjeto.campo39 + '">' + personaObjeto.campo39 + '</option>');
	asignarValorYDeshabilitarCampo('situacionid', personaObjeto.campo38);
	asignarValorYDeshabilitarCampo('idfonacot', personaObjeto.campo29);

		asignarValorYDeshabilitarCampo('fechainicioUno', personaObjeto.campo31);
		asignarValorYDeshabilitarCampo('fechaTermino', personaObjeto.campo32);
		asignarValorYDeshabilitarCampo('usuCapturo', personaObjeto.campo34);
		asignarValorYDeshabilitarCampo('fechaCaptura', personaObjeto.campo35);
	
		asignarValorYDeshabilitarCampo('usuModifico', personaObjeto.campo37);
		asignarValorYDeshabilitarCampo('fechaingreso', personaObjeto.campo11);
		asignarValorYDeshabilitarCampo('fechaingresosp', personaObjeto.campo12);
	    asignarValorYDeshabilitarCampo('fechabaja', personaObjeto.campo13);
	
		asignarValorYDeshabilitarCampo('situacion', personaObjeto.campo39);
        asignarValorYDeshabilitarCampo('cpfiscal', personaObjeto.campo25);
		asignarValorYDeshabilitarCampo('fechauno', personaObjeto.campo24);

	    asignarValorYDeshabilitarCampo('correo', personaObjeto.campo42);


	    asignarValorYDeshabilitarCampo('clavediscap', personaObjeto.campo41);

	    asignarValorYDeshabilitarCampo('clavelenguajes', personaObjeto.campo21);

	    asignarValorYDeshabilitarCampo('claveescolaridad', personaObjeto.campo23);



		asignarValorYDeshabilitarCampo('lenguajes', personaObjeto.campo20);
		$('#lenguajes').empty();
		if (personaObjeto.campo20 !== null) {
			$('#lenguajes').append('<option value="' + personaObjeto.campo20 + '">' + personaObjeto.campo20 + '</option>');
		}


		asignarValorYDeshabilitarCampo('discapacidadesBien', personaObjeto.campo40);
		$('#discapacidadesBien').empty();
		if (personaObjeto.campo40 !== null) {
			$('#discapacidadesBien').append('<option value="' + personaObjeto.campo40 + '">' + personaObjeto.campo40 + '</option>');
		}



		asignarValorYDeshabilitarCampo('escolaridad', personaObjeto.campo22);
		$('#escolaridad').empty();
		if (personaObjeto.campo22 !== null) {
			$('#escolaridad').append('<option value="' + personaObjeto.campo22 + '">' + personaObjeto.campo22 + '</option>');
		}

		


		
		


	
	
	
	
	
	



	/*ESTA PARTE HABILITA LOS BOTONES HASTA QUE SE HAYA BUSCADO ALGO */
	$('#habilitarCampos').prop('disabled', false);
	$('#habilitarcivil').prop('disabled', false);
	$('#botonModificar').prop('disabled', false);
	$('#botonModificarComple').prop('disabled', false);
	$('#habilitarNombre').prop('disabled', false);
	$('#habilitarApellidoPaterno').prop('disabled', false);
	$('#habilitarApellidoMaterno').prop('disabled', false);
	$('#habilitarCurp').prop('disabled', false);
	$('#habilitarHomoclave').prop('disabled', false);
	$('#habilitarSeguridad').prop('disabled', false);
	$('#habilitarEst').prop('disabled', false);
	$('#habilitarMun').prop('disabled', false);
	$('#habilitarOrigen1').prop('disabled', false);
	$('#habilitarorigen1').prop('disabled', false);
	$('#habilitarcontra').prop('disabled', false);
	$('#habilitarNac').prop('disabled', false);
	$('#habilitarEmpleado').prop('disabled', false);
	$('#habilitarIdus').prop('disabled', false);
	$('#habilitarOrigen2').prop('disabled', false);
	$('#habilitarorigen2').prop('disabled', false);
	$('#habilitarreg').prop('disabled', false);
	$('#habilitarFechaingreso').prop('disabled', false);
	$('#habilitarsit').prop('disabled', false);
	$('#habilitarFon').prop('disabled', false);
	$('#habilitaremp').prop('disabled', false);
	$('#habilitarDiscapacidades').prop('disabled', false);
	$('#habilitarLenguajes').prop('disabled', false);
	$('#habilitarEscolaridad').prop('disabled', false);
	$('#habilitarFecha_nacimiento').prop('disabled', false);
	$('#habilitarCorreo').prop('disabled', false);
	$('#habilitarCpf').prop('disabled', false);
	
	
	$('#autoCompletenone').prop('disabled', false);
	
	$('#especificactra').prop('disabled', false);
	$('#habilitaremp').prop('disabled', false);
	
	$('#especificacdis').prop('disabled', false);
	$('#autoCompleteuno').prop('disabled', false);


	
	/*ESTA PARTE HABILITA LOS BOTONES HASTA QUE SE HAYA BUSCADO ALGO */


    // INICIO guardado del ID de estado y municipio (Servicio)
	const estadoId= personaObjeto.campo16;
		estadoIdGlobal = estadoId;
		
	const municipioId = personaObjeto.campo18;
		municipioIdGlobal = municipioId;
	// FIN guardado del ID de estado y municipio (Servicio)
		
	$("#btnBuscar").prop("disabled", true); // Desabilitar el boton de buscar (Servicio)
	$("#habilitarBusqueda").prop("disabled", false); // Habilitar el boton de Habilitar buscar (Servicio)
	
}


/******************************************PRIMER MÓDULO DE  DATOS GENERALES *********************************/


///*BOTON INDIVIDUAL PARA NOMBRE*/
//$(document).ready(function() {
//	let nombreFieldEnabled = false;
//	$('#habilitarNombre').click(function() {
//		$('#botonGuardar').prop('disabled', false);
//		if (!nombreFieldEnabled) {
//			$('#nombre').prop('disabled', false);
//			nombreFieldEnabled = true;
//		}
//	});
//});
///*BOTON INDIVIDUAL PARA NOMBRE*/
//
//
///*BOTON INDIVIDUAL PARA PATERNO*/
//$(document).ready(function() {
//	let apellidopaternoFieldEnabled = false; 
//	$('#habilitarApellidoPaterno').click(function() {
//		$('#botonGuardar').prop('disabled', false);
//		if (!apellidopaternoFieldEnabled) {
//			$('#apellidopaterno').prop('disabled', false); 
//			apellidopaternoFieldEnabled = true; 
//		}
//	});
//});
///*BOTON INDIVIDUAL PARA PATERNO*/
//
///*BOTON INDIVIDUAL PARA MATERNO*/
//$(document).ready(function() {
//	let apellidomaternoFieldEnabled = false; 
//$('#habilitarApellidoMaterno').click(function() {
//	$('#botonGuardar').prop('disabled', false);
//		
//		if (!apellidomaternoFieldEnabled) {
//			$('#apellidomaterno').prop('disabled', false);
//			apellidomaternoFieldEnabled = true; 
//		}
//	});
//});
///*BOTON INDIVIDUAL PARA MATERNO*/
//
///*BOTON INDIVIDUAL PARA CURP*/
//$(document).ready(function() {
//	let curpFieldEnabled = false; 
//    $('#habilitarCurp').click(function() {
//		$('#botonGuardar').prop('disabled', false);
//		if (!curpFieldEnabled) {
//			$('#curp2').prop('disabled', false); 
//			curpFieldEnabled = true; 
//		}
//	});
//});
///*BOTON INDIVIDUAL PARA CURP*/
//
///*BOTON INDIVIDUAL PARA HOMOLCAVE*/
//$(document).ready(function() {
//	let homoclaveFieldEnabled = false; 
//
//
//	$('#habilitarHomoclave').click(function() {
//		$('#botonGuardar').prop('disabled', false);
//		
//		if (!homoclaveFieldEnabled) {
//			$('#homoclave').prop('disabled', false); 
//			homoclaveFieldEnabled = true; 
//		}
//	});
//});
///*BOTON INDIVIDUAL PARA HOMOLCAVE*/
//
//
///*SELECT PARA EL CAMPO GENERO*/
//$(document).ready(function() {
//	let generoSelectLoaded = false;
//	let estadoCivilSelectLoaded = false;
//
//	$('#habilitarCampos').click(async function() {
//		$('#botonGuardar').prop('disabled', false);
//
//		if (!generoSelectLoaded) {
//			const request = await fetch('api/persona/Obtenergenero/', {
//				method: 'GET',
//				headers: {
//					'Accept': 'application/json',
//					'Content-Type': 'application/json'
//				},
//			});
//
//			const personas = await request.json();
//			console.log('Datos obtenidos de la API (Género):', personas);
//			const generoSelect = $('#genero');
//
//
//			generoSelect.append('<option value="" disabled>Selecciona una opción</option>');
//			personas.forEach(persona => {
//				generoSelect.append(`<option value="${persona.lper_clave}">${persona.lper_descripcion}</option>`);
//			});
//			generoSelectLoaded = true;
//		}
//		$('#genero').prop('disabled', false);
//	});
//	/*SELECT PARA EL CAMPO GENERO*/
//
//
//
//
//
//	/*SELECT PARA EL CAMPO EDOCIVIL*/
//	$('#habilitarcivil').click(async function() {
//		$('#botonGuardar').prop('disabled', false);
//
//		if (!estadoCivilSelectLoaded) {
//			const request = await fetch('api/persona/Obteneredocivil/', {
//				method: 'GET',
//				headers: {
//					'Accept': 'application/json',
//					'Content-Type': 'application/json'
//				},
//			});
//
//			const personas = await request.json();
//			console.log('Datos obtenidos de la API (Estado Civil):', personas);
//			const estadocivilSelect = $('#estadocivil');
//
//			estadocivilSelect.append('<option value="" disabled>Selecciona una opción</option>');
//			personas.forEach(persona => {
//				estadocivilSelect.append(`<option value="${persona.lper_clave}">${persona.lper_descripcion}</option>`);
//
//			});
//			estadoCivilSelectLoaded = true;
//		}
//		$('#estadocivil').prop('disabled', false);
//	});
//	/*SELECT PARA EL CAMPO EDOCIVIL*/
//
//
//	/*BOTON QUE ACTIVA TODOS MIS CAMPOS INCICIALIZANDO LAS API'S*/
//	$('#botonModificar').click(function() {
//
//		$('#habilitarCampos').click();
//		$('#habilitarcivil').click();
//		$('#nombre').prop('disabled', false);
//		$('#apellidopaterno').prop('disabled', false);
//		$('#apellidomaterno').prop('disabled', false);
//		$('#curp2').prop('disabled', false);
//		$('#homoclave').prop('disabled', false);
//		$('#seguridadsocial').prop('disabled', false);
//		$('#botonGuardar').prop('disabled', false);
//
//	});
//});
///*BOTON QUE ACTIVA TODOS MIS CAMPOS INCICIALIZANDO LAS API'S*/
//
///*BOTON INDIVIDUAL PARA SEGURO SOCIAL*/
//$(document).ready(function() {
//	let seguridadFieldEnabled = false; 
//
//	
//	$('#habilitarSeguridad').click(function() {
//		$('#botonGuardar').prop('disabled', false);
//		
//		if (!seguridadFieldEnabled) {
//			$('#seguridadsocial').prop('disabled', false); 
//			seguridadFieldEnabled = true; 
//		}
//	});
//});
///*BOTON INDIVIDUAL PARA SEGURO SOCIAL*/	

// INICIO codigo depurado (Servicio)
$(document).ready(function() {
	
  function enableField(fieldSelector) {
    $('#botonGuardar1').prop('disabled', false);
    $(fieldSelector).prop('disabled', false);
    
  }

  function initializeSelect(apiEndpoint, selectElement) {
	  
    if (!selectElement.data('loaded')) {
		
      fetch(apiEndpoint)
        .then(response => response.json())
        .then(data => {
          console.log(`Datos obtenidos de la API (${selectElement.attr('id')}):`, data);
          selectElement.append('<option value="" disabled>Selecciona una opción</option>');
          data.forEach(item => {
            selectElement.append(`<option value="${item.lper_clave}">${item.lper_descripcion}</option>`);
          });
          
          selectElement.data('loaded', true);
        });
    }
    selectElement.prop('disabled', false);
  }

  // Botones individuales
  $(document).ready(function() {
    $('#habilitarCorreo').click(() => {
        enableField('#correo');
        $('#botonGuardarComple').prop('disabled', false);
    });

    function enableField(selector) {
        $(selector).prop('disabled', false);
    }
});











  $('#habilitarNombre').click(() => enableField('#nombre'));
  $('#habilitarApellidoPaterno').click(() => enableField('#apellidopaterno'));
  $('#habilitarApellidoMaterno').click(() => enableField('#apellidomaterno'));
  $('#habilitarCurp').click(() => enableField('#curp2'));
  $('#habilitarHomoclave').click(() => enableField('#homoclave'));
  $('#habilitarSeguridad').click(() => enableField('#seguridadsocial'));
  $('#habilitarFecha_nacimiento').click(() => enableField('#fechauno'));
  $('#habilitarEst').click(() => enableField('#fechauno'));

  // Select para el campo género
  $('#habilitarCampos').click(() => initializeSelect('api/persona/Obtenergenero/', $('#genero')));

  // Select para el campo estado civil
  $('#habilitarcivil').click(() => initializeSelect('api/persona/Obteneredocivil/', $('#estadocivil')));

  // Botón que activa todos los campos inicializando las APIs
  $('#botonModificar').click(() => {
  	$('#habilitarCampos').click();
	  $('#habilitarEst').click();
  	$('#habilitarcivil').click();
  		['#nombre', '#apellidopaterno', '#apellidomaterno', '#curp2', '#homoclave', '#fechauno','#nacionalidad','#estado','#municipio','#rfc']
      .forEach(fieldSelector => $(fieldSelector).prop('disabled', false));
  	$('#botonGuardar1').prop('disabled', false);
  
  });
});






  // Botón que activa todos los campos inicializando las APIs
  $('#habilitarorigen2').click(() => {
	$('#habilitarreg').click();
	$('#habilitarsit').click();
	
	 	['#seguridadsocial','#cpfiscal']
	 .forEach(fieldSelector => $(fieldSelector).prop('disabled', false));
	$('#botonGuardar1').prop('disabled', false);

});

















// Botón que activa todos los campos inicializando las APIs
$('#botonModificarComple').click(() => {
    $('#habilitarLenguajes').click();
    $('#habilitarDiscapacidades').click();
    $('#habilitarEscolaridad').click();

    // Habilitar campos
    ['#discpacidadesBien', '#correo', '#lenguajes', '#escolaridad'].forEach(fieldSelector => $(fieldSelector).prop('disabled', false));

    // Habilitar el botónGuardarComple
    $('#botonGuardarComple').prop('disabled', false);
});






// FIN codigo depurado (Servicio)

/******************************************PRIMER MÓDULO DE  DATOS GENERALES *********************************/


/*PRIMER API PARA EL MODULOD E ESTADO Y MUNCIIPIO*/
let estadoSeleccionado;
let municipioSeleccionado;

async function cargarEstadosYMunicipios() {

    const requestEstados = await fetch('api/persona/Obtenerestado/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const estados = await requestEstados.json();
    const estadoSelect = $('#estado');
    const municipioSelect = $('#municipio');

    estadoSelect.empty();
    municipioSelect.empty();

    estados.forEach(estado => {
        estadoSelect.append(`<option value="${estado.edo_id}">${estado.edo_nombre}</option>`);
    });

    estadoSelect.val(estadoIdGlobal);

    var inputEstadogenerado = document.getElementById('estadogenerado');
    inputEstadogenerado.value = estadoIdGlobal;

    // Filtrar municipios al cargar la página
    filtrarMunicipiosPorEstado(estadoIdGlobal);

    estadoSelect.on('change', async function () {
        estadoSeleccionado = $(this).val();
        $('#estadogenerado').val(estadoSeleccionado);

    });

    function filtrarMunicipiosPorEstado(estadoId) {
        const estadoIdSeleccionado = parseInt(estadoId);

        const requestMunicipios = fetch('api/persona/Obtenermunicipio/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        requestMunicipios.then(async response => {
            const municipios = await response.json();

            const municipiosFiltrados = municipios.filter(municipio => municipio.mun_edopadre === estadoIdSeleccionado);

            municipioSelect.empty();

            municipiosFiltrados.forEach(municipio => {
                municipioSelect.append(`<option value="${municipio.mun_numero}">${municipio.mun_nombre}</option>`);
            });

               municipioSelect.val(municipioIdGlobal);
                  
                  var inputMunicipiogenerado = document.getElementById('municipiogenerado');
                  inputMunicipiogenerado.value = municipioIdGlobal;
           
                municipioSelect.on('change', async function () {
                        municipioSeleccionado = $(this).val();
                  $('#municipiogenerado').val(municipioSeleccionado);   
                  });
        });
    }
}

// INICIO Funcion para agregar el municio de acuerdo al estado y agregar input-invalid (Servicio)
async function verificarEstado() {
      
    let estadoSelect = $('#estado');
    let municipioSelect = $('#municipio');
    let estadoInput = estadoSelect.val();

    if (estadoInput !== "#estado") {
            
        municipioSelect.addClass('input-invalid');
        municipioSelect.empty().append('<option value="" disabled selected>Selecciona una opción</option>');
       
        await filtrarMunicipiosPorEstado(estadoInput);
    }
}
// FIN Funcion para agregar el municio de acuerdo al estado y agregar input-invalid (Servicio)

// INICIO Funcion para remover el input-invalid de municipio (Servicio)
async function verificarMunicipio() {
      
    let municipioSelect = $('#municipio');
    let municipioInput = municipioSelect.val();

    if (municipioInput !== "#municipio") {
            
        municipioSelect.removeClass('input-invalid');
       
    }
}
// FIN Funcion para remover el input-invalid de municipio (Servicio)

// INICIO Funcion para filtrar municipios por el estado (Servicio)
async function filtrarMunicipiosPorEstado(estadoId) {
    const estadoIdSeleccionado = parseInt(estadoId);

    const requestMunicipios = await fetch('api/persona/Obtenermunicipio/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const response = await requestMunicipios.json();
    const municipios = response.filter(municipio => municipio.mun_edopadre === estadoIdSeleccionado);

    const municipioSelect = $('#municipio');
    municipios.forEach(municipio => {
        municipioSelect.append(`<option value="${municipio.mun_numero}">${municipio.mun_nombre}</option>`);
    });
}
// FIN Funcion para filtrar municipios por el estado (Servicio)



// INICIO Funcion para agregar el municipio de acuerdo al estado y agregar input-invalid (Servicio)
async function verificarEstado() {
    let estadoSelect = $('#estado');
    let municipioSelect = $('#municipio');
    let estadoInput = estadoSelect.val();

    if (estadoInput !== "#estado") {
        municipioSelect.addClass('input-invalid');
        municipioSelect.empty().append('<option value="" disabled selected>Selecciona una opción</option>');
        await filtrarMunicipiosPorEstado(estadoInput);
    }
}


// FIN Funcion para remover el input-invalid de municipio (Servicio)

// INICIO Funcion para filtrar municipios por el estado (Servicio)
async function filtrarMunicipiosPorEstado(estadoId) {
    const estadoIdSeleccionado = parseInt(estadoId);

    const requestMunicipios = await fetch('api/persona/Obtenermunicipio/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const response = await requestMunicipios.json();
    const municipios = response.filter(municipio => municipio.mun_edopadre === estadoIdSeleccionado);

    const municipioSelect = $('#municipio');
    municipios.forEach(municipio => {
        municipioSelect.append(`<option value="${municipio.mun_numero}">${municipio.mun_nombre}</option>`);
    });
}
// FIN Funcion para filtrar municipios por el estado (Servicio)

$(document).ready(function() {
	$('#habilitarorigen1').click(function() {
		
		$('#estado').prop('disabled', false);	
		$('#nacionalidad').prop('disabled', false);	
		$('#municipio').prop('disabled', false); // Servicio
		$('#botonGuardar2').prop('disabled', false); // Servicio
		cargarEstadosYMunicipios();
		
		console.log(estadoGlobal);
		console.log(municipioGlobal);
		
	});

	$('#formularioRegistro').submit(async function(event) {
		event.preventDefault();

		console.log('Estado seleccionado:', estadoSeleccionado);
		console.log('Municipio seleccionado:', municipioSeleccionado);
	
	});
});














/*API PARA EL SELECT DE NACIONALIDAD*/
$(document).ready(function() {
	let nacionalidadSelectLoaded = false; 

	
	$('#habilitarNac').click(async function() {
	
		if (!nacionalidadSelectLoaded) {
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

			nacionalidades.forEach(nacionalidad => {
				nacionalidadSelect.append(`<option value="${nacionalidad.lper_clave}">${nacionalidad.lper_descripcion}</option>`);
			});

			
			nacionalidadSelectLoaded = true;
		}

		$('#nacionalidad').prop('disabled', false);
		$('#botonGuardar2').prop('disabled', false);
	});
});
/*API PARA EL SELECT DE NACIONALIDAD*/

// INICIO botones individuales estado y municipio (Servicio)
$(document).ready(function() {

	$('#habilitarEst').click(function() {
		
		$('#estado').prop('disabled', false);
		$('#municipio').prop('disabled', false);
		$('#botonGuardar2').prop('disabled', false);
		cargarEstadosYMunicipios();


	});
});

$(document).ready(function() {

	$('#habilitarMun').click(function() {
		
		$('#municipio').prop('disabled', false);
		$('#botonGuardar2').prop('disabled', false);
		cargarEstadosYMunicipios();


	});
});
// FIN botones individuales estado y municipio (Servicio)

/******************************************SEGUNDO MÓDULO DE  DATOS DE ORIGEN  *********************************/



/******************************************TERCER MÓDULO DE  DATOS DE EMPLEADO *********************************/

$(document).ready(function() {
	let empleadoFieldEnabled = false;
      $('#habilitarEmpleado').click(function() {
		
		if (!empleadoFieldEnabled) {
			$('#botonGuardar3').prop('disabled', false);
			$('#empleado').prop('disabled', false); 
			empleadoFieldEnabled = true; 
		}
	});
});



$(document).ready(function() {
	let empleadoFieldEnabled = false;
      $('#habilitarSeguridad').click(function() {
		
		if (!empleadoFieldEnabled) {
			$('#botonGuardar3').prop('disabled', false);
			$('#seguridad').prop('disabled', false); 
			empleadoFieldEnabled = true; 
		}
	});
});



$(document).ready(function() {
	let empleadoFieldEnabled = false;
      $('#habilitarCpf').click(function() {
		
		if (!empleadoFieldEnabled) {
			$('#botonGuardar3').prop('disabled', false);
			$('#cpfiscal').prop('disabled', false); 
			empleadoFieldEnabled = true; 
		}
	});
});

$(document).ready(function() {
	let idFieldEnabled = false; 

     $('#habilitarIdus').click(function() {
		 $('#botonGuardar3').prop('disabled', false);
	
		if (!idFieldEnabled) {
			$('#idusp').prop('disabled', false); 
			idFieldEnabled = true; 
		}
	});
});

$(document).ready(function() {
	let ingresoFieldEnabled = false; 

	
	$('#habilitarFechaingreso').click(function() {
		$('#botonGuardar3').prop('disabled', false);
		
		if (!ingresoFieldEnabled) {
			$('#fechaingreso').prop('disabled', false); 
			$('#fechaingresosp').prop('disabled', false);

			ingresoFieldEnabled = true; 
		}
	});
});


$(document).ready(function() {
	let fonFieldEnabled = false; 


	$('#habilitarFon').click(function() {
		$('#botonGuardar3').prop('disabled', false);
	
		if (!fonFieldEnabled) {
			$('#idinfonacot').prop('disabled', false);

			fonFieldEnabled = true; 
		}
	});
});


$(document).ready(function() {
	let contratacionSelectLoaded = false; 


	$('#habilitarcontra').click(async function() {
		$('#botonGuardar3').prop('disabled', false);
	
		if (!contratacionSelectLoaded) {
			const request = await fetch('api/persona/Obtenercontratacion/', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});

			const contrataciones = await request.json();
			const contratacionSelect = $('#contratacion');
			contratacionSelect.append('<option value="" disabled>Selecciona una opción</option>');

			contrataciones.forEach(contratacion => {
				contratacionSelect.append(`<option value="${contratacion.lper_clave}">${contratacion.lper_descripcion}</option>`);
			});

			
			contratacionSelectLoaded = true;
		}

		//
		$('#contratacion').prop('disabled', false);
	});
});



$(document).ready(function() {
	let regimenSelectLoaded = false; 


	$('#habilitarreg').click(async function() {
		$('#botonGuardar3').prop('disabled', false);
	
		if (!regimenSelectLoaded) {
			const request = await fetch('api/persona/Obtenerisste/', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});

			const regimenes = await request.json();
			const regimenSelect = $('#regimen');
			regimenSelect.append('<option value="" disabled>Selecciona una opción</option>');
			regimenes.forEach(regimen => {
				regimenSelect.append(`<option value="${regimen.lper_clave}">${regimen.lper_descripcion}</option>`);
			});

		
			regimenSelectLoaded = true;
		}

		
		$('#regimen').prop('disabled', false);
	});
});


$(document).ready(function() {
	let situacionSelectLoaded = false; 


	$('#habilitarsit').click(async function() {
		$('#botonGuardar3').prop('disabled', false);

		if (!situacionSelectLoaded) {
			const request = await fetch('api/persona/Obtenersituacion/', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
			});

			const situaciones = await request.json();
			const situacionSelect = $('#situacion');
			situacionSelect.append('<option value="" disabled>Selecciona una opción</option>');
			situaciones.forEach(situacion => {
				situacionSelect.append(`<option value="${situacion.lper_clave}">${situacion.lper_descripcion}</option>`);
			});

		
			situacionSelectLoaded = true;
		}

	
		$('#situacion').prop('disabled', false);
		$('#fechabaja').prop('disabled', false);
		$('#fechaTermino').prop('disabled', false);
	});
});






$(document).ready(function() {
    let dicapacidadSelectLoaded = false;

    $('#habilitarDiscapacidades').click(async function() {
        $('#habilitarDiscapacidades').prop('disabled', false);

        if (!dicapacidadSelectLoaded) {
            const request = await fetch('api/persona/Obtenerdiscapacidad/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const dicapacidades = await request.json();
            const dicapacidadSelect = $('#discapacidadesBien');
            dicapacidadSelect.append('<option value="" disabled>Selecciona una opción</option>');
            dicapacidades.forEach(dicapacidad => {
                dicapacidadSelect.append(`<option value="${dicapacidad.lper_clave}">${dicapacidad.lper_descripcion}</option>`);
            });


            dicapacidadSelectLoaded = true;
        }


        $('#discapacidadesBien').prop('disabled', false);
		$('#botonGuardarComple').prop('disabled', false);

    });

    // Agregar evento change al select
    $('#discapacidadesBien').change(function() {
        // Obtener el valor seleccionado
        const selectedOption = $(this).val();
        // Asignar el valor al input
        $('#clavediscap').val(selectedOption);
    });
});










	$(document).ready(function() {
		let idiomaSelectLoaded = false;
	
		$('#habilitarLenguajes').click(async function() {
			$('#habilitarLenguajes').prop('disabled', false);
	
			if (!idiomaSelectLoaded) {
				const request = await fetch('api/persona/Obteneridioma/', {
					method: 'GET',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				});
	
				const idiomas = await request.json();
				const idiomaSelect = $('#lenguajes');
				idiomaSelect.append('<option value="" disabled>Selecciona una opción</option>');
				idiomas.forEach(idioma => {
					idiomaSelect.append(`<option value="${idioma.idio_id}">${idioma.idio_descripcion}</option>`);
				});
	
	
				idiomaSelectLoaded = true;
			}
	
	
			$('#lenguajes').prop('disabled', false);
			$('#botonGuardarComple').prop('disabled', false);
	
		});
	
		// Agregar evento change al select
		$('#lenguajes').change(function() {
			// Obtener el valor seleccionado
			const selectedOption = $(this).val();
			// Asignar el valor al input
			$('#clavelenguajes').val(selectedOption);
		});
	});
	





$(document).ready(function() {
    let escolaridadSelectLoaded = false;


    $('#habilitarEscolaridad').click(async function() {
        $('#habilitarEscolaridad').prop('disabled', false);

        if (!escolaridadSelectLoaded) {
            const request = await fetch('api/persona/Obtenerescolaridad/', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const escolaridades = await request.json();
            const escolaridadSelect = $('#escolaridad');
            escolaridadSelect.append('<option value="" disabled>Selecciona una opción</option>');
            escolaridades.forEach(escolaridad => {
                escolaridadSelect.append(`<option value="${escolaridad.esc_id}">${escolaridad.esc_descripcion}</option>`);
            });


            escolaridadSelectLoaded = true;
        }


        $('#escolaridad').prop('disabled', false);
		$('#botonGuardarComple').prop('disabled', false);

    });


	// Agregar evento change al select
	$('#escolaridad').change(function() {
		// Obtener el valor seleccionado
		const selectedOption = $(this).val();
		// Asignar el valor al input
		$('#claveescolaridad	').val(selectedOption);
	});
});
















$(document).ready(function() {
	$('#habilitarorigen2').click(function() {
		
		$('#empleado').prop('disabled', false);
		$('#idusp').prop('disabled', false);
		$('#contratacion').prop('disabled', false);
		$('#regimen').prop('disabled', false);
		$('#fechaingreso').prop('disabled', false);
		$('#fechaingresosp').prop('disabled', false);
		$('#situacion').prop('disabled', false);
		$('#fechabaja').prop('disabled', false);
		$('#idinfonacot').prop('disabled', false);
		$('#fechaTermino').prop('disabled', false);
		
		$('#botonGuardar3').prop('disabled', false); // Servicio
		cargarEstadosYMunicipios();
		
		console.log(estadoGlobal);
		console.log(municipioGlobal);
		
	});

	$('#formularioRegistro').submit(async function(event) {
		event.preventDefault();

		console.log('Estado seleccionado:', estadoSeleccionado);
		console.log('Municipio seleccionado:', municipioSeleccionado);
	
	});
});
/******************************************TERCER MÓDULO DE  DATOS DE EMPLEADO *********************************/


/******************************************CUARTO  MÓDULO DE  DATOS DE CENTRO DE TRABAJO Y MODAL  *********************************/

/*BUSCADOR DEL AUTOCOMPLITE  */
document.addEventListener("DOMContentLoaded", function() {
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
        selector: "#autoCompletenone",
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

            if (values.length === 3) {
                autoCompleteTrabajo.input.value = selection;
                document.getElementById('ctra_id').value = values[0];
                ctraIdGlobal = values[0];
                console.log('ctra_id:', ctraIdGlobal);
                document.getElementById('otroInputc').value = values.slice(1).join(' - ');
            } else {
                autoCompleteTrabajo.input.value = values.slice(1).join(' - ');
                document.getElementById('otroInputc').value = values.slice(1).join(' - ');
            }
        },
    },
},
    });

	/*    const calleModalValue = document.getElementById('calleModal').value;
    
    if (!calleModalValue) {
        // Mostrar SweetAlert indicando que el campo está vacío
        swal({
            title: 'Error',
            text: 'Completar los campos faltantes',
            icon: 'error',
            button: 'Aceptar',
        });
        return; 
    }*/
	
/*SE EMPIEZA A LLENAR Y A FUNCIONAR OS BOTONES INDEPENDIENTES PARA ACTIVAAR UN SEGUNDO MODAL  */
document.getElementById('btnsiguiente').addEventListener('click', function() {
	
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

        console.log('ctra_id:', ctraIdGlobal);

        sessionStorage.removeItem('ctroDist');
        /*alert('sessionStorage borrado');*/

        $('#miModal').modal('hide');
    }
});

});


const btnSiguiente = document.getElementById('btnsiguiente');


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

/*SE EMPIEZA A LLENAR Y A FUNCIONAR OS BOTONES INDEPENDIENTES */


/*FUNCIONALIDAD PARA CTRA DE TRABAJO Y CDIS DISTRIBUCION*/
/*IVAN RODRIGUEZ 27 DE NOVIEMBRE DE 2023*/
document.addEventListener("DOMContentLoaded", function() {
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
			stringDatos += persona.cdis_id + ' - ' + persona.cdis_clave + ' - ' + persona.cdis_nombre + ';';

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

		

			highlight: true,

		},

		events: {

			input: {

				selection: (event) => {

					const selection = event.detail.selection.value;

					const values = selection.split(' - ');

					const cdis_id = values[0];
					
					cdisIdGlobal = values[0];
					console.log('cdis_id', cdisIdGlobal);

					autoCompleteJS.input.value = values.slice(1).join(' - ');

					document.getElementById('cdis_id').value = cdis_id;

					document.getElementById('otroInput').value = values.slice(1).join(' - ');

				},

			},

		},

	});

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
	console.log('cdis_id', cdisIdGlobal);
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


//ACABA PARA AMBOS LADOS  A LLENAR Y A FUNCIONAR OS BOTONES INDEPENDIENTES */





function guardarCambios() {


	// Obtener el valor del campo oculto ctra_id y cdis_id
	const nombre = document.getElementById('nombre').value;
	const appaterno = document.getElementById('apellidopaterno').value;
	const apmaterno = document.getElementById('apellidomaterno').value;
	const homoclave = document.getElementById('homoclave').value;
	const curp = document.getElementById('curp2').value.trim();
	const id = document.getElementById('id').value;
    const rfc = document.getElementById('rfc').value;
	const numempleado = document.getElementById('empleado').value;
    const idusp = document.getElementById('idusp').value;
    const noseguridad = document.getElementById('seguridadsocial').value;
    const fechaingresosp = document.getElementById('fechaingresosp').value;
	const fechaingreso = document.getElementById('fechaingreso').value;
	const nacionalidad = parseInt(document.getElementById('nacionalidadid').value);
    /*	const origenedo =document.getElementById('estadoid').value;
	  const origenmun= document.getElementById('municipioid').value;
	  */
    const origenedo = document.getElementById('estadoid').value;
    const origenedox = parseInt(document.getElementById('estadogenerado').value);
    const origenmunx = parseInt(document.getElementById('municipiogenerado').value);
    const origenmun = parseInt(document.getElementById('municipioid').value);
    const fechainicio = document.getElementById('fechainicioUno').value;
	const fechatermino = document.getElementById('fechaTermino').value;
	const usumodifico = document.getElementById('usuModifico').value;
	const usucapturo = document.getElementById('usuCapturo').value;
	const usucapturoid = document.getElementById('usuCapturo').value;
	const fechamod = document.getElementById('fechaCaptura').value;
	const fechabaja = document.getElementById('fechabaja').value;
	const idUsuario = sessionStorage.idUsuario;
    const idUsuarioc = idUsuario;
    const per_situacion = document.getElementById('situacionid').value;
	const per_situacionx = document.getElementById('situacion').value;
    const regimen = document.getElementById('regimenid').value;
	const regimenx = document.getElementById('regimen').value;
	
	
	const edocivilid = parseInt(document.getElementById('edocivilid').value);
	const claveedo = parseInt(document.getElementById('estadocivil').value);
    const idgenero = parseInt(document.getElementById('generoid').value);
	const clave = parseInt(document.getElementById('genero').value);
	
	const fechanacimiento = document.getElementById('fechauno').value;
	const cpfiscal = document.getElementById('cpfiscal').value;
	
	const tipodiscap = document.getElementById('clavediscap').value;
	const email = document.getElementById('correo').value;
	
	const idioma = document.getElementById('clavelenguajes').value;
	const idiomaSelect = document.getElementById('lenguajes').value;
	const escolaridad = parseInt(document.getElementById('claveescolaridad').value);

     
// Servicio ANTIGUOS INPUTS   	
/*    const ctras = parseInt(document.getElementById('centrodetrabajoId').value);
     const cdiss = document.getElementById('cdis_id').value;*/
	

	




	// Verificar si idgenero es un número válido después del parseo
	if (!isNaN(claveedo)) {
		// Haz lo que necesites con idgenero, como asignarlo a otra variable o usarlo en tu lógica.
		console.log("Valor de esatdo después de parsear:", claveedo);

		// ... Otro código ...
	} else {
		// Manejo de error si el valor no es un número válido
		console.error("El valor obtenido de 'edocivil' no es un número válido después de parsear.");
	}




	// Crear un objeto con los datos a actualizar	
	const personaActualizada = {

		per_id: id,
		per_curp: curp,
		per_rfc: rfc,
		per_homoclave: homoclave,
		per_nombre: nombre,
		per_appaterno: appaterno,
		per_apmaterno: apmaterno,
		per_fechabaja: fechabaja || null,
		per_genero: null,
		per_noseguridad: noseguridad,
		per_edocivil: null,
		per_fechaingreso: fechaingreso,
		per_fechaingresosp: fechaingresosp,
		per_fechanacimiento: fechanacimiento,
		per_cpfiscal: cpfiscal, 
		per_idioma: idioma,
		per_escolaridad: escolaridad,
		per_tipodiscap: tipodiscap,
		per_email:email,
		per_nacionalidad: nacionalidad,
		per_origenedo: origenedo,
		per_origenmun: origenmunx,
		per_numempleado: numempleado,
		per_idrusp: idusp,
		per_regimenissste: regimen,
		per_fechainicio: fechainicio,
		per_fechatermino: fechatermino,
		per_usucapturo: idUsuario,
		per_usumodifico: idUsuario,
		per_fechamod: fechamod,
		per_situacion: per_situacion

	};


	
	// Verificar y asignar valores a per_genero y per_edocivil
	if (!isNaN(clave)) {
		personaActualizada.per_genero = clave;
	} else if (!isNaN(idgenero)) {
		personaActualizada.per_genero = idgenero;
	} else {
		console.error("El valor obtenido de 'genero' no es un número válido.");
	}

	if (!isNaN(claveedo)) {
		personaActualizada.per_edocivil = claveedo;
	} else if (!isNaN(edocivilid)) {
		personaActualizada.per_edocivil = edocivilid;
	} else {
		console.error("El valor obtenido de 'estadocivil' no es un número válido.");
	}

	if (!isNaN(origenedox)) {
		personaActualizada.per_origenedo = origenedox;
	} else if (!isNaN(origenedo)) {
		personaActualizada.per_origenedo = origenedo;
	} else {
		console.error("El valor obtenido de 'origenedo' no es un número válido.");
	}

	if (!isNaN(origenmunx)) {
		personaActualizada.per_origenmun = origenmunx;
	} else if (!isNaN(origenmun)) {
		personaActualizada.per_origenmun = origenmun;
	} else {
		console.error("El valor obtenido de 'origenedo' no es un número válido.");
	}



	if (!isNaN(regimenx)) {
		personaActualizada.per_regimenissste = regimenx;
	} else if (!isNaN(regimen)) {
		personaActualizada.per_regimenissste = regimen;
	} else {
		console.error("El valor obtenido de 'regimen' no es un número válido.");
	}


	if (!isNaN(per_situacionx)) {
		personaActualizada.per_situacion = per_situacionx;
	} else if (!isNaN(per_situacion)) {
		personaActualizada.per_situacion = per_situacion;
	} else {
		console.error("El valor obtenido de 'regimen' no es un número válido.");
	}










	// Resto del código para otras operaciones o manipulaciones con personaActualizada
	console.log(personaActualizada);
	console.log("ctra_id:", ctra_id);
	console.log("cdis_id:", cdis_id);


	console.log("Valor de idgenero:", idgenero);
	console.log("Valor de EDOCIVILid:", edocivilid);





	// Mostrar una alerta de confirmación antes de la actualización
	swal({
		title: '¿Estás seguro de actualizar los datos?',
		text: 'Una vez actualizados, no podrás deshacer esta acción',
		icon: 'warning',
		buttons: ['Cancelar', 'Aceptar'],
		dangerMode: true,
	})
		.then((willUpdate) => {
			if (willUpdate) {
				console.log('Realizando solicitud de actualización...');
				fetch('api/personas/actualizar', {
					method: 'PUT',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(personaActualizada), // Reemplaza con tus datos actualizados
				})
					.then(response => response.json())
					.then(data => {
						if (data.actualizado) {
							// Actualización exitosa, puedes mostrar un mensaje de éxito o redirigir a otra página
							swal({
								title: 'Actualización Exitosa',
								text: 'Los datos se han actualizado correctamente.',
								icon: 'success',
								button: 'Aceptar',
							}).then(() => {
								// Puedes redirigir a otra página después de mostrar la alerta si es necesario
								window.location.href = '/pagina-de-exito';
							});
						} else {
							// La actualización falló, mostrar un mensaje de error
							swal({
								title: 'Error en la Actualización',
								text: 'Error al actualizar los datos.',
								icon: 'error',
								button: 'Aceptar',
							});
						}
					})
					.catch(error => {
						// Manejar errores de la solicitud HTTP
						swal({
							title: 'Actualización Exitosa',
							text: 'Los datos se han actualizado correctamente.',
							icon: 'success',
							button: 'Aceptar',
						})
					});
			} else {
				// Si el usuario hace clic en "Cancelar", no se realiza ninguna acción adicional
			}
		});
};



















/*AQUI ACABA CON ASIGNAR LOS VALORES A LOS INPUT DESHABILITANDOLOS*/



//Función para limpiar los campos de entrada
/*function limpiarCampos() {
	const camposALimpiar = [
			'#nombre', '#situacion', '#fechaCaptura', '#fechainicioUno', '#fechaTermino', '#usuCapturo', '#usuModifico', '#apellidopaterno', '#apellidomaterno', '#curp2', '#rfc', '#homoclave', '#genero',
		'#estadocivil',  '#seguridadsocial', '#fechaingreso', '#fechaingresosp', '#centrodetrabajo',
		'#nacionalidad', '#estado', '#distribucion', '#contratacion', '#empleado', '#regimen', '#fechabaja', '#municipio', '#autoComplete', '#idusp', '#usuModifico','#otroInputc','#otroInput'];

	camposALimpiar.forEach(function(campo) {
		$(campo).val('');
	});
}

$(document).ready(function() {
	// Variable para rastrear si se ha hecho clic en el botón de Modificar
	let seHaHechoClicEnModificar = false;

	// Función para habilitar los campos y mantener los campos estáticos
	function habilitarCampos(generoConsulta, estadoCivilConsulta, nacionalidadConsulta, contratacionConsulta, regimenConsulta, situacionConsulta) {
		// Selecciona los campos de género, estado civil y nacionalidad
		const generoSelect = $('#genero');
		const estadoCivilSelect = $('#estadocivil');
		const nacionalidadSelect = $('#nacionalidad');
		const contratacionSelect = $('#contratacion');
		const regimenSelect = $('#regimen');
		const situacionSelect = $('#situacion');
		 const usuModificoSelect = $('#usuModifico');
		  const fechaCapturaSelect = $('#fechaCaptura');
	   
		// Habilitar los campos solo si no se ha hecho clic en Modificar
		if (!seHaHechoClicEnModificar) {
			generoSelect.prop('disabled', false);
			estadoCivilSelect.prop('disabled', false);
			nacionalidadSelect.prop('disabled', false);
			contratacionSelect.prop('disabled', false);
			regimenSelect.prop('disabled', false);
			situacionSelect.prop('disabled', false);
			  usuModificoSelect.prop('disabled', true);
			   fechaCapturaSelect.prop('disabled', true);
			  
			// Vaciar los campos y agregar opciones con valores numéricos
			generoSelect.empty();
			estadoCivilSelect.empty();
			nacionalidadSelect.empty();
			contratacionSelect.empty();
			regimenSelect.empty();
			  situacionSelect.empty();

			generoSelect.append('<option value=""></option>');
			generoSelect.append('<option value="1">HOMBRE</option>');
			generoSelect.append('<option value="2">MUJER</option>');
			generoSelect.append('<option value="3">DIVORCIADO(A)</option>');
			generoSelect.append('<option value="4">VIUDO(A)</option>');

			estadoCivilSelect.append('<option value=""></option>');
			estadoCivilSelect.append('<option value="1">SOLTERO(A)</option>');
			estadoCivilSelect.append('<option value="2">CASADO(A)</option>');

			nacionalidadSelect.append('<option value=""></option>');
			nacionalidadSelect.append('<option value="1">MEXICANA</option>');
			nacionalidadSelect.append('<option value="2">EXTRANJERA</option>');
		    
			contratacionSelect.append('<option value=""></option>');
			contratacionSelect.append('<option value="1">PLAZA PRESUPUESTAL</option>');
			contratacionSelect.append('<option value="2">HONORARIOS</option>');
			contratacionSelect.append('<option value="3">EVENTUAL</option>');
		    
			regimenSelect.append('<option value=""></option>');
			regimenSelect.append('<option value="1">BONO PENSION</option>');
			regimenSelect.append('<option value="2">DECIMO TRANSITORIO</option>');
			regimenSelect.append('<option value="3">SIN ELECCION</option>');
		    
			 situacionSelect.append('<option value=""></option>');
			 situacionSelect.append('<option value="1">ACTIVO</option>');
			 situacionSelect.append('<option value="2">BAJA</option>');
		}

		// Establecer los valores solo si aún no se ha hecho clic en Modificar
		if (!seHaHechoClicEnModificar) {
			// Si es "HOMBRE" o "MUJER", establecer el valor en "1" o "2" respectivamente
			if (generoConsulta === 'HOMBRE') {
				generoSelect.val('1');
			} else if (generoConsulta === 'MUJER') {
				generoSelect.val('2');
			}

			// Si es "SOLTERO(A)" o "CASADO(A)", establecer el valor en "1" o "2" respectivamente
			if (estadoCivilConsulta === 'SOLTERO(A)') {
				estadoCivilSelect.val('1');
			} else if (estadoCivilConsulta === 'CASADO(A)') {
				estadoCivilSelect.val('2');
			}

			// Si es "MEXICANA" o "EXTRANJERA", establecer el valor en "1" o "2" respectivamente
			if (nacionalidadConsulta === 'MEXICANA') {
				nacionalidadSelect.val('1');
			} else if (nacionalidadConsulta === 'EXTRANJERA') {
				nacionalidadSelect.val('2');
			}

			if (contratacionConsulta === 'PLAZA PRESUPUESTAL') {
				contratacionSelect.val('1');
			} else if (contratacionConsulta === 'HONORARIOS') {
				contratacionSelect.val('2');
			} else if (contratacionConsulta === 'EVENTUAL') {
				contratacionSelect.val('3');
			}
		    
			if (regimenConsulta === 'BONO PENSION') {
				regimenSelect.val('1');
			} else if (regimenConsulta === 'DECIMO TRANSITORIO') {
				regimenSelect.val('2');
			} else if (regimenConsulta === 'SIN ELECCION') {
				regimenSelect.val('3');
			}
		    
			if (situacionConsulta === 'ACTIVO') {
				situacionSelect.val('1');
			} else if (situacionConsulta === 'BAJA') {
				situacionSelect.val('2');
			}
		}
	}

	// Función para recargar la página y limpiar los campos
   function recargarPagina() {
		// Limpia los campos
		habilitarCampos('', '', '', '', '', '');

		// Recarga la página
		location.reload();
	}

	// Llama a la función consultarPuestoEstado() al cargar la página
	consultarPuestoEstado();

// Asociar la función a un clic en el botón de Modificar
$('#botonModificar').click(function() {
	// Obtener los valores consultados para género, estado civil y nacionalidad
	const generoConsulta = $('#genero').val();
	const estadoCivilConsulta = $('#estadocivil').val();
	const nacionalidadConsulta = $('#nacionalidad').val();
	const contratacionConsulta = $('#contratacion').val(); // Agrega esta línea para obtener el valor de contratación
	const regimenConsulta = $('#regimen').val(); // Agrega esta línea para obtener el valor de régimen
	const nombreInput = $('#nombre');
	const appaternoInput = $('#apellidopaterno');
	const apmaternoInput = $('#apellidomaterno');
	const empleadoInput = $('#empleado');
	const curpInput = $('#curp2');
	const rfcInput = $('#rfc');
	const homoclaveInput = $('#homoclave');
	const seguridadInput = $('#seguridadsocial');
	const estadoInput = $('#estado');
	const contratacionInput = $('#contratacion');
	const situacionConsulta = $('#situacion').val();
	const iduspInput = $('#idusp');
	const fechaingreso = $('#fechaingreso');
	const fechaingresosp = $('#fechaingresosp');
	const fechabaja = $('#fechabaja');
	const autocompleteuno = $('#autoCompleteuno');
	const autocompletenone = $('#autoCompletenone');
	const usuModifico = $ ('#usuModifico');
	const fechaCaptura = $ ('#fechaCaptura');
   
    
    
	// Consultar puesto y estado
	consultarPuestoEstado();

	// Habilitar campos
	habilitarCampos(generoConsulta, estadoCivilConsulta, nacionalidadConsulta, contratacionConsulta, regimenConsulta, situacionConsulta);
	nombreInput.prop('disabled', false);
	appaternoInput.prop('disabled', false);
	apmaternoInput.prop('disabled', false);
	curpInput.prop('disabled', false);
	rfcInput.prop('disabled', false);
	homoclaveInput.prop('disabled', false);
	seguridadInput.prop('disabled', false);
	estadoInput.prop('disabled', false);
	contratacionInput.prop('disabled', false);
	empleadoInput.prop('disabled', false);
	iduspInput.prop('disabled', false);
	fechaingreso.prop('disabled', false);                                                                                                                                 
	fechaingresosp.prop('disabled', false);
	fechabaja.prop('disabled', false);
	autocompleteuno.prop('disabled', false);
	autocompletenone.prop('disabled', false);
	usuModifico.prop('disabled', true);
	fechaCaptura.prop('disabled', true);
   


	// Marcar que se ha hecho clic en el botón de Modificar
	seHaHechoClicEnModificar = true;

	// Obtener la fecha de hoy en formato "YYYY-MM-DD"
   
	// Deshabilitar el botón de Modificar después de hacer clic
	$(this).prop('disabled', true);
    
	var fechaHoy = new Date().toISOString().split('T')[0];

	// Establecer la fecha de hoy en el campo de entrada fechaCaptura
	$("#fechaCaptura").val(fechaHoy);

	// Actualizar el campo usuModifico con el nombre de usuario actual
   

});

// Asociar la función de recargar la página al botón de Salir Consulta
$('#botonSalirConsulta').click(function() {
	recargarPagina();
});

// Deshabilitar los campos usuModifico y fechaCaptura inicialmente

});



// Llama a la función consultarPuestoEstado() al cargar la página
$(document).ready(function() {
	consultarPuestoEstado();
});


function habilitarCampos() {
	$('#curp2, #rfc, #homoclave, #nombre, #apellidopaterno, #apellidomaterno, ' +
		' #fechainicioUno, #fechaTermino,  #genero, #estadocivil, ' +
		'#seguridadsocial, #fechaingreso, #fechaingresosp, #autoCompleteuno, #nacionalidad, ' +
		'#estado, #autoCompletenone, #contratacion, #empleado, #regimen, #fechabaja, ' +
		'#municipio, #idusp, #situacion').removeAttr('disabled');
}


$(document).ready(function() {
	
	deshabilitarCampos();
});

function deshabilitarCampos() {
	$('#curp2, #rfc, #homoclave, #nombre, #apellidopaterno, #apellidomaterno, ' +
		' #fechainicioUno, #fechaTermino, #genero, #estadocivil, ' +
		'#seguridadsocial, #fechaingreso, #fechaingresosp, #autoCompleteuno, #nacionalidad, ' +
		'#estado, #autoCompletenone, #contratacion, #empleado, #regimen, #fechabaja, ' +
		'#municipio, #idusp, #situacion, #usuModifico, #genero').prop('disabled', true);
}


function validarEstado(curp) {
  // Obtener los caracteres en las posiciones 12 y 13
  const caracteresEstado = curp.substring(11, 13);

  // Definir un objeto con los códigos de estado y sus correspondientes nombres
  const estados = {
	"AS": "AGUASCALIENTES",
	"BC": "BAJA CALIFORNIA",
	"BS": "BAJA CALIFORNIA SUR",
	"CC": "CAMPECHE",
	"CL": "COAHUILA",
	"CM": "COLIMA",
	"CS": "CHIAPAS",
	"CH": "CHIHUAHUA",
	"DF": "DISTRITO FEDERAL",
	"DG": "DURANGO",
	"GT": "GUANAJUATO",
	"GR": "GUERRERO",
	"HG": "HIDALGO",
	"JC": "JALISCO",
	"MC": "MÉXICO",
	"MN": "MICHOACÁN",
	"MS": "MORELOS",
	"NT": "NAYARIT",
	"NL": "NUEVO LEÓN",
	"OC": "OAXACA",
	"PL": "PUEBLA",
	"QT": "QUERÉTARO",
	"QR": "QUINTANA ROO",
	"SP": "SAN LUIS POTOSÍ",
	"SL": "SINALOA",
	"SR": "SONORA",
	"TC": "TABASCO",
	"TS": "TAMAULIPAS",
	"TL": "TLAXCALA",
	"VZ": "VERACRUZ",
	"YN": "YUCATÁN",
	"ZS": "ZACATECAS",
	"NE": "NACIDO EN EL EXTRANJERO"
  };

  // Validar si los caracteres corresponden a un estado válido
  if (estados[caracteresEstado]) {
	return estados[caracteresEstado];
  } else {
	return null;
  }
}			
*/
//Validaciones Rodrigo SS
/*
	Validacion para solo poder escribir mayusculas en los inputs
	*Nombre
	*Apellidos P
	*Apellidos M
*/
function validarMayusculas(input) {
    var valor = input.value.trim();
    
    // Convertir a mayúsculas
    var soloMayusculas = valor.toUpperCase();

    // Eliminar caracteres no deseados (números y otros caracteres)
    var soloCaracteresPermitidos = soloMayusculas.replace(/[^A-Z]/g, '');

    if (soloMayusculas !== soloCaracteresPermitidos) {
        swal({
            title: 'Solo se aceptan mayúsculas y no se permiten números ni caracteres especiales.',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    input.value = soloCaracteresPermitidos;
}

/*
	CURP
	Validacion para NO PODER escribir caracteres ni minusculas
	 
	Max 18 caracteres
*/

function validarCURP(input) {
	var valor = input.value.trim();

    // Convertir a mayúsculas
    valor = valor.toUpperCase();

    // Eliminar caracteres no deseados (no números ni mayúsculas)
    var soloMayusculasYNumeros = valor.replace(/[^A-Z0-9]/g, '');

    if (valor !== soloMayusculasYNumeros) {
        swal({
            title: 'Solo se aceptan números y letras mayúsculas',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    // Limitar a 18 caracteres
    if (soloMayusculasYNumeros.length > 18) {
        soloMayusculasYNumeros = soloMayusculasYNumeros.substring(0, 18);
        swal({
            title: 'Solo se permiten 18 caracteres',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    input.value = soloMayusculasYNumeros;
}

/*
	Palabras altisonantes y llenado del RFC
*/
function palabrasAltyRFC(input) {
    var valor = input.value.trim().toUpperCase();

    // Listas de palabras altisonantes y sus versiones censuradas
    var palabrasAltisonantes = ["BUEI", "CACA", "CAGA", "CAKA", "COGE", "COJE", "COJO", "FETO", "JOTO", "KACO", "KAGO",
        "KOJO", "KULO", "MAMO", "MEAS", "MION", "MULA", "PEDO", "PUTA", "QULO", "RUIN", "BUEY", "CACO", "CAGO", "CAKO",
        "COJA", "COJI", "CULO", "GUEY", "KACA", "KAGA", "KOGE", "KAKA", "MAME", "MEAR", "MEON", "MOCO", "PEDA", "PENE",
        "PUTO", "RATA"];

    var palabrasReemplazo = ["BUEX", "CACX", "CAGX", "CAKX", "COGX", "COJX", "COJX", "FETX", "JOTX", "KACX", "KAGX",
        "KOJX", "KULX", "MAMX", "MEAX", "MIOX", "MULX", "PEDX", "PUTX", "QULX", "RUIX", "BUEX", "CACX", "CAGX", "CAKX",
        "COJX", "COJX", "CULX", "GUEX", "KACX", "KAGX", "KOGX", "KAKX", "MAMX", "MEAX", "MEOX", "MOCX", "PEDX", "PENX",
        "PUTX", "RATX"];

    // Verificar si alguna palabra altisonante está presente en el contenido
    var indexPalabraAltisonante = palabrasAltisonantes.findIndex(palabra => valor.includes(palabra));
    if (indexPalabraAltisonante !== -1) {
        // Reemplazar la palabra altisonante con la correspondiente de la lista de reemplazo
        var palabraReemplazo = palabrasReemplazo[indexPalabraAltisonante];
        input.value = valor.replace(palabrasAltisonantes[indexPalabraAltisonante], palabraReemplazo);
    }

    // Verificar si el input tiene al menos 18 caracteres
    if (input.value.trim().length === 18) {
        // Verificar si la estructura del CURP es correcta
        if (/^[A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{5}[0-9]{2}$/.test(input.value.trim())) {
            // Tomar los primeros 10 caracteres para llenar el input con id "rfc"
            var primeros10Caracteres = input.value.trim().substring(0, 10);

            // Verificar si alguna palabra altisonante está presente en el contenido
            var indexPalabraAltisonante = palabrasAltisonantes.findIndex(palabra => input.value.includes(palabra));
            if (indexPalabraAltisonante !== -1) {
                // Reemplazar la palabra altisonante con la correspondiente de la lista de reemplazo
                var palabraReemplazo = palabrasReemplazo[indexPalabraAltisonante];
                document.getElementById('rfc').value = palabraReemplazo + input.value.trim().substring(4);
            } else {
                // Si no hay palabra altisonante, llenar el RFC tal como está
                document.getElementById('rfc').value = primeros10Caracteres;
            }
        } else {
            // Mostrar swal de advertencia
            swal({
                title: 'La estructura del CURP es incorrecta',
                text:'Coregir por favor',
                icon: 'warning',
                button: 'Aceptar',
            });
        }
    }
}
var curpInput = document.getElementById('curp2');
// Agregar el evento de entrada (input) al input "curp2"
curpInput.addEventListener('input', function () {
	palabrasAltyRFC(this);
});


/*
	HOMOCLAVE
	Validacion para NO PODER escribir caracteres ni minusculas
	
	Max 3 caracteres
*/
function validarHC(input) {
     var valor = input.value.trim();

    // Convertir a mayúsculas
    valor = valor.toUpperCase();

    // Eliminar caracteres no deseados (no números ni mayúsculas)
    var soloMayusculasYNumeros = valor.replace(/[^A-Z0-9]/g, '');

    if (valor !== soloMayusculasYNumeros) {
        swal({
            title: 'Solo se aceptan números y letras mayúsculas',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    // Limitar a 3 caracteres
    if (soloMayusculasYNumeros.length > 3) {
        soloMayusculasYNumeros = soloMayusculasYNumeros.substring(0, 3);
        swal({
            title: 'Solo se permiten 3 caracteres',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    input.value = soloMayusculasYNumeros;
}
/*
	NUMERO DE SEGURIDAD SOCIAL
	Validacion para NO PODER escribir caracteres ni minusculas
	
	Max 11 caracteres
*/
function validarNSS(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    if (valor !== soloNumeros) {
        swal({
            title: 'Solo se aceptan números',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    // Limitar a 11 caracteres
    if (soloNumeros.length > 11) {
        soloNumeros = soloNumeros.substring(0, 11);
        swal({
            title: 'Solo se permiten 11 caracteres',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    input.value = soloNumeros;
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



    
    	
	$("#btnBuscar").prop("disabled", false);
	$("#habilitarBusqueda").prop("disabled", true);
	$('#autoComplete').prop('disabled', false);



	
	
	// Datos generales
	$('#habilitarNombre').prop('disabled', true);
	$('#habilitarApellidoPaterno').prop('disabled', true);
	$('#habilitarApellidoMaterno').prop('disabled', true);
	$('#habilitarCurp').prop('disabled', true);
	$('#habilitarHomoclave').prop('disabled', true);
	$('#habilitarCampos').prop('disabled', true);
	$('#habilitarcivil').prop('disabled', true);
	$('#habilitarSeguridad').prop('disabled', true);
	$('#habilitarNac').prop('disabled', true);
	$('#botonGuardar1').prop('disabled', true);
	$('#botonModificar').prop('disabled', true);

	// Datos origen
	
	$('#habilitarEst').prop('disabled', true);
	$('#habilitarMun').prop('disabled', true);
	$('#botonGuardar2').prop('disabled', true);
	$('#habilitarorigen1').prop('disabled', true);
	
	// Datos empleado	
	$('#habilitarEmpleado').prop('disabled', true);
	$('#habilitarIdus').prop('disabled', true);
	$('#habilitarcontra').prop('disabled', true);
	$('#habilitarreg').prop('disabled', true);
	$('#habilitarFechaingreso').prop('disabled', true);
	$('#habilitarsit').prop('disabled', true);
	$('#habilitarFon').prop('disabled', true);
	$('#botonGuardar3').prop('disabled', true);
	$('#habilitarorigen2').prop('disabled', true);
	
	// Datos centro de trabajo y distribucion
	$('#autoCompletenone').prop('disabled', true);
	$('#autoCompleteuno').prop('disabled', true);
	$('#especificactra').prop('disabled', true);
	$('#nuevoBoton').prop('disabled', true);
	$('#especificacdis').prop('disabled', true);
	$('#btnver').prop('disabled', true);
	$('#botonGuardar4').prop('disabled', true);

	// ??
	$('#habilitaremp').prop('disabled', true);	
	$('#habilitaremp').prop('disabled', true);
	
}

function limpiarCampos() {
	var elementosFormulario = document.querySelectorAll('input, textarea, select');
	
	elementosFormulario.forEach(function(elemento) {
			elemento.value = '';
	});
}

// INPUT FECHA TERMINO Y FECHA BAJA
// Obtener referencias a los elementos
var fechaBajaInput = document.getElementById('fechabaja');
var fechaTerminoInput = document.getElementById('fechaTermino');

// Agregar un event listener al input "fechabaja"
fechaBajaInput.addEventListener('input', function () {
    // Obtener la fecha seleccionada en "fechabaja"
    var fechaSeleccionada = fechaBajaInput.value;

    // Asignar la misma fecha a "fechaTermino"
    fechaTerminoInput.value = fechaSeleccionada;
});

// Validacion No.de empleado* 
function validarNE(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    if (valor !== soloNumeros) {
        swal({
            title: 'Solo se aceptan números',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    // Limitar a 11 caracteres
    if (soloNumeros.length > 5) {
        soloNumeros = soloNumeros.substring(0, 5);
        swal({
            title: 'Solo se permiten 5 numeros',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    input.value = soloNumeros;
}

// Validacion IDRUPS
function validarIDRUPS(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    if (valor !== soloNumeros) {
        swal({
            title: 'Solo se aceptan números',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    // Limitar a 11 caracteres
    if (soloNumeros.length > 9) {
        soloNumeros = soloNumeros.substring(0, 9);
        swal({
            title: 'Solo se permiten 9 numeros',
            icon: 'warning',
            button: 'Aceptar',
        });
    }

    input.value = soloNumeros;
}