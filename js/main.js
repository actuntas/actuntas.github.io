document.addEventListener('DOMContentLoaded', () => {
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

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImagesContainer = document.getElementById('modal-images');
    const closeModalButton = document.getElementById('close-modal-button');
    const projectCards = document.querySelectorAll('.project-card');

    const openModal = (projectName) => {
        const project = projectData[projectName];
        if (!project) return;

        modalTitle.textContent = project.name;
        modalImagesContainer.innerHTML = '';

        const fragment = document.createDocumentFragment();
        project.images.forEach((imageSrc, index) => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = `${project.name} Screenshot ${index + 1}`;
            img.loading = 'lazy';
            fragment.appendChild(img);
        });
        
        modalImagesContainer.appendChild(fragment);

        modal.style.display = 'flex';
        void modal.offsetWidth;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectName = card.getAttribute('data-project');
            openModal(projectName);
        });
    });

    const navbar = document.getElementById('navbar');
    const onScroll = () => {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${Math.min(i, 4) * 60}ms`;
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('visible'));
    }

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (sections.length && navLinks.length) {
        const setActive = (id) => {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        };
        const onSpy = () => {
            const line = window.scrollY + window.innerHeight * 0.3;
            let currentId = null;
            sections.forEach(sec => {
                if (sec.offsetTop <= line) currentId = sec.getAttribute('id');
            });
            setActive(currentId);
        };
        window.addEventListener('scroll', onSpy, { passive: true });
        window.addEventListener('resize', onSpy);
        onSpy();
    }

    closeModalButton.addEventListener('click', closeModal);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});