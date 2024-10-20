document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-inicio').addEventListener('click', () => {
        let emailField = document.getElementById('usuario');
        let pass = document.getElementById('password').value;

        if (emailField.checkValidity() && pass !== '') {
            sessionStorage.setItem("user", emailField.value);
            location.href = "index.html";
        } else if (!emailField.checkValidity() && pass !== '') {
            alert("Por favor ingrese un correo electrónico válido");
        } else if (emailField.checkValidity() && pass === '') {
            alert("Por favor ingrese su contraseña");
        } else {
            alert("Por favor ingrese su correo electrónico y contraseña");
        }
    });
});


document.getElementById('btn-inicio').addEventListener('click', (e) => {
  login();
});


document.getElementById("password").addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        login();
    }
});

const imageInput = document.getElementById('imageInput');

// Guardar imagen
function saveImage(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      localStorage.setItem('savedImage', event.target.result);
    };
    reader.readAsDataURL(file);
  }

  // Mostrar imagen

  function displayImage() {
    const savedImage = localStorage.getItem('savedImage');
    if (savedImage) {
      document.getElementById('imagePreview').src = savedImage; // Muestra la imagen
      console.log("Imagen cargada desde localStorage", saveImage);
    } else {
      console.error("No se encontró la imagen en localStorage");
    }
  }

  // Evento para cargar la imagen

  imageInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0]; // Guarda la imagen seleccionada
    if (selectedFile) {
      saveImage(selectedFile);
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result; // Muestra una vista previa
      };
      reader.readAsDataURL(selectedFile);
    }
  });


window.onload = displayImage;

