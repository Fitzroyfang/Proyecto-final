document.addEventListener("DOMContentLoaded", () => {
  const adressForm = document.getElementById("adressForm");

  // Cargar datos desde localStorage al iniciar la página
  const storedAddress = localStorage.getItem("direccionEnvio");
  if (storedAddress) {
    const direccionData = JSON.parse(storedAddress);

    document.getElementById("departamento").value = direccionData.departamento || "";
    adressForm.querySelector("#localidad input").value = direccionData.localidad || "";
    adressForm.querySelector("#calle input").value = direccionData.calle || "";
    adressForm.querySelector("#número input").value = direccionData.numero || "";
    adressForm.querySelector("#esq input").value = direccionData.esquina || "";
  }

  // Eliminar la declaración duplicada de 'payLink'
  const payLink = document.getElementById('payLink');

  payLink.addEventListener("click", (e) => {
    e.preventDefault(); // Evita la navegación inmediata

    // Validar el formulario
    if (!adressForm.checkValidity()) {
      adressForm.classList.add("was-validated");
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    // Obtener los valores del formulario
    const direccionData = {
      departamento: document.getElementById("departamento").value,
      localidad: adressForm.querySelector("#localidad input").value,
      calle: adressForm.querySelector("#calle input").value,
      numero: adressForm.querySelector("#número input").value || "N/A",
      esquina: adressForm.querySelector("#esq input").value,
    };

    // Guardar los datos en localStorage
    localStorage.setItem("direccionEnvio", JSON.stringify(direccionData));

    // Redirigir a la página de pago
    window.location.href = "payment.html";
  });

  // Obtener todos los formularios con la clase "needs-validation"
  const forms = document.querySelectorAll('.needs-validation');

  // Bucle para cada formulario
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });
});
