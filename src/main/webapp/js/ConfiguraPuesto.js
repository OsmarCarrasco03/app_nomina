let idPuesto = null;
// Inicio Servicio Social 
// Remueve la clase invalid de los inputs 
const arrayInputs = [
    "Tipo",
    "Zona",
    "Nivel",
    "Categoria",
    "Subcateegoria",
    "Clasificación_Interna",
    "Contratacion",
    "Declaracion",
    "autoComplete"
];

for (const inputsId of arrayInputs) {
    const input = document.getElementById(inputsId);
    input.addEventListener("input", function () {
        input.classList.remove('input-invalid');
    });
}
// FIN SERVICIO

$('document').ready(function() {
	consultarPuestoDetalle();
	limpiarCampos()
	
});

/* Inicia funcion buscar puestos de Sergio / Llena los inputs*/ 
async function buscarPuesto(){
	/* Servicio
	if (autoCompleteJS.input.value.trim() === '') {
        swal({
            title: 'Por favor, ingrese un código o puesto para buscar.',
            icon: 'error',
            button: 'Aceptar',
        });
        return;
    }
    */ //fin servicio    
    
	$( '#codigoPuesto' ).prop( "disabled", true );
	$( '#descripcion' ).prop( "disabled", true );
	$( '#situacion' ).prop( "disabled", true );
	$( '#seleccionarSituacionDiv' ).prop( "hidden", true );
	$( '#situacionDiv' ).removeAttr('hidden');
	$( '#seleccionarSituacion' ).prop('selectedIndex', 0);
	
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
    console.log("hola soy puestos",puestos);
    idPuesto = puestos[0].ctgp_id;
	console.log(idPuesto);
	// SERVICIO
	
		if (puestos.length === 0) {

			swal({

				title: 'Por favor, ingrese un dato válido.',
				icon: 'error',
				button: 'Aceptar'

			});

			return;

		}
		
	//
	if(!verificarJson(puestos)){
		$( '#modificarPuesto' ).removeAttr('disabled');
	}else{
		
	}
	
	for (let puesto of puestos) {
		
		$('#codigoPuesto').val(puesto.ctgp_codigo);
		$('#descripcion').val(puesto.ctgp_descripcion);
		
		if(puesto.ctgp_situacion === 1){
			$('#situacion').val("Activo");
		}else{
			$('#situacion').val("Inactivo");
		}
	}
	
    datosControl();
    desbloquearInputs();	
    $( '#habilitarBusqueda' ).prop( "disabled", false );
}
// Fin de buscar puesto 

const verificarJson = (nombreJson) => {
  return Object.keys(nombreJson).length === 0
}

async function autocompletarPuestos() {

	const request = await fetch('api/puestos/consulta/', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const puestos = await request.json();
	
	let stringDatos = '';
	
	for (let puesto of puestos) {
		stringDatos += puesto.ctgp_codigo +  ' - ' + puesto.ctgp_descripcion + ';';
	}
	
	let arrayDatos  = stringDatos.split(";");
	
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
                
                // SERVICIO
                autoCompleteJS.input.disabled = true; // Servicio
                autoCompleteJS.input.classList.remove("input-invalid"); // Servicio
                

            }
        }
    }
});

// Boton habilitar 
document.getElementById("habilitarBusqueda").addEventListener("click", function () {
    swal({
        title: "¿Estas seguro de realizar una nueva busqueda?",
        text: "Una vez que lo hagas tendrias que voler a comenzar",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Todos los campos han sido borrados", {
            icon: "success",
          });
          autoCompleteJS.input.disabled = false;
          autoCompleteJS.input.value = "";

          document.getElementById("codigoPuesto").value = "";
          document.getElementById("descripcion").value = "";
	      document.getElementById("situacion").value = "";

          autoCompleteJS.input.classList.add("input-invalid");
          limpiarCampos();
          bloquearInputs();
          $( '#habilitarBusqueda' ).prop( "disabled", true );
        } else {
          swal("Puedes seguir editando");
        }
      });
    
});

/* Finaliza funcion buscar puestos de Sergio */

/* Boton cancelar */
function Cancelar() {
swal({
  title: "¿Estas seguro de Cancelar?",
  text: "Una vez que lo hagas tendrias que voler a comenzar",
  icon: "warning",
  buttons: ["Cancelar", "Aceptar"],
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal("Todos los campos han sido borrados", {
      icon: "success",
    });
    limpiarCampos();
    bloquearInputs();
  } else {
    swal("Puedes seguir editando");
  }
});

}

document.getElementById('botonCancelar').addEventListener('click', function() {
  Cancelar();
});
/**Fin boton cancelar */

/**Boton limpiar */
function limpiarCampos() {

  var elementosFormulario = document.querySelectorAll('input, textarea, select');

  
  elementosFormulario.forEach(function(elemento) {
    elemento.value = '';
  });
  
    autoCompleteJS.input.disabled = false;
    autoCompleteJS.input.value = "";

    // document.getElementById("codigoPuesto").value = "";
    // document.getElementById("descripcion").value = "";
	// document.getElementById("situacion").value = "";
}

/**Fin boton Limpiar */

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
	console.log( puesto_detalle);

	$('#Tipo').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Zona').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Nivel').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Categoria').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Subcateegoria').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Clasificación_Interna').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Contratacion').append('<option value="" disabled selected>Selecciona una opción</option>');	
	$('#Declaracion').append('<option value="" disabled selected>Selecciona una opción</option>');
	
	for (let detalle of puesto_detalle) {
		if ( detalle.lpto_clase == 1 && detalle.lpto_situacion == 1) {

			$('#Tipo').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		
		if ( detalle.lpto_clave <= 3 && detalle.lpto_situacion == 1 && detalle.lpto_clase == 2) {

			$('#Zona').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		if (  detalle.lpto_situacion == 1 && detalle.lpto_clase == 3) { //detalle.lpto_clave <= 3 

			$('#Categoria').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}	
		
		if (  detalle.lpto_situacion == 1 && detalle.lpto_clase == 4) { 

			$('#Subcateegoria').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}	
		
		if (  detalle.lpto_situacion == 1 && detalle.lpto_clase == 5) { 

			$('#Clasificación_Interna').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		
		if (  detalle.lpto_situacion == 1 && detalle.lpto_clase == 6) { 

			$('#Contratacion').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		
		if (  detalle.lpto_situacion == 1 && detalle.lpto_clase == 7) { 

			$('#Declaracion').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
			
	}consultarDetalles();

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
		if ( detalle.nvl_situacion == 1) {

			$('#Nivel').append('<option value = ' + detalle.nvl_id + '>'
				+ detalle.nvl_nivel + '</option>');
		}				

	}
}
/**FIN llenado de los campos */

// Llenar los datos de control
function datosControl() {
    $("#inptUsuarioCaptura").val(sessionStorage.nombre);
    $("#inptUltimoUsuarioCaptura").val(sessionStorage.nombre);

    var fechaHoy = new Date().toISOString().split('T')[0];
    $("#fechaModifico").val(fechaHoy);

    $("#fechaInicio").val(fechaHoy);
    var inputSituacion = document.getElementById('situacionDatosControl');
    inputSituacion.value = "ACTIVO";
}
//fin datos control 

function botonGenerarReporte() {
	const arrayInputs = [
        { id: "Tipo", mensage: "Por favor, no deje el campo Tipo vacío." },
        { id: "Zona", mensage: "Por favor, no deje el campo Zona vacío." },
        { id: "Nivel", mensage: "Por favor, no deje el campo Nivel vacío." },
        { id: "Contratacion", mensage: "Por favor, no deje el campo Contratacion vacío." },
        { id: "Categoria", mensage: "Por favor, no deje el campo Categoria vacío." },
        { id: "Subcateegoria", mensage: "Por favor, no deje el campo Subcateegoria vacío." },
        { id: "Clasificación_Interna", mensage: "Por favor, no deje el campo Clasificacion Interna vacío." },
        { id: "Declaracion", mensage: "Por favor, no deje el campo Declaracion vacío." }
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

    console.log("1 los id se limpiaron");
    
	//SERVICIO
	let inptTipo = document.getElementById("Tipo").value;
    let inptZona = document.getElementById("Zona").value;
    let inptNivel = document.getElementById("Nivel").value;
    let inptContratacion = document.getElementById("Contratacion").value;
    
    let inptCategoria = document.getElementById("Categoria").value;
    let inptSubcateegoria = document.getElementById("Subcateegoria").value;
    let inptClasificación_Interna = document.getElementById("Clasificación_Interna").value;
    let inptDeclaracion = document.getElementById("Declaracion").value;
    
    let inptFInicio = document.getElementById("fechaInicio").value;
    let inptUsrCap = sessionStorage.idUsuario;
	let inptFModificacion = document.getElementById("fechaModifico").value;
    let inptUsrMod = sessionStorage.idUsuario;
    let inptSituacion = 1;

    console.log("2 datos gurdados en variables");

	 let data = { 
	 	// pto_id:, Esta variable no se envia , se genera sola 
	 	pto_idcodpuesto:idPuesto,
        pto_tipo:inptTipo,
        pto_zona:inptZona,
        pto_nivel:inptNivel,
        pto_contratacion:inptContratacion,
        pto_categoria:inptCategoria,
        pto_subcategoria:inptSubcateegoria,
        pto_clasfinterna:inptClasificación_Interna,
        pto_declaracion:inptDeclaracion,
	 	pto_fechainicio:inptFInicio,
	 	pto_usucapturo:inptUsrCap,
	 	pto_fechamod:inptFModificacion,
	 	pto_usumodifico:inptUsrMod,
	 	pto_situacion:inptSituacion
    };
   // console.log("3 se creo el arreglo");

	//console.log(data);
	let newData = JSON.stringify(data);
    //console.log("4 se creo el Json");
	//console.log(newData);
    
	let url = "api/subir/datos/sn_cfgpuesto";

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
            return swal({
                title: "Advertencia",
                text: data,
                icon: "warning",
                button: "Aceptar"
            });
        } else {
            return swal({
                title: "El registro fue exitoso",
                text: "Buen trabajo !!",
                icon: "success",
                button: "Aceptar"
            });
        }
    })
    .then(() => {
        location.reload();
    })
    .catch(error => {
        console.error('Error:', error);
        swal("Oops!", "Something went wrong!", "error");
    });
    
}

function desbloquearInputs() {
    const inputIds = ['Tipo','Zona', 'Nivel', 'Contratacion', 'Categoria', 'Subcateegoria', 'Clasificación_Interna', 'Declaracion', 'botonRegistar', 'botonCancelar', 'limpiarBoton'];

    inputIds.forEach(id => {
        const inputElement = document.getElementById(id);
        inputElement.disabled = false;
    });
}

function bloquearInputs() {
    const inputIds = ['Tipo','Zona', 'Nivel', 'Contratacion', 'Categoria', 'Subcateegoria', 'Clasificación_Interna', 'Declaracion', 'botonRegistar', 'botonCancelar', 'limpiarBoton'];

    inputIds.forEach(id => {
        const inputElement = document.getElementById(id);
        inputElement.disabled = true;
    });
}


