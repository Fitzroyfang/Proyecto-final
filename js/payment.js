document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
      form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }
          form.classList.add('was-validated');
      }, false);
  });
});

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

document.getElementById("cvv").addEventListener("input", function (event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos

  input.value = value;
});

document.getElementById("titular").addEventListener("input", function (event) {
  const input = event.target;
  let value = input.value.replace(/\d+/g, ''); // Elimina caracteres numéricos

  input.value = value;
});


function togglePaymentForm() {
    const method = document.getElementById("tarjeta-depósito").value;
    const card = document.getElementById("card");
    const deposit = document.getElementById("deposit");
  
    if (method === "tarjeta") {
      card.style.display = "block";
      deposit.style.display = "none";
      submitPay.style.display = "block";
      submitPay2.style.display = "none";
    } else if (method === "depósito") {
      card.style.display = "none";
      deposit.style.display = "block";
      submitPay2.style.display = "block";
      submitPay.style.display = "none";
    } else {
      card.style.display = "none";
      deposit.style.display = "none";
      submitPay.style.display = "none";
      submitPay2.style.display = "none";
    }
  }

  (function () {
    'use strict';
  


  

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