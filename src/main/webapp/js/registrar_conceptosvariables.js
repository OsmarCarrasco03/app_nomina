document.getElementById("borrar").addEventListener("click", function() {
  var idUsuario = sessionStorage.getItem("idUsuario");
  if (idUsuario) {
      eliminarDatos(idUsuario);
  } else {
      console.log("No se encontró un ID de usuario en la sesión.");
  }
});

function eliminarDatos(idUsuario) {
  swal({
      title: "¿Estás seguro?",
      text: "¡Una vez eliminado, no podrás recuperar este archivo imaginario!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
  })
  .then((willDelete) => {
      if (willDelete) {
          fetch("eliminar/datos?usuario=" + encodeURIComponent(idUsuario), {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
          })
          .then(response => {
              if (response.ok) {
                  return response.text();
              }
              throw new Error("Error al eliminar los datos.");
          })
          .then(data => {
              swal("¡Buen trabajo!", "Se eliminaron los datos del usuario " + idUsuario + " correctamente!", "success");
          })
          .catch(error => {
              if (error.message === "Error al eliminar los datos.") {
                  swal("¡Error!", "No hay datos disponibles para eliminar para el usuario " + idUsuario + ".", "error");
              } else {
                  console.error("Error al eliminar los datos:", error);
              }
          });
      } else {
          swal("¡Tus datos imaginarios están a salvo!");
      }
  });
}





//DATOS DE CONTROL PARA EL INGRESO DE UN CSV. ING IVAN RODRIGUEZ SANCHEZ
$(document).ready(function () {
  var fechaHoy = new Date().toISOString().split('T')[0];
  $("#inpFechaInicio").val(fechaHoy);

});

$(document).ready(function () {

  $("#inpUsuarioCapturo").val(sessionStorage.idUsuario);

});

$(document).ready(function () {

  var fechaHoy = new Date().toISOString().split('T')[0];
  $("#inpFechaModificacion").val(fechaHoy);

});

$(document).ready(function () {

  $("#inpUsuarioModifico").val(sessionStorage.idUsuario);

});
//FIN DE DATOS DE CONTROL PARA EL INGRESO DE UN CSV. ING IVAN RODRIGUEZ SANCHEZ  

let csvProcesado = false; 

document.getElementById('csvForm').addEventListener('submit', function (event) {
  event.preventDefault(); 

  var inputFile = document.getElementById('fileInput').files[0];
  if (!inputFile) {
  
    swal({
      title: "Error",
      text: "Por favor, selecciona un archivo antes de continuar.",
      icon: "error",
    });
    return;  

  }

  var formData = new FormData();
  formData.append('file', inputFile);
  var axoproceso = document.getElementById('ejercicio').value; 
  var perproceso = document.getElementById('periodo').value;
  var Fechainicio = document.getElementById('inpFechaInicio').value;
  var UsuCapturo = document.getElementById('inpUsuarioCapturo').value;
  var Fechamod = document.getElementById('inpFechaModificacion').value;
  var UsuModifico = document.getElementById('inpUsuarioModifico').value;
  var Situacion = document.getElementById('inpSituacion').value;
  var Estatus = document.getElementById('estatus').value;


  var params = new URLSearchParams();
  params.append('axoproceso', axoproceso);
  params.append('perproceso', perproceso);
  params.append('Fechainicio', Fechainicio);
  params.append('UsuCapturo', UsuCapturo);
  params.append('Fechamod', Fechamod);
  params.append('UsuModifico', UsuModifico);
  params.append('Situacion', Situacion);
  params.append('Estatus', Estatus);

  fetch('uploadCSV/concepto?' + params.toString(), {
    method: 'POST',
    body: formData,
    headers: {
    
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.text();
    })
    .then(data => {
     
      if (data.includes("Error")) {
        
        swal({
          title: "Error",
          text: data,
          icon: "error",
        });
      } else {
       
        swal({
          title: "Buen trabajo",
          text: "Los datos se cargaron correctamente.",
          icon: "success",
        });
        
       
      }
    })
    .catch(error => {
      console.error('Error:', error);
   
    });


  csvProcesado = true;
  console.log('Archivo procesado con éxito:', csvProcesado);
});


//FINALIZA CARGA DE CSVS


// Manejar el evento de clic en el botón de cargar archivo
document.getElementById('cargarArchivo').addEventListener('click', function () {
  // Habilitar el botón de procesar solo si se ha seleccionado un archivo
  var inputFile = document.getElementById('fileInput').files[0];
  document.getElementById('procesar').disabled = !inputFile;
  console.log('Botón de cargar archivo clicado.');
});

















// Función para obtener los datos de la API
async function consultarDatosBase() {
  try {
    console.log('Consultando datos desde la API...');
    const request = await fetch('api/persona/Obtener/');
    if (!request.ok) {
      throw new Error('Error al obtener los datos');
    }
    const datos = await request.json();
    console.log('Datos obtenidos:', datos);
    return datos;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

async function convertirAFormatoCSV(datos) {
  const separador = ',';
  const csvRows = [];

  // Encabezados del CSV
  const encabezado = ['CURP', 'TEMPORALIDAD', 'TIPO DE CONCEPTO', 'CONCEPTO', 'CONCEPTO ANTECEDENTE', 'PAGO ANTECEDENTE', 'IDFACTOR', 'FACTOR',
    'IMPORTE', 'CONTADOR', 'NÓMINA', 'AÑO INICIO', 'PERIODO INICIO', 'AÑO FINAL', 'PERIODO FINAL', 'FECHA DE OCURRENCIA INICIAL', 'FECHA DE OCURRENCIA FINAL', 'ERROR', 'ESTATUS'];
  csvRows.push(encabezado);

  // Convertir datos a filas CSV
  datos.forEach((fila) => {
    const curp = fila[0];
    const temporalidad = fila[1];
    const tipocon = fila[2];
    const concepto = fila[3];
    const conceptoanteced = fila[4];
    const pagoanteced = fila[5];
    const idfactor = fila[6];
    const factor = fila[7];
    const importe = fila[8];
    const contador = fila[9];
    const nomina = fila[10];
    const axoi = fila[11];
    const periodoi = fila[12];
    const axof = fila[13];
    const periodof = fila[14];
    const fechaoi = fila[15];
    const fechaof = fila[16];
    const existe = fila[18]; // Asumiendo que el valor originalmente en 'EXISTE' ahora está en 'ERROR'
    const estatus = fila[19]; // Asumiendo que el estatus está en la posición 19
    const FIMPORTE = fila[20];

    // Crear una fila CSV con la información
    const filaCSV = [curp, temporalidad, tipocon, concepto, conceptoanteced, pagoanteced, idfactor, factor, importe, contador,
      nomina, axoi, periodoi, axof, periodof, fechaoi, fechaof , existe, estatus, ]; // Manteniendo 'ERROR' en su lugar original

    // Agregar la fila al conjunto de filas CSV
    csvRows.push(filaCSV.join(separador));
  });

  // Combinar filas CSV en un string CSV
  const csv = csvRows.join('\n');
  console.log('CSV generado:', csv);
  return csv;
}







// Función para mostrar una alerta de éxito
function mostrarAlertaExito() {
  swal({
    title: "¡Éxito!",
    text: "El archivo CSV se generó correctamente",
    icon: "success",
    buttons: {
      descargar: {
        text: "Descargar archivo",
        value: "descargar",
      },
      cancel: "Cancelar",
    },
  }).then((value) => {
    if (value === "descargar") {
      descargarArchivoCSV();
      buttonProcesar.disabled = true;
    }
  });
}

// Función para descargar el archivo CSV
async function descargarArchivoCSV() {
  try {
    const datos = await consultarDatosBase();
    const csv = await convertirAFormatoCSV(datos);

    // Crear un enlace temporal para descargar el archivo CSV
    const enlace = document.createElement('a');
    enlace.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`);
    enlace.setAttribute('download', 'archivo validador.csv');

    // Simular un clic en el enlace para iniciar la descarga
    enlace.style.display = 'none';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
  } catch (error) {
    console.error('Error al descargar el archivo CSV:', error);
    // Manejar el error según tus necesidades
  }
}

// Asignación del evento click al botón "procesar"
const buttonProcesar = document.getElementById('procesar');
buttonProcesar.onclick = function() {
  // Deshabilitar el botón después de hacer clic
  buttonProcesar.disabled = true;
  
  // Llamar a la función para descargar el CSV
  descargarCSV();
};

// Función para descargar el archivo CSV y mostrar alertas según haya errores o no
async function descargarCSV() {
  try {
    const datos = await consultarDatosBase();
    const csv = await convertirAFormatoCSV(datos);

    // Verificar si hay errores en los datos
    const hayErrores = datos.some(fila => fila[18] !== ''); // Suponiendo que los errores están en la posición 18

    if (hayErrores) {
      // Mostrar una alerta de error
      swal({
        title: "¡Alerta!",
        text: "Hay errores en tu archivo",
        icon: "error",
        buttons: {
          descargar: {
            text: "Descargar archivo",
            value: "descargar",
          },
          cancel: "Cancelar",
        },
      }).then((value) => {
        if (value === "descargar") {
          descargarArchivoCSV();
        }
      });
    } else {
      // Mostrar una alerta de éxito
      mostrarAlertaExito();
    }
  } catch (error) {
    console.error('Error al descargar el archivo CSV:', error);
    // Habilitar el botón en caso de error
    buttonProcesar.disabled = false;
    // Manejar el error según tus necesidades
  }
}


// Función para mostrar una alerta de éxito y ejecutar la API actualizarConcepto
function mostrarAlertaExito() {
  swal({
    title: "¡Éxito!",
    text: "El archivo CSV se generó correctamente",
    icon: "success",
    buttons: {
      descargar: {
        text: "Descargar archivo",
        value: "descargar",
      },
      cancel: "Cancelar",
    },
  }).then((value) => {
    if (value === "descargar") {
      descargarArchivoCSV();

     
    }
  });
}

// Función para ejecutar la API actualizarConcepto
// async function ejecutarActualizarConcepto() {
//   try {
//     const response = await fetch('/actualizar', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({})
//     });

//     if (response.ok) {
//       const mensaje = await response.text();
//       console.log(mensaje); // Puedes mostrar este mensaje o realizar otras acciones según necesites
//     } else {
//       console.error('Error al actualizar los datos:', response.statusText);
//       // Manejar el error de la llamada a la API según tus necesidades
//     }
//   } catch (error) {
//     console.error('Error al actualizar los datos:', error);
//     // Manejar el error de la llamada a la API según tus necesidades
//   }
// }




document.getElementById("cargar").addEventListener("click", function() {
  // Mostrar el cuadro de diálogo de confirmación
  swal({
    title: "¿Estás seguro?",
    text: "Antes de ejecutar la acción, ¿quieres realmente insertar estos datos?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willInsert) => {
    // Verificar si el usuario confirmó la acción
    if (willInsert) {
      // Mostrar una alerta de confirmación inmediata
      swal("¡Acción confirmada! Los datos se están insertarón...", {
        icon: "info",
      });
      
      // Realizar la solicitud a la API insertarDatos
      fetch('/insertar/Datos', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(response.statusText);
          }
          return response.json();
      })
      .then(data => {
          // Mostrar una alerta con el resultado
          if (data.datosCargados > 0) {
              swal({
                  title: "¡Éxito!",
                  text: `Datos cargados: ${data.datosCargados}\nDatos no cargados: ${data.datosNoCargados}`,
                  icon: "success",
              });
          } else {
              
          }
      })
      .catch(error => {
          console.error('Error:', error);
          swal({
            title: "No se insertaron datos",
            text: `Datos cargados: ${data.datosCargados}\nDatos no cargados: ${data.datosNoCargados}`,
            icon: "warning",
        });
      });
    } else {
      // Si el usuario cancela, mostrar un mensaje
      swal("¡La acción ha sido cancelada!");
    }
  });
});