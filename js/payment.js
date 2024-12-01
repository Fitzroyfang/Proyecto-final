document.addEventListener('DOMContentLoaded', () => {
  'use strict';


  mostrarResumenCompra();

  document.getElementById("vto").addEventListener("input", function (event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, ''); // Elimina caracteres no numéricos

    // Inserta el '/' automáticamente después del mes
    if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    
    input.value = value;
    
  });

 if(localStorage.getItem('dark-mode') === 'true'){
        document.body.classList.toggle('dark-mode');
    }

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


document.getElementById("tarjeta-depósito").addEventListener("change",function(){
    const method = document.getElementById("tarjeta-depósito").value;
    const card = document.getElementById("card");
    const deposit = document.getElementById("deposit");
  
    if (method === "tarjeta") {
      card.style.display = "block";
      deposit.style.display = "none";
    } else if (method === "depósito") {
      card.style.display = "none";
      deposit.style.display = "block";
      submitPay2.style.display = "block";
    } else {
      card.style.display = "none";
      deposit.style.display = "none";
    }
  })

  async function mostrarResumenCompra() {
    const products = JSON.parse(localStorage.getItem("cart") || '[]');
    let total = 0;

    document.getElementById("table").innerHTML = `
    <tr>
    <th>Artículo</th>
    <th>Precio</th>
    </tr>
    `;

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
    
    const shippingCost = calcularEnvio(total);
    const grandTotal = total + shippingCost;
    SetTotal(grandTotal, shippingCost);
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

function SetTotal(grandTotal, shippingCost){
   document.getElementById("shipping-cost").innerHTML = `Costo de Envío: UYU ${shippingCost.toFixed(2)}`;
   document.getElementById("total-cost").innerHTML = `Total: UYU ${grandTotal.toFixed(2)}`;
}

  });


  const formCard = document.getElementById('card');
  const btnFinalizar =document.getElementById("FinalizarCompra");
  btnFinalizar.addEventListener('click', event => {
    event.preventDefault();
      const method = document.getElementById("tarjeta-depósito").value;
        if(method==="tarjeta"){
          if (!formCard.checkValidity()) {
            
              event.stopPropagation();
              formCard.classList.add("was-validated");
          }
          else{
            Swal.fire({
              title: '¡Éxito!',
              text: 'La compra se realizo exitosamente',
              icon: 'success',
          })
          }
        }
        if(method==="depósito"){
          Swal.fire({
            title: '¡Éxito!',
            text: 'La compra se realizo exitosamente',
            icon: 'success',
        })
        }
      }, false);


      function ChangeMode() {
        if(localStorage.getItem('darkMode') === 'true'){
            localStorage.setItem('darkMode',"")
            document.body.classList.remove('dark-mode');
        }else{
            localStorage.setItem("darkMode",'true')
            document.body.classList.toggle('dark-mode');
        }    
    }
    