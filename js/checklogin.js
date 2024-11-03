document.addEventListener('DOMContentLoaded', function(){ 

        let usuario = sessionStorage.getItem("user");
        let inputUsuario = document.getElementById('inputUsuario');
        

        if (usuario == null){
            alert("Primero debe identificarse");
            location.href="login.html";
        }
        
        else {
            document.querySelectorAll(".usuario").forEach(elemento => {
                elemento.textContent = usuario;
            })
        }
    })