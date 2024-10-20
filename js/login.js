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
