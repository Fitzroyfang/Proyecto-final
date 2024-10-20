var selectedEmoji = null;
var textArea = document.getElementById("textArea");

        // Seleccionar el emoji cuando se hace clic
        document.querySelectorAll('.emoji').forEach(emoji => {
            emoji.addEventListener('click', function() {
                // Remover la selección de otros emojis
                document.querySelectorAll('.emoji').forEach(e => e.classList.remove('selected'));
                
                // Marcar el emoji actual como seleccionado
                this.classList.add('selected');
                selectedEmoji = this.getAttribute('data-emoji');
            });
        });

        // Función para simular el envío y agregar la reseña
        function submitEmojiRating() {
            if (!selectedEmoji) {
                alert('Por favor selecciona una calificación antes de enviar.');
                return;
            }

            // Limpiar el mensaje de "no hay reseñas"
            const noReviewsMessage = document.querySelector('.no-reviews');
            if (noReviewsMessage) {
                noReviewsMessage.remove();
            }

            // Crear una nueva reseña visualmente
            const reviewList = document.getElementById('review-list');
            const newReview = document.createElement('div');
            newReview.classList.add('review-item');
            newReview.innerHTML = `
                <div class="container border p-3">
            <div class="row align-items-center">
            <div class="col-lg-2">
                <p class="fs-6"><strong>Usuario</strong></p>
                <p>${sessionStorage.getItem("user")}</p>
            </div>
            <div class="col-2 ">
                <p class="fs-6"><strong>Calificación</strong></p>
                <p>${selectedEmoji}</p>
            </div>
            <div class="col-lg-2">
                <p class="fs-6"><strong>Fecha</strong></p>
                <p>${new Date()}</p>
            </div>
            <div class="col-lg-6">
                <p class="fs-6"><strong>Comentario</strong></p>
                <p>${textArea.value}</p>
            </div>
            </div>
            </div>`

          
            ;
        

            // Agregar la reseña
            reviewList.appendChild(newReview);

            // Limpiar la selección de emojis después de enviar
            document.querySelectorAll('.emoji').forEach(emoji => emoji.classList.remove('selected'));
            selectedEmoji = null; 
        }