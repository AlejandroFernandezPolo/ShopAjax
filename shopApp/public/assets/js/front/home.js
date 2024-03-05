/* global bootstrap fetch */
(() => {
    'use strict'

    const url = document.querySelector('meta[name="url-base"]')['content'];
    let imageData;
    
    document.addEventListener("DOMContentLoaded", function (event) {
        getProducts();

    });

    function getProducts() {
        fetch(url + '/product/resume')
            .then(response => response.json())
            .then(data => {
                showProducs(data);
            })
            .catch(error => console.error("Error:", error));
    }

    function showProducs(data) {
        var mainContainer = document.getElementById('trendProds');
        //mainContainer.innerHTML = '';
        console.log(data);
        // Hacemos bucle para recorrer data
        for (let product of data.products) {
            var divCol = document.createElement('div');
            divCol.className = 'col-xl-3 col-lg-4 col-sm-6';
        
            // Crear el elemento div con la clase 'product text-center'
            var divProduct = document.createElement('div');
            divProduct.className = 'product text-center';
        
            // Crear el elemento div con la clase 'position-relative mb-3'
            var divPositionRelative = document.createElement('div');
            divPositionRelative.className = 'position-relative mb-3';
        
            // Crear el elemento div con la clase 'badge text-white bg-'
            var badge = document.createElement('div');
            badge.className = 'badge text-white bg-';
        
            // Crear el elemento a con la clase 'd-block' y el atributo href
            var anchor = document.createElement('a');
            anchor.className = 'd-block';
            anchor.href = 'detail.html';
        
            // Crear el elemento img con las clases y atributos correspondientes
            var img = document.createElement('img');
            img.className = 'img-fluid w-100';
            img.src = "data:image/jpeg;base64,"+ product.cover;
            img.alt = '...';
        
            // Crear el elemento div con la clase 'product-overlay'
            var productOverlay = document.createElement('div');
            productOverlay.className = 'product-overlay';
        
            // Crear el elemento ul con la clase 'mb-0 list-inline'
            var ul = document.createElement('ul');
            ul.className = 'mb-0 list-inline';
        
            // Crear tres elementos li con las clases correspondientes
            var liHeart = document.createElement('li');
            liHeart.className = 'list-inline-item m-0 p-0';
        
            var liAddToCart = document.createElement('li');
            liAddToCart.className = 'list-inline-item m-0 p-0';
        
            var liExpand = document.createElement('li');
            liExpand.className = 'list-inline-item me-0';
        
            // Crear tres elementos a con las clases y atributos correspondientes
            var btnHeart = document.createElement('a');
            btnHeart.className = 'btn btn-sm btn-outline-dark';
            btnHeart.href = '#!';
        
            var btnAddToCart = document.createElement('a');
            btnAddToCart.className = 'btn btn-sm btn-dark';
            btnAddToCart.textContent = 'Add to cart';
            console.log(product.id);
            btnAddToCart.onclick = () => {
                addToCart(product.id);
         	};
        
            var btnExpand = document.createElement('a');
            btnExpand.className = 'btn btn-sm btn-outline-dark';
            btnExpand.href = '#productView';
            btnExpand.setAttribute('data-bs-toggle', 'modal');
            btnExpand.setAttribute('data-id', product.id);
            btnExpand.setAttribute('data-name', product.name);
            btnExpand.setAttribute('data-price', product.price);
            btnExpand.setAttribute('data-description', product.description);
            btnExpand.setAttribute('data-img', "data:image/jpeg;base64,"+ product.cover);
        
            // Crear tres elementos i con las clases correspondientes
            var iHeart = document.createElement('i');
            iHeart.className = 'far fa-heart';
        
            var iExpand = document.createElement('i');
            iExpand.className = 'fas fa-expand';
        
            // Crear el elemento h6 y p con sus respectivos elementos a y contenido
            var h6 = document.createElement('h6');
            var aH6 = document.createElement('a');
            aH6.className = 'reset-anchor';
            aH6.href = url + '/product/' + product.id + '/view';
            aH6.textContent = product.name;
            h6.appendChild(aH6);
        
            var p = document.createElement('p');
            p.className = 'small text-muted';
            p.textContent = product.price+'€';
        
            // Configurar la estructura anidada de los elementos
            btnHeart.appendChild(iHeart);
            liHeart.appendChild(btnHeart);
        
            liAddToCart.appendChild(btnAddToCart);
        
            btnExpand.appendChild(iExpand);
            liExpand.appendChild(btnExpand);
        
            ul.appendChild(liHeart);
            ul.appendChild(liAddToCart);
            ul.appendChild(liExpand);
        
            productOverlay.appendChild(ul);
        
            anchor.appendChild(img);
            divPositionRelative.appendChild(badge);
            divPositionRelative.appendChild(anchor);
            divPositionRelative.appendChild(productOverlay);
        
            divProduct.appendChild(divPositionRelative);
            divProduct.appendChild(h6);
            divProduct.appendChild(p);
        
            divCol.appendChild(divProduct);
        
            // Obtener el elemento contenedor y agregar el nuevo contenido
            mainContainer.appendChild(divCol);
        };
    }

    function addToCart(idProd) {
        fetch(url + '/product/'+ idProd + '/cart')
            .then(response => response.json())
            .then(data => {
                console.log('añadido')
                getCart();
            })
            .catch(error => console.error("Error:", error));
	}

    var productView = document.getElementById('productView')
	productView.addEventListener('shown.bs.modal', function (event) {
		document.getElementById('prodName').innerHTML = event.relatedTarget.dataset.name;
		document.getElementById('prodLink').href = url + '/product/' + event.relatedTarget.dataset.id + '/view';
		document.getElementById('prodPrice').innerHTML = event.relatedTarget.dataset.price + '€';
		document.getElementById('prodDescription').innerHTML = event.relatedTarget.dataset.description;
		document.getElementById('prodImg').src = event.relatedTarget.dataset.img;
		document.getElementById('addCart').onclick = () => {
            addToCart(event.relatedTarget.dataset.id);
        };
	});
	
	function getCart() {
        fetch(url + '/mycart')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById('numberCart').innerHTML = '('+data.number+')';
            })
            .catch(error => console.error("Error:", error));
    }

})()

