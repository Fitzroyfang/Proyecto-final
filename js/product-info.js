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
    }

});