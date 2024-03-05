/* global bootstrap fetch */
(() => {
    'use strict'



    const csrf = document.querySelector('meta[name="csrf-token"]')['content'];
    const url = document.querySelector('meta[name="url-base"]')['content'];
    let deleteUrl;

    document.addEventListener("DOMContentLoaded", function (event) {
        getProducts();

    });

    function getProducts() {
        fetch(url + '/proadmin')
            .then(response => response.json())
            .then(data => {
                showProducs(data);
            })
            .catch(error => console.error("Error:", error));
    }

    function showProducs(data) {
        var mainContainer = document.getElementById('productsContainer');
        if (mainContainer == null) {
            mainContainer = document.createElement('div');
            mainContainer.className = 'row'; // Puedes ajustar la clase según tus necesidades
            mainContainer.setAttribute('id', 'productsContainer');
        } else {
            mainContainer.innerHTML = '';
        }

        mainContainer.innerHTML = '';
        mainContainer.className = 'table-responsive small';

        let newTitle = document.createElement('h2');
        newTitle.innerHTML = "Products";
        newTitle.className = 'h5 text-uppercase mb-4';
        mainContainer.appendChild(newTitle);

        let buttonDiv = document.createElement('div');
        mainContainer.appendChild(buttonDiv);

        let addBtn = document.createElement("a");
        addBtn.className = "btn btn-success mt-2 mb-3";
        addBtn.innerHTML = "Create product";
        addBtn.style.marginLeft = '2rem';
        addBtn.style.color = 'black';
        addBtn.setAttribute('href', url+'/product/create');
        buttonDiv.appendChild(addBtn);


        let deleteAllBtn = document.createElement("a");
        deleteAllBtn.className = "btn btn-danger mt-2 mb-3";
        deleteAllBtn.innerHTML = "Delete all";
        deleteAllBtn.setAttribute('data-bs-toggle', 'modal');
        deleteAllBtn.setAttribute('data-bs-target', '#deleteProductModal');
        deleteAllBtn.setAttribute('data-mode', 'all');
        deleteAllBtn.setAttribute('data-url', url + '/product');
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

        let tproduct = document.createElement("th");
        tproduct.setAttribute("scope", "col");
        tproduct.innerHTML = 'Category';
        thtr.appendChild(tproduct);

        let tprice = document.createElement("th");
        tprice.setAttribute("scope", "col");
        tprice.innerHTML = 'Price';
        thtr.appendChild(tprice);
        
        let timage = document.createElement("th");
        timage.innerHTML = 'Image';
        thtr.appendChild(timage);

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
        for (let product of data.products) {
            product = product.product;
            let row = document.createElement('tr');
            let id = document.createElement('td');
            let name = document.createElement('td');
            let category = document.createElement('td');
            let price = document.createElement('td');
            let image = document.createElement('td');
            let actions = document.createElement('td');

            id.innerHTML = product.id;
            name.innerHTML = product.name;
            category.innerHTML = product.category;
            price.innerHTML = product.price+ ' €';
            let img = document.createElement('img');
            if(product.cover != null) {
                img.setAttribute("src", "data:image/jpeg;base64,"+ product.cover);
                img.height = 50;
                img.width = 50;
            }

            let showBtn = document.createElement('a');
            let editBtn = document.createElement('a');
            let deleteBtn = document.createElement('a');

            showBtn.className = 'btn btn-primary';
            showBtn.style.marginRight = '1rem';
            showBtn.setAttribute('data-id', product.id);
            showBtn.setAttribute('data-name', product.name);
            showBtn.setAttribute('href', url + '/product/' + product.id + '/view');

            editBtn.className = 'btn btn-warning';
            editBtn.style.marginRight = '1rem';
            editBtn.setAttribute('data-id', product.id);
            editBtn.setAttribute('data-name', product.name);
            editBtn.setAttribute('data-url', url + '/product/' + product.id);
            editBtn.setAttribute('href', url + '/product/' + product.id + '/edit');

            deleteBtn.className = 'btn btn-danger';
            deleteBtn.style.marginRight = '1rem';
            deleteBtn.setAttribute('data-bs-toggle', 'modal');
            deleteBtn.setAttribute('data-bs-target', '#deleteProductModal');
            deleteBtn.setAttribute('data-id', product.id);
            deleteBtn.setAttribute('data-name', product.name);
            deleteBtn.setAttribute('data-url', url + '/product/' + product.id);

            showBtn.innerHTML = 'View';
            editBtn.innerHTML = 'Edit';
            deleteBtn.innerHTML = 'Delete';

            actions.appendChild(showBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            row.appendChild(id);
            row.appendChild(name);
            row.appendChild(category);
            row.appendChild(price);
            image.appendChild(img);
            row.appendChild(image);
            row.appendChild(actions);
            body.appendChild(row);
        }
        table.appendChild(body);
        mainContainer.appendChild(table);
    }

    document.getElementById('btDeleteProduct').onclick = () => {
		peticionDeleteProduct(deleteUrl);
	};

	var deleteProductModal = document.getElementById('deleteProductModal')
	deleteProductModal.addEventListener('shown.bs.modal', function (event) {
		let title = document.getElementById('deleteProductTitle');
		if (event.relatedTarget.dataset.mode == 'all') {
			title.innerHTML = "Delete all products";
		} else {
			title.innerHTML = "Delete " + event.relatedTarget.dataset.name;
		}
		document.getElementById('productName').innerHTML = event.relatedTarget.dataset.name;
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

    function peticionDeleteProduct(data) {
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
                var modalElem = document.querySelector('#deleteProductModal');
                var modalInstance = bootstrap.Modal.getInstance(modalElem);
                modalInstance.hide();
                var okAlert = document.getElementById('okAlert');
                okAlert.className = 'alert alert-success';
                okAlert.innerHTML = 'Correctamente eliminado';
                getProducts();
            })
            .catch(error => console.error("Error:", error));
    };

})()

