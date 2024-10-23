

function myFunction() {
    let x = document.getElementById("myDIV");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    
}

function myFunctionuno() {
    alert('Registro seguro')
}


// Creamos variable que almacenara el ID a borrar
var inputfocused = "";

// Le añadimos función de borrar al botón


// En este caso concreto seleccionamos todos los input text y password
// para una selección más precisa se puede usa una clase
// para una selección más general, se puede usar solo 'input'
var elements = document.querySelectorAll("input[type='text'],input[type='text']");
// Por cada input field le añadimos una funcion 'onFocus'
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("focus", function() {
    // Guardamos la ID del elemento al que hacemos 'focus'
    inputfocused = this; 
  });
 	
}
function limpiaCampo() {
  //Utilizamos el elemento al que hacemos focus para borrar el campo.
  inputfocused.value = "";
  
}



function printDiv(myDIV) {
     var contenido = document.getElementById(myDIV).innerHTML;
     var contenidoOriginal= document.body.innerHTML;
     document.body.innerHTML = contenido;
     window.print();
     document.body.innerHTML = contenidoOriginal;

	//Create XMLHTTP Request.
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.responseType = "blob";
	req.onload = function() {
		//Convert the Byte Data to BLOB object.
		var blob = new Blob([req.response], { type: "application/octetstream" });

		//Check the Browser type and download the File.
		var isIE = false || !!document.documentMode;
		if (isIE) {
			window.navigator.msSaveBlob(blob, fileName);
		} else {
			var url = window.URL || window.webkitURL;
			link = url.createObjectURL(blob);
			var a = document.createElement("a");
			a.setAttribute("download", fileName);
			a.setAttribute("href", link);
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};
	req.send();
};
