document.addEventListener("DOMContentLoaded", function(e){
    const products = localStorage.getItem("cart");
    if(products){
        showProducts(JSON.parse(products))
        updateCartCount(); // 
    }
});

function updateCartCount() {
    const products = localStorage.getItem("cart");
    if(products) {
        const parsedProducts = JSON.parse(products);
        console.log(parsedProducts);

        // Suma la cantidad total de productos.
        const totalCount = parsedProducts.reduce((acc, item) => {
            const quantity = Number(item.quantity) || 0;
            console.log(`Cantidad de ${item.name}: ${quantity}`); // Verifica cada cantidad.
            return acc + quantity;
         }, 0); 
        const cartCountElement = document.getElementById('cartCount');
        cartCountElement.textContent = totalCount; // Actualiza el contador.
    } else {
        const cartCountElement = document.getElementById('cartCount');
        cartCountElement.textContent = 0; // Si no hay productos, muestra 0.
    }
}

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

function increaseQuantity(button) {
    const productId = button.getAttribute("data-product-id");
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityInput.value);
    quantityInput.value = currentQuantity + 1;
    updateLocalStorage(productId, currentQuantity + 1);
    location.reload();
}

function decreaseQuantity(button) {
    const productId = button.getAttribute("data-product-id");
    const quantityInput = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) { // Evita que la cantidad sea menor que 1
        quantityInput.value = currentQuantity - 1;
        updateLocalStorage(productId, currentQuantity - 1);
    }
    location.reload();
}

function updateLocalStorage(prodID, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const productIndex = cart.findIndex(item => item.id === prodID);
    cart[productIndex].quantity = quantity;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addProductCart(prod,cant){
    console.log(prod)
    let htmlContentToAppend = "";
        htmlContentToAppend += 
            `
            <div class="cart-item" id="cart-item-${prod.id}">
    <img src="` + prod.images[0] + `" alt="product image" class="item-image">
    <div class="item-info">${prod.name}</div>
    <div class="quantity-control">
        <span>Cantidad</span>
        <button onclick="decreaseQuantity(this)" data-product-id="${prod.id}">-</button>
        <input id="quantity-${prod.id}" type="text" value="${cant}">
        <button onclick="increaseQuantity(this)" data-product-id="${prod.id}">+</button>
    </div>
    <div class="price">${prod.currency} ${prod.cost}</div>
    <div id="delete-${prod.id}" class="delete-btn" onclick="deleteProduct('${prod.id}')">🗑️</div>
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

function deleteProduct(prodId) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const productIndex = cart.findIndex(item => item.id === prodId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        document.getElementById(`cart-item-${prodId}`).remove();
        location.reload();
    }
}
