
// servicio
const autoCompleteInput = document.getElementById("autoComplete");

autoCompleteInput.addEventListener("click", function () {
  // Remueve la clase 'input-invalid'
  this.classList.remove('input-invalid');
});

// fin servicio

$('document').ready(function () {

  consultarDetallesPersonalizados();
  limpiarCampos();
  consultarPuestoDetalle();

  if (sessionStorage.permisos == 1) {
    $("#datos_control").prop("hidden", false);
  }

});

//Inicio historico
let situacion;
let idPuesto;
let idcodpuesto;
let fechaIni;
let fechater;
let usuCap;
let fechaMod;
let UsuModi;





//fin historico
let global_ctgp_codigo;
let botonRegistrar = document.getElementById("botonRegistar"); // Servicio
let arregloInicial; // Servicio
let arregloModificado; // Servicio



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

$('#modalInfo').on('hidden.bs.modal', function () {
  $('body').removeClass('modal-open');
  $('.modal-backdrop').remove();

});

/* Finaliza funcion buscar puestos de Sergio */


/**Bonton registrar */

function Registro() {

  guardarBtnRegistrar();

  // INICIO Comparamos los objetos convertidos a cadenas JSON Servicio
  if (JSON.stringify(arregloInicial) === JSON.stringify(arregloModificado)) {

    swal({

      title: 'No ha realizado ningún cambio',
      icon: 'error',
      button: 'Aceptar'

    });

    return;

  } else {
    enviarDatosAPI();
    swal({

      title: "Registrado exitosamente",
      icon: "success",
      button: "Aceptar",
    })

  }
  // FIN Comparamos los objetos convertidos a cadenas JSON Servicio
}

/**Fin boton registrar */


// INICIO funcion que obtiene el texto del elemento seleccionado en un elemento de seleccion Servicio
function obtenerValorSeleccionado(id) {
  const select = document.getElementById(id);
  return select.options[select.selectedIndex].text;
}
// FIN funcion que obtiene el texto del elemento seleccionado en un elemento de seleccion Servicio

// INICIO Funcion para guardar los selects al momento de darle el boton seleccionar Servicio
function guardarBtnSeleccionar() {
  const objetoGuardado = {
    Tipo: obtenerValorSeleccionado('Tipo'),
    Zona: obtenerValorSeleccionado('Zona'),
    Nivel: obtenerValorSeleccionado('Nivel'),
    Contratacion: obtenerValorSeleccionado('Contratacion'),
    Categoria: obtenerValorSeleccionado('Categoria'),
    Subcategoria: obtenerValorSeleccionado('Subcategoria'),
    Clasificacion_Interna: obtenerValorSeleccionado('Clasificacion_Interna'),
    Declaracion: obtenerValorSeleccionado('Declaracion')
  };

  arregloInicial = objetoGuardado;
  //console.log("Soy el arreglo Inicial", arregloInicial);
  return objetoGuardado;
}
// FIN Funcion para guardar los selects al momento de darle el boton seleccionar Servicio

// INICIO Funcion para guardar los selects al momento de darle el boton registrar Servicio
function guardarBtnRegistrar() {
  const objetoGuardado2 = {
    Tipo: obtenerValorSeleccionado('Tipo'),
    Zona: obtenerValorSeleccionado('Zona'),
    Nivel: obtenerValorSeleccionado('Nivel'),
    Contratacion: obtenerValorSeleccionado('Contratacion'),
    Categoria: obtenerValorSeleccionado('Categoria'),
    Subcategoria: obtenerValorSeleccionado('Subcategoria'),
    Clasificacion_Interna: obtenerValorSeleccionado('Clasificacion_Interna'),
    Declaracion: obtenerValorSeleccionado('Declaracion')
  };

  arregloModificado = objetoGuardado2;
  //console.log("Soy el arreglo Modificado",arregloModificado);
  return objetoGuardado2;
}
// FIN Funcion para guardar los selects al momento de darle el boton registrar Servicio



/**Boton limpiar */

function limpiarCampos() {

  botonRegistrar.disabled = true; // Servicio
  var elementosFormulario = document.querySelectorAll('input, textarea, select');

  elementosFormulario.forEach(function (elemento) {
    if (elemento.id !== 'fechaCapt') { //fechaCaptura
      elemento.value = '';
    }
  });
}

// INICIO agregarle funcion a los botones Limpiar y Habilitar busqueda Servicio
// Se le cambio de nombre al onclick del boton limpiar para agregarle mas funciones separadas de la funcion LimpiarCampos
function limpiarCamposHabilitar() {

  limpiarCampos();
  consultarPuestoDetalle();

  if (sessionStorage.permisos == 1) {
    $("#datos_control").prop("hidden", false);
  }

  // Habilitamos el autoComplete y colocamos input.invalid Servicio
  autoCompleteJS.input.disabled = false;
  autoCompleteJS.input.value = "";
  autoCompleteJS.input.classList.add("input-invalid");
}

// FIN agregarle funcion a los botones Limpiar

/**Obtener Fecha */



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

    if (puesto[i][2] === global_ctgp_codigo) {		//&& puesto[i][27] === 1

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

  seleccionarBtn.addEventListener("click", function () {
    // Tu lógica existente para obtener el radio seleccionado
    const selectedRadio = modalBody.querySelector('input[type="radio"]:checked');

    if (selectedRadio) {
      // Obtiene los valores personalizados del radio seleccionado
      const codigoSeleccionado = selectedRadio.getAttribute('data-codigo');
      const codigoPuestoSeleccionado = selectedRadio.getAttribute('data-codigo2');
      const descripcionSeleccionada = selectedRadio.getAttribute('data-descripcion');

      // Asigna los valores a los campos de entrada
      const codigoInput = document.getElementById('codigoPuesto');
      const descripcionInput = document.getElementById('descripcion');

      consultarDetallesPersonalizados(codigoSeleccionado);

      codigoInput.value = codigoPuestoSeleccionado;
      descripcionInput.value = descripcionSeleccionada;

      // Limpiar el campo con id 'autoComplete'
      const limpiar = document.getElementById('autoComplete');
      limpiar.value = '';

      // Establecer el valor del campo con id 'situacion' a "ACTIVO"
      document.getElementById('situacion').value = "ACTIVO";

      // Ocultar el modal
      $(modal).modal('hide');

    } else {
      seleccion();
    }
    botonRegistrar.disabled = false;
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
    //  inputElement.setAttribute("disabled", "disabled");
  } else {
    console.error("Elemento de entrada no encontrado con el ID: " + inputId);
  }
}


function agregarValorAlInput2(inputId, nuevoValor) {
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

function agregarValorAlInput3(inputId, nuevoValor) {
  // Obtener el elemento de entrada por su ID
  var inputElement = document.getElementById(inputId);

  // Verificar si el elemento existe
  if (inputElement) {
    // Habilitar el campo de entrada
    inputElement.removeAttribute("disabled");

    // Buscar la opción existente con el valor a reemplazar
    var opcionExistente = inputElement.querySelector('option[value="' + nuevoValor + '"]');

    // Verificar si se encontró la opción existente
    if (opcionExistente) {
      // Seleccionar la opción existente
      opcionExistente.selected = true;

    } else {
      // Si no se encontró la opción existente, crearla
      var nuevaOpcionHTML = '<option value="' + nuevoValor + '" disabled selected>' + nuevoValor + '</option>';
      // Insertar la nueva opción al principio del contenido existente
      inputElement.insertAdjacentHTML('afterbegin', nuevaOpcionHTML);
    }

    // Volver a deshabilitar el campo de entrada (si es necesario)
    //inputElement.setAttribute("disabled", "disabled");
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
      agregarValorAlInput3("Tipo", puesto_detalle[i][4]);
      //captura(puesto_detalle[i][27]);
      situacion = puesto_detalle[i][27];
      idPuesto = puesto_detalle[i][28];
      idcodpuesto = puesto_detalle[i][1];
      fechaIni = puesto_detalle[i][20];
      fechater = puesto_detalle[i][21];
      usuCap = puesto_detalle[i][22];
      fechaMod = puesto_detalle[i][24];
      UsuModi = puesto_detalle[i][25];


      agregarValorAlInput3("Zona", puesto_detalle[i][6]);
      agregarValorAlInput3("Nivel", puesto_detalle[i][8]);
      agregarValorAlInput3("Categoria", puesto_detalle[i][10]);
      agregarValorAlInput3("Subcategoria", puesto_detalle[i][12]);
      agregarValorAlInput3("Clasificacion_Interna", puesto_detalle[i][14]);
      agregarValorAlInput3("Contratacion", puesto_detalle[i][16]);
      agregarValorAlInput3("Declaracion", puesto_detalle[i][18]);
      agregarValorAlInput2("UsuarioCapturo", puesto_detalle[i][23]);
      agregarValorAlInput2("FechaIni", convertirFecha(puesto_detalle[i][20]));
      agregarValorAlInput2("FechaMod", convertirFecha(puesto_detalle[i][24]));
      agregarValorAlInput2("UsuarioUltMod", puesto_detalle[i][26]);
      guardarBtnSeleccionar(); // Servicio
      agregarValorAlInput2("FechaFin", convertirFecha(puesto_detalle[i][21]));

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



/**Llenado de los campos */

async function consultarPuestoDetalle() {

  const request = await fetch('api/ctg_lstpuestoDos/datos', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const puesto_detalle = await request.json();
  //console.log( puesto_detalle);

  // Se modifico para que limpiara antes de poner el Selecciona una opcion Servicio
  $('#Tipo').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Zona').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Nivel').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Categoria').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Subcategoria').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Clasificacion_Interna').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Contratacion').empty().append('<option value="" disabled selected>Selecciona una opción</option>');
  $('#Declaracion').empty().append('<option value="" disabled selected>Selecciona una opción</option>');


  for (let detalle of puesto_detalle) {
    if (detalle.lpto_clase == 1 && detalle.lpto_situacion == 1) {

      $('#Tipo').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }

    if (detalle.lpto_clave <= 3 && detalle.lpto_situacion == 1 && detalle.lpto_clase == 2) {

      $('#Zona').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }
    if (detalle.lpto_situacion == 1 && detalle.lpto_clase == 3) { //detalle.lpto_clave <= 3 

      $('#Categoria').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }

    if (detalle.lpto_situacion == 1 && detalle.lpto_clase == 4) {

      $('#Subcategoria').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }

    if (detalle.lpto_situacion == 1 && detalle.lpto_clase == 5) {

      $('#Clasificacion_Interna').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }

    if (detalle.lpto_situacion == 1 && detalle.lpto_clase == 6) {

      $('#Contratacion').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }

    if (detalle.lpto_situacion == 1 && detalle.lpto_clase == 7) {

      $('#Declaracion').append('<option value = ' + detalle.lpto_clave + '>'
        + detalle.lpto_descripcion + '</option>');
    }


  } consultarDetalles();


}

async function consultarDetalles() {

  const request = await fetch('api/lst_niveles/datos', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  });

  const puesto_detalle = await request.json();



  for (let detalle of puesto_detalle) {
    if (detalle.nvl_situacion == 1) {

      $('#Nivel').append('<option value = ' + detalle.nvl_id + '>'
        + detalle.nvl_nivel + '</option>');
    }

  }

}
/**Fin llenado de los campos */


function ValorCombo() {
  // Obtener el elemento select por su ID
  var combo = document.getElementById("Nivel");

  // Obtener la opción seleccionada
  var opcionSeleccionada = combo.options[combo.selectedIndex];

  // Obtener el texto de la opción seleccionada
  var textoSeleccionado = opcionSeleccionada.text;

  // Mostrar el texto seleccionado en la consola (puedes hacer lo que quieras con él)
  //console.log("Texto seleccionado: " + textoSeleccionado);
}



let datosJSON = [];

// Primera función para crear el arreglo JSON


function crearArregloJSON() {
  // Agregar un retraso de un segundo antes de llenar el arreglo JSON
  setTimeout(function () {

    //var datosJSON = [];
    // Obtener los valores de los inputs
    var subcatego = document.getElementById('Subcategoria').value;
    var catego = document.getElementById('Categoria').value;
    var contratacion = document.getElementById('Contratacion').value;
    var tipo = document.getElementById('Tipo').value;
    var zona = document.getElementById('Zona').value;
    var nivel = document.getElementById('Nivel').value;
    var clasifInt = document.getElementById('Clasificacion_Interna').value;
    var declara = document.getElementById('Declaracion').value;


    datosJSON = [{
      pto_idpuesto: idPuesto,
      pto_idcodpuesto: idcodpuesto,
      pto_tipo: tipo,
      pto_zona: zona,
      pto_nivel: nivel,
      pto_categoria: catego,
      pto_subcategoria: subcatego,
      pto_clasfinterna: clasifInt,
      pto_contratacion: contratacion,
      pto_declaracion: declara,
      pto_fechainicio: fechaIni,
      pto_fechatermino: fechater,
      pto_usucapturo: usuCap,
      pto_fechamod: fechaMod,
      pto_usumodifico: UsuModi,
      pto_situacion: situacion
    }];




  }, 1000); // 1000 milisegundos equivalen a 1 segundo
}


// Segunda función para enviar el arreglo JSON mediante una solicitud POST a la API
function enviarDatosAPI() {
  // Realizar la solicitud POST a la API
  
  fetch('api/guardapuestoha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    
    body: JSON.stringify(datosJSON)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Hubo un problema con la solicitud');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta de la API:', data);
      // Hacer algo con la respuesta de la API si es necesario
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


