document.addEventListener('DOMContentLoaded', () => {
    // 1. Desplazamiento suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // For the logo link, we might not need to offset by header height if it's already visible
                const offset = targetId === '#hero' ? 0 : document.querySelector('header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
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

            modalImage.classList.add('hidden');
            modalVideo.classList.add('hidden');
            modalVideo.pause();

            if (img) {
                modalImage.src = img.src;
                modalImage.classList.remove('hidden');
            } else if (video) {
                modalVideo.src = video.querySelector('source').src;
                modalVideo.classList.remove('hidden');
                modalVideo.play();
            }
            galleryModal.classList.remove('hidden');
        });
    });

    const closeModal = () => {
        galleryModal.classList.add('hidden');
        modalVideo.pause();
        modalVideo.currentTime = 0;
    };

    closeModalButton.addEventListener('click', closeModal);
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            closeModal();
        }
    });

    // 3. Pestañas de la Galería (Fotos y Videos)
    const showPhotosBtn = document.getElementById('show-photos-btn');
    const showVideosBtn = document.getElementById('show-videos-btn');
    const photoGallery = document.getElementById('photo-gallery');
    const videoGallery = document.getElementById('video-gallery');

    showPhotosBtn.addEventListener('click', () => {
        photoGallery.classList.remove('hidden');
        videoGallery.classList.add('hidden');
        showPhotosBtn.classList.add('active-tab');
        showVideosBtn.classList.remove('active-tab');
    });

    showVideosBtn.addEventListener('click', () => {
        videoGallery.classList.remove('hidden');
        photoGallery.classList.add('hidden');
        showVideosBtn.classList.add('active-tab');
        showPhotosBtn.classList.remove('active-tab');
    });

    // 4. Funcionalidad del Menú Móvil (Hamburguesa)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuLinks = mobileMenu.querySelectorAll('a');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 5. Lógica para cambiar el logo en el header al hacer scroll
    const header = document.querySelector('header');
    const heroSection = document.getElementById('hero');
    const logoText = document.getElementById('logo-text');
    const logoImage = document.getElementById('logo-image');
    const scrollTriggerHeight = heroSection.offsetHeight / 2; // El cambio ocurrirá a la mitad de la sección 'hero'

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTriggerHeight) {
            // El usuario ha bajado lo suficiente
            header.classList.add('scrolled');
            logoText.classList.add('hidden');
            logoImage.classList.remove('hidden');
        } else {
            // El usuario está en la parte superior de la página
            header.classList.remove('scrolled');
            logoText.classList.remove('hidden');
            logoImage.classList.add('hidden');
        }
    }, { passive: true }); // Mejora el rendimiento del scroll
});

