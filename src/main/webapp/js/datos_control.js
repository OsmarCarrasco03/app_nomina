// Función general para registrar o consultar datos de control.
async function datosControl1() {
	$("#inpUsuarioCapturo").val(sessionStorage.nombre);//ESTE CAMPO TRAE EL NOMBRE DEL USUARIO 
	$("#inpUsuarioModifico").val(sessionStorage.nombre);

	var fechaHoy = new Date().toISOString().split('T')[0];
	$("#inpFechaModificacion").val(fechaHoy);
	$("#inpFechaInicio").val(fechaHoy);

	var inputSituacion = document.getElementById('inpSituacion');
	inputSituacion.value = "ACTIVO";

	
}

    const inpFechaInicio = document.getElementById("inpFechaInicio").value;
	//	let inpFechaTermino = document.getElementById("inpFechaTermino").value;
	const inpUsuarioCapturo = sessionStorage.idUsuario;
	const inpFechaModificacion = document.getElementById("inpFechaModificacion").value;
	const inpUsuarioModifico = sessionStorage.idUsuario;
	const inpSituacion = "1";
	
// FIN llenar los datos de control


//Inicio datos de control api get

//Funcion que trae los datos de control para llenarlos
async function datosControlGet(inpusucap, inpusumod, inpfechaini, inpfechamod, inpsitu, inpfechaterm){
	document.getElementById('inpFechaInicio').value = inpfechaini;
	document.getElementById('inpFechaTermino').value = inpfechaterm;
	document.getElementById('inpUsuarioCapturo').value = inpusucap;
	document.getElementById('inpFechaModificacion').value = inpfechamod;
	document.getElementById('inpUsuarioModifico').value = inpusumod;
	document.getElementById('inpSituacion').value = inpsitu;
}













