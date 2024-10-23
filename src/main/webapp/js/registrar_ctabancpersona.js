let idPersona = null;
let idBanco = null;
let idMoneda = null;
let idTipo = null;
let idPago = null;

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
    //const { combinedValues, idMap } = await autocompletarPersona();
    const autoCompleteInput = document.getElementById('buscarPersona');
    const curpInput = document.getElementById('intpCurp');// agregado
    const nombreInput = document.getElementById('inptNombre'); // agregado

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
                    autoCompleteInput.value = '';

                    // Agregado
                    const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
                    curpInput.value = selectedPerson[1];
                    nombreInput.value = `${selectedPerson[3]} ${selectedPerson[4]} ${selectedPerson[2]}`;

                    idPersona = idMap[selection];
                    nuevaBusqueda();
                }
            }
        }
    });
}
iniciarAutoComplete();

// Llenar los datos de control
function datosControl() {
    $("#inptUsuarioCaptura").val(sessionStorage.nombre);
    $("#inptUltimoUsuarioCaptura").val(sessionStorage.nombre);

    var fechaHoy = new Date().toISOString().split('T')[0];
    $("#fechaModifico").val(fechaHoy);

    $("#fechaInicio").val(fechaHoy);
    var inputSituacion = document.getElementById('situacion');
    inputSituacion.value = "ACTIVO";
}

// funciones para cargar los select
async function cargarBancos() {
    const requestBancos = await fetch('api/bancos/clave/nombre', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

    const bancos = await requestBancos.json();

    const nombreBancos = bancos.map(item => item[1]);
    const banClave = bancos.map(item => item[0]);
    
    const inputBancos = document.getElementById('inptBancos');
   
    $('#inptBancos').empty();
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.text = 'Selecciona una opción';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    inputBancos.add(optionDefault);

    nombreBancos.forEach((nombre, index) => {
        const option = document.createElement('option');
        option.value = nombre;
        option.text = nombre;
        option.dataset.bancosId = banClave[index];
        inputBancos.add(option);
    });
    
    inputBancos.addEventListener('change', guardarIdBanco); 
}

function guardarIdBanco() {
    const inputBancos = document.getElementById('inptBancos');
    const selectedOption = inputBancos.options[inputBancos.selectedIndex];
    idBanco = selectedOption.dataset.bancosId;
}

async function cargarMoneda() {
    const requestMoneda = await fetch('api/ctg_lstctabanper/moneda/clave/descripcion', {
        method: 'GET',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

   const moneda = await requestMoneda.json();
   
   const nombreMoneda = moneda.map(item => item[1]);
   const monedaClave = moneda.map(item => item[0]);
   
   const inputMoneda = document.getElementById('inptMoneda');
  
   $('#inptMoneda').empty();
   const optionDefault = document.createElement('option');
   optionDefault.value = '';
   optionDefault.text = 'Selecciona una opción';
   optionDefault.disabled = true;
   optionDefault.selected = true;
   inputMoneda.add(optionDefault);

   nombreMoneda.forEach((nombre, index) => {
       const option = document.createElement('option');
       option.value = nombre;
       option.text = nombre;
       option.dataset.monedaId = monedaClave[index];
       inputMoneda.add(option);
   });
   
   inputMoneda.addEventListener('change', guardarMoneda); 
 
}

function guardarMoneda() {
   const inputMoneda = document.getElementById('inptMoneda');
   const selectedOption = inputMoneda.options[inputMoneda.selectedIndex];
   idMoneda = selectedOption.dataset.monedaId;
}

async function cargarTipo() {
    const requestTipo = await fetch('api/ctg_lstctabanper/tipo/clave/descripcion', {
        method: 'GET',
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });

   const tipo = await requestTipo.json();
   
   const nombreTipo = tipo.map(item => item[1]);
   const tipoClave = tipo.map(item => item[0]);
   
   const inputTipo = document.getElementById('inptTipo');
  
   $('#inptTipo').empty();
   const optionDefault = document.createElement('option');
   optionDefault.value = '';
   optionDefault.text = 'Selecciona una opción';
   optionDefault.disabled = true;
   optionDefault.selected = true;
   inputTipo.add(optionDefault);

   nombreTipo.forEach((nombre, index) => {
       const option = document.createElement('option');
       option.value = nombre;
       option.text = nombre;
       option.dataset.tipoId = tipoClave[index];
       inputTipo.add(option);
   });
   
   inputTipo.addEventListener('change', guardarTipo); 
 
}

function guardarTipo() {
   const inputTipo = document.getElementById('inptTipo');
   const selectedOption = inputTipo.options[inputTipo.selectedIndex];
   idTipo = selectedOption.dataset.tipoId;
}

async function cargarModoPago() {
     const requestModoPago = await fetch('api/ctg_lstctabanper/modopago/clave/descripcion', {
         method: 'GET',
         headers: { 
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
     });

    const modosPago = await requestModoPago.json();
    
    const nombrePago = modosPago.map(item => item[1]);
    const pagoClave = modosPago.map(item => item[0]);
    
    const inputModoPago = document.getElementById('inptModoPago');
   
    $('#inptModoPago').empty();
    const optionDefault = document.createElement('option');
    optionDefault.value = '';
    optionDefault.text = 'Selecciona una opción';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    inputModoPago.add(optionDefault);

    nombrePago.forEach((nombre, index) => {
        const option = document.createElement('option');
        option.value = nombre;
        option.text = nombre;
        option.dataset.pagoId = pagoClave[index];
        inputModoPago.add(option);
    });
    
    inputModoPago.addEventListener('change', guardarModoPago); 
  
}

function guardarModoPago() {
    const inputModoPago = document.getElementById('inptModoPago');
    const selectedOption = inputModoPago.options[inputModoPago.selectedIndex];
    idPago = selectedOption.dataset.pagoId;
}

//  ***   VALIDACIONES  ***
// Desbloquear inputs

function desbloquearInputs() {
    const inputIds = ['btnGuardar','inptBancos', 'inptCuenta', 'inptClaveInter', 'inptMoneda', 'inptTipo', 'inptModoPago'];
    const inputIdValid = ['intpCurp', 'inptNombre', 'inptBancos', 'inptCuenta', 'inptClaveInter', 'inptMoneda', 'inptTipo', 'inptModoPago'];

    const placeholders = {
        inptCuenta: "Ingrese la cuenta",
        inptClaveInter: "Ingrese la clave interbancaria",
    };

    inputIds.forEach(id => {
        const inputElement = document.getElementById(id);
        inputElement.placeholder = placeholders[id];
        inputElement.disabled = false;

        if (inputElement.tagName.toLowerCase() === 'input') {
            inputElement.value = '';
        }
    });

    inputIdValid.forEach(id => {
        const inputElementValid = document.getElementById(id);
        inputElementValid.classList.add('input-valid');

        setTimeout(() => {    
            inputElementValid.classList.remove('input-valid');
        }, 1000);
    });

    
}

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

const arrayInputs = [
    "inptBancos",
    "inptCuenta",
    "inptClaveInter",
    "inptMoneda",
    "inptTipo",
    "inptModoPago"
];

for (const inputsId of arrayInputs) {
    const input = document.getElementById(inputsId);
    input.addEventListener("input", function () {
        input.classList.remove('input-invalid');
    });
}

// INICIO funcion que laza un swal si tenemos campos llenos y pregunta si desea continuar
function nuevaBusqueda() {

    //const inputIds = ['inptBancos', 'inptCuenta', 'inptClaveInter', 'inptMoneda', 'inptTipo', 'inptModoPago'];
	const arrayInputs = [
		{ id: "inptBancos" },
		{ id: "inptCuenta" },
		{ id: "inptClaveInter" },
		{ id: "inptMoneda" },
		{ id: "inptTipo" },
		{ id: "inptModoPago" }
	];

	for (const inputsId of arrayInputs) {

		const input = document.getElementById(inputsId.id);
		const value = input.value;

		if (value !== '') {

			swal({
				title: '¿Estás seguro?',
				text: 'Se borrarán los cambios hechos',
				icon: 'warning',
				buttons: true,
				dangerMode: true
			})
				.then((willDelete) => {
					if (willDelete) {
    					cargarBancos();
                        cargarMoneda();
                        cargarModoPago();
                        cargarTipo();

                        desbloquearInputs();
                        datosControl();
					}
				});
			return;
		}
	}
	cargarBancos();
    cargarMoneda();
    cargarModoPago();
    cargarTipo();

    desbloquearInputs();
    datosControl();
}
// FIN funcion que laza un swal si tenemos campos llenos y pregunta si desea continuar


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
    //let inptFTermino = document.getElementById("fechaTermino").value;

    let inptUsrCap = sessionStorage.idUsuario;
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
        ctab_usucapturo:inptUsrCap,
        ctab_fechamod:inptFModificacion,
        ctab_usumodifico:inptUsrMod,
        ctab_situacion:inptSituacion
    };
    
    let cuentasDatosJson = JSON.stringify(data);
    
	let url = "api/subir/datos/ctabancpersona";

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


