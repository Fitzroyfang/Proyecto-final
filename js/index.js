document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    if(localStorage.getItem('dark.mode') === 'true'){
        document.body.classList.toggle('dark-mode');
    }
});

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
