$(function() {
	MostrarPagina(5);
	if(sessionStorage.permisos == 1){
		$("#datosControl").prop("hidden", false);
	}
	
});

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
		
		if(nivelesSeleccionados[i][3] == 1){
			agregarValorAlInput("id_situacion", "ACTIVO");
			agregarValorAlInput("inpSituacion", "ACTIVO");

		} else {
			agregarValorAlInput("id_situacion", "INACTIVO");
			agregarValorAlInput("inpSituacion", "INACTIVO");

		}

		agregarValorAlInput("inpFechaInicio", nivelesSeleccionados[i][4]);
		agregarValorAlInput("inpFechaModificacion", nivelesSeleccionados[i][5]);

		if(nivelesSeleccionados[i][8] !== null){
			agregarValorAlInput("fechaTermino", nivelesSeleccionados[i][8]);
		}

		for(var j = 0; j < nombreusuario.length; j++){
			if(nombreusuario[j][0] == nivelesSeleccionados[i][6]){
				agregarValorAlInput("inpUsuarioCapturo", nombreusuario[j][1]);
			}
			if(nombreusuario[j][0] == nivelesSeleccionados[i][7]){
				agregarValorAlInput("inpUsuarioModifico", nombreusuario[j][1]);
			}
		}
	  }
	}

//INICIO funcion limpiar campos
function limpiarInputs() {
	document.getElementById('id_nivel').value = '';
	document.getElementById('id_zona').value = '';
	document.getElementById('id_situacion').value = '';
	document.getElementById('inpFechaInicio').value = '';
	document.getElementById('fechaTermino').value = '';
	document.getElementById('inpFechaModificacion').value = '';
	document.getElementById('inpUsuarioCapturo').value = '';
	document.getElementById('inpUsuarioModifico').value = '';
	document.getElementById('inpSituacion').value = '';
	swal("Buen trabajo!", "Los campos se limpiarón correctamente!", "success");
}

function limpiarBuscar() {
	document.getElementById('id_nivel').value = '';
	document.getElementById('id_zona').value = '';
	document.getElementById('id_situacion').value = '';
	document.getElementById('inpFechaInicio').value = '';
	document.getElementById('fechaTermino').value = '';
	document.getElementById('inpFechaModificacion').value = '';
	document.getElementById('inpUsuarioCapturo').value = '';
	document.getElementById('inpUsuarioModifico').value = '';
	document.getElementById('inpSituacion').value = '';
}

// Event Listener para el botón
document.getElementById('limpiarPuesto').addEventListener('click', limpiarInputs);
document.getElementById('botonBuscar').addEventListener('click', limpiarBuscar);
//FIN función limpiar campos

} 
