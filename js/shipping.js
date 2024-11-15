const checkboxes = document.querySelectorAll('input[name="check"]');

checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", function() {
        checkboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        })
    })
})

