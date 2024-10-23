let idPersona = null;

let idUsuCapturo = null;
let nombre = null;
let curp = null;

let idBanco = null;
let idMoneda = null;
let idTipo = null;
let idPago = null;

let datosIniciales = null;

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

// INICIO llenar los datos de control
function datosControl() {
	$("#inptUltimoUsuarioCaptura").val(sessionStorage.nombre);

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#fechaModifico").val(fechaHoy);
	var inputSituacion = document.getElementById('situacion');
	inputSituacion.value = "ACTIVO";
}
// FIN llenar los datos de control

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

    if (datosCtaBancpersona === null) {
        swal({
          title: "No hay datos disponibles",
          text: "No se encontraron datos para mostrar",
          icon: 'error',
          button: 'Aceptar'
          });
        return;
      }

    limpiarInputs();
    desbloquearInputs();
	datosControl();

	idBanco = datosCtaBancpersona[1];
	idMoneda = datosCtaBancpersona[4];
	idTipo = datosCtaBancpersona[5];
	idPago = datosCtaBancpersona[6];
    idUsuCapturo = datosCtaBancpersona[9];
	// api/ctabancper/0idper/1banco/2clave/3cuenta/4moneda/5tipo/6modpago/7fechainc/8fechater/9usuariocap/10fechamod/11usuariomod/12situacion

    const inputBancos = $('#inptBancos');
    const inputMoneda = $('#inptMoneda');
    const inputTipo = $('#inptTipo');
    const inputPago = $('#inptModoPago');

    inputBancos.empty();
    inputMoneda.empty();
    inputTipo.empty();
    inputPago.empty();

    //Bancos
    const bancoRequest = await fetch('api/bancos/clave/nombre');
	const bancoData = await bancoRequest.json();
	bancoData.forEach(item => {
            inputBancos.append(`<option value="${item[0]}">${item[1]}</option>`);
    });
    inputBancos.val(datosCtaBancpersona[1]);

    inputBancos.on('change', async function() {
		idBanco = $(this).val();
	});

    //Moneda
    const monedaRequest = await fetch('api/ctg_lstctabanper/moneda/clave/descripcion');
	const monedaData = await monedaRequest.json();
    monedaData.forEach(item => {
        inputMoneda.append(`<option value="${item[0]}">${item[1]}</option>`);
    });
    inputMoneda.val(datosCtaBancpersona[4]);

	inputMoneda.on('change', async function() {
		idMoneda = $(this).val();
	});

    //Tipo
    const tipoRequest = await fetch('api/ctg_lstctabanper/tipo/clave/descripcion');
	const tipoData = await tipoRequest.json();
    tipoData.forEach(item => {
        inputTipo.append(`<option value="${item[0]}">${item[1]}</option>`);
    });
    inputTipo.val(datosCtaBancpersona[5]);

	inputTipo.on('change', async function() {
		idTipo = $(this).val();
	});

    //Pago
    const pagoRequest = await fetch('api/ctg_lstctabanper/modopago/clave/descripcion');
	const pagoData = await pagoRequest.json();
    pagoData.forEach(item => {
        inputPago.append(`<option value="${item[0]}">${item[1]}</option>`);
    });
    inputPago.val(datosCtaBancpersona[6]);

	inputPago.on('change', async function() {
		idPago = $(this).val();
	});

    let situacion = datosCtaBancpersona[12];

    if(situacion === 1){
	    situacion = "ACTIVO";
	} else if (situacion === 2) {
	    situacion = "BAJA";
	}

	let cuentaBanco = datosCtaBancpersona[3];
	// console.log("Número de cuenta sin formato:", cuentaBanco);

	// // Verifica si la longitud es menor que 20
	// if (cuentaBanco.length < 20) {
	// 	// Calcula cuántos ceros se necesitan agregar
	// 	const cerosNecesarios = 20 - cuentaBanco.length;
	// 	// Agrega ceros a la izquierda para la visualización
	// 	cuentaBanco = '0'.repeat(cerosNecesarios) + cuentaBanco;
	// }
	// console.log("Número de cuenta con formato:", cuentaBanco);

	document.getElementById('intpCurp').value = curp;
	document.getElementById('inptNombre').value = nombre;

	document.getElementById('inptClaveInter').value = datosCtaBancpersona[2];
	document.getElementById('inptCuenta').value = cuentaBanco;

	document.getElementById('fechaInicio').value = datosCtaBancpersona[7];
	document.getElementById('fechaTermino').value = datosCtaBancpersona[8];
    document.getElementById('inptUsuarioCaptura').value = datosCtaBancpersona[13];
	// api/ctabancper/0idper/1banco/2clave/3cuenta/4moneda/5tipo/6modpago/7fechainc/8fechater/9usuariocap/10fechamod/11usuariomod/12situacion

}
// FIN funcion para llenar los inputs


// INICIO funcion para obtener los datos para luego comprarlos
function obtenerDatos() {
	let inptCuenta = document.getElementById("inptCuenta").value;
    let inptClaveInter = document.getElementById("inptClaveInter").value;

	return {
        ctab_idpersona:idPersona,
        ctab_banco:idBanco,
        ctab_cuenta:inptCuenta,
        ctab_clabeinter:inptClaveInter,
        ctab_moneda:idMoneda,
        ctab_tipo:idTipo,
        ctab_modpago:idPago
	};
}
// FIN funcion para obtener los datos para luego comprarlos

// INICIO funcion para guardar los datos iniciales
function guardarDatosIniciales() {
	datosIniciales = JSON.stringify(obtenerDatos());
}
// FIN funcion para guardar los datos iniciales

// INICIO funcion para comprar los Datos inciales y finales
function compararDatos() {
	let datosFinales = JSON.stringify(obtenerDatos());

	console.log('Datos iniciales', datosIniciales);
	console.log('Datos finales', datosFinales);

	if (datosIniciales === datosFinales) {

		swal({
			title: '¿Estás seguro?',
			text: 'No se ha realizado ningún cambio.',
			icon: 'warning',
			dangerMode: true
		})
			.then((willDelete) => {
				if (willDelete) {
				}
			});
		return;
	} else {
		guardarDatos();
	}
}
// FIN funcion para comprar los Datos inciales y finales

// INICIO funcion para limpiar
function limpiarInputs() {
	const inputId = ['buscarPersona', 'intpCurp', 'inptNombre', 'inptBancos', 'inptCuenta', 'inptClaveInter', 'inptMoneda','inptTipo','inptModoPago'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}
	});
}
// FIN funcion para limpiar

// INICIO bloquear y agregr input-valid a los inputs
function desbloquearInputs() {
	const inputId = ['inptBancos','inptCuenta','inptClaveInter','inptMoneda','inptTipo','inptModoPago'];

	inputId.forEach(id => {
		const inputElement = document.getElementById(id);

        $('#btnGuardar').prop('disabled', false);
        $('#btnCancelar').prop('disabled', false);

		$('#btnBuscar').prop('disabled', true);
		$('#buscarPersona').prop('disabled', true);
		inputElement.classList.add('input-valid');
		inputElement.disabled = false;

		if (inputElement.tagName.toLowerCase() === 'input') {
			inputElement.value = '';
		}

		setTimeout(() => {
			inputElement.classList.remove('input-valid');
		}, 1000);
	});
}
// FIN bloquear y agregr input-valid a los inputs

// INICIO funcion del boton guardar
btnBuscar.addEventListener('click',async function() {
	await fillCtaBancPersona();
	guardarDatosIniciales();
});
// FIN funcion del boton guardar

// Validaciones
// Numero de Cuenta - Solo numeros y longitud 
function validarCuenta(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    // Cancelar temporizador existente y ocultar tooltips después de 2 segundos
    clearTimeout(input.tooltipTimeout);
    input.tooltipTimeout = setTimeout(function() {
        $(input).tooltip('dispose');
    }, 1500);

    // Ocultar tooltips existentes
    $(input).tooltip('dispose');

    if (valor !== soloNumeros) {
        $(input).tooltip({
            title: 'Solo se aceptan números',
            placement: 'top',
            trigger: 'manual',
            delay: { show: 500, hide: 200 },
            container: 'body',
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
        }).tooltip('show');
    }

    // Limitar a 20 caracteres después de que el usuario haya ingresado el valor completo
    if (valor.length >= 20) {
        soloNumeros = soloNumeros.substring(0, 20);

        // Mostrar el segundo tooltip solo si es necesario
        if (valor.length > 20) {
            $(input).tooltip({
                title: 'Son máximo 20 números',
                placement: 'top',
                trigger: 'manual',
                delay: { show: 500, hide: 200 },
                container: 'body',
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
            }).tooltip('show');
        }
    }

    input.value = soloNumeros;
}

// Clave Inter - Solo numeros y longitud 
function validarClaveInt(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/\D/g, ''); // Eliminar caracteres no numéricos

    // Cancelar temporizador 
    clearTimeout(input.tooltipTimeout);
    input.tooltipTimeout = setTimeout(function() {
        $(input).tooltip('dispose');
    }, 1500);

    if (valor !== soloNumeros) {
        $(input).tooltip({
            title: 'Solo se aceptan números',
            placement: 'top',
            trigger: 'manual',
            delay: { show: 500, hide: 200 },
            container: 'body',
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
        }).tooltip('show');
    }

    // Limitar a 18 caracteres después de que el usuario haya ingresado el valor completo
    if (valor.length >= 18) {
        soloNumeros = soloNumeros.substring(0, 18);

        // Mostrar el segundo tooltip solo si es necesario
        if (valor.length > 18) {
            $(input).tooltip({
                title: 'Son máximo 18 números',
                placement: 'top',
                trigger: 'manual',
                delay: { show: 500, hide: 200 },
                container: 'body',
                template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-danger text-white"></div></div>'
            }).tooltip('show');
        }
    }

    input.value = soloNumeros;
}

function guardarDatos(){

    const arrayInputs = [
        { id: "inptBancos", mensage: "Por favor, seleccione un bancos." },
        { id: "inptCuenta", mensage: "Por favor, ingrese una cuenta." },
        { id: "inptClaveInter", mensage: "Por favor, ingrese una clave bancaria." },
        { id: "inptMoneda", mensage: "Por favor, seleccione una moneda." },
        { id: "inptTipo", mensage: "Por favor, seleccione un tipo." },
        { id: "inptModoPago", mensage: "Por favor, ingrese un modo de pago." }
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

    const inputClaveInter = document.getElementById("inptClaveInter");
    const inputCuenta = document.getElementById("inptCuenta");

    // Validación para inptClaveInter
    if (inputClaveInter.value.length !== 18) {
        inputClaveInter.classList.add('input-invalid');

        swal({
            title: "Faltan dígitos en el campo Clave Interbancaria",
            icon: 'error',
            button: 'Aceptar'
        });

        return;

    }

    // Validación para inptCuenta
    if (inputCuenta.value.length !== 20) { // Puedes ajustar la condición según tus necesidades
        inputCuenta.classList.add('input-invalid');

        swal({
            title: "Faltan dígitos en el campo Cuenta",
            icon: 'error',
            button: 'Aceptar'
        });

        return;
    }

    let inptCuenta = document.getElementById("inptCuenta").value;
    let inptClaveInter = document.getElementById("inptClaveInter").value;
    
	let inptFInicio = document.getElementById("fechaInicio").value;
    let inptFTermino = document.getElementById("fechaTermino").value;
    let inptUsrCap = idUsuCapturo;
	let inptFModificacion = document.getElementById("fechaModifico").value;
    let inptUsrMod = sessionStorage.idUsuario;
    let inptSituacion = 1;

    let data = { 
        ctab_idpersona:idPersona,
        ctab_banco:idBanco,
        ctab_cuenta:inptCuenta,
        ctab_clabeinter:inptClaveInter,
        ctab_moneda:idMoneda,
        ctab_tipo:idTipo,
        ctab_modpago:idPago,
        ctab_fechainicio:inptFInicio,
        ctab_fechatermino:inptFTermino,
        ctab_usucapturo:inptUsrCap,
        ctab_fechamod:inptFModificacion,
        ctab_usumodifico:inptUsrMod,
        ctab_situacion:inptSituacion
    };
    
    let datosJson = JSON.stringify(data); 
    
	let url = "api/ctabancper/modificar";

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

// INICIO funcion del boton guardar
btnGuardar.addEventListener('click', function() {
	compararDatos();
});
// FIN funcion del boton guardar

function cancelar() {
    location.reload();
}
