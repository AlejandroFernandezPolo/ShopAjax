/* global bootstrap fetch */

(() => {
    'use strict'

    const url = document.querySelector('meta[name="url-base"]')['content'];
    let imageData;
    
    document.addEventListener("DOMContentLoaded", function (event) {
        getCart();
    //     document.getElementById('addCart').onclick = () => {
		  //  addToCart(document.getElementById('addCart'));
    // 	};
    });

    function getCart() {
        fetch(url + '/mycart')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showCart(data);
                document.getElementById('numberCart').innerHTML = '('+data.number+')';
            })
            .catch(error => console.error("Error:", error));
    }

    function showCart(data) {
        var mainContainer = document.getElementById('cartShow');
        mainContainer.innerHTML = '';
        console.log(JSON.parse(data.cart));
        // Hacemos bucle para recorrer data
        let cart = JSON.parse(data.cart);
        let subtotal = 0;
        let iva = 0.21;
        let total = 0;
        for (let index in cart) {
            let product = cart[index];
            // Crear un nuevo elemento 'tr' (fila de la tabla)
            var newRow = document.createElement('tr');
            
            // Crear el elemento th y su contenido
            var thElement = document.createElement('th');
            thElement.className = 'ps-0 py-3 border-light';
            thElement.setAttribute('scope', 'row');
            
            // Crear el contenido dentro del th
            var divContainer = document.createElement('div');
            divContainer.className = 'd-flex align-items-center';
            
            var linkElement = document.createElement('a');
            linkElement.className = 'reset-anchor d-block animsition-link';
            linkElement.href = 'detail.html';
            
            var imgElement = document.createElement('img');
            imgElement.src = "data:image/jpeg;base64,"+ product.cover;
            imgElement.alt = '...';
            imgElement.width = '70';
            
            linkElement.appendChild(imgElement);
            
            var divInner = document.createElement('div');
            divInner.className = 'ms-3';
            
            var strongElement = document.createElement('strong');
            strongElement.className = 'h6';
            
            var linkInner = document.createElement('a');
            linkInner.className = 'reset-anchor animsition-link';
            linkInner.href = 'detail.html';
            console.log(product.name.length);
            let maxLength = 20;
            if(product.name.length > maxLength){
                linkInner.textContent = product.name.substring(0, maxLength) + '...';
            }else{
                linkInner.textContent = product.name;
            }
            
            strongElement.appendChild(linkInner);
            divInner.appendChild(strongElement);
            divContainer.appendChild(linkElement);
            divContainer.appendChild(divInner);
            
            thElement.appendChild(divContainer);
            newRow.appendChild(thElement);
            
            // Crear y agregar los elementos td con su contenido
            var td1 = document.createElement('td');
            td1.className = 'p-3 align-middle border-light';
            
            var pElement1 = document.createElement('p');
            pElement1.className = 'mb-0 small';
            pElement1.textContent = product.price.toFixed(2)+'€';
            
            td1.appendChild(pElement1);
            newRow.appendChild(td1);
            
            var td2 = document.createElement('td');
            td2.className = 'p-3 align-middle border-light';
            
            var divBorder = document.createElement('div');
            divBorder.className = 'border d-flex align-items-center justify-content-between px-3';
            
            var spanElement = document.createElement('span');
            spanElement.className = 'small text-uppercase text-gray headings-font-family';
            spanElement.textContent = 'Quantity';
            
            var divQuantity = document.createElement('div');
            divQuantity.className = 'quantity';
            
            var buttonDec = document.createElement('button');
            buttonDec.className = 'dec-btn p-0';
            buttonDec.innerHTML = '<i class="fas fa-caret-left"></i>';
            if(product.count > 1){
                buttonDec.onclick = () => {
                    dleteProdFromCart(product.id);
         	    };
            }
            
            var inputElement = document.createElement('input');
            inputElement.className = 'form-control form-control-sm border-0 shadow-0 p-0';
            inputElement.type = 'text';
            inputElement.value = product.count;
            
            var buttonInc = document.createElement('button');
            buttonInc.className = 'inc-btn p-0';
            buttonInc.innerHTML = '<i class="fas fa-caret-right"></i>';
            buttonInc.onclick = () => {
                addToCart(product.id);
         	};
            
            divQuantity.appendChild(buttonDec);
            divQuantity.appendChild(inputElement);
            divQuantity.appendChild(buttonInc);
            
            divBorder.appendChild(spanElement);
            divBorder.appendChild(divQuantity);
            
            td2.appendChild(divBorder);
            newRow.appendChild(td2);
            
            var td3 = document.createElement('td');
            td3.className = 'p-3 align-middle border-light';
            
            var pElement2 = document.createElement('p');
            pElement2.className = 'mb-0 small';
            subtotal += product.price*product.count;
            pElement2.textContent = (product.price*product.count).toFixed(2)+'€';
            
            td3.appendChild(pElement2);
            newRow.appendChild(td3);
            
            var td4 = document.createElement('td');
            td4.className = 'p-3 align-middle border-light';
            td4.href = url + '/product/'+ product.id + '/dltCart';
            
            var linkDelete = document.createElement('a');
            linkDelete.className = 'reset-anchor';
            linkDelete.onclick = () => {
                dleteFromCart(product.id);
         	};
            
            var iElement = document.createElement('i');
            iElement.className = 'fas fa-trash-alt small text-muted';
            
            linkDelete.appendChild(iElement);
            td4.appendChild(linkDelete);
            newRow.appendChild(td4);
            
            mainContainer.appendChild(newRow);

        };
        
        var orderContainer = document.getElementById('orderTotal');
        orderContainer.innerHTML = '';
        // Crear el contenedor principal
        var divCard = document.createElement('div');
        divCard.classList.add('card', 'border-0', 'rounded-0', 'p-lg-4', 'bg-light');
        
        // Crear el cuerpo de la tarjeta
        var divCardBody = document.createElement('div');
        divCardBody.classList.add('card-body');
        
        // Crear el título h5
        var h5Element = document.createElement('h5');
        h5Element.classList.add('text-uppercase', 'mb-4');
        h5Element.textContent = 'Cart total';
        
        // Crear la lista ul
        var ulElement = document.createElement('ul');
        ulElement.classList.add('list-unstyled', 'mb-0');
        
        // Crear y agregar el primer elemento li
        var liElement1 = document.createElement('li');
        liElement1.classList.add('d-flex', 'align-items-center', 'justify-content-between');
        
        var strongElement1 = document.createElement('strong');
        strongElement1.classList.add('text-uppercase', 'small', 'font-weight-bold');
        strongElement1.textContent = 'Subtotal';
        
        var spanElement1 = document.createElement('span');
        spanElement1.classList.add('text-muted', 'small');
        spanElement1.textContent = subtotal.toFixed(2)+'€';
        
        liElement1.appendChild(strongElement1);
        liElement1.appendChild(spanElement1);
        
        var liElement12 = document.createElement('li');
        liElement12.classList.add('d-flex', 'align-items-center', 'justify-content-between');
        
        var strongElement12 = document.createElement('strong');
        strongElement12.classList.add('text-uppercase', 'small', 'font-weight-bold');
        strongElement12.textContent = 'IVA(21%)';
        
        var spanElement12 = document.createElement('span');
        spanElement12.classList.add('text-muted', 'small');
        iva = iva * subtotal;
        spanElement12.textContent = iva.toFixed(2)+'€';
        
        liElement12.appendChild(strongElement12);
        liElement12.appendChild(spanElement12);
        
        // Crear y agregar el segundo elemento li (línea divisoria)
        var liElement2 = document.createElement('li');
        liElement2.classList.add('border-bottom', 'my-2');
        
        // Crear y agregar el tercer elemento li
        var liElement3 = document.createElement('li');
        liElement3.classList.add('d-flex', 'align-items-center', 'justify-content-between', 'mb-4');
        
        var strongElement2 = document.createElement('strong');
        strongElement2.classList.add('text-uppercase', 'small', 'font-weight-bold');
        strongElement2.textContent = 'Total';
        
        var spanElement2 = document.createElement('span');
        total = iva + subtotal;
        spanElement2.textContent = total.toFixed(2)+'€';
        
        liElement3.appendChild(strongElement2);
        liElement3.appendChild(spanElement2);
        
        // Crear y agregar el cuarto elemento li con el formulario
        var liElement4 = document.createElement('li');
        
        var formElement = document.createElement('form');
        formElement.action = '#';
        
        var divInputGroup = document.createElement('div');
        divInputGroup.classList.add('input-group', 'mb-0');
        
        var inputElement = document.createElement('input');
        inputElement.classList.add('form-control');
        inputElement.type = 'text';
        inputElement.placeholder = 'Enter your coupon';
        
        var buttonElement = document.createElement('button');
        buttonElement.classList.add('btn', 'btn-dark', 'btn-sm', 'w-100');
        buttonElement.type = 'submit';
        buttonElement.innerHTML = '<i class="fas fa-gift me-2"></i>Apply coupon';
        
        divInputGroup.appendChild(inputElement);
        divInputGroup.appendChild(buttonElement);
        
        formElement.appendChild(divInputGroup);
        
        liElement4.appendChild(formElement);
        
        // Agregar todos los elementos a la estructura
        ulElement.appendChild(liElement1);
        ulElement.appendChild(liElement12);
        ulElement.appendChild(liElement2);
        ulElement.appendChild(liElement3);
        ulElement.appendChild(liElement4);
        
        divCardBody.appendChild(h5Element);
        divCardBody.appendChild(ulElement);
        
        divCard.appendChild(divCardBody);

        
        orderContainer.appendChild(divCard);

       
    }
    
    function dleteFromCart(idProd) {
        fetch(url + '/product/'+ idProd + '/dltCart')
            .then(response => response.json())
            .then(data => {
                getCart();
                console.log('eliminado');
            })
            .catch(error => console.error("Error:", error));
	}
	
	 function dleteProdFromCart(idProd) {
        fetch(url + '/product/'+ idProd + '/dltprodCart')
            .then(response => response.json())
            .then(data => {
                getCart();
                console.log('unomenos');
            })
            .catch(error => console.error("Error:", error));
	}
	
	function addToCart(idProd) {
        fetch(url + '/product/'+ idProd + '/cart')
            .then(response => response.json())
            .then(data => {
                getCart();
                console.log('añadido');
            })
            .catch(error => console.error("Error:", error));
	}

})()

