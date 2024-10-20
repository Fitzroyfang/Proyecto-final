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
<<<<<<< HEAD

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
=======
});
>>>>>>> d2c367796b58a19d4b68bf86e301921b5a476ccc
