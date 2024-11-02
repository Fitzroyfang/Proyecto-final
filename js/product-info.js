function showProductinfo(array) {
    let htmlContentToAppend = "";
    console.log(array)
        htmlContentToAppend += 
            `<div class="d-flex justify-content-center">
                <h1>Categoría: ${array.category}</h1>
            </div>
            <div class="text-center mb-1 mt-3">
                    <h4>${array.name}</h4>
                    <p>${array.description}</p>
                    <h3>${array.currency} ${array.cost}</h3>
                    <small class="text-muted">Sold count: ${array.soldCount}</small>
            </div>
            `
            document.getElementById("container-prod-info").innerHTML = htmlContentToAppend;
}
function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

function showRelatedProducts(array){
    let htmlContentToAppend = "";
    
    array.relatedProducts.forEach(product => {
        htmlContentToAppend += 
        `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action">
            <div class="col">
                <div">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div>
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>${product.name}</h4> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
            document.getElementById("productos-relacionados").innerHTML = htmlContentToAppend;
}
function showProductimages (array) {
            let imagesToAppend = "";
        let images = array.images;
    console.log("images", images)
    for (let i = 0; i < array.images.length; i++) {
        let image = array.images[i];
        imagesToAppend +=
        `<div class="col-sm-6 col-lg-3">
            <img src="` + image + `" alt="product image" class="img-thumbnail">
        </div>`
    }

        document.getElementById("galeria-imagenes").innerHTML = imagesToAppend;
    }

function convertirCalificacionEnCarita(score) {
    let emoji = '';
    switch (score) {
        case 1:
            emoji = '😠'; // Muy mala
            break;
        case 2:
            emoji = '😞'; // Mala
            break;
        case 3:
            emoji = '😐'; // Neutral
            break;
        case 4:
            emoji = '😊'; // Buena
            break;
        case 5:
            emoji = '😁'; // Excelente
            break;
        default:
            emoji = '🤔'; // Indefinido o sin calificación
    }
    return emoji;
}

function showReviews(array) {
    let htmlContentToAppend = "";
    console.log(array)
    array.forEach(element => {
        htmlContentToAppend +=
            `<div class="container border p-3">
            <div class="row align-items-center">
            <div class="col-lg-2">
                <p class="fs-6"><strong>Usuario</strong></p>
                <p>${element.user}</p>
            </div>
            <div class="col-2 ">
                <p class="fs-6"><strong>Calificación</strong></p>
                <p>${convertirCalificacionEnCarita(element.score)}</p>
            </div>
            <div class="col-lg-2">
                <p class="fs-6"><strong>Fecha</strong></p>
                <p>${element.dateTime}</p>
            </div>
            <div class="col-lg-6">
                <p class="fs-6"><strong>Comentario</strong></p>
                <p>${element.description}</p>
            </div>
            </div>
            </div>
            `
    })

    document.getElementById("review-list").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
    const prodID = localStorage.getItem("prodID");
    if (prodID) {
        const URL = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

        getJSONData(URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                data = resultObj.data;
                showProductinfo(data);
                showProductimages(data);
                showRelatedProducts(data)
            }
        });
        const URL2 = `https://japceibal.github.io/emercado-api/products_comments/${prodID}.json`

        getJSONData(URL2).then(function (resultObj) {
            if (resultObj.status === "ok") {
                data = resultObj.data;
                showReviews(data);
            }
    })
    if(localStorage.getItem('darkMode') === 'true'){
        document.body.classList.toggle('dark-mode');
    }
}

});

function ChangeMode() {
    if(localStorage.getItem('darkMode') === 'true'){
        localStorage.setItem('darkMode',"")
        document.body.classList.remove('dark-mode');
    }else{
        localStorage.setItem("darkMode",'true')
        document.body.classList.toggle('dark-mode');
    }    
}

function AddtoCart () {
    let cart = localStorage.getItem('cart');
    if (cart === null) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }
    let cantidad = document.getElementById("quantity_buy").value;
    let producto = {
        id: localStorage.getItem("prodID"),
        quantity: cantidad
    };
    cart.push(producto);
    localStorage.setItem("cart", JSON.stringify(cart));
    Swal.fire({
        title: '¡Éxito!',
        text: 'Producto agregado al carrito exitosamente.',
        icon: 'success',
        confirmButtonText: 'Ir al carrito'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'cart.html';
        }});
}

document.getElementById("add_cart").addEventListener('click', function(e) {
    AddtoCart();
    //location.href = "cart.html";
})