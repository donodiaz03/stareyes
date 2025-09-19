document.addEventListener('DOMContentLoaded', () => {
    // --- Funcionalidad de la Ventana Emergente (Pop-up) ---
    const socialPopup = document.getElementById('social-popup');
    const closePopupBtn = document.querySelector('.close-popup-btn');

    if (socialPopup && closePopupBtn) {
        setTimeout(() => {
            socialPopup.classList.add('active');
        }, 1000);

        closePopupBtn.addEventListener('click', () => {
            socialPopup.classList.remove('active');
        });

        socialPopup.addEventListener('click', (event) => {
            if (event.target === socialPopup) {
                socialPopup.classList.remove('active');
            }
        });
    }

    // --- Funcionalidad de las Pestañas de la Galería ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            galleryContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            const targetTabId = button.dataset.tab;
            document.getElementById(targetTabId).classList.add('active');
        });
    });

    // --- AÑADIDO: Funcionalidad del Menú Móvil ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // Alterna la clase para mostrar/ocultar el menú
            mainNav.classList.toggle('nav--visible');

            // Cambia el ícono del botón (hamburguesa <-> cruz)
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('nav--visible')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                menuToggle.setAttribute('aria-label', 'Cerrar menú');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });

        // Cierra el menú al hacer clic en un enlace (útil en móviles)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('nav--visible')) {
                    mainNav.classList.remove('nav--visible');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-label', 'Abrir menú');
                }
            });
        });
    }

    // --- Funcionalidad del Carrusel de Imágenes en la Galería de Fotos ---
    const photoCarousels = document.querySelectorAll('.photo-carousel-item');

    photoCarousels.forEach(carouselItem => {
        const imagesWrapper = carouselItem.querySelector('.carousel-images-wrapper');
        const images = imagesWrapper.querySelectorAll('img');
        const totalImages = images.length;
        let currentImageIndex = 0;

        if (totalImages <= 1) return;

        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % totalImages;
            imagesWrapper.style.transform = `translateX(-${currentImageIndex * 100}%)`;
            
            // Lógica para un bucle infinito y suave
            if (currentImageIndex === totalImages -1) {
                setTimeout(() => {
                    imagesWrapper.style.transition = 'none';
                    currentImageIndex = 0;
                    imagesWrapper.style.transform = 'translateX(0)';
                    setTimeout(() => {
                         imagesWrapper.style.transition = 'transform 1s ease-in-out';
                    }, 50);
                }, 1000); // Debe coincidir con la duración de la transición
            }
        }, 4500);
    });
});
