function mostrarOpcionesDeBusqueda() {
    autocompletarConceptos().then(function (datos) {
        const opcionesBody = document.getElementById('opcionesBody');
        opcionesBody.innerHTML = '';

        // Crear la tabla para mostrar las opciones
        const tabla = document.createElement('table');
        tabla.classList.add('tabla-dinamica');

        const inputBusqueda = document.createElement('input');
        inputBusqueda.type = 'text';
        inputBusqueda.placeholder = 'Buscar...';
        inputBusqueda.classList.add('input-busqueda'); // Agregar una clase CSS
        opcionesBody.appendChild(inputBusqueda);

        // Crear el encabezado de la tabla
        const encabezado = document.createElement('thead');
        const encabezadoFila = document.createElement('tr');
        const encabezadoConcepto = document.createElement('th');
        encabezadoConcepto.textContent = 'Concepto';
        const encabezadoDescripcion = document.createElement('th');
        encabezadoDescripcion.textContent = 'Descripción';
        const encabezadoTipo = document.createElement('th');
        encabezadoTipo.textContent = 'Tipo';
        const encabezadoClasificacion = document.createElement('th');
        encabezadoClasificacion.textContent = 'Clasificación';

        encabezadoFila.appendChild(encabezadoConcepto);
        encabezadoFila.appendChild(encabezadoDescripcion);
        encabezadoFila.appendChild(encabezadoTipo);
        encabezadoFila.appendChild(encabezadoClasificacion);
        encabezado.appendChild(encabezadoFila);

        tabla.appendChild(encabezado);

        // Crear el cuerpo de la tabla
        const cuerpoTabla = document.createElement('tbody');

        // Agregar cada opción como una fila de la tabla
        datos.forEach(function (concepto) {
            const fila = document.createElement('tr');

            // Celda para el concepto
            const celdaConcepto = document.createElement('td');
            celdaConcepto.textContent = concepto.concepto;  
            fila.appendChild(celdaConcepto);

            // Celda para la descripción
            const celdaDescripcion = document.createElement('td');
            celdaDescripcion.textContent = concepto.descripcion;
            fila.appendChild(celdaDescripcion);

            // Celda para el tipo
            const celdaTipo = document.createElement('td');
            celdaTipo.textContent = concepto.tipo;
            fila.appendChild(celdaTipo);

            // Celda para la clasificación
            const celdaClasificacion = document.createElement('td');
            celdaClasificacion.textContent = concepto.clasificacion;
            fila.appendChild(celdaClasificacion);

            // Agregar el event listener a la fila para la selección
            fila.addEventListener('click', function () {
                // Al hacer clic en una fila, llama a la función para seleccionarla
                seleccionarOpcion(concepto.codigo, concepto.concepto);
                // Remover clase 'selected' de todas las filas
                const filas = document.querySelectorAll('tbody tr');
                filas.forEach(function (fila) {
                    fila.classList.remove('selected');
                });
                // Agregar clase 'selected' a la fila seleccionada
                fila.classList.add('selected');
            });

            // Agregar la fila al cuerpo de la tabla
            cuerpoTabla.appendChild(fila);
        });

        // Agregar el cuerpo de la tabla al cuerpo del modal
        tabla.appendChild(cuerpoTabla);
        opcionesBody.appendChild(tabla);

        // Función para filtrar opciones según el término de búsqueda
       // Función para filtrar opciones según el término de búsqueda
// Función para filtrar opciones según el término de búsqueda
// Función para filtrar opciones según el término de búsqueda
function filtrarOpciones() {
    const termino = inputBusqueda.value.trim().toLowerCase();

    cuerpoTabla.querySelectorAll('tr').forEach(function (fila) {
        let mostrarFila = false; // Bandera para determinar si mostrar o no la fila
        fila.querySelectorAll('td').forEach(function (celda) {
            const textoCelda = celda.textContent.toLowerCase();
            if (textoCelda.includes(termino)) {
                mostrarFila = true; // Si hay una coincidencia parcial, mostrar la fila
            }
        });
        fila.style.display = mostrarFila ? 'table-row' : 'none'; // Mostrar o ocultar la fila según la bandera
    });
}

// Evento de escucha para filtrar opciones al escribir en el buscador
inputBusqueda.addEventListener('input', function () {
    filtrarOpciones();
});



        // Evento de escucha para filtrar opciones al escribir en el buscador
        inputBusqueda.addEventListener('input', function () {
            filtrarOpciones();
        });

        // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('opcionesModal'));
        modal.show();
    }).catch(function (error) {
        // console.error('Error al obtener las opciones de búsqueda:', error);
    });
}


// Función para seleccionar una opción y cerrar el modal
function seleccionarOpcion(codigo, concepto) {
    // Llama a la función buscarPuestos() con los parámetros adecuados
    buscarPuestos(codigo, concepto);

    // Cierra el modal completamente
    const modal = bootstrap.Modal.getInstance(document.getElementById('staticBackdrop'));
    modal.hide();

    // Restablece la propiedad overflow del cuerpo del documento
    document.body.style.overflow = 'auto';
}

// Agregar un listener al evento 'click' del botón para mostrar el modal
document.getElementById('mostrarOpciones').addEventListener('click', function () {
    mostrarOpcionesDeBusqueda();
});


async function autocompletarConceptos() {
    const request = await fetch('api/persona/ObtenerConcepto', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    });
    const conceptos = await request.json();

    // Crear un objeto para almacenar temporalmente los datos agrupados por número de concepto
    let datosTemp = {};

    // Agrupar conceptos basándose en su coincidencia en con_concepto
    conceptos.forEach(concepto => {
        // Usamos el número de concepto (con_concepto) como clave para el objeto de datosTemp
        const numeroConcepto = concepto[1];
        if (!datosTemp[numeroConcepto]) {
            datosTemp[numeroConcepto] = [];
        }

        datosTemp[numeroConcepto].push({
            codigo: concepto[0],
            concepto: concepto[1],
            descripcion: concepto[3],
            tipo: concepto[2],
            clasificacion: concepto[4],
            datos: `${concepto[1]}-${concepto[2]}- ${concepto[3]} - ${concepto[4]}`
        });
    });

    // Convertir el objeto en un array manteniendo el orden existente
    let datos = [];
    Object.keys(datosTemp).sort((a, b) => a - b).forEach(numeroConcepto => {
        datos = datos.concat(datosTemp[numeroConcepto]);
    });

    return datos;
}



async function iniciarAutoComplete() {
    try {
        let datos = await autocompletarConceptos();



        const autoCompleteJS = new autoComplete({
            selector: "#autoComplete",
            placeHolder: "Búsqueda por código o puesto",
            data: {
                src: datos.map(concepto => concepto.datos),
                cache: true,
            },
            resultItem: {
                content: (data, element) => {
                    const codigo = datos[data.resultIndex].codigo;
                    const concepto = datos[data.resultIndex].concepto; // Agregado: Obtener el concepto
                    element.innerHTML = `<div><strong>Código:</strong> ${codigo}</div>
                                          <div><strong>Concepto:</strong> ${concepto}</div>
                                          <div><strong>Datos:</strong> ${data.match}</div>`;
                }
            },
            events: {
                input: {
                    selection: (event) => {
                        const selection = event.detail.selection.value;
                        const selectedConcepto = datos.find(concepto => concepto.datos === selection || concepto.codigo === selection || concepto.concepto === selection);
                        if (selectedConcepto) {
                            buscarPuestos(selectedConcepto.codigo, selectedConcepto.concepto);
                        }
                    }
                }
            }

        });

        autoCompleteJS.input.addEventListener('selection', function (event) {
            const selection = event.detail.selection.value;
            autoCompleteJS.input.value = selection; // Pegar los datos seleccionados al campo de búsqueda
        });


    } catch (error) {
        // console.error('Error al iniciar el autocompletado:', error);
    }
}

// AQUI SE JECUTA MI API Y MIS DOS LISTAS 

let cpa_periodos = [];

async function buscarPuestos(con_tipo, con_concepto) {
    try {
        // Primera llamada a la API
        const request1 = await fetch('api/puestos/conceptos/datosXdesicion', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ con_tipo, con_concepto }) // Pasar ambos parámetros
        });

        // const data1 = await request1.json();
        // console.log('Datos de la primera llamada:', data1);

        const request2 = await fetch('api/puestos/conceptos/datosXaplic', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ con_concepto }) // Pasar ambos parámetros
        });


   
        const adic = await request2.json();
        const puestos = await request1.json();

        // Guardar el valor de cpa_periodo en una variable
        cpa_periodos = []; // Limpiar el array antes de asignar nuevos valores
        if (adic.length > 0 && adic[0].hasOwnProperty('cpa_periodo')) {
            cpa_periodos = adic.map(item => item.cpa_periodo); // Almacenar los periodos en el array
            // console.log('Valores de cpa_periodos:', cpa_periodos);
        } else {
            // console.log('No se encontraron valores de cpa_periodo en los datos de adic');
        }

        // console.log('Resultado de la búsqueda de puestos:', puestos);
        // console.log('Resultado de la búsqueda de adic:', adic);

        cargarDatosPersona(cpa_periodos); // Pasar el array de periodos a la función cargarDatosPersona


        const seEncontraronDatosSegundaAPI = adic.length > 0;

        if (seEncontraronDatosSegundaAPI) {
            // Si se encontraron datos en la segunda API, marcar el checkbox de No periodo de pago
            document.getElementById("Noperiodosdepago").checked = true;
        } else {
            // Si no se encontraron datos en la segunda API, marcar el checkbox de Si periodo de pago
            document.getElementById("Siperiodosdepago").checked = true;
        }
        if (puestos.length > 0) {


            const primeraPersona = puestos[0];
            const segundaPersona = puestos[1];
            const tipo = primeraPersona.con_tipo; // Obtener con_tipo





            // document.getElementById("Siperiododepago").checked = (PERIODOPAGO === 1);
            // document.getElementById("Noperiododepago").checked = (PERIODOPAGO === 2);

            // if (PERIODOPAGO === 1) {
            //     document.getElementById("Siperiododepago").checked = true;
            // } else if (PERIODOPAGO === 2) {
            //     document.getElementById("Noperiododepago").checked = true;
            // }


            const concepto = primeraPersona[3]; //con_concepto
            document.getElementById("conceptos").value = concepto;

            const clasificacion = primeraPersona[4];//con_clasificacion
            document.getElementById("clasificacion").value = clasificacion;

            // PANTALLA DE ID'S DE CONCEPTO
            const TIPOCOSTO = primeraPersona[61]; // Usar índice 61 para obtener los datos correctos


            const GRUPOACUM = primeraPersona[49];//con_grupoacum
            document.getElementById("grupoacum").value = GRUPOACUM;


       

          
            const tipos = primeraPersona[6];//con_tipo
            document.getElementById("tipo").value = tipos;

            const descripcion = primeraPersona[8];//con_descripcion
            document.getElementById("descripcion").value = descripcion;

            const partida = primeraPersona[10];//con_partida
            document.getElementById("partida").value = partida;

            const despartida = primeraPersona[9];//descripcion de la partida
            document.getElementById("despartida").value = despartida;


            document.getElementById("SiTipocosto").checked = (TIPOCOSTO === 1);
            document.getElementById("NoTipocosto").checked = (TIPOCOSTO === 2);

            if (TIPOCOSTO === 1) {
                document.getElementById("SiTipocosto").checked = true;
            } else if (TIPOCOSTO === 2) {
                document.getElementById("NoTipocosto").checked = true;
            }



            const AGRPXANTECEDENTE = primeraPersona[62];//con_agrpxantecedente
            document.getElementById("SiTipocosto").value = AGRPXANTECEDENTE;
            document.getElementById("NoTipocosto").value = AGRPXANTECEDENTE;
            if (AGRPXANTECEDENTE === 1) {
                document.getElementById("SiAgrpzantecedente").checked = true;
            } else if (AGRPXANTECEDENTE === 2) {
                document.getElementById("NoAgrpzantecedente").checked = true;


            }

            const RFPCONCEPTO = primeraPersona[63];//con_rfpconcepto
            document.getElementById("SiRfpconcepto").value = RFPCONCEPTO;
            document.getElementById("NoRfpconcepto").value = RFPCONCEPTO;

            if (RFPCONCEPTO === 1) {
                document.getElementById("SiRfpconcepto").checked = true;
            } else if (RFPCONCEPTO === 2) {
                document.getElementById("NoRfpconcepto").checked = true;


            }


            const TIPOCOSTOCAN = primeraPersona[65];//con_tipocostocan

            document.getElementById("SiTipocostocan").value = TIPOCOSTOCAN;
            document.getElementById("NoTipocostocan").value = TIPOCOSTOCAN;


            if (TIPOCOSTOCAN === 1) {
                document.getElementById("SiTipocostocan").checked = true;
            } else if (TIPOCOSTOCAN === 2) {
                document.getElementById("NoTipocostocan").checked = true;
            }

            const GRUPOSECU = primeraPersona[53];
            document.getElementById("gruposecu").value = GRUPOSECU;

            const CLASEGRPSEC = primeraPersona[55];
            document.getElementById("conceptogravado").value = CLASEGRPSEC;
            document.getElementById("conceptoexterno").value = CLASEGRPSEC;

            if (CLASEGRPSEC === 1) {
                document.getElementById("conceptogravado").checked = true;
            } else if (CLASEGRPSEC === 2) {
                document.getElementById("conceptoexterno").checked = true;
            }


            const GRUPOACUMD = primeraPersona[51];//con_gruoacumd
            document.getElementById("grupoacumd").value = GRUPOACUMD;


            // PANTALLA VALORES DE CONCEPTO 
            const EJERCICIO = primeraPersona[1];
            document.getElementById("ejercicio").value = EJERCICIO;

            

            const CUENTAPASIVO = primeraPersona[72];//con_gruoacumd
            document.getElementById("cuentapasivo").value = CUENTAPASIVO;

            const IDPROVGRP = primeraPersona[71];//con_gruoacumd
            document.getElementById("idprovgrp").value = IDPROVGRP;

            const RUBROCONTABLE = primeraPersona[70];//con_gruoacumd
            document.getElementById("rubrocontable").value = RUBROCONTABLE;

            const COSTOCENTRALIZADO = primeraPersona[73];//con_gruoacumd
            document.getElementById("CentraCostocentralizado").value = COSTOCENTRALIZADO;
            document.getElementById("UnidadCostocentralizado").value = COSTOCENTRALIZADO;

            if (COSTOCENTRALIZADO === 1) {
                document.getElementById("CentraCostocentralizado").checked = true;
            } else if (COSTOCENTRALIZADO === 2) {
                document.getElementById("UnidadCostocentralizado").checked = true;
            }

            const TIPOAGASTO = primeraPersona[48];//con_gruoacumd
            document.getElementById("Sitipogasto").value = TIPOAGASTO;
            document.getElementById("Notipogasto").value = TIPOAGASTO;

            if (TIPOAGASTO === 1) {
                document.getElementById("Sitipogasto").checked = true;
            } else if (TIPOAGASTO === 2) {
                document.getElementById("Notipogasto").checked = true;
            }


            const EQUIVTIMBRADO = primeraPersona[67];
            const EQUIVTIMBRADOCONTRA = segundaPersona[67];
            document.getElementById("equivtimbrado").value = EQUIVTIMBRADO;
            document.getElementById("equivtimbradoContra").value = EQUIVTIMBRADOCONTRA;

            const DESCEQUIVTIMBRADO = primeraPersona[66];//con_gruoacumd
            const DESCEQUIVTIMBRADOCONTRA = segundaPersona[66];//con_gruoacumd
            document.getElementById("sueldos").value = DESCEQUIVTIMBRADO;
            document.getElementById("ingresos").value = DESCEQUIVTIMBRADOCONTRA;

            // PANTALLA DE PARAMETROS DE CONCEPTO 

            const TIPOAPLICA = primeraPersona[11];//con_gruoacumd
            document.getElementById("Sitipoaplica").value = TIPOAPLICA;
            document.getElementById("Notipoaplica").value = TIPOAPLICA;

            if (TIPOAPLICA === 1) {
                document.getElementById("Sitipoaplica").checked = true;
            } else if (TIPOAPLICA === 2) {
                document.getElementById("Notipoaplica").checked = true;
            }

            // const CONCEPTOGRAVABLE=  primeraPersona[11];//con_gruoacumd
            // document.getElementById("Sigravable").value = CONCEPTOGRAVABLE;
            // document.getElementById("Nogravable").value = CONCEPTOGRAVABLE;

            // if (CONCEPTOGRAVABLE=== 1) {
            //      document.getElementById("Sigravable").checked = true;
            //  } else if (CONCEPTOGRAVABLE=== 2) {
            //      document.getElementById("Nogravable").checked = true;
            //  }



            // const CONCEPTOCOTIZABLE=  primeraPersona[11];//con_gruoacumd
            // document.getElementById("Sigravable").value = CONCEPTOCOTIZABLE;
            // document.getElementById("Nogravable").value = CONCEPTOCOTIZABLE;

            // if (CONCEPTOCOTIZABLE=== 1) {
            //      document.getElementById("Sigravable").checked = true;
            //  } else if (CONCEPTOGRAVABLE=== 2) {
            //      document.getElementById("Nogravable").checked = true;
            //  }


            const AFXMBCOTIZABLE = primeraPersona[64];//con_gruoacumd
            document.getElementById("Siafectado").value = AFXMBCOTIZABLE;
            document.getElementById("Noafectado").value = AFXMBCOTIZABLE;

            if (AFXMBCOTIZABLE === 1) {
                document.getElementById("Siafectado").checked = true;
            } else if (AFXMBCOTIZABLE === 2) {
                document.getElementById("Noafectado").checked = true;
            }


            //  const IMPRIMIR=  primeraPersona[12];//con_gruoacumd
            //  document.getElementById("Siimprimir").value = IMPRIMIR;
            //  document.getElementById("Noimprimir").value = IMPRIMIR;

            //  if (IMPRIMIR=== 1) {
            //       document.getElementById("Siimprimir").checked = true;
            //   } else if (IMPRIMIR=== 2) {
            //       document.getElementById("Noimprimir").checked = true;
            //   }

            const IMPRIMIR = primeraPersona[12];//con_gruoacumd
            document.getElementById("Siimprimir").value = IMPRIMIR;
            document.getElementById("Noimprimir").value = IMPRIMIR;

            if (IMPRIMIR === 1) {
                document.getElementById("Siimprimir").checked = true;
            } else if (IMPRIMIR === 2) {
                document.getElementById("Noimprimir").checked = true;
            }




            const AFXFALTAS = primeraPersona[37];//con_gruoacumd
            document.getElementById("Siafxfaltas").value = AFXFALTAS;
            document.getElementById("Noafxfaltas").value = AFXFALTAS;

            if (AFXFALTAS === 1) {
                document.getElementById("Siafxfaltas").checked = true;
            } else if (AFXFALTAS === 2) {
                document.getElementById("Noafxfaltas").checked = true;
            }



            // TRAE DATOS COMO 1 3  Y 0

            // const MODCONTADORES =  primeraPersona[38];//con_gruoacumd
            // document.getElementById("SiModcontadores").value =MODCONTADORES;
            // document.getElementById("NoModcontadores").value = MODCONTADORES;

            // if (MODCONTADORES=== 1) {
            //      document.getElementById("SiModcontadores").checked = true;
            //  } else if (MODCONTADORES=== 2) {
            //      document.getElementById("NoModcontadores").checked = true;
            //  }


            const LIQSUELDOS = primeraPersona[58];//con_gruoacumd
            document.getElementById("SiLiqsueldos").value = LIQSUELDOS;
            document.getElementById("NoLiqsueldos").value = LIQSUELDOS;

            if (LIQSUELDOS === 1) {
                document.getElementById("SiLiqsueldos").checked = true;
            } else if (LIQSUELDOS === 2) {
                document.getElementById("NoLiqsueldos").checked = true;
            }


            const LIQOTRASPREST = primeraPersona[59];//con_gruoacumd
            document.getElementById("SiLiqotrasprest").value = LIQOTRASPREST;
            document.getElementById("NoLiqotrasprest").value = LIQOTRASPREST;

            if (LIQOTRASPREST === 1) {
                document.getElementById("SiLiqotrasprest").checked = true;
            } else if (LIQOTRASPREST === 2) {
                document.getElementById("NoLiqotrasprest").checked = true;
            }


            const AFXFINIQUITO = primeraPersona[69];//con_gruoacumd
            document.getElementById("SiAfxfiniquito").value = AFXFINIQUITO;
            document.getElementById("NoAfxfiniquito").value = AFXFINIQUITO;

            if (AFXFINIQUITO === 1) {
                document.getElementById("SiAfxfiniquito").checked = true;
            } else if (AFXFINIQUITO === 2) {
                document.getElementById("NoAfxfiniquito").checked = true;
            }




            const AFXANLRETRO = primeraPersona[39];//con_gruoacumd
            document.getElementById("SiAfxanlretro").value = AFXANLRETRO;
            document.getElementById("NoAfxanlretro").value = AFXANLRETRO;

            if (AFXANLRETRO === 1) {
                document.getElementById("SiAfxanlretro").checked = true;
            } else if (AFXANLRETRO === 2) {
                document.getElementById("NoAfxanlretro").checked = true;
            }





            const AFXCALFRAC = primeraPersona[40];//con_gruoacumd
            document.getElementById("SiAfxcalfrac").value = AFXCALFRAC;
            document.getElementById("NoAfxcalfrac").value = AFXCALFRAC;

            if (AFXCALFRAC === 1) {
                document.getElementById("SiAfxcalfrac").checked = true;
            } else if (AFXANLRETRO === 2) {
                document.getElementById("NoAfxcalfrac").checked = true;
            }


            const AFXPENSION = primeraPersona[33];//con_gruoacumd
            document.getElementById("SiAfxpension").value = AFXPENSION;
            document.getElementById("NoAfxpension").value = AFXPENSION;

            if (AFXPENSION === 1) {
                document.getElementById("SiAfxpension").checked = true;
            } else if (AFXPENSION === 2) {
                document.getElementById("NoAfxpension").checked = true;
            }


            const AFXPENNETO = primeraPersona[41];//con_gruoacumd
            document.getElementById("SiAfxpenneto").value = AFXPENNETO;
            document.getElementById("NoAfxpenneto").value = AFXPENNETO;

            if (AFXPENNETO === 1) {
                document.getElementById("SiAfxpenneto").checked = true;
            } else if (AFXPENNETO === 2) {
                document.getElementById("NoAfxpenneto").checked = true;
            }


            const AFXPENADIC = primeraPersona[42];//con_gruoacumd
            document.getElementById("SiAfxpenadic").value = AFXPENADIC;
            document.getElementById("NoAfxpenadic").value = AFXPENADIC;

            if (AFXPENADIC === 1) {
                document.getElementById("SiAfxpenadic").checked = true;
            } else if (AFXPENADIC === 2) {
                document.getElementById("NoAfxpenadic").checked = true;
            }

            const AFXSUSPENSION = primeraPersona[34];//con_gruoacumd
            document.getElementById("SiAfxsuspension").value = AFXSUSPENSION;
            document.getElementById("NoAfxsuspension").value = AFXSUSPENSION;

            if (AFXSUSPENSION === 1) {
                document.getElementById("SiAfxsuspension").checked = true;
            } else if (AFXSUSPENSION === 2) {
                document.getElementById("NoAfxsuspension").checked = true;
            }



            const AFXLICSS = primeraPersona[35];//con_gruoacumd
            document.getElementById("SiAfxlicss").value = AFXLICSS;
            document.getElementById("NoAfxlicss").value = AFXLICSS;

            if (AFXLICSS === 1) {
                document.getElementById("SiAfxlicss").checked = true;
            } else if (AFXLICSS === 2) {
                document.getElementById("NoAfxlicss").checked = true;
            }



            const AFXLICMS = primeraPersona[36];//con_gruoacumd
            document.getElementById("SiAfxlicms").value = AFXLICMS;
            document.getElementById("NoAfxlicms").value = AFXLICMS;

            if (AFXLICMS === 1) {
                document.getElementById("SiAfxlicms").checked = true;
            } else if (AFXLICMS === 2) {
                document.getElementById("NoAfxlicms").checked = true;
            }



            const AFXREINTEGRO = primeraPersona[57];//con_gruoacumd
            document.getElementById("SiAfxreintegro").value = AFXREINTEGRO;
            document.getElementById("NoAfxreintegro").value = AFXREINTEGRO;

            if (AFXREINTEGRO === 1) {
                document.getElementById("SiAfxreintegro").checked = true;
            } else if (AFXREINTEGRO === 2) {
                document.getElementById("NoAfxreintegro").checked = true;
            }



            const GRPINDEMNI = primeraPersona[60];//con_gruoacumd
            document.getElementById("SiGrpindemni").value = GRPINDEMNI;
            document.getElementById("NoGrpindemni").value = GRPINDEMNI;

            if (GRPINDEMNI === 1) {
                document.getElementById("SiGrpindemni").checked = true;
            } else if (GRPINDEMNI === 2) {
                document.getElementById("NoGrpindemni").checked = true;
            }


            const TIPOIMPORTE = primeraPersona[13];//con_gruoacumd
            document.getElementById("tipoimporte").value = TIPOIMPORTE;


            const ORIGENFACTOR = primeraPersona[17];//con_gruoacumd
            document.getElementById("origenfactor").value = ORIGENFACTOR;


            const ORIGENIMP = primeraPersona[15];//con_gruoacumd
            document.getElementById("origenimp").value = ORIGENIMP;


            const IMPORTE = primeraPersona[20];//con_gruoacumd
            document.getElementById("importe").value = IMPORTE;


            const GVMODALIDAD = primeraPersona[83];//con_gruoacumd
            document.getElementById("gvmodalidad").value = GVMODALIDAD;


            const GVFACTOR = primeraPersona[22];//con_gruoacumd
            document.getElementById("gvfactor").value = GVFACTOR;


            const GVTIPOINTEGRA = primeraPersona[84];//con_gruoacumd
            document.getElementById("gvtipointegra").value = GVTIPOINTEGRA;


            const AFXCANCELACION = primeraPersona[56]; // Suponiendo que primeraPersona es un arreglo que contiene valores
            const checkboxValue = AFXCANCELACION === 1 ? true : false; // Si AFXCANCELACION es 1, el checkbox debe estar marcado, de lo contrario, no
            document.getElementById("afxcancelacion").checked = checkboxValue; // Asignar el valor al checkbox


            const GVEXCENTO = primeraPersona[24]; // Suponiendo que primeraPersona es un arreglo que contiene valores
            const checkboxValueDOS = GVEXCENTO === 1 ? true : false; // Si AFXCANCELACION es 1, el checkbox debe estar marcado, de lo contrario, no
            document.getElementById("gvexcento").checked = checkboxValueDOS; // Asignar el valor al checkbox


            const GVEXCMOD = primeraPersona[25];//con_gruoacumd
            document.getElementById("gvexcmod").value = GVEXCMOD;

            const GVEXCFACTOR = primeraPersona[26];//con_gruoacumd
            document.getElementById("gvexcfactor").value = GVEXCFACTOR;


            const SUBSIDIAR = primeraPersona[24]; // Suponiendo que primeraPersona es un arreglo que contiene valores
            const checkboxValueTres = SUBSIDIAR === 1 ? true : false; // Si AFXCANCELACION es 1, el checkbox debe estar marcado, de lo contrario, no
            document.getElementById("subsidiar").checked = checkboxValueTres; // Asignar el valor al checkbox


            const SUBGASTO = primeraPersona[85];//con_gruoacumd
            document.getElementById("subgasto").value = SUBGASTO;



            const SUBTCALAC = primeraPersona[86];//con_gruoacumd
            document.getElementById("subtcalac").value = SUBTCALAC;

            const SUBTGRVAC = primeraPersona[87];//con_gruoacumd
            document.getElementById("subtgrvac").value = SUBTGRVAC;

            const SUBTCALBA = primeraPersona[88];//con_gruoacumd
            document.getElementById("subtcalba").value = SUBTCALBA;


            const SUBTGRVBA = primeraPersona[89];//con_gruoacumd
            document.getElementById("subtgrvba").value = SUBTGRVBA;

            const CZMODALIDAD = primeraPersona[90];//con_gruoacumd
            document.getElementById("czmodalidad").value = CZMODALIDAD;

            const CZFACTOR = primeraPersona[28];//con_gruoacumd
            document.getElementById("czfactor").value = CZFACTOR;

            const FECHAINICIO = primeraPersona[91];//con_gruoacumd
            document.getElementById("fechainicio").value = FECHAINICIO;

            const USUCAPTURO = primeraPersona[92];//con_gruoacumd
            document.getElementById("usucapturo").value = USUCAPTURO;

            const FECHAMOD = primeraPersona[93];//con_gruoacumd
            document.getElementById("fechamod").value = FECHAMOD;


            const USUMODIFICO = primeraPersona[94];//con_gruoacumd
            document.getElementById("usumodifico").value = USUMODIFICO;



        } else {
            // console.log('No se encontraron puestos.');
        }
    } catch (error) {
        // console.error('Error al buscar el puesto:', error);
        return Promise.reject('Error al buscar el puesto');
    }
}

// Iniciar el autocompletado al cargar la página
iniciarAutoComplete();





// async function autocompletarDos() {
//     const request = await fetch('api/persona/Obtenerporfecha', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//     });
//     const data = await request.json();
//     let objetosDatos = [];

//     for (let item of data) {
//         let objeto = {

//             cpa_id: item.cpa_id,
//             cpa_concepto: item.cpa_concepto,
//             cpa_tipocon: item.cpa_tipocon,
//             cpa_periodo: item.cpa_periodo

//         };
//         objetosDatos.push(objeto);
//     }

//     return objetosDatos;
// }

// autocompletarDos().then(resultados => {
//     iniciarAutoComplete(resultados);
// });

// async function iniciarAutoComplete(resultados) {
//     const autoCompleteInput = document.getElementById('autoComplete');

//     const combinedValues = resultados.map(resultado => ` ${resultado.cpa_id} -${resultado.cpa_concepto} - ${resultado.cpa_tipocon} - ${resultado.cpa_periodo}`);

//     const autoCompleteJS = new autoComplete({
//         selector: "#autoComplete",
//         placeHolder: "Buscar por CURP o Nombre...",
//         data: {
//             src: combinedValues, // Usar el array combinado
//             cache: true,
//         },
//         resultItem: {
//             highlight: true
//         },
//         events: {
//             input: {
//                 query: (query, autoCompleteJS) => {
//                     if (query.length >= 3) {
//                         autoCompleteJS.start();
//                     } else {
//                         autoCompleteJS.stop();
//                     }
//                 },
//                 selection: (event) => {
//                     const selection = event.detail.selection.value;
//                     autoCompleteInput.value = selection;
//                 }
//             }
//         }
//     });

//     console.log(resultados); // Imprime los resultados en la consola
// }


// iniciarAutoComplete();

// async function buscarPersona() {
//     const autoCompleteInput = document.getElementById('autoComplete');
//     const query = autoCompleteInput.value.trim();

//     if (query.length === 0) {
//         return;
//     }

//     // Dividir el valor de autoCompleteInput.value en cpa_concepto y cpa_tipocon
//     const [cpa_id, cpa_concepto, cpa_tipocon] = query.split("-").map(part => part.trim());

//     // Crear el objeto datos con ambos valores
//     let datos = {cpa_id, cpa_concepto, cpa_tipocon};

//     try {
//         const request = await fetch('api/puestos/conceptos/datosXfecha', {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(datos)
//         });

//         const personas = await request.json();
//         console.log('Datos de persona:', personas);

//         if (personas[0] && personas[0].length > 0) {
//             // Accede al elemento en la posición 2 del primer array dentro de personas
//             const cpa_concepto = personas[0][2];
//             const cpa_tipocon = personas[0][3];
//             console.log('cpa_concepto:', cpa_concepto);
//             console.log('cpa_tipocon:', cpa_tipocon );

//             const personaObjeto = {};
//             personas[0].forEach((value, index) => {
//                 personaObjeto[`campo${index + 1}`] = value;
//             });
//             console.log('Persona objeto:', personaObjeto);

//             const nombres = personaObjeto.campo5.split(' ');

//             if (nombres.length > 2) {
//                 const segundoNombre = nombres.slice(2).join(' ');
//                 asignarValorYDeshabilitarCampo('nombre', segundoNombre);
//             } else {
//                 asignarValorYDeshabilitarCampo('nombre', '');
//             }

//             generarArchivoCSV(personaObjeto);

//             // Marcar los checkboxes en la tabla de opciones de búsqueda de periodo
//             marcaCheckboxes(document.getElementById('opcionesBodyPeriodos'));

//             // Marcar checkbox basado en el valor de campo5 del objeto personaObjeto
//             const checkbox = document.querySelector('input[type="checkbox"]');
//             if (personaObjeto.campo5 === '5') {
//                 checkbox.checked = true; // Marca el checkbox si el valor en campo5 es '5'
//             }
//         } else {
//             alert('No se encontraron datos de la persona.');
//         }
//     } catch (error) {
//         console.error('Error al buscar persona:', error);
//     }
// }



// function mostrarOpcionesDeBusquedaPeriodo() {
//     autocompletarPersona().then(function(datos) {
//         const opcionesBody = document.getElementById('opcionesBodyPeriodos');
//         opcionesBody.innerHTML = '';

//         const tabla = document.createElement('table');
//         tabla.classList.add('tabla-dinamica');

//         const encabezado = document.createElement('thead');
//         const encabezadoFila = document.createElement('tr');
//         const encabezadoQuincena = document.createElement('th');
//         encabezadoQuincena.textContent = 'Quincena';
//         const encabezadoFechaDesde = document.createElement('th');
//         encabezadoFechaDesde.textContent = 'Fecha Desde';
//         const encabezadoFechaHasta = document.createElement('th');
//         encabezadoFechaHasta.textContent = 'Fecha Hasta';
//         const encabezadoChecklist = document.createElement('th');
//         encabezadoChecklist.textContent = 'Checklist';

//         encabezadoFila.appendChild(encabezadoQuincena);
//         encabezadoFila.appendChild(encabezadoFechaDesde);
//         encabezadoFila.appendChild(encabezadoFechaHasta);
//         encabezadoFila.appendChild(encabezadoChecklist);

//         encabezado.appendChild(encabezadoFila);
//         tabla.appendChild(encabezado);

//         const cuerpoTabla = document.createElement('tbody');

//         datos.forEach(function(periodo) {
//             const fila = document.createElement('tr');

//             const celdaQuincena = document.createElement('td');
//             celdaQuincena.textContent = periodo.pp_quincena;
//             fila.appendChild(celdaQuincena);

//             const celdaFechaDesde = document.createElement('td');
//             celdaFechaDesde.textContent = periodo.pp_fechadesde;
//             fila.appendChild(celdaFechaDesde);

//             const celdaFechaHasta = document.createElement('td');
//             celdaFechaHasta.textContent = periodo.pp_fechahasta;
//             fila.appendChild(celdaFechaHasta);

//             const celdaChecklist = document.createElement('td');
//             const checkbox = document.createElement('input');
//             checkbox.type = 'checkbox';
//             // checkbox.checked = true;
//             celdaChecklist.appendChild(checkbox);
//             fila.appendChild(celdaChecklist);


//             cuerpoTabla.appendChild(fila);
//         });

//         tabla.appendChild(cuerpoTabla);
//         opcionesBody.appendChild(tabla);

//         const modal = new bootstrap.Modal(document.getElementById('staticBackdropsPeriodo'));
//         modal.show();

//         // Marcar los checkboxes en la tabla de opciones de búsqueda de periodo
//         marcaCheckboxesEnTabla(tabla);
//     }).catch(function(error) {
//         console.error('Error al obtener los periodos de pago:', error);
//     });
// }

// document.getElementById('mostrarOpcionesuno').addEventListener('click', function() {
//     mostrarOpcionesDeBusquedaPeriodo();
// });








function abrirModal(imagen) {
    var radioSigravable = document.getElementById('Sigravable');
    if (radioSigravable.checked) {
        $('#myModal').modal('show');
    }
}


function abrirModaldos(imagen) {
    var radioSigravable = document.getElementById('Sicotizable');
    if (radioSigravable.checked) {
        $('#myModalcotizable').modal('show');
    }
}

function abrirModaltres(imagen) {
    var radioSigravable = document.getElementById('Noperiodosdepago');
    if (radioSigravable.checked) {
        $('#modalInfo').modal('show');
    }
}


//   function abrirModaltres(radio) {
//     if (radio.checked && radio.id === 'Siperiodosdepago' || radio.id === 'Noperiodosdepago') {
//       $('#mostrarOpcionesuno').modal('show');
//     }
//   }


function limpiarConsulta() {
    var elementos = document.getElementsByTagName("input");

    for (var i = 0; i < elementos.length; i++) {
        var elemento = elementos[i];
        if (elemento.type === "text" || elemento.type === "textarea") {
            elemento.value = "";
        } else if (elemento.type === "radio" || elemento.type === "checkbox") {
            elemento.checked = false;
        } else if (elemento.type === "date" || elemento.type === "date") {
            elemento.date = false;
        }
    }

    // Mostrar SweetAlert para informar que la consulta se ha limpiado correctamente
    swal({
        title: "Se limpió la consulta correctamente",
        icon: 'success',
        button: 'Aceptar'
    });
}




// $(document).ready(function () {

// 	$("#usuCapturo").val(sessionStorage.nombre);

// });
// $(document).ready(function () {

// 	$("#usuModifico").val(sessionStorage.nombre);

// });
// $(document).ready(function () {

// 	var fechaHoy = new Date().toISOString().split('T')[0];
// 	$("#fechaCaptura").val(fechaHoy);

// });

// $(document).ready(function () {
// 	var fechaHoy = new Date().toISOString().split('T')[0];
// 	$("#fechainicioUno").val(fechaHoy);

// });
// $(document).ready(function () {

// 	var fechaHoy = new Date().toISOString().split('T')[0];
// 	$("#fechaTermino").val(fechaHoy);

// });













// async function autocompletarConceptoss() {
//     const request = await fetch('api/persona/Obtenerporperiodo', {
//         method: 'GET',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//     });
//     const conceptos = await request.json();

//     let datos = [];

//     for (let i = 0; i < conceptos.length; i++) {
//         datos.push({
//             codigo: conceptos[i][0], // Elemento en la posición 0 del array con_tipo
//             concepto: conceptos[i][1], // Elemento en la posición 1 del array con_concepto
//             descripcion: conceptos[i][3],
//             tipo: conceptos[i][2],
//             clasificacion: conceptos[i][4],

//             datos: `${conceptos[i][1]}${conceptos[i][2]}- ${conceptos[i][3]} - ${conceptos[i][4]}` 
//         });
//     }
//     console.log('Datos de la API:', datos);
//     return datos;
// }

// async function iniciarAutoComplete() {
//     try {
//         let datos = await autocompletarConceptoss();


//         const autoCompleteJS = new autoComplete({
//             selector: "#autoComplete",
//             placeHolder: "Búsqueda por código o puesto",
//             data: {
//                 src: datos.map(concepto => concepto.datos),
//                 cache: true,
//             },
//             resultItem: {
//                 content: (data, element) => {
//                     const codigo = datos[data.resultIndex].codigo;
//                     const concepto = datos[data.resultIndex].concepto; // Agregado: Obtener el concepto
//                     element.innerHTML = `<div><strong>Código:</strong> ${codigo}</div>
//                                           <div><strong>Concepto:</strong> ${concepto}</div>
//                                           <div><strong>Datos:</strong> ${data.match}</div>`;
//                 }
//             },
//             events: {
//                 input: {
//                     selection: (event) => {
//                         const selection = event.detail.selection.value;
//                         const selectedConcepto = datos.find(concepto => concepto.datos === selection || concepto.codigo === selection || concepto.concepto === selection);
//                         if (selectedConcepto) {
//                             buscarPuestos(selectedConcepto.codigo, selectedConcepto.concepto);
//                         }
//                     }
//                 }
//             }

//         });

//         autoCompleteJS.input.addEventListener('selection', function (event) {
//             const selection = event.detail.selection.value;
//             autoCompleteJS.input.value = selection; // Pegar los datos seleccionados al campo de búsqueda
//         });


//     } catch (error) {
//         console.error('Error al iniciar el autocompletado:', error);
//     }
// }




async function autocompletarPersona() {
    const request = await fetch('api/persona/Obtenerporperiodo', {
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
            pp_quincena: item.pp_quincena,
            pp_fechadesde: item.pp_fechadesde,
            pp_fechahasta: item.pp_fechahasta
        };
        objetosDatos.push(objeto);
    }

    return objetosDatos;
}

async function cargarDatosPersona(cpa_periodo) {
    const resultados = await autocompletarPersona();
    // console.log(resultados);
    const modalBody = document.querySelector('#modalInfo .modal-body table tbody');

    // Limpiar el contenido anterior de la tabla en caso de que haya
    modalBody.innerHTML = '';

    resultados.forEach((resultado, index) => {
        const fila = document.createElement('tr');
        const celdaQuincena = document.createElement('td');
        const celdaFechaDesde = document.createElement('td');
        const celdaFechaHasta = document.createElement('td');
        const celdaCheckbox = document.createElement('td');

        celdaQuincena.textContent = resultado.pp_quincena;
        celdaFechaDesde.textContent = resultado.pp_fechadesde;
        celdaFechaHasta.textContent = resultado.pp_fechahasta;

        // Agregar un checkbox en la celda correspondiente
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = JSON.stringify(resultado); // Asignar el valor del checkbox como un string JSON del resultado
        checkbox.id = `checkbox-${index}`; // Asignar un ID único al checkbox

        // Marcar automáticamente el checkbox si index coincide con alguno de los valores de cpa_periodo
        if (cpa_periodo.includes(index + 1)) {
            checkbox.checked = true;

        }

        checkbox.disabled = true;

        celdaCheckbox.appendChild(checkbox);

        // Agregar las celdas a la fila
        fila.appendChild(celdaQuincena);
        fila.appendChild(celdaFechaDesde);
        fila.appendChild(celdaFechaHasta);

        fila.appendChild(celdaCheckbox);

        // Agregar la fila a la tabla
        modalBody.appendChild(fila);
    });



    // Agregar evento de escucha a los checkboxes para imprimir las posiciones seleccionadas en la consola
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkboxesSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked');
            const posicionesSeleccionadas = Array.from(checkboxesSeleccionados).map(checkbox => checkbox.id.split('-')[1]);
            // console.log('Posiciones seleccionadas:', posicionesSeleccionadas);
        });
    });
}


// Llamar a buscarPuestos con los parámetros apropiados


cargarDatosPersona();











