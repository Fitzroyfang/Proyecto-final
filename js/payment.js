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
