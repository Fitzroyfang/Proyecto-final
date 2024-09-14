//Declaraciones de variables y constantes

let data = {}
let array_filtrado = { products: [] }
const bot_filtrar = document.getElementById('filtrar')
const bot_limpiar = document.getElementById('limpiar')
const precioDesc = document.getElementById('precioDesc')
const precioAsc = document.getElementById('precioAsc')
const relDesc = document.getElementById('relDesc')

//Función para mostrar los productos en pantalla

function showCategoriesList(array) {
    let htmlContentToAppend = "";
    console.log(array)
    let products = array.products;
    console.log("products", products)
    for (let i = 0; i < array.products.length; i++) {
        let product = array.products[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-sm-6 col-lg-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${product.name}</h4> 
                        <p>${product.description}</p> 
                        <h3>${product.currency} ${product.cost}</h3>
                        <small class="text-muted">Sold count: ${product.soldCount}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {
    const catID = localStorage.getItem("catID");
    if (catID) {
        const URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        getJSONData(URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                data = resultObj.data;
                showCategoriesList(data);
            }
        });
    }

});

//Función para filtrar

function filtrar(array) {
    array_filtrado = { products: [] };
    let min = parseInt(document.getElementById('min').value);
    let max = parseInt(document.getElementById('max').value);
    data.products.forEach(element => {
        if (element.cost >= min && element.cost <= max) {
            array_filtrado.products.push(element)
        }
    });
} 

bot_filtrar.addEventListener('click', function(e) {
    filtrar(data);
    showCategoriesList(array_filtrado);
})

//Función para limpiar los filtros y los campos de los inputs

function limpiar() {
    array_filtrado = { products: [] };
    showCategoriesList(data)
    document.getElementById('min').value=''
    document.getElementById('max').value=''
}

bot_limpiar.addEventListener('click', function(e) {
    limpiar()
})

// Función para ordenar por precio descendente

function precio_desc() {
    if (array_filtrado.products.length > 0) {
        array_filtrado.products.sort((a,b) => b.cost - a.cost);
        showCategoriesList(array_filtrado);
    } else {
        data.products.sort((a,b) => b.cost - a.cost);
        showCategoriesList(data);
    }
}

precioDesc.addEventListener('click', function (e) {
    precio_desc()
})

// Función para ordenar por precio ascendente

function precio_asc() {
    if (array_filtrado.products.length > 0) {
        array_filtrado.products.sort((a,b) => a.cost - b.cost);
        showCategoriesList(array_filtrado);
    } else {
        data.products.sort((a,b) => a.cost - b.cost);
        showCategoriesList(data);
    }
}

precioAsc.addEventListener('click', function (e) {
    precio_asc();
})

// Función para ordenar por relevancia

function relevancia_desc() {
    if (array_filtrado.products.length > 0) {
        array_filtrado.products.sort((a,b) => b.soldCount - a.soldCount);
        showCategoriesList(array_filtrado);
    } else {
        data.products.sort((a,b) => b.soldCount - a.soldCount);
        showCategoriesList(data);
    }
}

relDesc.addEventListener('click', function (e) {
    relevancia_desc ();
})