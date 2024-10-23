let idPersona = null;
let nombre = null;
let curp = null;

async function autocompletarPersona() {
    const request = await fetch('api/personas/id/curp/nombre/apellidos', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const data = await request.json();

    const combinedValues = data.map(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}`);

    const idMap = {};
    data.forEach(item => {
        const combinedValue = `${item[1]} - ${item[3]} ${item[4]} ${item[2]}`;
        idMap[combinedValue] = item[0];
    });

    //return { combinedValues, idMap };
    return { combinedValues, idMap, data };
}

async function iniciarAutoComplete() {
    const { combinedValues, idMap, data } = await autocompletarPersona(); 
    const autoCompleteInput = document.getElementById('buscarPersona');

    const autoCompleteJS = new autoComplete({
        selector: "#buscarPersona",
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

                    // Agregado
                    const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
                    curp = selectedPerson[1];
                    nombre = `${selectedPerson[3]} ${selectedPerson[4]} ${selectedPerson[2]}`;

                    idPersona = idMap[selection];
                }
            }
        }
    });
}
iniciarAutoComplete();

// INICIO funcion para llenar los inputs
async function fillCtaBancPersona() {
	const request = await fetch('api/ctabancper/datos', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const data = await request.json();

	const datosFiltrados = data.filter(item => item[0] === idPersona);
	const datosCtaBancpersona = datosFiltrados.length > 0 ? datosFiltrados[0] : null;

    console.log(datosCtaBancpersona);

    if (datosCtaBancpersona === null) {
        swal({
          title: "No hay datos disponibles",
          text: "No se encontraron datos para mostrar",
          icon: 'error',
          button: 'Aceptar'
          });
        return;
      }

    //Bancos
    const bancoRequest = await fetch('api/bancos/clave/nombre');
	const bancoData = await bancoRequest.json();
	const bancoFilter = bancoData.filter(item => item[0] === datosCtaBancpersona[1]);
	const bancoNombre = bancoFilter[0][1];

    //Moneda
    const monedaRequest = await fetch('api/ctg_lstctabanper/moneda/clave/descripcion');
	const monedaData = await monedaRequest.json();
	const monedaFilter = monedaData.filter(item => item[0] === datosCtaBancpersona[4]);
	const monedaNombre = monedaFilter[0][1];

    //Tipo
    const tipoRequest = await fetch('api/ctg_lstctabanper/tipo/clave/descripcion');
	const tipoData = await tipoRequest.json();
	const tipoFilter = tipoData.filter(item => item[0] === datosCtaBancpersona[5]);
	const tipoNombre = tipoFilter[0][1];

    //Pago
    const pagoRequest = await fetch('api/ctg_lstctabanper/modopago/clave/descripcion');
	const pagoData = await pagoRequest.json();
	const pagoFilter = pagoData.filter(item => item[0] === datosCtaBancpersona[6]);
	const pagoNombre = pagoFilter[0][1];

    let situacion = datosCtaBancpersona[12];

    if(situacion === 1){
	    situacion = "ACTIVO";
	} else if (situacion === 2) {
	    situacion = "BAJA";
	}

	document.getElementById('intpCurp').value = curp;
	document.getElementById('inptNombre').value = nombre;
	document.getElementById('inptBancos').value = bancoNombre;

    document.getElementById('inptClaveInter').value = datosCtaBancpersona[2];
	document.getElementById('inptCuenta').value = datosCtaBancpersona[3];
    
	document.getElementById('inptMoneda').value = monedaNombre;
    document.getElementById('inptTipo').value = tipoNombre;
	document.getElementById('inptModoPago').value = pagoNombre;

	document.getElementById('fechaInicio').value = datosCtaBancpersona[7];
	document.getElementById('fechaTermino').value = datosCtaBancpersona[8];
    document.getElementById('inptUsuarioCaptura').value = datosCtaBancpersona[13];
    document.getElementById('fechaModifico').value = datosCtaBancpersona[10];
	document.getElementById('inptUltimoUsuarioCaptura').value = datosCtaBancpersona[14];
	document.getElementById('situacion').value = situacion;

	// api/ctabancper/0idper/1banco/2clave/3cuenta/4moneda/5tipo/6modpago/7fechainc/8fechater/9usuariocap/10fechamod/11usuariomod/12situacion

}
// FIN funcion para llenar los inputs


// INICIO funcion para limpiar
function limpiarInputs() {

	const inputId = ['buscarPersona', 'intpCurp', 'inptNombre', 'inptBancos', 'inptCuenta', 'inptClaveInter', 'inptMoneda','inptTipo','inptModoPago','fechaInicio','fechaTermino','inptUsuarioCaptura', 'fechaModifico','inptUltimoUsuarioCaptura','situacion'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}
	});
}
// FIN funcion para limpiar

// INICIO funcion del boton guardar
btnBuscar.addEventListener('click', function() {
	limpiarInputs();
	fillCtaBancPersona();
});
// FIN funcion del boton guardar

