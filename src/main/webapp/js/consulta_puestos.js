
// servicio
const autoCompleteInput = document.getElementById("autoComplete");

autoCompleteInput.addEventListener("click", function () {
    // Remueve la clase 'input-invalid'
    this.classList.remove('input-invalid');
});

// fin servicio

$('document').ready(function() {
	consultarDetallesPersonalizados();
limpiarCampos();
//buscarPuesto();


if(sessionStorage.permisos == 1){
$("#datos_control").prop("hidden", false);
}

});

let global_ctgp_codigo;

async function buscarPuesto() {

	let datos = {};
	datos.ctgp_codigo = document.getElementById('autoComplete').value.split("-")[0].trim();

	const request = await fetch('api/puestos/consulta/datosXcodigo', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(datos)
	});

	const puestos = await request.json();
  console.log(puestos);
	global_ctgp_codigo = document.getElementById('autoComplete').value.split("-")[0].trim();

	
	// INICIO Validacion Servicio
	  	if (puestos.length === 0) {

			swal({

				title: 'Por favor, ingrese un dato válido.',
				icon: 'error',
				button: 'Aceptar'

			});

			return;

		}
	// FIN Validacion Servicio



	if (!verificarJson(puestos)) {
		$('#modificarPuesto').removeAttr('disabled');
	}
 llenaModal();
	
}

const verificarJson = (nombreJson) => {
	return Object.keys(nombreJson).length === 0;
}


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


for (var i = 0; i < puestos.length; i++) {
	
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

// Asocia el evento de abrir el modal al botón "abrirInfo"
document.getElementById("abrirInfo").addEventListener("click", buscarPuesto);

$('#modalInfo').on('hidden.bs.modal', function() {
	$('body').removeClass('modal-open');
	$('.modal-backdrop').remove();

});

/* Finaliza funcion buscar puestos de Sergio */


/**Bonton registrar */

function Registro() {

	swal({
		title: "El registro fue exitoso",
		text: "Buen trabajo !!",
		icon: "success",
		button: "Aceptar",
	});
}

document.getElementById('botonRegistar').addEventListener('click', function() {
	Registro();
});

/**Fin boton registrar */

/**Boton limpiar */


function limpiarCampos() {

	var elementosFormulario = document.querySelectorAll('input, textarea, select');
	
	elementosFormulario.forEach(function(elemento) {
		if (elemento.id !== 'fechaCapt') { //fechaCaptura
			elemento.value = '';
		}
	});
}

// INICIO agregarle funcion a los botones Limpiar y Habilitar busqueda Servicio
	// Se le cambio de nombre al onclick del boton limpiar para agregarle mas funciones separadas de la funcion LimpiarCampos
function limpiarCamposHabilitar() {
	limpiarCampos();
		autoCompleteJS.input.disabled = false;
        autoCompleteJS.input.value = "";
        autoCompleteJS.input.classList.add("input-invalid");
}

	// Se agrego el boton habilitar busqueda
function habilitarBusqueda(){
	
        autoCompleteJS.input.disabled = false;
        autoCompleteJS.input.value = "";
		autoCompleteJS.input.classList.add("input-invalid");
		
		/*limpiar campos */
		document.getElementById("codigoPuesto").value = "";
    	document.getElementById("descripcion").value = "";
		document.getElementById("situacion").value = "";
		
		document.getElementById("Tipo").value = "";
		document.getElementById("Zona").value = "";
    	document.getElementById("descripcion").value = "";
		document.getElementById("Nivel").value = "";
		document.getElementById("Calsificacion_Interna").value = "";
		document.getElementById("Contratacion").value = "";
    	document.getElementById("Categoria").value = "";
		document.getElementById("Subcategoria").value = "";
		document.getElementById("Declaracion").value = "";
		document.getElementById("FechaIni").value = "";
		document.getElementById("FechaFin").value = "";
		document.getElementById("UsuarioCapturo").value = "";
		document.getElementById("FechaMod").value = "";
		document.getElementById("UsuarioUltMod").value = "";
}		
// FIN agregarle funcion a los botones Limpiar y Habilitar busqueda Servicio


/**Obtener Fecha */

function obtenerFechaActual() {
	const fecha = new Date();
	const dia = String(fecha.getDate()).padStart(2, '0');
	const mes = String(fecha.getMonth() + 1).padStart(2, '0');
	const año = fecha.getFullYear();

	return `${dia}/${mes}/${año}`;
}


const fechaInput = document.getElementById('fechaCaptura');
fechaInput.value = obtenerFechaActual();

/**Fin obtener Fecha */

/**Llenado del modal */

async function llenaModal() {
  const request = await fetch('api/puestos/puestosX_detallesX/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const puesto = await request.json();
  console.log('soy puesto',puesto);

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
  
  for (var i = 0; i < puesto.length; i++) {
	if (puesto[i][2] === global_ctgp_codigo ) {		//&& puesto[i][27] === 1
		console.log(global_ctgp_codigo)
		contador ++;
		const row = document.createElement("tr");
		
		//Numero
		const cell1 = document.createElement("td");		
  cell1.innerHTML =`<label class="form-check-label" ">
        ${contador}
    </label>`;
		
		//Seleccion
		const cell2 = document.createElement("td");		
  cell2.innerHTML = `<input class="form-check-input" type="radio" name="${radioGroupName}" value="${puesto[i][0]}"
   data-codigo="${puesto[i][0]}" data-codigo2="${puesto[i][2]}" data-descripcion="${puesto[i][3]}"/>`;
   
   //Codigo
  const cell3 = document.createElement("td");
  cell3.innerHTML=`<label class="form-check-label" for="opcion${puesto[i][2]}">
        ${puesto[i][2]}
    </label>`;
    
    //Descripcion
    const cell4 = document.createElement("td");
   cell4.innerHTML=`<label class="form-check-label" for="opcion${puesto[i][3]}">
        ${puesto[i][3]}
    </label>`;
    
    //Tipo
    const cell5 = document.createElement("td");
   cell5.innerHTML=`<label class="form-check-label" for="opcion${puesto[i][5]}">
        ${puesto[i][5]}
    </label>`;
    
    //Zona
    const cell6 = document.createElement("td");
   cell6.innerHTML=`<label class="form-check-label" for="opcion${puesto[i][7]}">
        ${puesto[i][7]}
    </label>`;
    
    //Nivel
     const cell7 = document.createElement("td");
   cell7.innerHTML=`<label class="form-check-label" for="opcion${puesto[i][9]}">
        ${puesto[i][9]}
    </label>`;
    
     //Contratacion
     const cell8 = document.createElement("td");
   cell8.innerHTML=`<label class="form-check-label" for="opcion${puesto[i][17]}">
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
 
seleccionarBtn.addEventListener("click", function () {
  // Busca el elemento de radio seleccionado
  const selectedRadio = modalBody.querySelector('input[type="radio"]:checked');

  if (selectedRadio) {
    // Obtiene los valores personalizados del elemento de radio seleccionado
    const codigoSeleccionado = selectedRadio.getAttribute('data-codigo');
    const codigoPuestoSeleccionado = selectedRadio.getAttribute('data-codigo2');
    const descripcionSeleccionada = selectedRadio.getAttribute('data-descripcion');

     // Asigna los valores a los campos de entrada
    const codigoInput = document.getElementById('codigoPuesto');
    const descripcionInput = document.getElementById('descripcion');
    
    consultarDetallesPersonalizados(codigoSeleccionado);

    codigoInput.value = codigoPuestoSeleccionado;
    descripcionInput.value = descripcionSeleccionada;
    
    const limpiar = document.getElementById('autoComplete');
    limpiar.value = ''; 
    
     document.getElementById('situacion').value="ACTIVO";
    
$(modal).modal('hide');
   
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
//agregarValorAlInput("miInput", "Nuevo valor");



async function consultarDetallesPersonalizados(codigoPuesto) {
  const request = await fetch('api/puestos/puestosX_detallesX/', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const puesto_detalle = await request.json();
  //var codigoPuesto = document.getElementById("codigoPuesto").value;
  
  

  for (var i = 0; i < puesto_detalle.length; i++) {
    if (puesto_detalle[i][0] == codigoPuesto) {
      agregarValorAlInput("Tipo", puesto_detalle[i][5]); 
      agregarValorAlInput("Zona", puesto_detalle[i][7]);
      agregarValorAlInput("Nivel", puesto_detalle[i][9]);
      agregarValorAlInput("Categoria", puesto_detalle[i][11]);
      agregarValorAlInput("Subcategoria", puesto_detalle[i][13]);
      agregarValorAlInput("Calsificacion_Interna", puesto_detalle[i][15]);
      agregarValorAlInput("Contratacion", puesto_detalle[i][17]);
      agregarValorAlInput("Declaracion", puesto_detalle[i][19]);
      agregarValorAlInput("UsuarioCapturo", puesto_detalle[i][23]);           
      agregarValorAlInput("FechaIni", convertirFecha(puesto_detalle[i][20]));      	  
      agregarValorAlInput("FechaMod", convertirFecha(puesto_detalle[i][24]));
      agregarValorAlInput("UsuarioUltMod", puesto_detalle[i][26]);
      agregarValorAlInput("FechaFin", convertirFecha(puesto_detalle[i][21]));
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
  var dateComponents = inputDate.split('-');

  if (dateComponents.length !== 3) {
    // Verifica si la fecha de entrada tiene el formato correcto
    return 'Fecha no válida';
  }  
 
  // Crea una nueva fecha en el formato "dd/mm/aaaa"
  var outputDate = dateComponents[2] + '/' + dateComponents[1] + '/' + dateComponents[0];

  return outputDate;
}