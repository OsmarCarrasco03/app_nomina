$('document').ready(function() {
	consultarPuestoDetalle();
	consultarInfo()
});

// Crear el elemento footer
let footer = document.createElement('footer');

// Añadir contenido al footer
footer.innerHTML = `
    <div class="footer-content" style="background-color:#13322b">
        <p style="color:white; text-align:center; font-size:15px">Copyright &copy; 2023. Financiera para el Bienestar, Todos los derechos reservados.</p>
    </div>
`;

// Añadir el footer al final del body
document.body.appendChild(footer);

let x;
let y;



async function consultarPuestoDetalle() {

	const request = await fetch('api/lstpuesto/consulta/puesto_detalle', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const puesto_detalle = await request.json();
	

	$('#Tipo').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Nivel').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Categoria').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Declaración').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Contratación').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Zona').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Escala').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#Estatus').append('<option value="" disabled selected>Selecciona una opción</option>');
	$('#agrupamiento').append('<option value="" disabled selected>Selecciona una opción</option>');


	for (let detalle of puesto_detalle) {
		if ( detalle.lpto_clase == 1 && detalle.lpto_situacion == 1) {

			$('#Tipo').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}

		if (detalle.lpto_clase == 2) {

			$('#Nivel').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		if (detalle.lpto_clase == 3) {

			$('#Categoria').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		if (detalle.lpto_clase == 4) {

			$('#Declaración').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		if (detalle.lpto_clase == 5) {

			$('#Contratación').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		if (detalle.lpto_clase == 6) {

			$('#Zona').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}

		if (detalle.lpto_clase == 7) {

			$('#Escala').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}
		if (detalle.lpto_clase == 8) {

			$('#Estatus').append('<option value = ' + detalle.lpto_clave + '>'
				+ detalle.lpto_descripcion + '</option>');
		}

	}

}

/*-------------------obtencion de la fecha--------------------------*/

function obtenerFechaActual() {
	const fecha = new Date();
	const dia = String(fecha.getDate()).padStart(2, '0');
	const mes = String(fecha.getMonth() + 1).padStart(2, '0');
	const año = fecha.getFullYear();

	return `${dia}/${mes}/${año}`;
}


const fechaInput = document.getElementById('fechaInicio');
fechaInput.value = obtenerFechaActual();


/*-----------------Fin de la obtencion de la fecha-------------------------*/

/*-----------------Inicio obtener valor del id-------------------------*/

const comboBox = document.getElementById("Tipo");

let valorSeleccionado;

comboBox.addEventListener("change", function() {
	valorSeleccionado = comboBox.value;

	
	consultarInfo(valorSeleccionado)
});
/*-----------------Fin obtener valor del id-------------------------*/

/**Inicio captura de los combobox **/

const comboBoxTipo = document.getElementById("Tipo");
const comboBoxGrufunyxresp = document.getElementById("grufunyxresp");

let valorTipoSeleccionado;
let valorGrufunyxrespSeleccionado;

function consultarInfoSiNecesario() {
    if (valorTipoSeleccionado !== undefined && valorGrufunyxrespSeleccionado !== undefined) {
        consultarInfo2(valorTipoSeleccionado, valorGrufunyxrespSeleccionado);
        
    }
}

comboBoxTipo.addEventListener("change", function () {
    valorTipoSeleccionado = comboBoxTipo.value;
    consultarInfoSiNecesario();
});

comboBoxGrufunyxresp.addEventListener("change", function () {
    valorGrufunyxrespSeleccionado = comboBoxGrufunyxresp.value;
    consultarInfoSiNecesario();
});


/**Fin captura de los combobox **/



async function consultarInfo(x) {

	const request = await fetch('api/lstgrupfunyxresp/consulta/datos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const info = await request.json();	
	 	
	
	  let optionAdded = true;
	  $('#grufunyxresp').empty();
	  $('#grufunyxresp').append('<option value="" disabled selected>Selecciona una opción</option>');

	for (let detalle of info) {
		
		if (x == detalle.lgrup_tipopuesto) {
            $('#grufunyxresp').append('<option value = ' + detalle.lgrup_clave + '>'
                + detalle.lgrup_descripcion + '</option>');
            optionAdded = false; 
        }  

	}	

};



async function consultarInfo2(x, y) {

	const request = await fetch('api/lstagrupamiento/consulta/datos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const info = await request.json();
	
	let optionAdded1 = false;
	$('#agrupamiento').empty();
	$('#agrupamiento').append('<option value="" disabled selected>Selecciona una opción</option>');


	for (let detalle of info) {
		
		
		if (x == detalle.lagru_tipopuesto  && y == detalle.lagru_tipogrupfun) {
			
			$('#agrupamiento').append('<option value = ' + detalle.lagru_clave + '>'
					+ detalle.lagru_descripcion + '</option>');
			optionAdded1 = true;
			}
	}
	/*if (!optionAdded1) {
        $('#agrupamiento').append('<option value="" disabled selected>Selecciona una opción</option>');
    }*/

};

/**Funcion de Sergio **/

async function buscarPuesto(){
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
	
	if(!verificarJson(puestos)){
		$( '#modificarPuesto' ).removeAttr('disabled');
	}
	
	for (let puesto of puestos) {
		
		$('#codigoPuesto').val(puesto.ctgp_codigo);
		$('#descripcion').val(puesto.ctgp_descripcion);
		$('#fechaInicio').val(puesto.ctgp_fechainicio);
		$('#fechaTermino').val(puesto.ctgp_fechatermino);
		$('#fechaModificacion').val(puesto.ctgp_fechamod);
		$('#usuarioCapturo').val("Administrador");
		
		if(puesto.ctgp_situacion === 1){
			$('#situacion').val("Activo");
		}else{
			$('#situacion').val("Inactivo");
		}
	}
}

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
            }
        }
    }
});

function limpiarCampos() {
 
  var elementosFormulario = document.querySelectorAll('input, textarea, select');

  
  elementosFormulario.forEach(function(elemento) {
    elemento.value = '';
  });
}

document.getElementById('limpiarBoton').addEventListener('click', function() {
  limpiarCampos();
});


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
  } else {
    swal("Puedes seguir editando");
  }
});
}

document.getElementById('botonCancelar').addEventListener('click', function() {
  Cancelar();
});



