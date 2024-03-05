/* global bootstrap fetch */
(() => {
	'use strict'



	const csrf = document.querySelector('meta[name="csrf-token"]')['content'];
	const url = document.querySelector('meta[name="url-base"]')['content'];
	let deleteUrl;

	document.addEventListener("DOMContentLoaded", function (event) {
		getCategories();

	});

	function getCategories() {
		fetch(url + '/category')
			.then(response => response.json())
			.then(data => {
				showCategories(data);
			})
			.catch(error => console.error("Error:", error));
	}

	function showCategories(data) {
        var mainContainer = document.getElementById('categoriesContainer');
		mainContainer.innerHTML = '';
		mainContainer.className = 'table-responsive small';

		let newTitle = document.createElement('h2');
		newTitle.innerHTML = "Categories";
		newTitle.className = 'h5 text-uppercase mb-4';
		mainContainer.appendChild(newTitle);

		let buttonDiv = document.createElement('div');
		mainContainer.appendChild(buttonDiv);

		let addBtn = document.createElement("a");
		addBtn.className = "btn btn-success mt-2 mb-3";
		addBtn.innerHTML = "Create category";
		addBtn.style.marginLeft = '2rem';
		addBtn.style.color = 'black';
		addBtn.onclick = () => {
			showCreateForm();
		};
		buttonDiv.appendChild(addBtn);


		let deleteAllBtn = document.createElement("a");
		deleteAllBtn.className = "btn btn-danger mt-2 mb-3";
		deleteAllBtn.innerHTML = "Delete all";
		deleteAllBtn.setAttribute('data-bs-toggle', 'modal');
		deleteAllBtn.setAttribute('data-bs-target', '#deleteCategoryModal');
		deleteAllBtn.setAttribute('data-mode', 'all');
		deleteAllBtn.setAttribute('data-url', url + '/category');
		deleteAllBtn.style.marginLeft = '1rem';
		deleteAllBtn.style.color = 'black';
		buttonDiv.appendChild(deleteAllBtn);

		// Creamos la tabla
		let table = document.createElement("table");
		table.className = 'table table-striped table-sm';

		// Creamos la cabecera de la tabla
		let head = document.createElement("thead");
		let thtr = document.createElement("tr");

		let tcode = document.createElement("th");
		tcode.setAttribute("scope", "col");
		tcode.innerHTML = '#';
		thtr.appendChild(tcode);

		let tname = document.createElement("th");
		tname.setAttribute("scope", "col");
		tname.innerHTML = 'Name';
		thtr.appendChild(tname);

		let tactions = document.createElement("th");
		tactions.setAttribute("scope", "col");
		tactions.innerHTML = "Actions";
		thtr.appendChild(tactions);

		// AÃ±adimos la fila a la cabecera
		head.appendChild(thtr);

		// AÃ±adimos la cabecera a la tabla
		table.appendChild(head);

		// Creamos el cuerpo de la tabla
		let body = document.createElement("tbody");

		// Hacemos bucle para recorrer data
		for (const category of data.categories) {
			let row = document.createElement('tr');
			let id = document.createElement('td');
			let name = document.createElement('td');
			let actions = document.createElement('td');

			id.innerHTML = category.id;
			name.innerHTML = category.name;

			let showBtn = document.createElement('a');
			let editBtn = document.createElement('a');
			let deleteBtn = document.createElement('a');

			showBtn.className = 'btn btn-primary';
			showBtn.style.marginRight = '1rem';
			showBtn.setAttribute('data-id', category.id);
			showBtn.setAttribute('data-name', category.name);
			showBtn.onclick = (e) => {
				alert(`Category ${e.target.dataset.name} con codigo ${e.target.dataset.id}`);
			}

			editBtn.className = 'btn btn-warning';
			editBtn.style.marginRight = '1rem';
			editBtn.setAttribute('data-id', category.id);
			editBtn.setAttribute('data-name', category.name);
			editBtn.setAttribute('data-url', url + '/category/' + category.id);
			editBtn.onclick = () => {
				showEditForm(editBtn);
			}

			deleteBtn.className = 'btn btn-danger';
			deleteBtn.style.marginRight = '1rem';
			deleteBtn.setAttribute('data-bs-toggle', 'modal');
			deleteBtn.setAttribute('data-bs-target', '#deleteCategoryModal');
			deleteBtn.setAttribute('data-id', category.id);
			deleteBtn.setAttribute('data-name', category.name);
			deleteBtn.setAttribute('data-url', url + '/category/' + category.id);

			showBtn.innerHTML = 'View';
			editBtn.innerHTML = 'Edit';
			deleteBtn.innerHTML = 'Delete';

			actions.appendChild(showBtn);
			actions.appendChild(editBtn);
			actions.appendChild(deleteBtn);

			row.appendChild(id);
			row.appendChild(name);
			row.appendChild(actions);
			body.appendChild(row);
		}
		table.appendChild(body);
		mainContainer.appendChild(table);
	}

	function showCreateForm() {
		showForm();
		var button = document.getElementById('actionFormCategory');
		var input = document.getElementById('idName');
		button.onclick = function () {
			//validar en js, nos lo saltamnos
			createCategory(input);
		};
	}

	function showEditForm(button) {
		showForm();
		let input = document.getElementById('idName');
		input.setAttribute('placeholder', button.getAttribute('data-name'))
		input.innerHTML = button.getAttribute('data-name');

		var actionButton = document.getElementById('actionFormCategory');
		actionButton.onclick = function () {
			//validar en js, nos lo saltamnos
			if (input.value != '') {
				let data = {
					url: button.getAttribute('data-url'),
					id: button.getAttribute('data-id'),
					name: input.value
				}
				peticionEditCategory(data);
			}
		};
	}

	function showForm() {
		var mainContainer = document.getElementById('formCategories');
		mainContainer.innerHTML = '';

		var containerDiv1 = document.createElement('div');
		containerDiv1.className = 'col-md-12 d-flex';


		var innerDiv1 = document.createElement('div');
		innerDiv1.className = 'col-md-12';

		var form1 = document.createElement('form');
		form1.action = '#';
		form1.className = 'billing-form';

		var heading1 = document.createElement('h3');
		heading1.className = 'mb-12 billing-heading';
		heading1.textContent = 'Create Category';

		var row1 = document.createElement('div');
		row1.className = 'row align-items-end';

		var col1 = document.createElement('div');
		col1.className = 'col-md-12';

		var formGroup1 = document.createElement('div');
		formGroup1.className = 'form-group';

		var label1 = document.createElement('label');
		label1.htmlFor = 'firstname';
		label1.textContent = 'Name';

		var input1 = document.createElement('input');
		input1.id = "idName";
		input1.type = 'text';
		input1.className = 'form-control';
		input1.placeholder = '';

		// Construir la estructura del primer bloque
		formGroup1.appendChild(label1);
		formGroup1.appendChild(input1);
		col1.appendChild(formGroup1);
		row1.appendChild(col1);
		form1.appendChild(heading1);
		form1.appendChild(row1);
		innerDiv1.appendChild(form1);
		containerDiv1.appendChild(innerDiv1);

		// Agregar el primer bloque al documento
		mainContainer.appendChild(containerDiv1);

		// Segundo bloque
		var containerDiv2 = document.createElement('div');
		containerDiv2.className = 'col-md-12 d-flex';

		var innerDiv2 = document.createElement('div');
		innerDiv2.className = 'col-md-12';

		var row2 = document.createElement('div');
		row2.className = 'row justify-content-start d-flex';

		var col2 = document.createElement('div');
		col2.className = 'col col-lg-5 col-md-6 mt-5 cart-wrap ml-auto';

		var paragraph2 = document.createElement('p');
		paragraph2.className = 'text-center';

		var link2 = document.createElement('a');
		link2.className = 'btn btn-primary py-3 px-4';
		link2.textContent = 'Create';
		link2.id = "actionFormCategory";


		// Construir la estructura del segundo bloque
		paragraph2.appendChild(link2);
		col2.appendChild(paragraph2);
		row2.appendChild(col2);
		innerDiv2.appendChild(row2);
		containerDiv2.appendChild(innerDiv2);

		// Agregar el segundo bloque al documento
		mainContainer.appendChild(containerDiv2);
	}

	function hideForm() {
		var mainContainer = document.getElementById('formCategories');
		mainContainer.innerHTML = '';
		getCategories();
	}

	document.getElementById('btDeleteCategory').onclick = () => {
		peticionDeleteCategory(deleteUrl);
	};

	var deleteCategoryModal = document.getElementById('deleteCategoryModal')
	deleteCategoryModal.addEventListener('shown.bs.modal', function (event) {
		let title = document.getElementById('deleteCategoryTitle');
		if (event.relatedTarget.dataset.mode == 'all') {
			title.innerHTML = "Delete all categories";
		} else {
			title.innerHTML = "Delete " + event.relatedTarget.dataset.name;
		}
		deleteUrl = event.relatedTarget.dataset.url;
	});

	function createAlerts() {
		var contentDiv = document.getElementById('adminContainer');

		if (document.getElementById("okAlert")) {
			document.getElementById("okAlert").className = 'alert alert-success visually-hidden';
		} else {
			let divSuccessAlert = document.createElement('div');
			divSuccessAlert.setAttribute('id', 'okAlert');
			divSuccessAlert.setAttribute('role', 'alert');
			divSuccessAlert.className = 'alert alert-success visually-hidden';
			contentDiv.appendChild(divSuccessAlert);
		}

		if (document.getElementById("errorAlert")) {
			document.getElementById("errorAlert").className = 'alert alert-danger visually-hidden';
		} else {
			let divErrorAlert = document.createElement('div');
			divErrorAlert.setAttribute('id', 'errorAlert');
			divErrorAlert.setAttribute('role', 'alert');
			divErrorAlert.className = 'alert alert-danger visually-hidden';
			contentDiv.appendChild(divErrorAlert);
		}
	}

	function createCategory(input) {
		let data = {
			name: input.value,
		};
		createAlerts();
		fetch(url + '/category', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-CSRF-TOKEN': csrf
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				if (data.result > 0) {
					var okAlert = document.getElementById('okAlert');
					okAlert.className = 'alert alert-success';
					okAlert.innerHTML = 'Category correctly inserted';
					hideForm();
				} else {
					var errorAlert = document.getElementById('errorAlert');
					errorAlert.className = 'alert alert-danger';
					errorAlert.innerHTML = data.message.name;
				}
			})
			.catch(error => {
				console.log("Error:", error);
			}
			);
		//Esconder form
	}

	function peticionEditCategory(data) {
		createAlerts();
		let sendData = {
			id: data.id,
			name: data.name,
		};
		fetch(data.url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-CSRF-TOKEN': csrf
			},
			body: JSON.stringify(data),
		})
			.then(response => response.json())
			.then(data => {
				//Eror cuando pone nombre duplicado
				if (data.result > 0) {
					var okAlert = document.getElementById('okAlert');
					okAlert.className = 'alert alert-success';
					okAlert.innerHTML = 'Correctamente actualizado';
					hideForm();
				}
			})
			.catch(error => console.error("Error:", error));
	};

	function peticionDeleteCategory(data) {
		createAlerts();
		fetch(data, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'X-CSRF-TOKEN': csrf
			},
		})
			.then(response => response.json())
			.then(data => {
			    console.log(data);
			    var modalElem = document.querySelector('#deleteCategoryModal');
    			var modalInstance = bootstrap.Modal.getInstance(modalElem);
    			modalInstance.hide();
			    if (data.respuesta.result > 0) {
					getCategories();
    				var okAlert = document.getElementById('okAlert');
    				okAlert.className = 'alert alert-success';
    				okAlert.innerHTML = 'Correctamente eliminado';
				}else{
				    var errorAlert = document.getElementById('errorAlert');
    			    errorAlert.className = 'alert alert-danger';
    			    errorAlert.innerHTML = 'Error al eliminar '+ data.respuesta.message.errorInfo;
				}
			})
			.catch(error => console.error("Error:", error));
	};

})()

