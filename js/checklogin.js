document.addEventListener('DOMContentLoaded', function(){ 

        let usuario = sessionStorage.getItem("user");
        let inputUsuario = document.getElementById('inputUsuario');
        sessionStorage.setItem("user", inputUsuario.value);

        if (usuario == null){
            alert("Primero debe identificarse");
            location.href="login.html";
        }
        
        else {
            document.getElementById('usuarioLoggeado').innerText = usuario;
            }
})

console.log(usuario);