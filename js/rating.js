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
                <div class="review-emoji">${selectedEmoji}</div>
                <p>${textArea.value}</p>
            `;
        

            // Agregar la reseña
            reviewList.appendChild(newReview);

            // Limpiar la selección de emojis después de enviar
            document.querySelectorAll('.emoji').forEach(emoji => emoji.classList.remove('selected'));
            selectedEmoji = null; 
        }