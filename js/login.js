document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('btn-inicio').addEventListener('click',()=>{
        let user = document.getElementById('usuario').value;
        let pass = document.getElementById('password').value;

        if (user!='' && pass!='') {
            location.href="index.html"
        }else if (user==='' && pass!=''){
            alert("Por favor ingrese usuario")
        }else if (user!='' && pass===''){
            alert("Por favor ingrese contraseña")
        }else {
            alert("Por fevor ingrese usuario y contraseña")
        }
    })
})