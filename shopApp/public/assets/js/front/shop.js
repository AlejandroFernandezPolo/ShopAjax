/* global bootstrap fetch */
(() => {
    'use strict'

    const url = document.querySelector('meta[name="url-base"]')['content'];
    let categorySelected = -1;
    let page = 1;
    let perPage = 12;
    let thisPageMax = perPage;
    let thisPageMin = 1;
    let orderby = 'name';
    let ordertype = 'asc';
    
    
    document.addEventListener("DOMContentLoaded", function (event) {
        getCategories();
        getProducts();
        //  var rowContainer = document.getElementById('paginationInfo');
        //  var linkElement = document.createElement('a');
        //  linkElement.href = url + '/product?page=' + page + '&perPage=' + perPage + '&category=' + categorySelected + '&orderby=' + orderby + '&0rdertype=' + ordertype;
        
        // // // Configurar el contenido del enlace
        //  linkElement.textContent = 'Categories';
        //  rowContainer.appendChild(linkElement)
    });

    function getProducts() {
        fetch(url + '/product?page=' + page + '&perPage=' + perPage + '&category=' + categorySelected + '&orderby=' + orderby + '&ordertype=' + ordertype)
            .then(response => response.json())
            .then(data => {
                showProducs(data);
                showInfoSidebar(data);
                page = parseInt(data.pagination[0].page);
            })
            .catch(error => console.error("Error:", error));
    }
    
    function getCategories() {
		fetch(url + '/category')
			.then(response => response.json())
			.then(data => {
				showSidebar(data);
			})
			.catch(error => console.error("Error:", error));
	}
	
	function showInfoSidebar(data) {
	    let paginationInfo = data.pagination[0];
	    console.log(paginationInfo);
	            // Obtener el contenedor donde deseas insertar estos elementos
        var rowContainer = document.getElementById('paginationInfo'); // Reemplaza con el ID real de tu contenedor
        rowContainer.innerHTML = '';
        
        // Crear la primera columna
        var col1 = document.createElement('div');
        col1.className = 'col-lg-6 mb-2 mb-lg-0';
        
        var paragraph = document.createElement('p');
        paragraph.className = 'text-sm text-muted mb-0';
        if(paginationInfo.totalProducts < paginationInfo.perPage) {
            console.log('hdkjhsdkfh');
            thisPageMax = paginationInfo.totalProducts;
            thisPageMin = 1;
        }else if(paginationInfo.page == paginationInfo.maxPage) {
            thisPageMax = paginationInfo.totalProducts;
        }else {
            thisPageMax = paginationInfo.perPage * paginationInfo.page;
        }
        
        if(paginationInfo.totalProducts >= paginationInfo.perPage) {
            thisPageMin = 1 + (paginationInfo.perPage * (paginationInfo.page - 1 ));
        }
        
        paragraph.textContent = 'Showing '+thisPageMin+'–'+ thisPageMax +' of '+paginationInfo.totalProducts+' results';
        
        col1.appendChild(paragraph);
        
        // Crear la segunda columna
        var col2 = document.createElement('div');
        col2.className = 'col-lg-6';
        
        var ul = document.createElement('ul');
        ul.className = 'list-inline d-flex align-items-center justify-content-lg-end mb-0';
        
        // Crear los elementos de la lista
        var li1 = document.createElement('li');
        li1.className = 'list-inline-item text-muted me-3';
        var link1 = document.createElement('a');
        link1.className = 'reset-anchor p-0';
        link1.innerHTML = '<i class="fas fa-arrow-up"></i>';
        li1.onclick = () => {
            if(ordertype != 'asc'){
                ordertype = 'asc';
                getProducts();
                getCategories();
            }
        };
        li1.appendChild(link1);
        
        var li2 = document.createElement('li');
        li2.className = 'list-inline-item text-muted me-3';
        var link2 = document.createElement('a');
        link2.className = 'reset-anchor p-0';
        link2.innerHTML = '<i class="fas fa-arrow-down"></i>';
        li2.onclick = () => {
            if(ordertype != 'desc'){
                ordertype = 'desc';
                getProducts();
                getCategories();
            }
        };
        li2.appendChild(link2);
        
        var li3 = document.createElement('li');
        li3.className = 'list-inline-item';
        
        var select = document.createElement('select');
        select.id = 'orderby';
        select.className = 'selectpicker';
        select.setAttribute('data-customclass', 'form-control form-control-sm');
        select.addEventListener("change", function(){
            var selectedOption = this.options[this.selectedIndex];
            orderby = selectedOption.value;
            getProducts();
            getCategories();
        });
        
        // Opciones del select
        var defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.text = 'Sort By';
        defaultOption.disabled = true;
        
        var option1 = document.createElement('option');
        option1.value = 'name';
        option1.text = 'Name';
        
        var option2 = document.createElement('option');
        option2.value = 'price';
        option2.text = 'Price';
        
        var option3 = document.createElement('option');
        option3.value = 'id';
        option3.text = 'Newest';
        
        if(orderby == ''){
            defaultOption.selected = 'selected';
        }else if(orderby == 'name') {
            option1.selected = 'selected';
        }else if(orderby == 'price') {
            option2.selected = 'selected';
        }else if(orderby == 'id') {
            option3.selected = 'selected';
        }
        
        select.appendChild(defaultOption);
        select.appendChild(option1);
        select.appendChild(option2);
        select.appendChild(option3);
        
        li3.appendChild(select);
        
        // Agregar elementos a la lista
        ul.appendChild(li1);
        ul.appendChild(li2);
        ul.appendChild(li3);
        
        // Agregar columnas al contenedor principal
        col2.appendChild(ul);
        
        rowContainer.appendChild(col1);
        rowContainer.appendChild(col2);

	}
    
    function showSidebar(data) {
        // Crear el primer div
        var mainContainer = document.getElementById('sidebar');
        mainContainer.innerHTML = '';
        
        console.log(data);
        // Crear el título h5
        var h5Element = document.createElement('h5');
        h5Element.className = 'text-uppercase mb-4';
        h5Element.textContent = 'Categories';
        mainContainer.appendChild(h5Element);
        
        var div1 = document.createElement('div');
        div1.className = 'py-2 px-4 mb-3';
        if (categorySelected < 0) {
            div1.className += ' bg-dark text-white';
        }else{
             div1.className += ' bg-light';
        }
        div1.style.cursor = 'pointer';
        div1.onclick = () => {
            page = 1;
            categorySelected = -1;
            getProducts();
            getCategories();
        };
        
        var strong1 = document.createElement('strong');
        strong1.className = 'small text-uppercase fw-bold';
        strong1.textContent = 'All';
        
        div1.appendChild(strong1);
        
        mainContainer.appendChild(div1);
        
        for (let category of data.categories) {
        
            // Crear el primer div
            var div1 = document.createElement('div');
            div1.className = 'py-2 px-4 mb-3';
            if (categorySelected == category.id) {
                div1.className += ' bg-dark text-white';
            }else{
                 div1.className += ' bg-light';
            }
            div1.style.cursor = 'pointer';
            div1.onclick = () => {
                page = 1;
                categorySelected = category.id;
                getProducts();
                getCategories();
         	};
            
            var strong1 = document.createElement('strong');
            strong1.className = 'small text-uppercase fw-bold';
            strong1.textContent = category.name;
            
            div1.appendChild(strong1);
        
            mainContainer.appendChild(div1);
        }
    }

    function showProducs(data) {
        var mainContainer = document.getElementById('trendProds');
        mainContainer.innerHTML = '';
        console.log(data);
        // Hacemos bucle para recorrer data
        for (let product of data.products) {
            var divCol = document.createElement('div');
            divCol.className = 'col-lg-4 col-sm-6';
        
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
        // Obtén el contenedor de la paginación
        console.log(data.pagination[0].maxPage)
        if(data.pagination[0].maxPage != 1){
            var paginationContainer = document.getElementById('paginationContainer');
            if (paginationContainer == null) {
                paginationContainer = document.createElement('div');
            } else {
                paginationContainer.innerHTML = '';
            }
            
            // Crear el elemento nav con las clases correspondientes
            var navElement = document.createElement('nav');
            navElement.setAttribute('aria-label', 'Page navigation example');
            
            // Crear el elemento ul con las clases correspondientes
            var ulElement = document.createElement('ul');
            ulElement.className = 'pagination justify-content-center justify-content-lg-end';
            
            // Crear los elementos li y a con las clases y atributos correspondientes
            if (page != 1) {
                var liPrevious = document.createElement('li');
                liPrevious.className = 'page-item mx-1';
                var aPrevious = document.createElement('a');
                aPrevious.className = 'page-link';
                aPrevious.href = '#!';
                aPrevious.setAttribute('aria-label', 'Previous');
                aPrevious.innerHTML = '<span aria-hidden="true">«</span>';
                if (page != 1) {
                    liPrevious.onclick = () => {
                        page = page-1;;
            		    getProducts();
            	    };
                }
                liPrevious.style.cursor = 'pointer';
                liPrevious.appendChild(aPrevious);
                ulElement.appendChild(liPrevious);
            }
            
            var liPage1 = document.createElement('li');
            liPage1.className = 'page-item mx-1';
            var aPage1 = document.createElement('a');
            aPage1.className = 'page-link';
            if (page == 1) {
                liPage1.className += ' active';
                aPage1.textContent = '1';
            }else {
                aPage1.textContent = page - 1;
                liPage1.onclick = () => {
                    page = page-1;
        		    getProducts();
        	    };
        	    liPage1.style.cursor = 'pointer';
            }
            liPage1.appendChild(aPage1);
            ulElement.appendChild(liPage1);
            
            
            var liPage2 = document.createElement('li');
            liPage2.className = 'page-item mx-1';
            var aPage2 = document.createElement('a');
            aPage2.className = 'page-link';
            if (page < 2) {
                aPage2.textContent = page + 1;
                liPage2.onclick = () => {
                     page++;
        		    getProducts();
        	    };
        	    liPage2.style.cursor = 'pointer';
            }else {
                liPage2.className += ' active';
                aPage2.textContent = page;
            }
            liPage2.appendChild(aPage2);
            ulElement.appendChild(liPage2);
            
            if (data.pagination[0].maxPage > 2 && data.pagination[0].maxPage != page) {
                var liPage3 = document.createElement('li');
                liPage3.className = 'page-item mx-1';
                var aPage3 = document.createElement('a');
                aPage3.className = 'page-link';
                if (page < 2) {
                    aPage3.textContent = page + 2;
                    liPage3.onclick = () => {
                         page = page+2;
            		    getProducts();
            	    };
                }else {
                    aPage3.textContent = page + 1;
                    liPage3.onclick = () => {
                         page++;
            		    getProducts();
            	    };
                }
                liPage3.style.cursor = 'pointer';
                liPage3.appendChild(aPage3);
                ulElement.appendChild(liPage3);
                var liNext = document.createElement('li');
                liNext.className = 'page-item ms-1';
                var aNext = document.createElement('a');
                aNext.className = 'page-link';
                aNext.onclick = () => {
                    page++;
            	    getProducts();
                };
                aNext.setAttribute('aria-label', 'Next');
                aNext.innerHTML = '<span aria-hidden="true">»</span>';
                liNext.style.cursor = 'pointer';
                liNext.appendChild(aNext);
                ulElement.appendChild(liNext);
            }

            navElement.appendChild(ulElement);
            
            // Agregar el elemento nav al contenedor de la paginación
            paginationContainer.appendChild(navElement);
    
            mainContainer.appendChild(paginationContainer);
        }
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
	
	function addToCart(idProd) {
        fetch(url + '/product/'+ idProd + '/cart')
            .then(response => response.json())
            .then(data => {
                console.log('añadido');
                getCart();
            })
            .catch(error => console.error("Error:", error));
	}
	
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

