document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-inicio').addEventListener('click', () => {
     login()
  });
});
async function login() {
  let emailField = document.getElementById('usuario');
  let pass = document.getElementById('password').value;
  let user = {
    Mail: emailField.value,
    Pass: pass
  };

  if (emailField.checkValidity() && pass !== '') {

    const data = await SendLogin(user);
    console.log(data);
    // Verificamos si la respuesta tiene el estado 200
    if (data.status === 200) {
      sessionStorage.setItem("user", emailField.value);
      sessionStorage.setItem("token", data.Token);
      location.href = "index.html";
    } else {
      alert(data.message || "Error en el inicio de sesión");
    }
  } else if (!emailField.checkValidity() && pass !== '') {
    alert("Por favor ingrese un correo electrónico válido");
  } else if (emailField.checkValidity() && pass === '') {
    alert("Por favor ingrese su contraseña");
  } else {
    alert("Por favor ingrese su correo electrónico y contraseña");
  }
}

async function SendLogin(user) {
  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    

    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al hacer login:', error);
    return { status: 500, message: "Error en la solicitud" };
  }
}





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
})