document.addEventListener('DOMContentLoaded', function() {
    const btnSwitch = document.getElementById('btnSwitch');  
    const btnSwitch2 = document.getElementById('btnSwitch2'); 
    const darkMode = localStorage.getItem('dark-mode'); // Obtener el valor de localStorage 
    const profilePicInput = document.getElementById('profilePicInput'); 
    const profilePic = document.getElementById('profilePic');

    // Verificar el login
    const user = sessionStorage.getItem('user'); // Cambiado para obtener el usuario del localStorage
    if (!user) {
        window.location.href = "login.html";
    }

    // Cargar datos del perfil 
    loadProfileData();

    // Evento para activar el modo oscuro
    btnSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', btnSwitch.checked);
        btnSwitch2.checked = false; // Desactivar el otro switch
        // Guardar estado del switch en localStorage
        localStorage.setItem('dark-mode', btnSwitch.checked ? 'enabled' : 'disabled');
    });

    // Evento para desactivar el modo oscuro
    btnSwitch2.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', btnSwitch2.checked);
        btnSwitch.checked = false; // Desactivar el otro switch
        // Guardar estado del switch en localStorage
        localStorage.setItem('dark-mode', btnSwitch2.checked ? 'disabled' : 'enabled');
    });

    // Manejar cambio de foto de perfil
    profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
                localStorage.setItem('profilePic', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    // Guardar datos del perfil
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Evita la recarga de la página
        saveProfileData();
    });

    function loadProfileData() {
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};

        // Rellenar el campo de correo con el email del usuario logueado
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = user; // Cargar el email desde localStorage
        }

        // Vaciar otros campos
        const otherFields = ['name', 'name2', 'surname', 'surname2', 'phone']; // IDs de otros campos
        otherFields.forEach(fieldId => {
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.value = ''; // Asegurarse de que estén vacíos
            }
        });

        // Cargar la imagen de perfil
        profilePic.src = localStorage.getItem('profilePic') || 'img/user-account-no-bg.png';
    }

    function saveProfileData() {
        const profileData = {
            nombre: document.getElementById('name').value,
            segundoNombre: document.getElementById('name2').value,
            apellido: document.getElementById('surname').value,
            segundoApellido: document.getElementById('surname2').value,
            telefono: document.getElementById('phone').value,
            correo: document.getElementById('email').value // Incluyendo el correo
        };
        
        // Guardar los datos en localStorage
        localStorage.setItem('profileData', JSON.stringify(profileData));
        alert('Datos del perfil guardados correctamente.');
    }
});
