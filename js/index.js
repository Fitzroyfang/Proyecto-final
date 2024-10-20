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

    if(localStorage.getItem('darkMode') === 'true'){
        document.body.classList.toggle('dark-mode');
    }
});

function ChangeMode() {
    if(localStorage.getItem('darkMode') === 'true'){
        localStorage.setItem('darkMode',"")
        document.body.classList.remove('dark-mode');
    }else{
        localStorage.setItem("darkMode",'true')
        document.body.classList.toggle('dark-mode');
    }    
}
