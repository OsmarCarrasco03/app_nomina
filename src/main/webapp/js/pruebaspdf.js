/*

async function descargarPDF() {
    const nombrePdfElegido = document.getElementById('situacionSelect').value;

    const datos = {};

    if (nombrePdfElegido) {
        datos.pru_nombrepdf = nombrePdfElegido; // Ajusta el nombre del parámetro según lo esperado por tu backend
    }

    try {
        const response = await fetch('/descargar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos) // Enviar el parámetro al servidor
        });
   console.log('Mensaje desde la API: La solicitud de descarga de PDF se ha realizado correctamente.')+datos;
        if (!response.ok) {
            console.error('Error al descargar el PDF:', response.status);
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
}




// Obtener el botón con ID 'descargar'
const botonDescargar = document.getElementById('descargar');

// Agregar un evento de clic al botón
botonDescargar.addEventListener('click', async () => {
    try {
        // Llamar a la función descargarPDF() al hacer clic en el botón
        await descargarPDF() ;
    } catch (error) {
        // Manejar errores si la función descargarPDF() falla
        console.error('Error al descargar el PDF:', error);
    }
});






function descargarPDF() {
    // Realizar una solicitud GET al endpoint del controlador para descargar el PDF
    fetch('/descargar') // Reemplaza 'nombre_del_documento' con el nombre real del documento
        .then(response => response.blob())
        .then(blob => {
            // Crear un enlace en el documento para descargar el PDF
            const url = window.URL.createObjectURL(new Blob([blob]));
            const a = document.createElement('a');
            a.href = url;
            a.download = 'documento.pdf'; // Nombre del archivo al descargar
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error al descargar el PDF:', error));
}

*/


document.addEventListener("DOMContentLoaded", function() {
    const subirImagenLink = document.querySelector('a[href="#subirimagen"]');
    const formularioSubirImagen = document.getElementById('subirimagen');

    subirImagenLink.addEventListener('click', function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        // Ocultar otros formularios y mostrar el formulario de subida de imagen
        document.querySelectorAll('.section').forEach(function(section) {
            section.style.display = 'none';
        });
        formularioSubirImagen.style.display = 'block';
    });
});

// Obtener los elementos de navegación
const navLinks = document.querySelectorAll('.nav-link');

// Iterar sobre cada enlace de navegación
navLinks.forEach((link) => {
  // Agregar evento clic a cada enlace
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Evitar comportamiento predeterminado del enlace
    const targetId = link.getAttribute('href'); // Obtener el ID del destino

    // Ocultar todas las secciones
    document.querySelectorAll('.section').forEach((section) => {
      section.style.display = 'none';
    });

    // Mostrar la sección correspondiente al ID del enlace clicado
    document.querySelector(targetId).style.display = 'block';
  });
});



document.addEventListener('DOMContentLoaded', function() {
	const pdfForm = document.getElementById('pdfForm');

	pdfForm.addEventListener('submit', async function(event) {
		event.preventDefault(); // Evita el envío del formulario por defecto

		const formData = new FormData(pdfForm); // Obtén los datos del formulario

		try {
			const response = await fetch('/api/rfc/registro', {
				method: 'POST',
				body: formData
			});

			if (response.ok) {
				const result = await response.text();
				alert(result); // Muestra una alerta con la respuesta del servidor
			} else {
				alert('Error al subir el PDF');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('Error al subir el PDF');
		}
	});
});



async function consultarSituaciones() {
    try {
        const request = await fetch('api/pdf', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        const situaciones = await request.json();

        console.log('Situaciones obtenidas:', situaciones);

        const situacionSelect = $('#situacionSelect');
        situacionSelect.empty();

        situacionSelect.append('<option value="" disabled selected>Seleccione una opción</option>');

        if (Array.isArray(situaciones)) {
            situaciones.forEach(situacion => {
                if (situacion.hasOwnProperty('pru_id') && situacion.hasOwnProperty('pru_situacion')) {
                    const nombrePdf = situacion.pru_nombrepdf;
                    const idpdf = situacion.pru_id;
                    const valor = situacion.pru_situacion;
                    situacionSelect.append(`<option value="${idpdf}">${nombrePdf}</option>`); // Cambio en la opción para que el valor sea el idpdf
                }
            });
        }

    } catch (error) {
        console.error('Error al obtener situaciones:', error);
    }
}

$(document).ready(function() {
    consultarSituaciones();

    // Asociar la función descargarPDF al evento click del botón con ID "descarga"
    $('#descarga').on('click', function() {
        descargarPDF(); // Llama a descargarPDF para obtener y descargar el PDF con el ID seleccionado
    });
});

async function descargarPDF() {
    const idElegido = $('#situacionSelect').val(); // Obtener el valor seleccionado en el select
    const datos = {};
    if (idElegido) {
        datos.pru_id = idElegido; // Ajustar el nombre del parámetro según lo esperado por tu backend

        try {
            const url = `pdf/${idElegido}`; // Utiliza el valor seleccionado en la URL
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf'
                },
            });

            const data = await response.blob(); // Obtener los bytes del PDF como un Blob
            console.log("Datos de la API: ", data);

            const fileURL = window.URL.createObjectURL(data); // Crear una URL del Blob
            const downloadLink = document.createElement('a');
            downloadLink.href = fileURL;
            downloadLink.setAttribute('download', 'archivo.pdf'); // Nombre del archivo a descargar
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    } else {
        console.error('No se ha seleccionado ninguna opción');
    }
}























