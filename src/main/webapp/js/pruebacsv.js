$(document).ready(function () {
    $('#formFile').change(function () {
        $('#validateButton').prop('disabled', false);
    });

    $('#validateButton').click(function () {
        var file = $('#formFile')[0].files[0];

        if (!file) {
            $('#mensajeError').text('Por favor, seleccione un archivo CSV.');
            return;
        }

        Papa.parse(file, {
            header: true,
            complete: function (results) {
                // `results` contiene los datos del archivo CSV analizado
                // Aquí puedes realizar tu lógica de validación de los datos
                
                // Ejemplo: Validar que haya al menos una columna llamada "Nombre"
                if (!results.data[0].hasOwnProperty('Nombre')) {
                    $('#mensajeError').text('El archivo CSV no contiene la columna "Nombre".');
                    return;
                }

                // Si la validación es exitosa, habilita el botón de enviar
                $('#submitButton').prop('disabled', false);
                $('#mensajeError').text('El archivo CSV es válido y puede ser subido.');
            },
            error: function (error) {
                $('#mensajeError').text('Error al analizar el archivo CSV: ' + error.message);
            }
        });
    });

    // Resto del código para enviar el archivo al servidor...
});









