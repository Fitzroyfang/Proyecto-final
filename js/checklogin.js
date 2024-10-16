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
        /*if (document.getElementById('usuario-index') != null) {
            document.getElementById('usuario-index').textContent = usuario; //cambio id
        } else if (document.getElementById('usuario-categories') != null) {
            document.getElementById('usuario-categories').textContent = usuario
        } else if (document.getElementById('usuario-products') != null) {
            document.getElementById('usuario-products').textContent = usuario
        } else {
            document.getElementById('usuario-products-info').textContent = usuario
        }
})*/