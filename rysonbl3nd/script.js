document.addEventListener('DOMContentLoaded', () => {
    // 1. Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previene el comportamiento predeterminado del enlace

            const targetId = this.getAttribute('href'); // Obtiene el ID del destino
            const targetElement = document.querySelector(targetId); // Encuentra el elemento destino

            if (targetElement) {
                // Desplaza la vista al elemento de forma suave
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('header').offsetHeight || 0), // Ajusta por la altura del header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Funcionalidad de la Galería (Modal para fotos y videos)
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-modal');
    const closeModalButton = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalVideo = document.getElementById('modal-video');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');

            // Reinicia la visibilidad de los elementos del modal
            modalImage.classList.add('hidden');
            modalVideo.classList.add('hidden');
            modalVideo.pause(); // Pausa el video si estaba reproduciéndose

            if (img) {
                // Si es una imagen, muestra la imagen en el modal
                modalImage.src = img.src;
                modalImage.classList.remove('hidden');
            } else if (video) {
                // Si es un video, muestra el video en el modal
                modalVideo.src = video.querySelector('source').src;
                modalVideo.classList.remove('hidden');
                modalVideo.play(); // Reproduce el video automáticamente
            }
            galleryModal.classList.remove('hidden'); // Muestra el modal
        });
    });

    // Cerrar el modal al hacer clic en el botón de cerrar
    closeModalButton.addEventListener('click', () => {
        galleryModal.classList.add('hidden'); // Oculta el modal
        modalVideo.pause(); // Asegura que el video se detenga al cerrar
        modalVideo.currentTime = 0; // Reinicia el video
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) { // Solo si el clic es directamente en el fondo del modal
            galleryModal.classList.add('hidden');
            modalVideo.pause();
            modalVideo.currentTime = 0;
        }
    });

    // 3. Animación de los elementos al hacer scroll (observador de intersección)
    // Esto hace que las animaciones de fade-in y slide-in se disparen cuando el elemento entra en la vista.
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // El viewport es el root
        rootMargin: '0px',
        threshold: 0.1 // El elemento es visible en un 10%
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando la sección entra en la vista, se añaden las clases de animación
                entry.target.querySelectorAll('.animate-fade-in-up, .animate-slide-in-right, .animate-slide-in-left').forEach(el => {
                    el.style.opacity = '1'; // Asegura que el elemento se muestre
                    // Las animaciones ya están definidas en CSS, solo se activa el display.
                });
                // Una vez animado, se puede dejar de observar si la animación no se repetirá
                // observer.unobserve(entry.target);
            } else {
                // Opcional: Para resetear la animación si sale de vista
                // entry.target.querySelectorAll('.animate-fade-in-up, .animate-slide-in-right, .animate-slide-in-left').forEach(el => {
                //     el.style.opacity = '0';
                // });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 4. Animación adicional para los elementos de música y galería
    const musicItems = document.querySelectorAll('.soundcloud-embed');
    const galleryCollageItems = document.querySelectorAll('.collage-grid .gallery-item');

    const itemObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // Añade una clase para activar la animación
                observer.unobserve(entry.target); // Deja de observar una vez visible
            }
        });
    }, { threshold: 0.1 });

    musicItems.forEach(item => {
        itemObserver.observe(item);
    });

    galleryCollageItems.forEach(item => {
        itemObserver.observe(item);
    });
});
