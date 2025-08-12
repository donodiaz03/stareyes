document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidad de la Ventana Emergente (Pop-up) ---
    const socialPopup = document.getElementById('social-popup');
    const closePopupBtn = document.querySelector('.close-popup-btn');

    // Mostrar el pop-up al cargar la página
    // Usamos un pequeño retraso para asegurar que la página esté visible antes de que aparezca
    setTimeout(() => {
        socialPopup.classList.add('active');
    }, 1000); // Aparece 1 segundo después de cargar

    // Cerrar el pop-up al hacer clic en el botón de cerrar
    closePopupBtn.addEventListener('click', () => {
        socialPopup.classList.remove('active');
    });

    // Cerrar el pop-up al hacer clic fuera del contenido del pop-up
    socialPopup.addEventListener('click', (event) => {
        if (event.target === socialPopup) {
            socialPopup.classList.remove('active');
        }
    });

    // --- Funcionalidad de las Pestañas de la Galería ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase 'active' de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleryContents.forEach(content => content.classList.remove('active'));

            // Añadir la clase 'active' al botón clickeado
            button.classList.add('active');

            // Mostrar el contenido de la galería correspondiente
            const targetTabId = button.dataset.tab; // Obtiene el ID del tab (ej. 'fotos' o 'videos')
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    // --- AÑADIDO: Funcionalidad del Carrusel de Imágenes en la Galería de Fotos ---
    const photoCarousels = document.querySelectorAll('.photo-carousel-item');

    photoCarousels.forEach(carouselItem => {
        const imagesWrapper = carouselItem.querySelector('.carousel-images-wrapper');
        const images = imagesWrapper.querySelectorAll('img');
        const totalImages = images.length;
        let currentImageIndex = 0;

        // Si solo hay una imagen, no necesitamos el carrusel
        if (totalImages <= 1) {
            imagesWrapper.style.transform = 'translateX(0)';
            imagesWrapper.style.transition = 'none'; // Asegura que no haya transición si solo hay una imagen
            return; // Salir de la función para este carrusel
        }

        // Iniciar el carrusel para este elemento
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1); // Incrementar el índice

            // Si es la última imagen, preparar para "saltar" de vuelta a la primera instantáneamente
            if (currentImageIndex >= totalImages) {
                // Desactivar temporalmente la transición para el "salto"
                imagesWrapper.style.transition = 'none';
                // Mover a la primera imagen (posición 0%)
                imagesWrapper.style.transform = 'translateX(0)';
                currentImageIndex = 0; // Resetear el índice

                // Volver a activar la transición después de un muy breve momento
                // Usamos requestAnimationFrame doble para asegurarnos de que el navegador
                // haya pintado el cambio sin transición antes de reactivarla.
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        imagesWrapper.style.transition = 'transform 1s ease-in-out';
                    });
                });
            } else {
                // Animar suavemente a la siguiente imagen
                imagesWrapper.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            }
        }, 4500); // Cambia de imagen cada 4.5 segundos
    });

    
});

