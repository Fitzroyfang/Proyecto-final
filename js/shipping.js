document.addEventListener('DOMContentLoaded', function() {
    const selectedOption = getShippingOption();
    if (selectedOption) {
        document.querySelector(`input[value="${selectedOption}"]`).checked = true;
    }

    actualizarResumenCompra();
});

const checkboxes = document.querySelectorAll('input[name="check"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });

        // Guarda la opción seleccionada en localstorage

        saveShippingOption(checkbox.value);
    });
});

// Guarda el tipo de envío seleccionado en localStorage

function saveShippingOption(selectedOption) {
    localStorage.setItem('shippingOption', selectedOption);
    actualizarResumenCompra();
}

// Función para calcular y mostrar el costo de envío

function calcularEnvio(subtotal) {
    const shippingOption = getShippingOption(); // Obtiene la opción de envío desde localStorage
    let shippingCost = 0;

    if (shippingOption === 'premium') {
        shippingCost = subtotal * 0.15; 
    } else if (shippingOption === 'express') {
        shippingCost = subtotal * 0.07;
    } else if (shippingOption === 'standard') {
        shippingCost = subtotal * 0.05;
    }

    return shippingCost;
}