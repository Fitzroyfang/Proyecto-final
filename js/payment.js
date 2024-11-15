document.getElementById("vto").addEventListener("input", function (event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos

    // Inserta el '/' automáticamente después del mes
    if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    input.value = value;
});

document.getElementById("cardNumber").addEventListener("input", function (event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos

    // Agrega un guion cada 4 dígitos
    value = value.match(/.{1,4}/g)?.join('-') || '';
    
    input.value = value;
});

function togglePaymentForm() {
    const method = document.getElementById("tarjeta-depósito").value;
    const card = document.getElementById("card");
    const deposit = document.getElementById("deposit");
  
    if (method === "tarjeta") {
      card.style.display = "block";
      deposit.style.display = "none";
    } else if (method === "depósito") {
      card.style.display = "none";
      deposit.style.display = "block";
    } else {
      card.style.display = "none";
      deposit.style.display = "none";
    }
  }

  (function () {
    'use strict';
  
    // Obtén todos los formularios con la clase 'needs-validation'
    const form = document.getElementById('card');

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita el envío del formulario por defecto

  // Validación del nombre del titular
  const titular = document.getElementById('titular');
  if (titular.value.trim() === '') {
    titular.classList.add('is-invalid');
    return;
  }

  // Validación del número de tarjeta (puedes usar una expresión regular más compleja)
  const cardNumber = document.getElementById('cardNumber');
  if (!/^\d{4}-\d{4}-\d{4}-\d{4}$/.test(cardNumber.value)) {
    cardNumber.classList.add('is-invalid');
    return;
  }

  // ... Validación de otros campos ...

  // Si todas las validaciones pasan, envía el formulario
  form.submit();
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
          addProductCart(data, element.quantity);
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
    document.getElementById("tablePay").innerHTML += htmlContentToAppend;
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
    <a href="index.html" class="btn">Finalizar compra</a>
    `
    document.getElementById("tablePay").innerHTML += htmlContentToAppend;
}
  })