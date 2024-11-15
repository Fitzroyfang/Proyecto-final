const adressForm = document.querySelector('#adressForm');
const departamento = document.querySelector('#departamento');
const localidad = document.querySelector('#localidad input');
const calle = document.querySelector('#calle input');
const numero = document.querySelector('#número input');
const esquina = document.querySelector('#esq input');









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

