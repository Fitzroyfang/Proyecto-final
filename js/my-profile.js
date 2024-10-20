document.addEventListener('DOMContentLoaded', function() {
    const btnSwitch = document.getElementById('btnSwitch');  
    const btnSwitch2 = document.getElementById('btnSwitch2'); 
    const darkMode = localStorage.getItem('dark-mode'); 
    const profilePicInput = document.getElementById('profilePicInput'); 
    const profilePic = document.getElementById('profilePic'); // Imagen en la barra de navegación superior
    const profilePic2 = document.getElementById('profilePic2'); // Imagen del logo azul (parte del perfil)
    const saveBtn = document.getElementById('saveBtn');

    // Verificar el login
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.href = "login.html";
    }

    // Cargar datos del perfil
    loadProfileData();

    // Evento para activar el modo oscuro
    btnSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', btnSwitch.checked);
        btnSwitch2.checked = false; // Desactivar el otro switch
        localStorage.setItem('dark-mode', btnSwitch.checked ? 'enabled' : 'disabled');
    });

    // Evento para desactivar el modo oscuro
    btnSwitch2.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', btnSwitch2.checked);
        btnSwitch.checked = false; 
        localStorage.setItem('dark-mode', btnSwitch2.checked ? 'disabled' : 'enabled');
    });

    // Manejar cambio de foto de perfil
    profilePicInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageDataUrl = e.target.result;
                profilePic.src = imageDataUrl; // Actualizar imagen en la barra de navegación superior
                profilePic2.src = imageDataUrl; // Actualizar imagen en la sección de perfil (logo azul)
                localStorage.setItem('profilePic', imageDataUrl); // Guardar la imagen en localStorage
            };
            reader.readAsDataURL(file);
        }
    });

    // Guardar datos del perfil
    document.getElementById('profile-form').addEventListener('submit', function(e) {
        e.preventDefault(); 
        saveProfileData();
    });

    // Cargar los datos del perfil
    function loadProfileData() {
        const profileData = JSON.parse(localStorage.getItem('profileData')) || {};
        
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.value = user; 
        }

        const otherFields = ['name', 'name2', 'surname', 'surname2', 'phone'];  
        otherFields.forEach(fieldId => {
            const inputElement = document.getElementById(fieldId);
            if (inputElement) {
                inputElement.value = profileData[fieldId] || ''; // Cargar datos del perfil
            }
        });

        // Cargar la imagen de perfil
        const savedImage = localStorage.getItem('profilePic');
        if (savedImage) {
            profilePic.src = savedImage; // Cargar imagen guardada (barra de navegación superior)
            profilePic2.src = savedImage; // Cargar imagen guardada en la sección de perfil (logo azul)
        } else {
            profilePic.src = 'img/user-account-no-bg.png';
            profilePic2.src = 'img/user-account-no-bg.png';
        }
    }

    // Guardar datos del perfil
    function saveProfileData() {
        const profileData = {
            name: document.getElementById('name').value,
            name2: document.getElementById('name2').value,
            surname: document.getElementById('surname').value,
            surname2: document.getElementById('surname2').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value
        };

        localStorage.setItem('profileData', JSON.stringify(profileData));
        alert('Datos guardados correctamente.');
    }

    // Evento para el botón de guardar la imagen
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            if (profilePic) {
                saveImage(profilePic);
            } else {
                alert("Por favor, seleccione una imagen");
            }
        });
    }
});
