document.addEventListener('DOMContentLoaded', function() {
    const selectedOption = getShippingOption();
    if (selectedOption) {
        document.querySelector(`input[value="${selectedOption}"]`).checked = true;
    }

    actualizarResumenCompra();
});

const checkboxes = document.querySelectorAll('input[name="check"]');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        const Actualcheckbox = localStorage.getItem("shipping");
        checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });

        // Guarda la opción seleccionada en localstorage

        saveShippingOption(checkbox.value);
    });
});

// Guarda el tipo de envío seleccionado en localStorage

function saveShippingOption(selectedOption) {
    localStorage.setItem('shippingOption', selectedOption);
    actualizarResumenCompra();
}

// Función para calcular y mostrar el costo de envío

function calcularEnvio(subtotal) {
    const shippingOption = getShippingOption(); // Obtiene la opción de envío desde localStorage
    let shippingCost = 0;

    if (shippingOption === 'premium') {
        shippingCost = subtotal * 0.15; 
    } else if (shippingOption === 'express') {
        shippingCost = subtotal * 0.07;
    } else if (shippingOption === 'standard') {
        shippingCost = subtotal * 0.05;
    }

    return shippingCost;
}

const payLink = document.getElementById('payLink');


payLink.addEventListener("click", (e) => {
    e.preventDefault();
    const actualCheckbox = localStorage.getItem("shipping");
    if (actualCheckbox) {
        window.location.href = "adress.html";
    }else{
        alert("Please select the shipping option before proceeding.");
    }
});



document.addEventListener("DOMContentLoaded", function(e){
    const products = localStorage.getItem("cart");
    console.log(products)
    if(products){
        showProducts(JSON.parse(products))
    }
    const checkbox = localStorage.getItem("shipping");
    checkboxes.forEach(otherCheckbox => {
        if (otherCheckbox.value == checkbox) {
            otherCheckbox.checked = true;
        }
    })
});


async function showProducts(products) {
    let total = 0;
    const promises = products.map(async (element) => {
        const URL = `https://japceibal.github.io/emercado-api/products/${element.id}.json`;
        const resultObj = await getJSONData(URL);
        
        if (resultObj.status === "ok") {
            const data = resultObj.data;
            console.log(data.cost);
            total += Number(data.cost) * element.quantity;
            ResumenCompra(data, element.quantity);
        }
    });

    // Espero a que todas las promesas se resuelvan porque sino el total da 0
    await Promise.all(promises);
    
    console.log("total", total);
    SetTotal(total);
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
    `
    document.getElementById("table").innerHTML += htmlContentToAppend;
}
