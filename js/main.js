document.addEventListener('DOMContentLoaded', () => {
    // Project Data Configuration
    const projectData = {
        coino: {
            name: 'Coino - Crypto Exchange',
            images: [
                'assets/CoinO/main.webp',
                'assets/CoinO/460x996bb-2.webp',
                'assets/CoinO/460x996bb-3.webp',
                'assets/CoinO/460x996bb-4.webp'
            ]
        },
        icrypex: {
            name: 'ICRYPEX - Crypto Exchange',
            images: [
                'assets/icrypex/main.webp',
                'assets/icrypex/460x996bb-6.webp',
                'assets/icrypex/460x996bb-7.webp',
                'assets/icrypex/460x996bb-8.webp',
                'assets/icrypex/460x996bb-9.webp',
                'assets/icrypex/460x996bb-10.webp',
                'assets/icrypex/460x996bb-11.webp',
                'assets/icrypex/460x996bb-12.webp'
            ]
        },
        kassa: {
            name: 'Kassa - Social Wallet & Finance',
            images: [
                'assets/kassa/main.png',
                'assets/kassa/kassa1.png',
                'assets/kassa/kassa2.png',
                'assets/kassa/kassa3.png',
                'assets/kassa/kassa4.png',
                'assets/kassa/kassa5.png',
                'assets/kassa/kassa6.png',
                'assets/kassa/kassa7.png'
            ]
        },
        trive: {
            name: 'Trive - Investment Onboarding',
            images: [
                'assets/trive/main.png',
                'assets/trive/trive2.png',
                'assets/trive/trive3.png',
                'assets/trive/trive4.png'
            ]
        },
        ulive: {
            name: 'Urban Active+ - Fitness & Live Stream',
            images: [
                'assets/ulive/main.png',
                'assets/ulive/ulive2.png',
                'assets/ulive/ulive3.png',
                'assets/ulive/ulive4.png',
                'assets/ulive/ulive5.png'
            ]
        }
    };

    // DOM Elements
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImagesContainer = document.getElementById('modal-images');
    const closeModalButton = document.getElementById('close-modal-button');
    const projectCards = document.querySelectorAll('.project-card');

    // Functions
    const openModal = (projectName) => {
        const project = projectData[projectName];
        if (!project) return;

        modalTitle.textContent = project.name;
        modalImagesContainer.innerHTML = ''; // Clear previous images

        // Create images with lazy loading
        const fragment = document.createDocumentFragment();
        project.images.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${project.name} Screenshot ${index + 1}`;
            img.loading = 'lazy'; // Improve performance
            fragment.appendChild(img);
        });
        
        modalImagesContainer.appendChild(fragment);

        modal.style.display = 'flex';
        // Trigger reflow for transition
        void modal.offsetWidth;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Wait for transition
    };

    // Event Listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.getAttribute('data-project');
            openModal(projectName);
        });
    });

    closeModalButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard Navigation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});