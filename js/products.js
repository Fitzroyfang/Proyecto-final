let categorias = []


function showCategoriesList(array){
    let htmlContentToAppend = "";
    console.log(array)
    let products = array.products;
    console.log("products",products)
    for(let i = 0; i < array.products.length; i++){ 
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

document.addEventListener("DOMContentLoaded", function(e){
    const catID = localStorage.getItem("catID");
    if (catID) {
        const URL = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

        getJSONData(URL).then(function(resultObj){
            if (resultObj.status === "ok")
            {
                let data = resultObj.data;
                showCategoriesList(data);
            }
        });
    }
    
});