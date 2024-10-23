$(function () {
    MostrarPagina(26);
    if (sessionStorage.permisos == 1) {
        $("#DatosControl-tab").prop("hidden", false);

    }
    opcionesTipo();
    opcionesFactor();
    opcionesNomina();
    opcionesTemporalidad();
    iniciarAutoComplete();
    EjercicioActual();
    PeriodoActual();
});

let valortipo;
let factorV;
let Contempo;
let anioFinal;
let idPersona = null;
let situa = null;

async function opcionesTipo() {
    const request = await fetch("api/lstcptosdenomina/tipoconcepto", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const tipo = await request.json();


    $("#Tipo").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    $("#Concepto").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    $("#ConceptoAntecedente").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

   // console.log(tipo);

    for (let detalle of tipo) {

        
        $("#Tipo").append("<option value = " + detalle[0] + ">" + detalle[0] + " - " + detalle[1] + "</option>");

    }
    $("#Tipo").change(function () {
        // Obtener el valor seleccionado
        var valorSeleccionado = $(this).val();

        valortipo = $(this).find("option:selected").text().split(" - ")[0];
        opcionesConcepto();
        opcionesConceptoAnte();

    });

}

async function opcionesConcepto() {

    $("#Concepto").empty();

    const request = await fetch("api/cptosdenomina/conceptos", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const concepto = await request.json();


    $("#Concepto").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    for (let detalle of concepto) {

        if (detalle[2] == valortipo) {
            $("#Concepto").append("<option value = " + detalle[0] + ">" + detalle[0] + " - " + detalle[1] + "</option>");
        }
    }

}

async function opcionesConceptoAnte() {

    $("#ConceptoAntecedente").empty();

    const request = await fetch("api/cptosdenomina/conceptosAnt", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const conceptoAnt = await request.json();
    


    $("#ConceptoAntecedente").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    for (let detalle of conceptoAnt) {

        $("#ConceptoAntecedente").append("<option value = " + detalle[0] + ">" + detalle[0] + "</option>");

    }

}

async function opcionesFactor() {

    $("#TipoFactor").empty();

    const request = await fetch("api/ctglstconvar/factor", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const factor = await request.json();


    $("#TipoFactor").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );




    for (let detalle of factor) {

        if (detalle[0] == 2) {

            $("#TipoFactor").append("<option value = " + detalle[1] + ">" + detalle[1] + " - " + detalle[2] + "</option>");

        }

    }

    $("#TipoFactor").change(function () {
        // Obtener el valor seleccionado
        var valorSeleccionado = $(this).val();

        factorV = valorSeleccionado;


        if (factorV == 1) {
            document.getElementById("Factor").removeAttribute("disabled");
            document.getElementById("Importe").setAttribute("disabled", "disabled");
            document.getElementById("Importe").value = "";
        }

        if (factorV == 2) {
            document.getElementById("Importe").setAttribute("disabled", "disabled");
            document.getElementById("Importe").value = "";
            document.getElementById("Factor").removeAttribute("disabled");


        }

        if (factorV == 3) {
            document.getElementById("Factor").setAttribute("disabled", "disabled");
            document.getElementById("Factor").value = "";
            document.getElementById("Importe").removeAttribute("disabled");

        }

    });

}

async function opcionesNomina() {

    $("#nomina").empty();

    const request = await fetch("api/dataNom/nominas", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const nomina = await request.json();

  


    $("#nomina").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    for (let detalle of nomina) {

        $("#nomina").append("<option value = " + detalle[0] + ">" + detalle[0] + " - " + detalle[1] + "</option>");

    }

}


async function opcionesTemporalidad() {

    $("#contemporalidad").empty();

    const request = await fetch("api/ctglstconvar/factor", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    const temp = await request.json();


    $("#contemporalidad").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );



    for (let detalle of temp) {

        if (detalle[0] == 1) {

            $("#contemporalidad").append("<option value = " + detalle[3] + ">" + detalle[1] + " - " + detalle[2] + "</option>");

        }
    }

    $("#contemporalidad").change(function () {
        // Obtener el valor seleccionado
        var valorSeleccionado = $(this).val();

        Contempo = valorSeleccionado;


        if (Contempo == 1) {
            document.getElementById("AnioFinal").removeAttribute("disabled");
            document.getElementById("FechaOcurrenciaFinal").removeAttribute("disabled");
            document.getElementById("periodoFinal").removeAttribute("disabled");

            for (let i = 1; i < 25; i++) {

                $("#periodoFinal").append("<option value =" + i + ">" + (i) + "</option>");

            }
            for (let i = 0; i < 3; i++) {

                $("#AnioFinal").append("<option value =" + (anioFinal + i) + ">" + (anioFinal + i) + "</option>");
            }

        }

        if (Contempo == 2) {
            $("#AnioFinal").empty();
            $("#FechaOcurrenciaFinal").empty();
            $("#periodoFinal").empty();
            document.getElementById("AnioFinal").setAttribute("disabled", "disabled");
            document.getElementById("FechaOcurrenciaFinal").setAttribute("disabled", "disabled");
            document.getElementById("periodoFinal").setAttribute("disabled", "disabled");

        }

    });

}


async function EjercicioActual() {
    $("#AnioInicio").empty();
    $("#AnioFinal").empty();

    const request = await fetch("api/consultar/ejercicio", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    $("#AnioFinal").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );
    $("#AnioInicio").append(
        '<option value="" disabled selected>Selecciona una opción</option>'
    );

    const ejeractual = await request.json();


    document.getElementById("AnioProceso").value = ejeractual[0].ejer_ejercicio;

    anioFinal = ejeractual[0].ejer_ejercicio;

    let anioIni = ejeractual[0].ejer_ejercicio - 1;

    for (let i = 0; i < 4; i++) {

        $("#AnioInicio").append("<option value =" + (anioIni + i) + ">" + (anioIni + i) + "</option>");
    }

    for (let i = 1; i < 25; i++) {
        $("#periodoInicial").append("<option value =" + i + ">" + (i) + "</option>");


    }


}

async function PeriodoActual() {


    const request = await fetch("api/consultar/periodo", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });



    const ejeractual = await request.json();

    document.getElementById("PeriodoProceso").value = ejeractual[0].pp_quincena;


}


async function autocompletarPersona() {
    const request = await fetch('api/empleado/conSituacion', {
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
        situacion[combinedValue] = item[5];

    });
    //console.log(idMap);

    return { combinedValues, idMap, data, situacion };
}
// FIN funcion para llamar a la API persona

// INICIO funcion para busacar una persona por su CURP o Nombre en el inpBuscar
async function iniciarAutoComplete() {
    const { combinedValues, idMap, data, situacion } = await autocompletarPersona();
    const autoCompleteInput = document.getElementById('inpBuscar');

    const autoCompleteJS = new autoComplete({
        selector: "#inpBuscar",
        placeHolder: "Buscar por CURP o Nombre(s)...",
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
                    const selectedPerson = data.find(item => `${item[1]} - ${item[3]} ${item[4]} ${item[2]}` === selection);
                    curp = selectedPerson[1];
                    nombre = `${selectedPerson[2]}`;
                    apellido_pat = `${selectedPerson[3]}`;
                    apellido_mat = `${selectedPerson[4]}`;
                    numEmpleado = selectedPerson[5];
                    idPersona = idMap[selection];
                    // situacion = 
                    autoCompleteJS.close();
                    situa = situacion[selection];


                    let nomComp = apellido_pat + " " + apellido_mat + " " + nombre;
                    document.getElementById("Nombre").value = nomComp;
                    document.getElementById("Curp").value = curp;
                    document.getElementById("Curp").setAttribute("atributoId", idPersona);
                    if (situa === 1) {
                        document.getElementById("situacion").value = "ACTIVO"
                    } else if (situa === 2) {
                        document.getElementById("situacion").value = "INACTIVO"
                    }

                    document.getElementById("inpBuscar").value = "";

                }
            }
        }
    });
}


function limpiarCampos() {

    var elementosFormulario = document.querySelectorAll('input, textarea, select');

    elementosFormulario.forEach(function (elemento) {
        if (elemento.id !== 'AnioProceso' && elemento.id !== 'PeriodoProceso') {
            elemento.value = '';
        }
    });

}

function validaPagoAnte(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/[^\w-]/g, '');

    clearTimeout(input.tooltipTimeout);
    input.tooltipTimeout = setTimeout(function () {
        $(input).tooltip('dispose');
    }, 1500);

    // Ocultar tooltips existentes
    $(input).tooltip('dispose');

    if (valor !== soloNumeros) {
        $(input).tooltip({
            title: 'No se aceptan caracteres especiales',
            placement: 'top',
            trigger: 'manual',
            delay: { show: 500, hide: 200 },
            container: 'body',
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner bg-primary text-white"></div></div>'
        }).tooltip('show');
    }

    if (valor.length >= 19) {
        soloNumeros = soloNumeros.substring(0, 18);

        if (valor.length > 15) {
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


function validaFactor(input) {
    var valor = input.value.trim();
    var soloNumeros = valor.replace(/[^\d.-]|(?<=\..*)\./g, '');

    clearTimeout(input.tooltipTimeout);
    input.tooltipTimeout = setTimeout(function () {
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

    if (valor.length >= 19) {
        soloNumeros = soloNumeros.substring(0, 18);

        if (valor.length > 15) {
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



function enviarDatosAPI() {

    let DatosToSave = {};
    document.getElementById("inpFechaInicio").value = obtenerFecha();
    document.getElementById("inpFechaModificacion").value = obtenerFecha();
    document.getElementById("inpUsuarioModifico").value = sessionStorage.nombre;
    document.getElementById("inpUsuarioCapturo").value = sessionStorage.nombre;
    document.getElementById("inpSituacion").value = "ACTIVO";

    var IdPersona = document.getElementById("Curp").getAttribute("atributoId");
    if (IdPersona == null || IdPersona === "") {
        swal("Por favor selecciona una persona", "Campo vacio", "warning");
        return;
    }
    DatosToSave.var_idpersona = IdPersona;

    var tipo = document.getElementById('Tipo').value;

    if (tipo == null || tipo === "") {
        swal("Por favor llena el campo Tipo", "Campo vacio", "warning");
        return;
    }

    DatosToSave.var_tipoconcepto = tipo;

    var concepto = document.getElementById('Concepto').value;
    if (concepto == null || concepto === "") {
        swal("Por favor llena el campo Concepto", "Campo vacio", "warning");
        return;
    }
    DatosToSave.var_concepto = concepto;

    var conceptoAnte = document.getElementById('ConceptoAntecedente').value;
    if (conceptoAnte != "" ) {
        DatosToSave.var_cptoanteced = conceptoAnte;
    }

    var pagoAnt = document.getElementById('PagoAntecedente').value;
    if (pagoAnt != "" ) {
        DatosToSave.var_pagoanteced = pagoAnt
    }

    var tipoFac = document.getElementById('TipoFactor').value;

    if (tipoFac === null || tipoFac === "") {
        swal("Por favor llena el campo Tipo de Factor", "Campo vacio", "warning");
        return;
    }
    DatosToSave.var_idfactor = tipoFac;

    var Campofactor = document.getElementById('Factor').value;
    if (Campofactor != "" ) {
        DatosToSave.var_factor = Campofactor;
    }

    var importe = document.getElementById('Importe').value;
    if (importe != "" ) {
        DatosToSave.var_importe = importe;
    }

    var Nomina = document.getElementById('nomina').value;

    if (Nomina == null || Nomina === "") {
        swal("Por favor llena el campo Nómina", "Campo vacio", "warning");
        return;
    }
    DatosToSave.var_numnomina = Nomina;

    var contador = 0;
    var temporalid = document.getElementById('contemporalidad').value;
    DatosToSave.var_temporalidad = temporalid;

    var AnioInicio = document.getElementById('AnioInicio').value;
    if (AnioInicio != "" ) {
        DatosToSave.var_axoi = AnioInicio;
    }

    var periodoIni = document.getElementById('periodoInicial').value;
    if (periodoIni != "" ) {
        DatosToSave.var_periodoi = periodoIni
    }

    var yearfinal = document.getElementById('AnioFinal').value;
    if (yearfinal != "" ) {
        DatosToSave.var_axof = yearfinal;
    }

    var periodofinal = document.getElementById('periodoFinal').value;
    if (periodofinal != "" ) {
        DatosToSave.var_periodof = periodofinal;
    }

    var dateOcurrenciaInicial = document.getElementById('FechaOcurrenciaInicial').value;
    if (dateOcurrenciaInicial != "") {
        DatosToSave.var_fechaocui = dateOcurrenciaInicial;
    }

    var dateOcurrenciaFinal = document.getElementById('FechaOcurrenciaFinal').value;
    if (dateOcurrenciaFinal != "" ) {
        DatosToSave.var_fechaocuf = dateOcurrenciaFinal;
    }

    var anioproc = document.getElementById('AnioProceso').value;
    if (anioproc != "") {
        DatosToSave.var_axoproceso = anioproc;
    }

    var perproc = document.getElementById('PeriodoProceso').value;
    if (perproc != "" ) {
        DatosToSave.var_perproceso = perproc;
    }
    //Datos de control
    var fechaIni = obtenerFecha();
    DatosToSave.var_fechainicio = fechaIni;
    //  var fechater = null;
    var usuCapturo = sessionStorage.idUsuario;
    if (usuCapturo != "" ) {
        DatosToSave.var_usucapturo = usuCapturo;
    }

    var usuModifico = sessionStorage.idUsuario;
    DatosToSave.var_usumodifio = usuModifico;

    var fechaMod = obtenerFecha();
    DatosToSave.var_fechamod = fechaMod;

    var situacionControl = 1;
    DatosToSave.var_situacion = situacionControl;

    var forzarImporte = document.getElementById('forzarImporte').value;

    if (forzarImporte === null || forzarImporte === "") {
        swal("Por favor llena el campo Forzar Importe", "Campo vacio", "warning");
        return;
    }

    if (forzarImporte != "" ) {
        DatosToSave.var_forzarimporte = forzarImporte;
    }


    var importeForzado = document.getElementById('importeForzado').value;
    if (forzarImporte == 1 ) {        
        DatosToSave.var_importeforzado = importeForzado;
    }


    var datosJSON = [{}];

   datosJSON[0] = DatosToSave;
   

    fetch('api/guardaconceptoVar', {
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

            return response.text();
        })
        .then(data => {
            console.log('Respuesta de la API:', data);

            limpiarCampos();
            swal("¡Registro exitoso!", "El registro se ha guardado correctamente.", "success");
        })
        .catch(error => {
            console.error('Error:', error);
            // Si hay un error, también puedes mostrar un mensaje swal para notificar al usuario
            swal("Error", "Hubo un problema al intentar guardar el registro.", "error");
        });

}


function obtenerFecha() {
    // Obtener la fecha de hoy
    var fechaDeHoy = new Date();


    var dia = fechaDeHoy.getDate();
    var mes = fechaDeHoy.getMonth() + 1;
    var año = fechaDeHoy.getFullYear();

    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = año + '-' + mes + '-' + dia;

    return fechaFormateada;
}

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
        
      } else {
        swal("Puedes seguir editando");
      }
    });
    
    }

function importeForzado(){

    var forzarImporte = document.getElementById('forzarImporte').value;
    if (forzarImporte == 1 ) {
        document.getElementById('importeForzado').removeAttribute('disabled');
    }else {
        document.getElementById('importeForzado').setAttribute('disabled', true);
    }
    
}

