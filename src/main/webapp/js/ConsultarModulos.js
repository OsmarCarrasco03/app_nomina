$(function() {
	MostrarPagina(9);
	if(sessionStorage.permisos == 1){
		$("#datosControl").prop("hidden", false);
	}
});

// Async Function to fetch data from the API
async function obtenerPrivilegios() {
	try {
		const response = await fetch('api/modulo/privilegios', {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch data: ${response.status}`);
		}

		const privilegios = await response.json();
		return privilegios;
	} catch (error) {
		console.error(error);
		return [];
	}
}

// Function to create checkboxes recursively
function createCheckboxes(data, parentId, level) {
	const ul = document.createElement("ul");
	ul.classList.add('tree');

	data.forEach((item) => {
		const [id, label, parent] = item;

		if (parent === parentId) {
			const li = document.createElement("li");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.id = `checkbox-${id}`;
			checkbox.classList.add('form-check-input');
			checkbox.value = id;

			const checkboxLabel = document.createElement("label");
			checkboxLabel.textContent = label;
			checkboxLabel.htmlFor = `checkbox-${id}`;
			checkboxLabel.classList.add('form-check-label');
			
			li.appendChild(checkbox);
			li.appendChild(checkboxLabel);

			const childUl = createCheckboxes(data, id, level + 1);
			if (childUl) {
				li.appendChild(childUl);
			}

			ul.appendChild(li);
		}
	});

	return ul.children.length ? ul : null;
}

// Function to handle checkbox click event
function handleCheckboxClick(checkbox) {
	// Handle child checkboxes
	const childCheckboxes = checkbox.parentElement.querySelectorAll('input[type="checkbox"]');
	childCheckboxes.forEach((childCheckbox) => {
		childCheckbox.checked = checkbox.checked;
	});
	
	// Handle parent checkboxes
    let parentCheckbox = checkbox.parentElement.parentElement.closest('li');
    let siblings = parentCheckbox.querySelectorAll('input[type="checkbox"]');
    let checkedSiblings = Array.from(siblings).filter((sibling) => sibling.checked);
	let firstElementArray = checkedSiblings.length > 0 ? [checkedSiblings[0]] : [];
	let withoutFirstElement = checkedSiblings.slice(1);
	let lastThreeChecked = checkedSiblings.slice(-3);
    
    if(checkedSiblings.length === 1){
		// No checked siblings, uncheck the parent
		checkedSiblings[0].checked = false;
        checkedSiblings[0].indeterminate = false;
	}
   
	// Get the parent checkbox element by its ID
	const parentLiCheckbox = document.getElementById(firstElementArray[0].id);
	
	// Get all the child checkboxes within the parent element
	const childLiCheckboxes = parentLiCheckbox.parentElement.querySelectorAll('input[type="checkbox"]');
	
	// Function to check if all child checkboxes are checked
	function areAllChildrenChecked() {
	  for (const childCheckbox of childLiCheckboxes) {
	    if (!childCheckbox.checked) {
	      return false; // At least one child checkbox is not checked
	    }
	  }
	  return true; // All child checkboxes are checked
	}
	
	// Usage: Check if all child checkboxes are checked
	const allChildrenChecked = areAllChildrenChecked();
	
	if (allChildrenChecked) {
		siblings[0].checked = true;
		siblings[0].indeterminate = false;
	} else {
        siblings[0].indeterminate = true;
	}
}

// Get the container element
const container = document.getElementById("checkbox-tree");

// Initialize the checkbox tree view
async function initializeTreeView() {
	try {
		const jsonData = await obtenerPrivilegios(); // Fetch data from the API

		// Create the checkbox tree view
		const treeView = createCheckboxes(jsonData, 0, 1); // Start with top-level items

		if (treeView) {
			container.appendChild(treeView);
		}

		// Add event listeners to checkboxes
		const checkboxes = container.querySelectorAll('input[type="checkbox"]');
		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("change", () => {
				handleCheckboxClick(checkbox);
			});
		});
	} catch (error) {
		console.error(error);
	}
}

// Call the initializeTreeView function to fetch data and create the tree
initializeTreeView();

async function autocompletarPersona() {
	const request = await fetch('api/usuario/autocompletarUsuario', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
	});

	const data = await request.json();
	
	if (verificarJson1(data)) {
		swal({
		  title: "Error al obtener autocompletado",
		  text: "Contacte al administrador del sistema",
		  icon: "error",
		  button: "Cerrar",
		});
		return;
	}
	
	let stringDatos = '';

	for (let usuarios of data) {
		stringDatos += usuarios[2] +  ' - ' + usuarios[4] + ' ' + usuarios[5] + ' ' + usuarios[6] + ';';
	}

	let arrayDatos = stringDatos.split(";");
	
	return arrayDatos;
}

async function iniciarAutoComplete() {
	const resultados = await autocompletarPersona();
	const autoCompleteInput = document.getElementById('autoComplete');

	const autoCompleteJS = new autoComplete({
		selector: "#autoComplete",
		placeHolder: "Buscar por Nombre o Usuario",
		data: {
			src: resultados, // Usar el array combinado
			cache: true,
		},
		resultItem: {
			highlight: true
		},
		events: {
			input: {
				query: (query, autoCompleteJS) => {
					if (query.length >= 3) { // Verifica si la longitud del texto es mayor o igual a 3
						autoCompleteJS.start();
					} else {
						autoCompleteJS.stop();
					}
				},
				selection: (event) => {
					const selection = event.detail.selection.value;
					autoCompleteInput.value = selection;
				}
			}
		}
	});
}

// Llama a la función para iniciar autoComplete
iniciarAutoComplete();
