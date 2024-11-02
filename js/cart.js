document.addEventListener("DOMContentLoaded", function(e){
    const products = localStorage.getItem("cart");
    if(products){
        showProducts(JSON.parse(products))
    }
})
async function showProducts(products) {
    let total = 0;
    const promises = products.map(async (element) => {
        const URL = `https://japceibal.github.io/emercado-api/products/${element.id}.json`;
        const resultObj = await getJSONData(URL);
        
        if (resultObj.status === "ok") {
            const data = resultObj.data;
            console.log(data.cost);
            total += Number(data.cost) * element.quantity;
            addProductCart(data, element.quantity);
            ResumenCompra(data, element.quantity);
        }
    });

    // Espero a que todas las promesas se resuelvan porque sino el total da 0
    await Promise.all(promises);
    
    console.log("total", total);
    SetTotal(total);
}
function addProductCart(prod,cant){
    console.log(prod)
    let htmlContentToAppend = "";
        htmlContentToAppend += 
            `
            <div class="cart-item">
    <img src="` + prod.images[0] + `" alt="product image" class="item-image">
    <div class="item-info">${prod.name}</div>
    <div class="quantity-control">
        <span>Cantidad</span>
        <button>-</button>
        <input type="text" value="${cant}">
        <button>+</button>
    </div>
    <div class="price">${prod.currency} ${prod.cost}</div>
    <div class="delete-btn">🗑️</div>
</div>
            `
            document.getElementById("prductsCarrito").innerHTML += htmlContentToAppend;
}

function ResumenCompra(prod,cant){
    let htmlContentToAppend = "";
            htmlContentToAppend += 
            `
        <tr>
            <td>x${cant} ${prod.name}</td>
            <td>${prod.currency} ${prod.cost}</td>
        </tr>
        `
    document.getElementById("table").innerHTML += htmlContentToAppend;
}
function SetTotal(total){
    console.log("total2",total)
    let htmlContentToAppend = "";
    htmlContentToAppend += 
    `
    <tr class="total-row">
    <td>Total</td>
    <td>UYU ${total}</td>
    </tr>
    <a href="#" class="btn">Finalizar compra</a>
    `
    document.getElementById("table").innerHTML += htmlContentToAppend;
}
